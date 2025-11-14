from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Biometrics
from .serializers import BiometricsSerializer


class BiometricsViewSet(viewsets.ModelViewSet):
    """ViewSet for Biometrics CRUD operations."""
    
    serializer_class = BiometricsSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['timestamp', 'data_source']
    ordering_fields = ['timestamp']
    ordering = ['-timestamp']
    
    def get_queryset(self):
        return Biometrics.objects.filter(user=self.request.user)
