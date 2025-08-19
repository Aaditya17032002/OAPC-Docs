# OACP Overview

**Open Agent Compliance Protocol (OACP)** is a governance layer for LangGraph that transforms multi-agent workflows with democratic decision-making, consensus mechanisms, and comprehensive audit trails.

## What is OACP?

OACP adds a **democratic governance layer** on top of your existing LangGraph workflows. Instead of agents making decisions independently, OACP enables them to:

- **Vote on decisions** before they're executed
- **Reach consensus** using configurable strategies
- **Learn from rejections** through adaptive prompting
- **Maintain audit trails** for complete transparency
- **Handle conflicts** with intelligent retry mechanisms

## Key Benefits

### 🗳️ **Democratic Decision Making**
- Agents vote on each other's outputs
- Multiple voting strategies (unanimous, majority, weighted)
- Configurable thresholds and timeouts
- Conflict resolution mechanisms

### 🧠 **Adaptive Learning**
- Automatic prompt improvement based on rejection feedback
- Pattern recognition without AI overhead
- Context-aware adaptations
- Continuous quality improvement

### 📊 **Complete Transparency**
- Full audit trails of all decisions and votes
- Real-time monitoring and dashboards
- Comprehensive event logging
- Performance analytics

### 🔧 **Easy Integration**
- Simple decorators (`@with_oacp`)
- Works with existing LangGraph workflows
- Multiple storage backends
- Extensive configuration options

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   LangGraph     │    │      OACP       │    │    Storage      │
│   Workflow      │◄──►│   Governance    │◄──►│   Backend       │
│                 │    │     Layer       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Agents      │    │   Voting &      │    │   Audit Trails  │
│   (Your Code)   │    │   Consensus     │    │   & Analytics   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Components

### **Decorators**
- `@with_oacp()` - Add governance to any function
- `wrap_node()` - Integrate with LangGraph nodes
- Configurable contracts and voting requirements

### **Voting System**
- **Unanimous**: All voters must approve
- **Majority**: More than 50% approval required
- **Weighted**: Different vote weights per agent
- **Custom**: Implement your own strategies

### **Storage Backends**
- **File**: JSON-based local storage
- **SQLite**: Lightweight database
- **PostgreSQL**: Production-ready database

### **Adaptive Prompting**
- Automatic prompt enhancement
- Pattern-based improvements
- No AI required for adaptation
- Continuous learning from feedback

## Quick Example

```python
from oacp import with_oacp, DecisionContract, VotingStrategy

@with_oacp(
    role="researcher",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2,
        timeout_seconds=30
    ),
    adaptive_prompting=True
)
def research_topic(topic: str):
    # Your LLM research logic here
    return f"Research findings on {topic}"

# OACP handles voting, consensus, and adaptation automatically
result = research_topic("AI governance")
```

## Use Cases

### **Multi-Agent Research Teams**
- Researchers, fact-checkers, and synthesizers working together
- Democratic quality control
- Continuous improvement through feedback

### **Content Generation Pipelines**
- Writers, editors, and reviewers collaborating
- Quality assurance through voting
- Adaptive improvement over time

### **Decision Support Systems**
- Multiple AI perspectives on complex decisions
- Consensus-based recommendations
- Full audit trails for accountability

### **Quality Assurance Workflows**
- Automated testing and validation
- Multi-stage approval processes
- Performance monitoring and optimization

## Getting Started

1. **Install OACP**
   ```bash
   pip install OACP
   ```

2. **Set up environment**
   ```bash
   oacp env setup
   ```

3. **Add to your code**
   ```python
   from oacp import with_oacp
   
   @with_oacp(role="your_agent")
   def your_function():
       # Your existing code
       pass
   ```

4. **Monitor with dashboard**
   ```bash
   oacp serve
   # Visit http://localhost:8000
   ```

## Next Steps

- [Quick Start Guide](quickstart.md) - Get up and running in minutes
- [API Documentation](api/decorators.md) - Detailed API reference
- [Examples](examples/basic-usage.md) - Practical implementation examples
- [Web Dashboard](web/dashboard.md) - Real-time monitoring

## Community

- **GitHub**: https://github.com/Aaditya17032002/OACP
- **Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Contributing**: Help improve OACP

OACP makes AI governance simple, transparent, and effective. Start building more reliable multi-agent systems today!
