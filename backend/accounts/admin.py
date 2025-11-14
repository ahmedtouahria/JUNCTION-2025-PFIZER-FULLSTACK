from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'created_at']
    list_filter = ['is_staff', 'is_superuser', 'is_active', 'gender']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('date_of_birth', 'gender', 'location', 'timezone')}),
        ('Preferences', {'fields': ('notification_enabled', 'dark_mode')}),
    )
