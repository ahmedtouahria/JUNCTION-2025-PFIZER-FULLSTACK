from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime, timedelta
from collections import Counter
from django.db.models import Avg, Count, Q

from .models import UserAnalytics
from .serializers import UserAnalyticsSerializer
from migraine.models import MigraineEvent
from logs.models import DailyLog


class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for analytics and insights."""
    
    serializer_class = UserAnalyticsSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserAnalytics.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def triggers(self, request):
        """Get top migraine triggers."""
        # Get all migraine events with triggers
        events = MigraineEvent.objects.filter(user=request.user)
        
        # Collect all triggers
        all_triggers = []
        for event in events:
            all_triggers.extend(event.triggers)
        
        # Count frequency
        trigger_counts = Counter(all_triggers)
        top_triggers = [
            {'trigger': trigger, 'count': count}
            for trigger, count in trigger_counts.most_common(10)
        ]
        
        return Response({'top_triggers': top_triggers})
    
    @action(detail=False, methods=['get'])
    def patterns(self, request):
        """Get weekly patterns and insights."""
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Get migraines in the period
        migraines = MigraineEvent.objects.filter(
            user=request.user,
            start_time__date__gte=start_date,
            start_time__date__lte=end_date
        )
        
        # Day of week analysis
        day_counts = {}
        for migraine in migraines:
            day = migraine.start_time.strftime('%A')
            day_counts[day] = day_counts.get(day, 0) + 1
        
        # Time of day analysis
        time_periods = {'morning': 0, 'afternoon': 0, 'evening': 0, 'night': 0}
        for migraine in migraines:
            hour = migraine.start_time.hour
            if 6 <= hour < 12:
                time_periods['morning'] += 1
            elif 12 <= hour < 17:
                time_periods['afternoon'] += 1
            elif 17 <= hour < 22:
                time_periods['evening'] += 1
            else:
                time_periods['night'] += 1
        
        return Response({
            'day_of_week': day_counts,
            'time_of_day': time_periods,
            'total_migraines': migraines.count()
        })
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get overall health summary."""
        # Get last 30 days
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=30)
        
        # Migraine stats
        migraines = MigraineEvent.objects.filter(
            user=request.user,
            start_time__date__gte=start_date
        )
        
        migraine_stats = {
            'total': migraines.count(),
            'avg_severity': migraines.aggregate(Avg('severity'))['severity__avg'] or 0,
        }
        
        # Daily log stats
        logs = DailyLog.objects.filter(
            user=request.user,
            date__gte=start_date
        )
        
        log_stats = {
            'avg_sleep': logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg'] or 0,
            'avg_stress': logs.aggregate(Avg('stress_level'))['stress_level__avg'] or 0,
            'avg_water': logs.aggregate(Avg('water_intake'))['water_intake__avg'] or 0,
            'log_count': logs.count()
        }
        
        return Response({
            'period': {
                'start': start_date.isoformat(),
                'end': end_date.isoformat()
            },
            'migraines': migraine_stats,
            'daily_logs': log_stats
        })
    
    @action(detail=False, methods=['get'])
    def correlations(self, request):
        """Analyze correlations between factors and migraines."""
        # Get last 60 days
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=60)
        
        # Get days with migraines
        migraine_dates = set(
            MigraineEvent.objects.filter(
                user=request.user,
                start_time__date__gte=start_date
            ).values_list('start_time__date', flat=True)
        )
        
        # Get daily logs
        logs = DailyLog.objects.filter(
            user=request.user,
            date__gte=start_date
        )
        
        # Calculate averages for migraine vs non-migraine days
        migraine_logs = logs.filter(date__in=migraine_dates)
        non_migraine_logs = logs.exclude(date__in=migraine_dates)
        
        correlations = {
            'migraine_days': {
                'avg_sleep': migraine_logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg'] or 0,
                'avg_stress': migraine_logs.aggregate(Avg('stress_level'))['stress_level__avg'] or 0,
                'avg_water': migraine_logs.aggregate(Avg('water_intake'))['water_intake__avg'] or 0,
            },
            'non_migraine_days': {
                'avg_sleep': non_migraine_logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg'] or 0,
                'avg_stress': non_migraine_logs.aggregate(Avg('stress_level'))['stress_level__avg'] or 0,
                'avg_water': non_migraine_logs.aggregate(Avg('water_intake'))['water_intake__avg'] or 0,
            }
        }
        
        return Response(correlations)
