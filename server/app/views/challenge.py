from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Challenge, User
import requests

import json
import os


class ChallengeView(APIView):
    def get(self, request, format=None):
        user = self.get_or_create_first_user()
        challenges = Challenge.objects.filter(user=user)
        curr_challenges = challenges.values() if challenges else []
        if challenges.filter(completed=True).count() == len(challenges):
            challenges.delete()
            challenges = None
        if not challenges:
            print("generating challenges...")
            import pdb; pdb.set_trace()
            generated = self.generate_challenges(curr_challenges)
            challenges = self.process_results(generated)

        res = challenges.values()
        return Response(res)
    
    def post(self, request, id, format=None):
        user = self.get_or_create_first_user()
        challenge = Challenge.objects.get(id=id)
        challenge.completed = request.data["completed"]
        challenge.save()
        incomplete = Challenge.objects.filter(user=user, completed=False)
        if incomplete.count() == 0:
            challenges = Challenge.objects.filter(user=user)
            curr_challenges = challenges.values() if challenges else []
            challenges.delete()
            challenges = self.generate_challenges(curr_challenges)
            self.process_results(challenges)
            return Response({"reset": True, "message": "success"})
        return Response({"reset": False, "message": "success"})
    
    def get_or_create_first_user(self):
        users = User.objects.all()
        if not users:
            User.objects.create_user(
                username="admin",
                email="admin@admin.com",
            )
            users = User.objects.all()
        return users.first()

    def generate_challenges(self, challenges):
        prompt = "Generate 7 unique mindfulness and kindfulness challenges that inspire a healthy relationship with oneself and others, and promote presence in life. Please generate these challenges in solely raw JSON object with the each key being the challenge title and the value being the challenge description. Example: {'Mindfulness Walk': 'example text'}. Thank you!\n\nThe current challenges are:\n\n" + "\n".join(
            [
                challenge.title + ": " + challenge.content + "\n"
                for challenge in challenges
            ]
        )
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
            res = None
        return res

    def get_json(self, prompt):
        return {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 1.2,
        }

    def process_results(self, generated):
        print("results:", generated)
        result = json.loads(generated)
        for key in result.keys():
            user = User.objects.get(id=1)
            Challenge.objects.create(title=key, content=result[key], user=user)
        return Challenge.objects.all()
