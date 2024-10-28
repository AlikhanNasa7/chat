from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet, CategoryViewSet
from django.conf import settings
from django.conf.urls.static import static
from webchat.consumer import ChatConsumer
from webchat.views import MessageViewSet
router = DefaultRouter()
router.register('api/server/select', ServerListViewSet)
router.register('api/categories', CategoryViewSet)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from account.views import AccountViewSet, JWTCookieTokenObtainPairView, JWTCookieTokenRefreshView, LogoutAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/schema/ui', SpectacularSwaggerView.as_view()),
    path('api/messages/', MessageViewSet.as_view({'get': 'list'})),
    path('api/token/', JWTCookieTokenObtainPairView.as_view(), name='get_tokens'),
    path('api/token/refresh/', JWTCookieTokenRefreshView.as_view(), name='refresh_token'),
    path('api/account/', AccountViewSet.as_view({'get': 'list'})),
    path('api/logout', LogoutAPIView.as_view(), name='logout')
] + router.urls

websocket_urlpatterns = [
    path("<str:server_id>/<str:channel_id>", ChatConsumer.as_asgi())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
