"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"

export interface SortableHeaderProps {
  children: React.ReactNode
  onSort?: () => void
  className?: string
}

export function SortableHeader({ children, onSort, className = "" }: SortableHeaderProps) {
  return (
    <div 
      className={`flex items-center cursor-pointer select-none font-medium hover:text-accent-foreground ${className}`}
      onClick={onSort}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </div>
  )
}