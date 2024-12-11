from django.contrib import admin

from .models import Technician, Appointment, AutomobileVO

admin.site.register(Technician)
admin.site.register(Appointment)
admin.site.register(AutomobileVO)
