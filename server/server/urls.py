
from django.contrib import admin
from django.urls import path, include, re_path
from django.urls import path
from rest_framework import routers
from app.views import GenerateMeditationView, ChallengeView, UserActivityView, ActivityDetailView, UserView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/meditation", GenerateMeditationView.as_view(), name="generate"),
    path("api/challenges/<int:id>", ChallengeView.as_view(), name="update_challenge"),
    path("api/users/<int:id>/challenges/", ChallengeView.as_view(), name="challenges"),
    path("api/activities/", UserActivityView.as_view(), name="create_activity"),
    path("api/activities/<int:id>", UserActivityView.as_view(), name="user_activities"),
    path("api/activity/<int:id>", ActivityDetailView.as_view(), name="activity_detail"),
    path("api/users/<str:email>", UserView.as_view(), name="get_user"),
    path("api/users/", UserView.as_view(), name="create_user")
]
