# Installation Guide

This guide will help you set up AtlasServer on your local machine in just a few minutes.

## Prerequisites

Before installing AtlasServer, please make sure you have the following:

- Python 3.8 or later
- Git
- pip (Python package manager)
- A stable internet connection for downloading dependencies

## Installation Steps

Follow these simple steps to get AtlasServer up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/AtlasServer-Core/AtlasServer-Core.git
cd AtlasServer-Core
```

### 2. Install AtlasServer

You can install AtlasServer in two ways:

#### Option A: Install as a package (recommended)

Install AtlasServer as a Python package:

```bash
pip install .
```

For development mode (editable install):

```bash
pip install -e .
```

#### Option B: Install dependencies only

If you prefer not to install as a package:

```bash
pip install -r requirements.txt
```

### 3. Start the Server

#### Using CLI (recommended)

If you installed AtlasServer as a package, you can use the CLI:

```bash
# Start the server
atlasserver start

# Check server status
atlasserver status

# Stop the server
atlasserver stop
```

#### Manual start

Alternatively, you can launch AtlasServer with:

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 5000
```

That's it! AtlasServer should now be running at [http://localhost:5000](http://localhost:5000).

## First-time Setup

When you first access AtlasServer, you'll need to create an admin account:

1. Navigate to [http://localhost:5000](http://localhost:5000) in your browser
2. You'll be redirected to the registration page
3. Create your administrator account
4. You can then log in with your new credentials

## Using the CLI

AtlasServer includes a command-line interface for easier management:

```bash
# Get help
atlasserver --help

# Server management
atlasserver start [--host HOST] [--port PORT] [--reload]
atlasserver stop
atlasserver status

# Application management
atlasserver app list
atlasserver app start APP_ID
atlasserver app stop APP_ID
atlasserver app restart APP_ID
atlasserver app info APP_ID
```

## Optional Configuration

- **Custom Port**: Change the port by using `--port` option with the CLI or in the manual startup command
- **Development Mode**: Add the `--reload` flag when starting the server
- **Host Configuration**: Use `--host` to specify the network interface to bind to

## Troubleshooting

If you encounter any issues during installation:

- Ensure all dependencies were installed correctly
- Check that no other service is using port 5000
- Verify you have appropriate permissions to run the server
- Run `atlasserver status` to check if the server is already running

For more detailed information or if you need help, please check our [GitHub repository](https://github.com/AtlasServer-Core/AtlasServer-Core) or open an issue.

---

> 💻 **Fast deploy. No cloud. Just code.**  
> *From developers to developers.*