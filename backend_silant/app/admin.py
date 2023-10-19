from django.contrib import admin
from .models import (
    Machine, Maintenance, Complaint,
    MachineModel, EngineModel, TransmissionModel,
    DrivingBridgeModel, ControlledBridgeModel,
    MaintenanceType, DefectNode, Recovery
)

admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Complaint)
admin.site.register(MaintenanceType)
admin.site.register(DefectNode)
admin.site.register(Recovery)
admin.site.register(MachineModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(DrivingBridgeModel)
admin.site.register(ControlledBridgeModel)
