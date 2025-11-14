from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAnalytics(models.Model):
    """Aggregated analytics for user insights."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analytics')
    period_start = models.DateField()
    period_end = models.DateField()
    
    # Migraine statistics
    total_migraines = models.IntegerField(default=0)
    avg_severity = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    avg_duration_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Top triggers
    top_triggers = models.JSONField(default=list, help_text="Most common triggers")
    
    # Pattern insights
    best_day_of_week = models.CharField(max_length=10, blank=True)
    worst_day_of_week = models.CharField(max_length=10, blank=True)
    best_time_of_day = models.CharField(max_length=20, blank=True)
    worst_time_of_day = models.CharField(max_length=20, blank=True)
    
    # Health correlations
    sleep_correlation = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    stress_correlation = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_analytics'
        ordering = ['-period_end']
    
    def __str__(self):
        return f"{self.user.username} - {self.period_start} to {self.period_end}"
