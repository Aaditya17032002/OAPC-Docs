import { DocsContent } from "@/components/docs-content"

const cliContent = `
# OACP CLI Commands

The OACP Command Line Interface provides comprehensive tools for managing environments, monitoring workflows, and interacting with OACP systems.

## Quick Reference

### Environment Management
\`\`\`bash
# Setup environment
oacp env setup --global

# Initialize new project  
oacp env init my-project

# Check status
oacp env status
\`\`\`

### Monitoring & Analysis
\`\`\`bash
# List recent runs
oacp list

# Show statistics
oacp stats

# Show configuration
oacp config
\`\`\`

### Log Management
\`\`\`bash
# Tail logs for specific run
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Show event timeline
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE
\`\`\`

### Web Dashboard
\`\`\`bash
# Start dashboard
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode
oacp serve --reload
\`\`\`

## Environment Commands

### \`oacp env setup\`
Interactive environment setup for OACP projects.

**Options:**
- \`--global\` - Setup global OACP environment configuration
- \`--storage PATH\` - Custom storage path for logs and data
- \`--force\` - Overwrite existing configuration without prompting

**Examples:**
\`\`\`bash
# Basic interactive setup
oacp env setup

# Global configuration setup
oacp env setup --global

# Custom storage path
oacp env setup --storage postgresql://user:pass@localhost/oacp
\`\`\`

### \`oacp env status\`
Display current environment status and configuration.

Shows:
- OACP installation status and version
- Environment variables status  
- Configuration file locations
- API key status (masked for security)
- Active configuration settings

### \`oacp env init\`
Initialize new OACP projects from templates.

**Options:**
- \`--name NAME\` - Project name (directory will be created)
- \`--template TYPE\` - Project template (basic, research, multi-agent)

**Examples:**
\`\`\`bash
# Interactive project creation
oacp env init

# Create research project
oacp env init --name ai-research --template research
\`\`\`

## Monitoring Commands

### \`oacp list\`
List recent OACP workflow runs.

**Options:**
- \`--limit, -l NUMBER\` - Number of runs to display (default: 10)
- \`--status STATUS\` - Filter by run status (completed, failed, running, cancelled)

**Examples:**
\`\`\`bash
# List last 10 runs
oacp list

# Filter by status
oacp list --status failed
\`\`\`

### \`oacp stats\`
Display statistics and metrics for OACP runs.

**Options:**
- \`--run-id ID\` - Show detailed stats for specific run
- \`--days NUMBER\` - Show global stats for last N days (default: 7)

**Examples:**
\`\`\`bash
# Global stats for last 7 days
oacp stats

# Stats for specific run
oacp stats --run-id 01K2YT33MGV09DJPQCPN5FE8FE
\`\`\`

### \`oacp config\`
Display current OACP configuration.

Shows storage configuration, logging settings, adaptive prompting settings, and environment variable sources. Sensitive values are masked for security.

## Log Management

### \`oacp logs tail\`
Stream logs for specific OACP runs.

**Options:**
- \`--run-id ID\` - Run ID to tail (required)
- \`--follow, -f\` - Follow log output in real-time
- \`--lines, -n NUMBER\` - Number of lines to show (default: 50)
- \`--type TYPE\` - Filter by event type (VoteCast, NodeStart, etc.)

**Examples:**
\`\`\`bash
# Tail logs for specific run
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Follow logs in real-time
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --follow

# Filter by event type
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --type VoteCast
\`\`\`

### \`oacp logs timeline\`
Show timeline view of events for a run.

**Options:**
- \`--run-id ID\` - Run ID to show timeline for (required)
- \`--format FORMAT\` - Output format (table, json)
- \`--type TYPE\` - Filter by event type

**Examples:**
\`\`\`bash
# Show event timeline
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Output as JSON
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE --format json
\`\`\`

## Web Dashboard

### \`oacp serve\`
Start the OACP web dashboard and API server.

**Options:**
- \`--host HOST\` - Host to bind to (default: 127.0.0.1)
- \`--port PORT\` - Port to bind to (default: 8000)
- \`--reload\` - Enable auto-reload for development

**Access Points:**
- **Dashboard**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **WebSocket**: ws://localhost:8000/ws

**Examples:**
\`\`\`bash
# Start on default host and port
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode with auto-reload
oacp serve --reload
\`\`\`

## Advanced Commands

### \`oacp replay\`
Replay OACP runs for debugging and analysis.

**Options:**
- \`--run-id ID\` - Run ID to replay (required)
- \`--dry-run\` - Show replay plan without executing
- \`--start-from EVENT_ID\` - Start replay from specific event ID

**Examples:**
\`\`\`bash
# Show replay plan for a run
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --dry-run

# Start replay from specific event
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --start-from 01K2YT34ABC123
\`\`\`

## Global Options

All OACP commands support these global options:

\`\`\`bash
# Show help for any command
oacp COMMAND --help

# Verbose output
oacp COMMAND --verbose

# Quiet mode (minimal output)
oacp COMMAND --quiet
\`\`\`

## Environment Variables

OACP CLI respects these environment variables:

\`\`\`bash
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
\`\`\`

## Configuration Files

### Global Configuration
- **Linux/Mac**: \`~/.config/oacp/config.json\`
- **Windows**: \`%APPDATA%\\oacp\\config.json\`

### Project Configuration
- **Local**: \`.oacp/config.json\` (in project directory)
- **Environment**: \`.env\` file (in project directory)

## Common Workflows

### Project Setup
\`\`\`bash
# Create new research project
oacp env init --name ai-research --template research
cd ai-research

# Set up environment
oacp env setup

# Check configuration
oacp config
oacp env status
\`\`\`

### Development Workflow
\`\`\`bash
# Start development dashboard
oacp serve --reload

# Monitor runs in another terminal
oacp list
oacp stats

# Debug specific run
oacp logs tail --run-id YOUR_RUN_ID --follow
\`\`\`

### Production Monitoring
\`\`\`bash
# Start production dashboard
oacp serve --host 0.0.0.0 --port 8000

# Monitor system health
oacp stats --days 7
oacp list --status failed

# Analyze problematic runs
oacp logs timeline --run-id FAILED_RUN_ID --format json
\`\`\`

## Troubleshooting

### Command Not Found
\`\`\`bash
# Verify installation
pip list | grep -i oacp

# Reinstall if necessary
pip install --upgrade OACP
\`\`\`

### Storage Errors
\`\`\`bash
# Check storage configuration
oacp config

# Reset configuration
oacp env setup --force
\`\`\`

### Web Dashboard Issues
\`\`\`bash
# Check if port is in use
lsof -i :8000  # Linux/Mac
netstat -ano | findstr :8000  # Windows

# Use different port
oacp serve --port 8001
\`\`\`

## Getting Help

\`\`\`bash
# General help
oacp --help

# Command-specific help
oacp env --help
oacp logs --help
oacp serve --help
\`\`\`

For more detailed information, see the [complete CLI reference](/docs/cli/commands.md).
`

export default function CliPage() {
  return <DocsContent content={cliContent} />
}
