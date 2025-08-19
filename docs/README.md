# OACP Documentation Hub

Welcome to the comprehensive documentation for **OACP (Open Agent Compliance Protocol)** - the governance layer for LangGraph that adds democratic decision-making, consensus mechanisms, and audit trails to multi-agent workflows.

## 🚀 **Quick Navigation**

### **Getting Started**
- [📖 Overview](overview.md) - What is OACP and why use it?
- [⚡ Quick Start](quickstart.md) - Get running in 5 minutes
- [💾 Installation](installation.md) - Complete installation guide
- [⚙️ Configuration](configuration.md) - Environment setup

### **Core Features**
- [🗳️ Voting Strategies](features/voting-strategies.md) - Democratic decision-making
- [🧠 Adaptive Prompting](features/adaptive-prompting.md) - AI learns from feedback
- [📊 Audit Trails](features/audit-trails.md) - Complete transparency
- [🤝 Consensus Mechanisms](features/consensus.md) - How agents agree

### **API Reference**
- [🎯 Decorators](api/decorators.md) - @with_oacp and function governance
- [📋 Contracts](api/contracts.md) - DecisionContract configuration
- [💾 Storage Backends](api/storage-backends.md) - File, SQLite, PostgreSQL
- [📡 Events System](api/events.md) - Comprehensive event tracking

### **Web Dashboard & API**
- [🌐 Dashboard](web/dashboard.md) - Real-time monitoring interface
- [🔌 REST API](web/api.md) - Complete API reference
- [⚡ WebSocket](web/websockets.md) - Real-time streaming
- [💻 CLI Tools](cli/commands.md) - Command-line interface

### **Examples & Tutorials**
- [📝 Basic Usage](examples/basic-usage.md) - Simple implementations
- [🔬 Research Team](examples/research-team.md) - Multi-agent workflows
- [🎮 Flappy Bird Sim](examples/flappy-bird.md) - Game design validation
- [🏭 Production Deployment](examples/production.md) - Enterprise setup

### **Integration Guides**
- [🔗 LangGraph Integration](integrations/langgraph.md) - Deep workflow integration
- [🤖 OpenAI Integration](integrations/openai.md) - GPT models
- [🧠 Anthropic Integration](integrations/anthropic.md) - Claude models
- [🔮 Google AI Integration](integrations/google-ai.md) - Gemini models

## 🎯 **What Makes OACP Special?**

### **Democratic AI Governance**
```python
@with_oacp(
    role="content_writer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3
    )
)
def write_content(topic):
    return generate_content(topic)  # Agents vote before approval
```

### **Adaptive Learning**
- **No AI required** for adaptation - uses smart pattern matching
- **Learns from rejections** to improve future prompts
- **Democratic feedback** drives continuous improvement

### **Complete Transparency**
- **Full audit trails** of all decisions and votes
- **Real-time monitoring** with web dashboard
- **Event-driven architecture** for comprehensive logging

### **Easy Integration**
- **Simple decorators** - add `@with_oacp` to any function
- **Works with existing code** - no major refactoring needed
- **Multiple storage backends** - file, SQLite, PostgreSQL

## 🔥 **Popular Use Cases**

### **Multi-Agent Research Teams**
```python
# Researcher → Fact-Checker → Synthesizer
@with_oacp(role="researcher", adaptive_prompting=True)
def research(topic): ...

@with_oacp(role="fact_checker", contract=unanimous_voting)
def verify(research): ...

@with_oacp(role="synthesizer", contract=majority_voting)  
def synthesize(verified_research): ...
```

### **Content Review Pipelines**
- Writers create content
- Reviewers vote on quality
- System learns from feedback
- Adaptive prompts improve over time

### **Quality Assurance Workflows**
- Code analysis with multiple reviewers
- Security scanning with expert oversight
- Performance validation through consensus

### **Decision Support Systems**
- Risk assessment by multiple AI agents
- Benefit analysis with weighted voting
- Final recommendations with expert review

## 🌐 **Web Dashboard Features**

### **Real-time Monitoring**
- Live workflow execution tracking
- Voting patterns and consensus analysis
- Performance metrics and statistics
- Event timeline visualization

### **REST API**
```bash
# Get recent runs
GET /api/v1/runs

# Get run details
GET /api/v1/runs/{run_id}

# Get global statistics  
GET /api/v1/stats

# WebSocket for real-time updates
WS /ws
```

### **Interactive Documentation**
- Swagger UI at `/docs`
- Try endpoints directly in browser
- Complete API schema with examples

## 💻 **CLI Tools**

```bash
# Environment setup
oacp env setup --global

# Project initialization  
oacp env init my-project

# Start web dashboard
oacp serve --host 0.0.0.0 --port 8000

# Monitor workflows
oacp list                    # List recent runs
oacp stats                   # Show statistics
oacp logs tail --run-id 123  # Stream logs

# Configuration management
oacp config                  # Show current config
oacp env status             # Environment status
```

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Agent 1   │  │   Agent 2   │  │   Agent 3   │        │
│  │@with_oacp   │  │@with_oacp   │  │@with_oacp   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   OACP Governance Layer                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Voting    │  │  Consensus  │  │  Adaptive   │        │
│  │   System    │  │  Mechanism  │  │  Prompting  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Storage & Monitoring                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │    File     │  │   SQLite    │  │ PostgreSQL  │        │
│  │   Storage   │  │  Database   │  │  Database   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │     Web     │  │   REST      │  │  WebSocket  │        │
│  │  Dashboard  │  │    API      │  │  Streaming  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 📊 **Key Benefits**

### **For Developers**
- ✅ **Simple Integration** - Just add decorators
- ✅ **Flexible Voting** - Multiple strategies available
- ✅ **Rich Monitoring** - Web dashboard and CLI tools
- ✅ **Production Ready** - Scalable storage backends

### **For Teams**
- ✅ **Democratic Decisions** - All agents have a voice
- ✅ **Quality Assurance** - Multi-stage review processes
- ✅ **Continuous Learning** - Adaptive prompting improves over time
- ✅ **Full Transparency** - Complete audit trails

### **For Organizations**
- ✅ **Governance** - Control over AI decision-making
- ✅ **Compliance** - Audit trails for regulatory requirements
- ✅ **Risk Management** - Consensus prevents single points of failure
- ✅ **Scalability** - Enterprise-grade storage and monitoring

## 🚀 **Getting Started in 3 Steps**

### **1. Install OACP**
```bash
pip install OACP[web]
```

### **2. Set Up Environment**
```bash
oacp env setup --global
```

### **3. Add to Your Code**
```python
from oacp import with_oacp, DecisionContract, VotingStrategy

@with_oacp(
    role="your_agent",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2
    ),
    adaptive_prompting=True
)
def your_function(input_data):
    # Your existing logic
    return result
```

### **4. Monitor with Dashboard**
```bash
oacp serve
# Visit http://localhost:8000
```

## 📚 **Documentation Structure**

This documentation is organized for different audiences:

### **👨‍💻 For Developers**
- Start with [Quick Start](quickstart.md)
- Explore [API Reference](api/decorators.md)
- Try [Basic Examples](examples/basic-usage.md)

### **🏗️ For Architects**  
- Read [Architecture Overview](architecture/overview.md)
- Study [Storage Backends](api/storage-backends.md)
- Plan [Production Deployment](examples/production.md)

### **👥 For Teams**
- Understand [Voting Strategies](features/voting-strategies.md)
- Learn [Consensus Mechanisms](features/consensus.md)
- Set up [Web Dashboard](web/dashboard.md)

### **🏢 For Organizations**
- Review [Security Model](architecture/security.md)
- Plan [Integration Strategy](integrations/langgraph.md)
- Consider [Use Cases](use-cases/multi-agent.md)

## 🤝 **Contributing**

OACP is open source and welcomes contributions:

- **🐛 Report Bugs**: [GitHub Issues](https://github.com/Aaditya17032002/OACP/issues)
- **💡 Request Features**: [GitHub Discussions](https://github.com/Aaditya17032002/OACP/discussions)
- **📖 Improve Docs**: Submit pull requests for documentation
- **🔧 Contribute Code**: Follow the [Contributing Guide](development/contributing.md)

## 📞 **Support & Community**

- **📖 Documentation**: Complete guides and API reference
- **💬 Discussions**: Ask questions and share ideas
- **🐛 Issues**: Report bugs and request features
- **📧 Contact**: Reach out through GitHub

## 🎯 **What's Next?**

### **Immediate Next Steps**
1. **[Install OACP](installation.md)** - Get up and running
2. **[Try Examples](examples/basic-usage.md)** - See it in action
3. **[Start Dashboard](web/dashboard.md)** - Monitor your workflows
4. **[Join Community](https://github.com/Aaditya17032002/OACP)** - Connect with other users

### **Advanced Topics**
- **[Custom Voting Strategies](examples/custom-voting.md)**
- **[Production Deployment](examples/production.md)**
- **[Performance Optimization](troubleshooting/performance.md)**
- **[Integration Patterns](integrations/langgraph.md)**

---

**Ready to build more reliable, transparent, and democratic AI systems?**

🚀 **[Get Started Now](quickstart.md)** | 📚 **[Browse Examples](examples/)** | 🌐 **[Try Dashboard](web/dashboard.md)**

---

*OACP - Making AI governance simple, transparent, and effective.*
