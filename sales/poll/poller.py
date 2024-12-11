import django
import os
import sys
import time
import traceback
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def poll():
    while True:
        print("Sales poller polling for data")
        try:
            # Write your polling logic, here
            # Do not copy entire file
            request = requests.get('http://inventory-api:8000/api/automobiles/')
            automobiles = request.json()
            for automobile in automobiles["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin = automobile["vin"],
                    defaults = {
                        "vin": automobile["vin"],
                        "sold": automobile["sold"],
                    }
                )

        except Exception as e:
            traceback.print_exc()
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
