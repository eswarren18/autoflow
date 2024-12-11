from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import Salesperson, Customer, Sale, AutomobileVO
from common.json import ModelEncoder


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson,
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse({"salespeople": salespeople}, encoder=SalespersonListEncoder)
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(salesperson, encoder=SalespersonListEncoder, safe=False)

@require_http_methods(["DELETE"])
def api_salesperson(request, id):
    if request.method == "DELETE":
        number, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": number > 0})
