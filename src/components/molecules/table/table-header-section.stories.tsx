import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TableHeaderSection } from './table-header-section'

const meta: Meta<typeof TableHeaderSection> = {
  title: 'Molecules/Table/TableHeaderSection',
  component: TableHeaderSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
    },
    showTable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ContactsHeader: Story = {
  args: {
    columns: [
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        width: 'w-48'
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        width: 'w-64'
      },
      {
        key: 'phone',
        label: 'Phone',
        sortable: false,
        width: 'w-32'
      },
      {
        key: 'company',
        label: 'Company',
        sortable: true,
        width: 'w-40'
      },
    ],
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-4xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Contacts table header</div>
        <TableHeaderSection {...args} />
      </div>
    )
  },
}

export const TicketsHeader: Story = {
  args: {
    columns: [
      {
        key: 'title',
        label: 'Title',
        sortable: true,
        width: 'w-64'
      },
      {
        key: 'id',
        label: 'ID',
        sortable: false,
        width: 'w-20'
      },
      {
        key: 'opened',
        label: 'Opened',
        sortable: true,
        width: 'w-24'
      },
      {
        key: 'status',
        label: 'Status',
        sortable: false,
        width: 'w-48'
      },
      {
        key: 'actions',
        label: 'Actions',
        sortable: false,
        width: 'w-32'
      },
    ],
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-4xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Tickets table header</div>
        <TableHeaderSection {...args} />
      </div>
    )
  },
}

export const MixedHeaders: Story = {
  args: {
    columns: [
      {
        key: 'sortable1',
        label: 'Sortable Column',
        sortable: true,
      },
      {
        key: 'static1',
        label: 'Static Column',
        sortable: false,
      },
      {
        key: 'sortable2',
        label: 'Another Sortable',
        sortable: true,
      },
      {
        key: 'static2',
        label: 'Another Static',
        sortable: false,
      },
    ],
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-3xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Mixed sortable and static headers</div>
        <TableHeaderSection {...args} />
      </div>
    )
  },
}

export const WithoutSticky: Story = {
  args: {
    columns: [
      {
        key: 'col1',
        label: 'Column 1',
        sortable: true,
      },
      {
        key: 'col2',
        label: 'Column 2',
        sortable: false,
      },
      {
        key: 'col3',
        label: 'Column 3',
        sortable: true,
      },
    ],
    sticky: false,
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-2xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Non-sticky header</div>
        <TableHeaderSection {...args} />
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [sortStates, setSortStates] = useState<Record<string, 'asc' | 'desc' | null>>({
      name: null,
      email: null,
      created: null,
    })

    const handleSort = (columnKey: string) => {
      setSortStates(prev => ({
        ...prev,
        [columnKey]: prev[columnKey] === 'asc' ? 'desc' : prev[columnKey] === 'desc' ? null : 'asc'
      }))
    }

    const columns = [
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        onSort: () => handleSort('name'),
      },
      {
        key: 'email', 
        label: 'Email',
        sortable: true,
        onSort: () => handleSort('email'),
      },
      {
        key: 'role',
        label: 'Role',
        sortable: false,
      },
      {
        key: 'created',
        label: 'Created',
        sortable: true,
        onSort: () => handleSort('created'),
      },
    ]

    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-3xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Interactive header with sorting</div>
        <TableHeaderSection columns={columns} />
        <div className="mt-4 p-4 space-y-2 text-xs text-muted-foreground">
          <div>Sort states:</div>
          {Object.entries(sortStates).map(([key, state]) => (
            <div key={key}>
              <strong>{key}:</strong> {state || 'none'}
            </div>
          ))}
          <div className="text-blue-600 mt-2">
            Click the sortable headers to change sort state!
          </div>
        </div>
      </div>
    )
  },
}

export const WithoutTableWrapper: Story = {
  args: {
    columns: [
      {
        key: 'col1',
        label: 'Column 1',
        sortable: true,
      },
      {
        key: 'col2',
        label: 'Column 2',
        sortable: false,
      },
    ],
    showTable: false,
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-muted/5 w-full max-w-2xl">
        <div className="text-sm text-muted-foreground mb-4 p-4">Header without Table wrapper (for custom table layouts)</div>
        <div className="overflow-hidden">
          <table className="w-full">
            <TableHeaderSection {...args} />
          </table>
        </div>
      </div>
    )
  },
}