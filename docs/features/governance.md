# Governance Layer

OACP's governance layer provides democratic decision-making capabilities for multi-agent workflows. It transforms individual agent decisions into collaborative, transparent processes.

## Overview

The governance layer enables:
- **Democratic Decision Making**: Multiple agents vote on decisions
- **Consensus Mechanisms**: Different strategies for reaching agreement
- **Audit Trails**: Complete logging of all governance activities
- **Transparency**: All decisions are recorded and traceable

## Core Components

### Decision Contracts

Decision contracts define the rules for governance:

```python
from oacp import decision_contract

# Unanimous consent required
contract = decision_contract(
    required_approvers=["researcher", "analyst", "reviewer"],
    strategy="unanimous",
    timeout_seconds=60
)

# Majority voting
contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3", "agent4"],
    strategy="majority",
    timeout_seconds=30
)

# Weighted voting
contract = decision_contract(
    required_approvers=["senior", "junior1", "junior2"],
    strategy="weighted",
    weights={"senior": 0.6, "junior1": 0.2, "junior2": 0.2},
    timeout_seconds=45
)
```

### Governance Decorators

Apply governance to any function:

```python
from oacp import with_oacp, decision_contract

@with_oacp(
    role="synthesizer",
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic"],
        strategy="unanimous",
        timeout_seconds=30
    )
)
def synthesis_agent(data) -> dict:
    """Synthesizes research data (requires unanimous approval)."""
    return {"synthesis": "combined_analysis"}
```

### Voting Process

Agents participate in governance by voting:

```python
from oacp import vote, VoteDecision

def reviewer_agent(run_id: str, content: str):
    """Reviews content and casts vote."""
    if quality_check(content):
        vote(
            run_id=run_id,
            voter_id="reviewer",
            decision=VoteDecision.APPROVE,
            reason="Content meets quality standards"
        )
    else:
        vote(
            run_id=run_id,
            voter_id="reviewer",
            decision=VoteDecision.REJECT,
            reason="Quality issues found",
            fix_suggestions=["Add more citations", "Improve clarity"]
        )
```

## Governance Strategies

### Unanimous Consent

All required approvers must vote to approve:

```python
contract = decision_contract(
    required_approvers=["legal", "technical", "business"],
    strategy="unanimous"
)
```

**Use Cases:**
- Critical decisions requiring full agreement
- High-stakes outputs needing complete consensus
- Compliance-sensitive operations

**Pros:**
- Highest confidence in decisions
- All perspectives considered
- Minimal risk of errors

**Cons:**
- Can be slow
- Single dissenter blocks progress
- May lead to conservative decisions

### Majority Voting

More than 50% of approvers must vote to approve:

```python
contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3", "agent4", "agent5"],
    strategy="majority"
)
```

**Use Cases:**
- Balanced decision making
- Scenarios where perfect consensus isn't critical
- Time-sensitive decisions

**Pros:**
- Faster than unanimous
- Resistant to single outliers
- Democratic process

**Cons:**
- May ignore minority concerns
- Risk of polarization
- Less thorough than unanimous

### Weighted Voting

Votes have different importance based on agent expertise:

```python
contract = decision_contract(
    required_approvers=["senior_expert", "expert", "junior"],
    strategy="weighted",
    weights={
        "senior_expert": 0.5,
        "expert": 0.3,
        "junior": 0.2
    }
)
```

**Use Cases:**
- Hierarchical organizations
- Expertise-based decisions
- Quality-weighted consensus

**Pros:**
- Reflects expertise levels
- Efficient decision making
- Maintains quality standards

**Cons:**
- May discourage participation
- Requires careful weight calibration
- Can create power imbalances

## Governance Workflows

### Research Team Governance

```python
from oacp import with_oacp, decision_contract

# Research phase - no governance needed
@with_oacp(role="researcher")
def research_phase(topic: str) -> dict:
    return {"findings": "research_data"}

# Analysis phase - peer review
@with_oacp(
    role="analyst",
    contract=decision_contract(
        required_approvers=["peer_analyst"],
        strategy="majority"
    )
)
def analysis_phase(research_data: dict) -> dict:
    return {"analysis": "analytical_insights"}

# Synthesis phase - full consensus
@with_oacp(
    role="synthesizer",
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic"],
        strategy="unanimous"
    )
)
def synthesis_phase(data: dict) -> dict:
    return {"final_report": "synthesized_findings"}
```

### Content Creation Governance

```python
# Writing phase
@with_oacp(role="writer")
def content_writer(brief: dict) -> dict:
    return {"draft": "content_draft"}

# Editing phase - majority approval
@with_oacp(
    role="editor",
    contract=decision_contract(
        required_approvers=["copy_editor", "technical_editor"],
        strategy="majority"
    )
)
def content_editor(draft: dict) -> dict:
    return {"edited_content": "polished_draft"}

# Final review - unanimous approval
@with_oacp(
    role="publisher",
    contract=decision_contract(
        required_approvers=["legal", "brand", "technical"],
        strategy="unanimous"
    )
)
def content_publisher(content: dict) -> dict:
    return {"published": "final_content"}
```

## Advanced Governance Features

### Conditional Governance

Apply different governance based on conditions:

```python
def get_contract_for_content(content_type: str) -> DecisionContract:
    if content_type == "critical":
        return decision_contract(
            required_approvers=["legal", "security", "compliance"],
            strategy="unanimous"
        )
    elif content_type == "standard":
        return decision_contract(
            required_approvers=["reviewer1", "reviewer2"],
            strategy="majority"
        )
    else:
        return None  # No governance needed

@with_oacp(
    role="content_processor",
    contract=lambda content: get_contract_for_content(content.get("type"))
)
def process_content(content: dict) -> dict:
    return {"processed": content}
```

### Multi-Stage Governance

Different governance at different stages:

```python
class ResearchWorkflow:
    @with_oacp(role="researcher")
    def research(self, topic: str) -> dict:
        return {"research": "data"}
    
    @with_oacp(
        role="reviewer",
        contract=decision_contract(
            required_approvers=["peer_reviewer"],
            strategy="majority"
        )
    )
    def review(self, research: dict) -> dict:
        return {"reviewed": research}
    
    @with_oacp(
        role="publisher",
        contract=decision_contract(
            required_approvers=["senior_researcher", "editor"],
            strategy="unanimous"
        )
    )
    def publish(self, reviewed: dict) -> dict:
        return {"published": reviewed}
```

### Dynamic Governance

Governance that adapts based on context:

```python
from oacp import current_context

def adaptive_contract(data: dict) -> DecisionContract:
    ctx = current_context()
    
    # More strict governance for sensitive data
    if data.get("sensitivity") == "high":
        return decision_contract(
            required_approvers=["security", "compliance", "legal"],
            strategy="unanimous",
            timeout_seconds=300
        )
    
    # Standard governance for regular data
    return decision_contract(
        required_approvers=["reviewer"],
        strategy="majority",
        timeout_seconds=60
    )

@with_oacp(
    role="processor",
    contract=adaptive_contract
)
def process_data(data: dict) -> dict:
    return {"processed": data}
```

## Governance Monitoring

### Real-time Monitoring

```python
from oacp import current_context
from oacp.events import EventType

def governance_monitor():
    """Monitor governance activities in real-time."""
    ctx = current_context()
    
    # Subscribe to governance events
    ctx.trace_writer.subscribe(EventType.VOTE_CAST)
    ctx.trace_writer.subscribe(EventType.DECISION_FINALIZED)
    ctx.trace_writer.subscribe(EventType.CONFLICT_RAISED)
    
    for event in ctx.trace_writer.stream():
        if event.type == EventType.VOTE_CAST:
            print(f"Vote cast: {event.voter_id} -> {event.decision}")
        elif event.type == EventType.DECISION_FINALIZED:
            print(f"Decision: {event.approved} after {event.votes_cast} votes")
        elif event.type == EventType.CONFLICT_RAISED:
            print(f"Conflict: {event.reason_summary}")
```

### Governance Analytics

```python
from oacp.analytics import GovernanceAnalytics

analytics = GovernanceAnalytics()

# Get governance statistics
stats = analytics.get_governance_stats(days=30)
print(f"Decisions made: {stats.total_decisions}")
print(f"Approval rate: {stats.approval_rate:.2%}")
print(f"Average decision time: {stats.avg_decision_time}s")

# Get voting patterns
patterns = analytics.get_voting_patterns("researcher")
print(f"Approval rate: {patterns.approval_rate:.2%}")
print(f"Most common rejection reasons: {patterns.top_rejection_reasons}")
```

## Best Practices

### Designing Governance

1. **Start Simple**: Begin with basic majority voting
2. **Match Strategy to Use Case**: Use unanimous for critical decisions
3. **Set Reasonable Timeouts**: Balance thoroughness with efficiency
4. **Consider Agent Expertise**: Use weighted voting when appropriate
5. **Plan for Failures**: Have fallback mechanisms

### Voter Implementation

1. **Clear Criteria**: Define clear voting criteria
2. **Constructive Feedback**: Provide actionable rejection reasons
3. **Timely Responses**: Vote within timeout periods
4. **Consistent Standards**: Apply consistent quality standards
5. **Document Decisions**: Provide clear reasoning for votes

### Monitoring and Maintenance

1. **Track Metrics**: Monitor approval rates and decision times
2. **Analyze Patterns**: Look for voting patterns and bottlenecks
3. **Adjust Strategies**: Modify governance based on outcomes
4. **Regular Reviews**: Periodically review governance effectiveness
5. **Update Contracts**: Evolve contracts as requirements change

## Troubleshooting

### Common Issues

#### Timeout Errors
```python
# Increase timeout for complex decisions
contract = decision_contract(
    required_approvers=["agent1", "agent2"],
    timeout_seconds=300  # 5 minutes
)
```

#### Missing Voters
```python
# Add fallback voters
contract = decision_contract(
    required_approvers=["primary_voter"],
    fallback_approvers=["backup_voter"],
    strategy="majority"
)
```

#### Deadlocks
```python
# Use majority instead of unanimous
contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3"],
    strategy="majority"  # Prevents single-agent deadlocks
)
```

## Integration Examples

### With LangGraph

```python
from langgraph.graph import StateGraph
from oacp import wrap_node, decision_contract

def create_governed_workflow():
    workflow = StateGraph(MyState)
    
    # Add governed nodes
    workflow.add_node(
        "research",
        wrap_node(
            research_agent,
            role="researcher"
        )
    )
    
    workflow.add_node(
        "synthesis",
        wrap_node(
            synthesis_agent,
            role="synthesizer",
            contract=decision_contract(
                required_approvers=["researcher", "critic"],
                strategy="unanimous"
            )
        )
    )
    
    return workflow.compile()
```

### With External Systems

```python
import requests
from oacp import vote, VoteDecision

def external_reviewer(run_id: str, content: str):
    """External system participates in governance."""
    
    # Send to external review service
    response = requests.post(
        "https://review-service.com/api/review",
        json={"content": content, "run_id": run_id}
    )
    
    if response.json()["approved"]:
        vote(
            run_id=run_id,
            voter_id="external_reviewer",
            decision=VoteDecision.APPROVE,
            reason="External review passed"
        )
    else:
        vote(
            run_id=run_id,
            voter_id="external_reviewer",
            decision=VoteDecision.REJECT,
            reason=response.json()["feedback"]
        )
```
