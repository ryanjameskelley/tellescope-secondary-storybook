"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"

export interface StatusFilterItem {
  label: string
  count?: number
}

export interface StatusFilterProps {
  items: StatusFilterItem[]
  selectedItems?: string[]
  onSelectionChange?: (selectedItems: string[]) => void
  placeholder?: string
  className?: string
}

export function StatusFilter({
  items,
  selectedItems = [],
  onSelectionChange,
  placeholder = "Search statuses...",
  className = ""
}: StatusFilterProps) {
  const toggleItem = (value: string) => {
    const newSelection = selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value]
    
    onSelectionChange?.(newSelection)
  }

  return (
    <Command className={`rounded-md border bg-popover shadow-md ${className}`}>
      <CommandInput placeholder={placeholder} />
      <CommandList className="p-1">
        {items.map((item) => (
          <CommandItem 
            key={item.label}
            onSelect={() => toggleItem(item.label)}
            className={`flex items-center gap-2 rounded-sm px-2 py-1.5 ${
              selectedItems.includes(item.label) ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <Checkbox 
              checked={selectedItems.includes(item.label)}
              onCheckedChange={() => toggleItem(item.label)}
            />
            <span className={
              selectedItems.includes(item.label) 
                ? "text-accent-foreground" 
                : "text-foreground"
            }>
              {item.label}
            </span>
            {item.count && (
              <span className="ml-auto text-sm">
                {item.count}
              </span>
            )}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  )
}