from django.contrib import admin
from .models import Biometrics


@admin.register(Biometrics)
class BiometricsAdmin(admin.ModelAdmin):
    list_display = ['user', 'timestamp', 'heart_rate', 'hrv', 'data_source']
    list_filter = ['timestamp', 'data_source']
    search_fields = ['user__username']
    date_hierarchy = 'timestamp'
