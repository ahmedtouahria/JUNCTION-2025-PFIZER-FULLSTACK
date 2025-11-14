from django.contrib import admin
from .models import Prediction


@admin.register(Prediction)
class PredictionAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'risk_score', 'risk_level', 'confidence', 'model_version']
    list_filter = ['date', 'risk_level', 'model_version']
    search_fields = ['user__username']
    date_hierarchy = 'date'
    readonly_fields = ['created_at']
