from django_filters import rest_framework as filters
from .models import todoMessage, todoTab

class todoMessageFilter(filters.FilterSet):
    class Meta:
        model = todoMessage
        fields = ['id', 'owner', 'complete', 'tab', 'created_at']


class todoTabFilter(filters.FilterSet):
    class Meta:
        model = todoTab
        fields = ['id', 'tab', 'owner']