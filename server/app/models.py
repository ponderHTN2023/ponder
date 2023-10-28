from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.


class UserProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=254, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Challenge(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    user = models.ForeignKey(UserProfile, related_name="challenges", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Journal(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    feeling = models.IntegerField()
    user = models.ForeignKey(UserProfile, related_name="journals", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=50)
    duration = models.IntegerField()
    uri = models.CharField(max_length=225, blank=True, null=True)
    emotion = models.TextField(blank=True, null=True)
    technique = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(UserProfile, related_name="activities", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
