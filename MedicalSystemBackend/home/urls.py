from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicineViewSet, StudentViewSet, MedicineDistributionViewSet

router = DefaultRouter()
router.register('medicines', MedicineViewSet)
router.register('students', StudentViewSet)
router.register('distributions', MedicineDistributionViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Adding the custom search actions for both Medicine and Student viewsets
    path('medicines/search/', MedicineViewSet.as_view({'get': 'search'}), name='medicine-search'),
    path('students/search/', StudentViewSet.as_view({'get': 'search'}), name='student-search'),

    # Adding the custom action for filtered distributions
    path('distributions/filtered/', MedicineDistributionViewSet.as_view({'get': 'filtered_distributions'}), name='filtered-distributions'),
]
