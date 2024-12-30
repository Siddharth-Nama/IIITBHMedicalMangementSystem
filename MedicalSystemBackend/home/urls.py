from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicineViewSet, StudentViewSet, MedicineDistributionViewSet

router = DefaultRouter()
router.register('medicines', MedicineViewSet)
router.register('students', StudentViewSet)
router.register('distributions', MedicineDistributionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
