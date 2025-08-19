import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Palette, Zap, Shield, Code, Sparkles, Users } from "lucide-react"
import { ScrollAnimation } from "./scroll-animations"

export function LandingFeatures() {
  const features = [
    {
      icon: Search,
      title: "Adaptive Prompting",
      description: "Dynamic prompt optimization that learns from agent interactions and improves performance over time.",
      badge: "AI Powered",
    },
    {
      icon: Palette,
      title: "Consensus Mechanisms",
      description: "Built-in voting strategies and consensus algorithms for reliable multi-agent decision making.",
      badge: "Reliable",
    },
    {
      icon: Zap,
      title: "Agent Coordination",
      description: "Seamless coordination between multiple agents with intelligent task distribution and load balancing.",
      badge: "Efficient",
    },
    {
      icon: Code,
      title: "Easy Integration",
      description: "Simple API and comprehensive examples for quick integration into existing Python projects.",
      badge: "Developer Friendly",
    },
    {
      icon: Shield,
      title: "Storage Backends",
      description: "Multiple storage options including file-based, SQLite, and custom storage implementations.",
      badge: "Flexible",
    },
    {
      icon: Users,
      title: "Multi-Agent Systems",
      description: "Purpose-built for complex multi-agent workflows with research teams, simulations, and more.",
      badge: "Scalable",
    },
  ]

  return (
    <section id="features" className="py-32 bg-muted/30 w-full">
      <div className="w-full relative px-6">
        <ScrollAnimation animation="fade-in" className="mx-auto max-w-6xl hero-center mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="mr-2 h-3 w-3" />
            Features
          </Badge>
          <h2 className="text-5xl font-black mb-6 gradient-text">Everything You Need</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Core features of OACP that enable robust multi-agent system development
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <ScrollAnimation
              key={index}
              animation="slide-up"
              delay={index * 100}
              className="h-full"
            >
              <Card className="group relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {feature.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
