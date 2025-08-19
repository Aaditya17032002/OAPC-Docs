export default function QuickstartPage() {
  return (
    <>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 gradient-text">Quick Start Guide</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get up and running with OACP in minutes. Add governance, voting, and audit trails to your LangGraph workflows.
          </p>
        </div>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Installation</h2>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Clone the repository
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP
pip install -e .

# Install dependencies
pip install langgraph`}</code>
            </pre>
          </div>
          <p className="text-muted-foreground mb-6">
            Visit the <a href="https://github.com/Aaditya17032002/OACP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a> for the latest updates, issues, and contributions.
          </p>
        </section>

        {/* Basic Usage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Basic Usage</h2>
          <p className="text-muted-foreground mb-6">
            Add OACP governance to your LangGraph nodes using decorators:
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp, decision_contract, vote, VoteDecision
from langgraph.graph import StateGraph

# Add governance to a function
@with_oacp(
    role="researcher",
    invariants=["factual_accuracy", "comprehensive_coverage"],
    log_inputs=True,
    log_outputs=True
)
def research_node(state: dict) -> dict:
    """Research node with OACP governance."""
    # Your research logic here
    return {"research_results": "..."}

# Node requiring consensus
@with_oacp(
    role="synthesizer",
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic"],
        strategy="unanimous",
        timeout_seconds=30
    )
)
def synthesis_node(state: dict) -> dict:
    """Synthesis node requiring unanimous approval."""
    # Your synthesis logic here
    return {"final_report": "..."}

# Voting function
def reviewer_vote(run_id: str, output: dict):
    vote(
        run_id=run_id,
        voter_id="reviewer",
        decision=VoteDecision.APPROVE,
        reason="Output meets quality standards"
    )`}</code>
            </pre>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Concepts</h2>
          <div className="grid gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">@with_oacp Decorator</h3>
              <p className="text-muted-foreground">
                Adds governance to any function with role assignment, invariant checking, and optional consensus requirements.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Decision Contracts</h3>
              <p className="text-muted-foreground">
                Define voting requirements with required approvers, voting strategy (unanimous/majority/weighted), and timeout settings.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Vote Function</h3>
              <p className="text-muted-foreground">
                Cast votes with APPROVE, REJECT, or ABSTAIN decisions, including reasons and improvement suggestions.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Event Storage</h3>
              <p className="text-muted-foreground">
                Persistent audit trail with file, SQLite, or PostgreSQL backends for complete workflow traceability.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <div className="grid gap-4">
            <a href="/docs/decorators" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold mb-2">Decorators & Integration →</h3>
              <p className="text-sm text-muted-foreground">Learn about @with_oacp, wrap_node, and LangGraph integration patterns.</p>
            </a>
            <a href="/docs/voting-strategies" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold mb-2">Voting & Consensus →</h3>
              <p className="text-sm text-muted-foreground">Explore decision contracts, voting strategies, and consensus mechanisms.</p>
            </a>
            <a href="/docs/examples" className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <h3 className="font-semibold mb-2">Real Examples →</h3>
              <p className="text-sm text-muted-foreground">See the research team and Flappy Bird simulation examples in action.</p>
            </a>
          </div>
        </section>
    </>
  )
}
