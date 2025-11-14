from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MigraineEventViewSet

router = DefaultRouter()
router.register(r'', MigraineEventViewSet, basename='migraine-event')

urlpatterns = [
    path('', include(router.urls)),
]
