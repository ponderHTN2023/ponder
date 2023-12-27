from rest_framework.views import APIView
from rest_framework.response import Response
from pydub import AudioSegment
import requests
import os
from google.cloud import texttospeech, storage
# from bark import SAMPLE_RATE, generate_audio, preload_models
import uuid
# from scipy.io.wavfile import write as write_wav
# import nltk
# import numpy as np
# import time
# import io
from openai import OpenAI
from pathlib import Path
import logging



class GenerateMeditationView(APIView):
    def post(self, request, format=None):
        duration = request.data.get("duration", 60)*1000
        meditation = self.generate_v2(request.data)
        # url = self.openai_tts(meditation, break_length)
        url = self.openai_tts_v2(meditation, duration)
        # url = self.google_cloud_tts(meditation, break_length)
        print("meditation url:", url)
        return Response({"meditation": url})
    
    def openai_tts(self, text, break_length):
        client = OpenAI(organization="org-NgV2YtGKKOa1OdQenbfTShXv", api_key=os.environ.get("OPENAI_API_KEY"))
        text = text.split("\n")
        # remove empty lines
        text = [line for line in text if line not in ["", " ", "\n"]]
        text[0] = text[0] + " " + text[1]
        for t in text:
            print(t)
        text.pop(1)
        out_file = Path(__file__).parent.parent / f"assets/speech.mp3"
        speech_break = AudioSegment.silent(duration=break_length*1000) 
        speech = []
        for i, content in enumerate(text):
            speech_file_path = Path(__file__).parent.parent / f"assets/speech{i}.mp3"
            response = client.audio.speech.create(model="tts-1", voice="shimmer", input=content, speed=0.85)
            response.stream_to_file(speech_file_path)
            speech.append(AudioSegment.from_mp3(speech_file_path))
            speech.append(speech_break)
        final = sum(speech)
        final.export(out_file, format="mp3")
        return self.upload_to_gc_bucket(filename=str(out_file))
    
    def openai_tts_v2(self, text, duration):
        client = OpenAI(organization="org-NgV2YtGKKOa1OdQenbfTShXv", api_key=os.environ.get("OPENAI_API_KEY"))
        text = text.split("\n")
        text = [line for line in text if line not in ["", " ", "\n"]]
        text[0] = text[0] + " " + text[1]
        text.pop(1)
        for t in text:
            print(t)

        out_file = Path(__file__).parent / f"assets/speech.mp3"
        # BASE_DIR = os.path.join(Path(__file__).resolve().parent, "assets/speech.mp3")
        speech = []
        for i, content in enumerate(text):
            speech_file_path = Path(__file__).parent / f"assets/speech{i}.mp3"
            response = client.audio.speech.create(model="tts-1", voice="shimmer", input=content, speed=0.85)
            response.stream_to_file(speech_file_path)
            speech.append(AudioSegment.from_mp3(speech_file_path))

        total_speech_length = sum([len(s) for s in speech])
        print("total speech length:", total_speech_length)
        break_length = ((duration - total_speech_length) / (len(speech) - 1)) + 5
        print("break length:", break_length)
        
        speech_break = AudioSegment.silent(duration=break_length)
        result = []
        for i in range(len(speech)):
            result.append(speech[i])
            if i < len(speech) - 1:
                result.append(speech_break)

        final = sum(result)
        final.export(out_file, format="mp3")
        return self.upload_to_gc_bucket(filename=out_file)
    
    
    def generate(self, data):
        divisor = (8 + (data['duration']//60)*2) if data['duration'] > 60 else 8
        if (data['duration']//60) >= 5:
            divisor = (10 + (data['duration']//60)*2)
        num_lines = data['duration']//divisor
        if data.get("emotion") and not data.get("technique"):
            prompt = self.emotion_2(data, num_lines)
        elif data.get("technique") and not data.get("emotion"):
            prompt = self.technique_2(data, num_lines)
        print("sending request...")
        print("prompt:", prompt, "\n\n")
        return self.generate_meditation(prompt)
    
    def generate_v2(self, data):
        # num_lines = 3 + ((data['duration'] // 60) + 1) // 2
        print(data['duration'])
        num_lines = 2 + (data['duration'] // 60)
        print("num lines:", num_lines)


        if data.get("emotion") and not data.get("technique"):
            prompt = self.emotion_2(data, num_lines, data['duration'])
        elif data.get("technique") and not data.get("emotion"):
            prompt = self.technique(data, num_lines, data['duration'])
        print("sending request...")
        print("prompt:", prompt, "\n\n")
        return self.generate_meditation(prompt)
    
    
    def generate_meditation(self, prompt):
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY"),
        }
        try:
            res = requests.post(
                url="https://api.openai.com/v1/chat/completions",
                headers=headers,
                json=self.get_json(prompt),
            ).json()["choices"][0]["message"]["content"]
        except KeyError as e:
            print("error:", e)
            return {
                "error": "Sorry, I couldn't generate a meditation for you. Please try again."
            }
        print("response length:", len(res))
        return res + " The guru is within you."
    
    def technique(self, data, num_lines, duration):
        prompt = (f"As a meditation guide specialized in {data.get('technique')}, "
          "craft a detailed script for a session. "
          f"Your script should be comprised of {num_lines} thoughtfully constructed sentences. Each sentence should be separated by the \\n character. \n"
          "Begin with an engaging introduction that eases the participant into the meditation, "
          f"gradually guide them through the stages or steps typical of the {data.get('technique')} technique, "
          "and conclude with a gentle closure that leaves the participant in a state of calm and mindfulness.\n"
          f"There will be about {duration - num_lines*20} seconds between each sentence spoken.\n"
          "Ensure that each instruction or sentence is presented on a new line, adhering to the following format:\n"
          "Example introductory sentence.\n"
          "Followed by a technique-focused guiding sentence.\n"
          "Concluding with a soothing closing sentence.\n"
          f"Remember, each sentence should vividly embody the essence and uniqueness of the {data.get('technique')} meditation technique.")
        return prompt          
    
    def emotion_1(self, data, num_lines):
        prompt = f"""
        Craft a unique guided meditation script focused on the emotion: {data.get('emotion')}. 
        The script should consist of around {num_lines} sentences, including spaces and punctuation.

        Structure:
        - Begin each sentence on a new line using at most {num_lines} sentences. Each sentence should be separated by the \\n character.
        - Start with an introduction that acknowledges the specified emotion.
        - Progressively guide the listener deeper into the meditation with diverse and creative instructions or statements.
        - Conclude with a comforting or empowering sentiment.

        Guidelines:
        - Ensure the script is around {num_lines} sentences long.
        - Avoid overusing imagery and ensure the selected technique fits appropriately.

        Example Format:
        Sentence acknowledging the emotion.
        Next guiding sentence.
        Another guiding instruction.
        Comforting or empowering concluding sentence.

        Please ensure the script aligns with the specified emotion and stays consistent with the meditation technique, and follows the format and sentences count requirements.
        """
        return prompt
    
    def emotion_2(self, data, num_lines, duration):
        prompt = f"""
            Develop a guided meditation script centered on the emotion: {data.get('emotion')}.
            The script should comprise exactly {num_lines} sentences.

            Structure:
            - Start with a comforting introduction that acknowledges the emotion of {data.get("emotion")}, setting a tone of acceptance and understanding. This section ease them into the meditation.
            - Follow with sentences that guide the listener through a meditation technique suitable for the emotion. Techniques can include breath awareness, body scanning, visualization, loving-kindness, focused attention, vipassana, or any other appropriate method.
            - Each sentence should begin on a new line, separated by the new line character.
            - Progressively deepen the meditation, providing clear and concise instructions.
            - Conclude with a sentence or two offering closure, reassurance, or a positive affirmation. This section should help transition the listener back to their surroundings, carrying the tranquility or insight from the meditation into their day.
            - There will be about {duration - num_lines*20} seconds between each sentence spoken.

            Guidelines:
            - Total length: Strictly {num_lines} sentences. Each sentence should be on a new line.
            - Balance clear guidance with engaging delivery, avoiding overly complex imagery.
            - Ensure the script is coherent, with each sentence logically leading into the next.

            Example Format:
            Introduction sentence that recognizes the emotion of {data.get('emotion')} and eases into the meditation.\n
            Instruction sentence applying the selected meditation technique.\n
            Comforting or empowering conclusion.

            The script should be empathetic towards the emotion: {data.get('emotion')}, and consistently apply the chosen meditation technique, adhering to the format and sentence count.
        """
        return prompt

    
    def get_json(self, prompt):
        return {
            "model": "gpt-4-1106-preview",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.7,
        }
        
    
    # https://stackoverflow.com/questions/37003862/how-to-upload-a-file-to-google-cloud-storage-on-python-3
    def upload_to_gc_bucket(self, filename):
        # Explicitly use service account credentials by specifying the private key
        # file.
        BASE_DIR = Path(__file__).resolve().parent.parent.parent
        logging.info("base dir:", BASE_DIR)
        logging.info("filename:", filename)
        storage_client = storage.Client.from_service_account_json(
            os.path.join(BASE_DIR, "credentials.json")
        )

        # Make an authenticated API request
        buckets = list(storage_client.list_buckets())
        print(buckets)
        bucket = storage_client.get_bucket("ponder_meditations")
        random_id = str(uuid.uuid4())
        blob = bucket.blob(f"meditation-{random_id}.mp3")
        blob.upload_from_filename(filename)
        print("File uploaded to meditation-bucket")
        return blob.public_url
    
    # def bark_tts(self, meditation):
    #     # download and load all models
    #     preload_models()
    #     nltk.download("punkt")
    #     # generate audio from text
    #     #  "As you exhale, let go of any tension or worry in your body. Feel yourself becoming more relaxed with each breath."
    #     text_prompt = (
    #         "Close your eyes and take a deep breath. Imagine yourself standing confidently in front of your audience, feeling calm and composed."
    #         + "Visualize each step of your presentation, from the opening remarks to your final slide."
    #         + "Feel an overwhelming sense of confidence and know that you are well-prepared."
    #         + "Allow any nervousness or anxiety to melt away as you focus your mind on your knowledge and expertise. "
    #         + 'Repeat the mantra, "I am prepared, I am confident, I am capable.". '
    #         + "Open your eyes, feeling rejuvenated and ready to tackle your presentation with ease and grace."
    #     )
    #     sentences = nltk.sent_tokenize(text_prompt)
    #     silence = np.zeros(int(5 * SAMPLE_RATE))
    #     last_silence = np.zeros(int(10 * SAMPLE_RATE))
    #     speaker = "v2/en_speaker_3"
    #     pieces = []
    #     for i, sentence in enumerate(sentences):
    #         audio_array = generate_audio(sentence, history_prompt=speaker)
    #         if i == len(sentences) - 2:
    #             pieces += [audio_array, last_silence.copy()]
    #         else:
    #             pieces += [audio_array, silence.copy()]
    #     audio = np.concatenate(pieces)
    #     # speech_array = generate_audio(text_prompt, history_prompt=speaker)

    #     # play text in notebook
    #     write_wav(Path(__file__).parent.parent / "assets/meditation_speaker_3.wav", SAMPLE_RATE, audio)

    def google_cloud_tts(self, meditation, break_length):
        print("meditation result:", meditation)
        meditation = meditation.split("\n")
        # remove empty lines
        meditation = [line for line in meditation if line not in  ["", " ", "\n"]]
        meditation[0] = meditation[0] + " " + meditation[1]
        meditation.pop(1)
        text = "<speak>"
        for i in range(len(meditation)):
            if meditation[i]:
                text += meditation[i]
                text += f'<break time="{break_length}s"/>' if i != len(meditation) - 1 else ""
        text += "</speak>"

        print("creating meditation text:", text)
        # Instantiates a client
        client = texttospeech.TextToSpeechLongAudioSynthesizeClient.from_service_account_json(
            "../server/credentials.json"
        )
        synthesis_input = texttospeech.SynthesisInput(ssml=text)

        # Build the voice request, select the language code ("en-US") and the ssml
        voice = texttospeech.VoiceSelectionParams(
            name="en-US-Studio-Q",
            language_code="en-US",
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.LINEAR16,
            speaking_rate=0.75,
            # volume_gain_db=-20,
            # pitch=0.95,
        )

        parent = f"projects/{'ponder-399206'}/locations/{'us-central1'}"

        output_uri = f"gs://ponder_meditations/meditation-{str(uuid.uuid4())}.wav"
        request = texttospeech.SynthesizeLongAudioRequest(
                parent=parent,
                input=synthesis_input, voice=voice, audio_config=audio_config, output_gcs_uri=output_uri
            )

        client.synthesize_long_audio(request=request)
        return "https://storage.googleapis.com/" + output_uri.split("//")[1]
