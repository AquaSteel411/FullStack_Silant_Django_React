from rest_framework.serializers import Serializer, ModelSerializer, CharField
from .models import CustomUser
from django.contrib.auth.models import Group


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'groups']


class LoginRequestSerializer(Serializer):
    model = CustomUser

    username = CharField(required=True)
    password = CharField(required=True)
