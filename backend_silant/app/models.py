from django.db import models
from django.conf import settings


# --------------------Машина-------------------- #


class Machine(models.Model):
    serial_number_model = models.CharField(max_length=16)
    machine_model = models.ForeignKey('MachineModel', on_delete=models.CASCADE)
    engine_model = models.ForeignKey('EngineModel', on_delete=models.CASCADE)
    engine_serial_number = models.CharField(max_length=16)
    transmission_model = models.ForeignKey('TransmissionModel', on_delete=models.CASCADE)
    transmission_serial_number = models.CharField(max_length=16)
    driving_bridge_model = models.ForeignKey('DrivingBridgeModel', on_delete=models.CASCADE)
    driving_bridge_serial_number = models.CharField(max_length=16)
    controlled_bridge_model = models.ForeignKey('ControlledBridgeModel', on_delete=models.CASCADE)
    controlled_bridge_serial_number = models.CharField(max_length=16)
    contract = models.CharField(max_length=32)
    ship_date = models.DateField()
    recipient = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    equipment = models.TextField(blank=True)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='client')
    service = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='service')

    def __str__(self):
        return str(self.serial_number_model)


# --------------------ТО-------------------- #


class Maintenance(models.Model):
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)
    type_maintenance = models.ForeignKey('MaintenanceType', on_delete=models.CASCADE)
    maintenance_date = models.DateField()
    operating_time = models.IntegerField()
    number_order = models.CharField(max_length=32)
    date_order = models.DateField()
    service = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return str(f'{self.machine} - {self.type_maintenance}')

# ------------------Рекламация------------------ #


class Complaint(models.Model):
    date_defect = models.DateField()
    operating_time = models.IntegerField()
    defect_node = models.ForeignKey('DefectNode', on_delete=models.CASCADE)
    recovery = models.ForeignKey('Recovery', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    spare_parts = models.TextField(blank=True)
    date_recovery = models.DateField()
    downtime = models.IntegerField()
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)
    service = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return str(f'{self.machine} - {self.defect_node}')

# ------------Справочная информация------------- #
# ----------------Модель техники---------------- #


class MachineModel(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ---------------Модель двигателя--------------- #


class EngineModel(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# --------------Модель трансмиссии-------------- #


class TransmissionModel(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ------------Модель ведущего моста------------- #


class DrivingBridgeModel(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ----------Модель управляемого моста----------- #


class ControlledBridgeModel(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# --------------------Вид ТО-------------------- #


class MaintenanceType(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ---------------Характер отказа---------------- #


class DefectNode(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# ------------Способ восстановления------------- #


class Recovery(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
