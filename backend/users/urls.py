from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from users.views import SignUpView, UsersListView, CustomLoginView, CustomLogoutView

app_name = "users"

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("users/", UsersListView.as_view(), name="users"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", CustomLogoutView.as_view(), name="logout"),
]