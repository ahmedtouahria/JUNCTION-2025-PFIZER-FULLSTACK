from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Biometrics(models.Model):
    """Biometric data tracking."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='biometrics')
    timestamp = models.DateTimeField()
    
    # Heart metrics
    heart_rate = models.IntegerField(help_text="Beats per minute")
    hrv = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Heart Rate Variability in ms"
    )
    resting_heart_rate = models.IntegerField(null=True, blank=True)
    
    # Blood pressure
    systolic_bp = models.IntegerField(null=True, blank=True, help_text="Systolic blood pressure")
    diastolic_bp = models.IntegerField(null=True, blank=True, help_text="Diastolic blood pressure")
    
    # Activity
    steps = models.IntegerField(null=True, blank=True)
    calories_burned = models.IntegerField(null=True, blank=True)
    
    # Body metrics
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Weight in kg")
    body_temperature = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True, help_text="Temperature in Celsius")
    
    # Source
    data_source = models.CharField(
        max_length=50,
        choices=[
            ('manual', 'Manual Entry'),
            ('fitbit', 'Fitbit'),
            ('apple_watch', 'Apple Watch'),
            ('garmin', 'Garmin'),
            ('other', 'Other Device')
        ],
        default='manual'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'biometrics'
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.user.username} - {self.timestamp}"
