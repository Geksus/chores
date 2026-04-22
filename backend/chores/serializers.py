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
        fields = ["id", "user", "chore", "completed"]

        def create(self, validated_data):
            return Assignment.objects.create(**validated_data)
