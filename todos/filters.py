from django_filters import rest_framework as filters
from .models import todoMessage

class todoMessageFilter(filters.FilterSet):
    class Meta:
        model = todoMessage
        fields = ['id', 'owner', 'complete', 'created_at']
