from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Challenge, UserProfile
import requests

import json
import os


class ChallengeView(APIView):
    def get(self, request, id, format=None):
        user = UserProfile.objects.get(id=id)
        challenges = Challenge.objects.filter(user=user).filter(active=True)
        curr_challenges = challenges.values() if challenges else []
        if challenges.filter(completed=True).count() == len(challenges):
            challenges.update(active=False)
            challenges = None
        if not challenges:
            print("generating challenges...")
            generated = self.generate_challenges(curr_challenges)
            challenges = self.process_results(generated, user)

        res = challenges.values()
        return Response(res)
    
    def post(self, request, id, format=None):
        challenge = Challenge.objects.get(id=id)
        user = challenge.user
        challenge.completed = request.data["completed"]
        challenge.save()
        incomplete = Challenge.objects.filter(user=user).filter(completed=False)
        if incomplete.count() == 0:
            challenges = Challenge.objects.filter(user=user)
            curr_challenges = challenges.values() if challenges else []
            challenges.update(active=False)
            challenges = self.generate_challenges(curr_challenges)
            self.process_results(challenges, user)
            return Response({"reset": True, "message": "success"})
        return Response({"reset": False, "message": "success"})

    def generate_challenges(self, challenges):
        prompt = 'Generate 5 unique mindfulness and kindfulness challenges that foster a healthy relationship with oneself and others, promoting presence in daily life. Output the challenges as a raw JSON object list with no extra characters or formatting. Each key represents the title of the challenge, and the value is the challenge description. Example: [{"Mindfulness Walk": "example text"}].\n\nAvoid repeating the following challenges:[' + ''.join(
            [
                '{"' + challenge['title'] + '": "' + challenge['content'] + '"}, '
                for challenge in challenges
            ]    
        )+ "]"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + os.environ.get("OPENAI_API_KEY"),
        }
        import pdb; pdb.set_trace()
        try:
            res = requests.post(
                url="https://api.openai.com/v1/chat/completions",
                headers=headers,
                json=self.get_json(prompt),
            ).json()["choices"][0]["message"]["content"]
        except KeyError as e:
            print("error:", e)
            res = None
        return res

    def get_json(self, prompt):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 1.2,
        }

    def process_results(self, generated, user):
        print("results:", generated)
        result = json.loads(generated)
        for challenge in result:
            key = list(challenge.keys())[0]
            value = list(challenge.values())[0]
            Challenge.objects.create(title=key, content=value, user=user)
        return Challenge.objects.filter(user=user).filter(active=True)
