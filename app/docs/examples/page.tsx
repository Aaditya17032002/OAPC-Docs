export default function ExamplesPage() {
  return (
    <>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 gradient-text">Examples</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real-world examples of OACP in action, from simple use cases to complex multi-agent systems.
          </p>
        </div>

        {/* Research Team Example */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Research Team Workflow</h2>
          <p className="text-muted-foreground mb-6">
            A real multi-agent research workflow using LangGraph with OACP governance. Four specialized agents collaborate with consensus voting.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp, decision_contract, vote, VoteDecision
from langgraph.graph import StateGraph

@with_oacp(
    role="researcher",
    invariants=["factual_accuracy", "comprehensive_coverage"],
    log_inputs=True,
    log_outputs=True
)
def research_agent(research_request: dict) -> dict:
    """Conducts initial research on the given topic."""
    topic = research_request.get("topic", "Unknown topic")
    
    # Research logic with LLM integration
    research_content = generate_research(topic)
    
    return {
        "agent_role": "researcher",
        "topic": topic,
        "content": research_content,
        "quality_score": assess_research_quality(research_content)
    }

@with_oacp(
    role="synthesizer",
    invariants=["comprehensive_integration", "actionable_conclusions"],
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic", "synthesizer"],
        strategy="unanimous", 
        timeout_seconds=30
    )
)
def synthesis_agent(research_data, analysis_data, critique_data) -> dict:
    """Synthesizes all inputs into final report (requires consensus)."""
    
    # Create synthesis
    synthesis_content = create_synthesis(research_data, analysis_data, critique_data)
    
    # Voting happens in background threads
    start_voting_process()  # Agents cast votes automatically
    
    return {
        "agent_role": "synthesizer",
        "content": synthesis_content,
        "final_score": calculate_final_score(research_data, analysis_data, critique_data)
    }

# Voting functions
def researcher_vote(run_id: str, synthesis_content: str):
    """Researcher votes on synthesis quality."""
    if meets_research_standards(synthesis_content):
        vote(run_id=run_id, voter_id="researcher", 
             decision=VoteDecision.APPROVE, 
             reason="Synthesis accurately represents research findings")
    else:
        vote(run_id=run_id, voter_id="researcher", 
             decision=VoteDecision.REJECT, 
             reason="Synthesis lacks research representation")`}</code>
            </pre>
          </div>
          <p className="text-muted-foreground">
            <strong>Location:</strong> <code>examples/research_team/</code><br/>
            <strong>Run:</strong> <code>python examples/research_team/main.py</code>
          </p>
        </section>

        {/* Flappy Bird Simulation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Flappy Bird Game Design</h2>
          <p className="text-muted-foreground mb-6">
            A game design workflow where agents create components and vote on compatibility. Demonstrates quality control through consensus.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp, decision_contract, vote, VoteDecision

@with_oacp(
    role="background_designer",
    invariants=["unique_assets", "match_mechanics"],
    log_inputs=True,
    log_outputs=True
)
def background_agent(task: dict) -> dict:
    """Design the background for Flappy Bird game."""
    
    # Generate background specification
    background_spec = {
        "type": "background_design",
        "sky": {"color": "#87CEEB", "clouds": ["cumulus", "cirrus"]},
        "pipes": {"color": "#228B22", "spacing": 200, "height_variation": 150},
        "ground": {"color": "#8B4513", "texture": "dirt", "scroll_speed": 2.0},
        "quality": "high",
        "compatible_with": ["standard_bird_physics"]
    }
    
    return background_spec

@with_oacp(
    role="output_agent",
    invariants=["game_playability", "component_integration"],
    contract=decision_contract(
        required_approvers=["bird_agent", "background_agent", "output_agent"],
        strategy="unanimous",
        timeout_seconds=10
    )
)
def output_agent(background_result: dict, bird_result: dict) -> dict:
    """Combine components into final game spec (requires consensus)."""
    
    # Check compatibility
    compatibility_issues = check_compatibility(background_result, bird_result)
    
    combined_spec = {
        "game_type": "flappy_bird",
        "components": {"background": background_result, "bird": bird_result},
        "integration": {
            "compatibility_issues": compatibility_issues,
            "playable": len(compatibility_issues) == 0
        }
    }
    
    # Voting happens automatically
    return combined_spec

# Reviewer functions vote on final output
def background_reviewer(run_id: str, target_output: dict):
    """Background agent reviews final integration."""
    playable = target_output.get("integration", {}).get("playable", False)
    
    vote(
        run_id=run_id,
        voter_id="background_agent",
        decision=VoteDecision.APPROVE if playable else VoteDecision.REJECT,
        reason=f"Game playability: {playable}"
    )`}</code>
            </pre>
          </div>
          <p className="text-muted-foreground">
            <strong>Location:</strong> <code>examples/flappy_bird_sim/</code><br/>
            <strong>Run:</strong> <code>python examples/flappy_bird_sim/main.py</code>
          </p>
        </section>

        {/* Adaptive Prompting Example */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Adaptive Prompting in Action</h2>
          <p className="text-muted-foreground mb-6">
            See how OACP learns from rejection feedback to improve prompts and reduce consensus failures over time.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.adaptive_prompting import (
    record_rejection_feedback, 
    adapt_prompt_for_retry,
    get_adaptation_statistics
)

# When a vote is rejected, feedback is automatically recorded
def critic_vote(run_id: str, output: dict):
    """Critic votes on output quality."""
    if output_has_issues(output):
        vote(
            run_id=run_id,
            voter_id="critic",
            decision=VoteDecision.REJECT,
            reason="Output lacks detail and insufficient evidence provided",
            fix_suggestions=["Add more specific examples", "Include data sources"]
        )
        # Rejection feedback is automatically recorded by OACP

# On retry attempts, prompts are automatically adapted
@with_oacp(
    role="researcher",
    adaptive_prompting=True,  # Enable adaptive prompting
    retry_policy=RetryPolicy(max_attempts=3)
)
def research_with_adaptation(topic: str) -> dict:
    """Research function that learns from rejections."""
    
    # Original prompt
    prompt = f"Research the topic: {topic}"
    
    # OACP automatically adapts the prompt based on previous rejections
    # Adapted prompt might become:
    # "Research the topic: {topic}
    # 
    # IMPORTANT - Based on previous feedback, please ensure your response addresses:
    # • Provide more detailed and comprehensive information  
    # • Include specific examples, data points, and evidence
    # • Provide deeper analysis beyond just stating facts"
    
    return conduct_research(prompt)

# Check adaptation statistics
stats = get_adaptation_statistics("researcher", "research_node")
print(f"Total rejections: {stats['total_rejections']}")
print(f"Common patterns: {stats['common_patterns']}")
print(f"Recent adaptations: {len(stats['adaptation_history'])}")`}</code>
            </pre>
          </div>
          <p className="text-muted-foreground">
            <strong>Key Features:</strong> Automatic feedback collection, pattern recognition, prompt improvement, success tracking
          </p>
        </section>

        {/* Running Examples */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Running the Examples</h2>
          <p className="text-muted-foreground mb-6">
            All examples are available in the OACP repository. Here's how to run them:
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">1. Clone the Repository</h4>
              <div className="bg-muted/50 rounded p-3">
                <code className="text-sm">git clone https://github.com/your-org/oacp.git</code>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">2. Install Dependencies</h4>
              <div className="bg-muted/50 rounded p-3">
                <code className="text-sm">cd oacp && pip install -e .</code>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">3. Run Examples</h4>
              <div className="bg-muted/50 rounded p-3 space-y-1">
                <div><code className="text-sm">python examples/research_team/main.py</code></div>
                <div><code className="text-sm">python examples/game_ai/simulation.py</code></div>
                <div><code className="text-sm">python examples/content_pipeline/create_content.py</code></div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}
