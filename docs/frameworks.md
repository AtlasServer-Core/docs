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

## Coming Soon to AtlasServer Core

We're working on adding support for more Python frameworks:

- **Django**: For full-featured web applications

## Premium Features (Coming in Paid Version)

AtlasServer's paid version will include support for JavaScript/TypeScript frameworks:

- **Next.js**: Server-side rendering and static site generation for React
- **Express.js**: Minimal and flexible Node.js web application framework
- **Vite**: Modern frontend build tool and dev server
- **And more**: Support for other popular JS/TS frameworks
