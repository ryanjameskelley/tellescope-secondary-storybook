"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { CheckCheck, Pencil, AlarmClockMinus, Trash } from "lucide-react"
import { DataTable, type DataTableConfig } from "@/components/organisms"
import { TagList, type TagColor } from "@/components/molecules/table"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "sonner"

// Ticket data type
export type Ticket = {
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

// Initial tickets data (first 20 for demo)
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
  },
  {
    id: "T007",
    title: "Refactor payment processing module",
    opened: {
      date: "12/09/2023",
      journey: "Payment System"
    },
    status: ["Enhancement", "Backend", "Payment", "High Priority", "In Progress"],
    order: 7,
    selected: false
  },
  {
    id: "T008",
    title: "Add unit tests for user service",
    opened: {
      date: "12/08/2023",
      journey: "Testing"
    },
    status: ["Testing", "Backend", "Coverage", "Medium Priority", "To Do"],
    order: 8,
    selected: false
  },
  {
    id: "T009",
    title: "Implement real-time chat feature",
    opened: {
      date: "12/07/2023",
      journey: "Communication Features"
    },
    status: ["Feature", "Frontend", "WebSocket", "Low Priority", "Backlog"],
    order: 9,
    selected: false
  },
  {
    id: "T010",
    title: "Fix memory leak in dashboard",
    opened: {
      date: "12/06/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Frontend", "Performance", "High Priority", "In Progress"],
    order: 10,
    selected: false
  },
  {
    id: "T011",
    title: "Add PDF export functionality",
    opened: {
      date: "12/05/2023",
      journey: "Export Features"
    },
    status: ["Feature", "Backend", "Export", "Medium Priority", "To Do"],
    order: 11,
    selected: false
  },
  {
    id: "T012",
    title: "Implement two-factor authentication",
    opened: {
      date: "12/04/2023",
      journey: "Authentication Flow"
    },
    status: ["Security", "Feature", "Backend", "High Priority", "In Progress"],
    order: 12,
    selected: false
  },
  {
    id: "T013",
    title: "Update dependency versions",
    opened: {
      date: "12/03/2023",
      journey: "Maintenance"
    },
    status: ["Maintenance", "Security", "Dependencies", "Medium Priority", "Done"],
    order: 13,
    selected: false
  },
  {
    id: "T014",
    title: "Create admin dashboard analytics",
    opened: {
      date: "12/02/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Frontend", "Analytics", "Low Priority", "Backlog"],
    order: 14,
    selected: false
  },
  {
    id: "T015",
    title: "Fix broken search functionality",
    opened: {
      date: "12/01/2023",
      journey: "Search System"
    },
    status: ["Bug", "Backend", "Search", "High Priority", "In Progress"],
    order: 15,
    selected: false
  }
]

const initialAvailableStatusOptions = [
  "Feature", "Bug", "Enhancement", "Security", "Performance", "Frontend", "Backend", "UI", "Database", "Documentation", "Content", "CSS", "Testing", "API",
  "High Priority", "Medium Priority", "Low Priority",
  "Backlog", "To Do", "In Progress", "Done", "Canceled"
]

export function TicketingTable() {
  const [ticketsData, setTicketsData] = React.useState<Ticket[]>(initialTicketsData)
  const [globalTagColors, setGlobalTagColors] = React.useState<Record<string, TagColor>>({})
  const [availableStatusOptions, setAvailableStatusOptions] = React.useState<string[]>(initialAvailableStatusOptions)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null)
  const [isAddTicketSheetOpen, setIsAddTicketSheetOpen] = React.useState(false)
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [selectedStatusFilters, setSelectedStatusFilters] = React.useState<string[]>([])
  const [visibleColumns, setVisibleColumns] = React.useState({
    title: true,
    id: false,
    opened: true,
    origin: false,
    status: true,
    actions: true
  })

  // Handle adding status tag to a ticket
  const addStatusTag = (ticketId: string, tagToAdd: string) => {
    if (!availableStatusOptions.includes(tagToAdd)) {
      setAvailableStatusOptions(prev => [tagToAdd, ...prev])
    }
    
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId && !ticket.status.includes(tagToAdd)
          ? { ...ticket, status: [...ticket.status, tagToAdd] }
          : ticket
      )
    )
  }

  // Handle removing status tag from a ticket
  const removeStatusTag = (ticketId: string, tagToRemove: string) => {
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: ticket.status.filter(tag => tag !== tagToRemove) }
          : ticket
      )
    )
  }

  // Handle setting global tag colors
  const handleSetGlobalTagColor = (tag: string, color: TagColor) => {
    setGlobalTagColors(prev => ({
      ...prev,
      [tag]: color
    }))
  }

  // Handle drag and drop
  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDrop = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return

    setTicketsData(prev => {
      const updated = [...prev]
      const draggedIndex = updated.findIndex(t => t.id === draggedId)
      const targetIndex = updated.findIndex(t => t.id === targetId)
      
      const [removed] = updated.splice(draggedIndex, 1)
      updated.splice(targetIndex, 0, removed)
      
      return updated.map((ticket, index) => ({
        ...ticket,
        order: index + 1
      }))
    })
  }

  // Handle row click to open details panel
  const handleRowClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsSheetOpen(true)
  }

  // Handle row selection
  const handleRowSelect = (ticketId: string) => {
    setSelectedRows(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    setSelectedRows(prev => 
      prev.length === filteredTicketsData.length ? [] : filteredTicketsData.map(t => t.id)
    )
  }

  // Handle column visibility toggle
  const handleToggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey as keyof typeof prev]
    }))
  }

  // Right click to copy ticket ID
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast("Ticket ID copied", {
        description: `${text} has been copied to clipboard`,
      })
    } catch (err) {
      toast("Copy Ticket ID", {
        description: "Select and copy the ID: " + text,
      })
    }
  }

  // Calculate status filter items with counts
  const statusFilterItems = React.useMemo(() => {
    const statusCounts: Record<string, number> = {}
    
    ticketsData.forEach(ticket => {
      ticket.status.forEach(status => {
        statusCounts[status] = (statusCounts[status] || 0) + 1
      })
    })
    
    return Object.entries(statusCounts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
  }, [ticketsData])

  // Filter tickets based on selected status filters
  const filteredTicketsData = React.useMemo(() => {
    if (selectedStatusFilters.length === 0) {
      return ticketsData
    }
    
    return ticketsData.filter(ticket => 
      selectedStatusFilters.some(filterStatus => 
        ticket.status.includes(filterStatus)
      )
    )
  }, [ticketsData, selectedStatusFilters])

  // Define table columns
  const columns = React.useMemo<ColumnDef<Ticket>[]>(() => [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium truncate max-w-[270px]">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div 
          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation()
            copyToClipboard(row.getValue("id"))
          }}
          title="Click to copy ID"
        >
          {row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "opened",
      header: "Opened",
      accessorFn: (row) => row.opened.date,
      cell: ({ row }) => (
        <div className="text-foreground font-medium">
          {row.original.opened.date}
        </div>
      ),
    },
    {
      accessorKey: "origin",
      header: "Origin",
      accessorFn: (row) => row.opened.journey,
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm">
          {row.original.opened.journey}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <TagList 
          items={row.getValue("status")}
          variant="chart-primary"
          onRemoveTag={(tag) => removeStatusTag(row.original.id, tag)}
          onAddTag={(tag) => addStatusTag(row.original.id, tag)}
          availableOptions={availableStatusOptions}
          allowColorSelection={true}
          globalTagColors={globalTagColors}
          onSetGlobalTagColor={handleSetGlobalTagColor}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <CheckCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <AlarmClockMinus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ], [availableStatusOptions, globalTagColors])

  // Configure the DataTable
  const tableConfig: DataTableConfig<Ticket> = {
    data: filteredTicketsData,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableSelection: true,
    enableDragDrop: true,
    searchPlaceholder: "Find tickets...",
    selectedRows,
    onRowSelect: handleRowSelect,
    onSelectAll: handleSelectAll,
    fixedColumns: ["title"],
    scrollableColumns: [
      { key: "id", label: "ID", width: "w-20", sortable: false, visible: visibleColumns.id },
      { key: "opened", label: "Opened", width: "w-24", sortable: true, visible: visibleColumns.opened },
      { key: "origin", label: "Origin", width: "w-32", sortable: true, visible: visibleColumns.origin },
      { key: "status", label: "Status", width: "w-48", sortable: false, visible: visibleColumns.status },
      { key: "actions", label: "Actions", width: "w-32", sortable: false, visible: visibleColumns.actions },
    ],
    visibleColumns,
    onToggleColumn: handleToggleColumn,
    hoveredRowId,
    onRowHover: setHoveredRowId,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop,
    draggedItem,
    dragOverItem: dragOverItem,
    filterConfig: {
      label: "Filter",
      items: statusFilterItems,
      selectedFilters: selectedStatusFilters,
      onFilterSelectionChange: setSelectedStatusFilters,
      placeholder: "Search statuses...",
      showFilter: true,
    },
    actionButtons: [
      {
        label: "Add Ticket",
        onClick: () => setIsAddTicketSheetOpen(true),
      },
    ],
    hoverActions: [
      {
        icon: ({ className }: { className?: string }) => (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ),
        onClick: handleRowClick,
        label: 'View Ticket Details',
      },
    ],
    pageSize: 10,
    getRowId: (row) => row.id,
  }

  return (
    <div className="w-full">
      <DataTable {...tableConfig} />

      {/* Ticket Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Ticket Details</SheetTitle>
            <SheetDescription>
              View and edit ticket information for {selectedTicket?.title}
            </SheetDescription>
          </SheetHeader>
          {selectedTicket && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium">ID</h3>
                <p className="text-sm text-muted-foreground">{selectedTicket.id}</p>
              </div>
              <div>
                <h3 className="font-medium">Opened</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.opened.date} - {selectedTicket.opened.journey}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Status</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.status.join(", ")}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Ticket Sheet */}
      <Sheet open={isAddTicketSheetOpen} onOpenChange={setIsAddTicketSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Add Ticket</SheetTitle>
            <SheetDescription>
              Create a new ticket
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}