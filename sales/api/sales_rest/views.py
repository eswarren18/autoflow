from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import Salesperson, Customer, Sale, AutomobileVO
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        try:
            salespeople = Salesperson.objects.all()
            return JsonResponse({"salespeople": salespeople}, encoder=SalespersonListEncoder)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=500)
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(salesperson, encoder=SalespersonListEncoder, safe=False)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)


@require_http_methods(["DELETE"])
def api_salesperson(_, id):
    try:
        number, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": number > 0})
    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=400)


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        try:
            customers = Customer.objects.all()
            return JsonResponse({"customers": customers}, encoder=CustomerListEncoder)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=500)
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)


@require_http_methods(["DELETE"])
def api_customer(_, id):
    try:
        number, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": number > 0})
    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=400)


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        try:
            sales = Sale.objects.all()
            return JsonResponse({"sales": sales}, encoder=SaleListEncoder)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=500)
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile

            salesperson = Salesperson.objects.get(id=content["salesperson"])
            content["salesperson"] = salesperson

            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer

            sale = Sale.objects.create(**content)
            return JsonResponse(sale, encoder=SaleListEncoder, safe=False)
        except KeyError as e:
            return JsonResponse({"Error": f"Missing required field: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=400)


@require_http_methods(["DELETE"])
def api_sale(_, id):
    try:
        number, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": number > 0})
    except Exception as e:
        return JsonResponse({"Error": str(e)}, status=400)
