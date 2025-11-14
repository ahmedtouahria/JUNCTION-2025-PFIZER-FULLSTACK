from rest_framework import serializers
from .models import UserAnalytics


class UserAnalyticsSerializer(serializers.ModelSerializer):
    """Serializer for UserAnalytics model."""
    
    class Meta:
        model = UserAnalytics
        fields = [
            'id', 'user', 'period_start', 'period_end',
            'total_migraines', 'avg_severity', 'avg_duration_hours',
            'top_triggers', 'best_day_of_week', 'worst_day_of_week',
            'best_time_of_day', 'worst_time_of_day',
            'sleep_correlation', 'stress_correlation',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
