from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Server, Category
from .serializers import ServerSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from .schema import server_list_docs
from drf_spectacular.utils import extend_schema


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(responses=CategorySerializer)
    def list(self, request, *args, **kwargs):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permission_classes = [permissions.IsAuthenticated]

    @server_list_docs
    def list(self, request):
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user')
        print(request.query_params)
        print(by_user, 123412345555)
        with_num_members = request.query_params.get('with_num_members') == 'true'

        if by_user and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)
            print(self.queryset)

        if with_num_members:
            self.queryset = self.queryset.objects.annotate(num_members=Count('member'))

        if qty:
            self.queryset = self.queryset[:int(qty)]

        serializer = self.serializer_class(self.queryset, many=True, context={'num_members': with_num_members})

        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            instance = self.queryset.get(pk=pk)
            print(instance)

        except Server.DoesNotExist:
            raise ValidationError(detail=f"No such server with id: {pk} exists")

            # if not request.user.is_authenticated:
            #     raise AuthenticationFailed()
        except ValueError:
            raise ValidationError(detail=f"Server value error")


        serializer = self.serializer_class(instance)
        return Response(serializer.data)
