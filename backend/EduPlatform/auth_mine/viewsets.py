from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView


class RegisterViewSet(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"],
        }, status=status.HTTP_201_CREATED)


class LoginViewSet(viewsets.ViewSet):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        print(request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RefreshTokenViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        print(request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
