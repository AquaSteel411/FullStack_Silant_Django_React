from rest_framework import serializers

from . import models
from .models import (
    Machine, Maintenance, Complaint,
    MachineModel, EngineModel, TransmissionModel,
    DrivingBridgeModel, ControlledBridgeModel,
    MaintenanceType, DefectNode, Recovery
)
from users.models import CustomUser
from users.serializers import UserSerializer


class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'





class MachineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineModel
        fields = '__all__'


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = '__all__'


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = '__all__'


class DrivingBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingBridgeModel
        fields = '__all__'


class ControlledBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridgeModel
        fields = '__all__'


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = '__all__'


class DefectNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefectNode
        fields = '__all__'


class RecoverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Recovery
        fields = '__all__'


class ComplaintPostSerializer(serializers.ModelSerializer):
    model = Complaint

    # date_defect = serializers.DateTimeField(required=True)
    # operating_time = serializers.IntegerField(required=True)
    defect_node = DefectNodeSerializer(read_only=True)
    recovery = RecoverySerializer(read_only=True)
    # description = serializers.CharField(required=True)
    # spare_parts = serializers.CharField(required=True)
    # date_recovery = serializers.DateTimeField(required=True)
    # downtime = serializers.IntegerField(required=True)
    machine = MachineSerializer(read_only=True)
    service = UserSerializer(read_only=True)


    class Meta:
        model = Complaint
        fields = ('date_defect', 'operating_time', 'defect_node', 'recovery', 'description', 'spare_parts',
                  'date_recovery', 'downtime', 'machine', 'service')

