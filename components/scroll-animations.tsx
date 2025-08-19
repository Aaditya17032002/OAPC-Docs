'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up'
  delay?: number
  threshold?: number
}

export function ScrollAnimation({ 
  children, 
  className = '', 
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'
    
    switch (animation) {
      case 'fade-in':
        return 'opacity-100 transition-opacity duration-1000 ease-out'
      case 'slide-up':
        return 'opacity-100 translate-y-0 transition-all duration-1000 ease-out'
      case 'slide-left':
        return 'opacity-100 translate-x-0 transition-all duration-1000 ease-out'
      case 'slide-right':
        return 'opacity-100 -translate-x-0 transition-all duration-1000 ease-out'
      case 'scale-up':
        return 'opacity-100 scale-100 transition-all duration-1000 ease-out'
      default:
        return 'opacity-100'
    }
  }

  const getInitialClass = () => {
    switch (animation) {
      case 'slide-up':
        return 'translate-y-8'
      case 'slide-left':
        return 'translate-x-8'
      case 'slide-right':
        return '-translate-x-8'
      case 'scale-up':
        return 'scale-95'
      default:
        return ''
    }
  }

  return (
    <div 
      ref={ref} 
      className={`${getInitialClass()} ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}

export function ParallaxBackground({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          zIndex: -1
        }}
      >
        {children}
      </div>
    </div>
  )
}
