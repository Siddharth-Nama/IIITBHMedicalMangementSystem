from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, F
from django.utils.dateparse import parse_date
from .models import Medicine, Student, MedicineDistribution
from .serializers import MedicineSerializer, StudentSerializer, MedicineDistributionSerializer

class MedicineViewSet(viewsets.ModelViewSet):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class MedicineDistributionViewSet(viewsets.ModelViewSet):
    queryset = MedicineDistribution.objects.all().select_related('student', 'medicine')
    serializer_class = MedicineDistributionSerializer

    def get_queryset(self):
        """Override to allow filtering by date range and roll number."""
        queryset = super().get_queryset()

        # Get query parameters
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        roll_number = self.request.query_params.get('roll_number')

        # Filter by date range
        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])

        # Filter by roll number (if provided)
        if roll_number:
            queryset = queryset.filter(student__roll_number=roll_number)

        return queryset

    @action(detail=False, methods=['get'])
    def filtered_distributions(self, request):
        """Custom action to return aggregated data."""
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        roll_number = request.query_params.get('roll_number')

        # Validate the required parameters
        if not start_date or not end_date:
            return Response({"error": "Both start_date and end_date are required."}, status=400)

        # Parse dates for validation
        try:
            start_date = parse_date(start_date)
            end_date = parse_date(end_date)
            if not start_date or not end_date:
                raise ValueError("Invalid date format.")
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

        # Filter distributions
        queryset = MedicineDistribution.objects.filter(date__range=[start_date, end_date])

        if roll_number:
            queryset = queryset.filter(student__roll_number=roll_number)

        # Aggregate data for each student
        aggregated_data = (
            queryset.values('student__name', 'student__roll_number')
            .annotate(
                total_amount=Sum('total_amount'),
                total_medicines=Sum('quantity')
            )
        )

        return Response(aggregated_data)
