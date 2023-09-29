from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Journal, User


class JournalsView(APIView):
    def get(self, request, format=None):
        user = self.get_or_create_first_user()
        journals = Journal.objects.filter(user=user).values()
        return Response(journals)
    
    def post(self, request, format=None):
        user = User.objects.get(id=1)
        Journal.objects.create(
            title=request.data["title"],
            content=request.data["content"],
            feeling=request.data["feeling"],
            user=user
        )
        return Response({"message": "success"})
    
    def put(self, request, id, format=None):
        journal = Journal.objects.get(id=id)
        journal.title = request.data["title"]
        journal.content = request.data["content"]
        journal.feeling = request.data["feeling"]
        journal.save()
        return Response({"message": "success"})
    
    def delete(self, request, id, format=None):
        journal = Journal.objects.get(id=id)
        journal.delete()
        return Response({"message": "success"})

    def get_or_create_first_user(self):
        users = User.objects.all()
        if not users:
            User.objects.create_user(
                username="admin",
                email="admin@admin.com",
            )
            users = User.objects.all()
        return users.first()