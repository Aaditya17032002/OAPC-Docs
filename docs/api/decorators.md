# OACP Decorators API Reference

OACP decorators are the primary way to add governance to your functions and LangGraph nodes. This page provides comprehensive documentation for all available decorators and their parameters.

## @with_oacp Decorator

The main decorator that adds OACP governance to any Python function.

### Basic Usage

```python
from oacp import with_oacp

@with_oacp(role="agent_name")
def my_agent_function(input_data):
    # Your agent logic here
    return result
```

### Full Signature

```python
@with_oacp(
    role: str,
    contract: Optional[DecisionContract] = None,
    adaptive_prompting: bool = False,
    prompt_adapter: Optional[Callable] = None,
    retry_policy: Optional[RetryPolicy] = None,
    context_manager: Optional[ContextManager] = None,
    trace_writer: Optional[TraceWriter] = None
)
```

### Parameters

#### **role** (required)
- **Type**: `str`
- **Description**: Unique identifier for the agent/node
- **Example**: `"researcher"`, `"fact_checker"`, `"synthesizer"`

```python
@with_oacp(role="content_writer")
def write_content(topic):
    return f"Content about {topic}"
```

#### **contract** (optional)
- **Type**: `DecisionContract`
- **Description**: Defines voting requirements and strategies
- **Default**: No voting required

```python
from oacp import DecisionContract, VotingStrategy

@with_oacp(
    role="reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3,
        timeout_seconds=30,
        required_voters=["expert1", "expert2"]
    )
)
def review_content(content):
    return {"approved": True, "feedback": "Good quality"}
```

#### **adaptive_prompting** (optional)
- **Type**: `bool`
- **Description**: Enable automatic prompt improvement
- **Default**: `False`

```python
@with_oacp(
    role="researcher",
    adaptive_prompting=True  # Enables learning from rejections
)
def research_with_adaptation(query):
    # Prompts automatically improve based on feedback
    return research_result
```

#### **prompt_adapter** (optional)
- **Type**: `Callable[[str, str, str, int, List[str]], str]`
- **Description**: Custom prompt adaptation function
- **Parameters**: `(original_prompt, role, node_id, attempt, rejection_reasons)`

```python
def custom_adapter(original_prompt, role, node_id, attempt, rejection_reasons):
    if "lacks detail" in " ".join(rejection_reasons):
        return f"{original_prompt}\n\nPlease provide more detailed information."
    return original_prompt

@with_oacp(
    role="writer",
    adaptive_prompting=True,
    prompt_adapter=custom_adapter
)
def write_with_custom_adaptation(topic):
    return content
```

#### **retry_policy** (optional)
- **Type**: `RetryPolicy`
- **Description**: Configure retry behavior on consensus failure

```python
from oacp import RetryPolicy

@with_oacp(
    role="analyzer",
    retry_policy=RetryPolicy(
        max_attempts=5,
        backoff_strategy="exponential",
        initial_delay_ms=1000,
        max_delay_ms=30000
    )
)
def analyze_with_retries(data):
    return analysis_result
```

#### **context_manager** (optional)
- **Type**: `ContextManager`
- **Description**: Custom context management

#### **trace_writer** (optional)
- **Type**: `TraceWriter`
- **Description**: Custom trace writer for events

## wrap_node Function

Wraps LangGraph nodes with OACP governance.

### Usage

```python
from langgraph.graph import StateGraph
from oacp import wrap_node, DecisionContract, VotingStrategy

# Create your original node function
def research_node(state):
    # Your research logic
    return {"research_result": "findings"}

# Wrap it with OACP
governed_research = wrap_node(
    research_node,
    role="researcher",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,
        min_votes=2
    )
)

# Use in LangGraph
graph = StateGraph(state_schema)
graph.add_node("research", governed_research)
```

### Parameters

Same as `@with_oacp` decorator, plus:

#### **node_func** (required)
- **Type**: `Callable`
- **Description**: The original LangGraph node function to wrap

## DecisionContract Class

Defines voting requirements and consensus rules.

### Constructor

```python
DecisionContract(
    voting_strategy: VotingStrategy,
    min_votes: int = 1,
    timeout_seconds: int = 30,
    required_voters: Optional[List[str]] = None,
    voter_weights: Optional[Dict[str, float]] = None,
    approval_threshold: float = 0.5,
    metadata: Optional[Dict[str, Any]] = None
)
```

### Parameters

#### **voting_strategy** (required)
- **Type**: `VotingStrategy`
- **Options**: `UNANIMOUS`, `MAJORITY`, `WEIGHTED`

```python
# All voters must approve
VotingStrategy.UNANIMOUS

# More than 50% must approve  
VotingStrategy.MAJORITY

# Weighted voting based on voter_weights
VotingStrategy.WEIGHTED
```

#### **min_votes** (optional)
- **Type**: `int`
- **Default**: `1`
- **Description**: Minimum number of votes required

#### **timeout_seconds** (optional)
- **Type**: `int`
- **Default**: `30`
- **Description**: How long to wait for votes

#### **required_voters** (optional)
- **Type**: `List[str]`
- **Description**: Specific voters that must participate

```python
DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    required_voters=["expert", "reviewer", "validator"]
)
```

#### **voter_weights** (optional)
- **Type**: `Dict[str, float]`
- **Description**: Vote weights for weighted voting

```python
DecisionContract(
    voting_strategy=VotingStrategy.WEIGHTED,
    voter_weights={
        "senior_expert": 2.0,
        "junior_reviewer": 1.0,
        "validator": 1.5
    }
)
```

#### **approval_threshold** (optional)
- **Type**: `float`
- **Default**: `0.5`
- **Description**: Threshold for approval (0.0 to 1.0)

## RetryPolicy Class

Configures retry behavior when consensus fails.

### Constructor

```python
RetryPolicy(
    max_attempts: int = 3,
    backoff_strategy: str = "exponential",
    initial_delay_ms: int = 1000,
    max_delay_ms: int = 30000,
    jitter: bool = True
)
```

### Backoff Strategies

- **`"linear"`**: Fixed delay between retries
- **`"exponential"`**: Exponentially increasing delays
- **`"constant"`**: Same delay for all retries

## Error Handling

OACP decorators can raise several types of errors:

### OacpConsensusError
Raised when consensus cannot be achieved within the specified parameters.

```python
from oacp.errors import OacpConsensusError

try:
    result = governed_function(input_data)
except OacpConsensusError as e:
    print(f"Consensus failed: {e.message}")
    print(f"Run ID: {e.run_id}")
    print(f"Node ID: {e.node_id}")
```

### OacpTimeoutError
Raised when voting times out.

### OacpStorageError
Raised when there are storage-related issues.

## Best Practices

### 1. **Choose Appropriate Voting Strategies**

```python
# For critical decisions requiring full agreement
@with_oacp(
    role="critical_analyzer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,
        min_votes=3
    )
)

# For general quality control
@with_oacp(
    role="content_reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=5
    )
)

# For expert-weighted decisions
@with_oacp(
    role="technical_reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.WEIGHTED,
        voter_weights={"senior": 2.0, "junior": 1.0}
    )
)
```

### 2. **Use Adaptive Prompting Strategically**

```python
# Enable for agents that can benefit from feedback
@with_oacp(
    role="content_generator",
    adaptive_prompting=True,  # Learns from rejections
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3
    )
)
```

### 3. **Configure Reasonable Timeouts**

```python
# Short timeout for simple decisions
DecisionContract(timeout_seconds=10)

# Longer timeout for complex analysis
DecisionContract(timeout_seconds=120)
```

### 4. **Handle Errors Gracefully**

```python
from oacp.errors import OacpConsensusError, OacpTimeoutError

@with_oacp(role="resilient_agent")
def resilient_function(data):
    try:
        return process_data(data)
    except (OacpConsensusError, OacpTimeoutError):
        # Fallback logic
        return fallback_processing(data)
```

## Advanced Usage

### Custom Prompt Adaptation

```python
def domain_specific_adapter(original_prompt, role, node_id, attempt, rejection_reasons):
    """Custom adapter for domain-specific improvements."""
    
    # Analyze rejection patterns
    issues = []
    if any("technical accuracy" in reason for reason in rejection_reasons):
        issues.append("Include more technical details and citations")
    
    if any("clarity" in reason for reason in rejection_reasons):
        issues.append("Use clearer, more accessible language")
    
    if issues:
        improvements = "\n".join(f"- {issue}" for issue in issues)
        return f"{original_prompt}\n\nIMPORTANT IMPROVEMENTS:\n{improvements}"
    
    return original_prompt

@with_oacp(
    role="technical_writer",
    adaptive_prompting=True,
    prompt_adapter=domain_specific_adapter
)
def write_technical_content(topic):
    return generate_content(topic)
```

### Integration with LangGraph

```python
from langgraph.graph import StateGraph
from oacp import wrap_node, DecisionContract, VotingStrategy

def create_governed_workflow():
    # Define state schema
    class WorkflowState(TypedDict):
        input: str
        research: str
        analysis: str
        output: str
    
    # Create graph
    graph = StateGraph(WorkflowState)
    
    # Add governed nodes
    graph.add_node("research", wrap_node(
        research_node,
        role="researcher",
        contract=DecisionContract(
            voting_strategy=VotingStrategy.MAJORITY,
            min_votes=2
        ),
        adaptive_prompting=True
    ))
    
    graph.add_node("analysis", wrap_node(
        analysis_node,
        role="analyzer",
        contract=DecisionContract(
            voting_strategy=VotingStrategy.UNANIMOUS,
            min_votes=3
        )
    ))
    
    # Add edges
    graph.add_edge("research", "analysis")
    graph.set_entry_point("research")
    graph.set_finish_point("analysis")
    
    return graph.compile()
```

## Related Documentation

- [Decision Contracts](contracts.md) - Detailed contract configuration
- [Voting Strategies](../features/voting-strategies.md) - Voting system overview
- [Adaptive Prompting](../features/adaptive-prompting.md) - How adaptation works
- [Examples](../examples/basic-usage.md) - Practical examples
- [Error Handling](../features/error-handling.md) - Error management strategies
