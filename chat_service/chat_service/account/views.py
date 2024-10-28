from django.conf import settings
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .models import Account
from .serializers import AccountSerializer, JWTTokenObtainSerializer, JWTCookieTokenRefreshSerializer
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from .schema import user_list_docs
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.views import APIView


class LogoutAPIView(APIView):
    def post(self, request, format=None):
        response = Response("Logged out successfully")

        response.set_cookie("refresh", "", expires=0)
        response.set_cookie("access", "", expires=0)

        return response

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.AllowAny]

    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get('user_id')
        if user_id:
            try:
                user_data = Account.objects.get(pk=user_id)
            except Account.DoesNotExist:
                serializer = self.serializer_class(None)
            else:
                serializer = self.serializer_class(user_data)
        else:
            serializer = self.serializer_class(self.queryset, many=True)

        return Response(serializer.data)


class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite='None',
                secure=True
            )
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite='None',
                secure=True
            )
            del response.data["access"]

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = JWTTokenObtainSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = JWTCookieTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        # Add some logging to ensure this method is being hit
        print("JWTCookieTokenRefreshView post method is called.")  # Debugging

        # Explicitly pass the request context to the serializer
        serializer = self.get_serializer(data=request.data, context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Token validation failed: {str(e)}")  # Debugging for failed token
            raise e

        # Return the normal response once the token is validated
        return super().post(request, *args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #
    #     try:
    #         serializer = self.serializer_class(data=request.data)
    #         serializer.is_valid(raise_exception=True)
    #
    #         refresh_token = serializer.validated_data["refresh"]
    #         print(">>>>>>>")
    #         print(refresh_token)
    #
    #         new_token = RefreshToken(refresh_token)
    #         new_access_token = str(new_token.access_token)
    #
    #         response = Response({
    #             'access': new_access_token
    #         })
    #
    #         response.set_cookie(
    #             settings.SIMPLE_JWT['ACCESS_TOKEN_NAME'],
    #             new_access_token,
    #             max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
    #             httponly=True,
    #             samesite='None',
    #             secure=True,
    #         )
    #
    #         return response
    #     except TokenError as e:
    #         raise InvalidToken(e.args[0])
