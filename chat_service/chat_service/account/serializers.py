from django.conf import settings
from rest_framework import serializers
from .models import Account
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken


class JWTTokenObtainSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token["example"] = "example"

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        return data


class JWTCookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get("refresh", None)

        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid refresh token found")


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ("password",)
