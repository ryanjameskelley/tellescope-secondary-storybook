"use client"

import * as React from "react"
import { Plus, Circle, Check } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface TagSelectorOption {
  value: string
  label: string
  color?: TagColor
}

export interface TagColor {
  name: string
  variant: "default" | "secondary" | "destructive" | "outline"
  bgColor: string
  textColor: string
}

export interface TagSelectorProps {
  availableOptions: TagSelectorOption[]
  selectedValues: string[]
  onToggleTag: (value: string) => void
  onColorClick?: (value: string) => void
  onColorSelection?: (tagValue: string, color: TagColor) => void
  availableColors?: TagColor[]
  allowColorSelection?: boolean
  disabled?: boolean
  className?: string
  buttonSize?: "sm" | "md" | "lg"
  dropdownAlign?: "start" | "center" | "end"
  dropdownWidth?: string
  'aria-label'?: string
}

const getColorValue = (colorValue: string): string => {
  // If it's already a hex color, return it
  if (colorValue.startsWith('#')) {
    return colorValue
  }
  
  // Otherwise, map Tailwind classes to hex values
  const colorMap: Record<string, string> = {
    'bg-slate-900': '#0f172a',
    'bg-slate-100': '#f1f5f9',
    'bg-green-500': '#22c55e',
    'bg-green-600': '#16a34a',
    'bg-green-700': '#15803d',
    'bg-orange-500': '#f97316',
    'bg-orange-600': '#ea580c',
    'bg-orange-700': '#c2410c',
    'bg-yellow-500': '#eab308',
    'bg-blue-500': '#3b82f6',
    'bg-blue-600': '#2563eb',
    'bg-blue-700': '#1d4ed8',
    'bg-red-500': '#ef4444',
    'bg-red-600': '#dc2626',
    'bg-red-700': '#b91c1c',
  }
  return colorMap[colorValue] || '#6b7280'
}

const buttonSizeClasses = {
  sm: "h-5 w-5 p-0",
  md: "h-6 w-6 p-0", 
  lg: "h-8 w-8 p-0"
}

const iconSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-4 w-4"
}

const defaultAvailableColors: TagColor[] = [
  { name: "Dark", variant: "default", bgColor: "bg-slate-900", textColor: "text-white" },
  { name: "Light", variant: "secondary", bgColor: "bg-slate-100", textColor: "text-slate-900" },
  { name: "Green", variant: "outline", bgColor: "bg-green-700", textColor: "text-white" }, // Even darker for better contrast
  { name: "Orange", variant: "outline", bgColor: "bg-orange-700", textColor: "text-white" }, // Darker for white text
  { name: "Blue", variant: "outline", bgColor: "bg-blue-700", textColor: "text-white" }, // Darker for white text
  { name: "Red", variant: "destructive", bgColor: "bg-red-700", textColor: "text-white" }, // Darker for white text
]

export function TagSelector({
  availableOptions,
  selectedValues,
  onToggleTag,
  onColorClick,
  onColorSelection,
  availableColors = defaultAvailableColors,
  allowColorSelection = false,
  disabled = false,
  className = "",
  buttonSize = "sm",
  dropdownAlign = "start",
  dropdownWidth = "w-48",
  'aria-label': ariaLabel = "Add tag"
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isColorDialogOpen, setIsColorDialogOpen] = React.useState(false)
  const [selectedTagForColor, setSelectedTagForColor] = React.useState<string>("")
  const [customColor, setCustomColor] = React.useState("#3B82F6")

  const handleToggleTag = (value: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onToggleTag(value)
  }

  const handleColorClick = (value: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedTagForColor(value)
    setIsColorDialogOpen(true)
    setIsOpen(false)
    if (onColorClick) {
      onColorClick(value)
    }
  }

  const handleColorSelection = (color: TagColor) => {
    if (selectedTagForColor && onColorSelection) {
      onColorSelection(selectedTagForColor, color)
    }
    setIsColorDialogOpen(false)
    setSelectedTagForColor("")
  }

  const handleCustomColorSelection = () => {
    if (selectedTagForColor && onColorSelection) {
      // Convert hex color to TagColor object
      const customTagColor: TagColor = {
        name: "Custom",
        variant: "outline",
        bgColor: customColor,
        textColor: getContrastTextColor(customColor)
      }
      onColorSelection(selectedTagForColor, customTagColor)
    }
    setIsColorDialogOpen(false)
    setSelectedTagForColor("")
  }

  // Helper function to determine text color based on background for accessibility
  const getContrastTextColor = (hexColor: string): string => {
    // Remove # if present
    const color = hexColor.replace('#', '')
    
    // Handle 3-digit hex colors
    let r, g, b
    if (color.length === 3) {
      r = parseInt(color[0] + color[0], 16)
      g = parseInt(color[1] + color[1], 16)
      b = parseInt(color[2] + color[2], 16)
    } else {
      r = parseInt(color.substr(0, 2), 16)
      g = parseInt(color.substr(2, 2), 16)
      b = parseInt(color.substr(4, 2), 16)
    }
    
    // Handle edge cases first
    if (r === 0 && g === 0 && b === 0) {
      // Pure black - definitely use white text
      return 'text-white'
    }
    if (r === 255 && g === 255 && b === 255) {
      // Pure white - definitely use black text
      return 'text-black'
    }
    
    // Calculate relative luminance using WCAG formula
    const sRGB = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    const luminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
    
    // Calculate contrast ratios for both black and white text
    const whiteContrast = (1 + 0.05) / (luminance + 0.05)
    const blackContrast = (luminance + 0.05) / (0 + 0.05)
    
    // Use a clear threshold: if luminance is less than 0.5, use white text
    // This is a more intuitive approach than just comparing contrast ratios
    return luminance < 0.5 ? 'text-white' : 'text-black'
  }

  // Helper function to validate contrast ratio for accessibility
  const validateContrastRatio = (bgColor: string, textColor: string): { ratio: number; isAccessible: boolean } => {
    const bgHex = bgColor.startsWith('#') ? bgColor : getColorValue(bgColor)
    
    // Calculate luminance for background
    const color = bgHex.replace('#', '')
    let r, g, b
    if (color.length === 3) {
      r = parseInt(color[0] + color[0], 16)
      g = parseInt(color[1] + color[1], 16)
      b = parseInt(color[2] + color[2], 16)
    } else {
      r = parseInt(color.substr(0, 2), 16)
      g = parseInt(color.substr(2, 2), 16)
      b = parseInt(color.substr(4, 2), 16)
    }
    
    const sRGB = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    const bgLuminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
    
    // Text luminance (white = 1, black = 0)
    const textLuminance = textColor.includes('white') ? 1 : 0
    
    // Calculate contrast ratio
    const lighter = Math.max(bgLuminance, textLuminance)
    const darker = Math.min(bgLuminance, textLuminance)
    const ratio = (lighter + 0.05) / (darker + 0.05)
    
    return {
      ratio: Math.round(ratio * 100) / 100,
      isAccessible: ratio >= 4.5 // WCAG AA standard for normal text
    }
  }

  if (disabled) {
    return (
      <div className={`flex items-center ${className}`}>
        <Button 
          variant="ghost" 
          size="sm"
          className={`${buttonSizeClasses[buttonSize]} flex-shrink-0 border-none bg-transparent opacity-50 cursor-not-allowed flex items-center justify-center shadow-none`}
          disabled
          aria-label={ariaLabel}
        >
          <Plus className={iconSizeClasses[buttonSize]} />
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className={`${buttonSizeClasses[buttonSize]} flex-shrink-0 border-none bg-transparent hover:bg-muted/50 flex items-center justify-center shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
            aria-label={ariaLabel}
          >
            <Plus className={iconSizeClasses[buttonSize]} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={dropdownAlign} className={`p-0 ${dropdownWidth}`}>
          <Command className="rounded-md border-none shadow-none">
            <CommandGroup className="p-1">
              {availableOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={(event) => event.preventDefault()}
                    className="flex items-center justify-between rounded-xs py-1.5 px-2"
                  >
                    <div className="flex items-center gap-2">
                      {allowColorSelection && (
                        <div
                          className="cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={(event) => handleColorClick(option.value, event)}
                          title={option.color ? `Change color for ${option.label}` : `Set color for ${option.label}`}
                        >
                          <Circle 
                            className="h-4 w-4"
                            style={option.color ? { 
                              backgroundColor: getColorValue(option.color.bgColor),
                              color: getColorValue(option.color.bgColor),
                              border: `1px solid ${getColorValue(option.color.bgColor)}`,
                              borderRadius: '50%',
                              fill: getColorValue(option.color.bgColor),
                              stroke: 'none'
                            } : {
                              backgroundColor: '#e5e7eb',
                              border: '1px solid #d1d5db',
                              borderRadius: '50%',
                              color: '#e5e7eb',
                              fill: '#e5e7eb',
                              stroke: 'none'
                            }}
                          />
                        </div>
                      )}
                      <span 
                        className="text-popover-foreground text-sm cursor-pointer"
                        onClick={(event) => handleToggleTag(option.value, event)}
                      >
                        {option.label}
                      </span>
                    </div>
                    <div className="h-4 w-4 flex items-center justify-center">
                      {isSelected && (
                        <Check className="h-4 w-4 text-popover-foreground" />
                      )}
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Color Selection Dialog */}
      {allowColorSelection && (
        <Dialog open={isColorDialogOpen} onOpenChange={setIsColorDialogOpen}>
          <DialogContent className="sm:max-w-md [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0 [&>button]:focus-visible:ring-0 [&>button]:focus-visible:ring-offset-0">
            <DialogHeader>
              <DialogTitle>Choose a color for {selectedTagForColor}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Preset Colors */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {availableColors.map((color) => (
                    <Button
                      key={color.name}
                      variant="ghost"
                      className="h-auto p-2 flex items-center gap-2 justify-start hover:bg-muted focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
                      onClick={() => handleColorSelection(color)}
                    >
                      <div 
                        className="w-4 h-4 rounded flex-shrink-0" 
                        style={{ backgroundColor: getColorValue(color.bgColor) }}
                      />
                      <span>{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Custom Color Picker */}
              <div>
                <h4 className="text-sm font-medium mb-3">Custom Color</h4>
                <div className="space-y-4">
                  <div className="w-full">
                    <HexColorPicker 
                      color={customColor} 
                      onChange={setCustomColor}
                      style={{ width: '100%', height: '200px' }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div 
                      className="w-6 h-6 rounded border-2 border-gray-200"
                      style={{ backgroundColor: customColor }}
                    />
                    <span className="text-sm font-mono">{customColor}</span>
                    <Button
                      size="sm"
                      onClick={handleCustomColorSelection}
                      className="ml-2"
                    >
                      Use This Color
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}