from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import os
from google.cloud import texttospeech
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav
import nltk
import numpy as np
import time


class GenerateMeditationView(APIView):
    def post(self, request, format=None):
        meditation = self.generate_meditations(request.data)
        self.google_cloud_tts(meditation)
        # self.bark_tts(meditation)
        return Response(meditation)

    def generate_meditations(self, data):
        if not data:
            data = {
                "duration": 60,
                "context": "I have a big presentation coming up and I'm feeling nervous.",
            }
        prompt = f"Pretend you are a gifted guru with all knowledge of meditation and spirituality. Generate a unique personalized guided meditation in {data['duration']//9} sentences, please.\n\n"
        if data.get("duration"):
            prompt += "Duration: " + str(data["duration"]) + " seconds" + "\n"
        if data.get("technique"):
            prompt += "Meditation Technique: " + data.get("technique") + "\n"
        if data.get("emotion"):
            prompt += "Emotion: " + data.get("emotion") + "\n"
        prompt += f"\nPlease create a tailored guided meditation that aligns directly with the current state and situation, {', technique, and duration' if data.get('technique') else 'and duration' }. Make it as personalized as possible. Each sentence of the meditation text should end in a period followed by a single new line character. Thank you!"

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
        return res

    def get_json(self, prompt):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 1.2,
        }

    def google_cloud_tts(self, meditation):
        print("meditation result:", meditation)
        meditation = meditation.split("\n")
        text = "<speak>"
        for i in range(len(meditation)):
            if meditation[i]:
                text += meditation[i]
                text += '<break time="3s"/>' if i != len(meditation) - 1 else ""
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
        with open(f"../mobile/assets/meditation.mp3", "wb") as out:
            response = client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )
            # Write the response to the output file.
            out.write(response.audio_content)
            time.sleep(5)
            print('Audio content written to file "meditation.mp3"')

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
        write_wav("../mobile/assets/meditation_speaker_3.wav", SAMPLE_RATE, audio)
