# Generated by Django 5.1.4 on 2025-01-11 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_medicine_date_medicinedistribution_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
