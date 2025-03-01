# Base image for Python
FROM python:3.10-bullseye

# Set environment variable for Python
ENV PYTHONUNBUFFERED=1

# Set working directory in the container
WORKDIR /app

# Add the wait-for-it script for service dependency management (e.g., waiting for database)
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# Copy the requirements.txt from the specific service folder
# We will modify this part depending on which service we're building
COPY ${SERVICE_PATH}/requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port for the app
EXPOSE 8000

# Command to run the application (replace with your actual project name if needed)
CMD /wait && python manage.py migrate && gunicorn your_project_name.wsgi:application --bind 0.0.0.0:8000
