from rest_framework import serializers
from .models import todoMessage, todoTab

# Lead Serializer
class todoMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoMessage
        fields = ['id', 'message', 'complete', 'owner', 'tab', 'created_at']

class todoTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = todoTab
        fields = ['id', 'tab', 'owner']
