# Audit Trails

OACP provides comprehensive audit trails for all governance activities, ensuring complete transparency and accountability in multi-agent workflows.

## Overview

Audit trails in OACP capture:
- **All Events**: Every action, decision, and vote is recorded
- **Complete Context**: Full context and metadata for each event
- **Immutable Records**: Events cannot be modified after creation
- **Searchable History**: Rich querying and filtering capabilities
- **Real-time Streaming**: Live monitoring of governance activities

## Event Types

### Core Events

```python
from oacp.events import (
    NodeStart, NodeResult, VoteCast, DecisionFinalized, 
    ConflictRaised, AdaptationApplied
)

# Node execution events
NodeStart(
    run_id="01K2YQ0W5Z",
    node_id="researcher_abc123",
    role="researcher",
    inputs={"topic": "AI governance"},
    idempotency_key="key_123"
)

NodeResult(
    run_id="01K2YQ0W5Z", 
    node_id="researcher_abc123",
    role="researcher",
    output={"research": "findings"},
    duration_ms=1500,
    success=True
)
```

### Voting Events

```python
# Vote casting
VoteCast(
    run_id="01K2YQ0W5Z",
    voter_id="peer_reviewer",
    decision=VoteDecision.APPROVE,
    reason="Research meets quality standards",
    fix_suggestions=["Add more citations"],
    target_ref="research_output"
)

# Decision finalization
DecisionFinalized(
    run_id="01K2YQ0W5Z",
    node_id="researcher_abc123", 
    approved=True,
    votes_cast=3,
    consensus_strategy="majority",
    duration_ms=5000
)
```

### Conflict and Error Events

```python
# Conflicts raised
ConflictRaised(
    run_id="01K2YQ0W5Z",
    node_id="researcher_abc123",
    reason_summary="Consensus failed: insufficient approvals",
    votes_cast=2,
    approvals=1,
    rejections=1,
    abstentions=0,
    missing_voters=["reviewer3"]
)

# Adaptive prompting events
AdaptationApplied(
    run_id="01K2YQ0W5Z",
    node_id="content_generator",
    original_prompt="Write about AI",
    adapted_prompt="Write comprehensive analysis about AI with examples",
    adaptation_reason="Previous rejection: lacks detail",
    voter_feedback="peer_reviewer"
)
```

## Accessing Audit Trails

### Programmatic Access

```python
from oacp.storage import get_current_storage
from oacp.events import EventType

# Get storage instance
storage = get_current_storage()

# Read all events for a run
events = await storage.read_events("01K2YQ0W5Z")

# Filter events by type
vote_events = [e for e in events if e.event_type == EventType.VOTE_CAST]

# Query with filters
filtered_events = await storage.query_events(
    filters={
        "event_type": "VoteCast",
        "voter_id": "peer_reviewer",
        "timestamp": {"gte": "2024-01-01"}
    },
    limit=100
)
```

### CLI Access

```bash
# View recent audit trail
oacp logs --limit 50

# Filter by run ID
oacp logs --run-id 01K2YQ0W5Z

# Filter by event type
oacp logs --event-type VoteCast

# Export audit trail
oacp export --format json --output audit-trail.json

# Real-time monitoring
oacp monitor --follow
```

## Audit Trail Analysis

### Event Statistics

```python
from oacp.analytics import AuditAnalytics

analytics = AuditAnalytics()

# Get event statistics
stats = await analytics.get_event_statistics(days=30)
print(f"Total events: {stats.total_events}")
print(f"Event types: {stats.event_type_breakdown}")
print(f"Most active roles: {stats.top_roles}")

# Analyze voting patterns
voting_stats = await analytics.get_voting_patterns()
print(f"Approval rate: {voting_stats.approval_rate:.2%}")
print(f"Most common rejection reasons: {voting_stats.top_rejection_reasons}")
```

### Compliance Reporting

```python
from oacp.compliance import ComplianceReporter

reporter = ComplianceReporter()

# Generate compliance report
report = await reporter.generate_compliance_report(
    start_date="2024-01-01",
    end_date="2024-01-31",
    include_sections=["governance", "voting", "errors"]
)

# Export report
await reporter.export_report(report, format="pdf", output="compliance-report.pdf")
```

## Storage and Retention

### Storage Configuration

```python
from oacp.storage import configure_storage

# Configure with retention policy
configure_storage(
    storage_type="postgresql",
    storage_url="postgresql://user:pass@localhost/oacp_db",
    retention_policy={
        "default_retention_days": 365,
        "event_type_retention": {
            "VoteCast": 730,      # Keep votes for 2 years
            "NodeResult": 90,     # Keep results for 3 months
            "ConflictRaised": 1095 # Keep conflicts for 3 years
        }
    }
)
```

### Archival and Backup

```python
from oacp.archival import ArchivalManager

archival = ArchivalManager()

# Archive old events
await archival.archive_events(
    older_than_days=90,
    archive_location="s3://my-bucket/oacp-archive/",
    compression="gzip"
)

# Backup audit trails
await archival.backup_audit_trails(
    backup_location="./backups/",
    include_metadata=True,
    encrypt=True
)
```

## Real-time Monitoring

### Event Streaming

```python
from oacp.streaming import EventStream

# Stream events in real-time
async def monitor_events():
    stream = EventStream()
    
    async for event in stream.subscribe():
        if event.event_type == "ConflictRaised":
            print(f"⚠️  Conflict: {event.reason_summary}")
        elif event.event_type == "VoteCast":
            print(f"🗳️  Vote: {event.voter_id} -> {event.decision}")
        elif event.event_type == "DecisionFinalized":
            status = "✅ Approved" if event.approved else "❌ Rejected"
            print(f"{status}: {event.node_id}")

# Run monitoring
await monitor_events()
```

### Alerting

```python
from oacp.alerting import AlertManager

alert_manager = AlertManager()

# Configure alerts
await alert_manager.configure_alerts([
    {
        "name": "high_rejection_rate",
        "condition": "rejection_rate > 0.3",
        "window": "1h",
        "action": "email",
        "recipients": ["admin@company.com"]
    },
    {
        "name": "consensus_timeouts",
        "condition": "timeout_rate > 0.1",
        "window": "30m", 
        "action": "slack",
        "channel": "#oacp-alerts"
    }
])
```

## Security and Privacy

### Data Protection

```python
from oacp.security import AuditSecurity

security = AuditSecurity()

# Configure data redaction
await security.configure_redaction({
    "redact_keys": ["password", "secret", "token"],
    "hash_pii": True,
    "encrypt_sensitive": True
})

# Verify audit integrity
integrity_check = await security.verify_audit_integrity()
if not integrity_check.valid:
    print(f"Integrity issues: {integrity_check.issues}")
```

### Access Control

```python
from oacp.access import AuditAccessControl

access_control = AuditAccessControl()

# Configure role-based access
await access_control.configure_rbac({
    "admin": ["read", "write", "delete", "export"],
    "auditor": ["read", "export"],
    "developer": ["read"],
    "viewer": ["read_summary"]
})

# Audit access logs
access_logs = await access_control.get_access_logs(days=7)
```

## Integration Examples

### With External Systems

```python
import requests
from oacp.events import EventBase

class ExternalAuditForwarder:
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url
    
    async def forward_event(self, event: EventBase):
        """Forward events to external audit system."""
        payload = {
            "timestamp": event.timestamp,
            "event_type": event.event_type,
            "run_id": event.run_id,
            "data": event.dict()
        }
        
        response = requests.post(self.webhook_url, json=payload)
        response.raise_for_status()

# Register forwarder
forwarder = ExternalAuditForwarder("https://audit-system.com/webhook")

# Forward all events
from oacp.streaming import EventStream
stream = EventStream()

async for event in stream.subscribe():
    await forwarder.forward_event(event)
```

### With Compliance Tools

```python
from oacp.compliance import SOXCompliance, GDPRCompliance

# SOX compliance
sox = SOXCompliance()
sox_report = await sox.generate_report(
    period="2024-Q1",
    controls=["segregation_of_duties", "audit_trails", "change_management"]
)

# GDPR compliance
gdpr = GDPRCompliance()
gdpr_report = await gdpr.generate_report(
    include_data_flows=True,
    include_retention_policies=True,
    include_access_logs=True
)
```

## Best Practices

### Event Design

1. **Comprehensive Context**: Include all relevant context in events
2. **Immutable Events**: Never modify events after creation
3. **Structured Data**: Use consistent event schemas
4. **Meaningful IDs**: Use descriptive, traceable identifiers
5. **Timestamp Precision**: Include precise timestamps with timezone

### Storage Management

1. **Retention Policies**: Define appropriate retention periods
2. **Regular Backups**: Implement automated backup procedures
3. **Performance Monitoring**: Monitor storage performance
4. **Capacity Planning**: Plan for audit trail growth
5. **Compression**: Use compression for long-term storage

### Security

1. **Data Encryption**: Encrypt sensitive audit data
2. **Access Controls**: Implement role-based access
3. **Integrity Verification**: Regular integrity checks
4. **Secure Transmission**: Use secure channels for audit data
5. **Privacy Protection**: Redact or hash PII data

### Monitoring

1. **Real-time Alerts**: Set up alerts for critical events
2. **Dashboard Monitoring**: Use dashboards for overview
3. **Trend Analysis**: Monitor trends and patterns
4. **Performance Metrics**: Track audit system performance
5. **Regular Reviews**: Conduct periodic audit reviews

## Troubleshooting

### Common Issues

#### Missing Events

```python
# Verify event completeness
from oacp.diagnostics import AuditDiagnostics

diagnostics = AuditDiagnostics()
missing_events = await diagnostics.find_missing_events("01K2YQ0W5Z")

if missing_events:
    print(f"Missing events: {missing_events}")
```

#### Storage Issues

```python
# Check storage health
from oacp.storage import health_check

health = await health_check()
if not health.healthy:
    print(f"Storage issues: {health.issues}")
```

#### Performance Problems

```python
# Analyze performance
from oacp.performance import AuditPerformanceAnalyzer

analyzer = AuditPerformanceAnalyzer()
performance_report = await analyzer.analyze(days=7)

print(f"Slow queries: {performance_report.slow_queries}")
print(f"Recommendations: {performance_report.recommendations}")
```

## Advanced Features

### Event Enrichment

```python
from oacp.enrichment import EventEnricher

enricher = EventEnricher()

# Add contextual information
enriched_event = await enricher.enrich_event(
    event,
    include_system_metrics=True,
    include_user_context=True,
    include_environment_info=True
)
```

### Custom Event Types

```python
from oacp.events import EventBase

class CustomAuditEvent(EventBase):
    event_type: str = "CustomAudit"
    custom_field: str
    metadata: dict
    
    def validate(self) -> bool:
        return bool(self.custom_field)

# Use custom event
custom_event = CustomAuditEvent(
    run_id="01K2YQ0W5Z",
    custom_field="important_data",
    metadata={"source": "external_system"}
)
```

### Event Correlation

```python
from oacp.correlation import EventCorrelator

correlator = EventCorrelator()

# Find related events
related_events = await correlator.find_related_events(
    event_id="event_123",
    correlation_types=["same_run", "same_user", "same_timeframe"]
)

# Build event chains
event_chain = await correlator.build_event_chain("01K2YQ0W5Z")
```
