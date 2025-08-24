"use client"

import * as React from "react"

export interface StaticHeaderProps {
  children: React.ReactNode
  className?: string
}

export function StaticHeader({ children, className = "" }: StaticHeaderProps) {
  return (
    <div className={`font-medium ${className}`}>
      {children}
    </div>
  )
}