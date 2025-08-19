import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DocsHeader />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 max-w-none">
          <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 gradient-text">Agents</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn how to create, configure, and manage intelligent agents in OACP with adaptive prompting capabilities.
          </p>
        </div>

        {/* Creating Agents */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Creating Agents</h2>
          <p className="text-muted-foreground mb-6">
            Agents are the core building blocks of OACP. Each agent has a specific role and can adapt its behavior over time.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp import Agent

# Create a basic agent
agent = Agent(
    name="researcher",
    role="Research and gather information on given topics",
    model="gpt-4",
    temperature=0.7
)

# Create an agent with custom prompting
agent = Agent(
    name="analyst",
    role="Analyze data and provide insights",
    system_prompt="You are an expert data analyst...",
    adaptive_prompting=True
)`}</code>
            </pre>
          </div>
        </section>

        {/* Agent Configuration */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Agent Configuration</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Basic Parameters</h3>
              <div className="overflow-x-auto">
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
                      <td className="border border-border p-3"><code>name</code></td>
                      <td className="border border-border p-3">str</td>
                      <td className="border border-border p-3">Unique identifier for the agent</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><code>role</code></td>
                      <td className="border border-border p-3">str</td>
                      <td className="border border-border p-3">Description of the agent's purpose</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><code>model</code></td>
                      <td className="border border-border p-3">str</td>
                      <td className="border border-border p-3">LLM model to use (default: gpt-3.5-turbo)</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3"><code>temperature</code></td>
                      <td className="border border-border p-3">float</td>
                      <td className="border border-border p-3">Creativity level (0.0-1.0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Prompting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Adaptive Prompting</h2>
          <p className="text-muted-foreground mb-6">
            OACP agents can learn and improve their prompts based on interaction history and feedback.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Enable adaptive prompting
agent = Agent(
    name="adaptive_researcher",
    role="Research specialist",
    adaptive_prompting=True,
    learning_rate=0.1,
    feedback_threshold=5
)

# The agent will automatically improve its prompts based on:
# - Success/failure of tasks
# - User feedback
# - Peer agent evaluations
# - Performance metrics`}</code>
            </pre>
          </div>
        </section>

        {/* Agent Interactions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Agent Interactions</h2>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Direct agent interaction
response = agent.process("What are the latest trends in AI?")

# Agent-to-agent communication
message = agent.send_message(other_agent, "Please review this analysis")

# Batch processing
results = agent.process_batch([
    "Task 1: Research topic A",
    "Task 2: Research topic B",
    "Task 3: Research topic C"
])`}</code>
            </pre>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Clear Role Definition</h4>
              <p className="text-sm text-muted-foreground">
                Define specific, focused roles for each agent to avoid overlap and improve coordination.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Enable Adaptive Learning</h4>
              <p className="text-sm text-muted-foreground">
                Use adaptive prompting for agents that perform repetitive tasks to improve over time.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-2">Monitor Performance</h4>
              <p className="text-sm text-muted-foreground">
                Regularly review agent performance metrics and adjust configurations as needed.
              </p>
            </div>
          </div>
        </section>
          </div>
        </main>
      </div>
    </div>
  )
}
