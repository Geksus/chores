from rest_framework import generics, status
from rest_framework.response import Response

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

    def create(self, request, *args, **kwargs):
        many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AssignmentUpdateView(generics.UpdateAPIView):
    authentication_classes = []
    permission_classes = []

    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    lookup_field = "pk"
    http_method_names = ["patch"]


class AssignmentDeleteView(generics.DestroyAPIView):
    authentication_classes = []
    permission_classes = []

    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    lookup_field = "pk"
    http_method_names = ["delete"]
