import { Zap } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t bg-card/30 backdrop-blur-sm w-full">
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">OACP</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="https://github.com/Aaditya17032002/OAPC" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
            <span>© 2024 OACP. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
