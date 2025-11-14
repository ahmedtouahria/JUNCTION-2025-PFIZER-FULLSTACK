from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Prediction(models.Model):
    """Daily migraine risk prediction."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='predictions')
    date = models.DateField()
    
    # Risk score
    risk_score = models.IntegerField(help_text="0-100 risk percentage")
    risk_level = models.CharField(
        max_length=20,
        choices=[
            ('low', 'Low'),
            ('moderate', 'Moderate'),
            ('high', 'High')
        ]
    )
    
    # Top contributing factors
    top_factors = models.JSONField(
        default=list,
        help_text="Top 3 factors contributing to risk"
    )
    
    # Confidence score
    confidence = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        help_text="Model confidence (0-100)"
    )
    
    # Model version
    model_version = models.CharField(max_length=50, default='1.0')
    
    # Recommendations
    recommendations = models.JSONField(
        default=list,
        help_text="Preventive recommendations"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'predictions'
        ordering = ['-date']
        unique_together = ['user', 'date']
    
    def __str__(self):
        return f"{self.user.username} - {self.date} ({self.risk_level})"
