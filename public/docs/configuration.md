# Configuration Guide

This guide covers how to configure OACP for different environments and use cases.

## Configuration Methods

OACP can be configured through:
1. Environment variables
2. Configuration files
3. Programmatic configuration
4. CLI arguments

## Environment Variables

### Core Configuration

```bash
# Storage backend type
OACP_STORAGE_TYPE=file|sqlite|postgresql

# Storage connection details
OACP_STORAGE_URL=sqlite:///oacp.db
OACP_STORAGE_PATH=./oacp_data  # For file storage

# Logging configuration
OACP_LOG_LEVEL=INFO|DEBUG|WARNING|ERROR
OACP_LOG_FORMAT=json|text

# Performance settings
OACP_MAX_PAYLOAD_SIZE=1048576  # 1MB default
OACP_DEFAULT_TIMEOUT=120       # seconds
```

### Security Configuration

```bash
# Keys to redact from logs (comma-separated)
OACP_REDACT_KEYS=password,secret,token,key

# Enable/disable features
OACP_ENABLE_WEB_DASHBOARD=true
OACP_ENABLE_ADAPTIVE_PROMPTING=true
```

### Web Dashboard Configuration

```bash
# Web server settings
OACP_WEB_HOST=0.0.0.0
OACP_WEB_PORT=8000
OACP_WEB_RELOAD=false

# Authentication (if enabled)
OACP_WEB_AUTH_SECRET=your-secret-key
OACP_WEB_AUTH_ENABLED=false
```

## Storage Backend Configuration

### File Storage

File storage stores data as JSON files in a directory structure:

```bash
OACP_STORAGE_TYPE=file
OACP_STORAGE_PATH=./oacp_data
```

Directory structure:
```
oacp_data/
├── runs/
│   ├── run_id_1.jsonl
│   └── run_id_2.jsonl
├── votes/
│   ├── vote_1.json
│   └── vote_2.json
└── metadata/
    └── config.json
```

### SQLite Storage

SQLite provides a lightweight database option:

```bash
OACP_STORAGE_TYPE=sqlite
OACP_STORAGE_URL=sqlite:///oacp.db

# For in-memory database (testing only)
OACP_STORAGE_URL=sqlite:///:memory:
```

### PostgreSQL Storage

PostgreSQL is recommended for production deployments:

```bash
OACP_STORAGE_TYPE=postgresql
OACP_STORAGE_URL=postgresql://user:password@localhost:5432/oacp_db

# With connection pool settings
OACP_STORAGE_URL=postgresql://user:pass@host:port/db?pool_size=20&max_overflow=30
```

## Programmatic Configuration

### Basic Setup

```python
from oacp.storage import configure_storage
from oacp.context import configure_defaults

# Configure storage
configure_storage(
    storage_type="sqlite",
    storage_url="sqlite:///my_oacp.db"
)

# Configure defaults
configure_defaults(
    default_timeout=60,
    max_payload_size=512000,
    redact_keys=["password", "api_key"]
)
```

### Advanced Configuration

```python
from oacp import OacpConfig

config = OacpConfig(
    storage_type="postgresql",
    storage_url="postgresql://user:pass@localhost/db",
    log_level="DEBUG",
    max_payload_size=2048000,
    default_timeout=180,
    redact_keys=["secret", "token", "password"],
    enable_adaptive_prompting=True,
    enable_web_dashboard=True,
    web_host="127.0.0.1",
    web_port=8080
)

# Apply configuration
config.apply()
```

## Configuration Files

### YAML Configuration

Create `oacp.yaml`:

```yaml
storage:
  type: postgresql
  url: postgresql://user:pass@localhost:5432/oacp_db
  
logging:
  level: INFO
  format: json
  
security:
  redact_keys:
    - password
    - secret
    - token
    - api_key
  
performance:
  max_payload_size: 1048576
  default_timeout: 120
  
features:
  adaptive_prompting: true
  web_dashboard: true
  
web:
  host: 0.0.0.0
  port: 8000
  auth_enabled: false
```

Load configuration:

```python
from oacp.config import load_config_file

config = load_config_file("oacp.yaml")
config.apply()
```

### JSON Configuration

Create `oacp.json`:

```json
{
  "storage": {
    "type": "sqlite",
    "url": "sqlite:///oacp.db"
  },
  "logging": {
    "level": "INFO",
    "format": "text"
  },
  "security": {
    "redact_keys": ["password", "secret", "token"]
  },
  "performance": {
    "max_payload_size": 1048576,
    "default_timeout": 120
  }
}
```

## Environment-Specific Configurations

### Development

```bash
# .env.development
OACP_STORAGE_TYPE=file
OACP_STORAGE_PATH=./dev_data
OACP_LOG_LEVEL=DEBUG
OACP_ENABLE_WEB_DASHBOARD=true
OACP_WEB_RELOAD=true
```

### Testing

```bash
# .env.test
OACP_STORAGE_TYPE=sqlite
OACP_STORAGE_URL=sqlite:///:memory:
OACP_LOG_LEVEL=WARNING
OACP_DEFAULT_TIMEOUT=10
```

### Production

```bash
# .env.production
OACP_STORAGE_TYPE=postgresql
OACP_STORAGE_URL=postgresql://user:pass@prod-db:5432/oacp
OACP_LOG_LEVEL=INFO
OACP_LOG_FORMAT=json
OACP_MAX_PAYLOAD_SIZE=2097152
OACP_REDACT_KEYS=password,secret,token,api_key,private_key
```

## CLI Configuration

### Environment Management

```bash
# Set configuration via CLI
oacp env set OACP_STORAGE_TYPE sqlite
oacp env set OACP_STORAGE_URL sqlite:///oacp.db

# View current configuration
oacp env show

# Test configuration
oacp env test
```

### Configuration Validation

```bash
# Validate current configuration
oacp config validate

# Show configuration schema
oacp config schema

# Export configuration
oacp config export --format yaml > oacp.yaml
```

## Advanced Configuration

### Custom Storage Backend

```python
from oacp.storage.base import IStorage
from oacp.storage import register_storage_backend

class CustomStorage(IStorage):
    def __init__(self, **kwargs):
        # Initialize your custom storage
        pass
    
    async def write_event(self, event):
        # Implement event writing
        pass
    
    async def read_events(self, run_id):
        # Implement event reading
        pass

# Register custom backend
register_storage_backend("custom", CustomStorage)

# Use in configuration
configure_storage(storage_type="custom", custom_param="value")
```

### Custom Voting Strategies

```python
from oacp.contracts import VotingStrategy

class CustomVotingStrategy(VotingStrategy):
    @staticmethod
    def evaluate_custom(votes, required_approvers, weights=None):
        # Implement custom voting logic
        return consensus_achieved, reason

# Register strategy
VotingStrategy.register("custom", CustomVotingStrategy.evaluate_custom)
```

### Middleware Configuration

```python
from oacp.middleware import add_middleware

def logging_middleware(event, next_handler):
    print(f"Processing event: {event.type}")
    result = next_handler(event)
    print(f"Event processed: {event.type}")
    return result

# Add middleware
add_middleware(logging_middleware)
```

## Configuration Validation

### Schema Validation

OACP validates configuration against a schema:

```python
from oacp.config import validate_config

config = {
    "storage": {"type": "invalid_type"}
}

try:
    validate_config(config)
except ValueError as e:
    print(f"Configuration error: {e}")
```

### Runtime Validation

```python
from oacp.config import test_configuration

# Test current configuration
result = test_configuration()
if result.success:
    print("Configuration is valid")
else:
    print(f"Configuration errors: {result.errors}")
```

## Best Practices

### Security
- Never commit sensitive configuration to version control
- Use environment variables for secrets
- Enable key redaction in production
- Use secure connection strings for databases

### Performance
- Set appropriate payload size limits
- Configure reasonable timeouts
- Use connection pooling for databases
- Monitor storage usage

### Monitoring
- Enable structured logging in production
- Use appropriate log levels
- Configure log rotation
- Monitor configuration changes

### Maintenance
- Regularly backup configuration
- Document configuration changes
- Test configuration in staging
- Use configuration management tools

## Troubleshooting

### Common Configuration Issues

#### Storage Connection Errors
```python
# Test storage connection
from oacp.storage import test_storage_connection

result = test_storage_connection()
if not result.success:
    print(f"Storage error: {result.error}")
```

#### Invalid Configuration Values
```bash
# Validate configuration
oacp config validate --verbose
```

#### Environment Variable Issues
```bash
# Check environment variables
oacp env show --all

# Reset to defaults
oacp env reset
```

## Migration Guide

### Upgrading Configuration

When upgrading OACP versions, configuration may need updates:

```bash
# Check for configuration updates needed
oacp config check-updates

# Migrate configuration to new version
oacp config migrate --from-version 0.1.0 --to-version 0.2.0
```

### Backup and Restore

```bash
# Backup current configuration
oacp config backup --output config-backup.yaml

# Restore configuration
oacp config restore --input config-backup.yaml
```
