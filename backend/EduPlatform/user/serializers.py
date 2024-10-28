from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True, format="hex", source="public_id")
    created = serializers.DateTimeField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'courses',
                  'last_name', 'email',
                  'is_active', 'created', 'updated']
        read_only_field = ['is_active']