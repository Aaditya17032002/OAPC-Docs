# Basic OACP Usage Examples

This page provides practical examples of using OACP in different scenarios, from simple single-agent governance to complex multi-agent workflows.

## Simple Agent with Voting

The most basic OACP usage involves adding governance to a single function:

```python
from oacp import with_oacp, DecisionContract, VotingStrategy

@with_oacp(
    role="content_generator",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2,
        timeout_seconds=30
    )
)
def generate_content(topic: str):
    """Generate content with democratic oversight."""
    return f"Generated content about {topic}"

# Usage
result = generate_content("AI Ethics")
print(result)
```

## Content Review Pipeline

A practical content review system with multiple reviewers:

```python
from oacp import with_oacp, DecisionContract, VotingStrategy, vote, VoteDecision
from oacp.context import get_current_context
import threading
import time

# Content generator with governance
@with_oacp(
    role="writer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=3,
        timeout_seconds=60
    ),
    adaptive_prompting=True
)
def write_article(topic: str, target_audience: str):
    """Write an article with governance oversight."""
    
    article = f"""
# {topic}

## Introduction
This article covers {topic} for {target_audience}.

## Main Content
Key points about {topic}:
- Point 1: Important aspect
- Point 2: Critical consideration  
- Point 3: Future implications

## Conclusion
{topic} is crucial for {target_audience} to understand.
"""
    
    return {
        "content": article.strip(),
        "word_count": len(article.split()),
        "readability_score": 7.5,
        "target_audience": target_audience
    }

# Reviewer agents
def grammar_reviewer():
    """Reviews grammar and language quality."""
    while True:
        context = get_current_context()
        if context and context.run_id:
            time.sleep(2)  # Simulate review time
            
            vote(
                run_id=context.run_id,
                voter_id="grammar_reviewer",
                decision=VoteDecision.APPROVE,
                reason="Grammar and language are acceptable"
            )
            break
        time.sleep(0.1)

def technical_reviewer():
    """Reviews technical accuracy."""
    while True:
        context = get_current_context()
        if context and context.run_id:
            time.sleep(3)  # Simulate technical review
            
            vote(
                run_id=context.run_id,
                voter_id="technical_reviewer", 
                decision=VoteDecision.APPROVE,
                reason="Technical content is accurate"
            )
            break
        time.sleep(0.1)

def audience_reviewer():
    """Reviews content for target audience appropriateness."""
    while True:
        context = get_current_context()
        if context and context.run_id:
            time.sleep(1)  # Quick audience check
            
            # Sometimes reject for demonstration
            import random
            if random.random() > 0.8:  # 20% rejection rate
                vote(
                    run_id=context.run_id,
                    voter_id="audience_reviewer",
                    decision=VoteDecision.REJECT,
                    reason="Content not well-suited for target audience"
                )
            else:
                vote(
                    run_id=context.run_id,
                    voter_id="audience_reviewer",
                    decision=VoteDecision.APPROVE,
                    reason="Content appropriate for target audience"
                )
            break
        time.sleep(0.1)

# Run the content pipeline
def run_content_pipeline():
    # Start reviewers in background
    threading.Thread(target=grammar_reviewer, daemon=True).start()
    threading.Thread(target=technical_reviewer, daemon=True).start()
    threading.Thread(target=audience_reviewer, daemon=True).start()
    
    print("🚀 Content Review Pipeline")
    print("=" * 40)
    
    # Generate content with governance
    result = write_article("Machine Learning Basics", "beginners")
    
    print("✅ Article approved by reviewers!")
    print(f"📝 Word count: {result['word_count']}")
    print(f"📊 Readability: {result['readability_score']}/10")
    print(f"🎯 Audience: {result['target_audience']}")

if __name__ == "__main__":
    run_content_pipeline()
```

## Quality Assurance Workflow

A QA system with different validation stages:

```python
from oacp import with_oacp, DecisionContract, VotingStrategy
import random

@with_oacp(
    role="code_analyzer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,  # High standard for code
        min_votes=2,
        timeout_seconds=45
    )
)
def analyze_code(code: str, language: str):
    """Analyze code quality with strict governance."""
    
    # Simulate code analysis
    issues = []
    if "TODO" in code:
        issues.append("Contains TODO comments")
    if len(code.split('\n')) > 100:
        issues.append("Function too long")
    
    score = max(1, 10 - len(issues) * 2)
    
    return {
        "language": language,
        "lines_of_code": len(code.split('\n')),
        "quality_score": score,
        "issues": issues,
        "recommendation": "approve" if score >= 7 else "needs_work"
    }

@with_oacp(
    role="security_scanner",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2,
        timeout_seconds=30
    )
)
def scan_security(code: str):
    """Scan code for security issues."""
    
    security_issues = []
    if "password" in code.lower() and "=" in code:
        security_issues.append("Potential hardcoded password")
    if "sql" in code.lower() and "+" in code:
        security_issues.append("Potential SQL injection risk")
    
    risk_level = "high" if security_issues else "low"
    
    return {
        "risk_level": risk_level,
        "issues": security_issues,
        "secure": len(security_issues) == 0
    }

@with_oacp(
    role="performance_analyzer", 
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2
    )
)
def analyze_performance(code: str):
    """Analyze code performance characteristics."""
    
    # Simple performance heuristics
    performance_score = 8
    if "for" in code and "for" in code:  # Nested loops
        performance_score -= 2
    if len(code) > 1000:  # Long functions
        performance_score -= 1
    
    return {
        "performance_score": max(1, performance_score),
        "optimized": performance_score >= 7,
        "suggestions": ["Consider caching", "Optimize loops"] if performance_score < 7 else []
    }

def quality_assurance_workflow(code_sample):
    """Run complete QA workflow."""
    print("🔍 Quality Assurance Workflow")
    print("=" * 40)
    
    try:
        # Step 1: Code Quality Analysis
        print("\n🔸 Step 1: Code Quality Analysis")
        quality_result = analyze_code(code_sample, "python")
        print(f"✅ Quality Score: {quality_result['quality_score']}/10")
        
        # Step 2: Security Scan
        print("\n🔸 Step 2: Security Scan")
        security_result = scan_security(code_sample)
        print(f"🔒 Risk Level: {security_result['risk_level']}")
        
        # Step 3: Performance Analysis
        print("\n🔸 Step 3: Performance Analysis")
        performance_result = analyze_performance(code_sample)
        print(f"⚡ Performance Score: {performance_result['performance_score']}/10")
        
        # Overall assessment
        overall_score = (
            quality_result['quality_score'] + 
            performance_result['performance_score'] + 
            (10 if security_result['secure'] else 5)
        ) / 3
        
        print("\n" + "=" * 40)
        print("📊 QA RESULTS")
        print("=" * 40)
        print(f"🎯 Overall Score: {overall_score:.1f}/10")
        print(f"✅ Ready for Production: {'Yes' if overall_score >= 7 else 'No'}")
        
        return {
            "quality": quality_result,
            "security": security_result,
            "performance": performance_result,
            "overall_score": overall_score
        }
        
    except Exception as e:
        print(f"❌ QA Workflow failed: {e}")
        return None

# Example code to analyze
sample_code = """
def process_user_data(users):
    results = []
    for user in users:
        if user.active:
            processed = {
                'id': user.id,
                'name': user.name,
                'score': calculate_score(user)
            }
            results.append(processed)
    return results

def calculate_score(user):
    base_score = user.activity_level * 10
    bonus = user.premium_member * 5
    return base_score + bonus
"""

if __name__ == "__main__":
    quality_assurance_workflow(sample_code)
```

## Research Collaboration

Multi-agent research system with different expertise levels:

```python
from oacp import with_oacp, DecisionContract, VotingStrategy

@with_oacp(
    role="data_collector",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2
    )
)
def collect_research_data(topic: str, sources: list):
    """Collect research data from various sources."""
    
    # Simulate data collection
    data = {
        "topic": topic,
        "sources_consulted": sources,
        "data_points": [
            f"Data point 1 about {topic}",
            f"Data point 2 about {topic}",
            f"Data point 3 about {topic}"
        ],
        "collection_date": "2024-01-15",
        "reliability_score": 8.2
    }
    
    return data

@with_oacp(
    role="data_analyzer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.WEIGHTED,
        min_votes=3,
        voter_weights={
            "senior_analyst": 2.0,
            "analyst": 1.5,
            "junior_analyst": 1.0
        }
    )
)
def analyze_research_data(research_data):
    """Analyze collected research data."""
    
    analysis = {
        "topic": research_data["topic"],
        "key_findings": [
            "Finding 1: Significant correlation found",
            "Finding 2: Unexpected pattern identified", 
            "Finding 3: Strong evidence supports hypothesis"
        ],
        "confidence_level": 0.85,
        "methodology": "Statistical analysis with cross-validation",
        "limitations": ["Small sample size", "Limited time frame"]
    }
    
    return analysis

@with_oacp(
    role="report_writer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.UNANIMOUS,  # High standard for final report
        min_votes=2,
        required_voters=["peer_reviewer", "supervisor"]
    ),
    adaptive_prompting=True
)
def write_research_report(analysis_data):
    """Write final research report."""
    
    report = f"""
# Research Report: {analysis_data['topic']}

## Executive Summary
This report presents the findings of our research on {analysis_data['topic']}.

## Methodology
{analysis_data['methodology']}

## Key Findings
{chr(10).join(f"- {finding}" for finding in analysis_data['key_findings'])}

## Confidence and Limitations
- Confidence Level: {analysis_data['confidence_level']*100:.1f}%
- Limitations: {', '.join(analysis_data['limitations'])}

## Recommendations
Based on our analysis, we recommend further investigation into the identified patterns.
"""
    
    return {
        "report": report.strip(),
        "publication_ready": True,
        "peer_reviewed": False  # Will be set by voters
    }

def research_collaboration_workflow():
    """Run collaborative research workflow."""
    print("🔬 Research Collaboration Workflow")
    print("=" * 45)
    
    # Define research parameters
    research_topic = "Impact of Remote Work on Productivity"
    data_sources = ["Academic papers", "Industry reports", "Survey data"]
    
    try:
        # Step 1: Data Collection
        print("\n🔸 Step 1: Data Collection")
        research_data = collect_research_data(research_topic, data_sources)
        print(f"✅ Data collected (reliability: {research_data['reliability_score']}/10)")
        
        # Step 2: Data Analysis  
        print("\n🔸 Step 2: Data Analysis")
        analysis = analyze_research_data(research_data)
        print(f"✅ Analysis completed (confidence: {analysis['confidence_level']*100:.1f}%)")
        
        # Step 3: Report Writing
        print("\n🔸 Step 3: Report Writing")
        final_report = write_research_report(analysis)
        print(f"✅ Report completed (ready: {final_report['publication_ready']})")
        
        print("\n" + "=" * 45)
        print("📄 RESEARCH COMPLETED")
        print("=" * 45)
        print("📊 Report Preview:")
        print("-" * 30)
        print(final_report["report"][:300] + "...")
        
        return final_report
        
    except Exception as e:
        print(f"❌ Research workflow failed: {e}")
        return None

if __name__ == "__main__":
    research_collaboration_workflow()
```

## Decision Support System

AI-powered decision support with multiple perspectives:

```python
from oacp import with_oacp, DecisionContract, VotingStrategy
import json

@with_oacp(
    role="risk_assessor",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2
    )
)
def assess_risk(decision_context: dict):
    """Assess risks associated with a decision."""
    
    risks = []
    risk_score = 3  # Base risk score
    
    if decision_context.get("financial_impact", 0) > 100000:
        risks.append("High financial impact")
        risk_score += 2
    
    if decision_context.get("timeline") == "urgent":
        risks.append("Rushed timeline increases risk")
        risk_score += 1
    
    if not decision_context.get("stakeholder_approval"):
        risks.append("Lack of stakeholder buy-in")
        risk_score += 1
    
    return {
        "risk_level": min(10, risk_score),
        "identified_risks": risks,
        "mitigation_strategies": [
            "Implement phased rollout",
            "Establish monitoring systems",
            "Create rollback plan"
        ]
    }

@with_oacp(
    role="benefit_analyzer",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.MAJORITY,
        min_votes=2
    )
)
def analyze_benefits(decision_context: dict):
    """Analyze potential benefits of a decision."""
    
    benefits = []
    benefit_score = 5  # Base benefit score
    
    if decision_context.get("efficiency_gain", 0) > 20:
        benefits.append("Significant efficiency improvement")
        benefit_score += 2
    
    if decision_context.get("cost_savings", 0) > 50000:
        benefits.append("Substantial cost savings")
        benefit_score += 2
    
    if decision_context.get("strategic_alignment"):
        benefits.append("Aligns with strategic goals")
        benefit_score += 1
    
    return {
        "benefit_score": min(10, benefit_score),
        "identified_benefits": benefits,
        "quantified_value": decision_context.get("cost_savings", 0) + decision_context.get("revenue_potential", 0)
    }

@with_oacp(
    role="decision_recommender",
    contract=DecisionContract(
        voting_strategy=VotingStrategy.WEIGHTED,
        min_votes=3,
        voter_weights={
            "executive": 2.0,
            "domain_expert": 1.8,
            "stakeholder": 1.2
        }
    )
)
def recommend_decision(risk_assessment: dict, benefit_analysis: dict, context: dict):
    """Make final decision recommendation."""
    
    risk_score = risk_assessment["risk_level"]
    benefit_score = benefit_analysis["benefit_score"]
    
    # Decision logic
    net_score = benefit_score - risk_score
    
    if net_score >= 3:
        recommendation = "STRONGLY_APPROVE"
    elif net_score >= 1:
        recommendation = "APPROVE"
    elif net_score >= -1:
        recommendation = "CONDITIONAL_APPROVE"
    else:
        recommendation = "REJECT"
    
    return {
        "recommendation": recommendation,
        "confidence": min(0.95, abs(net_score) / 10 + 0.5),
        "net_score": net_score,
        "reasoning": f"Benefits ({benefit_score}/10) vs Risks ({risk_score}/10)",
        "conditions": [
            "Implement monitoring system",
            "Regular progress reviews",
            "Stakeholder communication plan"
        ] if "CONDITIONAL" in recommendation else []
    }

def decision_support_workflow(decision_context):
    """Run decision support analysis."""
    print("🤔 Decision Support System")
    print("=" * 40)
    print(f"📋 Decision: {decision_context.get('decision_title', 'Untitled')}")
    print()
    
    try:
        # Step 1: Risk Assessment
        print("🔸 Step 1: Risk Assessment")
        risk_result = assess_risk(decision_context)
        print(f"⚠️ Risk Level: {risk_result['risk_level']}/10")
        
        # Step 2: Benefit Analysis
        print("\n🔸 Step 2: Benefit Analysis")
        benefit_result = analyze_benefits(decision_context)
        print(f"✅ Benefit Score: {benefit_result['benefit_score']}/10")
        
        # Step 3: Final Recommendation
        print("\n🔸 Step 3: Decision Recommendation")
        recommendation = recommend_decision(risk_result, benefit_result, decision_context)
        print(f"🎯 Recommendation: {recommendation['recommendation']}")
        print(f"🔍 Confidence: {recommendation['confidence']*100:.1f}%")
        
        print("\n" + "=" * 40)
        print("📊 DECISION ANALYSIS COMPLETE")
        print("=" * 40)
        print(f"💡 Recommendation: {recommendation['recommendation']}")
        print(f"📈 Net Score: {recommendation['net_score']}")
        print(f"🧠 Reasoning: {recommendation['reasoning']}")
        
        if recommendation['conditions']:
            print("\n📋 Conditions:")
            for condition in recommendation['conditions']:
                print(f"  - {condition}")
        
        return recommendation
        
    except Exception as e:
        print(f"❌ Decision analysis failed: {e}")
        return None

# Example decision context
example_decision = {
    "decision_title": "Implement New CRM System",
    "financial_impact": 150000,
    "timeline": "normal",
    "stakeholder_approval": True,
    "efficiency_gain": 25,  # percentage
    "cost_savings": 75000,  # annual
    "revenue_potential": 200000,  # annual
    "strategic_alignment": True
}

if __name__ == "__main__":
    decision_support_workflow(example_decision)
```

## Running the Examples

### Prerequisites

1. **Install OACP**:
   ```bash
   pip install OACP
   ```

2. **Set up environment**:
   ```bash
   oacp env setup
   ```

### Running Individual Examples

```bash
# Basic content pipeline
python content_pipeline.py

# Quality assurance workflow  
python qa_workflow.py

# Research collaboration
python research_workflow.py

# Decision support system
python decision_support.py
```

### Monitoring with Dashboard

Start the web dashboard to monitor all examples:

```bash
# Start dashboard
oacp serve

# View at http://localhost:8000
```

## Key Takeaways

These examples demonstrate:

1. **Flexible Voting Strategies**: Different scenarios require different consensus mechanisms
2. **Adaptive Prompting**: Agents learn from feedback over time
3. **Multi-Stage Workflows**: Complex processes benefit from governance at each stage
4. **Role-Based Expertise**: Weighted voting reflects real-world authority structures
5. **Error Handling**: Robust systems handle consensus failures gracefully

## Next Steps

- Explore [Advanced Examples](research-team.md) for more complex scenarios
- Learn about [Custom Voting Strategies](custom-voting.md) 
- Set up [Production Deployment](production.md) for real-world usage
- Monitor performance with the [Web Dashboard](../web/dashboard.md)
