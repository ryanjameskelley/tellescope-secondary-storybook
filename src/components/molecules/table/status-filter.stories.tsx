import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StatusFilter } from './status-filter'

const meta: Meta<typeof StatusFilter> = {
  title: 'Molecules/Table/StatusFilter',
  component: StatusFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectionChange: { action: 'selection changed' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(["Feature"])
    
    const items = [
      { label: "Feature", count: 83 },
      { label: "Backend", count: 74 },
      { label: "Bug", count: 78 },
      { label: "Frontend", count: 97 },
      { label: "Documentation", count: 70 },
      { label: "Performance", count: 82 },
    ]

    return (
      <div className="w-80">
        <div className="text-sm text-muted-foreground mb-4">
          Status filter with counts
        </div>
        <StatusFilter 
          items={items}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          placeholder="Search statuses..."
        />
        <div className="mt-4 text-xs text-muted-foreground">
          Selected: {selectedItems.join(', ') || 'None'}
        </div>
      </div>
    )
  },
}

export const WithoutCounts: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    
    const items = [
      { label: "To Do" },
      { label: "In Progress" },
      { label: "Review" },
      { label: "Done" },
      { label: "Blocked" },
    ]

    return (
      <div className="w-80">
        <div className="text-sm text-muted-foreground mb-4">
          Status filter without counts
        </div>
        <StatusFilter 
          items={items}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          placeholder="Search statuses..."
        />
        <div className="mt-4 text-xs text-muted-foreground">
          Selected: {selectedItems.join(', ') || 'None'}
        </div>
      </div>
    )
  },
}

export const TicketStatuses: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(["Medium Priority"])
    
    const items = [
      { label: "Feature", count: 25 },
      { label: "Bug", count: 12 },
      { label: "Frontend", count: 18 },
      { label: "Backend", count: 15 },
      { label: "High Priority", count: 8 },
      { label: "Medium Priority", count: 32 },
      { label: "Low Priority", count: 45 },
      { label: "To Do", count: 28 },
      { label: "In Progress", count: 15 },
      { label: "Review", count: 9 },
      { label: "Done", count: 67 },
    ]

    return (
      <div className="w-80">
        <div className="text-sm text-muted-foreground mb-4">
          Ticket status filter (realistic data)
        </div>
        <StatusFilter 
          items={items}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          placeholder="Search ticket statuses..."
        />
        <div className="mt-4 space-y-1">
          <div className="text-xs text-muted-foreground">
            Selected ({selectedItems.length}): {selectedItems.join(', ') || 'None'}
          </div>
          <div className="text-xs text-muted-foreground">
            Total items: {items.reduce((sum, item) => sum + (item.count || 0), 0)}
          </div>
        </div>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>(["Feature", "Bug"])
    
    const items = [
      { label: "Feature", count: 83 },
      { label: "Backend", count: 74 },
      { label: "Bug", count: 78 },
      { label: "Frontend", count: 97 },
      { label: "Documentation", count: 70 },
      { label: "Performance", count: 82 },
      { label: "Testing", count: 65 },
      { label: "Security", count: 45 },
    ]

    return (
      <div className="w-80">
        <div className="text-sm text-muted-foreground mb-4">
          Interactive filter demo
        </div>
        <StatusFilter 
          items={items}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />
        <div className="mt-4 space-y-2">
          <div className="text-xs text-muted-foreground">
            <strong>Selected filters:</strong> {selectedItems.length > 0 ? selectedItems.join(', ') : 'None'}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedItems([])}
              className="text-xs underline text-muted-foreground hover:text-foreground"
            >
              Clear All
            </button>
            <button 
              onClick={() => setSelectedItems(items.map(item => item.label))}
              className="text-xs underline text-muted-foreground hover:text-foreground"
            >
              Select All
            </button>
          </div>
        </div>
      </div>
    )
  },
}