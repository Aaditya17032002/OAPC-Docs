import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingCTA } from "@/components/landing-cta"
import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background w-full">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingCTA />
      <LandingFooter />
    </div>
  )
}
