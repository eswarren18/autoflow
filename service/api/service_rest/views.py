from django.http import JsonResponse
from .models import Technician, Appointment, AutomobileVO
from django.views.decorators.http import require_http_methods
import json

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            data = [{
                "id": technician.id,
                "first_name": technician.first_name,
                "last_name": technician.last_name,
                "employee_id": technician.employee_id,
            } for technician in technicians]
            return JsonResponse({"technicians": data}, safe=False)
        except Exception:
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        try:
            technician = Technician.objects.create(
                first_name=data["first_name"],
                last_name=data["last_name"],
                employee_id=data["employee_id"],
            )
            return JsonResponse({
                "id": technician.id,
                "first_name": technician.first_name,
                "last_name": technician.last_name,
                "employee_id": technician.employee_id,
            }, status=201)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)
        except Exception:
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

@require_http_methods(["GET", "DELETE"])
def api_technician(request, id):
    try:
        technician = Technician.objects.get(id=id)
    except Technician.DoesNotExist:
        return JsonResponse({"error": "Technician not found"}, status=404)

    if request.method == "DELETE":
        try:
            technician.delete()
            return JsonResponse({"deleted": True}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({
                "id": id,
                "first_name": technician.first_name,
                "last_name": technician.last_name,
                "employee_id": technician.employee_id,
            }, safe=False)

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.select_related('technician').all()
            data = {"appointments":[{
                    "id": appointment.id,
                    "date_time": appointment.date_time,
                    "reason": appointment.reason,
                    "status": appointment.status,
                    "vin": appointment.vin,
                    "customer": appointment.customer,
                    "technician": {
                        "id": appointment.technician.id,
                        "first_name": appointment.technician.first_name,
                        "last_name": appointment.technician.last_name,
                        "employee_id": appointment.technician.employee_id
                    },
                } for appointment in appointments]}
            return JsonResponse(data, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    elif request.method == "POST":
        data = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=data["technician"])
        except Technician.DoesNotExist:
            return JsonResponse({"error": "Technician not found"}, status=404)
        try:
            appointment = Appointment.objects.create(
                date_time = data["date_time"],
                reason = data["reason"],
                status = data["status"],
                vin = data["vin"],
                customer = data["customer"],
                technician = technician,
            )
            return JsonResponse({
                "id": appointment.id,
                "date_time": appointment.date_time,
                "reason": appointment.reason,
                "status": appointment.status,
                "vin": appointment.vin,
                "customer": appointment.customer,
                "technician": {
                    "id": technician.id,
                    "first_name": technician.first_name,
                    "last_name": technician.last_name,
                    "employee_id": technician.employee_id
                },
            }, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["GET", "DELETE", "PUT"])
def api_appointment(request, id, action=None):
    try:
        appointment = Appointment.objects.select_related('technician').get(id=id)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)

    if request.method == "DELETE":
        try:
            appointment.delete()
            return JsonResponse({"deleted": True}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    elif request.method == "PUT":
        if action == "cancel":
            appointment.status = "canceled"
            try:
                appointment.save()
                return JsonResponse({
                    "id": appointment.id,
                    "date_time": appointment.date_time,
                    "reason": appointment.reason,
                    "status": appointment.status,
                    "vin": appointment.vin,
                    "customer": appointment.customer,
                    "technician": {
                        "id": appointment.technician.id,
                        "first_name": appointment.technician.first_name,
                        "last_name": appointment.technician.last_name,
                        "employee_id": appointment.technician.employee_id
                    },
                }, status=200)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        elif action == "finish":
            appointment.status = "finished"
            try:
                appointment.save()
                return JsonResponse({
                    "id": appointment.id,
                    "date_time": appointment.date_time,
                    "reason": appointment.reason,
                    "status": appointment.status,
                    "vin": appointment.vin,
                    "customer": appointment.customer,
                    "technician": {
                        "id": appointment.technician.id,
                        "first_name": appointment.technician.first_name,
                        "last_name": appointment.technician.last_name,
                        "employee_id": appointment.technician.employee_id
                    },
                }, status=200)
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        else:
            return JsonResponse({"error": "Invalid action code"}, status=400)
    else:
        data = {
                "id": appointment.id,
                "date_time": appointment.date_time,
                "reason": appointment.reason,
                "status": appointment.status,
                "vin": appointment.vin,
                "customer": appointment.customer,
                "technician": {
                    "id": appointment.technician.id,
                    "first_name": appointment.technician.first_name,
                    "last_name": appointment.technician.last_name,
                    "employee_id": appointment.technician.employee_id
                },
            }
        return JsonResponse(data, safe=False)

@require_http_methods(["GET"])
def api_autos(request):
    try:
        automobiles = AutomobileVO.objects.all()
        automobile_list = [
            {
                "vin": automobile.vin,
                "sold": automobile.sold
            }
            for automobile in automobiles
        ]
        return JsonResponse({"autos": automobile_list}, status=200)
    except Exception:
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)
