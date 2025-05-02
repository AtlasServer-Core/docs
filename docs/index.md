# Welcome to AtlasServer

> 💻 **Fast deploy. No cloud. Just code — from developers to developers.**

## What is AtlasServer?

AtlasServer is a local deployment platform designed for developers who need to quickly share demos of their applications without complex cloud setups. It provides a centralized dashboard to manage, launch, and expose your Flask, FastAPI, and Django applications on your local network or to the internet via secure tunnels like Ngrok.

## Key Features

- **Fast Local Deployment**: Launch your applications with a single click through an intuitive web interface
- **Framework Support**: Deploy Flask, FastAPI, and Django applications (with Next.js and more coming in premium version)
- **LAN & Internet Exposure**: Share your applications on your local network or expose them securely via Ngrok
- **Process Management**: Start, stop, restart, and monitor your running applications
- **Real-time Logs**: View application logs directly in the dashboard
- **Multi-user Support**: Manage access with different user roles and permissions
- **Command Line Interface**: Manage your server and applications through a powerful CLI
- **Secure By Design**: Keep your development environment under your control, not in the cloud
- **Python virtual environment**: Add Python virtual environment auto-detection

## Who is it for?

- **Freelancers**: Quickly demonstrate work to clients without complex deployments
- **Agencies**: Streamline the client approval process with easy-to-share demos
- **Development Teams**: Simplify internal testing and collaboration
- **Educators**: Share working examples with students or colleagues
- **Startup Founders**: Test MVPs with stakeholders before investing in cloud infrastructure

## Getting Started

Getting started with AtlasServer is simple:

1. Clone the repository
2. Install AtlasServer: `pip install .`
3. Start the server: `atlasserver start`
4. Access your dashboard at http://localhost:5000

Check out our [installation guide](#installation) for detailed instructions.

## Command Line Interface

AtlasServer includes a powerful CLI for managing both the server and your applications:

```bash
# Start the server
atlasserver start

# List all applications
atlasserver app list

# Start a specific application
atlasserver app start 1
```

## Join the Community

AtlasServer is built by developers who understand the challenges of sharing demos with clients and stakeholders. We believe deployment shouldn't be a roadblock to innovation.

---

> 💻 **Fast deploy. No cloud. Just code.**  
> *From developers to developers.*