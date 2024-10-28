from rest_framework import routers
from user.viewsets import UserViewSet
from auth_mine.viewsets import RegisterViewSet, LoginViewSet, RefreshTokenViewSet
router = routers.SimpleRouter()


router.register(r'user', UserViewSet, basename='user')
router.register(r'auth_mine/register', RegisterViewSet, basename='auth_mine-register')
router.register(r'auth_mine/login', LoginViewSet, basename='auth_mine-login')
router.register(r'auth_mine/token/refresh', RefreshTokenViewSet, basename='auth_mine-refresh')

urlpatterns = [
   *router.urls,
]