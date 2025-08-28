import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TableControls } from './table-controls'

const meta: Meta<typeof TableControls> = {
  title: 'Molecules/Table/TableControls',
  component: TableControls,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const ContactsTable: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      phone: false,
      company: true,
      careTeam: false,
      tags: true,
    })

    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'company', label: 'Company' },
      { key: 'careTeam', label: 'Care Team' },
      { key: 'tags', label: 'Tags' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Contacts table controls (Search + View button)</div>
        <div className="px-4">
          <TableControls
            search={{
              placeholder: "Search contacts...",
              value: searchValue,
              onChange: setSearchValue,
            }}
            actions={{
              columnSelector: {
                columns,
                visibleColumns,
                onToggleColumn: handleToggle,
              }
            }}
          />
        </div>
        <div className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
          <div><strong>Search:</strong> "{searchValue}"</div>
          <div><strong>Visible:</strong> {Object.entries(visibleColumns).filter(([_, visible]) => visible).map(([key]) => key).join(', ')}</div>
        </div>
      </div>
    )
  },
}

export const TicketsTable: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')
    const [visibleColumns, setVisibleColumns] = useState({
      title: true,
      id: false,
      opened: true,
      origin: false,
      status: true,
      actions: true,
    })

    const columns = [
      { key: 'title', label: 'Title' },
      { key: 'id', label: 'ID' },
      { key: 'opened', label: 'Opened' },
      { key: 'origin', label: 'Origin' },
      { key: 'status', label: 'Status' },
      { key: 'actions', label: 'Actions' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    const handleAddTicket = () => {
      alert('Add ticket clicked!')
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Tickets table controls (Search + View + Add buttons)</div>
        <div className="px-4">
          <TableControls
            search={{
              placeholder: "Search tickets...",
              value: searchValue,
              onChange: setSearchValue,
            }}
            actions={{
              columnSelector: {
                columns,
                visibleColumns,
                onToggleColumn: handleToggle,
              },
              addButton: {
                label: 'Add Ticket',
                onClick: handleAddTicket,
              }
            }}
          />
        </div>
        <div className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
          <div><strong>Search:</strong> "{searchValue}"</div>
          <div><strong>Visible:</strong> {Object.entries(visibleColumns).filter(([_, visible]) => visible).map(([key]) => key).join(', ')}</div>
        </div>
      </div>
    )
  },
}

export const SearchOnly: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Search only</div>
        <div className="px-4">
          <TableControls
            search={{
              placeholder: "Search items...",
              value: searchValue,
              onChange: setSearchValue,
            }}
          />
        </div>
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Search:</strong> "{searchValue}"</div>
        </div>
      </div>
    )
  },
}

export const ActionsOnly: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      col1: true,
      col2: false,
    })

    const columns = [
      { key: 'col1', label: 'Column 1' },
      { key: 'col2', label: 'Column 2' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    const handleAdd = () => {
      alert('Add clicked!')
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Actions only</div>
        <div className="px-4">
          <TableControls
            actions={{
              columnSelector: {
                columns,
                visibleColumns,
                onToggleColumn: handleToggle,
              },
              addButton: {
                label: 'Add Item',
                onClick: handleAdd,
              }
            }}
          />
        </div>
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Visible:</strong> {Object.entries(visibleColumns).filter(([_, visible]) => visible).map(([key]) => key).join(', ')}</div>
        </div>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      phone: true,
      company: false,
    })
    const [items, setItems] = useState(['Alice', 'Bob', 'Charlie'])

    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'company', label: 'Company' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    const handleAdd = () => {
      const names = ['David', 'Eva', 'Frank', 'Grace', 'Henry']
      const newName = names[Math.floor(Math.random() * names.length)]
      setItems(prev => [...prev, newName])
    }

    const filteredItems = items.filter(item => 
      item.toLowerCase().includes(searchValue.toLowerCase())
    )

    const visibleCount = Object.values(visibleColumns).filter(Boolean).length

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Interactive demo</div>
        <div className="px-4">
          <TableControls
            search={{
              placeholder: "Search names...",
              value: searchValue,
              onChange: setSearchValue,
            }}
            actions={{
              columnSelector: {
                columns,
                visibleColumns,
                onToggleColumn: handleToggle,
              },
              addButton: {
                label: 'Add Person',
                onClick: handleAdd,
              }
            }}
          />
        </div>
        <div className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
          <div><strong>Total items:</strong> {items.length}</div>
          <div><strong>Filtered items:</strong> {filteredItems.length} ({filteredItems.join(', ')})</div>
          <div><strong>Visible columns:</strong> {visibleCount}/{columns.length}</div>
        </div>
      </div>
    )
  },
}