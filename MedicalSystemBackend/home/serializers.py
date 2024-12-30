from rest_framework import serializers
from .models import Medicine, Student, MedicineDistribution

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class MedicineDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineDistribution
        fields = '__all__'
