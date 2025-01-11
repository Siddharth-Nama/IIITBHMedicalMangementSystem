from rest_framework import serializers
from .models import Medicine, Student, MedicineDistribution
import datetime


class MedicineSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'rate_per_unit', 'total_units', 'total_rate', 'date']
    
    def get_date(self, obj):
        if isinstance(obj.date, datetime.datetime):  # If it's a datetime
            return obj.date.date()  # Extract only the date
        return obj.date  # If it's already a date, return it as is


class StudentSerializer(serializers.ModelSerializer):
    total_bill = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ['id', 'name', 'roll_number', 'total_bill']

    def get_total_bill(self, obj):
        """
        Calculate the total bill for the student across all medicine distributions.
        """
        distributions = MedicineDistribution.objects.filter(student=obj)
        total_bill = sum(dist.total_amount for dist in distributions)
        return total_bill


class MedicineDistributionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.name', read_only=True)
    student_roll_number = serializers.CharField(source='student.roll_number', read_only=True)
    medicine_name = serializers.CharField(source='medicine.name', read_only=True)

    class Meta:
        model = MedicineDistribution
        fields = [
            'id', 
            'student', 
            'medicine', 
            'quantity', 
            'total_amount', 
            'date', 
            'student_name', 
            'student_roll_number', 
            'medicine_name',
        ]

    def validate(self, data):
        """
        Ensure that the quantity requested does not exceed the available stock.
        """
        medicine = data['medicine']
        if data['quantity'] > medicine.total_units:
            raise serializers.ValidationError(
                f"Requested quantity ({data['quantity']}) exceeds available stock ({medicine.total_units})."
            )
        return data

    def create(self, validated_data):
        medicine = validated_data['medicine']
        quantity = validated_data['quantity']
        
        # Deduct the distributed quantity from total stock
        medicine.total_units -= quantity
        medicine.save()
        
        return super().create(validated_data)


class FilteredDistributionSerializer(serializers.Serializer):
    student_name = serializers.CharField()
    student_roll_number = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_medicines = serializers.IntegerField()


class StudentSearchSerializer(serializers.ModelSerializer):
    """
    Serializer for student search dropdown suggestions.
    """
    class Meta:
        model = Student
        fields = ['id', 'name', 'roll_number']


class MedicineSearchSerializer(serializers.ModelSerializer):
    """
    Serializer for medicine search dropdown suggestions.
    """
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'rate_per_unit']
