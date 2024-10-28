from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Message, Conversation
from .serializers import MessageSerializer
from rest_framework import permissions


class MessageViewSet(viewsets.ViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.AllowAny,)

    def list(self, request, **kwargs):
        print(999999999)
        print(request.query_params)
        channel_id = request.query_params["channel_id"]
        try:
            channel_id = int(channel_id)
        except Exception as e:
            return Response({"error": f"Channel id is invalid. {e}"}, status=400)
        conversation = Conversation.objects.get(id=channel_id)
        messages = Message.objects.filter(conversation=conversation)

        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data)
