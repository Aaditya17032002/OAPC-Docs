"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Menu, Github, Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "next-themes"

export function DocsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">OAPC Docs</span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v2.0
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#getting-started" className="text-sm font-medium hover:text-primary transition-colors">
            Getting Started
          </a>
          <a href="#components" className="text-sm font-medium hover:text-primary transition-colors">
            Components
          </a>
          <a href="#api" className="text-sm font-medium hover:text-primary transition-colors">
            API Reference
          </a>
          <a href="#examples" className="text-sm font-medium hover:text-primary transition-colors">
            Examples
          </a>
          <a href="#guides" className="text-sm font-medium hover:text-primary transition-colors">
            Guides
          </a>
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search docs..." className="w-64 pl-9 bg-muted/50" />
          </div>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon">
            <Github className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-4 p-4">
            <a href="#getting-started" className="text-sm font-medium hover:text-primary transition-colors">
              Getting Started
            </a>
            <a href="#components" className="text-sm font-medium hover:text-primary transition-colors">
              Components
            </a>
            <a href="#api" className="text-sm font-medium hover:text-primary transition-colors">
              API Reference
            </a>
            <a href="#examples" className="text-sm font-medium hover:text-primary transition-colors">
              Examples
            </a>
            <a href="#guides" className="text-sm font-medium hover:text-primary transition-colors">
              Guides
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
