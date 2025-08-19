# Voting Strategies

OACP supports multiple voting strategies to accommodate different decision-making requirements. Each strategy has its own characteristics and use cases.

## Overview

Voting strategies determine how consensus is reached among agents:

- **Unanimous**: All voters must approve
- **Majority**: More than 50% must approve  
- **Weighted**: Votes have different importance levels

## Unanimous Voting

### Description

All required approvers must vote APPROVE for consensus to be achieved. A single REJECT or ABSTAIN vote blocks consensus.

### Configuration

```python
from oacp import decision_contract

contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3"],
    strategy="unanimous",
    timeout_seconds=120
)
```

### Use Cases

- **Critical Decisions**: High-stakes outputs requiring complete agreement
- **Compliance Requirements**: Regulatory or legal decisions
- **Quality Assurance**: When zero tolerance for errors is needed
- **Security Reviews**: Security-sensitive operations

### Example

```python
from oacp import with_oacp, decision_contract, vote, VoteDecision

@with_oacp(
    role="security_processor",
    contract=decision_contract(
        required_approvers=["security_agent", "compliance_agent", "legal_agent"],
        strategy="unanimous"
    )
)
def process_sensitive_data(data: dict) -> dict:
    return {"processed": data, "security_level": "high"}

# All agents must approve
def security_agent_vote(run_id: str, data: dict):
    if security_check(data):
        vote(run_id, "security_agent", VoteDecision.APPROVE, "Security validated")
    else:
        vote(run_id, "security_agent", VoteDecision.REJECT, "Security risks found")

def compliance_agent_vote(run_id: str, data: dict):
    if compliance_check(data):
        vote(run_id, "compliance_agent", VoteDecision.APPROVE, "Compliance verified")
    else:
        vote(run_id, "compliance_agent", VoteDecision.REJECT, "Compliance issues")

def legal_agent_vote(run_id: str, data: dict):
    if legal_check(data):
        vote(run_id, "legal_agent", VoteDecision.APPROVE, "Legal requirements met")
    else:
        vote(run_id, "legal_agent", VoteDecision.REJECT, "Legal concerns identified")
```

### Advantages

- **Highest Confidence**: Complete agreement ensures high-quality decisions
- **Risk Minimization**: Single dissenter can prevent bad decisions
- **Comprehensive Review**: All perspectives must be satisfied

### Disadvantages

- **Slow Process**: Can be time-consuming to achieve full consensus
- **Blocking Risk**: One unavailable or disagreeing agent blocks progress
- **Conservative Bias**: May lead to overly cautious decisions

## Majority Voting

### Description

More than 50% of required approvers must vote APPROVE. Abstentions are not counted toward the total.

### Configuration

```python
contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3", "agent4", "agent5"],
    strategy="majority",
    timeout_seconds=60
)
```

### Use Cases

- **Balanced Decisions**: When perfect consensus isn't critical
- **Time-Sensitive Operations**: Faster decision-making needed
- **Democratic Processes**: Equal voice for all participants
- **Content Review**: Multiple reviewers with differing opinions

### Example

```python
@with_oacp(
    role="content_reviewer",
    contract=decision_contract(
        required_approvers=["reviewer1", "reviewer2", "reviewer3", "reviewer4", "reviewer5"],
        strategy="majority"
    )
)
def review_content(content: dict) -> dict:
    return {"reviewed": content, "status": "approved"}

# 3 out of 5 approvals needed (majority)
def reviewer_vote(run_id: str, reviewer_id: str, content: dict):
    score = evaluate_content(content)
    
    if score >= 7.0:
        vote(run_id, reviewer_id, VoteDecision.APPROVE, f"Quality score: {score}")
    elif score >= 5.0:
        vote(run_id, reviewer_id, VoteDecision.ABSTAIN, f"Neutral score: {score}")
    else:
        vote(run_id, reviewer_id, VoteDecision.REJECT, f"Low quality: {score}")
```

### Advantages

- **Faster Decisions**: Doesn't require full consensus
- **Resilient to Outliers**: Single dissenter doesn't block progress
- **Democratic**: Equal weight for all voters
- **Practical**: Good balance of speed and thoroughness

### Disadvantages

- **May Ignore Minorities**: Valid concerns from minority can be overruled
- **Less Thorough**: May not catch all issues
- **Polarization Risk**: Can create winner/loser dynamics

## Weighted Voting

### Description

Votes have different importance levels based on agent expertise, role, or other factors. Consensus requires weighted approval exceeding 50% of total weight.

### Configuration

```python
contract = decision_contract(
    required_approvers=["senior_expert", "expert", "junior1", "junior2"],
    strategy="weighted",
    weights={
        "senior_expert": 0.4,
        "expert": 0.3,
        "junior1": 0.15,
        "junior2": 0.15
    }
)
```

### Use Cases

- **Hierarchical Organizations**: Different authority levels
- **Expertise-Based Decisions**: Subject matter experts have more influence
- **Quality Control**: Senior reviewers have more weight
- **Resource Allocation**: Stakeholders have proportional influence

### Example

```python
@with_oacp(
    role="research_validator",
    contract=decision_contract(
        required_approvers=["senior_researcher", "researcher", "assistant1", "assistant2"],
        strategy="weighted",
        weights={
            "senior_researcher": 0.5,    # 50% weight
            "researcher": 0.3,           # 30% weight  
            "assistant1": 0.1,           # 10% weight
            "assistant2": 0.1            # 10% weight
        }
    )
)
def validate_research(research: dict) -> dict:
    return {"validated": research, "confidence": "high"}

# Different voting weights based on expertise
def senior_researcher_vote(run_id: str, research: dict):
    # Senior vote carries 50% weight
    if thorough_review(research):
        vote(run_id, "senior_researcher", VoteDecision.APPROVE, 
             "Comprehensive review passed")

def researcher_vote(run_id: str, research: dict):
    # Regular researcher vote carries 30% weight
    if peer_review(research):
        vote(run_id, "researcher", VoteDecision.APPROVE, 
             "Peer review approved")

def assistant_vote(run_id: str, assistant_id: str, research: dict):
    # Assistant votes carry 10% weight each
    if basic_check(research):
        vote(run_id, assistant_id, VoteDecision.APPROVE, 
             "Basic validation passed")
```

### Advantages

- **Expertise Recognition**: More qualified agents have greater influence
- **Efficient**: Can reach decisions with key expert approval
- **Flexible**: Weights can be adjusted based on context
- **Quality Focus**: Emphasizes expert judgment

### Disadvantages

- **Power Imbalance**: Can discourage participation from lower-weighted agents
- **Weight Calibration**: Requires careful tuning of weights
- **Complexity**: More complex to understand and implement
- **Bias Risk**: May perpetuate existing hierarchies

## Custom Voting Strategies

### Implementing Custom Strategies

```python
from oacp.contracts import VotingStrategy
from oacp.events import VoteDecision

class CustomVotingStrategy:
    @staticmethod
    def evaluate_custom(
        votes: dict[str, VoteDecision],
        required_approvers: list[str],
        weights: dict[str, float] | None = None,
        **kwargs
    ) -> tuple[bool, str]:
        """Custom voting logic implementation."""
        
        # Example: Require at least 2 approvals and no rejections
        approvals = sum(1 for v in votes.values() if v == VoteDecision.APPROVE)
        rejections = sum(1 for v in votes.values() if v == VoteDecision.REJECT)
        
        if rejections > 0:
            return False, f"Rejections not allowed: {rejections} found"
        
        if approvals >= 2:
            return True, f"Minimum approvals met: {approvals}"
        
        return False, f"Insufficient approvals: {approvals} (need 2+)"

# Register custom strategy
VotingStrategy.register("custom", CustomVotingStrategy.evaluate_custom)

# Use custom strategy
contract = decision_contract(
    required_approvers=["agent1", "agent2", "agent3"],
    strategy="custom"
)
```

### Advanced Custom Strategy

```python
class AdaptiveVotingStrategy:
    @staticmethod
    def evaluate_adaptive(
        votes: dict[str, VoteDecision],
        required_approvers: list[str],
        weights: dict[str, float] | None = None,
        context: dict = None
    ) -> tuple[bool, str]:
        """Adaptive strategy based on context."""
        
        # Get context information
        priority = context.get("priority", "normal") if context else "normal"
        confidence_threshold = context.get("confidence_threshold", 0.7) if context else 0.7
        
        approvals = sum(1 for v in votes.values() if v == VoteDecision.APPROVE)
        total_votes = len(votes)
        
        if priority == "high":
            # High priority requires unanimous approval
            if approvals == total_votes and total_votes == len(required_approvers):
                return True, "High priority: unanimous approval achieved"
            return False, "High priority: unanimous approval required"
        
        elif priority == "low":
            # Low priority requires single approval
            if approvals >= 1:
                return True, f"Low priority: approval received ({approvals})"
            return False, "Low priority: at least one approval needed"
        
        else:
            # Normal priority uses confidence-based threshold
            confidence = approvals / total_votes if total_votes > 0 else 0
            if confidence >= confidence_threshold:
                return True, f"Confidence threshold met: {confidence:.2%}"
            return False, f"Insufficient confidence: {confidence:.2%} < {confidence_threshold:.2%}"

# Register and use adaptive strategy
VotingStrategy.register("adaptive", AdaptiveVotingStrategy.evaluate_adaptive)
```

## Strategy Selection Guidelines

### Decision Matrix

| Requirement | Unanimous | Majority | Weighted | Custom |
|-------------|-----------|----------|----------|---------|
| High Quality | ✓✓✓ | ✓✓ | ✓✓✓ | ✓✓ |
| Fast Decisions | ✗ | ✓✓✓ | ✓✓ | ✓✓ |
| Expert Input | ✓ | ✓ | ✓✓✓ | ✓✓✓ |
| Risk Tolerance | Low | Medium | Low-Medium | Variable |
| Complexity | Low | Low | Medium | High |

### Selection Criteria

#### Choose Unanimous When:
- Zero tolerance for errors
- Regulatory compliance required
- High-stakes decisions
- Small number of voters (≤5)
- Trust in all voters is essential

#### Choose Majority When:
- Balanced decision-making needed
- Time constraints exist
- Democratic process desired
- Large number of voters (5+)
- Some disagreement is acceptable

#### Choose Weighted When:
- Expertise levels vary significantly
- Hierarchical organization
- Quality over speed priority
- Clear authority structure exists
- Specialized knowledge required

#### Choose Custom When:
- Standard strategies don't fit
- Complex business rules
- Adaptive behavior needed
- Integration with external systems
- Unique organizational requirements

## Monitoring and Analytics

### Strategy Performance

```python
from oacp.analytics import VotingAnalytics

analytics = VotingAnalytics()

# Analyze strategy effectiveness
stats = analytics.get_strategy_stats("unanimous", days=30)
print(f"Success rate: {stats.success_rate:.2%}")
print(f"Average decision time: {stats.avg_decision_time}s")
print(f"Timeout rate: {stats.timeout_rate:.2%}")

# Compare strategies
comparison = analytics.compare_strategies(["unanimous", "majority", "weighted"])
for strategy, metrics in comparison.items():
    print(f"{strategy}: {metrics.success_rate:.2%} success, {metrics.avg_time}s avg time")
```

### Voting Patterns

```python
# Analyze voter behavior
voter_stats = analytics.get_voter_patterns("agent1", days=30)
print(f"Participation rate: {voter_stats.participation_rate:.2%}")
print(f"Approval rate: {voter_stats.approval_rate:.2%}")
print(f"Average response time: {voter_stats.avg_response_time}s")

# Identify bottlenecks
bottlenecks = analytics.identify_bottlenecks()
for voter, delay in bottlenecks.items():
    print(f"{voter}: {delay}s average delay")
```

## Best Practices

### Strategy Design

1. **Match Strategy to Use Case**: Choose based on requirements
2. **Consider Voter Count**: More voters favor majority over unanimous
3. **Balance Speed vs Quality**: Unanimous is thorough but slow
4. **Plan for Failures**: Have timeout and fallback mechanisms
5. **Test Strategies**: Validate with real scenarios

### Implementation

1. **Clear Documentation**: Document voting criteria clearly
2. **Reasonable Timeouts**: Balance thoroughness with efficiency
3. **Fallback Plans**: Handle missing voters gracefully
4. **Monitor Performance**: Track strategy effectiveness
5. **Iterate and Improve**: Adjust based on outcomes

### Voter Guidelines

1. **Timely Responses**: Vote within timeout periods
2. **Clear Reasoning**: Provide actionable feedback
3. **Consistent Standards**: Apply criteria consistently
4. **Constructive Criticism**: Focus on improvement
5. **Professional Conduct**: Maintain respectful discourse

## Troubleshooting

### Common Issues

#### Strategy Not Working
```python
# Debug voting strategy
from oacp.debug import debug_voting_strategy

result = debug_voting_strategy(run_id="your_run_id")
print(f"Strategy: {result.strategy}")
print(f"Votes: {result.votes}")
print(f"Result: {result.consensus}")
print(f"Reason: {result.reason}")
```

#### Timeout Issues
```python
# Increase timeout for complex decisions
contract = decision_contract(
    required_approvers=["agent1", "agent2"],
    strategy="majority",
    timeout_seconds=300  # 5 minutes
)
```

#### Weight Calibration
```python
# Test weight distribution
from oacp.testing import test_weights

weights = {"senior": 0.6, "junior1": 0.2, "junior2": 0.2}
result = test_weights(weights, required_approvers=["senior", "junior1", "junior2"])
print(f"Weight distribution valid: {result.valid}")
print(f"Potential issues: {result.warnings}")
```
