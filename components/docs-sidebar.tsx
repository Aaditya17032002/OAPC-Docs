"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronRight, BookOpen, Code, Layers, Zap, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarItem {
  title: string
  href?: string
  icon?: React.ReactNode
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Getting Started",
    icon: <BookOpen className="h-4 w-4" />,
    children: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Installation", href: "/docs/quickstart#installation" },
      { title: "Basic Usage", href: "/docs/quickstart#basic-usage" },
    ],
  },
  {
    title: "Core Concepts",
    icon: <Layers className="h-4 w-4" />,
    children: [
      { title: "Agents", href: "/docs/agents" },
      { title: "Agent Systems", href: "/docs/agents#agent-systems" },
      { title: "Voting Strategies", href: "/docs/voting-strategies" },
      { title: "Storage Backends", href: "/docs/storage-backends" },
      { title: "Adaptive Prompting", href: "/docs/agents#adaptive-prompting" },
    ],
  },
  {
    title: "Examples",
    icon: <Code className="h-4 w-4" />,
    children: [
      { title: "Research Team", href: "/docs/examples#research-team" },
      { title: "Game AI Simulation", href: "/docs/examples#game-ai" },
      { title: "Content Pipeline", href: "/docs/examples#content-creation" },
      { title: "Code Review", href: "/docs/examples#code-review" },
    ],
  },
  {
    title: "Advanced Topics",
    icon: <Zap className="h-4 w-4" />,
    children: [
      { title: "Custom Voting Strategies", href: "/docs/voting-strategies#custom-strategies" },
      { title: "Custom Storage Backends", href: "/docs/storage-backends#custom-storage" },
      { title: "Performance Optimization", href: "/docs/performance" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "CLI Commands",
    icon: <Terminal className="h-4 w-4" />,
    children: [
      { title: "Overview", href: "/docs/cli" },
      { title: "Environment Setup", href: "/docs/cli#environment-commands" },
      { title: "Monitoring", href: "/docs/cli#monitoring-commands" },
      { title: "Log Management", href: "/docs/cli#log-management" },
      { title: "Web Dashboard", href: "/docs/cli#web-dashboard" },
      { title: "Advanced Commands", href: "/docs/cli#advanced-commands" },
    ],
  },
]

function SidebarItemComponent({ item, level = 0 }: { item: SidebarItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(level === 0)

  const hasChildren = item.children && item.children.length > 0

  const ItemContent = () => (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
        level === 0 ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        level > 0 && "ml-4",
        item.href && "hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={() => hasChildren && setIsOpen(!isOpen)}
    >
      {item.icon}
      <span className="flex-1">{item.title}</span>
      {hasChildren && (isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
    </div>
  )

  return (
    <div>
      {item.href && !hasChildren ? (
        <Link href={item.href}>
          <ItemContent />
        </Link>
      ) : (
        <ItemContent />
      )}

      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child, index) => (
            <SidebarItemComponent key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function DocsSidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar/50 flex flex-col h-full">
      <div className="p-4 overflow-y-auto">
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <SidebarItemComponent key={index} item={item} />
          ))}
        </div>
      </div>
    </aside>
  )
}
