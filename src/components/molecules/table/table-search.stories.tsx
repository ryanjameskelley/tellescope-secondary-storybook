import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TableSearch } from './table-search'

const meta: Meta<typeof TableSearch> = {
  title: 'Molecules/Table/TableSearch',
  component: TableSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'search changed' },
    onFilterClick: { action: 'filter clicked' },
    showFilter: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ContactsSearch: Story = {
  args: {
    placeholder: "Find someone",
    showFilter: false,
  },
  render: (args) => {
    const [value, setValue] = useState("")
    
    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Contacts table search</div>
        <TableSearch 
          {...args}
          value={value}
          onChange={setValue}
        />
        {value && (
          <div className="mt-4 text-xs text-muted-foreground">
            Searching for: "{value}"
          </div>
        )}
      </div>
    )
  },
}

export const TicketsSearch: Story = {
  args: {
    placeholder: "Find tickets",
    showFilter: true,
    filterLabel: "Filter",
  },
  render: (args) => {
    const [value, setValue] = useState("")
    
    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Tickets table search with filter</div>
        <TableSearch 
          {...args}
          value={value}
          onChange={setValue}
        />
        {value && (
          <div className="mt-4 text-xs text-muted-foreground">
            Searching for: "{value}"
          </div>
        )}
      </div>
    )
  },
}


export const States: Story = {
  render: () => {
    const [values, setValues] = useState({ 
      normal: "", 
      disabled: "Disabled state",
      withValue: "Some search text"
    })
    
    const handleChange = (key: string, value: string) => {
      setValues(prev => ({ ...prev, [key]: value }))
    }
    
    return (
      <div className="space-y-6 p-8">
        <div className="text-sm text-muted-foreground mb-4">Different states</div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">Normal</div>
          <TableSearch 
            placeholder="Normal state"
            showFilter
            value={values.normal}
            onChange={(value) => handleChange('normal', value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">Disabled</div>
          <TableSearch 
            placeholder="Disabled state"
            showFilter
            disabled
            value={values.disabled}
            onChange={(value) => handleChange('disabled', value)}
          />
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground font-medium">With Value</div>
          <TableSearch 
            placeholder="With value"
            showFilter
            value={values.withValue}
            onChange={(value) => handleChange('withValue', value)}
          />
        </div>
      </div>
    )
  },
}


export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("")
    const [selectedFilters, setSelectedFilters] = useState<string[]>(["Feature"])
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    
    const filterItems = [
      { label: "Feature", count: 25 },
      { label: "Bug", count: 12 },
      { label: "Enhancement", count: 8 },
      { label: "High Priority", count: 15 },
      { label: "Medium Priority", count: 22 },
      { label: "Low Priority", count: 18 },
      { label: "In Progress", count: 9 },
      { label: "To Do", count: 14 },
      { label: "Done", count: 31 },
    ]
    
    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Interactive</div>
        <TableSearch 
          placeholder="Try typing and clicking filter..."
          showFilter
          value={value}
          onChange={setValue}
          filterItems={filterItems}
          selectedFilters={selectedFilters}
          onFilterSelectionChange={setSelectedFilters}
          filterPlaceholder="Search statuses..."
          isFilterOpen={isFilterOpen}
          onFilterOpenChange={setIsFilterOpen}
        />
        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          {value && <div>Search value: "{value}"</div>}
          {selectedFilters.length > 0 && (
            <div>
              <strong>Active filters:</strong> {selectedFilters.join(', ')}
            </div>
          )}
          <div className="text-xs text-blue-600">
            Click the Filter button to see the interactive menu!
          </div>
        </div>
      </div>
    )
  },
}