from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Activity, UserProfile
from rest_framework import serializers


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class UserActivityView(APIView):
    def get(self, request, id):
        user = UserProfile.objects.get(id=id)
        activities = Activity.objects.filter(user=user).values()
        return Response(activities)
    
    def post(self, request, id):
        user = UserProfile.objects.get(id=id)
        Activity.objects.create(
            description=request.data["description"] if "description" in request.data else None,
            name=request.data["name"],
            duration=request.data["duration"],
            technique=request.data["technique"] if "technique" in request.data else None,
            uri = request.data['uri'] if 'uri' in request.data else None,
            emotion = request.data['emotion'] if 'emotion' in request.data else None,
            user=user
        )
        return Response({"message": "success"})
    
    def put(self, request, id, format=None):
        activity = Activity.objects.get(id=id)
        activity.description = request.data["description"]
        activity.name = request.data["name"]
        activity.duration = request.data["duration"]
        activity.meditation_type = request.data["meditation_type"]
        activity.save()
        return Response({"message": "success"})
    
    def delete(self, request, id, format=None):
        activity = Activity.objects.get(id=id)
        activity.delete()
        return Response({"message": "success"})

class ActivityDetailView(APIView):
    def get(self, request, id, format=None):
        activity = Activity.objects.get(id=id)
        return Response({
            "description": activity.description,
            "name": activity.name,
            "duration": activity.duration,
            "meditation_type": activity.technique,
            "emotion": activity.emotion,
            "uri": activity.uri,
        })