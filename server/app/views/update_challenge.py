from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Challenge, User
import requests

import json
import os


class UpdateChallengeView(APIView):
     def post(self, request, id, format=None):
        challenge = Challenge.objects.get(id=id)
        challenge.completed = request.data["completed"]
        challenge.save()
        return Response({"message": "success"})