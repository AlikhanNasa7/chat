import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chat_service.settings')

django_application = get_asgi_application()
from webchat.middleware import JWTAuthMiddleware

from . import urls

application = ProtocolTypeRouter({
    "http": django_application,
    "websocket": JWTAuthMiddleware(URLRouter(urls.websocket_urlpatterns)),
})
