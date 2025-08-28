import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ColumnSelector } from './column-selector'

const meta: Meta<typeof ColumnSelector> = {
  title: 'Molecules/Table/ColumnSelector',
  component: ColumnSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleColumn: { action: 'column toggled' },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ContactsColumns: Story = {
  render: () => {
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
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Contacts table column selector</div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggle}
        />
        <div className="mt-4 space-y-1 text-xs text-muted-foreground">
          <div><strong>Visible columns:</strong></div>
          {Object.entries(visibleColumns).map(([key, visible]) => (
            <div key={key}>
              {key}: {visible ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const TicketsColumns: Story = {
  render: () => {
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

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Tickets table column selector</div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggle}
        />
        <div className="mt-4 space-y-1 text-xs text-muted-foreground">
          <div><strong>Visible columns:</strong></div>
          {Object.entries(visibleColumns).map(([key, visible]) => (
            <div key={key}>
              {key}: {visible ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const CustomLabel: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      col1: true,
      col2: false,
      col3: true,
    })

    const columns = [
      { key: 'col1', label: 'Column 1' },
      { key: 'col2', label: 'Column 2' },
      { key: 'col3', label: 'Column 3' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Custom button text</div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggle}
          buttonText="Columns"
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    columns: [
      { key: 'col1', label: 'Column 1' },
      { key: 'col2', label: 'Column 2' },
    ],
    visibleColumns: { col1: true, col2: false },
    disabled: true,
  },
  render: (args) => {
    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Disabled state</div>
        <ColumnSelector {...args} />
      </div>
    )
  },
}

export const ManyColumns: Story = {
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      phone: false,
      company: true,
      department: false,
      role: true,
      location: false,
      startDate: false,
      manager: false,
      status: true,
      tags: true,
      notes: false,
    })

    const columns = [
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email Address' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'company', label: 'Company' },
      { key: 'department', label: 'Department' },
      { key: 'role', label: 'Job Role' },
      { key: 'location', label: 'Location' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'manager', label: 'Manager' },
      { key: 'status', label: 'Status' },
      { key: 'tags', label: 'Tags' },
      { key: 'notes', label: 'Notes' },
    ]

    const handleToggle = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    const visibleCount = Object.values(visibleColumns).filter(Boolean).length

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Many columns example</div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggle}
        />
        <div className="mt-4 text-xs text-muted-foreground">
          <div><strong>Showing {visibleCount} of {columns.length} columns</strong></div>
        </div>
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

    const showAll = () => {
      setVisibleColumns(
        columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
      )
    }

    const hideAll = () => {
      setVisibleColumns(
        columns.reduce((acc, col) => ({ ...acc, [col.key]: false }), {})
      )
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Interactive</div>
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggle}
        />
        <div className="mt-4 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={showAll}
              className="text-xs underline text-muted-foreground hover:text-foreground"
            >
              Show All
            </button>
            <button
              onClick={hideAll}
              className="text-xs underline text-muted-foreground hover:text-foreground"
            >
              Hide All
            </button>
          </div>
          <div className="text-xs text-blue-600">
            Click the View button to toggle columns!
          </div>
        </div>
      </div>
    )
  },
}