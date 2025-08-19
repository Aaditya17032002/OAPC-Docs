import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"
import { TableOfContents } from "@/components/table-of-contents"

export default function VotingStrategiesPage() {
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
          <h1 className="text-4xl font-black mb-4 gradient-text">Voting Strategies</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore different consensus mechanisms for multi-agent decision making and learn when to use each strategy.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <p className="text-muted-foreground mb-6">
            Voting strategies in OACP enable multiple agents to reach consensus on decisions, solutions, or outputs. 
            Different strategies are suitable for different scenarios and agent configurations.
          </p>
        </section>

        {/* Built-in Strategies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Built-in Strategies</h2>
          
          <div className="space-y-8">
            {/* Majority Voting */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Majority Voting</h3>
              <p className="text-muted-foreground mb-4">
                The most common strategy where the option with the most votes wins.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`from oacp.voting import MajorityVoting

voting_strategy = MajorityVoting()
system = AgentSystem(agents=agents, voting_strategy=voting_strategy)`}</code>
                </pre>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Best for:</strong> Binary decisions, simple consensus scenarios
              </div>
            </div>

            {/* Weighted Voting */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Weighted Voting</h3>
              <p className="text-muted-foreground mb-4">
                Agents have different voting weights based on their expertise or performance.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`from oacp.voting import WeightedVoting

# Define weights for each agent
weights = {
    "expert_agent": 2.0,
    "junior_agent": 1.0,
    "specialist_agent": 1.5
}

voting_strategy = WeightedVoting(weights=weights)
system = AgentSystem(agents=agents, voting_strategy=voting_strategy)`}</code>
                </pre>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Best for:</strong> When agents have different levels of expertise
              </div>
            </div>

            {/* Ranked Choice */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Ranked Choice Voting</h3>
              <p className="text-muted-foreground mb-4">
                Agents rank options in order of preference, enabling more nuanced decision making.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`from oacp.voting import RankedChoiceVoting

voting_strategy = RankedChoiceVoting()
system = AgentSystem(agents=agents, voting_strategy=voting_strategy)

# Agents provide ranked preferences
# Result is determined by instant runoff method`}</code>
                </pre>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Best for:</strong> Multiple options, complex preference scenarios
              </div>
            </div>

            {/* Consensus Threshold */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Consensus Threshold</h3>
              <p className="text-muted-foreground mb-4">
                Requires a minimum percentage of agents to agree before a decision is made.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`from oacp.voting import ConsensusThreshold

# Require 75% agreement
voting_strategy = ConsensusThreshold(threshold=0.75)
system = AgentSystem(agents=agents, voting_strategy=voting_strategy)`}</code>
                </pre>
              </div>
              <div className="text-sm text-muted-foreground">
                <strong>Best for:</strong> High-stakes decisions requiring strong agreement
              </div>
            </div>
          </div>
        </section>

        {/* Custom Strategies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Custom Voting Strategies</h2>
          <p className="text-muted-foreground mb-6">
            Create your own voting strategies by inheriting from the base VotingStrategy class.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.voting import VotingStrategy
from typing import List, Dict, Any

class PerformanceWeightedVoting(VotingStrategy):
    def __init__(self, performance_history: Dict[str, float]):
        self.performance_history = performance_history
    
    def vote(self, options: List[Any], votes: Dict[str, Any]) -> Any:
        weighted_scores = {}
        
        for agent_name, vote in votes.items():
            weight = self.performance_history.get(agent_name, 1.0)
            if vote not in weighted_scores:
                weighted_scores[vote] = 0
            weighted_scores[vote] += weight
        
        return max(weighted_scores, key=weighted_scores.get)

# Usage
performance_data = {
    "agent1": 0.95,  # High performance
    "agent2": 0.80,  # Medium performance
    "agent3": 0.70   # Lower performance
}

custom_strategy = PerformanceWeightedVoting(performance_data)
system = AgentSystem(agents=agents, voting_strategy=custom_strategy)`}</code>
            </pre>
          </div>
        </section>

        {/* Strategy Selection Guide */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Choosing the Right Strategy</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Scenario</th>
                  <th className="border border-border p-3 text-left">Recommended Strategy</th>
                  <th className="border border-border p-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Equal agent expertise</td>
                  <td className="border border-border p-3">Majority Voting</td>
                  <td className="border border-border p-3">Simple and fair when all agents are equal</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Varying expertise levels</td>
                  <td className="border border-border p-3">Weighted Voting</td>
                  <td className="border border-border p-3">Gives more influence to expert agents</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Multiple complex options</td>
                  <td className="border border-border p-3">Ranked Choice</td>
                  <td className="border border-border p-3">Captures nuanced preferences</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Critical decisions</td>
                  <td className="border border-border p-3">Consensus Threshold</td>
                  <td className="border border-border p-3">Ensures strong agreement</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Performance-based systems</td>
                  <td className="border border-border p-3">Custom Strategy</td>
                  <td className="border border-border p-3">Adapts to specific requirements</td>
                </tr>
              </tbody>
            </table>
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
