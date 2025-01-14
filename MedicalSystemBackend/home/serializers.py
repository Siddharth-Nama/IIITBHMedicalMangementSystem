from rest_framework import serializers
from .models import Medicine, Student, MedicineDistribution
import datetime

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'rate_per_unit', 'total_units', 'total_rate', 'date']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Ensure `date` is serialized as a date
        if instance.date and isinstance(instance.date, datetime.datetime):
            representation['date'] = instance.date.date()
        return representation

    def validate_date(self, value):
        if isinstance(value, datetime.datetime):
            return value.date()  # Convert to date
        return value

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
    from rest_framework import serializers
from .models import MedicineDistribution

class MedicineDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineDistribution
        fields = '__all__'
        read_only_fields = ['total_amount']  # Ensure `total_amount` is not editable

    def validate(self, data):
        """
        Validate that the requested quantity does not exceed available medicine units.
        """
        medicine = data['medicine']
        quantity = data['quantity']

        if medicine.total_units < quantity:
            raise serializers.ValidationError({
                'quantity': f"Only {medicine.total_units} units of {medicine.name} are available."
            })

        return data


class FilteredDistributionSerializer(serializers.Serializer):
    student_name = serializers.CharField()
    student_roll_number = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_medicines = serializers.IntegerField()
    medicines = serializers.ListField(
        child=serializers.DictField()
    )
    start_date = serializers.DateField()
    end_date = serializers.DateField()



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
