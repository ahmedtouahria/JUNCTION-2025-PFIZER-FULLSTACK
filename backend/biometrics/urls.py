from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BiometricsViewSet

router = DefaultRouter()
router.register(r'', BiometricsViewSet, basename='biometrics')

urlpatterns = [
    path('', include(router.urls)),
]
