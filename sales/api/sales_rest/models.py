from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone_number = models.CharField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Sale(models.Model):
    price = models.DecimalField(max_digits=15, decimal_places=2)
    automobile = models.ForeignKey(
        AutomobileVO,
        on_delete = models.CASCADE,
        related_name="sales"
    )
    salesperson = models.ForeignKey(
        Salesperson,
        on_delete = models.CASCADE,
        related_name = "salespeople"
    )
    customer = models.ForeignKey(
        Customer,
        on_delete = models.CASCADE,
        related_name = "customers"
    )
