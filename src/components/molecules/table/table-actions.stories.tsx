import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TableActions } from './table-actions'

const meta: Meta<typeof TableActions> = {
  title: 'Molecules/Table/TableActions',
  component: TableActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ViewOnly: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      phone: false,
      company: true,
      tags: true,
    })

    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'company', label: 'Company' },
      { key: 'tags', label: 'Tags' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">View button only (like contacts table)</div>
        <TableActions
          columnSelector={{
            columns,
            visibleColumns,
            onToggleColumn: handleToggle,
          }}
        />
      </div>
    )
  },
}

export const ViewWithAdd: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      title: true,
      id: false,
      opened: true,
      status: true,
      actions: true,
    })

    const columns = [
      { key: 'title', label: 'Title' },
      { key: 'id', label: 'ID' },
      { key: 'opened', label: 'Opened' },
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
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">View + Add buttons (like tickets table)</div>
        <TableActions
          columnSelector={{
            columns,
            visibleColumns,
            onToggleColumn: handleToggle,
          }}
          addButton={{
            label: 'Add Ticket',
            onClick: handleAddTicket,
          }}
        />
      </div>
    )
  },
}

export const AddOnly: Story = {
  render: () => {
    const handleAdd = () => {
      alert('Add clicked!')
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Add button only</div>
        <TableActions
          addButton={{
            label: 'Add Item',
            onClick: handleAdd,
          }}
        />
      </div>
    )
  },
}

export const CustomLabels: Story = {
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
      alert('Create new clicked!')
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Custom labels</div>
        <TableActions
          columnSelector={{
            columns,
            visibleColumns,
            onToggleColumn: handleToggle,
            buttonText: 'Columns',
          }}
          addButton={{
            label: 'Create New',
            onClick: handleAdd,
          }}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    columnSelector: {
      columns: [
        { key: 'col1', label: 'Column 1' },
        { key: 'col2', label: 'Column 2' },
      ],
      visibleColumns: { col1: true, col2: false },
      onToggleColumn: () => {},
    },
    addButton: {
      label: 'Add Item',
      onClick: () => {},
    },
    disabled: true,
  },
  render: (args) => {
    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Disabled state</div>
        <TableActions {...args} />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      phone: true,
      company: false,
    })

    const [items, setItems] = useState(['Item 1', 'Item 2'])

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
      setItems(prev => [...prev, `Item ${prev.length + 1}`])
    }

    const visibleCount = Object.values(visibleColumns).filter(Boolean).length

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Interactive demo</div>
        <TableActions
          columnSelector={{
            columns,
            visibleColumns,
            onToggleColumn: handleToggle,
          }}
          addButton={{
            label: 'Add Item',
            onClick: handleAdd,
          }}
        />
        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <div><strong>Showing {visibleCount} of {columns.length} columns</strong></div>
          <div><strong>Items:</strong> {items.join(', ')}</div>
        </div>
      </div>
    )
  },
}