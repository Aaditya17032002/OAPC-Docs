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

          {/* CTA Buttons - Same structure as hero section */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-4xl mx-auto">
            <div className="mb-4 md:mb-0 md:mr-8 w-full md:w-auto flex justify-center">
              <ScrollAnimation animation="slide-left" delay={300}>
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
              </ScrollAnimation>
            </div>
            
            <div className="w-full md:w-auto flex justify-center">
              <ScrollAnimation animation="slide-right" delay={500}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg bg-card/50 backdrop-blur-sm border-2 hover:bg-card/80 transition-all duration-300 w-full whitespace-nowrap"
                  style={{ minWidth: '200px' }}
                  asChild
                >
                  <a href="https://github.com/Aaditya17032002/OACP_Package" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Github className="mr-3 h-5 w-5 flex-shrink-0" />
                    View Examples
                  </a>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
