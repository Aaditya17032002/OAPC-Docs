import { Rocket, Lightbulb, Target, Vote, Brain, FileText, Plug, Settings } from "lucide-react"

export default function DocsPage() {
  return (
    <>
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-black mb-4 gradient-text">Open Agent Compliance Protocol</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A governance layer for LangGraph that adds voting, consensus, and audit trails to multi-agent workflows. 
                Transform your agent systems with democratic decision-making and adaptive prompting.
              </p>
            </div>

            {/* Quick Start Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a href="/docs/quickstart" className="block group">
                <div className="border-2 hover:shadow-lg transition-all duration-300 rounded-lg p-6 h-full group-hover:border-primary/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Quick Start</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Get up and running with OACP in minutes. Installation, basic setup, and your first multi-agent system.
                  </p>
                  <div className="text-primary font-medium group-hover:underline">
                    Get Started →
                  </div>
                </div>
              </a>

              <a href="/docs/examples" className="block group">
                <div className="border-2 hover:shadow-lg transition-all duration-300 rounded-lg p-6 h-full group-hover:border-primary/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Examples</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Explore real-world examples including research teams, game AI, content creation, and code review systems.
                  </p>
                  <div className="text-primary font-medium group-hover:underline">
                    View Examples →
                  </div>
                </div>
              </a>
            </div>

            {/* Core Concepts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Core Concepts</h2>
              <div className="grid gap-6">
                <a href="/docs/decorators" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary">Decorators →</h3>
                    <p className="text-sm text-muted-foreground">Add OACP governance to functions with @with_oacp and wrap_node decorators.</p>
                  </div>
                </a>
                <a href="/docs/voting-strategies" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                  <Vote className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary">Voting & Consensus →</h3>
                    <p className="text-sm text-muted-foreground">Decision contracts, voting strategies, and consensus mechanisms for agent coordination.</p>
                  </div>
                </a>
                <a href="/docs/storage-backends" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary">Event Storage →</h3>
                    <p className="text-sm text-muted-foreground">File, SQLite, and PostgreSQL storage backends for audit trails and event logging.</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Vote className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Democratic Voting</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Unanimous, majority, and weighted voting strategies for agent consensus decisions.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Adaptive Prompting</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Learn from rejection feedback to automatically improve prompts and reduce consensus failures.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Audit Trails</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Complete traceability with event logging, vote tracking, and governance compliance.
                  </p>
                </div>
                <div className="border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Plug className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">LangGraph Integration</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Simple decorator-based integration with existing LangGraph workflows and nodes.
                  </p>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Installation</h2>
              <div className="bg-muted/50 rounded-lg p-6 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# Install from source
git clone https://github.com/Aaditya17032002/OACP.git
cd OACP
pip install -e .`}</code>
                </pre>
              </div>
              <p className="text-muted-foreground">
                Ready to start building? Check out our <a href="/docs/quickstart" className="text-primary hover:underline">Quick Start Guide</a> for detailed setup instructions or visit our <a href="https://github.com/Aaditya17032002/OACP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
            </section>
    </>
  )
}
