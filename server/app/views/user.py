from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import User, UserProfile
from django.forms.models import model_to_dict
from rest_framework import serializers
from app.views.activity import ActivitySerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
    min_meditated = serializers.SerializerMethodField()
    avg_duration = serializers.SerializerMethodField()
    num_meditations = serializers.SerializerMethodField()
    sessions = serializers.SerializerMethodField()

    def get_sessions(self, obj):
        return ActivitySerializer(obj.activities.all(), many=True).data

    def get_min_meditated(self, obj):
        return sum([activity.duration for activity in obj.activities.all()])//60
    
    def get_num_meditations(self, obj):
        return len(obj.activities.all())
    
    def get_avg_duration(self, obj):
        num_meditations = self.get_num_meditations(obj)
        if num_meditations == 0:
            return 0
        return self.get_min_meditated(obj)//self.get_num_meditations(obj)

class UserView(APIView):
    def get(self, request, email, format=None):
        user = UserProfile.objects.get(email=email)
        return Response(UserSerializer(user).data)
    
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
        user_profile = UserProfile.objects.create(user=user, name=request.data["name"], email=request.data["email"])
        return Response(model_to_dict(user_profile))