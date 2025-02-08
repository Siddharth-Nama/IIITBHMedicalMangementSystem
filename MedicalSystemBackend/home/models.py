from django.db import models
from django.utils import timezone

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    rate_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    total_units = models.PositiveIntegerField()
    total_rate = models.DecimalField(max_digits=15, decimal_places=2, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        self.total_rate = self.rate_per_unit * self.total_units

        # If this is an update, change the date to the current time
        if self.pk:  # Check if the object already exists
            self.date = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=50, unique=True)
    student_phone_number = models.CharField(max_length=15)
    blood_group = models.CharField(max_length=10)
    def __str__(self):
        return self.name


class MedicineDistribution(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    medicine = models.TextField()
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, editable=False)
    date = models.DateField(default=timezone.now)
    def save(self, *args, **kwargs):
        self.total_amount = self.quantity * self.medicine.rate_per_unit
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.name} - {self.medicine.name}"
