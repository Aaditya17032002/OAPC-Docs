# OACP Installation Guide

This guide covers all installation methods and configuration options for OACP (Open Agent Compliance Protocol).

## System Requirements

### Python Version
- **Python 3.10** or higher
- **pip** package manager
- **Virtual environment** (recommended)

### Operating Systems
- ✅ **Linux** (Ubuntu, CentOS, RHEL, etc.)
- ✅ **macOS** (Intel and Apple Silicon)
- ✅ **Windows** (10, 11, Server 2019+)

### Hardware Requirements
- **Minimum**: 2GB RAM, 1GB disk space
- **Recommended**: 4GB RAM, 5GB disk space
- **Production**: 8GB+ RAM, 20GB+ disk space

## Installation Methods

### 1. PyPI Installation (Recommended)

#### Basic Installation
```bash
# Install core OACP
pip install OACP
```

#### With Optional Dependencies
```bash
# Web dashboard support
pip install OACP[web]

# PostgreSQL database support
pip install OACP[postgres]

# Development tools
pip install OACP[dev]

# Full installation with all features
pip install OACP[web,postgres,dev]
```

### 2. Development Installation

#### From Source
```bash
# Clone repository
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install in development mode
pip install -e .

# Install with all dependencies
pip install -e .[web,postgres,dev]
```

### 3. Docker Installation

#### Using Docker Hub
```bash
# Pull official image
docker pull oacp/oacp:latest

# Run with default configuration
docker run -p 8000:8000 oacp/oacp:latest
```

#### Build from Source
```bash
# Clone repository
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP

# Build Docker image
docker build -t oacp:local .

# Run container
docker run -p 8000:8000 -v $(pwd)/logs:/app/logs oacp:local
```

### 4. Conda Installation

```bash
# Install from conda-forge (if available)
conda install -c conda-forge oacp

# Or create environment with pip
conda create -n oacp python=3.10
conda activate oacp
pip install OACP[web,postgres]
```

## Verification

### Check Installation
```bash
# Verify OACP is installed
python -c "import oacp; print(f'OACP {oacp.__version__} installed successfully')"

# Check CLI availability
oacp --version
oacp --help
```

### Run Quick Test
```bash
# Test basic functionality
python -c "
from oacp import with_oacp
@with_oacp(role='test')
def test_func():
    return 'OACP working!'
print(test_func())
"
```

## Environment Setup

### Automatic Setup (Recommended)
```bash
# Interactive setup
oacp env setup

# Global configuration
oacp env setup --global

# Force overwrite existing config
oacp env setup --force
```

### Manual Setup

#### Create Configuration Directory
```bash
# Linux/Mac
mkdir -p ~/.config/oacp

# Windows
mkdir %APPDATA%\oacp
```

#### Environment Variables
Create `.env` file in your project or set system environment variables:

```bash
# Core Configuration
OACP_STORAGE_URI=file://logs
OACP_LOG_LEVEL=INFO
OACP_ENABLE_ADAPTIVE_PROMPTING=true
OACP_MAX_RETRIES=3
OACP_DEFAULT_TIMEOUT=30

# API Keys (add your actual keys)
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Database Configuration (if using PostgreSQL)
OACP_DB_URL=postgresql://user:password@localhost/oacp
OACP_DB_POOL_SIZE=10
OACP_DB_MAX_OVERFLOW=20

# Web Dashboard Configuration
OACP_WEB_HOST=127.0.0.1
OACP_WEB_PORT=8000
OACP_WEB_RELOAD=false
```

## Storage Backend Configuration

### File Storage (Default)
```bash
# Set storage location
export OACP_STORAGE_URI=file://logs

# Or custom path
export OACP_STORAGE_URI=file:///path/to/your/logs
```

### SQLite Database
```bash
# Local SQLite database
export OACP_STORAGE_URI=sqlite:///oacp.db

# Or custom location
export OACP_STORAGE_URI=sqlite:///path/to/database.db
```

### PostgreSQL Database

#### Install PostgreSQL Dependencies
```bash
pip install OACP[postgres]
```

#### Database Setup
```sql
-- Connect to PostgreSQL as admin
CREATE DATABASE oacp;
CREATE USER oacp_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE oacp TO oacp_user;
```

#### Configuration
```bash
export OACP_STORAGE_URI=postgresql://oacp_user:your_password@localhost:5432/oacp
```

## Optional Dependencies

### Web Dashboard
```bash
pip install fastapi uvicorn
# or
pip install OACP[web]
```

### Database Support
```bash
# PostgreSQL
pip install psycopg[binary]
# or
pip install OACP[postgres]

# SQLite (included in Python standard library)
# No additional installation required
```

### Development Tools
```bash
pip install pytest pytest-asyncio pytest-cov mypy ruff black pre-commit
# or
pip install OACP[dev]
```

### LLM Integrations
```bash
# OpenAI
pip install openai

# Anthropic
pip install anthropic

# Google AI
pip install google-generativeai

# Langchain (optional)
pip install langchain langchain-openai langchain-anthropic
```

## Platform-Specific Instructions

### Linux (Ubuntu/Debian)
```bash
# Update package manager
sudo apt update

# Install Python 3.10+ if not available
sudo apt install python3.10 python3.10-pip python3.10-venv

# Install OACP
python3.10 -m pip install OACP[web,postgres]
```

### Linux (CentOS/RHEL)
```bash
# Install Python 3.10+
sudo dnf install python3.10 python3.10-pip

# Install OACP
python3.10 -m pip install OACP[web,postgres]
```

### macOS
```bash
# Install Python 3.10+ using Homebrew
brew install python@3.10

# Install OACP
python3.10 -m pip install OACP[web,postgres]
```

### Windows

#### Using Python Installer
1. Download Python 3.10+ from [python.org](https://python.org)
2. Install with "Add to PATH" option
3. Open Command Prompt or PowerShell:
```cmd
pip install OACP[web,postgres]
```

#### Using Chocolatey
```powershell
# Install Python
choco install python

# Install OACP
pip install OACP[web,postgres]
```

#### Using Windows Subsystem for Linux (WSL)
```bash
# In WSL terminal
sudo apt update
sudo apt install python3.10 python3.10-pip
pip install OACP[web,postgres]
```

## Production Deployment

### System Service Setup

#### Linux (systemd)
Create `/etc/systemd/system/oacp.service`:
```ini
[Unit]
Description=OACP Dashboard
After=network.target

[Service]
Type=simple
User=oacp
WorkingDirectory=/opt/oacp
Environment=OACP_STORAGE_URI=postgresql://oacp:password@localhost/oacp
ExecStart=/opt/oacp/venv/bin/oacp serve --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable oacp
sudo systemctl start oacp
```

#### Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  oacp:
    image: oacp/oacp:latest
    ports:
      - "8000:8000"
    environment:
      - OACP_STORAGE_URI=postgresql://oacp:password@db:5432/oacp
      - OACP_LOG_LEVEL=INFO
    volumes:
      - ./logs:/app/logs
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=oacp
      - POSTGRES_USER=oacp
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

```bash
# Start services
docker-compose up -d
```

### Reverse Proxy Setup

#### Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

#### Apache
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
    
    # WebSocket support
    ProxyPass /ws ws://127.0.0.1:8000/ws
    ProxyPassReverse /ws ws://127.0.0.1:8000/ws
</VirtualHost>
```

## Troubleshooting

### Common Installation Issues

#### Permission Errors
```bash
# Use user installation
pip install --user OACP

# Or fix permissions
sudo chown -R $USER:$USER ~/.local
```

#### Python Version Issues
```bash
# Check Python version
python --version

# Use specific Python version
python3.10 -m pip install OACP
```

#### Virtual Environment Issues
```bash
# Create fresh virtual environment
python -m venv fresh_venv
source fresh_venv/bin/activate  # Linux/Mac
fresh_venv\Scripts\activate     # Windows

# Install OACP
pip install OACP
```

#### Import Errors
```bash
# Check installation
pip list | grep -i oacp

# Reinstall if necessary
pip uninstall OACP
pip install OACP
```

### Database Connection Issues

#### PostgreSQL
```bash
# Test connection
psql -h localhost -U oacp_user -d oacp

# Check service status
sudo systemctl status postgresql
```

#### SQLite
```bash
# Check file permissions
ls -la oacp.db

# Test database
sqlite3 oacp.db ".tables"
```

### Web Dashboard Issues

#### Port Already in Use
```bash
# Find process using port
lsof -i :8000  # Linux/Mac
netstat -ano | findstr :8000  # Windows

# Use different port
oacp serve --port 8001
```

#### Missing Dependencies
```bash
# Install web dependencies
pip install fastapi uvicorn
# or
pip install OACP[web]
```

## Upgrade Instructions

### Upgrading OACP
```bash
# Upgrade to latest version
pip install --upgrade OACP

# Upgrade with all dependencies
pip install --upgrade OACP[web,postgres,dev]
```

### Migration Between Versions
```bash
# Check current version
oacp --version

# Backup data before upgrade
cp -r logs logs_backup  # File storage
pg_dump oacp > oacp_backup.sql  # PostgreSQL

# Upgrade
pip install --upgrade OACP

# Verify installation
oacp env status
```

## Getting Help

### Documentation
- [Quick Start Guide](quickstart.md)
- [Configuration Reference](reference/config.md)
- [API Documentation](api/decorators.md)

### Community Support
- **GitHub Issues**: https://github.com/Aaditya17032002/OACP/issues
- **Discussions**: https://github.com/Aaditya17032002/OACP/discussions
- **Documentation**: Complete docs available online

### Professional Support
For enterprise installations and professional support, contact the development team through the GitHub repository.

## Next Steps

After successful installation:

1. **Complete setup**: Run `oacp env setup`
2. **Try examples**: Follow the [Quick Start Guide](quickstart.md)
3. **Start dashboard**: Run `oacp serve` for monitoring
4. **Read documentation**: Explore [API docs](api/decorators.md) and [examples](examples/basic-usage.md)

Your OACP installation is now ready for building governed multi-agent systems!
