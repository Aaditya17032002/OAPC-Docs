# OACP CLI Commands Reference

The OACP Command Line Interface provides comprehensive tools for managing environments, monitoring workflows, and interacting with OACP systems. This page documents all available commands and their usage.

## Installation & Setup

### Check CLI Installation
```bash
# Verify OACP CLI is available
oacp --help

# Check version
oacp --version
```

## Environment Management Commands

### `oacp env setup`
Interactive environment setup for OACP projects.

```bash
# Basic interactive setup
oacp env setup

# Global configuration setup
oacp env setup --global

# Force overwrite existing configuration
oacp env setup --force

# Custom storage path
oacp env setup --storage file://custom/path
```

**Options:**
- `--global` - Setup global OACP environment configuration
- `--storage PATH` - Custom storage path for logs and data
- `--force` - Overwrite existing configuration without prompting

**Example:**
```bash
oacp env setup --global --storage postgresql://user:pass@localhost/oacp
```

### `oacp env status`
Display current environment status and configuration.

```bash
# Show environment status
oacp env status
```

**Shows:**
- OACP installation status and version
- Environment variables status
- Configuration file locations
- API key status (masked for security)
- Active configuration settings

### `oacp env init`
Initialize new OACP projects from templates.

```bash
# Interactive project creation
oacp env init

# Create project with specific name
oacp env init --name my-project

# Use specific template
oacp env init --name research-ai --template research

# Available templates
oacp env init --template basic      # Basic OACP project
oacp env init --template research   # Research team workflow
oacp env init --template multi-agent # Multi-agent system
```

**Options:**
- `--name NAME` - Project name (directory will be created)
- `--template TYPE` - Project template (basic, research, multi-agent)

## Monitoring & Analysis Commands

### `oacp list`
List recent OACP workflow runs.

```bash
# List last 10 runs
oacp list

# List more runs
oacp list --limit 25

# Filter by status
oacp list --status completed
oacp list --status failed
oacp list --status running
```

**Options:**
- `--limit, -l NUMBER` - Number of runs to display (default: 10)
- `--status STATUS` - Filter by run status (completed, failed, running, cancelled)

**Output:**
```
Run ID                     Status      Last Modified        Size      Events  Nodes
01K2YT33MGV09DJPQCPN5FE8FE completed   2024-01-15 10:30:00  12.4KB    45      3
01K2YT2VPBV7X9H7AHWA7R6CPM running     2024-01-15 10:25:00  8.1KB     28      2
```

### `oacp stats`
Display statistics and metrics for OACP runs.

```bash
# Show stats for specific run
oacp stats --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Global stats for last 7 days (default)
oacp stats

# Global stats for custom time period
oacp stats --days 30
```

**Options:**
- `--run-id ID` - Show detailed stats for specific run
- `--days NUMBER` - Show global stats for last N days (default: 7)

**Output includes:**
- Total events and unique nodes
- Voting statistics (total votes, consensus rate)
- Conflict and retry counts
- Duration and performance metrics
- Event type breakdown

### `oacp config`
Display current OACP configuration.

```bash
# Show current configuration
oacp config
```

**Shows:**
- Storage configuration
- Logging settings
- Adaptive prompting settings
- Environment variable sources
- Sensitive values are masked for security

## Log Management Commands

### `oacp logs tail`
Stream logs for specific OACP runs.

```bash
# Tail logs for specific run
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Follow logs in real-time
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --follow

# Show more lines
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --lines 100

# Filter by event type
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --type VoteCast
```

**Options:**
- `--run-id ID` - Run ID to tail (required)
- `--follow, -f` - Follow log output in real-time
- `--lines, -n NUMBER` - Number of lines to show (default: 50)
- `--type TYPE` - Filter by event type (VoteCast, NodeStart, etc.)

### `oacp logs timeline`
Show timeline view of events for a run.

```bash
# Show event timeline
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Output as JSON
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE --format json

# Filter by event type
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE --type DecisionFinalized
```

**Options:**
- `--run-id ID` - Run ID to show timeline for (required)
- `--format FORMAT` - Output format (table, json)
- `--type TYPE` - Filter by event type

## Web Dashboard Commands

### `oacp serve`
Start the OACP web dashboard and API server.

```bash
# Start on default host and port (127.0.0.1:8000)
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode with auto-reload
oacp serve --reload

# Production deployment
oacp serve --host 0.0.0.0 --port 80
```

**Options:**
- `--host HOST` - Host to bind to (default: 127.0.0.1)
- `--port PORT` - Port to bind to (default: 8000)
- `--reload` - Enable auto-reload for development

**Access Points:**
- **Dashboard**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **WebSocket**: ws://localhost:8000/ws

## Advanced Commands

### `oacp replay`
Replay OACP runs for debugging and analysis.

```bash
# Show replay plan for a run
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Dry run (show what would be replayed)
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --dry-run

# Start replay from specific event
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --start-from 01K2YT34ABC123
```

**Options:**
- `--run-id ID` - Run ID to replay (required)
- `--dry-run` - Show replay plan without executing
- `--start-from EVENT_ID` - Start replay from specific event ID

**Note:** Actual replay execution is planned for future releases.

## Global Options

All OACP commands support these global options:

```bash
# Show help for any command
oacp COMMAND --help

# Verbose output
oacp COMMAND --verbose

# Quiet mode (minimal output)
oacp COMMAND --quiet
```

## Command Examples by Use Case

### **Project Setup**
```bash
# Create new research project
oacp env init --name ai-research --template research
cd ai-research

# Set up environment
oacp env setup

# Check configuration
oacp config
oacp env status
```

### **Development Workflow**
```bash
# Start development dashboard
oacp serve --reload

# Monitor runs in another terminal
oacp list
oacp stats

# Debug specific run
oacp logs tail --run-id YOUR_RUN_ID --follow
```

### **Production Monitoring**
```bash
# Start production dashboard
oacp serve --host 0.0.0.0 --port 8000

# Monitor system health
oacp stats --days 7
oacp list --status failed

# Analyze problematic runs
oacp logs timeline --run-id FAILED_RUN_ID --format json
```

### **Debugging & Analysis**
```bash
# Find recent failed runs
oacp list --status failed --limit 5

# Analyze specific failure
oacp stats --run-id FAILED_RUN_ID
oacp logs tail --run-id FAILED_RUN_ID --lines 200

# Show event timeline
oacp logs timeline --run-id FAILED_RUN_ID --type VoteCast
```

## Environment Variables

OACP CLI respects these environment variables:

```bash
# Core configuration
OACP_STORAGE_URI=file://logs
OACP_LOG_LEVEL=INFO
OACP_ENABLE_ADAPTIVE_PROMPTING=true

# Web dashboard
OACP_WEB_HOST=127.0.0.1
OACP_WEB_PORT=8000

# Database (if using PostgreSQL)
OACP_DB_URL=postgresql://user:pass@localhost/oacp

# API keys
OPENAI_API_KEY=your_key
GOOGLE_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```

## Configuration Files

### Global Configuration
- **Linux/Mac**: `~/.config/oacp/config.json`
- **Windows**: `%APPDATA%\oacp\config.json`

### Project Configuration
- **Local**: `.oacp/config.json` (in project directory)
- **Environment**: `.env` file (in project directory)

## Exit Codes

OACP CLI commands use standard exit codes:

- **0** - Success
- **1** - General error
- **2** - Misuse of shell command
- **126** - Command invoked cannot execute
- **127** - Command not found
- **130** - Script terminated by Control-C

## Troubleshooting

### Command Not Found
```bash
# Verify installation
pip list | grep -i oacp

# Reinstall if necessary
pip install --upgrade OACP

# Check PATH
which oacp  # Linux/Mac
where oacp  # Windows
```

### Permission Errors
```bash
# Use user installation
pip install --user OACP

# Fix permissions (Linux/Mac)
sudo chown -R $USER:$USER ~/.local
```

### Storage Errors
```bash
# Check storage configuration
oacp config

# Verify storage directory exists
ls -la logs/  # Linux/Mac
dir logs\     # Windows

# Reset configuration
oacp env setup --force
```

### Web Dashboard Issues
```bash
# Check if port is in use
lsof -i :8000  # Linux/Mac
netstat -ano | findstr :8000  # Windows

# Use different port
oacp serve --port 8001

# Check web dependencies
pip install OACP[web]
```

## Getting Help

### Built-in Help
```bash
# General help
oacp --help

# Command-specific help
oacp env --help
oacp logs --help
oacp serve --help
```

### Online Resources
- **Documentation**: Complete guides at `/docs/`
- **Examples**: Practical examples at `/docs/examples/`
- **GitHub Issues**: Report bugs and get help
- **Discussions**: Ask questions in GitHub Discussions

### Support Channels
- **GitHub Repository**: https://github.com/Aaditya17032002/OACP
- **Issue Tracker**: Report bugs and request features
- **Discussions**: Community support and questions

## Advanced Usage

### Scripting with OACP CLI
```bash
#!/bin/bash
# Monitor OACP system health

# Check for failed runs
FAILED_RUNS=$(oacp list --status failed --limit 1 | grep -c failed)

if [ "$FAILED_RUNS" -gt 0 ]; then
    echo "Alert: Failed OACP runs detected"
    oacp list --status failed --limit 5
    exit 1
fi

echo "OACP system healthy"
```

### Integration with CI/CD
```yaml
# GitHub Actions example
- name: Check OACP Health
  run: |
    oacp config
    oacp stats --days 1
    oacp list --status failed --limit 1
```

### Monitoring Scripts
```python
# Python monitoring script
import subprocess
import json

def get_oacp_stats():
    result = subprocess.run(['oacp', 'stats', '--days', '1'], 
                          capture_output=True, text=True)
    return json.loads(result.stdout)

stats = get_oacp_stats()
if stats['failed_runs'] > 0:
    print("Alert: OACP failures detected")
```

The OACP CLI provides comprehensive tools for managing, monitoring, and debugging your multi-agent AI workflows. Use these commands to maintain visibility and control over your OACP deployments.
