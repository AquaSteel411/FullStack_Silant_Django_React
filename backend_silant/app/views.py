from rest_framework import status
from rest_framework.views import APIView
from .models import Machine, Maintenance, Complaint, MachineModel, EngineModel, TransmissionModel, DrivingBridgeModel, \
    ControlledBridgeModel, MaintenanceType, DefectNode, Recovery
from rest_framework.response import Response
from users.models import CustomUser


class MachineUserView(APIView):
    def get(self, request, user):
        user = CustomUser.objects.get(username=user)
        group = user.groups.all().values_list('name', flat=True)
        if 'Client' in group:
            machines = Machine.objects.filter(client=user)
        elif 'Service' in group:
            machines = Machine.objects.filter(service=user)
        elif 'Managers' or 'admin' in group:
            machines = Machine.objects.all()

        output = [
            {
                'serial_number_model': output.serial_number_model,
                'machine_model': output.machine_model.name,
                'engine_model': output.engine_model.name,
                'engine_serial_number': output.engine_serial_number,
                'transmission_model': output.transmission_model.name,
                'transmission_serial_number': output.transmission_serial_number,
                'driving_bridge_model': output.driving_bridge_model.name,
                'driving_bridge_serial_number': output.driving_bridge_serial_number,
                'controlled_bridge_model': output.controlled_bridge_model.name,
                'controlled_bridge_serial_number': output.controlled_bridge_serial_number,
                'contract': output.contract,
                'ship_date': f'{str(output.ship_date)[0:4]}.{str(output.ship_date)[5:7]}.{str(output.ship_date)[8:10]}',
                'recipient': output.recipient,
                'address': output.address,
                'equipment': output.equipment,
                'client': output.client.first_name,
                'service': output.service.first_name,
            } for output in machines
        ]
        return Response(output)


class MachineSearchView(APIView):
    def get(self, request, serial_number_model):
        output = [
            {
                'serial_number_model': output.serial_number_model,
                'machine_model': output.machine_model.name,
                'engine_model': output.engine_model.name,
                'engine_serial_number': output.engine_serial_number,
                'transmission_model': output.transmission_model.name,
                'transmission_serial_number': output.transmission_serial_number,
                'driving_bridge_model': output.driving_bridge_model.name,
                'driving_bridge_serial_number': output.driving_bridge_serial_number,
                'controlled_bridge_model': output.controlled_bridge_model.name,
                'controlled_bridge_serial_number': output.controlled_bridge_serial_number,
            } for output in Machine.objects.filter(serial_number_model=serial_number_model)
        ]
        return Response(output)


class MaintenanceView(APIView):
    def get(self, request, user):
        user = CustomUser.objects.get(username=user)
        group = user.groups.all().values_list('name', flat=True)
        if 'Client' in group:
            machines = Machine.objects.filter(client=user)
            maintenance = []
            for machine in machines:
                maintenance.extend((Maintenance.objects.filter(machine__serial_number_model=machine.serial_number_model)))
        elif 'Service' in group:
            maintenance = Maintenance.objects.filter(service=user)
        elif 'Managers' or 'admin' in group:
            maintenance = Maintenance.objects.all()

        output = [
            {
                'machine': output.machine.serial_number_model,
                'type_maintenance': output.type_maintenance.name,
                'maintenance_date': output.maintenance_date,
                'operating_time': output.operating_time,
                'number_order': output.number_order,
                'date_order': output.date_order,
                'service': output.service.first_name,
            } for output in maintenance
        ]
        return Response(output)


class ComplaintView(APIView):
    def get(self, request, user):
        user = CustomUser.objects.get(username=user)
        group = user.groups.all().values_list('name', flat=True)
        if 'Client' in group:
            machines = Machine.objects.filter(client=user)
            complaints = []
            for machine in machines:
                complaints.extend((Complaint.objects.filter(machine__serial_number_model=machine.serial_number_model)))
        elif 'Service' in group:
            complaints = Complaint.objects.filter(service=user)
        elif 'Managers' or 'admin' in group:
            complaints = Complaint.objects.all()
        output = [
            {
                'machine': output.machine.serial_number_model,
                'date_defect': output.date_defect,
                'operating_time': output.operating_time,
                'defect_node': output.defect_node.name,
                'description': output.description,
                'recovery': output.recovery.name,
                'spare_parts': output.spare_parts,
                'date_recovery': output.date_recovery,
                'downtime': output.downtime,
                'service': output.service.first_name
            } for output in complaints
        ]
        return Response(output)


class MachineDetailView(APIView):
    def get(self, request, serial_number_model):
        machine = Machine.objects.get(serial_number_model=serial_number_model)
        output = {
            'serial_number_model': machine.serial_number_model,
            'machine_model': machine.machine_model.name,
            'machine_description': machine.machine_model.description,
            'engine_model': machine.engine_model.name,
            'engine_description': machine.engine_model.description,
            'engine_serial_number': machine.engine_serial_number,
            'transmission_model': machine.transmission_model.name,
            'transmission_description': machine.transmission_model.description,
            'transmission_serial_number': machine.transmission_serial_number,
            'driving_bridge_model': machine.driving_bridge_model.name,
            'driving_bridge_description': machine.driving_bridge_model.description,
            'driving_bridge_serial_number': machine.driving_bridge_serial_number,
            'controlled_bridge_model': machine.controlled_bridge_model.name,
            'controlled_bridge_description': machine.controlled_bridge_model.description,
            'controlled_bridge_serial_number': machine.controlled_bridge_serial_number,
            'contract': machine.contract,
            'ship_date': machine.ship_date,
            'recipient': machine.recipient,
            'address': machine.address,
            'equipment': machine.equipment,
            'client': machine.client.first_name,
            'service': machine.service.first_name,
        }

        return Response(output)


class AddMachineView(APIView):
    def post(self, request):
        machine = Machine()
        date = request.data['ship_date']
        machine.serial_number_model = request.data['serial_number_model']
        machine.machine_model = MachineModel.objects.get(name=request.data['machine_model'])
        machine.engine_model = EngineModel.objects.get(name=request.data['engine_model'])
        machine.engine_serial_number = request.data['engine_serial_number']
        machine.transmission_model = TransmissionModel.objects.get(name=request.data['transmission_model'])
        machine.transmission_serial_number = request.data['transmission_serial_number']
        machine.driving_bridge_model = DrivingBridgeModel.objects.get(name=request.data['driving_bridge_model'])
        machine.driving_bridge_serial_number = request.data['driving_bridge_serial_number']
        machine.controlled_bridge_model = ControlledBridgeModel.objects.get(name=request.data['controlled_bridge_model'])
        machine.controlled_bridge_serial_number = request.data['controlled_bridge_serial_number']
        machine.contract = request.data['contract']
        machine.ship_date = f'{date[6:10]}-{date[3:5]}-{date[0:2]}'
        machine.recipient = request.data['recipient']
        machine.address = request.data['address']
        machine.equipment = request.data['equipment']
        machine.client = CustomUser.objects.get(first_name=request.data['client'])
        machine.service = CustomUser.objects.get(first_name=request.data['service'])
        machine.save()
        return Response(status=status.HTTP_200_OK)


class AddMaintenanceView(APIView):
    def post(self, request):
        maintenance = Maintenance()
        maintenance_date = request.data['maintenance_date']
        date_order = request.data['date_order']
        maintenance.machine = Machine.objects.get(serial_number_model=request.data['machine'])
        maintenance.type_maintenance = MaintenanceType.objects.get(name=request.data['type_maintenance'])
        maintenance.maintenance_date = f'{maintenance_date[6:10]}-{maintenance_date[3:5]}-{maintenance_date[0:2]}'
        maintenance.operating_time = request.data['operating_time']
        maintenance.number_order = request.data['number_order']
        maintenance.date_order = f'{date_order[6:10]}-{date_order[3:5]}-{date_order[0:2]}'
        print(request.data['service'])
        maintenance.service = CustomUser.objects.get(first_name=request.data['service'])
        maintenance.save()
        return Response(status=status.HTTP_200_OK)


class AddComplaintView(APIView):
    def post(self, request):
        complaint = Complaint()
        date_defect = request.data['date_defect']
        print(date_defect)
        date_recovery = request.data['date_recovery']
        print(date_recovery)
        complaint.date_defect = f'{date_defect[6:10]}-{date_defect[3:5]}-{date_defect[0:2]}'
        complaint.operating_time = request.data['operating_time']
        complaint.defect_node = DefectNode.objects.get(name=request.data['defect_node'])
        complaint.recovery = Recovery.objects.get(name=request.data['recovery'])
        complaint.description = request.data['description']
        complaint.spare_parts = request.data['spare_parts']
        complaint.date_recovery = f'{date_recovery[6:10]}-{date_recovery[3:5]}-{date_recovery[0:2]}'
        complaint.downtime = request.data['downtime']
        complaint.machine = Machine.objects.get(serial_number_model=request.data['machine'])
        complaint.service = CustomUser.objects.get(username=request.data['service'])
        complaint.save()
        return Response(status=status.HTTP_200_OK)


class MachineModelView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in MachineModel.objects.all()
        ]
        return Response(output)


class EngineModelView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in EngineModel.objects.all()
        ]
        return Response(output)


class TransmissionModelView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in TransmissionModel.objects.all()
        ]
        return Response(output)


class DrivingBridgeModelView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in DrivingBridgeModel.objects.all()
        ]
        return Response(output)


class ControlledBridgeModelView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in ControlledBridgeModel.objects.all()
        ]
        return Response(output)


class MaintenanceTypeView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in MaintenanceType.objects.all()
        ]
        return Response(output)


class DefectNodeView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in DefectNode.objects.all()
        ]
        return Response(output)


class RecoveryView(APIView):
    def get(self, request):
        output = [
            {
                'name': output.name,
                'description': output.description,
            } for output in Recovery.objects.all()
        ]
        return Response(output)



