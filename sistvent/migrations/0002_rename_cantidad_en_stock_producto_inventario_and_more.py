# Generated by Django 5.0.6 on 2024-05-12 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistvent', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='cantidad_en_stock',
            new_name='inventario',
        ),
        migrations.AlterField(
            model_name='producto',
            name='descripcion',
            field=models.TextField(blank=True),
        ),
    ]