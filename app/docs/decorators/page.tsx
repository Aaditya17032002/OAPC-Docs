import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function DecoratorsPage() {
  return (
    <div className="h-screen bg-background flex flex-col">
      <DocsHeader />
      <div className="flex flex-1 h-0">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-12">
            <div className="max-w-6xl mx-auto flex gap-12">
              <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 gradient-text">Decorators & Integration</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to add OACP governance to your functions and integrate with LangGraph workflows.
          </p>
        </div>

        {/* @with_oacp Decorator */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">@with_oacp Decorator</h2>
          <p className="text-muted-foreground mb-6">
            The main decorator for adding governance to any function. It handles logging, consensus, retries, and adaptive prompting.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp

@with_oacp(
    role="researcher",
    invariants=["factual_accuracy", "comprehensive_coverage"],
    log_inputs=True,
    log_outputs=True
)
def research_function(topic: str) -> dict:
    """Function with basic OACP governance."""
    # Your logic here
    return {"findings": "research results..."}

# Call the function
result = research_function("AI in healthcare")`}</code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-4">Parameters</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Parameter</th>
                  <th className="border border-border p-3 text-left">Type</th>
                  <th className="border border-border p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3"><code>role</code></td>
                  <td className="border border-border p-3">str</td>
                  <td className="border border-border p-3">Role identifier for this node</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>invariants</code></td>
                  <td className="border border-border p-3">list[str]</td>
                  <td className="border border-border p-3">List of invariants this node should maintain</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>contract</code></td>
                  <td className="border border-border p-3">DecisionContract</td>
                  <td className="border border-border p-3">Decision contract for voting requirements</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>log_inputs</code></td>
                  <td className="border border-border p-3">bool</td>
                  <td className="border border-border p-3">Whether to log function inputs (default: True)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>log_outputs</code></td>
                  <td className="border border-border p-3">bool</td>
                  <td className="border border-border p-3">Whether to log function outputs (default: True)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>retry_policy</code></td>
                  <td className="border border-border p-3">RetryPolicy</td>
                  <td className="border border-border p-3">Retry policy for consensus failures</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>redact_keys</code></td>
                  <td className="border border-border p-3">list[str]</td>
                  <td className="border border-border p-3">Keys to redact from logs</td>
                </tr>
                <tr>
                  <td className="border border-border p-3"><code>adaptive_prompting</code></td>
                  <td className="border border-border p-3">bool</td>
                  <td className="border border-border p-3">Enable adaptive prompting (default: True)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Contracts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Functions with Consensus</h2>
          <p className="text-muted-foreground mb-6">
            Add decision contracts to require consensus before a function's output is accepted.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp, decision_contract

@with_oacp(
    role="synthesizer",
    invariants=["comprehensive_integration", "actionable_conclusions"],
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic", "synthesizer"],
        strategy="unanimous",
        timeout_seconds=30
    ),
    log_inputs=True,
    log_outputs=True
)
def synthesis_function(research_data, analysis_data, critique_data):
    """Function requiring unanimous consensus."""
    # Synthesis logic here
    final_report = create_synthesis(research_data, analysis_data, critique_data)
    
    # Voting happens automatically in background threads
    # Function returns only after consensus is achieved or timeout
    return final_report`}</code>
            </pre>
          </div>
        </section>

        {/* wrap_node Function */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">wrap_node Function</h2>
          <p className="text-muted-foreground mb-6">
            Convenience function for adding OACP governance to existing functions without modifying them.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import wrap_node

def existing_function(data):
    """Existing function you want to add governance to."""
    return process_data(data)

# Wrap the function with OACP governance
governed_function = wrap_node(
    existing_function,
    role="processor",
    invariants=["data_integrity"],
    log_inputs=True,
    log_outputs=True
)

# Use in your workflow
result = governed_function(input_data)`}</code>
            </pre>
          </div>
        </section>

        {/* LangGraph Integration */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">LangGraph Integration</h2>
          <p className="text-muted-foreground mb-6">
            OACP integrates seamlessly with LangGraph workflows. Here's how to add governance to your graph nodes:
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from langgraph.graph import StateGraph
from oacp import with_oacp, decision_contract
from typing import TypedDict

class WorkflowState(TypedDict):
    research_data: dict
    analysis_data: dict
    final_report: dict
    run_id: str

@with_oacp(
    role="researcher",
    invariants=["factual_accuracy"],
    log_inputs=True,
    log_outputs=True
)
def research_node(state: WorkflowState) -> dict:
    """Research node with governance."""
    # Research logic
    return {"research_data": research_results}

@with_oacp(
    role="synthesizer", 
    contract=decision_contract(
        required_approvers=["researcher", "analyst", "critic"],
        strategy="unanimous",
        timeout_seconds=30
    )
)
def synthesis_node(state: WorkflowState) -> dict:
    """Synthesis node requiring consensus."""
    # Synthesis logic requiring approval
    return {"final_report": synthesis_results}

# Build the graph
workflow = StateGraph(WorkflowState)
workflow.add_node("research", research_node)
workflow.add_node("synthesis", synthesis_node)
workflow.add_edge("research", "synthesis")

# Compile and run
app = workflow.compile()
result = app.invoke({"run_id": "example_run"})`}</code>
            </pre>
          </div>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Error Handling & Retries</h2>
          <p className="text-muted-foreground mb-6">
            OACP provides automatic retry mechanisms for consensus failures and other errors.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp
from oacp.routing import RetryPolicy
from oacp.errors import OacpConsensusError

@with_oacp(
    role="analyzer",
    retry_policy=RetryPolicy(
        max_attempts=3,
        backoff_factor=2.0,
        max_backoff_seconds=60
    )
)
def analysis_with_retries(data):
    """Function with custom retry policy."""
    try:
        return analyze_data(data)
    except OacpConsensusError as e:
        # This will trigger a retry with adaptive prompting
        raise e`}</code>
            </pre>
          </div>
        </section>

        {/* Context Access */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Accessing OACP Context</h2>
          <p className="text-muted-foreground mb-6">
            Access the current OACP context within your governed functions.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import with_oacp, current_context

@with_oacp(role="processor")
def context_aware_function(data):
    """Function that accesses OACP context."""
    ctx = current_context()
    
    print(f"Run ID: {ctx.run_id}")
    print(f"Node ID: {ctx.node_id}")
    print(f"Role: {ctx.role}")
    
    # Use context information in your logic
    if ctx.contract:
        print(f"Requires consensus from: {ctx.contract.required_approvers}")
    
    return process_with_context(data, ctx)`}</code>
            </pre>
          </div>
        </section>
              </div>
              <div className="w-64 shrink-0 hidden xl:block">
                <div className="sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
