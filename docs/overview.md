# OACP Overview

Open Agent Compliance Protocol (OACP) is a governance layer for LangGraph that adds voting, consensus, and audit trails to multi-agent workflows. It transforms your agent systems with democratic decision-making, adaptive prompting, and comprehensive oversight.

## What is OACP?

OACP provides a framework for building trustworthy multi-agent systems by adding governance mechanisms on top of LangGraph. It enables agents to vote on decisions, reach consensus, maintain audit trails, and adapt their behavior based on feedback.

## Core Philosophy

OACP is built on the principle that AI systems should be:
- **Transparent**: Every decision is logged and auditable
- **Democratic**: Multiple agents participate in decision-making
- **Adaptive**: Systems learn from feedback and improve over time
- **Accountable**: Clear audit trails for all actions

## Key Features

### Governance Layer
Add voting and consensus mechanisms to any LangGraph workflow. Transform individual agent decisions into collaborative, democratic processes.

### Voting Strategies
- **Unanimous**: All voters must approve
- **Majority**: More than 50% approval required  
- **Weighted**: Votes have different importance levels

### Adaptive Prompting
Automatically improve prompts based on rejection feedback from voting agents. The system learns from failures and adapts prompts to increase success rates.

### Audit Trails
Complete logging and tracking of all agent decisions, votes, and system events. Every action is recorded with timestamps, contexts, and outcomes.

### Multiple Storage Backends
- **File Storage**: JSON-based local storage for development
- **SQLite**: Lightweight database for small to medium deployments
- **PostgreSQL**: Production-ready database for enterprise use

### LLM Integration
Built-in adapters for popular language models with automatic retry logic and error handling.

## Architecture Overview

OACP consists of several key components:

1. **Decorators**: `@with_oacp` and `wrap_node` for applying governance
2. **Contracts**: Define voting requirements and strategies
3. **Votes**: Cast and track voting decisions
4. **Context**: Access current execution context and metadata
5. **Storage**: Pluggable storage backends for persistence
6. **Events**: Comprehensive event system for tracking
7. **Adaptive Prompting**: Automatic prompt improvement

## Use Cases

### Multi-Agent Research Teams
Coordinate multiple research agents with different specializations, requiring consensus on findings and conclusions.

### Quality Assurance Systems
Implement multiple validation layers where different agents check work quality, accuracy, and compliance.

### Content Generation Workflows
Collaborative content creation where agents handle research, writing, editing, and review with voting mechanisms.

### Decision Support Systems
AI-assisted decision making with multiple agents providing analysis and requiring consensus before recommendations.

## Getting Started

The quickest way to get started with OACP is to use the `@with_oacp` decorator:

```python
from oacp import with_oacp, decision_contract, vote, VoteDecision

@with_oacp(
    role="researcher",
    invariants=["factual_accuracy", "comprehensive_coverage"]
)
def research_agent(topic: str) -> dict:
    # Your agent logic here
    return {"research_results": "..."}
```

For more detailed examples, see the [Quick Start Guide](quickstart.md) and [Examples](../examples/).

## Community and Support

OACP is an open-source project with active development. Join our community:

- **GitHub**: https://github.com/Aaditya17032002/OACP
- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **PyPI**: https://pypi.org/project/OACP/

## Next Steps

- [Installation Guide](installation.md)
- [Quick Start Tutorial](quickstart.md)
- [API Reference](reference/api.md)
- [Examples](../examples/)
