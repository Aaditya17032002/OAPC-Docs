import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="mr-2 h-3 w-3" />
            New v2.0 Release
          </Badge>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Premium
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}
              Documentation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Experience documentation that sets new standards. Beautiful design, lightning-fast search, and
            developer-first experience that makes building with our tools a joy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group px-8 py-3 text-base">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base bg-transparent">
              View Examples
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              Lightning Fast
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              Type Safe
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Modern Design
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
