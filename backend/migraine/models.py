from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class MigraineEvent(models.Model):
    """Migraine/headache event tracking."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='migraine_events')
    
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    
    severity = models.IntegerField(
        choices=[(i, i) for i in range(1, 11)],
        help_text="1-10 scale"
    )
    
    # Symptoms
    symptoms = models.JSONField(
        default=list,
        help_text="List of symptoms: ['nausea', 'light_sensitivity', 'sound_sensitivity', 'aura', 'vision_changes']"
    )
    
    # Location
    pain_location = models.CharField(
        max_length=50,
        choices=[
            ('left', 'Left Side'),
            ('right', 'Right Side'),
            ('both', 'Both Sides'),
            ('front', 'Front'),
            ('back', 'Back'),
            ('all', 'All Over')
        ]
    )
    
    # Triggers
    triggers = models.JSONField(
        default=list,
        help_text="Identified triggers for this event"
    )
    
    # Treatment
    medications_taken = models.JSONField(
        default=list,
        help_text="List of medications and dosages"
    )
    
    relief_methods = models.JSONField(
        default=list,
        help_text="Non-medication relief methods used"
    )
    
    effectiveness_rating = models.IntegerField(
        null=True,
        blank=True,
        choices=[(i, i) for i in range(1, 6)],
        help_text="How effective was treatment? 1-5"
    )
    
    # Additional info
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'migraine_events'
        ordering = ['-start_time']
    
    def __str__(self):
        return f"{self.user.username} - {self.start_time} (Severity: {self.severity})"
    
    @property
    def duration_hours(self):
        """Calculate duration in hours."""
        if self.end_time:
            delta = self.end_time - self.start_time
            return round(delta.total_seconds() / 3600, 2)
        return None
