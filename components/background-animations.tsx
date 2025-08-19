'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
}

export function BackgroundAnimations() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          size: Math.random() * 2 + 1
        })
      }
      
      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        // Adapt color to theme
        const isDark = document.documentElement.classList.contains('dark')
        const color = isDark ? '255, 255, 255' : '26, 26, 26'
        ctx.fillStyle = `rgba(${color}, ${particle.opacity})`
        ctx.fill()
      })
      
      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            // Adapt line color to theme
            const isDark = document.documentElement.classList.contains('dark')
            const color = isDark ? '255, 255, 255' : '26, 26, 26'
            ctx.strokeStyle = `rgba(${color}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      
      animationIdRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 1 }}
    />
  )
}

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse" />
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-slide-x"
        style={{ 
          backgroundSize: '200% 100%',
          animation: 'slide-x 20s ease-in-out infinite'
        }}
      />
    </div>
  )
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/10 rotate-45 animate-float" />
      <div 
        className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-primary/10 rounded-full animate-float"
        style={{ animationDelay: '2s', animationDuration: '8s' }}
      />
      <div 
        className="absolute top-1/2 left-3/4 w-3 h-3 bg-secondary/10 animate-float"
        style={{ animationDelay: '4s', animationDuration: '10s' }}
      />
      <div 
        className="absolute top-1/6 right-1/3 w-5 h-5 border border-accent/10 rotate-12 animate-float"
        style={{ animationDelay: '1s', animationDuration: '7s' }}
      />
      <div 
        className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-primary/20 rounded-full animate-float"
        style={{ animationDelay: '3s', animationDuration: '9s' }}
      />
    </div>
  )
}

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Large gradient orbs */}
      <div 
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-accent/8 to-primary/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-secondary/8 to-accent/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      />
    </div>
  )
}
