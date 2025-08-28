"use client"

import * as React from "react"
import { PanelRight } from "lucide-react"

export interface HoverIconProps {
  onClick?: () => void
  className?: string
  position?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  variant?: "default" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function HoverIcon({ 
  onClick, 
  className = "",
  position = { left: '8px' },
  variant = "default",
  size = "sm"
}: HoverIconProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  }

  const variantClasses = {
    default: "bg-white shadow-sm hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-muted/50"
  }

  const positionStyles = {
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom
  }

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-10 
        rounded p-0.5 transition-colors
        ${variantClasses[variant]}
        ${className}
      `}
      style={positionStyles}
      aria-label="Open panel"
    >
      <PanelRight className={`${sizeClasses[size]} text-muted-foreground`} />
    </button>
  )
}