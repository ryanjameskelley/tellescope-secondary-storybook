import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DataTable, type DataTableProps } from './data-table'
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCheck, Pencil, Trash, Eye } from 'lucide-react'

const meta: Meta<typeof DataTable> = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible, configuration-driven data table organism that composes atoms and molecules into a complete table solution. Supports sorting, filtering, pagination, selection, drag-and-drop, and custom cell rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enableSorting: { control: 'boolean' },
    enableFiltering: { control: 'boolean' },
    enablePagination: { control: 'boolean' },
    enableSelection: { control: 'boolean' },
    enableDragDrop: { control: 'boolean' },
    pageSize: { control: 'number' },
    searchPlaceholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample data types
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
}

interface Task {
  id: string
  title: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in-progress' | 'review' | 'done'
  assignee: string
  dueDate: string
  tags: string[]
}

// Sample data
const userData: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Developer',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Designer',
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: 'u3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2024-01-10'
  },
  {
    id: 'u4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Developer',
    status: 'pending',
    lastLogin: '2024-01-12'
  },
  {
    id: 'u5',
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'QA Engineer',
    status: 'active',
    lastLogin: '2024-01-13'
  },
  {
    id: 'u6',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Product Manager',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: 'u7',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    role: 'DevOps Engineer',
    status: 'inactive',
    lastLogin: '2024-01-08'
  },
  {
    id: 'u8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    role: 'UI/UX Designer',
    status: 'active',
    lastLogin: '2024-01-14'
  }
]

const taskData: Task[] = [
  {
    id: 't1',
    title: 'Implement user authentication',
    priority: 'high',
    status: 'in-progress',
    assignee: 'John Doe',
    dueDate: '2024-01-20',
    tags: ['frontend', 'security']
  },
  {
    id: 't2',
    title: 'Design landing page',
    priority: 'medium',
    status: 'review',
    assignee: 'Jane Smith',
    dueDate: '2024-01-18',
    tags: ['design', 'ui']
  },
  {
    id: 't3',
    title: 'Fix database performance issues',
    priority: 'urgent',
    status: 'todo',
    assignee: 'Mike Johnson',
    dueDate: '2024-01-16',
    tags: ['backend', 'performance']
  },
  {
    id: 't4',
    title: 'Write API documentation',
    priority: 'low',
    status: 'done',
    assignee: 'Sarah Wilson',
    dueDate: '2024-01-22',
    tags: ['documentation', 'api']
  },
  {
    id: 't5',
    title: 'Set up CI/CD pipeline',
    priority: 'medium',
    status: 'in-progress',
    assignee: 'Robert Taylor',
    dueDate: '2024-01-25',
    tags: ['devops', 'automation']
  }
]

// Column definitions for users
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant = status === 'active' ? 'default' : status === 'inactive' ? 'destructive' : 'secondary'
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

// Column definitions for tasks
const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      const variant = priority === 'urgent' ? 'destructive' : priority === 'high' ? 'destructive' : priority === 'medium' ? 'default' : 'secondary'
      return <Badge variant={variant}>{priority}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return <Badge variant="outline">{status}</Badge>
    },
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]
      return (
        <div className="flex gap-1 flex-wrap">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
  },
]

export const BasicTable: Story = {
  args: {
    data: userData,
    columns: userColumns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    searchPlaceholder: "Search users...",
    pageSize: 5,
    scrollableColumns: [
      { key: 'name', label: 'Name', width: 'w-48', sortable: true, visible: true },
      { key: 'email', label: 'Email', width: 'w-64', sortable: true, visible: true },
      { key: 'role', label: 'Role', width: 'w-32', sortable: true, visible: true },
      { key: 'status', label: 'Status', width: 'w-24', sortable: true, visible: true },
      { key: 'lastLogin', label: 'Last Login', width: 'w-32', sortable: true, visible: true },
      { key: 'actions', label: 'Actions', width: 'w-32', sortable: false, visible: true },
    ],
    actionButtons: [
      {
        label: 'Add User',
        onClick: () => alert('Add user clicked'),
        variant: 'default',
      },
    ],
  },
  render: (args) => (
    <div className="p-4">
      <DataTable {...args} />
    </div>
  ),
}

export const InteractiveTable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [visibleColumns, setVisibleColumns] = useState({
      name: true,
      email: true,
      role: true,
      status: true,
      lastLogin: true,
      actions: true,
    })
    const [globalFilter, setGlobalFilter] = useState("")

    const handleRowSelect = (rowId: string) => {
      setSelectedRows(prev => 
        prev.includes(rowId) 
          ? prev.filter(id => id !== rowId)
          : [...prev, rowId]
      )
    }

    const handleSelectAll = () => {
      setSelectedRows(prev => 
        prev.length === userData.length ? [] : userData.map(u => u.id)
      )
    }

    const handleToggleColumn = (columnKey: string) => {
      setVisibleColumns(prev => ({
        ...prev,
        [columnKey]: !prev[columnKey as keyof typeof prev]
      }))
    }

    return (
      <div className="p-4 space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected rows: {selectedRows.length} | 
          Visible columns: {Object.values(visibleColumns).filter(Boolean).length}
        </div>
        
        <DataTable
          data={userData}
          columns={userColumns}
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          enableSelection={true}
          searchPlaceholder="Search users..."
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
          pageSize={5}
          scrollableColumns={[
            { key: 'name', label: 'Name', width: 'w-48', sortable: true, visible: true },
            { key: 'email', label: 'Email', width: 'w-64', sortable: true, visible: true },
            { key: 'role', label: 'Role', width: 'w-32', sortable: true, visible: true },
            { key: 'status', label: 'Status', width: 'w-24', sortable: true, visible: true },
            { key: 'lastLogin', label: 'Last Login', width: 'w-32', sortable: true, visible: true },
            { key: 'actions', label: 'Actions', width: 'w-32', sortable: false, visible: true },
          ]}
          actionButtons={[
            {
              label: 'Add User',
              onClick: () => alert('Add user clicked'),
            },
          ]}
          hoverActions={[
            {
              icon: Eye,
              onClick: (user) => alert(`View ${user.name}`),
              label: 'View User',
            },
          ]}
        />
      </div>
    )
  },
}

export const TaskManagementTable: Story = {
  render: () => {
    const [tasks, setTasks] = useState(taskData)
    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [dragOverItem, setDragOverItem] = useState<string | null>(null)
    const [hoveredRowId, setHoveredRowId] = useState<string | null>(null)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleDragStart = (itemId: string) => {
      setDraggedItem(itemId)
    }

    const handleDragEnd = () => {
      setDraggedItem(null)
      setDragOverItem(null)
    }

    const handleDrop = (draggedId: string, targetId: string) => {
      if (draggedId === targetId) return
      
      setTasks(prev => {
        const draggedIndex = prev.findIndex(t => t.id === draggedId)
        const targetIndex = prev.findIndex(t => t.id === targetId)
        
        const newTasks = [...prev]
        const [removed] = newTasks.splice(draggedIndex, 1)
        newTasks.splice(targetIndex, 0, removed)
        
        return newTasks
      })
    }

    const priorityItems = [
      { label: 'urgent', count: tasks.filter(t => t.priority === 'urgent').length },
      { label: 'high', count: tasks.filter(t => t.priority === 'high').length },
      { label: 'medium', count: tasks.filter(t => t.priority === 'medium').length },
      { label: 'low', count: tasks.filter(t => t.priority === 'low').length },
    ]

    return (
      <div className="p-4">
        <DataTable
          data={tasks}
          columns={taskColumns}
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          enableDragDrop={true}
          searchPlaceholder="Search tasks..."
          draggedItem={draggedItem}
          dragOverItem={dragOverItem}
          hoveredRowId={hoveredRowId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onRowHover={setHoveredRowId}
          fixedColumns={['title']}
          scrollableColumns={[
            { key: 'priority', label: 'Priority', width: 'w-24', sortable: true, visible: true },
            { key: 'status', label: 'Status', width: 'w-32', sortable: true, visible: true },
            { key: 'assignee', label: 'Assignee', width: 'w-40', sortable: true, visible: true },
            { key: 'dueDate', label: 'Due Date', width: 'w-32', sortable: true, visible: true },
            { key: 'tags', label: 'Tags', width: 'w-48', sortable: false, visible: true },
          ]}
          visibleColumns={{
            priority: true,
            status: true,
            assignee: true,
            dueDate: true,
            tags: true,
          }}
          filterConfig={{
            label: "Priority",
            items: priorityItems,
            selectedFilters,
            onFilterSelectionChange: setSelectedFilters,
            placeholder: "Search priorities...",
            showFilter: true,
          }}
          actionButtons={[
            {
              label: 'Add Task',
              onClick: () => alert('Add task clicked'),
            },
          ]}
          pageSize={10}
        />
      </div>
    )
  },
}

export const MinimalTable: Story = {
  args: {
    data: userData.slice(0, 3),
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
    ],
    enableSorting: false,
    enableFiltering: false,
    enablePagination: false,
    scrollableColumns: [
      { key: 'name', label: 'Name', width: 'w-48', sortable: false, visible: true },
      { key: 'email', label: 'Email', width: 'w-64', sortable: false, visible: true },
      { key: 'role', label: 'Role', width: 'w-32', sortable: false, visible: true },
    ],
  },
  render: (args) => (
    <div className="p-4">
      <div className="text-sm text-muted-foreground mb-4">
        Minimal table with no sorting, filtering, or pagination
      </div>
      <DataTable {...args} />
    </div>
  ),
}

export const CustomCellRenderers: Story = {
  render: () => {
    const customColumns: ColumnDef<User>[] = [
      {
        accessorKey: 'name',
        header: 'User',
      },
      {
        accessorKey: 'email',
        header: 'Contact',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'lastLogin',
        header: 'Activity',
      },
    ]

    return (
      <div className="p-4">
        <DataTable
          data={userData}
          columns={customColumns}
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          searchPlaceholder="Search users..."
          scrollableColumns={[
            { key: 'name', label: 'User', width: 'w-48', sortable: true, visible: true },
            { key: 'email', label: 'Contact', width: 'w-64', sortable: true, visible: true },
            { key: 'status', label: 'Status', width: 'w-24', sortable: true, visible: true },
            { key: 'lastLogin', label: 'Activity', width: 'w-32', sortable: true, visible: true },
          ]}
          cellRenderers={{
            name: {
              component: ({ value, row }: { value: string; row: User }) => (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {value.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{value}</div>
                    <div className="text-xs text-muted-foreground">{row.role}</div>
                  </div>
                </div>
              ),
            },
            email: {
              component: ({ value }: { value: string }) => (
                <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
                  {value}
                </a>
              ),
            },
            status: {
              component: ({ value }: { value: string }) => {
                const colors = {
                  active: 'bg-green-100 text-green-800 border-green-200',
                  inactive: 'bg-red-100 text-red-800 border-red-200',
                  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                }
                return (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[value as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                    {value}
                  </span>
                )
              },
            },
            lastLogin: {
              component: ({ value }: { value: string }) => {
                const date = new Date(value)
                const isRecent = Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000
                return (
                  <div className="text-sm">
                    <div className={isRecent ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isRecent ? 'Recent' : 'Inactive'}
                    </div>
                  </div>
                )
              },
            },
          }}
          pageSize={5}
        />
      </div>
    )
  },
}