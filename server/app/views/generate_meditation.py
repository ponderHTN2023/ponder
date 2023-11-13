from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import os
from google.cloud import texttospeech, storage
from bark import SAMPLE_RATE, generate_audio, preload_models
import uuid
from scipy.io.wavfile import write as write_wav
import nltk
import numpy as np
import time
import io
from openai import OpenAI
from pathlib import Path

# 1 min = 800 chars



class GenerateMeditationView(APIView):
    def post(self, request, format=None):
        meditation = self.generate_meditations(request.data)
        # import pdb; pdb.set_trace()
        upload_url = self.google_cloud_tts(meditation, request.data['duration'])
        # self.bark_tts(meditation)
        return Response({"meditation": upload_url})
    
    def create_speech(text):
        client = OpenAI()

        speech_file_path = Path(__file__).parent.parent / "assets/speech.mp3"
        response = client.audio.speech.create(model="tts-1-hd", voice="onyx", input=text)
        response.stream_to_file(speech_file_path)

    def generate_meditations(self, data):
        divisor = (10 + (data['duration']//60)*2) if data['duration'] > 60 else 10
        if (data['duration']//60) >= 5:
            divisor = (12 + (data['duration']//60)*2)
        num_lines = data['duration']//divisor
        if data.get("emotion") and not data.get("technique"):
            prompt = self.prompt_5(data, num_lines)
        elif data.get("technique") and not data.get("emotion"):
            prompt = self.prompt_4(data, num_lines)
        else:
            prompt = self.prompt_6(data, num_lines)
        print("sending request...")
        print("prompt:", prompt, "\n\n")
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
    
    def prompt_1(self, data, num_lines):
        chars = num_lines * 60
        prompt = f"As a skilled meditation guide with deep insights, craft a profound guided meditation for a unique experience in about {chars} characters. Each sentence should be on a new line.\n\n"
        if data.get("technique"):
            prompt += "Meditation Type: " + data.get("technique") + "\n"
        if data.get("emotion"):
            prompt += "Emotion: " + data.get("emotion") + "\n"
        prompt += f'Imagine you are guiding someone through a journey tailored to their emotions and situation{", using the specified meditation technique"if data.get("technique") else ""}. Format your output like this:\nExample sentence.\nAnother sentence.\nAnother sentence.\n'
        return prompt
    
    def prompt_2(self, data, num_lines):
        prompt = f"Imagine you're a seasoned meditation guide crafting a personalized session. Generate a profound and unique personalized guided meditation in {num_lines} sentences. Each sentence should be on a new line.\n\n"
        if data.get("technique"):
            prompt += "Meditation Technique: " + data.get("technique") + "\n"
        if data.get("emotion"):
            prompt += "Emotion: " + data.get("emotion") + "\n"
        prompt += f'\nCreate a bespoke tailored guided meditation that aligns directly with the current state and situation, {", technique, and duration" if data.get("technique") else "and duration" }. Incorporate soothing imagery, empowering affirmations, and gentle guidance. Make it deeply personal. Format your output like this:\nExample sentence.\nAnother sentence.\nAnother sentence.\n'
        return prompt
    
    def prompt_3(self, data, num_lines):
        prompt = f"Pretend you are a gifted meditation guru with all knowledge of meditation and spirituality. Generate a unique personalized guided meditation in {num_lines} sentences and each complete sentence should be on a new line, please.\n\n"
        if data.get("technique"):
            prompt += "Meditation Technique: " + data.get("technique") + "\n"
        if data.get("emotion"):
            prompt += "Emotion: " + data.get("emotion") + "\n"
        prompt += f'\nPlease create a tailored guided meditation that aligns directly with the current state and situation, {", technique, and duration" if data.get("technique") else "and duration" }. Make it as personalized as possible. The format of the output is \nExample sentence.\nAnother sentence.\nAnother sentence.\n'
        return prompt
    
    def prompt_4(self, data, num_lines):
        chars = num_lines * 60
        prompt = (f"As a meditation guide specialized in {data.get('technique')}, "
          "craft a detailed script for a session. "
          f"Your script should be comprised of {num_lines} thoughtfully constructed sentences.\n"
          "Begin with an engaging introduction that eases the participant into the meditation, "
          "gradually guide them through the stages or steps typical of the {data.get('technique')} technique, "
          "and conclude with a gentle closure that leaves the participant in a state of calm and mindfulness.\n"
          "Ensure that each instruction or sentence is presented on a new line, adhering to the following format:\n"
          "Example introductory sentence.\n"
          "Followed by a technique-focused guiding sentence.\n"
          "Concluding with a soothing closing sentence.\n"
          "Remember, each sentence should vividly embody the essence and uniqueness of the {data.get('technique')} meditation technique.")
        return prompt
    
    def prompt_5(self, data, num_lines):
        chars = num_lines * 60
        prompt = f"""
        Craft a unique guided meditation script focused on the emotion: {data.get('emotion')}. 
        The script should consist of around {num_lines} sentences, including spaces and punctuation.

        Structure:
        - Begin each sentence on a new line using at most {num_lines} sentences.
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
    
    def prompt_6(self, data, num_lines):
        chars = num_lines * 60  # character count remains the same
        return f"""
        As a meditation architect, your task is to weave a transformative guided meditation script. This script should resonate with the emotion: {data.get('emotion')}, employing the meditation technique: {data.get('technique')}. Aim to compose a script of about {num_lines} sentences, each sentence embodying a breath of clarity and focus.

        **Structural Flow:**
        - Commence with an introduction that gently acknowledges and embraces the specified emotion.
        - Unfold the meditation journey with a variety of authentic and creative directives, aligning with the chosen technique.
        - Culminate the session with a warm, reassuring sentiment that empowers and comforts the meditator.

        **Craftsmanship Guidelines:**
        - Tailor each sentence with care and precision, adhering to the limit of {num_lines} sentences.
        - Navigate the landscape of imagery with balance, ensuring its use complements rather than overwhelms the meditation experience.
        - Harmonize the essence of the selected technique with the emotional theme, cultivating a congruent meditation flow.

        **Example Blueprint:**
        An empathetic sentence acknowledging the emotion.
        A guiding statement that gently leads into the meditation technique.
        Continuous, fluid instructions that deepen the meditation experience.
        A closing sentiment that blankets the meditator with comfort and empowerment.

        Embark on this creative journey with mindfulness, ensuring your script is a luminous guide that aligns harmoniously with the specified emotion and meditation technique, fulfilling the format and sentence count requisites.
        """

    
    def get_json(self, prompt):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 1.2,
        }
        

    def google_cloud_tts(self, meditation, duration):
        print("meditation result:", meditation)
        break_length = 7 + ((duration - 60) // 60)*2
        meditation = meditation.split("\n")
        text = "<speak>"
        for i in range(len(meditation)):
            if meditation[i]:
                text += meditation[i]
                text += f'<break time="{break_length}s"/>' if i != len(meditation) - 1 else ""
        text += "</speak>"

        print("creating meditation text:", text)
        # Instantiates a client
        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(ssml=text)

        # Build the voice request, select the language code ("en-US") and the ssml
        # voice gender ("neutral")
        voice = texttospeech.VoiceSelectionParams(
            name="en-GB-Neural2-D",
            language_code="en-GB",
        )

        # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=0.95,
            # pitch=0.95,
        )

        # The response's audio_content is binary.
        with open("app/assets/meditation.mp3", "wb") as out:
            response = client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )
            # Write the response to the output file.
            out.write(response.audio_content)
            time.sleep(5)
            print('Audio content written to file "meditation.mp3"')
        return self.upload_to_gc_bucket()
    
    # https://stackoverflow.com/questions/37003862/how-to-upload-a-file-to-google-cloud-storage-on-python-3
    def upload_to_gc_bucket(self):
        # Explicitly use service account credentials by specifying the private key
        # file.
        storage_client = storage.Client.from_service_account_json(
            "../server/credentials.json"
        )

        # Make an authenticated API request
        buckets = list(storage_client.list_buckets())
        print(buckets)
        bucket = storage_client.get_bucket("ponder_meditations")
        random_id = str(uuid.uuid4())
        blob = bucket.blob(f"meditation-{random_id}.mp3")
        blob.upload_from_filename("app/assets/meditation.mp3")
        print("File uploaded to meditation-bucket")
        return blob.public_url
    
    def bark_tts(self, meditation):
        # download and load all models
        preload_models()
        nltk.download("punkt")
        # generate audio from text
        #  "As you exhale, let go of any tension or worry in your body. Feel yourself becoming more relaxed with each breath."
        text_prompt = (
            "Close your eyes and take a deep breath. Imagine yourself standing confidently in front of your audience, feeling calm and composed."
            + "Visualize each step of your presentation, from the opening remarks to your final slide."
            + "Feel an overwhelming sense of confidence and know that you are well-prepared."
            + "Allow any nervousness or anxiety to melt away as you focus your mind on your knowledge and expertise. "
            + 'Repeat the mantra, "I am prepared, I am confident, I am capable.". '
            + "Open your eyes, feeling rejuvenated and ready to tackle your presentation with ease and grace."
        )
        sentences = nltk.sent_tokenize(text_prompt)
        silence = np.zeros(int(5 * SAMPLE_RATE))
        last_silence = np.zeros(int(10 * SAMPLE_RATE))
        speaker = "v2/en_speaker_3"
        pieces = []
        for i, sentence in enumerate(sentences):
            audio_array = generate_audio(sentence, history_prompt=speaker)
            if i == len(sentences) - 2:
                pieces += [audio_array, last_silence.copy()]
            else:
                pieces += [audio_array, silence.copy()]
        audio = np.concatenate(pieces)
        # speech_array = generate_audio(text_prompt, history_prompt=speaker)

        # play text in notebook
        write_wav(Path(__file__).parent.parent / "assets/meditation_speaker_3.wav", SAMPLE_RATE, audio)
