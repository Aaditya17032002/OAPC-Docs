# OACP Quick Start Guide

Get up and running with OACP (Open Agent Compliance Protocol) in just a few minutes. This guide will walk you through installation, basic setup, and your first governed multi-agent workflow.

## Installation

### Prerequisites
- Python 3.10 or higher
- pip package manager

### Install OACP

```bash
# Basic installation
pip install OACP

# With web dashboard support
pip install OACP[web]

# With PostgreSQL support
pip install OACP[postgres]

# Full installation with all features
pip install OACP[web,postgres]
```

### Verify Installation

```bash
# Check OACP CLI
oacp --help

# Check version
python -c "import oacp; print(oacp.__version__)"
```

## Environment Setup

### Automatic Setup

```bash
# Interactive environment setup
oacp env setup

# Global configuration (recommended)
oacp env setup --global
```

This will:
- ✅ Create configuration files
- ✅ Set up storage backend
- ✅ Generate environment templates
- ✅ Configure logging

### Manual Setup

Create a `.env` file in your project directory:

```bash
# OACP Configuration
OACP_STORAGE_URI=file://logs
OACP_LOG_LEVEL=INFO
OACP_ENABLE_ADAPTIVE_PROMPTING=true

# Add your API keys
OPENAI_API_KEY=your_openai_key_here
GOOGLE_API_KEY=your_google_key_here
```

## Your First OACP Agent

### Simple Example

Create a file called `my_first_oacp.py`:

```python
"""
My First OACP Agent - A simple example with voting
"""

import os
from oacp import with_oacp, DecisionContract, VotingStrategy

# Optional: Set up your LLM client
# from openai import OpenAI
# client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@with_oacp(
    role="content_writer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2,
        timeout_seconds=30
    ),
    adaptive_prompting=True
)
def write_content(topic: str):
    """Write content about a given topic with OACP governance."""
    
    # Your content generation logic here
    # For this example, we'll use a simple template
    content = f"""
    # {topic}
    
    This is a comprehensive article about {topic}. 
    
    ## Key Points
    - Important aspect 1
    - Important aspect 2  
    - Important aspect 3
    
    ## Conclusion
    {topic} is an important subject that deserves careful consideration.
    """
    
    return {
        "content": content.strip(),
        "word_count": len(content.split()),
        "confidence": 0.8
    }

if __name__ == "__main__":
    print("🚀 Running My First OACP Agent")
    print("=" * 50)
    
    # Generate content with OACP governance
    result = write_content("Renewable Energy")
    
    print("✅ Content generated successfully!")
    print(f"📝 Word count: {result['word_count']}")
    print(f"🎯 Confidence: {result['confidence']}")
    print("\n📄 Content Preview:")
    print("-" * 30)
    print(result["content"][:200] + "...")
```

### Run Your First Agent

```bash
python my_first_oacp.py
```

**Expected Output:**
```
🚀 Running My First OACP Agent
==================================================
✅ Content generated successfully!
📝 Word count: 42
🎯 Confidence: 0.8

📄 Content Preview:
------------------------------
# Renewable Energy

This is a comprehensive article about Renewable Energy.

## Key Points
- Important aspect 1
- Important aspect 2
- Important aspect 3...
```

## Adding Voters

To see OACP's voting system in action, let's add some voter agents:

### Create Voters

Create `voters.py`:

```python
"""
Voter agents for content review
"""

from oacp import vote, VoteDecision
from oacp.context import get_current_context
import time

def quality_reviewer():
    """A voter that reviews content quality."""
    context = get_current_context()
    run_id = context.run_id
    
    # Simulate review process
    print("🔍 Quality Reviewer: Analyzing content...")
    time.sleep(1)
    
    # Cast vote (in real scenario, this would be based on actual analysis)
    vote(
        run_id=run_id,
        voter_id="quality_reviewer",
        decision=VoteDecision.APPROVE,
        reason="Content structure and flow are good"
    )
    print("✅ Quality Reviewer: APPROVED")

def fact_checker():
    """A voter that checks facts and accuracy."""
    context = get_current_context()
    run_id = context.run_id
    
    print("🔎 Fact Checker: Verifying information...")
    time.sleep(1)
    
    vote(
        run_id=run_id,
        voter_id="fact_checker",
        decision=VoteDecision.APPROVE,
        reason="Information appears accurate and well-sourced"
    )
    print("✅ Fact Checker: APPROVED")

def style_reviewer():
    """A voter that reviews writing style."""
    context = get_current_context()
    run_id = context.run_id
    
    print("✍️ Style Reviewer: Checking writing style...")
    time.sleep(1)
    
    # Sometimes reject for demonstration
    import random
    if random.random() > 0.7:  # 30% chance of rejection
        vote(
            run_id=run_id,
            voter_id="style_reviewer",
            decision=VoteDecision.REJECT,
            reason="Writing style could be more engaging and specific"
        )
        print("❌ Style Reviewer: REJECTED")
    else:
        vote(
            run_id=run_id,
            voter_id="style_reviewer", 
            decision=VoteDecision.APPROVE,
            reason="Writing style is clear and appropriate"
        )
        print("✅ Style Reviewer: APPROVED")

# Start voters in background
if __name__ == "__main__":
    import threading
    
    print("🗳️ Starting voter agents...")
    
    # Start voters in separate threads
    threading.Thread(target=quality_reviewer, daemon=True).start()
    threading.Thread(target=fact_checker, daemon=True).start()
    threading.Thread(target=style_reviewer, daemon=True).start()
    
    print("✅ Voters are active and ready!")
    
    # Keep voters running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Voters stopped")
```

### Run with Voting

1. **Start the voters** (in one terminal):
   ```bash
   python voters.py
   ```

2. **Run your agent** (in another terminal):
   ```bash
   python my_first_oacp.py
   ```

Now you'll see the voting process in action!

## Multi-Agent Workflow

Let's create a more complex workflow with multiple agents:

### Research Team Example

Create `research_team.py`:

```python
"""
Multi-agent research team with OACP governance
"""

from oacp import with_oacp, DecisionContract, VotingStrategy
import time

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
    """Research a topic and gather information."""
    print(f"🔍 Researching: {topic}")
    time.sleep(2)  # Simulate research time
    
    return {
        "topic": topic,
        "findings": [
            f"Key finding 1 about {topic}",
            f"Key finding 2 about {topic}",
            f"Key finding 3 about {topic}"
        ],
        "sources": ["Source A", "Source B", "Source C"],
        "confidence": 0.85
    }

@with_oacp(
    role="fact_checker",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,  # Higher standard for facts
        min_votes=2,
        timeout_seconds=45
    )
)
def verify_facts(research_data):
    """Verify the facts in research data."""
    print(f"🔎 Fact-checking: {research_data['topic']}")
    time.sleep(3)  # Simulate fact-checking time
    
    return {
        "original_research": research_data,
        "verified_facts": research_data["findings"],
        "accuracy_score": 8.5,
        "issues_found": [],
        "status": "verified"
    }

@with_oacp(
    role="synthesizer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3,
        timeout_seconds=60
    )
)
def synthesize_report(verified_data):
    """Create final report from verified research."""
    print(f"📝 Synthesizing report: {verified_data['original_research']['topic']}")
    time.sleep(2)
    
    topic = verified_data['original_research']['topic']
    findings = verified_data['verified_facts']
    
    report = f"""
# Research Report: {topic}

## Executive Summary
This report presents verified research findings on {topic}.

## Key Findings
{chr(10).join(f"- {finding}" for finding in findings)}

## Methodology
Research was conducted using multiple sources and verified through 
our fact-checking process (accuracy: {verified_data['accuracy_score']}/10).

## Conclusion
Based on our analysis, {topic} shows significant importance and 
warrants further investigation.
"""
    
    return {
        "report": report.strip(),
        "quality_score": 9.2,
        "ready_for_publication": True
    }

def run_research_workflow(topic):
    """Run the complete research workflow."""
    print("🚀 Starting Research Team Workflow")
    print("=" * 50)
    
    try:
        # Step 1: Research
        print("\n🔸 Step 1: Research Phase")
        research_result = research_topic(topic)
        print(f"✅ Research completed (confidence: {research_result['confidence']})")
        
        # Step 2: Fact-checking
        print("\n🔸 Step 2: Fact-Checking Phase")
        verified_result = verify_facts(research_result)
        print(f"✅ Fact-check completed (accuracy: {verified_result['accuracy_score']}/10)")
        
        # Step 3: Synthesis
        print("\n🔸 Step 3: Synthesis Phase")
        final_report = synthesize_report(verified_result)
        print(f"✅ Report synthesized (quality: {final_report['quality_score']}/10)")
        
        print("\n" + "=" * 50)
        print("📊 WORKFLOW COMPLETED SUCCESSFULLY")
        print("=" * 50)
        print(f"✅ Ready for Publication: {final_report['ready_for_publication']}")
        print(f"📈 Quality Score: {final_report['quality_score']}/10")
        
        print("\n📋 Final Report Preview:")
        print("-" * 30)
        print(final_report["report"][:300] + "...")
        
        return final_report
        
    except Exception as e:
        print(f"❌ Workflow failed: {e}")
        return None

if __name__ == "__main__":
    # Run the research workflow
    result = run_research_workflow("Artificial Intelligence in Healthcare")
```

### Run the Research Team

```bash
python research_team.py
```

## Monitor with Web Dashboard

Start the web dashboard to monitor your workflows:

```bash
# Start dashboard
oacp serve

# Open in browser
# http://localhost:8000
```

The dashboard will show:
- ✅ Real-time run monitoring
- ✅ Voting patterns and consensus
- ✅ Performance metrics
- ✅ Event timelines

## Project Template

For new projects, use the built-in project generator:

```bash
# Create new project
oacp env init my-ai-project

# Navigate to project
cd my-ai-project

# Install dependencies
pip install -r requirements.txt

# Set up environment
oacp env setup

# Run the example
python main.py
```

## CLI Tools

OACP provides powerful CLI tools for monitoring and management:

```bash
# List recent runs
oacp list

# Show run statistics
oacp stats

# Tail logs for a specific run
oacp logs tail --run-id YOUR_RUN_ID

# Show configuration
oacp config

# Environment status
oacp env status
```

## Next Steps

Now that you have OACP running, explore these advanced features:

### 🎯 **Advanced Features**
- [Voting Strategies](features/voting-strategies.md) - Custom voting logic
- [Adaptive Prompting](features/adaptive-prompting.md) - Automatic improvement
- [Storage Backends](api/storage-backends.md) - Database integration

### 🛠️ **Integration Guides**
- [LangGraph Integration](integrations/langgraph.md) - Deep workflow integration
- [OpenAI Integration](integrations/openai.md) - GPT model integration
- [Custom LLM Integration](integrations/custom-llm.md) - Your own models

### 📚 **Examples**
- [Basic Usage](examples/basic-usage.md) - Simple implementations
- [Research Team](examples/research-team.md) - Multi-agent collaboration
- [Production Deployment](examples/production.md) - Production setup

### 🌐 **Web Dashboard**
- [Dashboard Guide](web/dashboard.md) - Complete monitoring
- [REST API](web/api.md) - Programmatic access
- [WebSocket Streaming](web/websockets.md) - Real-time updates

## Troubleshooting

### Common Issues

#### **Import Errors**
```bash
# Ensure OACP is installed
pip install OACP

# Check installation
python -c "import oacp; print('OACP installed successfully')"
```

#### **No Votes Received**
- Make sure voter agents are running
- Check timeout settings in DecisionContract
- Verify voters are casting votes with correct run_id

#### **Storage Errors**
```bash
# Check storage configuration
oacp config

# Verify storage directory exists and is writable
ls -la logs/

# Reset configuration if needed
oacp env setup --force
```

## Getting Help

- **Documentation**: Browse all docs at `/docs/`
- **Examples**: Check `/docs/examples/` for more use cases
- **Issues**: Report bugs at GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions

**Congratulations!** 🎉 You've successfully set up OACP and created your first governed multi-agent workflow. You're now ready to build more sophisticated AI systems with democratic governance and transparency.
