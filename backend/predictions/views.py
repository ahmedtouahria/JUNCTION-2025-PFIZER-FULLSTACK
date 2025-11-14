from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from django.db.models import Q

from .models import Prediction
from .serializers import PredictionSerializer
from .ml_engine import MigrainePredictionEngine


class PredictionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Prediction operations."""
    
    serializer_class = PredictionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Prediction.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's prediction, generate if doesn't exist."""
        today = datetime.now().date()
        
        # Try to get existing prediction
        prediction = Prediction.objects.filter(
            user=request.user,
            date=today
        ).first()
        
        if not prediction:
            # Generate new prediction
            engine = MigrainePredictionEngine(request.user)
            result = engine.predict_risk(today)
            
            # Save prediction
            prediction = Prediction.objects.create(
                user=request.user,
                date=today,
                risk_score=result['risk_score'],
                risk_level=result['risk_level'],
                top_factors=result['top_factors'],
                confidence=result['confidence'],
                model_version=result['model_version'],
                recommendations=result['recommendations']
            )
        
        serializer = self.get_serializer(prediction)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def forecast(self, request):
        """Get 7-day forecast."""
        engine = MigrainePredictionEngine(request.user)
        forecast_data = engine.predict_next_7_days()
        
        return Response({
            'forecast': forecast_data,
            'user': request.user.username
        })
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Manually trigger prediction generation."""
        target_date = request.data.get('date', datetime.now().date())
        
        if isinstance(target_date, str):
            target_date = datetime.fromisoformat(target_date).date()
        
        engine = MigrainePredictionEngine(request.user)
        result = engine.predict_risk(target_date)
        
        # Create or update prediction
        prediction, created = Prediction.objects.update_or_create(
            user=request.user,
            date=target_date,
            defaults={
                'risk_score': result['risk_score'],
                'risk_level': result['risk_level'],
                'top_factors': result['top_factors'],
                'confidence': result['confidence'],
                'model_version': result['model_version'],
                'recommendations': result['recommendations']
            }
        )
        
        serializer = self.get_serializer(prediction)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
