from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_child = models.BooleanField(default=True)
    points = models.PositiveIntegerField(default=0)
