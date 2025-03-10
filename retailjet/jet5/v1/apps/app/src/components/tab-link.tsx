"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface TabLinkProps {
  tabValue: string
  children: React.ReactNode
  className?: string
}

export function TabLink({ tabValue, children, className }: TabLinkProps) {
  const router = useRouter()
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    
    // Update URL without full page reload
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tabValue)
    window.history.pushState({}, '', url.toString())
    
    // Dispatch a custom event that the dashboard page will listen for
    const event = new CustomEvent('tabchange', { detail: { tab: tabValue } })
    window.dispatchEvent(event)
  }, [tabValue])
  
  return (
    <a 
      href={`/en?tab=${tabValue}`} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
} 