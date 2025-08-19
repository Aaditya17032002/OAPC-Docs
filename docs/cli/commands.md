# CLI Commands Reference

OACP provides a comprehensive command-line interface for managing, monitoring, and analyzing your governance workflows.

## Installation

The CLI is automatically installed with OACP:

```bash
pip install OACP
```

Verify installation:

```bash
oacp --version
```

## Command Overview

```bash
oacp --help
```

### Main Commands

- `oacp logs` - View and analyze logs
- `oacp stats` - Show system statistics  
- `oacp monitor` - Real-time monitoring
- `oacp export` - Export data
- `oacp env` - Environment management
- `oacp config` - Configuration management
- `oacp web` - Web dashboard control

## Log Management Commands

### View Logs

```bash
# View recent logs
oacp logs

# Limit number of entries
oacp logs --limit 50

# Filter by role
oacp logs --role researcher

# Filter by run ID
oacp logs --run-id 01K2YQ0W5Z

# Filter by time range
oacp logs --since "2024-01-01" --until "2024-01-02"

# Follow logs in real-time
oacp logs --follow

# Filter by event type
oacp logs --event-type VoteCast

# Show only errors
oacp logs --level ERROR
```

### Log Analysis

```bash
# Analyze log patterns
oacp logs analyze

# Find anomalies
oacp logs anomalies --days 7

# Generate log summary
oacp logs summary --role researcher --days 30

# Export logs
oacp logs export --format json --output logs.json
```

### Examples

```bash
# View last 100 voting events
oacp logs --event-type VoteCast --limit 100

# Monitor researcher activity in real-time
oacp logs --role researcher --follow

# Analyze errors from last week
oacp logs --level ERROR --since "1 week ago" analyze
```

## Monitoring & Analysis Commands

### System Statistics

```bash
# Show overall statistics
oacp stats

# Role-specific statistics
oacp stats --role researcher

# Time-based statistics
oacp stats --days 30

# Detailed statistics
oacp stats --detailed

# Export statistics
oacp stats --format json --output stats.json
```

### Real-time Monitoring

```bash
# Start monitoring dashboard
oacp monitor

# Monitor specific role
oacp monitor --role synthesizer

# Monitor with filters
oacp monitor --event-type VoteCast

# Monitor with custom refresh rate
oacp monitor --refresh 5
```

### Voting Analysis

```bash
# Analyze voting patterns
oacp votes analyze

# Show voter statistics
oacp votes --voter researcher --days 30

# Consensus analysis
oacp votes consensus --strategy unanimous

# Voting trends
oacp votes trends --days 90
```

### Performance Analysis

```bash
# Performance overview
oacp performance

# Identify bottlenecks
oacp performance bottlenecks

# Response time analysis
oacp performance response-times --role analyst

# Throughput analysis
oacp performance throughput --days 7
```

## Environment Management Commands

### Environment Configuration

```bash
# Show current environment
oacp env show

# Show all environment variables
oacp env show --all

# Set environment variable
oacp env set OACP_STORAGE_TYPE sqlite

# Get environment variable
oacp env get OACP_STORAGE_TYPE

# Unset environment variable
oacp env unset OACP_STORAGE_TYPE

# Reset to defaults
oacp env reset
```

### Environment Testing

```bash
# Test current configuration
oacp env test

# Test specific storage
oacp env test --storage postgresql://user:pass@localhost/db

# Validate environment
oacp env validate

# Environment health check
oacp env health
```

### Environment Templates

```bash
# List available templates
oacp env templates

# Apply template
oacp env apply-template development

# Create custom template
oacp env create-template --name production --from-current

# Export environment
oacp env export --output .env.backup
```

## Configuration Management

### Configuration Commands

```bash
# Show current configuration
oacp config show

# Validate configuration
oacp config validate

# Show configuration schema
oacp config schema

# Test configuration
oacp config test
```

### Configuration Migration

```bash
# Check for updates needed
oacp config check-updates

# Migrate configuration
oacp config migrate --from-version 0.1.0 --to-version 0.2.0

# Backup configuration
oacp config backup --output config-backup.yaml

# Restore configuration
oacp config restore --input config-backup.yaml
```

## Data Export & Import

### Export Commands

```bash
# Export all data
oacp export --format json --output oacp-data.json

# Export specific run
oacp export --run-id 01K2YQ0W5Z --format json

# Export by date range
oacp export --since "2024-01-01" --until "2024-01-31"

# Export by role
oacp export --role researcher --days 30

# Export voting data only
oacp export --type votes --format csv

# Export with compression
oacp export --format json --compress --output data.json.gz
```

### Import Commands

```bash
# Import data
oacp import --input oacp-data.json

# Import with validation
oacp import --input data.json --validate

# Import and merge
oacp import --input data.json --merge

# Dry run import
oacp import --input data.json --dry-run
```

## Web Dashboard Commands

### Dashboard Control

```bash
# Start web dashboard
oacp web start

# Start with custom port
oacp web start --port 8080

# Start with custom host
oacp web start --host 0.0.0.0 --port 8080

# Start in background
oacp web start --daemon

# Stop dashboard
oacp web stop

# Restart dashboard
oacp web restart

# Show dashboard status
oacp web status
```

### Dashboard Configuration

```bash
# Configure dashboard
oacp web config --port 8080 --host localhost

# Enable authentication
oacp web config --auth-enabled --auth-secret your-secret

# Set dashboard theme
oacp web config --theme dark

# Show dashboard configuration
oacp web config show
```

## Advanced Commands

### Debugging Tools

```bash
# Debug specific run
oacp debug run 01K2YQ0W5Z

# Debug voting process
oacp debug voting --run-id 01K2YQ0W5Z

# Debug storage issues
oacp debug storage

# Debug configuration
oacp debug config

# Trace execution
oacp debug trace --role researcher --limit 10
```

### Replay Commands

```bash
# Replay specific run
oacp replay run 01K2YQ0W5Z

# Replay with modifications
oacp replay run 01K2YQ0W5Z --modify-votes

# Replay range of runs
oacp replay --since "2024-01-01" --until "2024-01-02"

# Dry run replay
oacp replay run 01K2YQ0W5Z --dry-run
```

### Maintenance Commands

```bash
# Clean up old data
oacp cleanup --older-than 90d

# Compact storage
oacp compact

# Rebuild indexes
oacp reindex

# Verify data integrity
oacp verify

# Repair data issues
oacp repair --auto-fix
```

## Global Options

### Common Flags

```bash
# Verbose output
oacp logs --verbose

# Quiet output
oacp stats --quiet

# Output format
oacp stats --format json|yaml|table

# Configuration file
oacp --config ./custom-config.yaml logs

# Storage override
oacp --storage sqlite:///temp.db stats

# Log level
oacp --log-level DEBUG monitor
```

### Environment Variables

```bash
# Override default config
export OACP_CONFIG_FILE=./custom-config.yaml

# Override storage
export OACP_STORAGE_URL=postgresql://user:pass@localhost/db

# Set log level
export OACP_LOG_LEVEL=DEBUG

# Disable colors
export OACP_NO_COLOR=1
```

## Configuration Files

### CLI Configuration

Create `~/.oacp/config.yaml`:

```yaml
# Default CLI settings
default:
  storage_type: sqlite
  storage_url: sqlite:///~/.oacp/default.db
  log_level: INFO
  output_format: table

# Environment-specific settings
environments:
  development:
    storage_type: file
    storage_path: ./dev_data
    log_level: DEBUG
  
  production:
    storage_type: postgresql
    storage_url: postgresql://user:pass@prod-db/oacp
    log_level: WARNING

# Dashboard settings
web:
  default_port: 8000
  default_host: localhost
  theme: light
  auth_enabled: false
```

### Project Configuration

Create `oacp.yaml` in project root:

```yaml
# Project-specific OACP settings
project:
  name: my-oacp-project
  version: 1.0.0

storage:
  type: sqlite
  url: sqlite:///./project.db

logging:
  level: INFO
  format: structured

monitoring:
  enabled: true
  metrics:
    - voting_patterns
    - performance
    - errors
```

## Scripting and Automation

### Bash Integration

```bash
#!/bin/bash

# Check OACP health
if ! oacp env health --quiet; then
    echo "OACP health check failed"
    exit 1
fi

# Export daily report
oacp export \
    --since "yesterday" \
    --format json \
    --output "reports/daily-$(date +%Y%m%d).json"

# Generate statistics
oacp stats --days 1 --format yaml > "reports/daily-stats-$(date +%Y%m%d).yaml"
```

### Python Integration

```python
import subprocess
import json

def get_oacp_stats():
    """Get OACP statistics via CLI."""
    result = subprocess.run(
        ["oacp", "stats", "--format", "json"],
        capture_output=True,
        text=True
    )
    return json.loads(result.stdout)

def monitor_oacp():
    """Monitor OACP in real-time."""
    process = subprocess.Popen(
        ["oacp", "monitor", "--format", "json"],
        stdout=subprocess.PIPE,
        text=True
    )
    
    for line in process.stdout:
        data = json.loads(line)
        print(f"Event: {data['event_type']} at {data['timestamp']}")
```

## Examples and Use Cases

### Daily Operations

```bash
# Morning health check
oacp env health && oacp stats --days 1

# Check for issues
oacp logs --level ERROR --since "yesterday"

# Monitor specific workflow
oacp monitor --role synthesizer

# End of day export
oacp export --since "today" --output daily-backup.json
```

### Debugging Workflow

```bash
# Find failed runs
oacp logs --level ERROR --event-type DecisionFinalized

# Debug specific failure
oacp debug run 01K2YQ0W5Z

# Analyze voting patterns
oacp votes analyze --days 7

# Check system performance
oacp performance bottlenecks
```

### Production Monitoring

```bash
# Start monitoring dashboard
oacp web start --daemon --port 8080

# Set up alerting (example with external tools)
oacp stats --format json | jq '.error_rate' | \
    awk '$1 > 0.05 { print "High error rate: " $1 }'

# Regular health checks
oacp env health || echo "OACP health check failed" | mail admin@company.com
```

### Data Analysis

```bash
# Export data for analysis
oacp export --days 30 --format csv --output monthly-data.csv

# Generate comprehensive report
oacp stats --detailed --days 30 --format yaml > monthly-report.yaml

# Analyze voting trends
oacp votes trends --days 90 --format json > voting-trends.json
```

## Troubleshooting

### Common Issues

#### Command Not Found

```bash
# Check installation
pip list | grep OACP

# Reinstall if needed
pip install --force-reinstall OACP

# Check PATH
echo $PATH
```

#### Permission Errors

```bash
# Check file permissions
ls -la ~/.oacp/

# Fix permissions
chmod 755 ~/.oacp/
chmod 644 ~/.oacp/config.yaml
```

#### Configuration Issues

```bash
# Validate configuration
oacp config validate

# Reset to defaults
oacp env reset

# Test with minimal config
oacp --storage sqlite:///:memory: stats
```

#### Storage Issues

```bash
# Test storage connection
oacp env test

# Check storage health
oacp debug storage

# Repair if needed
oacp repair --auto-fix
```

### Getting Help

```bash
# General help
oacp --help

# Command-specific help
oacp logs --help

# Show version and debug info
oacp --version --debug

# List all available commands
oacp --list-commands
```
