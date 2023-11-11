from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import UserProfile, Activity, CommunityUser, CommunityPost
from app.views.community import CommunitySerializer


class CommunityPostView(APIView):
    # def get(self, request, id):
    #     user = UserProfile.objects.get(id=id)
    #     communities = CommunityPost.objects.filter(user=user).values_list("community__id", flat=True)
    #     serialized = CommunitySerializer(Community.objects.filter(id__in=communities), many=True) 
    #     return Response(list(serialized.data))
    
    def post(self, request, user_id, community_id, activity_id, format=None):
        community_user = CommunityUser.objects.get(community_id=community_id, user_id=user_id)
        activity = Activity.objects.get(id=activity_id)
        community_post = CommunityPost.objects.create(
            community_user=community_user,
            activity=activity,
            title=request.data["title"] if "title" in request.data else "",
        )
        return Response({"community_post": community_post})
