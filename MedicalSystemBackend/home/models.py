from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    rate_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    total_units = models.PositiveIntegerField()
    total_rate = models.DecimalField(max_digits=15, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.total_rate = self.rate_per_unit * self.total_units
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class MedicineDistribution(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.total_amount = self.quantity * self.medicine.rate_per_unit
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.name} - {self.medicine.name}"
