from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import MigraineEvent
from .serializers import MigraineEventSerializer


class MigraineEventViewSet(viewsets.ModelViewSet):
    """ViewSet for MigraineEvent CRUD operations."""
    
    serializer_class = MigraineEventSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['start_time', 'severity', 'pain_location']
    ordering_fields = ['start_time', 'severity']
    ordering = ['-start_time']
    
    def get_queryset(self):
        return MigraineEvent.objects.filter(user=self.request.user)
