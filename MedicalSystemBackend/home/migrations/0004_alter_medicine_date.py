# Generated by Django 5.1.4 on 2025-01-11 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_alter_medicine_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]