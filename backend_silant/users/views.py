from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from .models import CustomUser


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response(UserSerializer(request.user).data)


@api_view()
def get_service(request: Request):
    service_users = CustomUser.objects.filter(groups__name='Service')
    output = [
        {
            'first_name': output.first_name
        } for output in service_users
    ]
    return Response(output)


@api_view()
def get_client(request: Request):
    service_users = CustomUser.objects.filter(groups__name='Client')
    output = [
        {
            'first_name': output.first_name
        } for output in service_users
    ]
    return Response(output)
