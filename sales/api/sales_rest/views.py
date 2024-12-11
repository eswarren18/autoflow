from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

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
