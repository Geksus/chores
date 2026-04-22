from django.urls import path

from .views import (
    CreateChoreView,
    ChoreListView,
    ChoreDeleteView,
    AssignmentCreateView,
    AssignmentListView,
)

app_name = "chores"

urlpatterns = [
    path("chores/", ChoreListView.as_view(), name="chore_list"),
    path("create-chore/", CreateChoreView.as_view(), name="create_chore"),
    path("delete/<int:pk>/", ChoreDeleteView.as_view(), name="delete_chore"),
    path("assignments/", AssignmentListView.as_view(), name="assignment_list"),
    path(
        "create-assignment/", AssignmentCreateView.as_view(), name="create_assignment"
    ),
]
