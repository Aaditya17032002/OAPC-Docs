# Installation Guide

This guide covers different ways to install OACP and its dependencies.

## Requirements

- Python 3.10 or higher
- pip or poetry for package management

## Installation Methods

### From PyPI (Recommended)

Install the latest stable release from PyPI:

```bash
pip install OACP
```

### From Source

For the latest development version:

```bash
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP
pip install -e .
```

### With Optional Dependencies

OACP supports optional features that require additional dependencies:

#### PostgreSQL Support
```bash
pip install OACP[postgres]
```

#### Web Dashboard
```bash
pip install OACP[web]
```

#### Development Tools
```bash
pip install OACP[dev]
```

#### All Optional Dependencies
```bash
pip install OACP[postgres,web,dev]
```

## Core Dependencies

OACP automatically installs these core dependencies:

- **LangGraph** (>=0.0.55): Core workflow framework
- **Pydantic** (>=2.0.0): Data validation and settings
- **SQLAlchemy** (>=2.0.0): Database abstraction layer
- **Typer** (>=0.9.0): CLI framework
- **Rich** (>=13.0.0): Terminal formatting
- **ulid-py** (>=1.1.0): Unique identifier generation
- **aiosqlite** (>=0.19.0): Async SQLite support

## Verification

Verify your installation by running:

```bash
# Check OACP version
python -c "import oacp; print(oacp.__version__)"

# Test CLI
oacp --version

# Test basic functionality
python -c "from oacp import with_oacp; print('OACP installed successfully!')"
```

## Environment Setup

### Basic Configuration

Create a `.env` file in your project root:

```bash
# Storage configuration
OACP_STORAGE_TYPE=file
OACP_STORAGE_PATH=./oacp_data

# Logging level
OACP_LOG_LEVEL=INFO
```

### PostgreSQL Setup

If using PostgreSQL storage:

```bash
# Install PostgreSQL support
pip install OACP[postgres]

# Configure environment
OACP_STORAGE_TYPE=postgresql
OACP_STORAGE_URL=postgresql://user:password@localhost:5432/oacp_db
```

### SQLite Setup

For SQLite storage (default):

```bash
OACP_STORAGE_TYPE=sqlite
OACP_STORAGE_URL=sqlite:///oacp.db
```

## Development Installation

For contributors and developers:

```bash
# Clone repository
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP

# Install in development mode with all dependencies
pip install -e ".[dev,postgres,web]"

# Install pre-commit hooks
pre-commit install

# Run tests to verify installation
pytest
```

## Docker Installation

OACP can be used in Docker containers:

```dockerfile
FROM python:3.11-slim

# Install OACP
RUN pip install OACP[postgres,web]

# Copy your application
COPY . /app
WORKDIR /app

# Run your OACP application
CMD ["python", "your_app.py"]
```

## Troubleshooting

### Common Issues

#### Import Errors
If you encounter import errors:

```bash
# Reinstall OACP
pip uninstall OACP
pip install OACP

# Check Python path
python -c "import sys; print(sys.path)"
```

#### Database Connection Issues
For database connection problems:

1. Verify database credentials
2. Check network connectivity
3. Ensure database exists
4. Test connection manually:

```python
from oacp.storage import configure_storage

try:
    configure_storage(
        storage_type="postgresql",
        storage_url="your_connection_string"
    )
    print("Database connection successful!")
except Exception as e:
    print(f"Connection failed: {e}")
```

#### Permission Errors
If you encounter permission errors:

```bash
# Use virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install OACP
```

### Getting Help

If you encounter issues:

1. Check the [FAQ](../troubleshooting/faq.md)
2. Search [GitHub Issues](https://github.com/Aaditya17032002/OACP/issues)
3. Create a new issue with:
   - Python version
   - OACP version
   - Operating system
   - Error message and traceback
   - Minimal reproduction example

## Next Steps

After installation:

1. Follow the [Quick Start Guide](quickstart.md)
2. Explore [Examples](../examples/)
3. Read the [Configuration Guide](configuration.md)
4. Check out the [API Reference](reference/api.md)
