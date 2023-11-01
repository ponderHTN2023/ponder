from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import UserProfile, Community, CommunityUser
from rest_framework import serializers


class CommunityView(APIView):
    def get(self, request):
        communities = Community.objects.all().values()
        return Response(communities)
    
    def post(self, request, id):
        user = UserProfile.objects.get(id=id)
        community = Community.objects.create(
            title=request.data["title"],
            description=request.data["description"],
            banner_image=request.data["banner_image"] if "banner_image" in request.data else None,
        )
        community_user = CommunityUser.objects.create(
            user=user,
            community=community,
            status="accepted"
        )
        return Response({"community": community.id, "community_user": community_user.id})
    
    def put(self, request, id, format=None):
        community = Community.objects.get(id=id)
        community.title = request.data["title"]
        community.description = request.data["description"]
        community.banner_image = request.data["banner_image"] if "banner_image" in request.data else None
        community.save()
        return Response({"message": "success"})
    
    def delete(self, request, id, format=None):
        community = Community.objects.get(id=id)
        community.delete()
        return Response({"message": "success"})

class CommunityDetailView(APIView):
    def get(self, request, id, format=None):
        community = Community.objects.get(id=id)
        return Response({
            "title": community.title,
            "description": community.description,
            "banner_image": community.banner_image,
            "members": community.community_users.all().values()
        })
    