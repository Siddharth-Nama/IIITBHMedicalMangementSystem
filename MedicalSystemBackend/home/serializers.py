from rest_framework import serializers
from .models import Medicine, Student, MedicineDistribution

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    total_bill = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'name', 'roll_number', 'total_bill']

    def get_total_bill(self, obj):
        """Calculate the total bill for the student across all medicine distributions."""
        distributions = MedicineDistribution.objects.filter(student=obj)
        total_bill = sum(dist.total_amount for dist in distributions)
        return total_bill

class MedicineDistributionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_roll_number = serializers.CharField(source='student.roll_number', read_only=True)
    medicine_name = serializers.CharField(source='medicine.name', read_only=True)

    class Meta:
        model = MedicineDistribution
        fields = '__all__'

class FilteredDistributionSerializer(serializers.Serializer):
    student_name = serializers.CharField()
    student_roll_number = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_medicines = serializers.IntegerField()