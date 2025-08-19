# Storage Backends API Reference

OACP supports multiple storage backends for persisting governance data, events, and audit trails. This guide covers all available storage options and their configuration.

## Overview

OACP provides three built-in storage backends:

- **File Storage**: JSON-based local storage for development
- **SQLite**: Lightweight database for small to medium deployments  
- **PostgreSQL**: Production-ready database for enterprise use

## Storage Interface

All storage backends implement the `IStorage` interface:

```python
from oacp.storage.base import IStorage

class IStorage:
    async def write_event(self, event: EventBase) -> None:
        """Write an event to storage."""
        pass
    
    async def read_events(self, run_id: str) -> list[EventBase]:
        """Read all events for a run ID."""
        pass
    
    async def await_votes(self, run_id: str, contract: DecisionContract, timeout: int) -> dict:
        """Wait for votes with timeout."""
        pass
    
    async def get_runs(self, limit: int = 100) -> list[str]:
        """Get list of run IDs."""
        pass
    
    async def get_statistics(self) -> dict:
        """Get storage statistics."""
        pass
```

## File Storage

### Overview

File storage persists data as JSON files in a directory structure. Best for development and small deployments.

### Configuration

```python
from oacp.storage import configure_storage

# Environment variable
OACP_STORAGE_TYPE=file
OACP_STORAGE_PATH=./oacp_data

# Programmatic configuration
configure_storage(
    storage_type="file",
    storage_path="./my_oacp_data"
)
```

### Directory Structure

```
oacp_data/
├── runs/
│   ├── 01K2YQ0W5Z.jsonl    # Event logs per run
│   └── 01K2YQ0W6W.jsonl
├── votes/
│   ├── vote_001.json       # Individual vote records
│   └── vote_002.json
├── metadata/
│   └── storage_info.json   # Storage metadata
└── indexes/
    ├── by_role.json        # Role-based indexes
    └── by_date.json        # Date-based indexes
```

### Usage Example

```python
from oacp.storage.file import FileStorage

# Direct usage
storage = FileStorage(storage_path="./custom_path")

# Write event
await storage.write_event(event)

# Read events
events = await storage.read_events(run_id="01K2YQ0W5Z")

# Get statistics
stats = await storage.get_statistics()
print(f"Total runs: {stats['total_runs']}")
print(f"Total events: {stats['total_events']}")
```

### Advantages

- **Simple Setup**: No external dependencies
- **Human Readable**: JSON format easy to inspect
- **Version Control**: Files can be committed to git
- **Backup Friendly**: Standard file system operations

### Limitations

- **Performance**: Slower for large datasets
- **Concurrency**: Limited concurrent access
- **Scalability**: Not suitable for high-volume production
- **Querying**: Limited query capabilities

## SQLite Storage

### Overview

SQLite provides a lightweight, serverless database option. Good for single-node deployments and moderate scale.

### Configuration

```python
# Environment variable
OACP_STORAGE_TYPE=sqlite
OACP_STORAGE_URL=sqlite:///oacp.db

# In-memory (testing only)
OACP_STORAGE_URL=sqlite:///:memory:

# Programmatic configuration
configure_storage(
    storage_type="sqlite",
    storage_url="sqlite:///./data/oacp.db"
)
```

### Database Schema

```sql
-- Events table
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    data TEXT NOT NULL,  -- JSON blob
    INDEX idx_run_id (run_id),
    INDEX idx_event_type (event_type),
    INDEX idx_timestamp (timestamp)
);

-- Votes table
CREATE TABLE votes (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    voter_id TEXT NOT NULL,
    decision TEXT NOT NULL,
    reason TEXT,
    timestamp TEXT NOT NULL,
    INDEX idx_run_id (run_id),
    INDEX idx_voter_id (voter_id)
);

-- Runs metadata
CREATE TABLE runs (
    run_id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT,
    status TEXT NOT NULL,
    INDEX idx_role (role),
    INDEX idx_start_time (start_time)
);
```

### Usage Example

```python
from oacp.storage.sqlite import SqliteStorage

# Direct usage
storage = SqliteStorage(connection_string="sqlite:///oacp.db")

# Initialize database
await storage.initialize()

# Query capabilities
events = await storage.query_events(
    filters={"event_type": "VoteCast", "role": "reviewer"},
    limit=50
)

# Advanced queries
stats = await storage.get_role_statistics("researcher")
print(f"Success rate: {stats['success_rate']:.2%}")
```

### Advantages

- **Better Performance**: Faster than file storage
- **ACID Transactions**: Data integrity guarantees
- **SQL Queries**: Rich querying capabilities
- **Concurrent Access**: Better concurrency than files
- **Backup**: Standard SQLite backup tools

### Limitations

- **Single Node**: Not distributed
- **Write Scaling**: Limited write throughput
- **Size Limits**: Practical limits for very large datasets

## PostgreSQL Storage

### Overview

PostgreSQL provides enterprise-grade storage with full ACID compliance, advanced features, and excellent scalability.

### Configuration

```python
# Environment variable
OACP_STORAGE_TYPE=postgresql
OACP_STORAGE_URL=postgresql://user:password@localhost:5432/oacp_db

# With connection pool
OACP_STORAGE_URL=postgresql://user:pass@host:port/db?pool_size=20&max_overflow=30

# Programmatic configuration
configure_storage(
    storage_type="postgresql",
    storage_url="postgresql://oacp_user:secure_pass@db.example.com:5432/oacp_production",
    pool_size=20,
    max_overflow=50
)
```

### Installation

```bash
# Install PostgreSQL dependencies
pip install OACP[postgres]

# Or install psycopg directly
pip install psycopg[binary]>=3.1.0
```

### Database Setup

```sql
-- Create database
CREATE DATABASE oacp_db;

-- Create user
CREATE USER oacp_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE oacp_db TO oacp_user;

-- Connect to database
\c oacp_db

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
```

### Advanced Schema

```sql
-- Events table with JSONB
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    run_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data JSONB NOT NULL,
    role TEXT,
    node_id TEXT
);

-- Indexes for performance
CREATE INDEX idx_events_run_id ON events(run_id);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_timestamp ON events(timestamp);
CREATE INDEX idx_events_role ON events(role);
CREATE INDEX idx_events_data_gin ON events USING GIN(data);

-- Votes table
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    run_id TEXT NOT NULL,
    voter_id TEXT NOT NULL,
    decision TEXT NOT NULL,
    reason TEXT,
    fix_suggestions JSONB,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    target_ref TEXT
);

-- Partitioning by date for large datasets
CREATE TABLE events_2024 PARTITION OF events
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

### Usage Example

```python
from oacp.storage.postgres import PostgresStorage

# Direct usage with connection pool
storage = PostgresStorage(
    connection_string="postgresql://user:pass@localhost/oacp_db",
    pool_size=20,
    max_overflow=50
)

# Advanced querying
events = await storage.query_events_advanced(
    filters={
        "event_type": "VoteCast",
        "data->>'voter_id'": "senior_reviewer",
        "timestamp": {"gte": "2024-01-01", "lt": "2024-02-01"}
    },
    order_by=[("timestamp", "DESC")],
    limit=100
)

# Analytics queries
analytics = await storage.get_analytics(
    start_date="2024-01-01",
    end_date="2024-01-31",
    group_by="role"
)
```

### Advantages

- **High Performance**: Excellent read/write performance
- **Scalability**: Handles large datasets efficiently
- **ACID Compliance**: Full transaction support
- **Advanced Features**: JSON queries, full-text search, etc.
- **Concurrent Access**: Excellent concurrency support
- **Backup & Recovery**: Enterprise backup solutions
- **Monitoring**: Rich monitoring and analytics capabilities

### Limitations

- **Complexity**: Requires database administration
- **Resources**: Higher resource requirements
- **Cost**: May require dedicated database server

## Custom Storage Backend

### Creating Custom Backend

```python
from oacp.storage.base import IStorage
from oacp.events import EventBase
from oacp.contracts import DecisionContract

class CustomStorage(IStorage):
    def __init__(self, **config):
        self.config = config
        # Initialize your storage system
    
    async def initialize(self):
        """Initialize storage system."""
        pass
    
    async def write_event(self, event: EventBase) -> None:
        """Write event to your storage system."""
        # Implement your storage logic
        pass
    
    async def read_events(self, run_id: str) -> list[EventBase]:
        """Read events from your storage system."""
        # Implement your retrieval logic
        pass
    
    async def await_votes(
        self, 
        run_id: str, 
        contract: DecisionContract, 
        timeout: int
    ) -> dict:
        """Wait for votes with timeout."""
        # Implement voting logic
        pass
    
    async def get_runs(self, limit: int = 100) -> list[str]:
        """Get list of run IDs."""
        pass
    
    async def get_statistics(self) -> dict:
        """Get storage statistics."""
        pass
```

### Register Custom Backend

```python
from oacp.storage import register_storage_backend

# Register your custom backend
register_storage_backend("custom", CustomStorage)

# Use in configuration
configure_storage(
    storage_type="custom",
    custom_param="value"
)
```

## Storage Configuration

### Environment Variables

```bash
# Storage type selection
OACP_STORAGE_TYPE=file|sqlite|postgresql

# File storage
OACP_STORAGE_PATH=./oacp_data

# SQLite storage
OACP_STORAGE_URL=sqlite:///oacp.db

# PostgreSQL storage
OACP_STORAGE_URL=postgresql://user:pass@host:port/db
OACP_STORAGE_POOL_SIZE=20
OACP_STORAGE_MAX_OVERFLOW=50
OACP_STORAGE_POOL_TIMEOUT=30

# General settings
OACP_STORAGE_TIMEOUT=60
OACP_STORAGE_RETRY_ATTEMPTS=3
OACP_STORAGE_BATCH_SIZE=1000
```

### Programmatic Configuration

```python
from oacp.storage import configure_storage, StorageConfig

# Basic configuration
configure_storage(
    storage_type="postgresql",
    storage_url="postgresql://user:pass@localhost/oacp_db"
)

# Advanced configuration
config = StorageConfig(
    storage_type="postgresql",
    storage_url="postgresql://user:pass@localhost/oacp_db",
    pool_size=20,
    max_overflow=50,
    pool_timeout=30,
    retry_attempts=3,
    batch_size=1000,
    enable_ssl=True,
    ssl_cert_path="/path/to/cert.pem"
)

configure_storage(config)
```

## Performance Optimization

### File Storage Optimization

```python
# Use compression for large datasets
configure_storage(
    storage_type="file",
    storage_path="./oacp_data",
    compress=True,
    compression_level=6
)

# Enable indexing for faster queries
configure_storage(
    storage_type="file", 
    storage_path="./oacp_data",
    enable_indexing=True,
    index_fields=["role", "event_type", "timestamp"]
)
```

### SQLite Optimization

```python
# Performance tuning
configure_storage(
    storage_type="sqlite",
    storage_url="sqlite:///oacp.db",
    pragma_settings={
        "journal_mode": "WAL",
        "synchronous": "NORMAL", 
        "cache_size": 10000,
        "temp_store": "MEMORY"
    }
)
```

### PostgreSQL Optimization

```python
# Connection pool optimization
configure_storage(
    storage_type="postgresql",
    storage_url="postgresql://user:pass@host/db",
    pool_size=20,           # Connection pool size
    max_overflow=50,        # Additional connections
    pool_timeout=30,        # Connection timeout
    pool_recycle=3600,      # Recycle connections hourly
    pool_pre_ping=True      # Validate connections
)
```

## Monitoring and Maintenance

### Storage Statistics

```python
from oacp.storage import get_current_storage

# Get current storage instance
storage = get_current_storage()

# Get statistics
stats = await storage.get_statistics()
print(f"Total runs: {stats['total_runs']}")
print(f"Total events: {stats['total_events']}")
print(f"Storage size: {stats['storage_size_mb']} MB")
print(f"Average events per run: {stats['avg_events_per_run']}")
```

### Health Checks

```python
from oacp.storage import health_check

# Check storage health
health = await health_check()
print(f"Storage healthy: {health['healthy']}")
print(f"Response time: {health['response_time_ms']}ms")
print(f"Available space: {health['available_space_gb']}GB")
```

### Backup and Recovery

```python
from oacp.storage import backup_storage, restore_storage

# Backup storage
backup_path = await backup_storage(
    output_path="./backups/oacp_backup_2024_01_15.tar.gz",
    compress=True
)

# Restore from backup
await restore_storage(
    backup_path="./backups/oacp_backup_2024_01_15.tar.gz",
    target_storage="postgresql://user:pass@localhost/oacp_restored"
)
```

## Migration Between Backends

### Migration Tool

```python
from oacp.storage import migrate_storage

# Migrate from file to PostgreSQL
await migrate_storage(
    source_config={
        "storage_type": "file",
        "storage_path": "./oacp_data"
    },
    target_config={
        "storage_type": "postgresql", 
        "storage_url": "postgresql://user:pass@localhost/oacp_db"
    },
    batch_size=1000,
    verify_migration=True
)
```

### Migration CLI

```bash
# Migrate using CLI
oacp migrate \
    --source-type file \
    --source-path ./oacp_data \
    --target-type postgresql \
    --target-url postgresql://user:pass@localhost/oacp_db \
    --batch-size 1000 \
    --verify
```

## Best Practices

### Development

- Use **File Storage** for development and testing
- Enable compression for large datasets
- Use in-memory SQLite for unit tests

### Staging

- Use **SQLite** for staging environments
- Configure WAL mode for better performance
- Regular backups before deployments

### Production

- Use **PostgreSQL** for production
- Configure connection pooling appropriately
- Set up monitoring and alerting
- Regular backups and disaster recovery testing
- Use read replicas for analytics workloads

### Security

- Use SSL/TLS for database connections
- Encrypt sensitive data at rest
- Implement proper access controls
- Regular security updates

### Monitoring

- Monitor storage performance metrics
- Set up alerts for storage issues
- Track growth trends
- Monitor connection pool usage

## Troubleshooting

### Common Issues

#### Connection Errors

```python
# Test storage connection
from oacp.storage import test_storage_connection

result = await test_storage_connection()
if not result.success:
    print(f"Connection failed: {result.error}")
    print(f"Suggestions: {result.suggestions}")
```

#### Performance Issues

```python
# Analyze storage performance
from oacp.storage import analyze_storage_performance

analysis = await analyze_storage_performance()
print(f"Slow queries: {analysis.slow_queries}")
print(f"Recommendations: {analysis.recommendations}")
```

#### Data Integrity Issues

```python
# Verify data integrity
from oacp.storage import verify_data_integrity

verification = await verify_data_integrity()
if not verification.valid:
    print(f"Issues found: {verification.issues}")
    print(f"Repair suggestions: {verification.repair_suggestions}")
```
