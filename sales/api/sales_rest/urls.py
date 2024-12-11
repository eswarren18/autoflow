from django.urls import path

from .views import (
    api_salespeople,
    api_salesperson,
)


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
]
