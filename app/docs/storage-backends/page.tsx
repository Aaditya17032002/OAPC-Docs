export default function StorageBackendsPage() {
  return (
    <>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 gradient-text">Storage Backends</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn about different storage options for persisting agent interactions, learning data, and system state.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <p className="text-muted-foreground mb-6">
            OACP supports multiple storage backends to fit different deployment scenarios and performance requirements. 
            All backends implement the same interface, making it easy to switch between them.
          </p>
        </section>

        {/* File Storage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">File Storage</h2>
          <p className="text-muted-foreground mb-6">
            The simplest storage backend that saves data to JSON files on the local filesystem.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.storage import FileStorage

# Basic file storage
storage = FileStorage("./data")

# With custom configuration
storage = FileStorage(
    directory="./logs",
    auto_backup=True,
    backup_interval=3600,  # Backup every hour
    max_file_size="100MB"
)

# Use with agent system
system = AgentSystem(agents=agents, storage=storage)`}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-green-600 mb-2">✓ Pros</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Simple setup, no dependencies</li>
                <li>• Human-readable JSON format</li>
                <li>• Easy to backup and version control</li>
                <li>• Good for development and small deployments</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 mb-2">⚠ Cons</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Not suitable for high-concurrency</li>
                <li>• Limited querying capabilities</li>
                <li>• No built-in data integrity checks</li>
                <li>• Performance degrades with large files</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SQLite Storage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">SQLite Storage</h2>
          <p className="text-muted-foreground mb-6">
            A lightweight database backend that provides better performance and querying capabilities.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.storage import SQLiteStorage

# Basic SQLite storage
storage = SQLiteStorage("agents.db")

# With connection pooling and optimization
storage = SQLiteStorage(
    database_path="./data/agents.db",
    pool_size=10,
    enable_wal_mode=True,  # Write-Ahead Logging for better concurrency
    cache_size=1000,
    auto_vacuum=True
)

# Use with agent system
system = AgentSystem(agents=agents, storage=storage)`}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-green-600 mb-2">✓ Pros</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Better performance than file storage</li>
                <li>• SQL querying capabilities</li>
                <li>• ACID transactions</li>
                <li>• Built-in data integrity</li>
                <li>• No server setup required</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 mb-2">⚠ Cons</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Single file can become large</li>
                <li>• Limited concurrent write performance</li>
                <li>• Not suitable for distributed systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PostgreSQL Storage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">PostgreSQL Storage</h2>
          <p className="text-muted-foreground mb-6">
            A full-featured database backend for production deployments with high concurrency requirements.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.storage import PostgreSQLStorage

# Basic PostgreSQL storage
storage = PostgreSQLStorage(
    host="localhost",
    database="oacp",
    user="oacp_user",
    password="your_password"
)

# With connection pooling and advanced features
storage = PostgreSQLStorage(
    connection_string="postgresql://user:pass@localhost:5432/oacp",
    pool_size=20,
    max_overflow=30,
    enable_json_indexing=True,
    partition_by_date=True
)

# Use with agent system
system = AgentSystem(agents=agents, storage=storage)`}</code>
            </pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-green-600 mb-2">✓ Pros</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Excellent concurrent performance</li>
                <li>• Advanced querying and indexing</li>
                <li>• Horizontal scaling support</li>
                <li>• Rich data types and JSON support</li>
                <li>• Production-ready reliability</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 mb-2">⚠ Cons</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Requires server setup and maintenance</li>
                <li>• More complex configuration</li>
                <li>• Resource intensive</li>
                <li>• Overkill for simple use cases</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Custom Storage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Custom Storage Backends</h2>
          <p className="text-muted-foreground mb-6">
            Create your own storage backend by implementing the StorageBackend interface.
          </p>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`from oacp.storage import StorageBackend
from typing import Dict, List, Any, Optional

class RedisStorage(StorageBackend):
    def __init__(self, redis_url: str):
        import redis
        self.redis = redis.from_url(redis_url)
    
    async def store_interaction(self, agent_id: str, interaction: Dict[str, Any]) -> str:
        interaction_id = f"{agent_id}:{int(time.time())}"
        await self.redis.hset(f"interactions:{interaction_id}", mapping=interaction)
        return interaction_id
    
    async def get_interactions(self, agent_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        pattern = f"interactions:{agent_id}:*"
        keys = await self.redis.keys(pattern)
        interactions = []
        for key in keys[-limit:]:
            interaction = await self.redis.hgetall(key)
            interactions.append(interaction)
        return interactions
    
    async def store_agent_state(self, agent_id: str, state: Dict[str, Any]) -> None:
        await self.redis.hset(f"agent_state:{agent_id}", mapping=state)
    
    async def get_agent_state(self, agent_id: str) -> Optional[Dict[str, Any]]:
        state = await self.redis.hgetall(f"agent_state:{agent_id}")
        return state if state else None

# Usage
storage = RedisStorage("redis://localhost:6379")
system = AgentSystem(agents=agents, storage=storage)`}</code>
            </pre>
          </div>
        </section>

        {/* Configuration Guide */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Choosing the Right Backend</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left">Use Case</th>
                  <th className="border border-border p-3 text-left">Recommended Backend</th>
                  <th className="border border-border p-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Development & Testing</td>
                  <td className="border border-border p-3">File Storage</td>
                  <td className="border border-border p-3">Simple setup, easy debugging</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Small Production</td>
                  <td className="border border-border p-3">SQLite</td>
                  <td className="border border-border p-3">Better performance, no server needed</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">High Concurrency</td>
                  <td className="border border-border p-3">PostgreSQL</td>
                  <td className="border border-border p-3">Excellent concurrent performance</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Distributed Systems</td>
                  <td className="border border-border p-3">Custom (Redis/MongoDB)</td>
                  <td className="border border-border p-3">Horizontal scaling capabilities</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Analytics & Reporting</td>
                  <td className="border border-border p-3">PostgreSQL</td>
                  <td className="border border-border p-3">Advanced querying and JSON support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
    </>  
  )
}
