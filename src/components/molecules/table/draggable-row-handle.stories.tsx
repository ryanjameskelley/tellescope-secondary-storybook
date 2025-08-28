import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DraggableRowHandle } from './draggable-row-handle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'

const meta: Meta<typeof DraggableRowHandle> = {
  title: 'Molecules/Table/DraggableRowHandle',
  component: DraggableRowHandle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onDragStart: { action: 'drag started' },
    onDragEnd: { action: 'drag ended' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    itemId: 'item-1',
    onDragStart: () => {},
    onDragEnd: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">Default drag handle</div>
      <DraggableRowHandle {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => {
    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Different sizes</div>
        
        <div className="space-y-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground w-8">{size}</div>
              <div className="border rounded p-2 bg-background">
                <DraggableRowHandle
                  itemId={`item-${size}`}
                  onDragStart={() => console.log(`Drag start: ${size}`)}
                  onDragEnd={() => console.log(`Drag end: ${size}`)}
                  size={size}
                />
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
    const [isDragging, setIsDragging] = useState(false)

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Different states</div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Normal</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="normal"
                onDragStart={() => {}}
                onDragEnd={() => {}}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Dragging</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="dragging"
                onDragStart={() => {}}
                onDragEnd={() => {}}
                isDragging={true}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Disabled</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="disabled"
                onDragStart={() => {}}
                onDragEnd={() => {}}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [dragCount, setDragCount] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [lastDraggedItem, setLastDraggedItem] = useState<string>('')

    const handleDragStart = (itemId: string) => {
      setIsDragging(true)
      setLastDraggedItem(itemId)
      setDragCount(prev => prev + 1)
    }

    const handleDragEnd = () => {
      setIsDragging(false)
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Interactive demo</div>
        
        <div className="border rounded p-4 bg-background">
          <DraggableRowHandle
            itemId="interactive-item"
            onDragStart={() => handleDragStart('interactive-item')}
            onDragEnd={handleDragEnd}
            isDragging={isDragging}
          />
        </div>

        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Drag count:</strong> {dragCount}</div>
          <div><strong>Currently dragging:</strong> {isDragging ? 'Yes' : 'No'}</div>
          <div><strong>Last dragged:</strong> {lastDraggedItem || 'None'}</div>
        </div>
      </div>
    )
  },
}

export const TicketsTableExample: Story = {
  render: () => {
    const [tickets, setTickets] = useState([
      { id: 'T001', title: 'Fix navigation bug', status: 'In Progress' },
      { id: 'T002', title: 'Add user authentication', status: 'Done' },
      { id: 'T003', title: 'Update documentation', status: 'Backlog' },
      { id: 'T004', title: 'Optimize database queries', status: 'In Review' },
    ])

    const [draggedItem, setDraggedItem] = useState<string | null>(null)
    const [dragOverItem, setDragOverItem] = useState<string | null>(null)

    const handleDragStart = (ticketId: string) => {
      setDraggedItem(ticketId)
    }

    const handleDragEnd = () => {
      setDraggedItem(null)
      setDragOverItem(null)
    }

    const handleDragOver = (e: React.DragEvent, ticketId: string) => {
      e.preventDefault()
      if (draggedItem && draggedItem !== ticketId) {
        setDragOverItem(ticketId)
      }
    }

    const handleDrop = (e: React.DragEvent, targetId: string) => {
      e.preventDefault()
      
      if (draggedItem && draggedItem !== targetId) {
        const draggedIndex = tickets.findIndex(t => t.id === draggedItem)
        const targetIndex = tickets.findIndex(t => t.id === targetId)
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
          const newTickets = [...tickets]
          const [draggedTicket] = newTickets.splice(draggedIndex, 1)
          newTickets.splice(targetIndex, 0, draggedTicket)
          setTickets(newTickets)
          
          toast.success(`Moved ${draggedTicket.title} to position ${targetIndex + 1}`)
        }
      }
      
      setDraggedItem(null)
      setDragOverItem(null)
    }

    return (
      <div className="w-full max-w-2xl">
        <div className="text-sm text-muted-foreground mb-4">Tickets table with drag and drop</div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow 
                key={ticket.id}
                className={`
                  ${draggedItem === ticket.id ? "opacity-50" : ""} 
                  ${dragOverItem === ticket.id ? "bg-blue-100 hover:bg-blue-100" : ""}
                `}
                onDragOver={(e) => handleDragOver(e, ticket.id)}
                onDrop={(e) => handleDrop(e, ticket.id)}
              >
                <TableCell className="w-10 text-center py-1">
                  <DraggableRowHandle
                    itemId={ticket.id}
                    onDragStart={() => handleDragStart(ticket.id)}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedItem === ticket.id}
                  />
                </TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <div><strong>Instructions:</strong> Drag the grip handles to reorder tickets</div>
          {draggedItem && <div><strong>Dragging:</strong> {tickets.find(t => t.id === draggedItem)?.title}</div>}
        </div>
      </div>
    )
  },
}

export const ReorderableList: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', name: 'First Item', color: 'bg-red-100' },
      { id: '2', name: 'Second Item', color: 'bg-blue-100' },
      { id: '3', name: 'Third Item', color: 'bg-green-100' },
      { id: '4', name: 'Fourth Item', color: 'bg-yellow-100' },
      { id: '5', name: 'Fifth Item', color: 'bg-purple-100' },
    ])

    const [draggedItem, setDraggedItem] = useState<string | null>(null)

    const handleDragStart = (itemId: string) => {
      setDraggedItem(itemId)
    }

    const handleDragEnd = () => {
      setDraggedItem(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent, targetId: string) => {
      e.preventDefault()
      
      if (draggedItem && draggedItem !== targetId) {
        const draggedIndex = items.findIndex(item => item.id === draggedItem)
        const targetIndex = items.findIndex(item => item.id === targetId)
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
          const newItems = [...items]
          const [draggedItemObj] = newItems.splice(draggedIndex, 1)
          newItems.splice(targetIndex, 0, draggedItemObj)
          setItems(newItems)
        }
      }
      
      setDraggedItem(null)
    }

    return (
      <div className="w-full max-w-md">
        <div className="text-sm text-muted-foreground mb-4">Reorderable list demo</div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex items-center gap-3 p-3 border rounded-lg transition-all
                ${item.color}
                ${draggedItem === item.id ? "opacity-50 scale-95" : ""}
              `}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item.id)}
            >
              <DraggableRowHandle
                itemId={item.id}
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                isDragging={draggedItem === item.id}
                size="md"
              />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">Position {index + 1}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <div><strong>Drag items to reorder them</strong></div>
          {draggedItem && <div><strong>Dragging:</strong> {items.find(i => i.id === draggedItem)?.name}</div>}
        </div>
      </div>
    )
  },
}

export const CustomHandle: Story = {
  render: () => {
    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Custom styling examples</div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Custom aria-label</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="custom-label"
                onDragStart={() => {}}
                onDragEnd={() => {}}
                aria-label="Drag to reposition this task"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Custom className</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="custom-class"
                onDragStart={() => {}}
                onDragEnd={() => {}}
                className="bg-blue-50 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Large size with custom styling</div>
            <div className="border rounded p-2 bg-background w-fit">
              <DraggableRowHandle
                itemId="large-custom"
                onDragStart={() => {}}
                onDragEnd={() => {}}
                size="lg"
                className="bg-green-50 border border-green-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}