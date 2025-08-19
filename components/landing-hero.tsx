import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Shield, Rocket, Code, BookOpen } from "lucide-react"
import Link from "next/link"
import { BackgroundAnimations, AnimatedGrid, FloatingElements, GradientOrbs } from "./background-animations"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card/30 to-background py-32 w-full">
      {/* Beautiful animated background layers */}
      <GradientOrbs />
      <AnimatedGrid />
      <BackgroundAnimations />
      <FloatingElements />

      <div className="w-full relative px-6" style={{ zIndex: 10 }}>
        <div className="mx-auto max-w-7xl hero-center">
          {/* Badge */}
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-sm bg-card/80 backdrop-blur-sm border shadow-lg text-primary">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Governance Layer for LangGraph
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="animate-slide-up w-full flex flex-col items-center">
            <h1 className="mb-8 text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl text-center">
              Democratic
              <br />
              <span className="gradient-text">Multi-Agent Systems</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <p className="mx-auto mb-12 max-w-4xl text-xl text-muted-foreground leading-relaxed text-center">
              OACP adds voting, consensus, and audit trails to LangGraph workflows. Build trustworthy AI systems 
              where agents collaborate democratically, adapt their behavior through feedback, and maintain complete transparency.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up flex flex-col md:flex-row justify-center items-center w-full max-w-4xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="mb-4 md:mb-0 md:mr-8 w-full md:w-auto flex justify-center">
              <Link href="/docs" className="block">
                <Button
                  size="lg"
                  className="group px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full whitespace-nowrap"
                  style={{ minWidth: '280px' }}
                >
                  <BookOpen className="mr-3 h-5 w-5 flex-shrink-0" />
                  Get Started with OACP
                  <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="w-full md:w-auto flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg bg-card/50 backdrop-blur-sm border-2 hover:bg-card/80 transition-all duration-300 w-full whitespace-nowrap"
                style={{ minWidth: '200px' }}
                asChild
              >
                <a href="https://github.com/Aaditya17032002/OACP_Package" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <Code className="mr-3 h-5 w-5 flex-shrink-0" />
                  View Examples
                </a>
              </Button>
            </div>
          </div>

          {/* Feature Pills */}
          <div
            className="animate-slide-up mt-16 flex flex-wrap justify-center gap-6"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-card/80 backdrop-blur-sm px-6 py-4 text-sm shadow-lg border">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">Consensus Voting</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-card/80 backdrop-blur-sm px-6 py-4 text-sm shadow-lg border">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Adaptive Prompts</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-card/80 backdrop-blur-sm px-6 py-4 text-sm shadow-lg border">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Audit Trails</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-card/80 backdrop-blur-sm px-6 py-4 text-sm shadow-lg border">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-medium">LangGraph Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}