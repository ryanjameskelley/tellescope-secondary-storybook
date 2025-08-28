"use client"

import * as React from "react"
import { Settings2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ColumnOption {
  key: string
  label: string
}

export interface ColumnSelectorProps {
  columns: ColumnOption[]
  visibleColumns: Record<string, boolean>
  onToggleColumn: (columnKey: string) => void
  buttonText?: string
  className?: string
  disabled?: boolean
}

export function ColumnSelector({
  columns,
  visibleColumns,
  onToggleColumn,
  buttonText = "View",
  className = "",
  disabled = false
}: ColumnSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
          disabled={disabled}
        >
          <Settings2 className="h-4 w-4" />
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {columns.map((column) => (
          <DropdownMenuItem
            key={column.key}
            onSelect={(e) => e.preventDefault()}
            onClick={() => onToggleColumn(column.key)}
            className="px-2 py-1.5 flex items-center justify-between"
          >
            <span className="text-popover-foreground text-sm">{column.label}</span>
            <div className="h-4 w-4 flex items-center justify-center">
              {visibleColumns[column.key] && (
                <Check className="h-4 w-4 text-popover-foreground" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}