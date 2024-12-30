from rest_framework import viewsets
from .models import Medicine, Student, MedicineDistribution
from .serializers import MedicineSerializer, StudentSerializer, MedicineDistributionSerializer

class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class MedicineDistributionViewSet(viewsets.ModelViewSet):
    queryset = MedicineDistribution.objects.all()
    serializer_class = MedicineDistributionSerializer
