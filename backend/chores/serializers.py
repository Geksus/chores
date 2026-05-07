from django.utils import timezone
from rest_framework import serializers

from .models import Chore, Assignment


class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = "__all__"

    def create(self, validated_data):
        return Chore.objects.create(**validated_data)


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = "__all__"

    def update(self, instance, validated_data):
        if validated_data.get("completed"):
            instance.completed = True
            instance.completed_at = timezone.now()
        else:
            instance.completed = False
            instance.completed_at = None
        instance.save()
        return instance
