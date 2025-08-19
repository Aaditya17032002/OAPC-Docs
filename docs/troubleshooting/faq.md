# Frequently Asked Questions (FAQ)

Common questions and answers about OACP (Open Agent Compliance Protocol).

## General Questions

### What is OACP?

OACP (Open Agent Compliance Protocol) is a governance layer for LangGraph that adds voting, consensus, and audit trails to multi-agent workflows. It enables democratic decision-making, adaptive prompting, and comprehensive oversight for AI agent systems.

### Why do I need governance for AI agents?

AI agent governance provides:
- **Quality Control**: Multiple agents review outputs for accuracy
- **Transparency**: Complete audit trails of all decisions
- **Accountability**: Clear responsibility and traceability
- **Risk Mitigation**: Consensus requirements reduce errors
- **Compliance**: Meet regulatory and organizational requirements

### How does OACP integrate with LangGraph?

OACP seamlessly integrates with LangGraph through decorators:
- Use `@with_oacp` to add governance to any function
- Use `wrap_node` for LangGraph nodes
- Governance is transparent to existing code
- No changes needed to core LangGraph workflows

## Installation & Setup

### How do I install OACP?

```bash
# Basic installation
pip install OACP

# With optional dependencies
pip install OACP[postgres,web,dev]

# From source
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP
pip install -e .
```

### What are the system requirements?

- Python 3.10 or higher
- LangGraph (automatically installed)
- Optional: PostgreSQL for production storage
- Optional: Redis for caching (future feature)

### How do I configure storage?

```bash
# File storage (development)
export OACP_STORAGE_TYPE=file
export OACP_STORAGE_PATH=./oacp_data

# SQLite (small deployments)
export OACP_STORAGE_TYPE=sqlite
export OACP_STORAGE_URL=sqlite:///oacp.db

# PostgreSQL (production)
export OACP_STORAGE_TYPE=postgresql
export OACP_STORAGE_URL=postgresql://user:pass@localhost:5432/oacp_db
```

## Usage Questions

### How do I add governance to a function?

```python
from oacp import with_oacp, decision_contract

@with_oacp(
    role="content_generator",
    contract=decision_contract(
        required_approvers=["reviewer"],
        strategy="majority"
    )
)
def generate_content(prompt: str) -> dict:
    return {"content": "generated content"}
```

### How do voting agents participate?

```python
from oacp import vote, VoteDecision

def reviewer_agent(run_id: str, content: dict):
    if quality_check(content):
        vote(run_id, "reviewer", VoteDecision.APPROVE, "Quality approved")
    else:
        vote(run_id, "reviewer", VoteDecision.REJECT, "Needs improvement")
```

### What voting strategies are available?

1. **Unanimous**: All voters must approve
2. **Majority**: More than 50% must approve
3. **Weighted**: Votes have different importance levels

### How does adaptive prompting work?

Adaptive prompting automatically improves prompts based on rejection feedback:
- Agents vote on outputs and provide rejection reasons
- System analyzes rejection patterns
- Prompts are automatically modified to address common issues
- Success rates improve over time

## Common Issues

### Why am I getting "No context available" errors?

This occurs when accessing OACP context outside a governed function:

```python
# ❌ Wrong - outside governed function
def helper_function():
    ctx = current_context()  # Error!

# ✅ Correct - inside governed function
@with_oacp(role="processor")
def main_function(data: dict):
    ctx = current_context()  # Works!
    return helper_function(ctx)
```

### Why are my votes timing out?

Common causes:
1. **Missing voters**: Ensure all required approvers are implemented
2. **Short timeouts**: Increase timeout in decision contract
3. **Network issues**: Check connectivity to storage backend
4. **Voter errors**: Check voter function implementations

```python
# Increase timeout
contract = decision_contract(
    required_approvers=["reviewer"],
    strategy="majority",
    timeout_seconds=300  # 5 minutes
)
```

### Why is consensus failing?

Check these common issues:
1. **Voter implementation**: Ensure voters are correctly implemented
2. **Voting logic**: Verify voting criteria are reasonable
3. **Strategy mismatch**: Ensure voting strategy matches requirements
4. **Missing votes**: Check if all required approvers are voting

### How do I debug voting issues?

```bash
# View recent voting activity
oacp logs --event-type VoteCast --limit 20

# Debug specific run
oacp debug run 01K2YQ0W5Z

# Analyze voting patterns
oacp votes analyze --voter reviewer --days 7
```

## Performance Questions

### How does OACP affect performance?

OACP adds minimal overhead:
- **Function execution**: ~1-5ms overhead per function call
- **Storage operations**: Depends on storage backend
- **Voting process**: Adds latency based on timeout settings
- **Memory usage**: Minimal additional memory usage

### How can I optimize performance?

1. **Choose appropriate storage**: PostgreSQL > SQLite > File for performance
2. **Reasonable timeouts**: Don't set unnecessarily long timeouts
3. **Efficient voters**: Keep voting logic simple and fast
4. **Batch operations**: Use batch operations where possible
5. **Connection pooling**: Configure database connection pooling

### What storage backend should I use?

- **Development**: File storage for simplicity
- **Testing**: In-memory SQLite for speed
- **Small production**: SQLite with WAL mode
- **Large production**: PostgreSQL with connection pooling

## Configuration Questions

### How do I configure different environments?

Create environment-specific configuration files:

```yaml
# development.yaml
storage:
  type: file
  path: ./dev_data
logging:
  level: DEBUG

# production.yaml  
storage:
  type: postgresql
  url: postgresql://user:pass@prod-db/oacp
logging:
  level: INFO
```

### How do I secure sensitive data?

```python
# Configure data redaction
@with_oacp(
    role="secure_processor",
    redact_keys=["password", "token", "secret"],
    log_inputs=False  # Don't log sensitive inputs
)
def process_sensitive_data(data: dict):
    return {"status": "processed"}
```

### How do I enable the web dashboard?

```bash
# Install web dependencies
pip install OACP[web]

# Start dashboard
oacp web start --port 8080

# Access at http://localhost:8080
```

## Integration Questions

### How do I integrate with existing systems?

OACP provides several integration points:
- **REST API**: Access data via HTTP API
- **WebSocket**: Real-time event streaming
- **CLI**: Command-line interface for automation
- **Python API**: Direct programmatic access

### Can I use OACP without LangGraph?

Yes! While designed for LangGraph, OACP can govern any Python function:

```python
@with_oacp(role="standalone_function")
def my_function(data: dict) -> dict:
    # Any Python function can be governed
    return {"result": "processed"}
```

### How do I integrate with external approval systems?

```python
import requests
from oacp import vote, VoteDecision

def external_approval_voter(run_id: str, content: dict):
    # Send to external system
    response = requests.post(
        "https://approval-system.com/api/review",
        json={"content": content, "run_id": run_id}
    )
    
    if response.json()["approved"]:
        vote(run_id, "external_system", VoteDecision.APPROVE)
    else:
        vote(run_id, "external_system", VoteDecision.REJECT)
```

## Deployment Questions

### How do I deploy OACP in production?

1. **Storage**: Use PostgreSQL with proper configuration
2. **Security**: Enable authentication and use HTTPS
3. **Monitoring**: Set up logging and alerting
4. **Backup**: Regular backup procedures
5. **Scaling**: Use connection pooling and load balancing

### Can I deploy OACP in containers?

Yes! OACP works well in containerized environments:

```dockerfile
FROM python:3.11-slim

RUN pip install OACP[postgres,web]

COPY . /app
WORKDIR /app

CMD ["python", "main.py"]
```

### How do I handle high availability?

- **Database**: Use PostgreSQL with replication
- **Application**: Deploy multiple instances behind load balancer
- **Storage**: Use shared storage backend
- **Monitoring**: Implement health checks and failover

## Troubleshooting

### How do I enable debug logging?

```bash
# Environment variable
export OACP_LOG_LEVEL=DEBUG

# CLI
oacp --log-level DEBUG logs

# Programmatic
import logging
logging.getLogger('oacp').setLevel(logging.DEBUG)
```

### Where are logs stored?

- **Console**: By default, logs go to console
- **File**: Configure file logging via environment variables
- **Storage**: Events are stored in configured storage backend
- **External**: Can forward to external logging systems

### How do I reset OACP configuration?

```bash
# Reset environment variables
oacp env reset

# Reset to file storage
oacp env set OACP_STORAGE_TYPE file
oacp env set OACP_STORAGE_PATH ./oacp_data

# Test configuration
oacp env test
```

### How do I migrate between storage backends?

```bash
# Using CLI
oacp migrate \
    --source-type file \
    --source-path ./oacp_data \
    --target-type postgresql \
    --target-url postgresql://user:pass@localhost/oacp_db
```

## Advanced Questions

### Can I create custom voting strategies?

Yes! Implement custom voting logic:

```python
from oacp.contracts import VotingStrategy

class CustomStrategy:
    @staticmethod
    def evaluate_custom(votes, required_approvers, weights=None):
        # Your custom voting logic
        return consensus_achieved, reason

# Register strategy
VotingStrategy.register("custom", CustomStrategy.evaluate_custom)
```

### How do I extend OACP with custom features?

OACP provides extension points:
- **Custom storage backends**
- **Custom voting strategies** 
- **Custom event types**
- **Custom dashboard components**
- **Middleware and hooks**

### Can I use OACP with other workflow frameworks?

While optimized for LangGraph, OACP's decorators work with any Python function. Integration with other frameworks is possible but may require custom adapters.

## Getting Help

### Where can I get support?

- **Documentation**: Comprehensive docs at [oacp-docs.adityajangam.com](https://oacp-docs.adityajangam.com)
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Examples**: Check the `examples/` directory
- **CLI Help**: Run `oacp --help` for command reference

### How do I report bugs?

1. Check existing issues on GitHub
2. Provide minimal reproduction example
3. Include OACP version and Python version
4. Include relevant logs and error messages
5. Describe expected vs actual behavior

### How can I contribute?

1. Read the contributing guide
2. Fork the repository
3. Create feature branch
4. Make changes with tests
5. Submit pull request

### Where can I find examples?

- **Repository**: `examples/` directory
- **Documentation**: Example sections in docs
- **Tests**: Test files show usage patterns
- **CLI**: `oacp --help` for command examples

## Best Practices

### What are OACP best practices?

1. **Start Simple**: Begin with basic majority voting
2. **Appropriate Contracts**: Match voting strategy to use case
3. **Reasonable Timeouts**: Balance thoroughness with speed
4. **Clear Voting Criteria**: Define clear approval standards
5. **Monitor Performance**: Track success rates and bottlenecks
6. **Regular Backups**: Backup audit trails regularly
7. **Security First**: Protect sensitive data and access

### How should I structure my agents?

1. **Single Responsibility**: Each agent has clear purpose
2. **Clear Interfaces**: Well-defined inputs and outputs
3. **Consistent Standards**: Apply consistent quality criteria
4. **Error Handling**: Handle failures gracefully
5. **Documentation**: Document agent behavior and criteria

### When should I use different voting strategies?

- **Unanimous**: Critical decisions, compliance requirements
- **Majority**: Balanced decisions, moderate risk tolerance  
- **Weighted**: Expertise-based decisions, hierarchical systems
- **Custom**: Unique business requirements

This FAQ covers the most common questions about OACP. For more specific questions, please check the detailed documentation or ask in GitHub Discussions.
