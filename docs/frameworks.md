# Supported Frameworks Guide

AtlasServer Core currently supports Python web frameworks for quick deployments and demos. This guide explains how to configure and deploy applications built with these frameworks.

## Currently Supported Frameworks

### Flask

Flask is a lightweight WSGI web application framework. AtlasServer uses Waitress to serve Flask applications.

#### Requirements

- A Flask application with an `app` instance
- Waitress (included in AtlasServer dependencies)

#### Configuration

When registering a Flask application in AtlasServer:

1. Set the **Application Type** to "flask"
2. Specify the **Main File** containing your Flask app (e.g., `app.py`)
3. Make sure your app is named `app` in the main file:
   ```python
   from flask import Flask
   app = Flask(__name__)  # Must be named 'app'
   ```

#### Example

```python
# app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

### FastAPI

FastAPI is a modern, fast web framework for building APIs. AtlasServer uses Uvicorn to serve FastAPI applications.

#### Requirements

- A FastAPI application with an `app` instance
- Uvicorn (included in AtlasServer dependencies)

#### Configuration

When registering a FastAPI application in AtlasServer:

1. Set the **Application Type** to "fastapi"
2. Specify the **Main File** containing your FastAPI app (e.g., `main.py`)
3. Make sure your app is named `app` in the main file:
   ```python
   from fastapi import FastAPI
   app = FastAPI()  # Must be named 'app'
   ```

#### Example

```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

if __name__ == "__main__":
    uvicorn.run()
```

### Django

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. AtlasServer uses Gunicorn to serve Django applications.

#### Requirements

- A Django project with standard structure
- Gunicorn (included in AtlasServer dependencies)
- Django REST Framework (optional, for API development)

#### Configuration

When registering a Django application in AtlasServer:

1. Set the **Application Type** to "django"
2. For **Main File**, AtlasServer automatically sets this to `manage.py` 
3. Ensure your project follows Django's standard structure:
   ```
   myproject/
   ├── manage.py                # Entry point
   ├── myproject/               # Project module
   │   ├── __init__.py
   │   ├── settings.py
   │   ├── urls.py
   │   └── wsgi.py              # Used by Gunicorn
   └── app/                     # Your app(s)
       ├── __init__.py
       ├── models.py
       └── views.py
   ```

#### Django REST Framework Support

AtlasServer fully supports Django REST Framework for API development. No additional configuration is required beyond installing DRF in your project:

```python
# Installation
pip install djangorestframework

# Add to INSTALLED_APPS in settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
]
```

#### Required Settings

For proper operation with AtlasServer, make sure your `settings.py` includes:

```python
# Allow all hosts for demo purposes
ALLOWED_HOSTS = ['*']  

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

#### Example

```python
# views.py
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Standard Django view
def hello_world(request):
    return JsonResponse({"message": "Hello from Django!"})

# Django REST Framework view
@api_view(['GET'])
def hello_api(request):
    return Response({"message": "Hello from Django REST Framework!"})
```

```python
# urls.py in your app
from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('api/hello/', views.hello_api, name='hello_api'),
]
```

## Python Virtual Environment Support

AtlasServer supports running applications within Python virtual environments, ensuring proper isolation and dependency management for your projects.

### Automatic Environment Detection

When you specify a project directory, AtlasServer automatically scans for Python virtual environments:

1. **Standard virtual environments** (venv, virtualenv)
   - Directories named: `venv`, `.venv`, `env`, `.env`, `virtualenv`, `pyenv`
   - Any directory containing `env` in its name

2. **Poetry environments**
   - Detected via `poetry.lock` or `pyproject.toml` files
   - Typically located in `.venv` within your project

3. **Pipenv environments**
   - Detected via `Pipfile`
   - Location determined by running `pipenv --venv`

4. **Conda environments**
   - Detected via `environment.yml`
   - Matched with installed conda environments

### Environment Configuration

When registering an application, you can:

1. **Use automatic detection** (recommended)
   - Simply enter your project directory, and AtlasServer will detect and select the appropriate environment

2. **Manually select an environment**
   - Choose from detected environments in the dropdown menu under "Advanced Options"

### Ensuring Proper Detection

For reliable environment detection:

- **Standard practice**: Create virtual environments in your project's root directory using standard names (`venv`, `.venv`) 
- **Custom environments**: Include "env" somewhere in the folder name for custom environments
- **Poetry/Pipenv**: Use the standard workflow (the environment will be detected automatically)
- **Conda**: Include an `environment.yml` file in your project directory

### Environment Support Example

When using a virtual environment, your project structure might look like:

```
my_fastapi_project/
├── .venv/                 # Virtual environment (auto-detected)
├── app.py                 # Main application file
├── requirements.txt       # Dependencies
└── ...
```

## Premium Features (Coming in Paid Version)

AtlasServer's paid version will include support for JavaScript/TypeScript frameworks:

- **Next.js**: Server-side rendering and static site generation for React
- **Express.js**: Minimal and flexible Node.js web application framework
- **Vite**: Modern frontend build tool and dev server
- **And more**: Support for other popular JS/TS frameworks