# Web Dashboard

OACP provides a comprehensive web dashboard for real-time monitoring, analytics, and management of your governance workflows.

## Overview

The OACP web dashboard offers:
- **Real-time Monitoring**: Live view of governance activities
- **Analytics & Insights**: Comprehensive analytics and reporting
- **Workflow Management**: Manage and monitor workflows
- **Configuration**: Web-based configuration management
- **Audit Trail Viewer**: Browse and search audit trails

## Getting Started

### Installation

Install OACP with web dashboard support:

```bash
pip install OACP[web]
```

### Starting the Dashboard

```bash
# Start dashboard on default port (8000)
oacp web start

# Start on custom port
oacp web start --port 8080

# Start with custom host
oacp web start --host 0.0.0.0 --port 8080

# Start in background
oacp web start --daemon
```

### Accessing the Dashboard

Open your browser and navigate to:
- Local: http://localhost:8000
- Custom: http://your-host:your-port

## Dashboard Features

### Real-time Overview

The main dashboard provides:

```
┌─────────────────────────────────────────────────────────────┐
│ OACP Dashboard - Real-time Overview                         │
├─────────────────────────────────────────────────────────────┤
│ Active Runs: 5        │ Success Rate: 94.2%                │
│ Votes Cast: 127       │ Avg Decision Time: 12.3s           │
│ Conflicts: 3          │ Timeout Rate: 2.1%                 │
└─────────────────────────────────────────────────────────────┘

Recent Activity:
🗳️  peer_reviewer voted APPROVE on run_abc123
✅  Decision finalized: synthesis_def456 APPROVED
⚠️  Conflict raised: researcher_ghi789 (timeout)
🔄  Adaptive prompt applied: content_gen_jkl012
```

### Workflow Monitoring

Monitor active and completed workflows:

- **Active Workflows**: Currently running governance processes
- **Workflow History**: Historical workflow execution data
- **Performance Metrics**: Execution times, success rates, bottlenecks
- **Resource Usage**: System resource utilization

### Voting Analytics

Comprehensive voting analytics:

- **Voting Patterns**: Approval rates by voter and role
- **Consensus Analysis**: Success rates by voting strategy
- **Voter Performance**: Individual voter statistics
- **Rejection Analysis**: Common rejection reasons and trends

### Audit Trail Browser

Interactive audit trail exploration:

- **Event Timeline**: Chronological view of all events
- **Advanced Filtering**: Filter by role, event type, time range
- **Search Functionality**: Full-text search across audit trails
- **Export Options**: Export filtered data in various formats

## Configuration

### Environment Variables

```bash
# Web server configuration
OACP_WEB_HOST=0.0.0.0
OACP_WEB_PORT=8000
OACP_WEB_RELOAD=false

# Authentication
OACP_WEB_AUTH_ENABLED=true
OACP_WEB_AUTH_SECRET=your-secret-key
OACP_WEB_SESSION_TIMEOUT=3600

# Dashboard features
OACP_WEB_ENABLE_REALTIME=true
OACP_WEB_ENABLE_ANALYTICS=true
OACP_WEB_ENABLE_CONFIG=true
```

### Programmatic Configuration

```python
from oacp.web import configure_dashboard

configure_dashboard(
    host="0.0.0.0",
    port=8080,
    auth_enabled=True,
    auth_secret="secure-secret-key",
    enable_realtime=True,
    enable_analytics=True,
    cors_origins=["https://your-domain.com"]
)
```

## Authentication & Security

### Basic Authentication

```python
from oacp.web import DashboardAuth

auth = DashboardAuth()

# Configure basic authentication
await auth.configure_basic_auth(
    username="admin",
    password="secure-password",
    session_timeout=3600
)
```

### JWT Authentication

```python
# Configure JWT authentication
await auth.configure_jwt_auth(
    secret_key="your-jwt-secret",
    algorithm="HS256",
    token_expiry=3600
)
```

### Role-Based Access

```python
from oacp.web import RoleBasedAccess

rbac = RoleBasedAccess()

# Configure roles and permissions
await rbac.configure_roles({
    "admin": {
        "permissions": ["read", "write", "delete", "configure"],
        "dashboard_sections": ["all"]
    },
    "monitor": {
        "permissions": ["read"],
        "dashboard_sections": ["monitoring", "analytics"]
    },
    "auditor": {
        "permissions": ["read", "export"],
        "dashboard_sections": ["audit", "analytics"]
    }
})
```

## API Endpoints

The dashboard exposes REST API endpoints:

### System Information

```bash
# Get system status
GET /api/status

# Get system statistics
GET /api/stats

# Get configuration
GET /api/config
```

### Workflow Management

```bash
# List active workflows
GET /api/workflows/active

# Get workflow details
GET /api/workflows/{workflow_id}

# Get workflow history
GET /api/workflows/history?limit=50&offset=0
```

### Voting and Governance

```bash
# Get voting statistics
GET /api/voting/stats

# Get recent votes
GET /api/voting/recent?limit=20

# Get voter performance
GET /api/voting/voters/{voter_id}/stats
```

### Audit Trail

```bash
# Get events
GET /api/events?limit=100&offset=0

# Filter events
GET /api/events?event_type=VoteCast&role=reviewer&since=2024-01-01

# Search events
GET /api/events/search?q=consensus+failed

# Export events
GET /api/events/export?format=json&since=2024-01-01
```

## WebSocket Streaming

Real-time updates via WebSocket:

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:8000/ws');

// Handle real-time events
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    
    switch(data.type) {
        case 'vote_cast':
            console.log(`Vote: ${data.voter_id} -> ${data.decision}`);
            break;
        case 'decision_finalized':
            console.log(`Decision: ${data.approved ? 'Approved' : 'Rejected'}`);
            break;
        case 'conflict_raised':
            console.log(`Conflict: ${data.reason_summary}`);
            break;
    }
};
```

## Custom Dashboard Components

### Creating Custom Widgets

```python
from oacp.web.components import DashboardWidget

class CustomMetricsWidget(DashboardWidget):
    name = "custom_metrics"
    title = "Custom Metrics"
    
    async def get_data(self):
        # Fetch your custom metrics
        return {
            "metric1": await self.calculate_metric1(),
            "metric2": await self.calculate_metric2(),
            "chart_data": await self.get_chart_data()
        }
    
    def render_template(self):
        return "custom_metrics.html"

# Register custom widget
from oacp.web import register_widget
register_widget(CustomMetricsWidget())
```

### Custom Dashboard Pages

```python
from oacp.web import DashboardPage
from fastapi import Request

class CustomAnalyticsPage(DashboardPage):
    path = "/custom-analytics"
    name = "Custom Analytics"
    
    async def render(self, request: Request):
        data = await self.get_analytics_data()
        return self.templates.TemplateResponse(
            "custom_analytics.html",
            {"request": request, "data": data}
        )

# Register custom page
from oacp.web import register_page
register_page(CustomAnalyticsPage())
```

## Deployment

### Development Deployment

```bash
# Start development server with auto-reload
oacp web start --reload --debug

# Start with custom configuration
oacp web start --config ./dashboard-config.yaml
```

### Production Deployment

#### Using Uvicorn

```bash
# Install uvicorn
pip install uvicorn[standard]

# Start production server
uvicorn oacp.web.app:app --host 0.0.0.0 --port 8000 --workers 4
```

#### Using Gunicorn

```bash
# Install gunicorn
pip install gunicorn uvicorn[standard]

# Start with gunicorn
gunicorn oacp.web.app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

#### Docker Deployment

```dockerfile
FROM python:3.11-slim

# Install OACP with web support
RUN pip install OACP[web]

# Copy configuration
COPY dashboard-config.yaml /app/config.yaml

# Expose port
EXPOSE 8000

# Start dashboard
CMD ["oacp", "web", "start", "--host", "0.0.0.0", "--port", "8000", "--config", "/app/config.yaml"]
```

#### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oacp-dashboard
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oacp-dashboard
  template:
    metadata:
      labels:
        app: oacp-dashboard
    spec:
      containers:
      - name: dashboard
        image: your-registry/oacp-dashboard:latest
        ports:
        - containerPort: 8000
        env:
        - name: OACP_STORAGE_URL
          value: "postgresql://user:pass@postgres:5432/oacp_db"
        - name: OACP_WEB_AUTH_ENABLED
          value: "true"
        - name: OACP_WEB_AUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: oacp-secrets
              key: auth-secret
---
apiVersion: v1
kind: Service
metadata:
  name: oacp-dashboard-service
spec:
  selector:
    app: oacp-dashboard
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer
```

## Monitoring and Alerting

### Dashboard Health Monitoring

```python
from oacp.web.monitoring import DashboardHealthCheck

health_check = DashboardHealthCheck()

# Configure health checks
await health_check.configure({
    "check_interval": 30,  # seconds
    "checks": [
        "database_connection",
        "storage_health", 
        "memory_usage",
        "response_time"
    ]
})

# Get health status
health_status = await health_check.get_status()
print(f"Dashboard healthy: {health_status.healthy}")
```

### Performance Monitoring

```python
from oacp.web.metrics import DashboardMetrics

metrics = DashboardMetrics()

# Get performance metrics
perf_metrics = await metrics.get_performance_metrics()
print(f"Average response time: {perf_metrics.avg_response_time}ms")
print(f"Active connections: {perf_metrics.active_connections}")
print(f"Memory usage: {perf_metrics.memory_usage_mb}MB")
```

## Customization

### Theming

```css
/* Custom CSS for dashboard theming */
:root {
    --primary-color: #your-brand-color;
    --secondary-color: #your-secondary-color;
    --background-color: #your-background;
    --text-color: #your-text-color;
}

.dashboard-header {
    background-color: var(--primary-color);
}

.widget {
    border: 1px solid var(--secondary-color);
    background-color: var(--background-color);
}
```

### Custom Branding

```python
from oacp.web import configure_branding

configure_branding(
    logo_url="/static/your-logo.png",
    company_name="Your Company",
    primary_color="#your-color",
    favicon_url="/static/favicon.ico"
)
```

## Troubleshooting

### Common Issues

#### Dashboard Won't Start

```bash
# Check port availability
netstat -an | grep :8000

# Check configuration
oacp config validate

# Start with debug mode
oacp web start --debug --log-level DEBUG
```

#### Authentication Issues

```bash
# Reset authentication
oacp web reset-auth

# Check authentication configuration
oacp web config show --section auth
```

#### Performance Issues

```bash
# Check dashboard performance
oacp web performance-check

# Monitor resource usage
oacp web monitor --metrics
```

### Debugging

```python
from oacp.web.debug import DashboardDebugger

debugger = DashboardDebugger()

# Enable debug mode
await debugger.enable_debug_mode()

# Get debug information
debug_info = await debugger.get_debug_info()
print(f"Active sessions: {debug_info.active_sessions}")
print(f"WebSocket connections: {debug_info.websocket_connections}")
print(f"Recent errors: {debug_info.recent_errors}")
```

## Best Practices

### Security

1. **Enable Authentication**: Always enable authentication in production
2. **Use HTTPS**: Deploy with SSL/TLS certificates
3. **Secure Secrets**: Use environment variables for secrets
4. **Regular Updates**: Keep OACP and dependencies updated
5. **Access Control**: Implement role-based access control

### Performance

1. **Resource Monitoring**: Monitor CPU, memory, and network usage
2. **Database Optimization**: Optimize database queries and indexes
3. **Caching**: Implement appropriate caching strategies
4. **Load Balancing**: Use load balancers for high availability
5. **Connection Pooling**: Configure database connection pooling

### Deployment

1. **Container Deployment**: Use containers for consistent deployments
2. **Health Checks**: Implement comprehensive health checks
3. **Logging**: Configure structured logging
4. **Monitoring**: Set up monitoring and alerting
5. **Backup**: Regular backup of dashboard configuration

### User Experience

1. **Responsive Design**: Ensure mobile-friendly interface
2. **Fast Loading**: Optimize for fast page loading
3. **Clear Navigation**: Provide intuitive navigation
4. **Error Handling**: Implement user-friendly error messages
5. **Documentation**: Provide user documentation and help