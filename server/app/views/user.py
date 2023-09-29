from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import User


class UserView(APIView):
    def get(self, request, id, format=None):
        user = User.objects.get(id=id)
        return Response(user.values())
    
    def post(self, request, format=None):
        user = User.objects.create_user(
            username=request.data["email"],
            email=request.data["email"],
        )
        return Response(user.values())