from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from django.utils.dateparse import parse_date
from .models import Medicine, Student, MedicineDistribution
from .serializers import (
    MedicineSerializer,
    StudentSerializer,
    MedicineDistributionSerializer,
    FilteredDistributionSerializer,
    StudentSearchSerializer,
    MedicineSearchSerializer,
)


class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Endpoint for live search functionality on medicines.
        """
        query = request.query_params.get("query", "")
        medicines = self.queryset.filter(name__icontains=query)
        serializer = MedicineSearchSerializer(medicines, many=True)
        return Response(serializer.data)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Endpoint for live search functionality on students.
        """
        query = request.query_params.get("query", "")
        students = self.queryset.filter(roll_number__icontains=query)
        serializer = StudentSearchSerializer(students, many=True)
        return Response(serializer.data)


class MedicineDistributionViewSet(viewsets.ModelViewSet):
    queryset = MedicineDistribution.objects.all()
    serializer_class = MedicineDistributionSerializer

    def perform_create(self, serializer):
        """
        Override perform_create to handle stock deduction when creating a record.
        """
        medicine = serializer.validated_data['medicine']
        quantity = serializer.validated_data['quantity']

        if medicine.total_units < quantity:
            raise ValueError(f"Insufficient stock for medicine {medicine.name}.")
        
        # Deduct quantity from medicine stock
        medicine.total_units -= quantity
        medicine.save()

        serializer.save()
        
    def get_queryset(self):
        # Existing functionality for filtering queryset
        queryset = super().get_queryset()
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")
        roll_number = self.request.query_params.get("roll_number")

        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])

        if roll_number:
            queryset = queryset.filter(student__roll_number__icontains=roll_number)
        return queryset

    @action(detail=False, methods=["get"])
    def filtered_distributions(self, request):
     start_date = request.query_params.get("start_date")
     end_date = request.query_params.get("end_date")
     roll_number = request.query_params.get("roll_number")

    # Parse and validate dates
     try:
        start_date = parse_date(start_date) if start_date else None
        end_date = parse_date(end_date) if end_date else None
     except ValueError:
        return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

     queryset = MedicineDistribution.objects.all()

    # Apply date filtering
     if start_date and end_date:
        queryset = queryset.filter(date__range=[start_date, end_date])
     elif start_date:
        queryset = queryset.filter(date__gte=start_date)
     elif end_date:
        queryset = queryset.filter(date__lte=end_date)

    # Apply roll number filtering
     if roll_number:
        queryset = queryset.filter(student__roll_number__icontains=roll_number)

    # Aggregating data by student and including medicine details
     aggregated_data = (
        queryset.values(
            "student__name",
            "student__roll_number",
            "medicine__name",
            "medicine__rate_per_unit",
            "quantity",
            "total_amount",
            "date",
        )
        .order_by("-date")
     )

    # Organizing data for the frontend
     student_data = {}
     for item in aggregated_data:
        roll_number = item["student__roll_number"]
        if roll_number not in student_data:
            student_data[roll_number] = {
                "student_name": item["student__name"],
                "student_roll_number": roll_number,
                "total_amount": 0,
                "total_medicines": 0,
                "medicines": [],
                "start_date": start_date.isoformat() if start_date else None,
                "end_date": end_date.isoformat() if end_date else None,
            }

        # Add medicine details
        student_data[roll_number]["medicines"].append({
            "medicine_name": item["medicine__name"],
            "rate_per_unit": float(item["medicine__rate_per_unit"]),
            "quantity": item["quantity"],
            "total_amount": float(item["total_amount"]),
        })

        # Update totals for the student
        student_data[roll_number]["total_amount"] += float(item["total_amount"])
        student_data[roll_number]["total_medicines"] += item["quantity"]

    # Convert to a list for serialization
     adjusted_data = list(student_data.values())

     serializer = FilteredDistributionSerializer(adjusted_data, many=True)
     return Response(serializer.data)
