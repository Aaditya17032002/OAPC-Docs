# Quick Start Guide

Get up and running with OACP in minutes. This guide walks you through installation, basic usage, and your first multi-agent workflow with governance.

## Prerequisites

- Python 3.10 or higher
- Basic familiarity with Python decorators
- Optional: LangGraph for workflow integration

## Installation

Install OACP from PyPI:

```bash
pip install OACP
```

For development with all optional dependencies:

```bash
pip install OACP[postgres,web,dev]
```

## Basic Example

Let's create a simple governed function:

```python
from oacp import with_oacp, decision_contract, vote, VoteDecision

# Step 1: Create a governed function
@with_oacp(
    role="content_generator",
    contract=decision_contract(
        required_approvers=["quality_reviewer"],
        strategy="majority",
        timeout_seconds=60
    )
)
def generate_content(topic: str) -> dict:
    """Generate content that requires approval."""
    content = f"This is content about {topic}"
    return {"content": content, "topic": topic}

# Step 2: Implement the reviewer
def quality_reviewer(run_id: str, content_data: dict):
    """Review content quality and vote."""
    content = content_data["content"]
    
    if len(content) > 20 and "about" in content:
        vote(
            run_id=run_id,
            voter_id="quality_reviewer",
            decision=VoteDecision.APPROVE,
            reason="Content meets quality standards"
        )
    else:
        vote(
            run_id=run_id,
            voter_id="quality_reviewer", 
            decision=VoteDecision.REJECT,
            reason="Content too short or lacks detail"
        )

# Step 3: Use the governed function
if __name__ == "__main__":
    # This will trigger the governance process
    result = generate_content("artificial intelligence")
    print(result)
```

## Multi-Agent Workflow

Here's a more complex example with multiple agents and voting:

```python
from oacp import with_oacp, decision_contract, vote, VoteDecision
import time
import threading

# Research Agent - No governance needed for data collection
@with_oacp(role="researcher")
def research_agent(topic: str) -> dict:
    """Conduct research on the given topic."""
    research_data = {
        "topic": topic,
        "findings": f"Research findings about {topic}",
        "sources": ["source1.com", "source2.org"],
        "confidence": 0.85
    }
    return research_data

# Analysis Agent - Requires peer review
@with_oacp(
    role="analyst",
    contract=decision_contract(
        required_approvers=["peer_analyst", "senior_analyst"],
        strategy="majority",
        timeout_seconds=90
    )
)
def analysis_agent(research_data: dict) -> dict:
    """Analyze research data with peer review."""
    analysis = {
        "topic": research_data["topic"],
        "analysis": f"Analysis of {research_data['topic']}",
        "insights": ["insight1", "insight2", "insight3"],
        "confidence": research_data["confidence"] * 0.9
    }
    return analysis

# Synthesis Agent - Requires unanimous approval
@with_oacp(
    role="synthesizer",
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic"],
        strategy="unanimous",
        timeout_seconds=120
    )
)
def synthesis_agent(analysis_data: dict) -> dict:
    """Synthesize final report requiring unanimous approval."""
    final_report = {
        "topic": analysis_data["topic"],
        "final_report": f"Final synthesis on {analysis_data['topic']}",
        "recommendations": ["rec1", "rec2"],
        "confidence": analysis_data["confidence"]
    }
    return final_report

# Voting Functions
def peer_analyst_vote(run_id: str, analysis_data: dict):
    """Peer analyst reviews the analysis."""
    if analysis_data["confidence"] > 0.7:
        vote(run_id, "peer_analyst", VoteDecision.APPROVE, 
             "Analysis meets peer review standards")
    else:
        vote(run_id, "peer_analyst", VoteDecision.REJECT, 
             "Analysis confidence too low")

def senior_analyst_vote(run_id: str, analysis_data: dict):
    """Senior analyst provides expert review."""
    if len(analysis_data.get("insights", [])) >= 3:
        vote(run_id, "senior_analyst", VoteDecision.APPROVE,
             "Sufficient insights provided")
    else:
        vote(run_id, "senior_analyst", VoteDecision.REJECT,
             "Need more comprehensive insights")

def researcher_vote(run_id: str, synthesis_data: dict):
    """Original researcher approves synthesis."""
    vote(run_id, "researcher", VoteDecision.APPROVE,
         "Synthesis accurately represents research")

def analyst_vote(run_id: str, synthesis_data: dict):
    """Analyst approves final synthesis."""
    vote(run_id, "analyst", VoteDecision.APPROVE,
         "Synthesis incorporates analysis correctly")

def critic_vote(run_id: str, synthesis_data: dict):
    """Critic provides final review."""
    if synthesis_data["confidence"] > 0.6:
        vote(run_id, "critic", VoteDecision.APPROVE,
             "Final report meets publication standards")
    else:
        vote(run_id, "critic", VoteDecision.REJECT,
             "Report needs improvement")

# Run the workflow
def run_research_workflow():
    """Execute the complete research workflow."""
    topic = "machine learning governance"
    
    print(f"Starting research workflow on: {topic}")
    
    # Step 1: Research (no governance)
    print("Step 1: Conducting research...")
    research_data = research_agent(topic)
    print(f"Research completed: {research_data['confidence']:.2%} confidence")
    
    # Step 2: Analysis (majority voting)
    print("Step 2: Analyzing data...")
    
    # Start voting threads for analysis
    def vote_on_analysis(run_id):
        time.sleep(1)  # Simulate review time
        peer_analyst_vote(run_id, research_data)
        senior_analyst_vote(run_id, research_data)
    
    # This will be populated by the @with_oacp decorator
    analysis_run_id = None
    
    # Analysis will trigger voting automatically
    analysis_data = analysis_agent(research_data)
    print(f"Analysis completed and approved")
    
    # Step 3: Synthesis (unanimous voting)
    print("Step 3: Creating synthesis...")
    
    # Synthesis will trigger voting automatically  
    final_report = synthesis_agent(analysis_data)
    print(f"Final report completed: {final_report['topic']}")
    
    return final_report

if __name__ == "__main__":
    try:
        result = run_research_workflow()
        print("\n=== WORKFLOW COMPLETED ===")
        print(f"Final Result: {result}")
    except Exception as e:
        print(f"Workflow failed: {e}")
```

## LangGraph Integration

OACP works seamlessly with LangGraph:

```python
from langgraph.graph import StateGraph
from oacp import wrap_node, decision_contract
from typing import TypedDict

# Define state
class WorkflowState(TypedDict):
    topic: str
    research: dict
    analysis: dict
    final_report: dict

# Define nodes
def research_node(state: WorkflowState) -> WorkflowState:
    research_data = research_agent(state["topic"])
    return {"research": research_data}

def analysis_node(state: WorkflowState) -> WorkflowState:
    analysis_data = analysis_agent(state["research"])
    return {"analysis": analysis_data}

def synthesis_node(state: WorkflowState) -> WorkflowState:
    final_data = synthesis_agent(state["analysis"])
    return {"final_report": final_data}

# Create workflow with OACP governance
def create_governed_workflow():
    workflow = StateGraph(WorkflowState)
    
    # Add nodes with governance
    workflow.add_node("research", wrap_node(
        research_node,
        role="researcher"
    ))
    
    workflow.add_node("analysis", wrap_node(
        analysis_node,
        role="analyst",
        contract=decision_contract(
            required_approvers=["peer_analyst"],
            strategy="majority"
        )
    ))
    
    workflow.add_node("synthesis", wrap_node(
        synthesis_node,
        role="synthesizer",
        contract=decision_contract(
            required_approvers=["researcher", "analyst"],
            strategy="unanimous"
        )
    ))
    
    # Define edges
    workflow.add_edge("research", "analysis")
    workflow.add_edge("analysis", "synthesis")
    
    # Set entry point
    workflow.set_entry_point("research")
    
    return workflow.compile()

# Run the workflow
def run_langgraph_workflow():
    app = create_governed_workflow()
    
    initial_state = {"topic": "AI governance"}
    final_state = app.invoke(initial_state)
    
    return final_state

if __name__ == "__main__":
    result = run_langgraph_workflow()
    print(f"LangGraph workflow result: {result}")
```

## Configuration

### Environment Setup

Create a `.env` file:

```bash
# Storage configuration
OACP_STORAGE_TYPE=file
OACP_STORAGE_PATH=./oacp_data

# Logging
OACP_LOG_LEVEL=INFO

# Security
OACP_REDACT_KEYS=password,secret,token
```

### Programmatic Configuration

```python
from oacp.storage import configure_storage

# Configure storage backend
configure_storage(
    storage_type="sqlite",
    storage_url="sqlite:///oacp.db"
)
```

## CLI Usage

OACP includes a command-line interface:

```bash
# View recent activity
oacp logs --limit 10

# Show statistics
oacp stats

# Monitor in real-time
oacp monitor

# Export data
oacp export --format json --output audit.json
```

## Next Steps

Now that you have OACP running:

1. **Explore Examples**: Check out the `examples/` directory for more complex scenarios
2. **Read the Docs**: Dive deeper into [features](features/) and [API reference](api/)
3. **Configure Storage**: Set up [PostgreSQL](api/storage-backends.md) for production
4. **Web Dashboard**: Enable the [web interface](web/dashboard.md) for monitoring
5. **Advanced Features**: Learn about [adaptive prompting](features/adaptive-prompting.md)

## Common Patterns

### Error Handling

```python
from oacp import with_oacp
from oacp.errors import OacpConsensusError, OacpTimeout

@with_oacp(role="error_handler")
def safe_operation(data: dict) -> dict:
    try:
        return {"result": "success"}
    except OacpConsensusError as e:
        print(f"Consensus failed: {e}")
        return {"result": "consensus_failed", "error": str(e)}
    except OacpTimeout as e:
        print(f"Operation timed out: {e}")
        return {"result": "timeout", "error": str(e)}
```

### Monitoring

```python
from oacp import current_context

@with_oacp(role="monitored_agent")
def monitored_function(data: dict) -> dict:
    ctx = current_context()
    print(f"Running as {ctx.role} in run {ctx.run_id}")
    return {"processed": data}
```

### Conditional Governance

```python
def get_contract_for_data(data: dict):
    if data.get("sensitive", False):
        return decision_contract(
            required_approvers=["security", "compliance"],
            strategy="unanimous"
        )
    return None  # No governance for non-sensitive data

@with_oacp(
    role="conditional_processor",
    contract=lambda data: get_contract_for_data(data)
)
def conditional_function(data: dict) -> dict:
    return {"processed": data}
```

## Troubleshooting

### Common Issues

1. **Timeout Errors**: Increase `timeout_seconds` in your contract
2. **Missing Voters**: Ensure all required approvers are implemented
3. **Import Errors**: Check that OACP is properly installed
4. **Storage Issues**: Verify storage configuration

### Getting Help

- Check the [FAQ](troubleshooting/faq.md)
- Browse [GitHub Issues](https://github.com/Aaditya17032002/OACP/issues)
- Read the full [documentation](overview.md)
