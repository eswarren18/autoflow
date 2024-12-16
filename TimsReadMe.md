# CarCar

CarCar is an application for managing the aspects of an automobile dealership. It manages the inventory, automobile sales, and automobile services.

Team:

* **Student 1** - Eric: Auto Sales Microservice & Inventory Forms
* **Student 2** - Tim: Auto Services Microservice & Inventory Lists

## Installation

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork / Clone https://gitlab.com/eswarren18/project-beta

2. Build commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
3. Open in a browser: http://localhost:3000/


## Structure

CarCar is has three interactive microservices.

- **Inventory**
- **Services**
- **Sales**

## How our microservices interact

The INVENTORY domain keeps track of vehichle inventory and the parts needed to make up that data like vehichle models and manufacturers.

The other two microservices, sales and services, rely on the data from the inventory domain.  A poller is used in each to keep track of the inventory vehicles and their statuses.


## INVENTORY MICROSERVICE

The inventory microservice consists of the following three models:

### 1. **Manufacturer**

- **API Endpoints:**
  - `http://localhost:8100/api/manufacturers/`
    - `GET` - List all manufacturers
    - `POST` - Create a manufacturer
  - `http://localhost:8100/api/manufacturers/{id}/`
    - `GET` - Get manufacturer detail
    - `PUT` - Update manufacturer detail
    - `DELETE` - Delete manufacturer

- **POST/PUT Structure:**
  ```json
    {
        "name": String | Unique
    }
---

### 2. **VehicleModel**

- **API Endpoints:**
  - `http://localhost:8100/api/models/`
    - `GET` - List all models
    - `POST` - Create a model
  - `http://localhost:8100/api/models/{id}/`
    - `GET` - Get model detail
    - `PUT` - Update model detail
    - `DELETE` - Delete model

- **POST/PUT Structure:**
  ```json
    {
      "name": String,
      "picture_url": URL,
      "manufacturer_id": FK: Manufacturer.id
    }
- **Dependency:** Relies on the **Manufacturer** model.

---

### 3. **Automobile**

- **API Endpoints:**
  - `http://localhost:8100/api/automobiles/`
    - `GET` - List all automobiles
    - `POST` - Create a automobile
  - `http://localhost:8100/api/automobiles/{vin}/`
    - `GET` - Get automobile detail
    - `PUT` - Update automobile detail
    - `DELETE` - Delete automobile

- **POST/PUT Structure:**
  ```json
    {
        "color": String,
        "year": Int,
        "vin": String | Unique,
        "model_id": FK: VehicleModel.id
    }
- **Dependency:** Relies on the **VehichleModel** model which relies on the **Manufacturer** model.


## SERVICES MICROSERVICE

The services microservice consists of the following three models:

### 1. **Technician**

- **API Endpoints:**
  - `http://localhost:8080/api/technicians/`
    - `GET` - List all technicians
    - `POST` - Create a technician
  - `http://localhost:8080/api/technicians/{id}/`
    - `GET` - Get technician detail
    - `DELETE` - Delete technician

- **POST Structure:**
  ```json
    {
        "first_name": String,
        "last_name": String,
        "employee_id": String | Unique
    }
---

### 2. **Appointment**

- **API Endpoints:**
  - `http://localhost:8080/api/appointments/`
    - `GET` - List all appointments
    - `POST` - Create a appointment
  - `http://localhost:8080/api/appointments/{id}/`
    - `GET` - Get appointment detail
    - `DELETE` - Delete appointment
  - `http://localhost:8080/api/appointments/{id}/cancel/`
    - `PUT` - Changes status of appointment to "canceled"
  - `http://localhost:8080/api/appointments/{id}/finish/`
    - `PUT` - Changes status of appointment to "finished"

- **POST Structure:**
  ```json
    {
		"date_time": DATE TIME,
		"reason": STRING,
		"status": STRING,
		"vin": STRING,
		"customer": STRING,
		"technician": FK: Technician.id
    }
- **Dependency:** Relies on the **Manufacturer** model.

---

### 3. **AutomobileVO**

- **API Endpoints:**
  - `http://localhost:8080/api/autos/`
    - `GET` - List all automobile VOs

- **POLLER:** Pulls live data every 60 seconds from http://localhost:8100/api/automobiles/
