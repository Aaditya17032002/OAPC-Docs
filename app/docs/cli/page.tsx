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

import { Settings, BarChart3, FileText, Globe, Zap, Terminal, HelpCircle } from "lucide-react"

export default function CliPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-4 gradient-text">OACP CLI Commands</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The OACP Command Line Interface provides comprehensive tools for managing environments, monitoring workflows, and interacting with OACP systems.
        </p>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground">
            📖 <strong>Complete Reference:</strong> For detailed documentation of all CLI commands, see the{' '}
            <a href="/docs/cli/commands" className="text-primary hover:underline font-medium">
              comprehensive CLI commands reference
            </a>{' '}
            or access the{' '}
            <a href="/api/docs/cli/commands" className="text-primary hover:underline font-mono text-xs">
              raw markdown file
            </a>.
          </p>
        </div>
      </div>

      {/* Quick Reference */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Quick Reference</h2>
        
        <div className="grid gap-6 mb-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Environment Management</h3>
            <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
              <code>{`# Setup environment
oacp env setup --global

# Initialize new project  
oacp env init my-project

# Check status
oacp env status`}</code>
            </pre>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Monitoring & Analysis</h3>
            <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
              <code>{`# List recent runs
oacp list

# Show statistics
oacp stats

# Show configuration
oacp config`}</code>
            </pre>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Log Management</h3>
            <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
              <code>{`# Tail logs for specific run
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Show event timeline
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE`}</code>
            </pre>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Web Dashboard</h3>
            <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
              <code>{`# Start dashboard
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode
oacp serve --reload`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
        <div className="grid gap-4">
          <a href="#environment-commands" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
            <Settings className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Environment Commands</h3>
              <p className="text-sm text-muted-foreground">Setup, initialization, and environment management</p>
            </div>
          </a>
          <a href="#monitoring-commands" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
            <BarChart3 className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Monitoring Commands</h3>
              <p className="text-sm text-muted-foreground">System monitoring, statistics, and configuration</p>
            </div>
          </a>
          <a href="#log-management" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Log Management</h3>
              <p className="text-sm text-muted-foreground">Log streaming, analysis, and timeline views</p>
            </div>
          </a>
          <a href="#web-dashboard" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Web Dashboard</h3>
              <p className="text-sm text-muted-foreground">Start and manage the web interface</p>
            </div>
          </a>
          <a href="#advanced-commands" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
            <Zap className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-primary">Advanced Commands</h3>
              <p className="text-sm text-muted-foreground">Replay, debugging, and advanced features</p>
            </div>
          </a>
        </div>
      </section>

      {/* Environment Commands */}
      <section id="environment-commands" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Environment Commands</h2>
        </div>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp env setup</h3>
            <p className="text-muted-foreground mb-4">Interactive environment setup for OACP projects.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--global</code> - Setup global OACP environment configuration</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--storage PATH</code> - Custom storage path for logs and data</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--force</code> - Overwrite existing configuration without prompting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# Basic interactive setup
oacp env setup

# Global configuration setup
oacp env setup --global

# Custom storage path
oacp env setup --storage postgresql://user:pass@localhost/oacp`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp env status</h3>
            <p className="text-muted-foreground mb-4">Display current environment status and configuration.</p>
            <div>
              <h4 className="font-medium mb-2">Shows:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>OACP installation status and version</li>
                <li>Environment variables status</li>
                <li>Configuration file locations</li>
                <li>API key status (masked for security)</li>
                <li>Active configuration settings</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp env init</h3>
            <p className="text-muted-foreground mb-4">Initialize new OACP projects from templates.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--name NAME</code> - Project name (directory will be created)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--template TYPE</code> - Project template (basic, research, multi-agent)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# Interactive project creation
oacp env init

# Create research project
oacp env init --name ai-research --template research`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Commands */}
      <section id="monitoring-commands" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Monitoring Commands</h2>
        </div>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp list</h3>
            <p className="text-muted-foreground mb-4">List recent OACP workflow runs.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--limit, -l NUMBER</code> - Number of runs to display (default: 10)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--status STATUS</code> - Filter by run status (completed, failed, running, cancelled)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# List last 10 runs
oacp list

# Filter by status
oacp list --status failed`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp stats</h3>
            <p className="text-muted-foreground mb-4">Display statistics and metrics for OACP runs.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--run-id ID</code> - Show detailed stats for specific run</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--days NUMBER</code> - Show global stats for last N days (default: 7)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# Global stats for last 7 days
oacp stats

# Stats for specific run
oacp stats --run-id 01K2YT33MGV09DJPQCPN5FE8FE`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp config</h3>
            <p className="text-muted-foreground">Display current OACP configuration. Shows storage configuration, logging settings, adaptive prompting settings, and environment variable sources. Sensitive values are masked for security.</p>
          </div>
        </div>
      </section>

      {/* Log Management */}
      <section id="log-management" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Log Management</h2>
        </div>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp logs tail</h3>
            <p className="text-muted-foreground mb-4">Stream logs for specific OACP runs.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--run-id ID</code> - Run ID to tail (required)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--follow, -f</code> - Follow log output in real-time</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--lines, -n NUMBER</code> - Number of lines to show (default: 50)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--type TYPE</code> - Filter by event type (VoteCast, NodeStart, etc.)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# Tail logs for specific run
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Follow logs in real-time
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --follow

# Filter by event type
oacp logs tail --run-id 01K2YT33MGV09DJPQCPN5FE8FE --type VoteCast`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">oacp logs timeline</h3>
            <p className="text-muted-foreground mb-4">Show timeline view of events for a run.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li><code className="bg-muted px-2 py-1 rounded">--run-id ID</code> - Run ID to show timeline for (required)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--format FORMAT</code> - Output format (table, json)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">--type TYPE</code> - Filter by event type</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples:</h4>
                <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                  <code>{`# Show event timeline
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE

# Output as JSON
oacp logs timeline --run-id 01K2YT33MGV09DJPQCPN5FE8FE --format json`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Dashboard */}
      <section id="web-dashboard" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Web Dashboard</h2>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">oacp serve</h3>
          <p className="text-muted-foreground mb-4">Start the OACP web dashboard and API server.</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Options:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li><code className="bg-muted px-2 py-1 rounded">--host HOST</code> - Host to bind to (default: 127.0.0.1)</li>
                <li><code className="bg-muted px-2 py-1 rounded">--port PORT</code> - Port to bind to (default: 8000)</li>
                <li><code className="bg-muted px-2 py-1 rounded">--reload</code> - Enable auto-reload for development</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Access Points:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li><strong>Dashboard:</strong> http://localhost:8000</li>
                <li><strong>API Docs:</strong> http://localhost:8000/docs</li>
                <li><strong>Health Check:</strong> http://localhost:8000/health</li>
                <li><strong>WebSocket:</strong> ws://localhost:8000/ws</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Examples:</h4>
              <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                <code>{`# Start on default host and port
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode with auto-reload
oacp serve --reload`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Commands */}
      <section id="advanced-commands" className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Advanced Commands</h2>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">oacp replay</h3>
          <p className="text-muted-foreground mb-4">Replay OACP runs for debugging and analysis.</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Options:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li><code className="bg-muted px-2 py-1 rounded">--run-id ID</code> - Run ID to replay (required)</li>
                <li><code className="bg-muted px-2 py-1 rounded">--dry-run</code> - Show replay plan without executing</li>
                <li><code className="bg-muted px-2 py-1 rounded">--start-from EVENT_ID</code> - Start replay from specific event ID</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Examples:</h4>
              <pre className="bg-muted/50 rounded p-4 text-sm overflow-x-auto">
                <code>{`# Show replay plan for a run
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --dry-run

# Start replay from specific event
oacp replay --run-id 01K2YT33MGV09DJPQCPN5FE8FE --start-from 01K2YT34ABC123`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Help */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Getting Help</h2>
        </div>
        <div className="bg-muted/50 rounded-lg p-6">
          <pre className="text-sm overflow-x-auto mb-4">
            <code>{`# General help
oacp --help

# Command-specific help
oacp env --help
oacp logs --help
oacp serve --help`}</code>
          </pre>
          <p className="text-muted-foreground">
            For complete documentation, visit our <a href="/docs/cli/commands.md" className="text-primary hover:underline">CLI Reference Guide</a> or check the <a href="https://github.com/Aaditya17032002/OACP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
