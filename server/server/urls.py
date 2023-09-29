"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.urls import path
from rest_framework import routers
from app.views import GenerateMeditationView, ChallengeView, JournalsView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/meditation", GenerateMeditationView.as_view(), name="generate"),
    path("api/challenges/", ChallengeView.as_view(), name="challenges"),
    path("api/challenges/<int:id>", ChallengeView.as_view(), name="update_challenge"),
    path("api/journals/", JournalsView.as_view(), name="journals"),
    path("api/journals/<int:id>", JournalsView.as_view(), name="update_journal"),
]
