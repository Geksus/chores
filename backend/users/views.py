from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserCreateSerializer, UserListSerializer


class SignUpView(generics.CreateAPIView):
    model = User
    serializer_class = UserCreateSerializer
    success_url = reverse_lazy('login')


class UsersListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class CustomLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CustomLogoutView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)