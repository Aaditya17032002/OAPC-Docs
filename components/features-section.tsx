import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Zap, Search, Smartphone, Code, Users, ArrowUpRight, Sparkles } from "lucide-react"

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Beautiful Design",
    description: "Carefully crafted interface with attention to every detail, typography, and spacing.",
    badge: "Design",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Optimized for performance with instant search and smooth navigation.",
    badge: "Performance",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Powerful Search",
    description: "Find anything instantly with our advanced search powered by AI.",
    badge: "Search",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile First",
    description: "Perfect experience on every device, from mobile to desktop.",
    badge: "Responsive",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Developer Friendly",
    description: "Built by developers, for developers. Clean code examples and clear explanations.",
    badge: "DX",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Driven",
    description: "Continuously improved based on community feedback and contributions.",
    badge: "Community",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-2 h-3 w-3" />
            Features
          </Badge>
          <h2 className="text-4xl font-black mb-4">
            Everything you need for
            <span className="text-primary"> exceptional docs</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We've thought of everything to make your documentation experience seamless and delightful.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
