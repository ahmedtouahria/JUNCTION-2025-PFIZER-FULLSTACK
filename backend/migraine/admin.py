from django.contrib import admin
from .models import MigraineEvent


@admin.register(MigraineEvent)
class MigraineEventAdmin(admin.ModelAdmin):
    list_display = ['user', 'start_time', 'end_time', 'severity', 'pain_location']
    list_filter = ['start_time', 'severity', 'pain_location']
    search_fields = ['user__username', 'notes']
    date_hierarchy = 'start_time'
