from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from .models import Salesperson, Customer, Sale, AutomobileVO
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
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
        "automobile": AutomobileVO(),
        # "salesperson": SalespersonListEncoder(),
        # "customer": CustomerListEncoder(),
    }

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
def api_salesperson(_, id):
    number, _ = Salesperson.objects.filter(id=id).delete()
    return JsonResponse({"Deleted": number > 0})

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerListEncoder)
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)

@require_http_methods(["DELETE"])
def api_customer(_, id):
    number, _ = Customer.objects.filter(id=id).delete()
    return JsonResponse({"Deleted": number > 0})

@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleListEncoder)
    else:
        content = json.loads(request.body)

        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"Error": "The automobile with the given vin does not exist."}, status=400)

        content["salesperson"] = Salesperson.objects.get(id=1)
        content["customer"] = Customer.objects.get(id=1)
        # try:
        #     salesperson = Salesperson.objects.get(id=content["salesperson"])
        #     content["salesperson"] = salesperson
        # except Salesperson.DoesNotExist:
        #     return JsonResponse({"Error": "The salesperson does not exist."}, status=400)

        # try:
        #     customer = Customer.objects.get(id=content["customer"])
        #     content["customer"] = customer
        # except Customer.DoesNotExist:
        #     return JsonResponse({"Error": "The customer does not exist."}, status=400)

        sale = Sale.objects.create(**content)
        print(sale.salesperson)
        print(sale.customer)
        print(sale.automobile)
        print(sale.price)
        return JsonResponse(sale, encoder=SaleListEncoder, safe=False)
