"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { HoverIcon } from "@/components/atoms/table/hover-icon"

export interface RowSelectorProps {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: () => void
  showCheckbox?: boolean
  showHoverIcon?: boolean
  onHoverIconClick?: () => void
  isHovered?: boolean
  className?: string
  hoverIconPosition?: {
    top?: string
    left?: string
  }
  hoverIconRelativeToParent?: boolean
}

export function RowSelector({
  checked = false,
  indeterminate,
  onCheckedChange,
  showCheckbox = true,
  showHoverIcon = true,
  onHoverIconClick,
  isHovered = false,
  className = "",
  hoverIconPosition = { left: '8px' },
  hoverIconRelativeToParent = false
}: RowSelectorProps) {
  return (
    <>
      <div className={`flex justify-center ${!hoverIconRelativeToParent ? 'relative' : ''} ${className}`}>
        {showCheckbox && (
          <Checkbox 
            checked={checked}
            indeterminate={indeterminate}
            onCheckedChange={onCheckedChange}
          />
        )}
        {showHoverIcon && isHovered && onHoverIconClick && !hoverIconRelativeToParent && (
          <HoverIcon
            onClick={onHoverIconClick}
            position={hoverIconPosition}
          />
        )}
      </div>
      {showHoverIcon && isHovered && onHoverIconClick && hoverIconRelativeToParent && (
        <HoverIcon
          onClick={onHoverIconClick}
          position={hoverIconPosition}
        />
      )}
    </>
  )
}