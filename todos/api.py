from .models import todoMessage, todoTab
from .filters import todoMessageFilter, todoTabFilter
from .serializers import todoMessageSerializer, todoTabSerializer

from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import generics
from rest_framework.response import Response
from django_filters import rest_framework as filters


class todoMessageViewSet(viewsets.ModelViewSet):
    queryset = todoMessage.objects.all().order_by('created_at')
    serializer_class = todoMessageSerializer
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = todoMessageFilter

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
        )

class todoTabViewSet(viewsets.ModelViewSet):
    queryset = todoTab.objects.all().order_by('id')
    serializer_class = todoTabSerializer
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = todoTabFilter

    def perform_create(self, serializer):
        serializer.save(
            owner=self.request.user,
        )