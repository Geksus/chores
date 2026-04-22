from rest_framework import serializers

from .models import Chore


class ChoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chore
        fields = "__all__"

    def create(self, validated_data):
        return Chore.objects.create(**validated_data)
