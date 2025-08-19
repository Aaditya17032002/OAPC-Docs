"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the page
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const items: TocItem[] = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const title = heading.textContent || ''
      
      // Create ID if it doesn't exist
      let id = heading.id
      if (!id) {
        id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        heading.id = id
      }
      
      // Only include h2 and h3 for cleaner TOC
      if (level <= 3 && level >= 2) {
        items.push({ id, title, level })
      }
    })

    setTocItems(items)
  }, [])

  useEffect(() => {
    // Find the scrollable container (main element)
    const scrollContainer = document.querySelector('main')
    if (!scrollContainer) return

    // Intersection Observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: scrollContainer,
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const scrollContainer = document.querySelector('main')
    
    if (element && scrollContainer) {
      const elementRect = element.getBoundingClientRect()
      const containerRect = scrollContainer.getBoundingClientRect()
      const scrollTop = scrollContainer.scrollTop
      const targetPosition = scrollTop + elementRect.top - containerRect.top - 20
      
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={cn("sticky top-6", className)}>
      <div className="text-sm font-medium text-foreground mb-4">On this page</div>
      <nav className="space-y-2">
        {tocItems.map(({ id, title, level }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-foreground",
              level === 2 && "pl-0",
              level === 3 && "pl-4",
              activeId === id 
                ? "text-primary font-medium border-l-2 border-primary pl-3" 
                : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"
            )}
          >
            {title}
          </button>
        ))}
      </nav>
    </div>
  )
}
