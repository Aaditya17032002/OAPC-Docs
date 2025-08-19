"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check, Terminal } from "lucide-react"
import { useState } from "react"

const codeExample = `import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to OAPC Docs
      </h2>
      <p className="text-muted-foreground mb-4">
        Get started with our beautiful components
      </p>
      <Button className="w-full">
        Get Started
      </Button>
    </Card>
  )
}`

export function CodeExampleSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Content */}
            <div>
              <Badge variant="outline" className="mb-4">
                <Terminal className="mr-2 h-3 w-3" />
                Code Examples
              </Badge>
              <h2 className="text-4xl font-black mb-6">
                Clean, readable
                <span className="text-primary"> code examples</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every component comes with clear, well-documented examples. Copy, paste, and customize to fit your
                needs.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">TypeScript support out of the box</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Accessible by default</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Fully customizable</span>
                </div>
              </div>
            </div>

            {/* Code Block */}
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-mono">component.tsx</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="text-sm overflow-x-auto">
                  <code className="text-muted-foreground font-mono leading-relaxed">{codeExample}</code>
                </pre>
              </CardContent>

              {/* Syntax highlighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
