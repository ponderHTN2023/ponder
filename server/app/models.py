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

class Community(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    banner_image = models.CharField(max_length=225, blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

class CommunityUser(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserProfile, related_name="community_users", on_delete=models.CASCADE)
    community = models.ForeignKey(Community, related_name="community_users", on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="joined")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.user.name + " - " + self.community.name
    
class CommunityPost(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    community_user = models.ForeignKey(CommunityUser, related_name="community_posts", on_delete=models.CASCADE, default=2)
    activity = models.ForeignKey(Activity, related_name="community_posts", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class CommunityPostComment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    community_user = models.ForeignKey(CommunityUser, related_name="community_post_comments", on_delete=models.CASCADE)
    community_post = models.ForeignKey(CommunityPost, related_name="comments", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.content

class CommunityPostLike(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    community_user = models.ForeignKey(CommunityUser, related_name="community_post_likes", on_delete=models.CASCADE)
    community_post = models.ForeignKey(CommunityPost, related_name="likes", on_delete=models.CASCADE)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.community_post.title
