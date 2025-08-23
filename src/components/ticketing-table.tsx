"use client"

import * as React from "react"
import { ChevronDown, CirclePlus, GripVertical, CheckCheck, Pencil, AlarmClockMinus, Trash, CircleX, Plus, Check, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type Ticket = {
  id: string
  title: string
  opened: {
    date: string
    journey: string
  }
  status: string[]
  order: number
  selected: boolean
}

const initialTicketsData: Ticket[] = [
  {
    id: "T001",
    title: "Implement user authentication system",
    opened: {
      date: "12/15/2023",
      journey: "Authentication Flow"
    },
    status: ["Feature", "Backend", "Security", "High Priority", "In Progress"],
    order: 1,
    selected: false
  },
  {
    id: "T002",
    title: "Fix responsive layout issues on mobile",
    opened: {
      date: "12/14/2023", 
      journey: "UI/UX Improvements"
    },
    status: ["Bug", "Frontend", "CSS", "Medium Priority", "To Do"],
    order: 2,
    selected: false
  },
  {
    id: "T003",
    title: "Add dark mode support to application",
    opened: {
      date: "12/13/2023",
      journey: "Theme Enhancement"
    },
    status: ["Feature", "UI", "Enhancement", "Low Priority", "Backlog"],
    order: 3,
    selected: false
  },
  {
    id: "T004",
    title: "Database optimization and indexing",
    opened: {
      date: "12/12/2023",
      journey: "Performance Optimization"
    },
    status: ["Performance", "Database", "Backend", "High Priority", "Done"],
    order: 4,
    selected: false
  },
  {
    id: "T005",
    title: "Update API documentation and examples",
    opened: {
      date: "12/11/2023", 
      journey: "Documentation"
    },
    status: ["Documentation", "Content", "Low Priority", "Canceled"],
    order: 5,
    selected: false
  },
  {
    id: "T006",
    title: "Implement email notification system",
    opened: {
      date: "12/10/2023",
      journey: "Communication Features"  
    },
    status: ["Feature", "Backend", "Email", "Medium Priority", "In Progress"],
    order: 6,
    selected: false
  }
]

const availableStatusOptions = [
  "Feature", "Bug", "Enhancement", "Security", "Performance", "Frontend", "Backend", "UI", "Database", "Documentation", "Content", "CSS", "Testing", "API",
  "High Priority", "Medium Priority", "Low Priority",
  "Backlog", "To Do", "In Progress", "Done", "Canceled"
]

interface TagListProps {
  items: string[]
  onRemoveTag?: (tag: string) => void
  onAddTag?: (tag: string) => void
  availableOptions?: string[]
}

function TagList({ 
  items, 
  onRemoveTag, 
  onAddTag, 
  availableOptions = []
}: TagListProps) {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const handleToggleTag = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (items.includes(tag)) {
      onRemoveTag?.(tag)
    } else {
      onAddTag?.(tag)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth
        }
      }, 0)
    }
  }

  return (
    <div className="flex gap-1 items-center">
      {onAddTag && (
        <DropdownMenu open={isSelectOpen} onOpenChange={setIsSelectOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-5 w-5 p-0 flex-shrink-0 border-none bg-transparent hover:bg-muted/50 flex items-center justify-center shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-max">
            {availableOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={(event) => event.preventDefault()}
                onClick={(event) => handleToggleTag(option, event)}
                className="flex items-center justify-between cursor-pointer px-2"
              >
                <span className="flex-1">{option}</span>
                <div className="w-4 h-4 flex items-center justify-center ml-2">
                  {items.includes(option) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <div ref={containerRef} className="flex gap-1 overflow-x-auto max-w-[250px] w-fit items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {items.map((item, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="whitespace-nowrap flex-shrink-0 flex items-center gap-1 h-5 hover:bg-muted/50 transition-colors"
          >
            <span>{item}</span>
            {onRemoveTag && (
              <button
                onClick={() => onRemoveTag(item)}
                className="ml-1 hover:text-destructive transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export function TicketingTable() {
  const [ticketsData, setTicketsData] = React.useState<Ticket[]>(initialTicketsData)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredData = React.useMemo(() => {
    let result = [...ticketsData]
    
    if (searchTerm) {
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return result.sort((a, b) => a.order - b.order)
  }, [ticketsData, searchTerm])

  const handleRowSelect = (ticketId: string) => {
    if (selectedRows.includes(ticketId)) {
      setSelectedRows(selectedRows.filter(id => id !== ticketId))
    } else {
      setSelectedRows([...selectedRows, ticketId])
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map(ticket => ticket.id))
    }
  }

  const handleDragStart = (ticketId: string) => {
    setDraggedItem(ticketId)
  }

  const handleDragOver = (e: React.DragEvent, ticketId: string) => {
    e.preventDefault()
    if (draggedItem && draggedItem !== ticketId) {
      setDragOverItem(ticketId)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if we're leaving the table row entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e: React.DragEvent, targetTicketId: string) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem === targetTicketId) return

    setTicketsData(prev => {
      const updated = [...prev]
      const draggedIndex = updated.findIndex(t => t.id === draggedItem)
      const targetIndex = updated.findIndex(t => t.id === targetTicketId)
      
      // Remove dragged item
      const [removed] = updated.splice(draggedIndex, 1)
      
      // Insert at target position
      updated.splice(targetIndex, 0, removed)
      
      // Update order values
      return updated.map((ticket, index) => ({
        ...ticket,
        order: index + 1
      }))
    })

    setDraggedItem(null)
    setDragOverItem(null)
  }

  const removeStatusTag = (ticketId: string, tagToRemove: string) => {
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: ticket.status.filter(tag => tag !== tagToRemove) }
          : ticket
      )
    )
  }

  const addStatusTag = (ticketId: string, tagToAdd: string) => {
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: [...ticket.status, tagToAdd] }
          : ticket
      )
    )
  }


  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2">
          <div className="w-[249px]">
            <Input 
              placeholder="Find" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-[142px]">
              <span className="text-muted-foreground">Columns</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Columns</SelectItem>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="opened">Opened</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="actions">Actions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <CirclePlus className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="rounded-t-lg overflow-hidden border border-border relative">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[40px] text-center">
                <Checkbox 
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < filteredData.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[40px] text-center"></TableHead>
              <TableHead className="w-[261px]">Header</TableHead>
              <TableHead className="w-[117px]">Opened</TableHead>
              <TableHead className="w-[225px]">Status</TableHead>
              <TableHead className="w-[151px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((ticket) => (
              <TableRow 
                key={ticket.id}
                className={`
                  ${draggedItem === ticket.id ? "opacity-50" : ""} 
                  ${dragOverItem === ticket.id ? "bg-blue-100 hover:bg-blue-100" : ""}
                `}
                onDragOver={(e) => handleDragOver(e, ticket.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, ticket.id)}
              >
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox 
                      checked={selectedRows.includes(ticket.id)}
                      onCheckedChange={() => handleRowSelect(ticket.id)}
                    />
                  </div>
                </TableCell>
                <TableCell className="w-[40px] text-center">
                  <div className="flex justify-center">
                    <button
                      draggable
                      onDragStart={() => handleDragStart(ticket.id)}
                      className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted/50 rounded transition-colors"
                      aria-label="Drag to reorder"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{ticket.title}</div>
                    <div className="text-xs text-muted-foreground">{ticket.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">{ticket.opened.date}</span>
                    <span className="text-muted-foreground text-sm">{ticket.opened.journey}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <TagList 
                    items={ticket.status}
                    onRemoveTag={(tag) => removeStatusTag(ticket.id, tag)}
                    onAddTag={(tag) => addStatusTag(ticket.id, tag)}
                    availableOptions={availableStatusOptions}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <CheckCheck className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AlarmClockMinus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}