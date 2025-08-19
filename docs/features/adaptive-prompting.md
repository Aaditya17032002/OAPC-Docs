# Adaptive Prompting

OACP's adaptive prompting feature automatically improves prompts based on rejection feedback from voting agents. The system learns from failures and adapts prompts to increase success rates over time.

## Overview

Adaptive prompting enables:
- **Automatic Prompt Improvement**: Prompts evolve based on feedback
- **Learning from Failures**: Rejection reasons inform adaptations
- **Performance Tracking**: Monitor improvement over time
- **Context-Aware Adaptations**: Different adaptations for different contexts

## How It Works

1. **Baseline Prompt**: Start with an initial prompt
2. **Execution & Voting**: Agents vote on outputs
3. **Rejection Analysis**: System analyzes rejection feedback
4. **Prompt Adaptation**: Modify prompt based on feedback
5. **Performance Tracking**: Monitor success rate improvements

## Basic Usage

### Enable Adaptive Prompting

```python
from oacp import with_oacp, decision_contract

@with_oacp(
    role="content_generator",
    adaptive_prompting=True,  # Enable adaptive prompting
    contract=decision_contract(
        required_approvers=["quality_reviewer", "style_reviewer"],
        strategy="majority"
    )
)
def generate_content(prompt: str, topic: str) -> dict:
    """Generate content with adaptive prompting."""
    # Your LLM call here
    response = llm.generate(prompt.format(topic=topic))
    return {"content": response, "topic": topic}
```

### Recording Rejection Feedback

```python
from oacp import vote, VoteDecision

def quality_reviewer(run_id: str, content: dict):
    """Review content quality and provide feedback."""
    quality_score = assess_quality(content["content"])
    
    if quality_score >= 8.0:
        vote(
            run_id=run_id,
            voter_id="quality_reviewer",
            decision=VoteDecision.APPROVE,
            reason="High quality content"
        )
    else:
        vote(
            run_id=run_id,
            voter_id="quality_reviewer", 
            decision=VoteDecision.REJECT,
            reason="Content lacks depth and specific examples",
            fix_suggestions=[
                "Add more specific examples",
                "Increase technical depth",
                "Include relevant statistics"
            ]
        )
```

## Advanced Configuration

### Custom Prompt Adapter

```python
from oacp import with_oacp

def custom_prompt_adapter(
    original_prompt: str,
    rejection_reason: str,
    voter_id: str,
    attempt_count: int,
    fix_suggestions: list[str]
) -> str:
    """Custom prompt adaptation logic."""
    
    # Analyze rejection reason
    if "lacks depth" in rejection_reason.lower():
        return original_prompt + "\n\nProvide detailed technical analysis with specific examples."
    
    if "unclear" in rejection_reason.lower():
        return original_prompt + "\n\nUse clear, simple language and define technical terms."
    
    if fix_suggestions:
        suggestions_text = "\n".join(f"- {s}" for s in fix_suggestions)
        return f"{original_prompt}\n\nAddress these specific points:\n{suggestions_text}"
    
    # Default adaptation
    return original_prompt + f"\n\nImprove based on feedback: {rejection_reason}"

@with_oacp(
    role="adaptive_writer",
    adaptive_prompting=True,
    prompt_adapter=custom_prompt_adapter
)
def adaptive_content_generator(prompt: str, context: dict) -> dict:
    """Generate content with custom adaptation."""
    adapted_prompt = get_adapted_prompt(prompt, context)
    response = llm.generate(adapted_prompt)
    return {"content": response}
```

### LLM Integration with Adaptation

```python
from oacp.llm_integration import create_adaptive_llm_function

# Create adaptive LLM function
adaptive_llm = create_adaptive_llm_function(
    llm_client=your_llm_client,
    base_prompt="Write a comprehensive article about {topic}",
    adaptation_strategy="feedback_based"
)

@with_oacp(
    role="article_writer",
    adaptive_prompting=True,
    contract=decision_contract(
        required_approvers=["editor", "fact_checker"],
        strategy="unanimous"
    )
)
def write_article(topic: str) -> dict:
    """Write article with adaptive prompting."""
    content = adaptive_llm(topic=topic)
    return {"article": content, "topic": topic}
```

## Adaptation Strategies

### Feedback-Based Adaptation

Adapts prompts based on specific rejection feedback:

```python
from oacp.adaptive_prompting import FeedbackBasedAdapter

adapter = FeedbackBasedAdapter(
    feedback_patterns={
        "lacks examples": "Include specific, real-world examples",
        "too technical": "Use simpler language and explain technical terms",
        "insufficient detail": "Provide more comprehensive coverage",
        "factual errors": "Verify all facts and include sources"
    }
)

@with_oacp(
    role="content_creator",
    adaptive_prompting=True,
    prompt_adapter=adapter.adapt
)
def create_content(prompt: str, data: dict) -> dict:
    return {"content": generate_with_llm(prompt, data)}
```

### Performance-Based Adaptation

Adapts based on success rate metrics:

```python
from oacp.adaptive_prompting import PerformanceBasedAdapter

adapter = PerformanceBasedAdapter(
    success_threshold=0.8,  # 80% success rate target
    adaptation_rules={
        "low_success": "Be more specific and detailed in requirements",
        "high_rejection": "Focus on quality and accuracy",
        "timeout_issues": "Provide clearer, more actionable instructions"
    }
)
```

### Context-Aware Adaptation

Different adaptations for different contexts:

```python
from oacp.adaptive_prompting import ContextAwareAdapter

def context_adapter(prompt: str, context: dict, feedback: dict) -> str:
    """Adapt prompt based on context and feedback."""
    
    content_type = context.get("type", "general")
    audience = context.get("audience", "general")
    
    if content_type == "technical":
        if "too complex" in feedback.get("reason", ""):
            return prompt + "\n\nExplain technical concepts in simple terms."
        else:
            return prompt + "\n\nProvide detailed technical analysis."
    
    elif content_type == "marketing":
        if "not engaging" in feedback.get("reason", ""):
            return prompt + "\n\nUse engaging, persuasive language."
        else:
            return prompt + "\n\nFocus on benefits and value proposition."
    
    return prompt + f"\n\nImprove for {audience} audience."

@with_oacp(
    role="contextual_writer",
    adaptive_prompting=True,
    prompt_adapter=context_adapter
)
def contextual_content(prompt: str, context: dict) -> dict:
    return {"content": generate_content(prompt, context)}
```

## Monitoring and Analytics

### Adaptation Statistics

```python
from oacp.adaptive_prompting import get_adaptation_statistics

# Get adaptation stats for a specific role
stats = get_adaptation_statistics(role="content_generator", days=30)

print(f"Total adaptations: {stats.total_adaptations}")
print(f"Success rate improvement: {stats.success_rate_improvement:.2%}")
print(f"Average attempts before success: {stats.avg_attempts}")
print(f"Most common rejection reasons: {stats.top_rejection_reasons}")
```

### Performance Tracking

```python
from oacp.analytics import AdaptivePromptingAnalytics

analytics = AdaptivePromptingAnalytics()

# Track performance over time
performance = analytics.get_performance_trend("article_writer", days=90)
for date, metrics in performance.items():
    print(f"{date}: {metrics.success_rate:.2%} success, {metrics.adaptations} adaptations")

# Get best performing adaptations
best_adaptations = analytics.get_top_adaptations("content_creator", limit=10)
for adaptation in best_adaptations:
    print(f"Pattern: {adaptation.pattern}")
    print(f"Success rate: {adaptation.success_rate:.2%}")
    print(f"Usage count: {adaptation.usage_count}")
```

### Feedback Analysis

```python
from oacp.analytics import FeedbackAnalyzer

analyzer = FeedbackAnalyzer()

# Analyze rejection patterns
patterns = analyzer.analyze_rejection_patterns("content_generator")
print("Common rejection reasons:")
for reason, frequency in patterns.items():
    print(f"- {reason}: {frequency} occurrences")

# Get improvement suggestions
suggestions = analyzer.get_improvement_suggestions("article_writer")
print("Suggested improvements:")
for suggestion in suggestions:
    print(f"- {suggestion.description} (confidence: {suggestion.confidence:.2%})")
```

## Integration Examples

### With OpenAI

```python
import openai
from oacp import with_oacp, create_adaptive_llm_function

# Create adaptive OpenAI function
adaptive_openai = create_adaptive_llm_function(
    llm_client=openai,
    model="gpt-4",
    base_prompt="You are a helpful assistant. {instruction}",
    adaptation_strategy="feedback_based"
)

@with_oacp(
    role="ai_assistant",
    adaptive_prompting=True,
    contract=decision_contract(
        required_approvers=["quality_checker"],
        strategy="majority"
    )
)
def ai_assistant(instruction: str) -> dict:
    response = adaptive_openai(instruction=instruction)
    return {"response": response}
```

### With Anthropic Claude

```python
import anthropic
from oacp.llm_integration import AnthropicAdapter

# Create adaptive Anthropic function
claude_adapter = AnthropicAdapter(
    client=anthropic.Client(),
    model="claude-3-sonnet-20240229"
)

adaptive_claude = create_adaptive_llm_function(
    llm_client=claude_adapter,
    base_prompt="Human: {query}\n\nAssistant:",
    adaptation_strategy="performance_based"
)

@with_oacp(
    role="claude_assistant",
    adaptive_prompting=True
)
def claude_assistant(query: str) -> dict:
    response = adaptive_claude(query=query)
    return {"response": response}
```

### With Google Gemini

```python
import google.generativeai as genai
from oacp.llm_integration import GeminiAdapter

# Configure Gemini
genai.configure(api_key="your_api_key")
model = genai.GenerativeModel('gemini-pro')

# Create adaptive Gemini function
gemini_adapter = GeminiAdapter(model=model)
adaptive_gemini = create_adaptive_llm_function(
    llm_client=gemini_adapter,
    base_prompt="Generate content about {topic}: {requirements}",
    adaptation_strategy="context_aware"
)

@with_oacp(
    role="gemini_generator",
    adaptive_prompting=True
)
def gemini_content_generator(topic: str, requirements: str) -> dict:
    content = adaptive_gemini(topic=topic, requirements=requirements)
    return {"content": content}
```

## Best Practices

### Prompt Design

1. **Start Simple**: Begin with basic, clear prompts
2. **Be Specific**: Include clear success criteria
3. **Use Templates**: Create reusable prompt templates
4. **Version Control**: Track prompt versions and performance
5. **Test Thoroughly**: Validate adaptations with real data

### Feedback Quality

1. **Specific Reasons**: Provide detailed rejection reasons
2. **Actionable Suggestions**: Include concrete improvement steps
3. **Consistent Standards**: Apply consistent evaluation criteria
4. **Constructive Tone**: Focus on improvement, not criticism
5. **Regular Review**: Periodically review feedback quality

### Performance Monitoring

1. **Track Metrics**: Monitor success rates and adaptation frequency
2. **Analyze Patterns**: Look for common rejection reasons
3. **A/B Testing**: Compare adapted vs original prompts
4. **Regular Reviews**: Periodically assess adaptation effectiveness
5. **Continuous Improvement**: Refine adaptation strategies

## Advanced Features

### Multi-Model Adaptation

```python
from oacp.adaptive_prompting import MultiModelAdapter

# Adapt prompts for different models
adapter = MultiModelAdapter(
    model_configs={
        "gpt-4": {"style": "detailed", "max_tokens": 2000},
        "claude": {"style": "conversational", "max_tokens": 1500},
        "gemini": {"style": "structured", "max_tokens": 1800}
    }
)

@with_oacp(
    role="multi_model_generator",
    adaptive_prompting=True,
    prompt_adapter=adapter.adapt
)
def multi_model_content(prompt: str, model: str, context: dict) -> dict:
    adapted_prompt = adapter.adapt_for_model(prompt, model, context)
    return generate_with_model(adapted_prompt, model)
```

### Ensemble Adaptation

```python
from oacp.adaptive_prompting import EnsembleAdapter

# Combine multiple adaptation strategies
ensemble = EnsembleAdapter(
    strategies=[
        FeedbackBasedAdapter(),
        PerformanceBasedAdapter(),
        ContextAwareAdapter()
    ],
    voting_strategy="weighted",
    weights=[0.4, 0.3, 0.3]
)

@with_oacp(
    role="ensemble_generator",
    adaptive_prompting=True,
    prompt_adapter=ensemble.adapt
)
def ensemble_content_generation(prompt: str, context: dict) -> dict:
    return {"content": generate_content(prompt, context)}
```

### Learning from External Sources

```python
from oacp.adaptive_prompting import ExternalLearningAdapter

# Learn from external feedback sources
external_adapter = ExternalLearningAdapter(
    external_sources=[
        "user_feedback_api",
        "quality_metrics_service",
        "performance_analytics"
    ]
)

@with_oacp(
    role="external_learning_generator",
    adaptive_prompting=True,
    prompt_adapter=external_adapter.adapt
)
def externally_adapted_content(prompt: str, data: dict) -> dict:
    return {"content": generate_with_external_feedback(prompt, data)}
```

## Troubleshooting

### Common Issues

#### Adaptation Not Working

```python
# Debug adaptation process
from oacp.debug import debug_adaptation

debug_info = debug_adaptation(role="content_generator", run_id="your_run_id")
print(f"Adaptation triggered: {debug_info.adaptation_triggered}")
print(f"Original prompt: {debug_info.original_prompt}")
print(f"Adapted prompt: {debug_info.adapted_prompt}")
print(f"Feedback used: {debug_info.feedback}")
```

#### Poor Adaptation Quality

```python
# Analyze adaptation effectiveness
from oacp.analytics import analyze_adaptation_quality

analysis = analyze_adaptation_quality("article_writer", days=30)
print(f"Effective adaptations: {analysis.effective_rate:.2%}")
print(f"Common issues: {analysis.common_issues}")
print(f"Recommendations: {analysis.recommendations}")
```

#### Performance Degradation

```python
# Monitor for performance issues
from oacp.monitoring import AdaptationMonitor

monitor = AdaptationMonitor()
issues = monitor.detect_performance_issues("content_creator")

if issues:
    print("Performance issues detected:")
    for issue in issues:
        print(f"- {issue.description}")
        print(f"  Recommendation: {issue.recommendation}")
```
