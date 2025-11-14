from django.contrib import admin
from .models import UserAnalytics


@admin.register(UserAnalytics)
class UserAnalyticsAdmin(admin.ModelAdmin):
    list_display = ['user', 'period_start', 'period_end', 'total_migraines', 'avg_severity']
    list_filter = ['period_start', 'period_end']
    search_fields = ['user__username']
    date_hierarchy = 'period_end'
