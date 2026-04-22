from rest_framework import generics

from .models import Chore, Assignment
from .serializers import ChoreSerializer, AssignmentSerializer


class ChoreListView(generics.ListAPIView):
    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer


class CreateChoreView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []
    model = Chore
    serializer_class = ChoreSerializer


class ChoreDeleteView(generics.DestroyAPIView):
    authentication_classes = []
    permission_classes = []

    queryset = Chore.objects.all()
    serializer_class = ChoreSerializer
    lookup_field = "pk"
    http_method_names = ["delete"]


class AssignmentListView(generics.ListAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer


class AssignmentCreateView(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []

    model = Assignment
    serializer_class = AssignmentSerializer
