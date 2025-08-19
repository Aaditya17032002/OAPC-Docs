# OACP Web Dashboard

The OACP Web Dashboard provides real-time monitoring, analytics, and management capabilities for your multi-agent workflows. Access comprehensive insights into voting patterns, consensus decisions, and system performance through an intuitive web interface.

## Getting Started

### Installation

The web dashboard requires additional dependencies:

```bash
# Install OACP with web support
pip install OACP[web]

# Or install web dependencies separately
pip install fastapi uvicorn
```

### Starting the Dashboard

```bash
# Start on default host and port (localhost:8000)
oacp serve

# Custom host and port
oacp serve --host 0.0.0.0 --port 8080

# Development mode with auto-reload
oacp serve --reload
```

### Accessing the Dashboard

Once started, access the dashboard at:
- **Main Dashboard**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## Dashboard Features

### 🏠 **Main Dashboard**

The main dashboard provides an overview of your OACP system:

#### **Global Statistics**
- **Total Runs**: Number of workflow executions
- **Total Events**: All events across all runs
- **Unique Nodes**: Number of distinct agent nodes
- **Success Rate**: Percentage of successful consensus decisions

#### **Recent Runs**
- Live list of recent workflow executions
- Status indicators (Completed, Running, Failed, Cancelled)
- Event counts and node participation
- Quick access to detailed run information

#### **System Configuration**
- Current OACP configuration settings
- Storage backend information
- Environment variables status
- API key configuration (masked for security)

### 📊 **Run Details**

Click on any run to see detailed information:

#### **Run Overview**
```json
{
  "run_id": "01K2YT33MGV09DJPQCPN5FE8FE",
  "status": "completed",
  "duration": "2.3 seconds",
  "total_events": 45,
  "unique_nodes": 3,
  "consensus_achieved": 12,
  "conflicts_raised": 2,
  "retries": 1
}
```

#### **Event Timeline**
Chronological view of all events in the run:
- **Node Start/End**: Agent execution boundaries
- **Vote Cast**: Individual voting decisions
- **Consensus Reached**: Successful consensus events
- **Conflicts**: Disagreements requiring resolution
- **Retries**: Retry attempts and outcomes

#### **Voting Analysis**
- Voter participation rates
- Approval/rejection ratios
- Consensus strategy effectiveness
- Time to consensus metrics

### 🔍 **Real-time Monitoring**

#### **Live Updates**
The dashboard automatically refreshes every 30 seconds to show:
- New runs as they start
- Status changes for active runs
- Updated statistics and metrics

#### **WebSocket Streaming**
For real-time updates, the dashboard supports WebSocket connections:
- Live event streaming for active runs
- Real-time status updates
- Instant notification of consensus decisions

## API Endpoints

The dashboard is built on a comprehensive REST API:

### **Runs Management**

#### `GET /api/v1/runs`
List recent runs with pagination and filtering.

```bash
# Get latest 10 runs
curl http://localhost:8000/api/v1/runs?limit=10

# Filter by status
curl http://localhost:8000/api/v1/runs?status=completed

# Pagination
curl http://localhost:8000/api/v1/runs?limit=5&offset=10
```

**Response:**
```json
{
  "runs": [
    {
      "run_id": "01K2YT33MGV09DJPQCPN5FE8FE",
      "status": "completed",
      "last_modified": "2024-01-15T10:30:00Z",
      "event_count": 45,
      "node_count": 3,
      "size_bytes": 12480
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

#### `GET /api/v1/runs/{run_id}`
Get detailed information about a specific run.

```bash
curl http://localhost:8000/api/v1/runs/01K2YT33MGV09DJPQCPN5FE8FE
```

#### `GET /api/v1/runs/{run_id}/events`
Get events for a specific run with filtering and pagination.

```bash
# Get all events
curl http://localhost:8000/api/v1/runs/01K2YT33MGV09DJPQCPN5FE8FE/events

# Filter by event type
curl http://localhost:8000/api/v1/runs/01K2YT33MGV09DJPQCPN5FE8FE/events?event_type=VoteCast

# Pagination
curl http://localhost:8000/api/v1/runs/01K2YT33MGV09DJPQCPN5FE8FE/events?limit=20&offset=0
```

### **Statistics & Analytics**

#### `GET /api/v1/stats`
Get global statistics across all runs.

```bash
# Last 7 days (default)
curl http://localhost:8000/api/v1/stats

# Custom time period
curl http://localhost:8000/api/v1/stats?days=30
```

**Response:**
```json
{
  "period": {
    "days": 7,
    "start_date": "2024-01-08T00:00:00Z",
    "end_date": "2024-01-15T00:00:00Z"
  },
  "stats": {
    "total_runs": 42,
    "total_events": 1337,
    "unique_nodes": 15,
    "avg_events_per_run": 31.8,
    "status_breakdown": {
      "completed": 38,
      "failed": 3,
      "running": 1,
      "cancelled": 0
    }
  }
}
```

### **Configuration**

#### `GET /api/v1/config`
Get current OACP configuration (sensitive values redacted).

```bash
curl http://localhost:8000/api/v1/config
```

**Response:**
```json
{
  "config": {
    "storage_uri": "file://logs",
    "log_level": "INFO",
    "enable_adaptive_prompting": true,
    "max_retries": 3,
    "default_timeout": 30,
    "openai_api_key": "********"
  }
}
```

### **Health & Status**

#### `GET /health`
System health check endpoint.

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## WebSocket API

For real-time updates, connect to the WebSocket endpoint:

### **Connection**
```javascript
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onopen = function() {
    console.log('Connected to OACP WebSocket');
};

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
};
```

### **Subscribe to Run Updates**
```javascript
// Subscribe to updates for a specific run
ws.send(JSON.stringify({
    type: "subscribe_run",
    run_id: "01K2YT33MGV09DJPQCPN5FE8FE"
}));
```

### **Message Types**

#### **Event Messages**
```json
{
  "type": "event",
  "run_id": "01K2YT33MGV09DJPQCPN5FE8FE",
  "event": {
    "event_id": "01K2YT34ABC123DEF456",
    "event_type": "VoteCast",
    "timestamp": "2024-01-15T10:30:00Z",
    "voter_id": "expert_reviewer",
    "decision": "APPROVE",
    "reason": "High quality content"
  }
}
```

#### **Status Messages**
```json
{
  "type": "status",
  "message": "Streaming logs for run 01K2YT33MGV09DJPQCPN5FE8FE"
}
```

#### **Error Messages**
```json
{
  "type": "error",
  "message": "Run not found: 01K2YT33MGV09DJPQCPN5FE8FE"
}
```

## Production Deployment

### **Security Considerations**

#### **API Key Protection**
- Sensitive configuration values are automatically redacted
- Environment variables are masked in API responses
- No authentication tokens are exposed in logs

#### **Network Security**
```bash
# Bind to specific interface for security
oacp serve --host 127.0.0.1 --port 8000

# Use reverse proxy for HTTPS
# Configure nginx or Apache to proxy to OACP dashboard
```

### **Performance Optimization**

#### **Database Backend**
For production, use PostgreSQL instead of file storage:

```bash
# Set environment variable
export OACP_STORAGE_URI=postgresql://user:pass@localhost/oacp

# Start dashboard
oacp serve
```

#### **Caching**
The dashboard includes built-in caching for:
- Run statistics (5-minute cache)
- Configuration data (1-hour cache)
- Event summaries (1-minute cache)

### **Monitoring & Alerting**

#### **Health Checks**
```bash
# Automated health monitoring
curl -f http://localhost:8000/health || alert "OACP Dashboard Down"
```

#### **Metrics Integration**
The dashboard exposes metrics compatible with:
- **Prometheus**: Metrics endpoint at `/metrics`
- **Grafana**: Pre-built dashboard templates
- **DataDog**: Custom metrics integration

### **Scaling**

#### **Horizontal Scaling**
```bash
# Run multiple instances behind load balancer
oacp serve --host 0.0.0.0 --port 8000
oacp serve --host 0.0.0.0 --port 8001
oacp serve --host 0.0.0.0 --port 8002
```

#### **Database Connection Pooling**
```python
# Configure in environment
OACP_DB_POOL_SIZE=20
OACP_DB_MAX_OVERFLOW=30
```

## Customization

### **Custom Dashboard Themes**
The dashboard supports custom CSS themes:

```css
/* custom-theme.css */
:root {
  --primary-color: #your-brand-color;
  --background-color: #your-bg-color;
  --text-color: #your-text-color;
}
```

### **Custom Metrics**
Add custom metrics to the dashboard:

```python
from oacp.web import register_custom_metric

def calculate_custom_metric(runs):
    """Calculate your custom business metric."""
    return sum(run.custom_score for run in runs)

register_custom_metric("custom_score", calculate_custom_metric)
```

### **Custom API Endpoints**
Extend the dashboard with custom endpoints:

```python
from oacp.web import app
from fastapi import APIRouter

custom_router = APIRouter()

@custom_router.get("/custom/endpoint")
async def custom_endpoint():
    return {"custom": "data"}

app.include_router(custom_router, prefix="/api/v1")
```

## Troubleshooting

### **Common Issues**

#### **Dashboard Won't Start**
```bash
# Check if web dependencies are installed
pip install OACP[web]

# Check if port is available
netstat -an | grep :8000
```

#### **No Data Showing**
```bash
# Verify storage configuration
oacp config

# Check if runs exist
oacp list

# Verify storage permissions
ls -la logs/
```

#### **WebSocket Connection Fails**
```bash
# Check firewall settings
# Verify WebSocket support in browser
# Check for proxy interference
```

### **Performance Issues**

#### **Slow Dashboard Loading**
- Use database storage instead of file storage
- Reduce the number of runs displayed
- Enable caching in production

#### **High Memory Usage**
- Limit event history retention
- Use pagination for large datasets
- Configure appropriate database connection limits

## Related Documentation

- [REST API Reference](api.md) - Complete API documentation
- [WebSocket API](websockets.md) - Real-time streaming details
- [CLI Commands](../cli/commands.md) - Command-line interface
- [Configuration](../configuration.md) - Environment setup
- [Production Deployment](../examples/production.md) - Deployment guide
