"use client"

import * as React from "react"
import { ChevronDown, X, Plus, Check, PanelRight } from "lucide-react"
// Simple filtering types
type ColumnFiltersState = Array<{
  id: string
  value: unknown
}>

type SortingState = Array<{
  id: string
  desc: boolean
}>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type Contact = {
  id: string
  name: string
  careTeam: string[]
  sharedWith: string[]
  journeys: string[]
  tags: string[]
}

const initialContactsData: Contact[] = [
  {
    id: "1",
    name: "John Smith",
    careTeam: ["Dr. Johnson", "Nurse Wilson"],
    sharedWith: ["Family", "Primary Care"],
    journeys: ["Cardiac Care", "Recovery Plan"],
    tags: ["High Priority", "Active", "Follow-up"]
  },
  {
    id: "2", 
    name: "Sarah Davis",
    careTeam: ["Dr. Chen", "Therapist Brown"],
    sharedWith: ["Specialist", "Insurance"],
    journeys: ["Physical Therapy", "Pain Management"],
    tags: ["In Progress", "Weekly Check"]
  },
  {
    id: "3",
    name: "Michael Johnson",
    careTeam: ["Dr. Martinez", "Case Manager"],
    sharedWith: ["Family", "Social Worker"],
    journeys: ["Mental Health", "Medication Management"],
    tags: ["Stable", "Monthly Review", "Compliant"]
  },
  {
    id: "4",
    name: "Emily Wilson",
    careTeam: ["Dr. Taylor", "Nutritionist"],
    sharedWith: ["Dietitian", "Family"],
    journeys: ["Diabetes Management", "Lifestyle Changes"],
    tags: ["New Patient", "Education Needed"]
  },
  {
    id: "5",
    name: "Robert Anderson",
    careTeam: ["Dr. White", "Physical Therapist"],
    sharedWith: ["Insurance", "Specialist"],
    journeys: ["Post-Surgery Recovery", "Mobility Training"],
    tags: ["Critical", "Daily Monitoring", "Progress"]
  }
]

const availableTagOptions = {
  careTeam: ["Dr. Johnson", "Dr. Chen", "Dr. Martinez", "Dr. Taylor", "Dr. White", "Nurse Wilson", "Therapist Brown", "Case Manager", "Nutritionist", "Physical Therapist"],
  sharedWith: ["Family", "Primary Care", "Specialist", "Insurance", "Dietitian", "Social Worker"],
  journeys: ["Cardiac Care", "Recovery Plan", "Physical Therapy", "Pain Management", "Mental Health", "Medication Management", "Diabetes Management", "Lifestyle Changes", "Post-Surgery Recovery", "Mobility Training"],
  tags: ["High Priority", "Active", "Follow-up", "In Progress", "Weekly Check", "Stable", "Monthly Review", "Compliant", "New Patient", "Education Needed", "Critical", "Daily Monitoring", "Progress", "Urgent", "Scheduled", "Pending"]
}

type ColumnKey = "name" | "careTeam" | "sharedWith" | "journeys" | "tags"

const columns = [
  { key: "name" as ColumnKey, label: "Name" },
  { key: "careTeam" as ColumnKey, label: "Care Team" },
  { key: "sharedWith" as ColumnKey, label: "Shared With" },
  { key: "journeys" as ColumnKey, label: "Journeys" },
  { key: "tags" as ColumnKey, label: "Tags" }
]

interface TagListProps {
  items: string[]
  variant?: "default" | "secondary" | "destructive" | "outline" | "chart-primary" | "chart-secondary" | "chart-tertiary" | "chart-accent"
  onRemoveTag?: (tag: string) => void
  onAddTag?: (tag: string) => void
  availableOptions?: string[]
  columnKey?: string
}

const getTagStyles = (variant: TagListProps['variant']) => {
  switch (variant) {
    case "chart-primary":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    case "chart-secondary": 
      return "bg-[#1564BF] text-white border-[#1564BF] hover:bg-[#1564BF]/90"
    case "chart-tertiary":
      return "bg-[#405F90] text-white border-[#405F90] hover:bg-[#405F90]/90"
    case "chart-accent":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    default:
      return ""
  }
}

function TagList({ 
  items, 
  variant = "secondary", 
  onRemoveTag, 
  onAddTag, 
  availableOptions = [],
  columnKey
}: TagListProps) {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // No longer need to filter since we show all options with checks
  
  const handleToggleTag = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (items.includes(tag)) {
      onRemoveTag?.(tag)
    } else {
      onAddTag?.(tag)
      // Scroll to the right to show the newly added tag and keep the plus visible
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
            variant={variant?.startsWith('chart-') ? 'default' : variant} 
            className={`whitespace-nowrap flex-shrink-0 flex items-center gap-1 h-5 ${variant?.startsWith('chart-') ? getTagStyles(variant) : ''}`}
          >
            <span>{item}</span>
            {onRemoveTag && (
              <button
                onClick={() => onRemoveTag(item)}
                className="ml-1 hover:bg-black/20 rounded-full p-0.5 transition-colors flex items-center justify-center"
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

export function ContactsTable() {
  const [contactsData, setContactsData] = React.useState<Contact[]>(initialContactsData)
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [visibleColumns, setVisibleColumns] = React.useState<Record<ColumnKey, boolean>>({
    name: true,
    careTeam: true,
    sharedWith: true,
    journeys: true,
    tags: true
  })
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)

  // Simple filtering without TanStack React Table to avoid import issues
  const filteredData = React.useMemo(() => {
    const nameFilter = columnFilters.find(filter => filter.id === 'name')?.value as string || ''
    
    if (!nameFilter) return contactsData
    
    return contactsData.filter(contact => 
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
  }, [contactsData, columnFilters])

  const handleNameFilter = (value: string) => {
    setColumnFilters(prev => {
      const otherFilters = prev.filter(filter => filter.id !== 'name')
      if (value) {
        return [...otherFilters, { id: 'name', value }]
      }
      return otherFilters
    })
  }

  const toggleColumn = (columnKey: ColumnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }))
  }

  const handleRemoveTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    setContactsData(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { 
              ...contact, 
              [columnKey]: contact[columnKey].filter((item: string) => item !== tag) 
            }
          : contact
      )
    )
  }

  const handleAddTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    setContactsData(prev => 
      prev.map(contact => 
        contact.id === contactId 
          ? { 
              ...contact, 
              [columnKey]: [...contact[columnKey], tag] 
            }
          : contact
      )
    )
  }

  const handlePanelClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsSheetOpen(true)
  }

  const visibleColumnsList = columns.filter(column => visibleColumns[column.key])

  const scrollableColumns = columns.filter(column => column.key !== 'name')
  const visibleScrollableColumns = scrollableColumns.filter(column => visibleColumns[column.key])

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Find someone"
          value={columnFilters.find(filter => filter.id === 'name')?.value as string || ""}
          onChange={(event) =>
            handleNameFilter(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Columns
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns[column.key]}
                onCheckedChange={() => toggleColumn(column.key)}
                onSelect={(e) => e.preventDefault()}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="border rounded-lg overflow-hidden flex">
        {/* Fixed first column */}
        {visibleColumns.name && (
          <div className="flex-shrink-0 border-r bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium whitespace-nowrap w-48">
                    Name
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((contact) => (
                  <TableRow 
                    key={contact.id}
                    className={hoveredRowId === contact.id ? "bg-muted/50" : ""}
                    onMouseEnter={(e) => {
                      if (!e.relatedTarget?.closest('[role="menu"]')) {
                        setHoveredRowId(contact.id)
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.relatedTarget?.closest('[role="menu"]')) {
                        setHoveredRowId(null)
                      }
                    }}
                  >
                    <TableCell className="font-medium py-1 relative whitespace-nowrap w-48">
                      {contact.name}
                      {hoveredRowId === contact.id && (
                        <button
                          onClick={() => handlePanelClick(contact)}
                          className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-sm rounded p-0.5 hover:bg-gray-50 transition-colors"
                          style={{ left: '8px' }}
                        >
                          <PanelRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {/* Scrollable columns */}
        {visibleScrollableColumns.length > 0 && (
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {visibleScrollableColumns.map((column) => (
                    <TableHead key={column.key} className="font-medium whitespace-nowrap">
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((contact) => (
                  <TableRow 
                    key={contact.id}
                    className={hoveredRowId === contact.id ? "bg-muted/50" : ""}
                    onMouseEnter={(e) => {
                      if (!e.relatedTarget?.closest('[role="menu"]')) {
                        setHoveredRowId(contact.id)
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.relatedTarget?.closest('[role="menu"]')) {
                        setHoveredRowId(null)
                      }
                    }}
                  >
                    {visibleColumns.careTeam && (
                      <TableCell className="py-1 shadow-none whitespace-nowrap">
                        <TagList 
                          items={contact.careTeam} 
                          variant="chart-primary"
                          onRemoveTag={(tag) => handleRemoveTag(contact.id, "careTeam", tag)}
                          onAddTag={(tag) => handleAddTag(contact.id, "careTeam", tag)}
                          availableOptions={availableTagOptions.careTeam}
                          columnKey="care team member"
                        />
                      </TableCell>
                    )}
                    {visibleColumns.sharedWith && (
                      <TableCell className="py-1 shadow-none whitespace-nowrap">
                        <TagList 
                          items={contact.sharedWith} 
                          variant="chart-secondary"
                          onRemoveTag={(tag) => handleRemoveTag(contact.id, "sharedWith", tag)}
                          onAddTag={(tag) => handleAddTag(contact.id, "sharedWith", tag)}
                          availableOptions={availableTagOptions.sharedWith}
                          columnKey="share option"
                        />
                      </TableCell>
                    )}
                    {visibleColumns.journeys && (
                      <TableCell className="py-1 shadow-none whitespace-nowrap">
                        <TagList 
                          items={contact.journeys} 
                          variant="chart-tertiary"
                          onRemoveTag={(tag) => handleRemoveTag(contact.id, "journeys", tag)}
                          onAddTag={(tag) => handleAddTag(contact.id, "journeys", tag)}
                          availableOptions={availableTagOptions.journeys}
                          columnKey="journey"
                        />
                      </TableCell>
                    )}
                    {visibleColumns.tags && (
                      <TableCell className="py-1 shadow-none whitespace-nowrap">
                        <TagList 
                          items={contact.tags} 
                          variant="chart-accent"
                          onRemoveTag={(tag) => handleRemoveTag(contact.id, "tags", tag)}
                          onAddTag={(tag) => handleAddTag(contact.id, "tags", tag)}
                          availableOptions={availableTagOptions.tags}
                          columnKey="tag"
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Contact Details</SheetTitle>
            <SheetDescription>
              View and edit contact information for {selectedContact?.name}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}