"use client"

import * as React from "react"
import { TagSelector, type TagSelectorOption, type TagColor } from "./tag-selector"
import { DeletableBadge } from "@/components/ui/deletable-badge"

export interface TagListProps {
  items: string[]
  variant?: "default" | "secondary" | "destructive" | "outline" | "chart-primary" | "chart-secondary" | "chart-tertiary" | "chart-accent"
  onRemoveTag?: (tag: string) => void
  onAddTag?: (tag: string) => void
  availableOptions?: string[]
  columnKey?: string
  allowColorSelection?: boolean
  globalTagColors?: Record<string, TagColor>
  onSetGlobalTagColor?: (tag: string, color: TagColor) => void
}

const getTagStyles = (variant: TagListProps['variant']) => {
  switch (variant) {
    case "chart-primary":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    case "chart-secondary": 
      return "bg-[#1564BF] text-white border-[#1564BF] hover:bg-[#1564BF]/90"
    case "chart-tertiary":
      return "bg-[#405F90] text-white border-[#405F90] hover:bg-[#405F90]/90"
    case "chart-accent":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    default:
      return ""
  }
}

export function TagList({ 
  items, 
  variant = "secondary", 
  onRemoveTag, 
  onAddTag, 
  availableOptions = [],
  columnKey,
  allowColorSelection = false,
  globalTagColors = {},
  onSetGlobalTagColor
}: TagListProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const handleToggleTag = (tag: string) => {
    if (items.includes(tag)) {
      onRemoveTag?.(tag)
    } else {
      onAddTag?.(tag)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth
        }
      }, 0)
    }
  }

  const handleColorSelection = (tagValue: string, color: TagColor) => {
    if (onSetGlobalTagColor) {
      onSetGlobalTagColor(tagValue, color)
    }
  }

  // Convert available options to TagSelectorOption format
  const tagSelectorOptions: TagSelectorOption[] = availableOptions.map(option => ({
    value: option,
    label: option,
    color: globalTagColors[option]
  }))

  return (
    <div className="flex gap-1 items-center">
      {onAddTag && (
        <TagSelector
          availableOptions={tagSelectorOptions}
          selectedValues={items}
          onToggleTag={handleToggleTag}
          onColorSelection={handleColorSelection}
          allowColorSelection={allowColorSelection}
          buttonSize="sm"
          dropdownAlign="start"
          dropdownWidth="w-48"
        />
      )}
      
      <div ref={containerRef} className="flex gap-1 overflow-x-auto max-w-[250px] w-fit items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {items.map((item, index) => {
          const itemColor = globalTagColors[item]
          const badgeVariant = itemColor ? itemColor.variant : 'secondary'
          
          // Handle both Tailwind classes and hex colors
          let styleProps = {}
          let customColorClass = 'bg-gray-200 text-gray-700 border-transparent'
          
          if (itemColor) {
            if (itemColor.bgColor.startsWith('#')) {
              // Custom hex color - use inline styles
              const textColor = itemColor.textColor.includes('white') ? 'white' : 'black'
              styleProps = {
                backgroundColor: itemColor.bgColor,
                color: textColor,
                borderColor: 'transparent'
              }
              customColorClass = 'border-transparent'
            } else {
              // Tailwind class - use class names
              customColorClass = `${itemColor.bgColor} ${itemColor.textColor} border-transparent`
            }
          }
          
          return (
            <DeletableBadge
              key={index}
              variant={badgeVariant}
              className={`whitespace-nowrap flex-shrink-0 h-5 ${customColorClass}`}
              style={styleProps}
              onDelete={onRemoveTag ? () => onRemoveTag(item) : undefined}
            >
              {item}
            </DeletableBadge>
          )
        })}
      </div>
    </div>
  )
}