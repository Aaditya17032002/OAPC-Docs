# Decorators API Reference

OACP provides decorators to add governance and compliance features to your functions and LangGraph nodes.

## @with_oacp

The primary decorator for adding OACP governance to functions.

### Signature

```python
def with_oacp(
    role: str,
    invariants: list[str] | None = None,
    contract: DecisionContract | None = None,
    log_inputs: bool = True,
    log_outputs: bool = True,
    retry_policy: RetryPolicy | None = None,
    redact_keys: list[str] | None = None,
    adaptive_prompting: bool = True,
    prompt_adapter: Callable[[str, str, str, int, list[str]], str] | None = None,
) -> Callable[[F], F]
```

### Parameters

#### role: str
**Required.** Unique identifier for the agent/node role.

```python
@with_oacp(role="content_analyzer")
def analyze_content(text: str) -> dict:
    return {"analysis": "detailed_analysis"}
```

#### invariants: list[str] | None = None
**Optional.** List of invariants this node should maintain.

```python
@with_oacp(
    role="data_processor",
    invariants=["data_integrity", "privacy_compliance", "accuracy"]
)
def process_data(data: dict) -> dict:
    return {"processed": data}
```

#### contract: DecisionContract | None = None
**Optional.** Decision contract defining voting requirements.

```python
from oacp import decision_contract

@with_oacp(
    role="critical_processor",
    contract=decision_contract(
        required_approvers=["reviewer1", "reviewer2"],
        strategy="unanimous",
        timeout_seconds=120
    )
)
def process_critical_data(data: dict) -> dict:
    return {"result": "processed"}
```

#### log_inputs: bool = True
**Optional.** Whether to log function inputs.

```python
@with_oacp(
    role="secure_processor",
    log_inputs=False  # Don't log sensitive inputs
)
def process_sensitive_data(sensitive_data: dict) -> dict:
    return {"status": "processed"}
```

#### log_outputs: bool = True
**Optional.** Whether to log function outputs.

```python
@with_oacp(
    role="output_generator",
    log_outputs=False  # Don't log sensitive outputs
)
def generate_private_report(data: dict) -> dict:
    return {"private_report": "confidential_data"}
```

#### retry_policy: RetryPolicy | None = None
**Optional.** Retry policy for handling failures.

```python
from oacp.routing import RetryPolicy

@with_oacp(
    role="resilient_processor",
    retry_policy=RetryPolicy(
        max_attempts=3,
        base_delay=1.0,
        max_delay=10.0,
        exponential_base=2.0
    )
)
def unreliable_operation(data: dict) -> dict:
    return {"result": "success"}
```

#### redact_keys: list[str] | None = None
**Optional.** Keys to redact from logs (overrides global config).

```python
@with_oacp(
    role="auth_processor",
    redact_keys=["password", "token", "secret", "key"]
)
def process_auth_data(auth_data: dict) -> dict:
    return {"authenticated": True}
```

#### adaptive_prompting: bool = True
**Optional.** Enable adaptive prompting based on feedback.

```python
@with_oacp(
    role="content_generator",
    adaptive_prompting=True
)
def generate_content(prompt: str, context: dict) -> dict:
    return {"content": "generated_content"}
```

#### prompt_adapter: Callable | None = None
**Optional.** Custom prompt adaptation function.

```python
def custom_adapter(original_prompt, rejection_reason, voter_id, attempt_count, suggestions):
    return f"{original_prompt}\n\nImproved based on: {rejection_reason}"

@with_oacp(
    role="adaptive_generator",
    prompt_adapter=custom_adapter
)
def generate_with_custom_adaptation(prompt: str) -> dict:
    return {"content": "adapted_content"}
```

## wrap_node

Convenience function for wrapping LangGraph nodes.

### Signature

```python
def wrap_node(func: Callable, **oacp_kwargs) -> Callable
```

### Parameters

- **func**: Function to wrap
- **oacp_kwargs**: Arguments to pass to @with_oacp

### Usage

```python
from oacp import wrap_node
from langgraph.graph import StateGraph

def my_agent_function(state: dict) -> dict:
    return {"result": "processed"}

# Wrap for use in LangGraph
wrapped_function = wrap_node(
    my_agent_function,
    role="my_agent",
    contract=decision_contract(
        required_approvers=["reviewer"],
        strategy="majority"
    )
)

# Add to graph
workflow = StateGraph(MyState)
workflow.add_node("my_agent", wrapped_function)
```

## Advanced Usage Examples

### Multi-Stage Workflow

```python
from oacp import with_oacp, decision_contract
from langgraph.graph import StateGraph

# Stage 1: Data collection (no governance)
@with_oacp(role="data_collector")
def collect_data(query: str) -> dict:
    return {"raw_data": "collected_data"}

# Stage 2: Analysis (peer review)
@with_oacp(
    role="data_analyzer",
    contract=decision_contract(
        required_approvers=["peer_analyst"],
        strategy="majority"
    )
)
def analyze_data(raw_data: dict) -> dict:
    return {"analysis": "data_insights"}

# Stage 3: Report generation (unanimous approval)
@with_oacp(
    role="report_generator",
    contract=decision_contract(
        required_approvers=["analyst", "reviewer", "approver"],
        strategy="unanimous",
        timeout_seconds=300
    ),
    invariants=["accuracy", "completeness", "clarity"]
)
def generate_report(analysis: dict) -> dict:
    return {"final_report": "comprehensive_report"}

# Create workflow
def create_workflow():
    workflow = StateGraph(MyState)
    workflow.add_node("collect", collect_data)
    workflow.add_node("analyze", analyze_data)
    workflow.add_node("report", generate_report)
    
    workflow.add_edge("collect", "analyze")
    workflow.add_edge("analyze", "report")
    
    return workflow.compile()
```

### Conditional Governance

```python
from oacp import with_oacp, current_context

def get_contract_for_sensitivity(data: dict) -> DecisionContract | None:
    """Return contract based on data sensitivity."""
    sensitivity = data.get("sensitivity_level", "low")
    
    if sensitivity == "high":
        return decision_contract(
            required_approvers=["security", "compliance", "legal"],
            strategy="unanimous",
            timeout_seconds=600
        )
    elif sensitivity == "medium":
        return decision_contract(
            required_approvers=["security", "compliance"],
            strategy="majority",
            timeout_seconds=300
        )
    else:
        return None  # No governance for low sensitivity

@with_oacp(
    role="data_processor",
    contract=lambda data: get_contract_for_sensitivity(data)
)
def process_sensitive_data(data: dict) -> dict:
    return {"processed": data, "status": "completed"}
```

### Async Function Support

```python
import asyncio
from oacp import with_oacp

@with_oacp(
    role="async_processor",
    contract=decision_contract(
        required_approvers=["async_reviewer"],
        strategy="majority"
    )
)
async def async_processing_function(data: dict) -> dict:
    """Async function with OACP governance."""
    await asyncio.sleep(1)  # Simulate async work
    return {"async_result": "processed"}

# Usage
async def main():
    result = await async_processing_function({"input": "data"})
    print(result)
```

### Error Handling and Retry

```python
from oacp import with_oacp
from oacp.routing import RetryPolicy
from oacp.errors import OacpConsensusError

@with_oacp(
    role="resilient_processor",
    contract=decision_contract(
        required_approvers=["validator"],
        strategy="majority"
    ),
    retry_policy=RetryPolicy(
        max_attempts=5,
        base_delay=2.0,
        max_delay=30.0,
        exponential_base=2.0
    )
)
def resilient_function(data: dict) -> dict:
    """Function with comprehensive error handling."""
    try:
        # Process data
        result = complex_processing(data)
        return {"result": result, "status": "success"}
    except Exception as e:
        # Log error for debugging
        logger.error(f"Processing failed: {e}")
        raise
```

### Custom Context Access

```python
from oacp import with_oacp, current_context

@with_oacp(role="context_aware_processor")
def context_aware_function(data: dict) -> dict:
    """Function that uses OACP context."""
    ctx = current_context()
    
    # Access context information
    run_id = ctx.run_id
    node_id = ctx.node_id
    role = ctx.role
    
    # Use context in processing
    result = {
        "processed_data": data,
        "run_id": run_id,
        "processed_by": role,
        "metadata": ctx.metadata
    }
    
    return result
```

## Integration Patterns

### With FastAPI

```python
from fastapi import FastAPI
from oacp import with_oacp, decision_contract

app = FastAPI()

@app.post("/process")
@with_oacp(
    role="api_processor",
    contract=decision_contract(
        required_approvers=["api_validator"],
        strategy="majority"
    )
)
def process_api_request(data: dict) -> dict:
    return {"api_result": "processed", "data": data}
```

### With Celery

```python
from celery import Celery
from oacp import with_oacp

app = Celery('oacp_tasks')

@app.task
@with_oacp(
    role="background_processor",
    contract=decision_contract(
        required_approvers=["task_validator"],
        strategy="majority"
    )
)
def background_task(data: dict) -> dict:
    return {"task_result": "completed", "data": data}
```

### With Class Methods

```python
from oacp import with_oacp

class DataProcessor:
    @with_oacp(
        role="class_processor",
        contract=decision_contract(
            required_approvers=["method_validator"],
            strategy="majority"
        )
    )
    def process(self, data: dict) -> dict:
        """Class method with OACP governance."""
        return {"processed": data, "processor": self.__class__.__name__}
    
    @staticmethod
    @with_oacp(role="static_processor")
    def static_process(data: dict) -> dict:
        """Static method with OACP governance."""
        return {"static_result": data}
    
    @classmethod
    @with_oacp(role="class_method_processor")
    def class_process(cls, data: dict) -> dict:
        """Class method with OACP governance."""
        return {"class_result": data, "class": cls.__name__}
```

## Best Practices

### Role Naming

```python
# Good: Descriptive, specific roles
@with_oacp(role="user_data_validator")
@with_oacp(role="financial_report_generator")
@with_oacp(role="security_compliance_checker")

# Avoid: Generic, unclear roles
@with_oacp(role="processor")  # Too generic
@with_oacp(role="agent1")     # Not descriptive
```

### Contract Design

```python
# Good: Appropriate contracts for use case
@with_oacp(
    role="critical_decision_maker",
    contract=decision_contract(
        required_approvers=["domain_expert", "security_officer"],
        strategy="unanimous",  # Critical decisions need full consensus
        timeout_seconds=300    # Allow time for thorough review
    )
)

# Good: Simple majority for routine tasks
@with_oacp(
    role="content_reviewer",
    contract=decision_contract(
        required_approvers=["reviewer1", "reviewer2", "reviewer3"],
        strategy="majority",   # Faster decisions for routine work
        timeout_seconds=60     # Reasonable timeout
    )
)
```

### Logging Configuration

```python
# Good: Selective logging based on sensitivity
@with_oacp(
    role="payment_processor",
    log_inputs=False,      # Don't log sensitive payment data
    log_outputs=True,      # Log processing results
    redact_keys=["card_number", "cvv", "account_number"]
)

# Good: Full logging for debugging
@with_oacp(
    role="debug_processor",
    log_inputs=True,       # Log everything for debugging
    log_outputs=True,
    invariants=["debug_mode"]
)
```

## Common Patterns

### Validation Chain

```python
# Chain of validation with increasing strictness
@with_oacp(role="basic_validator")
def basic_validation(data: dict) -> dict:
    return {"validated": data, "level": "basic"}

@with_oacp(
    role="advanced_validator",
    contract=decision_contract(
        required_approvers=["senior_validator"],
        strategy="majority"
    )
)
def advanced_validation(data: dict) -> dict:
    return {"validated": data, "level": "advanced"}

@with_oacp(
    role="expert_validator",
    contract=decision_contract(
        required_approvers=["expert1", "expert2", "expert3"],
        strategy="unanimous"
    )
)
def expert_validation(data: dict) -> dict:
    return {"validated": data, "level": "expert"}
```

### Fallback Processing

```python
from oacp.routing import RetryPolicy

@with_oacp(
    role="primary_processor",
    retry_policy=RetryPolicy(max_attempts=1)  # Single attempt
)
def primary_processing(data: dict) -> dict:
    if can_process_primary(data):
        return {"result": "primary_processed"}
    else:
        raise ValueError("Primary processing failed")

@with_oacp(role="fallback_processor")
def fallback_processing(data: dict) -> dict:
    return {"result": "fallback_processed", "note": "Used fallback"}

def robust_processing(data: dict) -> dict:
    try:
        return primary_processing(data)
    except Exception:
        return fallback_processing(data)
```

## Troubleshooting

### Common Issues

#### Decorator Order
```python
# Correct: OACP decorator should be outermost
@with_oacp(role="my_processor")
@some_other_decorator
def my_function(data: dict) -> dict:
    return data

# Incorrect: Other decorators outside OACP
@some_other_decorator
@with_oacp(role="my_processor")  # May not work correctly
def my_function(data: dict) -> dict:
    return data
```

#### Context Issues
```python
# Correct: Access context within decorated function
@with_oacp(role="context_user")
def function_with_context(data: dict) -> dict:
    ctx = current_context()  # Works inside decorated function
    return {"context_id": ctx.run_id}

# Incorrect: Access context outside decorated function
def function_without_context(data: dict) -> dict:
    ctx = current_context()  # RuntimeError: No context available
    return {"context_id": ctx.run_id}
```

#### Async/Sync Mismatch
```python
# Correct: Async decorator with async function
@with_oacp(role="async_processor")
async def async_function(data: dict) -> dict:
    await some_async_operation()
    return {"result": "async"}

# Correct: Sync decorator with sync function
@with_oacp(role="sync_processor")
def sync_function(data: dict) -> dict:
    return {"result": "sync"}
```
