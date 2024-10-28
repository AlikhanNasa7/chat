from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Conversation(models.Model):
    channel_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
