"use client"

import * as React from "react"
import { PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { StatusFilter, type StatusFilterItem } from "./status-filter"

export interface TableSearchProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onFilterClick?: () => void
  showFilter?: boolean
  filterLabel?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  // Filter-specific props
  filterItems?: StatusFilterItem[]
  selectedFilters?: string[]
  onFilterSelectionChange?: (selectedFilters: string[]) => void
  filterPlaceholder?: string
  isFilterOpen?: boolean
  onFilterOpenChange?: (open: boolean) => void
}

export function TableSearch({
  placeholder = "Search...",
  value = "",
  onChange,
  onFilterClick,
  showFilter = false,
  filterLabel = "Filter",
  className = "",
  inputClassName = "",
  disabled = false,
  // Filter-specific props
  filterItems = [],
  selectedFilters = [],
  onFilterSelectionChange,
  filterPlaceholder = "Search filters...",
  isFilterOpen = false,
  onFilterOpenChange
}: TableSearchProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`max-w-sm ${inputClassName}`}
        size="small"
        disabled={disabled}
      />
      {showFilter && (
        // If filter items are provided, use integrated filter, otherwise use callback
        filterItems.length > 0 && onFilterSelectionChange ? (
          <Popover open={isFilterOpen} onOpenChange={onFilterOpenChange}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 border-dashed" 
                style={{ borderDashArray: '4px' }}
                disabled={disabled}
              >
                <PlusCircle className="h-4 w-4" />
                {filterLabel}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <StatusFilter
                items={filterItems}
                selectedItems={selectedFilters}
                onSelectionChange={onFilterSelectionChange}
                placeholder={filterPlaceholder}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 border-dashed" 
            style={{ borderDashArray: '4px' }}
            onClick={onFilterClick}
            disabled={disabled}
          >
            <PlusCircle className="h-4 w-4" />
            {filterLabel}
          </Button>
        )
      )}
    </div>
  )
}