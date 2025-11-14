from rest_framework import serializers
from .models import Prediction


class PredictionSerializer(serializers.ModelSerializer):
    """Serializer for Prediction model."""
    
    class Meta:
        model = Prediction
        fields = [
            'id', 'user', 'date', 'risk_score', 'risk_level',
            'top_factors', 'confidence', 'model_version',
            'recommendations', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
