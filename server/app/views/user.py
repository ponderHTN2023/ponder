from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import User
from django.forms.models import model_to_dict


class UserView(APIView):
    def get(self, request, email, format=None):
        user = User.objects.get(email=email)
        return Response(model_to_dict(user))
    
    def post(self, request, format=None):
        first_name = request.data["name"].split(" ")[0]
        last_name = ""
        if len(request.data["name"].split(" ")) > 1:
            last_name = request.data["name"].split(" ")[1]
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            username=request.data["email"],
            email=request.data["email"],
        )
        return Response(model_to_dict(user))