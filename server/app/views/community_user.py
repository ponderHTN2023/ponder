from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import UserProfile, Community, CommunityUser
from app.views.community import CommunitySerializer


class CommunityUserView(APIView):
    def get(self, request, id):
        user = UserProfile.objects.get(id=id)
        communities = CommunityUser.objects.filter(user=user).values_list("community__id", flat=True)
        serialized = CommunitySerializer(Community.objects.filter(id__in=communities), many=True) 
        return Response(list(serialized.data))

class CommunityUserDetailView(APIView):
    def get(self, request, user_id, community_id):
        community_user = CommunityUser.objects.get(user_id=user_id, community_id=community_id)
        return Response({
            "user": community_user.user.id,
            "community": community_user.community.id,
            "status": community_user.status
        })
    
    def post(self, request, user_id, community_id, format=None):
        user = UserProfile.objects.get(id=user_id)
        community = Community.objects.get(id=community_id)
        community_user = CommunityUser.objects.create(
            user=user,
            community=community,
            status="joined"
        )
        return Response({"community_user": community_user.id})
    
    def put(self, request, id, format=None):
        community_user = CommunityUser.objects.get(id=id)
        community_user.status = request.data["status"]
        community_user.save()
        return Response({"message": "success"})
    
    def delete(self, request, id, format=None):
        community_user = CommunityUser.objects.get(id=id)
        community_user.delete()
        return Response({"message": "success"})