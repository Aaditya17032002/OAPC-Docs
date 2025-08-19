# Voting Strategies in OACP

OACP supports multiple voting strategies to handle different types of decisions and consensus requirements. Each strategy has its own use cases, advantages, and configuration options.

## Overview

Voting strategies determine how OACP evaluates votes to reach consensus. The choice of strategy depends on your specific requirements for:

- **Decision criticality** - How important is unanimous agreement?
- **Voter expertise** - Should some voters have more influence?
- **Speed vs. accuracy** - How quickly do you need decisions?
- **Team dynamics** - How many voters are typically available?

## Available Strategies

### 1. Unanimous Voting

**All voters must approve for consensus to be reached.**

```python
from oacp import DecisionContract, VotingStrategy

contract = DecisionContract(
    voting_strategy=VotingStrategy.UNANIMOUS,
    min_votes=3,
    timeout_seconds=30
)
```

#### When to Use
- **Critical decisions** where errors are costly
- **Safety-critical systems** requiring full agreement  
- **High-stakes content** like legal or medical advice
- **Final approval stages** in multi-stage workflows

#### Advantages
- ✅ Maximum quality assurance
- ✅ All perspectives considered
- ✅ High confidence in decisions
- ✅ Clear accountability

#### Disadvantages
- ❌ Can be slow if voters disagree
- ❌ Single dissenter can block progress
- ❌ May discourage innovation
- ❌ Requires all voters to be available

#### Example Use Cases

```python
# Critical safety review
@with_oacp(
    role="safety_reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,
        min_votes=3,
        required_voters=["safety_expert", "engineer", "manager"]
    )
)
def review_safety_protocol(protocol):
    return safety_analysis(protocol)

# Final content approval
@with_oacp(
    role="final_approver", 
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,
        min_votes=2,
        required_voters=["editor", "legal_reviewer"]
    )
)
def approve_publication(content):
    return final_review(content)
```

### 2. Majority Voting

**More than 50% of voters must approve for consensus.**

```python
contract = DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    min_votes=3,
    approval_threshold=0.6  # 60% approval required
)
```

#### When to Use
- **General quality control** in content workflows
- **Balanced decision-making** with multiple perspectives
- **Moderate-risk decisions** where speed matters
- **Democratic processes** with equal voter weight

#### Advantages
- ✅ Faster than unanimous voting
- ✅ Resilient to single dissenter
- ✅ Democratic and fair
- ✅ Good balance of speed and quality

#### Disadvantages
- ❌ Minority opinions may be ignored
- ❌ Less thorough than unanimous
- ❌ Requires odd number of voters for clear majority
- ❌ May not catch edge cases

#### Configuration Options

```python
# Standard majority (>50%)
DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    min_votes=5,
    approval_threshold=0.5
)

# Supermajority (>66%)
DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    min_votes=5,
    approval_threshold=0.66
)

# Simple majority with minimum voters
DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    min_votes=3,
    required_voters=["reviewer1", "reviewer2", "reviewer3", "reviewer4", "reviewer5"]
)
```

#### Example Use Cases

```python
# Content quality review
@with_oacp(
    role="content_reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=5,
        approval_threshold=0.6
    )
)
def review_article(article):
    return quality_check(article)

# Research validation
@with_oacp(
    role="research_validator",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3,
        required_voters=["expert1", "expert2", "expert3", "expert4"]
    )
)
def validate_research(findings):
    return research_review(findings)
```

### 3. Weighted Voting

**Votes are weighted based on voter expertise or authority.**

```python
contract = DecisionContract(
    voting_strategy=VotingStrategy.WEIGHTED,
    min_votes=3,
    voter_weights={
        "senior_expert": 2.0,
        "expert": 1.5,
        "reviewer": 1.0,
        "trainee": 0.5
    },
    approval_threshold=0.6  # 60% of weighted votes
)
```

#### When to Use
- **Expert-driven decisions** where experience matters
- **Hierarchical organizations** with different authority levels
- **Technical reviews** requiring specialized knowledge
- **Quality assurance** with varying reviewer expertise

#### Advantages
- ✅ Leverages expertise appropriately
- ✅ Reflects real-world authority structures
- ✅ Can be faster than equal-weight voting
- ✅ Accounts for voter competency

#### Disadvantages
- ❌ May marginalize junior voices
- ❌ Requires careful weight calibration
- ❌ Can create bias toward senior opinions
- ❌ Complex to configure initially

#### Weight Configuration Strategies

```python
# Experience-based weights
voter_weights = {
    "10_year_expert": 3.0,
    "5_year_expert": 2.0,
    "2_year_expert": 1.5,
    "junior": 1.0,
    "trainee": 0.5
}

# Role-based weights
voter_weights = {
    "domain_expert": 2.5,
    "technical_lead": 2.0,
    "senior_developer": 1.5,
    "developer": 1.0,
    "intern": 0.5
}

# Certification-based weights
voter_weights = {
    "certified_expert": 2.0,
    "experienced_reviewer": 1.5,
    "standard_reviewer": 1.0
}
```

#### Example Use Cases

```python
# Technical architecture review
@with_oacp(
    role="architecture_reviewer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.WEIGHTED,
        voter_weights={
            "principal_architect": 3.0,
            "senior_architect": 2.0,
            "architect": 1.5,
            "senior_engineer": 1.0
        },
        approval_threshold=0.7
    )
)
def review_architecture(design):
    return architecture_analysis(design)

# Medical diagnosis validation
@with_oacp(
    role="diagnosis_validator",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.WEIGHTED,
        voter_weights={
            "specialist": 3.0,
            "attending_physician": 2.0,
            "resident": 1.0
        },
        min_votes=3
    )
)
def validate_diagnosis(symptoms, tests):
    return medical_analysis(symptoms, tests)
```

## Advanced Configuration

### Dynamic Voter Weights

You can implement dynamic weight calculation based on context:

```python
def calculate_dynamic_weights(context, voters):
    """Calculate weights based on voter expertise in specific domain."""
    weights = {}
    domain = context.get("domain", "general")
    
    for voter in voters:
        base_weight = 1.0
        
        # Adjust based on domain expertise
        if voter.expertise.get(domain, 0) > 5:
            base_weight *= 2.0
        elif voter.expertise.get(domain, 0) > 2:
            base_weight *= 1.5
        
        # Adjust based on recent performance
        if voter.recent_accuracy > 0.9:
            base_weight *= 1.2
        elif voter.recent_accuracy < 0.7:
            base_weight *= 0.8
        
        weights[voter.id] = base_weight
    
    return weights

# Use in contract
contract = DecisionContract(
    voting_strategy=VotingStrategy.WEIGHTED,
    voter_weights=calculate_dynamic_weights(context, available_voters)
)
```

### Hybrid Strategies

Combine multiple strategies for complex scenarios:

```python
def hybrid_voting_strategy(votes, contract, context):
    """Custom hybrid strategy combining unanimous and majority."""
    
    # First, try unanimous among senior voters
    senior_votes = [v for v in votes if v.voter_weight >= 2.0]
    if len(senior_votes) >= 2 and all(v.decision == VoteDecision.APPROVE for v in senior_votes):
        return True
    
    # Fallback to majority among all voters
    approvals = sum(1 for v in votes if v.decision == VoteDecision.APPROVE)
    return approvals > len(votes) / 2

# Register custom strategy
register_voting_strategy("hybrid", hybrid_voting_strategy)
```

### Conditional Voting

Implement voting requirements that change based on context:

```python
def create_conditional_contract(risk_level, content_type):
    """Create contract based on risk assessment."""
    
    if risk_level == "high" or content_type == "legal":
        return DecisionContract(
            voting_strategy=VotingStrategy.UNANIMOUS,
            min_votes=3,
            required_voters=["expert", "legal", "manager"]
        )
    elif risk_level == "medium":
        return DecisionContract(
            voting_strategy=VotingStrategy.MAJORITY,
            min_votes=3,
            approval_threshold=0.66
        )
    else:
        return DecisionContract(
            voting_strategy=VotingStrategy.MAJORITY,
            min_votes=2,
            approval_threshold=0.5
        )

@with_oacp(
    role="content_processor",
    contract=lambda context: create_conditional_contract(
        context.get("risk_level"), 
        context.get("content_type")
    )
)
def process_content(content, metadata):
    return content_processing(content, metadata)
```

## Best Practices

### 1. **Choose Strategy Based on Requirements**

```python
# High-risk decisions: Unanimous
if decision_risk == "high":
    strategy = VotingStrategy.UNANIMOUS
    min_votes = 3

# Medium-risk: Supermajority  
elif decision_risk == "medium":
    strategy = VotingStrategy.MAJORITY
    approval_threshold = 0.66

# Low-risk: Simple majority
else:
    strategy = VotingStrategy.MAJORITY
    approval_threshold = 0.5
```

### 2. **Configure Appropriate Timeouts**

```python
# Quick decisions
DecisionContract(timeout_seconds=10)

# Complex analysis
DecisionContract(timeout_seconds=120)

# Critical reviews
DecisionContract(timeout_seconds=300)
```

### 3. **Balance Voter Requirements**

```python
# Too few voters - unreliable
DecisionContract(min_votes=1)  # ❌ Not recommended

# Good balance
DecisionContract(min_votes=3)  # ✅ Good for most cases

# Too many voters - slow
DecisionContract(min_votes=10) # ❌ May be too slow
```

### 4. **Monitor and Adjust**

```python
# Track voting patterns
def analyze_voting_patterns():
    stats = get_voting_statistics()
    
    if stats.avg_consensus_time > 60:
        print("Consider lowering approval threshold")
    
    if stats.consensus_rate < 0.8:
        print("Consider adjusting voting strategy")
    
    if stats.voter_participation < 0.9:
        print("Consider reducing required voters")
```

## Troubleshooting

### Common Issues

#### **Consensus Never Reached**
```python
# Problem: Too strict requirements
DecisionContract(
    voting_strategy=VotingStrategy.UNANIMOUS,
    min_votes=10,  # Too many required
    timeout_seconds=10  # Too short
)

# Solution: Relax requirements
DecisionContract(
    voting_strategy=VotingStrategy.MAJORITY,
    min_votes=5,
    timeout_seconds=60
)
```

#### **Voters Not Participating**
```python
# Problem: Required voters not available
DecisionContract(
    required_voters=["expert1", "expert2", "expert3"]  # May not all be online
)

# Solution: Use min_votes instead
DecisionContract(
    min_votes=2,  # Any 2 voters can participate
    voter_weights={"expert1": 2.0, "expert2": 2.0, "expert3": 1.0}
)
```

#### **Weighted Voting Imbalances**
```python
# Problem: Weights too extreme
voter_weights = {
    "expert": 10.0,  # Too high
    "junior": 0.1    # Too low
}

# Solution: More balanced weights
voter_weights = {
    "expert": 2.0,
    "junior": 1.0
}
```

## Performance Considerations

### Voting Strategy Performance

| Strategy | Speed | Quality | Scalability | Complexity |
|----------|-------|---------|-------------|------------|
| Unanimous | Slow | High | Poor | Low |
| Majority | Medium | Medium | Good | Low |
| Weighted | Medium | High | Good | Medium |

### Optimization Tips

1. **Use appropriate timeouts** - Balance speed vs. thoroughness
2. **Limit required voters** - Fewer dependencies = faster decisions
3. **Cache voter weights** - Avoid recalculating weights repeatedly
4. **Monitor metrics** - Track consensus rates and adjust strategies

## Related Documentation

- [Decision Contracts](../api/contracts.md) - Contract configuration details
- [Voting System](../architecture/voting-system.md) - Technical implementation
- [Examples](../examples/custom-voting.md) - Practical voting examples
- [Monitoring](../web/dashboard.md) - Track voting performance
