# Voting Strategies

OACP supports multiple voting strategies to accommodate different decision-making requirements. This guide covers all available strategies, their use cases, and implementation details.

## Overview

Voting strategies determine how consensus is reached among agents in OACP governance workflows. Each strategy has different characteristics suitable for various scenarios:

- **Unanimous**: All required approvers must vote APPROVE
- **Majority**: More than 50% of approvers must vote APPROVE  
- **Weighted**: Votes have different importance levels based on expertise or role

## Strategy Comparison

| Strategy | Speed | Quality | Use Case | Risk Tolerance |
|----------|-------|---------|----------|----------------|
| Unanimous | Slow | Highest | Critical decisions | Very Low |
| Majority | Fast | High | Balanced decisions | Medium |
| Weighted | Medium | High | Expert-driven | Low-Medium |

## Implementation Guide

### Basic Usage

```python
from oacp import with_oacp, decision_contract, vote, VoteDecision

# Define voting strategy in contract
@with_oacp(
    role="content_processor",
    contract=decision_contract(
        required_approvers=["reviewer1", "reviewer2", "reviewer3"],
        strategy="majority",  # Choose your strategy
        timeout_seconds=120
    )
)
def process_content(content: dict) -> dict:
    return {"processed": content}

# Implement voter functions
def reviewer_vote(run_id: str, voter_id: str, content: dict):
    quality_score = evaluate_quality(content)
    
    if quality_score >= 8.0:
        vote(run_id, voter_id, VoteDecision.APPROVE, f"High quality: {quality_score}")
    elif quality_score >= 6.0:
        vote(run_id, voter_id, VoteDecision.ABSTAIN, f"Acceptable: {quality_score}")
    else:
        vote(run_id, voter_id, VoteDecision.REJECT, f"Below standard: {quality_score}")
```

For detailed strategy information, see the [complete voting strategies documentation](features/voting-strategies.md).