from django.urls import path

from users.views import SignUpView, UsersListView, CustomLoginView, CustomLogoutView, UserUpdateView, UserDeleteView

app_name = "users"

urlpatterns = [
    path("register/", SignUpView.as_view(), name="signup"),
    path("users/", UsersListView.as_view(), name="users"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", CustomLogoutView.as_view(), name="logout"),
    path("update/<int:pk>/", UserUpdateView.as_view(), name="update"),
    path("delete/<int:pk>/", UserDeleteView.as_view(), name="delete"),
]
