from rest_framework import serializers
from .models import MigraineEvent


class MigraineEventSerializer(serializers.ModelSerializer):
    """Serializer for MigraineEvent model."""
    
    duration_hours = serializers.ReadOnlyField()
    
    class Meta:
        model = MigraineEvent
        fields = [
            'id', 'user', 'start_time', 'end_time', 'severity',
            'symptoms', 'pain_location', 'triggers', 'medications_taken',
            'relief_methods', 'effectiveness_rating', 'notes',
            'duration_hours', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'duration_hours']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
