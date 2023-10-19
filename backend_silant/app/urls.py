from django.urls import path
from .views import (
    MachineUserView,
    MaintenanceView,
    ComplaintView,
    MachineSearchView,
    MachineDetailView,
    AddMachineView,
    AddMaintenanceView,
    AddComplaintView,
    MachineModelView,
    EngineModelView,
    TransmissionModelView,
    DrivingBridgeModelView,
    ControlledBridgeModelView,
    MaintenanceTypeView,
    DefectNodeView,
    RecoveryView,
)


urlpatterns = [
    path('machines_user/<slug:user>', MachineUserView.as_view(), name='machines'),
    path('machine_search/<slug:serial_number_model>', MachineSearchView.as_view(), name='machine'),
    path('maintenance/<slug:user>', MaintenanceView.as_view(), name='maintenance'),
    path('complaint/<slug:user>', ComplaintView.as_view(), name='complaint'),
    path('machine_detail/<slug:serial_number_model>', MachineDetailView.as_view(), name='machine_model'),
    path('add_machine/', AddMachineView.as_view(), name='add_machine'),
    path('add_maintenance/', AddMaintenanceView.as_view(), name='add_maintenance'),
    path('add_complaint/', AddComplaintView.as_view(), name='add_complaint'),
    path('machine_model/', MachineModelView.as_view(), name='machine_model'),
    path('engine_model/', EngineModelView.as_view(), name='engine_model'),
    path('transmission_model/', TransmissionModelView.as_view(), name='transmission_model'),
    path('driving_bridge_model/', DrivingBridgeModelView.as_view(), name='driving_bridge_model'),
    path('controlled_bridge_model/', ControlledBridgeModelView.as_view(), name='controlled_bridge_model'),
    path('maintenance_type/', MaintenanceTypeView.as_view(), name='maintenance_type'),
    path('defect_node/', DefectNodeView.as_view(), name='defect_node'),
    path('recovery_type/', RecoveryView.as_view(), name='recovery_type'),
]
