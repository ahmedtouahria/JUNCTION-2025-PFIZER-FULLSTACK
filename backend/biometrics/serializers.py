from rest_framework import serializers
from .models import Biometrics


class BiometricsSerializer(serializers.ModelSerializer):
    """Serializer for Biometrics model."""
    
    class Meta:
        model = Biometrics
        fields = [
            'id', 'user', 'timestamp', 'heart_rate', 'hrv',
            'resting_heart_rate', 'systolic_bp', 'diastolic_bp',
            'steps', 'calories_burned', 'weight', 'body_temperature',
            'data_source', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
