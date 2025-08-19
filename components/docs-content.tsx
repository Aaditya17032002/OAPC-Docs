import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap } from "lucide-react"

export function DocsContent() {
  return (
    <div className="container px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-black mb-4 gradient-text">Open Agent Compliance Protocol</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A powerful framework for building multi-agent systems with adaptive prompting, consensus mechanisms, and intelligent coordination.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get up and running in under 5 minutes with our streamlined setup process.
              </p>
              <Button className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Explore interactive code examples and live demonstrations.</p>
              <Button variant="outline">View Examples</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 id="getting-started">Getting Started</h2>
          <p>
            Welcome to the most advanced documentation platform designed specifically for developers. Our platform
            combines beautiful design with powerful functionality to create an unparalleled documentation experience.
          </p>

          <h3 id="installation">Installation</h3>
          <p>
            Getting started is incredibly simple. Follow our step-by-step installation guide to have everything up and
            running in minutes.
          </p>

          <div className="bg-card/50 rounded-lg p-6 border-2 my-8">
            <code className="text-primary font-mono">npm install devdocs-pro</code>
          </div>

          <h2 id="components">Components</h2>
          <p>
            Explore our comprehensive component library with live examples, detailed API references, and best practices
            for implementation.
          </p>

          <h2 id="api">API Reference</h2>
          <p>
            Complete API documentation with interactive examples, type definitions, and comprehensive guides for every
            endpoint and method.
          </p>
        </div>
      </div>
    </div>
  )
}
