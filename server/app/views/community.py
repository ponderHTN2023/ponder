from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import UserProfile, Community, CommunityUser
from rest_framework import serializers

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ["id", "name", "description", "banner_image", "members"]
    
    name = serializers.CharField(max_length=50)
    description = serializers.CharField()
    banner_image = serializers.CharField(max_length=225, allow_blank=True, allow_null=True)
    members = serializers.SerializerMethodField()

    def get_members(self, obj):
        return obj.community_users.all().count()


class CommunityView(APIView):
    def get(self, request, id):
        user = UserProfile.objects.get(id=id)
        communities = Community.objects.exclude(community_users__user=user)
        serializer = CommunitySerializer(communities, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user = UserProfile.objects.get(id=request.data['user_id'])
        community = Community.objects.create(
            name=request.data["name"],
            description=request.data["description"],
            banner_image=request.data["banner_image"] if "banner_image" in request.data else None,
        )
        community_user = CommunityUser.objects.create(
            user=user,
            community=community,
            status="accepted"
        )
        return Response({"community": community.id, "community_user": community_user.id})

class CommunityDetailView(APIView):
    def get(self, request, id, format=None):
        community = Community.objects.get(id=id)
        return Response({
            "name": community.name,
            "description": community.description,
            "banner_image": community.banner_image,
            "members": community.community_users.all().values(),
            "posts": community.community_posts.all().values()
        })

    def put(self, request, id, format=None):
        community = Community.objects.get(id=id)
        community.name = request.data["name"]
        community.description = request.data["description"]
        community.banner_image = request.data["banner_image"] if "banner_image" in request.data else None
        community.save()
        return Response({"message": "success"})
    
    def delete(self, request, id, format=None):
        community = Community.objects.get(id=id)
        community.delete()
        return Response({"message": "success"})
    