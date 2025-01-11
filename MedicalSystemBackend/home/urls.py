from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicineViewSet, StudentViewSet, MedicineDistributionViewSet

router = DefaultRouter()
router.register('medicines', MedicineViewSet)
router.register('students', StudentViewSet)
router.register('distributions', MedicineDistributionViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Default routes from the router
    
    # Custom search routes for medicines and students
    path('medicines/search/', MedicineViewSet.as_view({'get': 'search'}), name='medicine-search'),
    path('students/search/', StudentViewSet.as_view({'get': 'search'}), name='student-search'),

    # Custom filtered distributions route
    path('distributions/filtered_distributions/', MedicineDistributionViewSet.as_view({'get': 'filtered_distributions'}), name='filtered-distributions'),
]

