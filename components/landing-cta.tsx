import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Github } from "lucide-react"
import Link from "next/link"
import { ScrollAnimation } from "./scroll-animations"
import { GradientOrbs } from "./background-animations"

export function LandingCTA() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 w-full overflow-hidden">
      <GradientOrbs />
      <div className="w-full relative px-6" style={{ zIndex: 10 }}>
        <ScrollAnimation animation="scale-up" className="mx-auto max-w-6xl hero-center">
          <h2 className="text-5xl font-black mb-6 gradient-text">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Start building powerful multi-agent systems with OACP's adaptive prompting and consensus mechanisms
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <ScrollAnimation animation="slide-left" delay={300}>
              <Link href="/docs">
                <Button
                  size="lg"
                  className="group px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  Get Started with OACP
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </ScrollAnimation>
            <ScrollAnimation animation="slide-right" delay={500}>
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-4 text-lg bg-card/50 backdrop-blur-sm border-2 hover:bg-card/80 transition-all duration-300"
              >
                <Github className="mr-3 h-5 w-5" />
                View Examples
              </Button>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
