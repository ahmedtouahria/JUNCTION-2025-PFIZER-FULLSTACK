from celery import shared_task
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from collections import Counter
from django.db.models import Avg

from .models import UserAnalytics
from migraine.models import MigraineEvent
from logs.models import DailyLog

User = get_user_model()


@shared_task
def aggregate_user_analytics():
    """Aggregate analytics for all users (weekly)."""
    users = User.objects.filter(is_active=True)
    analytics_created = 0
    
    for user in users:
        result = _calculate_user_analytics(user)
        if result:
            analytics_created += 1
    
    return f"Created analytics for {analytics_created} users"


def _calculate_user_analytics(user):
    """Calculate analytics for a specific user."""
    # Calculate for last 7 days
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=7)
    
    # Get migraines in period
    migraines = MigraineEvent.objects.filter(
        user=user,
        start_time__date__gte=start_date,
        start_time__date__lte=end_date
    )
    
    if not migraines.exists():
        return None
    
    # Calculate statistics
    total_migraines = migraines.count()
    avg_severity = migraines.aggregate(Avg('severity'))['severity__avg']
    
    # Calculate average duration
    durations = [m.duration_hours for m in migraines if m.duration_hours]
    avg_duration = sum(durations) / len(durations) if durations else None
    
    # Top triggers
    all_triggers = []
    for migraine in migraines:
        all_triggers.extend(migraine.triggers)
    trigger_counts = Counter(all_triggers)
    top_triggers = [
        {'trigger': t, 'count': c}
        for t, c in trigger_counts.most_common(5)
    ]
    
    # Day of week patterns
    day_counts = Counter(m.start_time.strftime('%A') for m in migraines)
    worst_day = day_counts.most_common(1)[0][0] if day_counts else ''
    
    # Get correlations from daily logs
    logs = DailyLog.objects.filter(
        user=user,
        date__gte=start_date,
        date__lte=end_date
    )
    
    sleep_corr = None
    stress_corr = None
    if logs.exists():
        # Simplified correlation (would use scipy in production)
        migraine_dates = set(m.start_time.date() for m in migraines)
        migraine_logs = logs.filter(date__in=migraine_dates)
        
        if migraine_logs.exists():
            sleep_corr = migraine_logs.aggregate(Avg('sleep_hours'))['sleep_hours__avg']
            stress_corr = migraine_logs.aggregate(Avg('stress_level'))['stress_level__avg']
    
    # Create or update analytics
    analytics, created = UserAnalytics.objects.update_or_create(
        user=user,
        period_start=start_date,
        period_end=end_date,
        defaults={
            'total_migraines': total_migraines,
            'avg_severity': avg_severity,
            'avg_duration_hours': avg_duration,
            'top_triggers': top_triggers,
            'worst_day_of_week': worst_day,
            'sleep_correlation': sleep_corr,
            'stress_correlation': stress_corr,
        }
    )
    
    return analytics
