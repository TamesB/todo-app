from rest_framework import serializers
from .models import todoMessage

# Lead Serializer
class todoMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoMessage
        fields = ['id', 'message', 'complete', 'owner', 'created_at']
