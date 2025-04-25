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

### 2. Install Dependencies

Install all required packages using pip:

```bash
pip install -r requirements.txt
```

### 3. Start the Server

Launch AtlasServer with the following command:

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

## Optional Configuration

- **Custom Port**: If you want to run AtlasServer on a different port, change the `--port` value in the startup command
- **Development Mode**: Add `--reload` to the startup command for automatic reloading during development

## Troubleshooting

If you encounter any issues during installation:

- Ensure all dependencies were installed correctly
- Check that no other service is using port 5000
- Verify you have appropriate permissions to run the server

For more detailed information or if you need help, please check our [GitHub repository](https://github.com/AtlasServer-Core/AtlasServer-Core) or open an issue.

---

> 💻 **Fast deploy. No cloud. Just code.**  
> *From developers to developers.*