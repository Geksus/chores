from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserCreateSerializer, UserListSerializer


class SignUpView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []
    model = User
    serializer_class = UserCreateSerializer


class UsersListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class CustomLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user:
            user_data = User.objects.get(username=username)
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "username": username,
                    "name": user_data.first_name,
                    "is_child": user_data.is_child,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


class CustomLogoutView(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
