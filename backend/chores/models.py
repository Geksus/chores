from django.db import models

from users.models import User


class Chore(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    base_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class Assignment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assignments")
    chore = models.ForeignKey(Chore, on_delete=models.CASCADE, related_name="assignments")
    completed = models.BooleanField(default=False)
    points = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        unique_together = ("user", "chore", "created_at", "completed_at")
