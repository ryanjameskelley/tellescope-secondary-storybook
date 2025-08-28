"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"

export interface DraggableRowHandleProps {
  onDragStart: () => void
  onDragEnd: () => void
  itemId: string
  isDragging?: boolean
  className?: string
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  'aria-label'?: string
}

export function DraggableRowHandle({
  onDragStart,
  onDragEnd,
  itemId,
  isDragging = false,
  className = "",
  disabled = false,
  size = "sm",
  'aria-label': ariaLabel = "Drag to reorder"
}: DraggableRowHandleProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", itemId)
    onDragStart()
  }

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd()
  }

  if (disabled) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="p-1 opacity-50">
          <GripVertical className={`${sizeClasses[size]} text-muted-foreground`} />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <button
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`
          cursor-grab active:cursor-grabbing p-1 hover:bg-muted/50 rounded transition-colors
          ${isDragging ? "opacity-50" : ""}
        `}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <GripVertical className={`${sizeClasses[size]} text-muted-foreground`} />
      </button>
    </div>
  )
}