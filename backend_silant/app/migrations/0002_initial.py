# Generated by Django 4.2.5 on 2023-10-19 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='maintenance',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='maintenance',
            name='type_maintenance',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.maintenancetype'),
        ),
        migrations.AddField(
            model_name='machine',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='machine',
            name='controlled_bridge_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.controlledbridgemodel'),
        ),
        migrations.AddField(
            model_name='machine',
            name='driving_bridge_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.drivingbridgemodel'),
        ),
        migrations.AddField(
            model_name='machine',
            name='engine_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.enginemodel'),
        ),
        migrations.AddField(
            model_name='machine',
            name='machine_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.machinemodel'),
        ),
        migrations.AddField(
            model_name='machine',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='machine',
            name='transmission_model',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.transmissionmodel'),
        ),
        migrations.AddField(
            model_name='complaint',
            name='defect_node',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.defectnode'),
        ),
        migrations.AddField(
            model_name='complaint',
            name='machine',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.machine'),
        ),
        migrations.AddField(
            model_name='complaint',
            name='recovery',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.recovery'),
        ),
        migrations.AddField(
            model_name='complaint',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
