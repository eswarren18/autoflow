from django.urls import path

from . import views

app_name = "service_rest"

urlpatterns = [
    path("autos/", views.api_autos, name="api_autos"),
    path("technicians/", views.api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", views.api_technician, name="api_technician"),
    path("appointments/", views.api_appointments, name="api_appointments"),
    path("appointments/<int:id>/", views.api_appointment, name="api_appointment"),
    path("appointments/<int:id>/<str:action>/", views.api_appointment, name="api_appointment"),
]
