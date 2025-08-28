"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnSelector, type ColumnSelectorProps } from "./column-selector"

export interface TableActionsProps {
  columnSelector?: ColumnSelectorProps
  addButton?: {
    label: string
    onClick: () => void
    disabled?: boolean
  }
  className?: string
  disabled?: boolean
}

export function TableActions({
  columnSelector,
  addButton,
  className = "",
  disabled = false
}: TableActionsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {columnSelector && (
        <ColumnSelector
          {...columnSelector}
          disabled={disabled || columnSelector.disabled}
        />
      )}
      {addButton && (
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={addButton.onClick}
          disabled={disabled || addButton.disabled}
        >
          <Plus className="h-4 w-4" />
          {addButton.label}
        </Button>
      )}
    </div>
  )
}