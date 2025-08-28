import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagSelector, type TagSelectorOption, type TagColor } from './tag-selector'

const meta: Meta<typeof TagSelector> = {
  title: 'Molecules/Table/TagSelector',
  component: TagSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleTag: { action: 'tag toggled' },
    onColorClick: { action: 'color clicked' },
    buttonSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dropdownAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions: TagSelectorOption[] = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high-priority', label: 'High Priority' },
  { value: 'medium-priority', label: 'Medium Priority' },
  { value: 'low-priority', label: 'Low Priority' },
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
  { value: 'enhancement', label: 'Enhancement' },
  { value: 'documentation', label: 'Documentation' },
]

const coloredOptions: TagSelectorOption[] = [
  { 
    value: 'urgent', 
    label: 'Urgent',
    color: { name: 'Red', variant: 'destructive', bgColor: 'bg-red-500', textColor: 'text-white' }
  },
  { 
    value: 'high-priority', 
    label: 'High Priority',
    color: { name: 'Yellow', variant: 'outline', bgColor: 'bg-yellow-500', textColor: 'text-black' }
  },
  { 
    value: 'medium-priority', 
    label: 'Medium Priority',
    color: { name: 'Blue', variant: 'outline', bgColor: 'bg-blue-500', textColor: 'text-white' }
  },
  { 
    value: 'low-priority', 
    label: 'Low Priority',
    color: { name: 'Green', variant: 'outline', bgColor: 'bg-green-500', textColor: 'text-white' }
  },
  { value: 'bug', label: 'Bug' },
  { value: 'feature', label: 'Feature' },
]

export const Default: Story = {
  args: {
    availableOptions: sampleOptions,
    selectedValues: ['high-priority'],
    onToggleTag: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">Default tag selector</div>
      <TagSelector {...args} />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['high-priority'])
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Interactive tag selector</div>
        
        <div className="flex items-center gap-2">
          <TagSelector 
            availableOptions={sampleOptions}
            selectedValues={selectedTags}
            onToggleTag={handleToggleTag}
          />
          <div className="text-xs text-muted-foreground">
            Selected: {selectedTags.join(', ') || 'None'}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Instructions:</strong> Click the plus button to add/remove tags</div>
          <div><strong>Selected tags:</strong> {selectedTags.length}</div>
        </div>
      </div>
    )
  },
}

export const WithColorSelection: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['urgent'])
    const [lastColorClick, setLastColorClick] = useState<string>('')
    const [lastColorSelection, setLastColorSelection] = useState<string>('')
    const [tagColors, setTagColors] = useState<Record<string, TagColor>>({})
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    const handleColorClick = (value: string) => {
      setLastColorClick(value)
    }

    const handleColorSelection = (tagValue: string, color: TagColor) => {
      setTagColors(prev => ({
        ...prev,
        [tagValue]: color
      }))
      setLastColorSelection(`${tagValue} → ${color.name}`)
    }

    // Update options with selected colors
    const optionsWithColors = coloredOptions.map(option => ({
      ...option,
      color: tagColors[option.value] || option.color
    }))

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Tag selector with color options</div>
        
        <div className="flex items-center gap-2">
          <TagSelector 
            availableOptions={optionsWithColors}
            selectedValues={selectedTags}
            onToggleTag={handleToggleTag}
            onColorClick={handleColorClick}
            onColorSelection={handleColorSelection}
            allowColorSelection={true}
          />
          <div className="text-xs text-muted-foreground">
            Selected: {selectedTags.join(', ') || 'None'}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Instructions:</strong> Click tag names to select/deselect, click color circles to change colors</div>
          <div><strong>Features:</strong> Preset colors + Custom color picker with accessibility-focused contrast</div>
          <div><strong>Accessibility:</strong> All colors meet WCAG AA contrast standards (4.5:1 ratio)</div>
          <div><strong>Selected tags:</strong> {selectedTags.length}</div>
          <div><strong>Last color clicked:</strong> {lastColorClick || 'None'}</div>
          <div><strong>Last color selection:</strong> {lastColorSelection || 'None'}</div>
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['feature'])
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Different sizes</div>
        
        <div className="space-y-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground w-8">{size}</div>
              <div className="border rounded p-2 bg-background flex items-center gap-2">
                <TagSelector 
                  availableOptions={sampleOptions.slice(0, 4)}
                  selectedValues={selectedTags}
                  onToggleTag={handleToggleTag}
                  buttonSize={size}
                />
                <span className="text-sm text-muted-foreground">Size {size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const States: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['bug'])
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Different states</div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Normal</div>
            <div className="border rounded p-2 bg-background w-fit">
              <TagSelector 
                availableOptions={sampleOptions.slice(0, 3)}
                selectedValues={selectedTags}
                onToggleTag={handleToggleTag}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Disabled</div>
            <div className="border rounded p-2 bg-background w-fit">
              <TagSelector 
                availableOptions={sampleOptions.slice(0, 3)}
                selectedValues={selectedTags}
                onToggleTag={handleToggleTag}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const DropdownAlignment: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Dropdown alignment options</div>
        
        <div className="space-y-4">
          {(['start', 'center', 'end'] as const).map((align) => (
            <div key={align} className="flex items-center gap-4 justify-center">
              <div className="text-xs text-muted-foreground w-16">{align}</div>
              <div className="border rounded p-4 bg-background flex items-center gap-2 w-64 justify-center">
                <TagSelector 
                  availableOptions={sampleOptions.slice(0, 4)}
                  selectedValues={selectedTags}
                  onToggleTag={handleToggleTag}
                  dropdownAlign={align}
                />
                <span className="text-sm text-muted-foreground">Align {align}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const CustomColorPicker: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['design'])
    const [customColors, setCustomColors] = useState<Record<string, TagColor>>({})
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    const handleColorSelection = (tagValue: string, color: TagColor) => {
      setCustomColors(prev => ({
        ...prev,
        [tagValue]: color
      }))
    }

    const customColorOptions = [
      { value: 'design', label: 'Design' },
      { value: 'development', label: 'Development' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'research', label: 'Research' }
    ].map(option => ({
      ...option,
      color: customColors[option.value]
    }))

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Custom color picker demo</div>
        
        <div className="flex items-center gap-2 mb-4">
          <TagSelector 
            availableOptions={customColorOptions}
            selectedValues={selectedTags}
            onToggleTag={handleToggleTag}
            onColorSelection={handleColorSelection}
            allowColorSelection={true}
          />
          <div className="text-xs text-muted-foreground">
            Selected: {selectedTags.join(', ') || 'None'}
          </div>
        </div>

        <div className="space-y-2">
          {customColorOptions.filter(opt => opt.color).map(option => (
            <div key={option.value} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded border"
                style={{ backgroundColor: option.color?.bgColor.startsWith('#') ? option.color.bgColor : undefined }}
              />
              <span>{option.label}: {option.color?.bgColor}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Instructions:</strong> Click color circles to open custom color picker</div>
          <div><strong>Features:</strong> Full spectrum color picker with hex input</div>
        </div>
      </div>
    )
  },
}

export const AccessibilityDemo: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['accessibility'])
    const [customColors, setCustomColors] = useState<Record<string, TagColor>>({
      'accessibility': { name: 'Custom', variant: 'outline', bgColor: '#b91c1c', textColor: 'text-white' },
      'contrast': { name: 'Custom', variant: 'outline', bgColor: '#15803d', textColor: 'text-white' },
      'wcag': { name: 'Custom', variant: 'outline', bgColor: '#1d4ed8', textColor: 'text-white' },
      'test': { name: 'Custom', variant: 'outline', bgColor: '#c2410c', textColor: 'text-white' }
    })
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    const handleColorSelection = (tagValue: string, color: TagColor) => {
      setCustomColors(prev => ({
        ...prev,
        [tagValue]: color
      }))
    }

    const accessibilityOptions = [
      { value: 'accessibility', label: 'Accessibility' },
      { value: 'contrast', label: 'High Contrast' },
      { value: 'wcag', label: 'WCAG Compliant' },
      { value: 'test', label: 'Color Test' },
      { value: 'readable', label: 'Readable Text' }
    ].map(option => ({
      ...option,
      color: customColors[option.value]
    }))

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Accessibility-focused color selection</div>
        
        <div className="flex items-center gap-2 mb-4">
          <TagSelector 
            availableOptions={accessibilityOptions}
            selectedValues={selectedTags}
            onToggleTag={handleToggleTag}
            onColorSelection={handleColorSelection}
            allowColorSelection={true}
          />
          <div className="text-xs text-muted-foreground">
            Selected: {selectedTags.join(', ') || 'None'}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Color Contrast Examples:</div>
          {accessibilityOptions.filter(opt => opt.color).map(option => {
            const color = option.color!
            const isHex = color.bgColor.startsWith('#')
            
            return (
              <div key={option.value} className="flex items-center justify-between p-2 bg-background rounded border">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold border"
                    style={isHex ? { 
                      backgroundColor: color.bgColor, 
                      color: color.textColor.includes('white') ? 'white' : 'black' 
                    } : {}}
                  >
                    Aa
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {isHex ? 'Custom Color' : 'Preset Color'}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Accessibility Features:</strong></div>
          <div>• Automatic contrast calculation using WCAG guidelines</div>
          <div>• Support for both 3-digit and 6-digit hex colors</div>
          <div>• Text color automatically selected for optimal readability</div>
          <div>• All preset colors meet WCAG AA standards (4.5:1 ratio)</div>
        </div>
      </div>
    )
  },
}

export const CustomWidth: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    
    const handleToggleTag = (value: string) => {
      setSelectedTags(prev => 
        prev.includes(value) 
          ? prev.filter(tag => tag !== value)
          : [...prev, value]
      )
    }

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Custom dropdown widths</div>
        
        <div className="space-y-4">
          {[
            { width: 'w-32', label: 'Narrow (w-32)' },
            { width: 'w-48', label: 'Default (w-48)' },
            { width: 'w-64', label: 'Wide (w-64)' },
            { width: 'w-80', label: 'Extra Wide (w-80)' },
          ].map(({ width, label }) => (
            <div key={width} className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground w-24">{label}</div>
              <div className="border rounded p-2 bg-background flex items-center gap-2">
                <TagSelector 
                  availableOptions={sampleOptions}
                  selectedValues={selectedTags}
                  onToggleTag={handleToggleTag}
                  dropdownWidth={width}
                />
                <span className="text-sm text-muted-foreground">{width}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}