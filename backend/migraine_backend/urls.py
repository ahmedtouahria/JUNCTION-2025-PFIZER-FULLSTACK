"""
URL configuration for migraine_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/logs/', include('logs.urls')),
    path('api/biometrics/', include('biometrics.urls')),
    path('api/migraine-events/', include('migraine.urls')),
    path('api/predictions/', include('predictions.urls')),
    path('api/analytics/', include('analytics.urls')),
]
