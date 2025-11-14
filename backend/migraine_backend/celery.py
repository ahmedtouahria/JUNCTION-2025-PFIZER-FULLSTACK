"""
Celery configuration for migraine_backend project.
"""

import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'migraine_backend.settings')

app = Celery('migraine_backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Scheduled tasks
app.conf.beat_schedule = {
    'generate-daily-predictions': {
        'task': 'predictions.tasks.generate_daily_predictions',
        'schedule': crontab(hour=6, minute=0),  # Every day at 6 AM
    },
    'retrain-model-weekly': {
        'task': 'predictions.tasks.retrain_prediction_model',
        'schedule': crontab(day_of_week=1, hour=2, minute=0),  # Every Monday at 2 AM
    },
    'aggregate-analytics': {
        'task': 'analytics.tasks.aggregate_user_analytics',
        'schedule': crontab(hour=1, minute=0),  # Every day at 1 AM
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
