from django.urls import path

from .views import CreateChoreView, ChoreListView, ChoreDeleteView

urlpatterns = [
    path("create/", CreateChoreView.as_view(), name="create_chore"),
    path("", ChoreListView.as_view(), name="chore_list"),
    path("delete/<int:pk>/", ChoreDeleteView.as_view(), name="delete_chore"),
]
