from celery import shared_task
from django.contrib.auth import get_user_model
from datetime import datetime
from .ml_engine import MigrainePredictionEngine
from .models import Prediction

User = get_user_model()


@shared_task
def generate_daily_predictions():
    """Generate daily predictions for all active users."""
    today = datetime.now().date()
    users = User.objects.filter(is_active=True)
    
    predictions_created = 0
    for user in users:
        engine = MigrainePredictionEngine(user)
        result = engine.predict_risk(today)
        
        # Create or update prediction
        prediction, created = Prediction.objects.update_or_create(
            user=user,
            date=today,
            defaults={
                'risk_score': result['risk_score'],
                'risk_level': result['risk_level'],
                'top_factors': result['top_factors'],
                'confidence': result['confidence'],
                'model_version': result['model_version'],
                'recommendations': result['recommendations']
            }
        )
        
        if created:
            predictions_created += 1
    
    return f"Generated {predictions_created} predictions for {users.count()} users"


@shared_task
def retrain_prediction_model():
    """
    Placeholder for model retraining logic.
    In a production system, this would:
    1. Collect historical data
    2. Train/update ML model
    3. Validate performance
    4. Deploy new model version
    """
    # TODO: Implement actual ML model training
    return "Model retraining task completed (placeholder)"


@shared_task
def generate_user_prediction(user_id, target_date=None):
    """Generate prediction for a specific user."""
    try:
        user = User.objects.get(id=user_id)
        engine = MigrainePredictionEngine(user)
        
        if target_date is None:
            target_date = datetime.now().date()
        elif isinstance(target_date, str):
            target_date = datetime.fromisoformat(target_date).date()
        
        result = engine.predict_risk(target_date)
        
        prediction, created = Prediction.objects.update_or_create(
            user=user,
            date=target_date,
            defaults={
                'risk_score': result['risk_score'],
                'risk_level': result['risk_level'],
                'top_factors': result['top_factors'],
                'confidence': result['confidence'],
                'model_version': result['model_version'],
                'recommendations': result['recommendations']
            }
        )
        
        return f"Prediction {'created' if created else 'updated'} for {user.username}"
    except User.DoesNotExist:
        return f"User {user_id} not found"
