from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Conversation, Message


from django.contrib.auth import get_user_model

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.group = None
        self.user = None

    def connect(self):
        self.user = self.scope['user']
        print(self.user, "/////////////")
        if not self.user.is_authenticated:
            self.close(code=4001)
            return
        self.accept()
        self.group = self.scope['url_route']['kwargs']['channel_id']

        self.user = User.objects.get(id=1)

        async_to_sync(self.channel_layer.group_add)(
            self.group,
            self.channel_name
        )

    def receive_json(self, text_data=None, bytes_data=None, **kwargs):
        channel_id = self.group
        sender = self.user
        message = text_data["message"]

        conversation, is_created = Conversation.objects.get_or_create(channel_id=channel_id)

        new_message = Message.objects.create(conversation=conversation,
                                             sender=sender, content=message)

        async_to_sync(self.channel_layer.group_send)(
            self.group,
            {
                "type": "chat_message",
                "new_message": {
                    "id": new_message.id,
                    "content": new_message.content,
                    "sender": new_message.sender.email,
                    "created_at": new_message.created_at.isoformat(),
                }
            }
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group,
            self.channel_name
        )
        super().disconnect(code)
