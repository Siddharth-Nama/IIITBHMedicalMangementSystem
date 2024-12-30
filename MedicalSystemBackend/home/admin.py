from django.contrib import admin
from .models import Medicine, Student, MedicineDistribution

# Customizing the display of Medicine model in the admin interface
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('name', 'rate_per_unit', 'total_units', 'total_rate')
    search_fields = ('name',)
    list_filter = ('rate_per_unit',)
    ordering = ('name',)

# Customizing the display of Student model in the admin interface
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'roll_number')
    search_fields = ('name', 'roll_number')
    ordering = ('name',)

# Customizing the display of MedicineDistribution model in the admin interface
class MedicineDistributionAdmin(admin.ModelAdmin):
    list_display = ('student', 'medicine', 'quantity', 'total_amount')
    search_fields = ('student__name', 'medicine__name')
    list_filter = ('medicine',)
    ordering = ('student',)

# Register models with their respective admin classes
admin.site.register(Medicine, MedicineAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(MedicineDistribution, MedicineDistributionAdmin)
