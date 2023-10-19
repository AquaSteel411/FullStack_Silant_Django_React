from django.urls import path
from .views import user, get_service, get_client
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView


urlpatterns = [
    path('auth', user, name='user'),
    path('api_token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api_token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api_token/black_list', TokenBlacklistView.as_view(), name='token_black_list'),
    path('get_service', get_service, name='service'),
    path('get_client', get_client, name='client'),
]
