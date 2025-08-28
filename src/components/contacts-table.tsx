"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { DataTable, type DataTableConfig } from "@/components/organisms"
import { TagList, type TagColor } from "@/components/molecules/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

// Contact data type
export type Contact = {
  id: string
  name: string
  careTeam: string[]
  sharedWith: string[]
  journeys: string[]
  tags: string[]
}

// Initial contacts data
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
  },
  {
    id: "6",
    name: "Lisa Thompson",
    careTeam: ["Dr. Garcia", "Social Worker"],
    sharedWith: ["Family", "Community Health"],
    journeys: ["Preventive Care", "Health Education"],
    tags: ["Healthy", "Annual Visit", "Engaged"]
  },
  {
    id: "7",
    name: "David Miller",
    careTeam: ["Dr. Rodriguez", "Pharmacist"],
    sharedWith: ["Pharmacy", "Insurance"],
    journeys: ["Medication Review", "Chronic Care"],
    tags: ["Stable", "Medication Changes", "Monitoring"]
  },
  {
    id: "8",
    name: "Jennifer Brown",
    careTeam: ["Dr. Lewis", "Care Coordinator"],
    sharedWith: ["Family", "Specialist"],
    journeys: ["Complex Care", "Multiple Conditions"],
    tags: ["High Risk", "Frequent Visits", "Care Plan"]
  }
]

// Available tag options for each column
const initialAvailableTagOptions = {
  careTeam: ["Dr. Johnson", "Dr. Chen", "Dr. Martinez", "Dr. Taylor", "Dr. White", "Dr. Garcia", "Dr. Rodriguez", "Dr. Lewis", "Nurse Wilson", "Therapist Brown", "Case Manager", "Nutritionist", "Physical Therapist", "Social Worker", "Pharmacist", "Care Coordinator"],
  sharedWith: ["Family", "Primary Care", "Specialist", "Insurance", "Dietitian", "Social Worker", "Pharmacy", "Community Health"],
  journeys: ["Cardiac Care", "Recovery Plan", "Physical Therapy", "Pain Management", "Mental Health", "Medication Management", "Diabetes Management", "Lifestyle Changes", "Post-Surgery Recovery", "Mobility Training", "Preventive Care", "Health Education", "Medication Review", "Chronic Care", "Complex Care", "Multiple Conditions"],
  tags: ["High Priority", "Active", "Follow-up", "In Progress", "Weekly Check", "Stable", "Monthly Review", "Compliant", "New Patient", "Education Needed", "Critical", "Daily Monitoring", "Progress", "Healthy", "Annual Visit", "Engaged", "Medication Changes", "Monitoring", "High Risk", "Frequent Visits", "Care Plan"]
}

type ColumnKey = "name" | "careTeam" | "sharedWith" | "journeys" | "tags"

export function ContactsTable() {
  const [contactsData, setContactsData] = React.useState<Contact[]>(initialContactsData)
  const [globalTagColors, setGlobalTagColors] = React.useState<Record<string, TagColor>>({})
  const [availableTagOptions] = React.useState(initialAvailableTagOptions)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [visibleColumns, setVisibleColumns] = React.useState<Record<ColumnKey, boolean>>({
    name: true,
    careTeam: true,
    sharedWith: true,
    journeys: true,
    tags: true,
  })

  // Handle adding tags to a contact
  const handleAddTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    // Add to available options if it doesn't exist
    const currentOptions = availableTagOptions[columnKey]
    if (!currentOptions.includes(tag)) {
      // In a real app, you'd update the available options state
    }
    
    setContactsData(prev =>
      prev.map(contact =>
        contact.id === contactId && !contact[columnKey].includes(tag)
          ? { ...contact, [columnKey]: [...contact[columnKey], tag] }
          : contact
      )
    )
  }

  // Handle removing tags from a contact
  const handleRemoveTag = (contactId: string, columnKey: ColumnKey, tag: string) => {
    setContactsData(prev =>
      prev.map(contact =>
        contact.id === contactId
          ? { ...contact, [columnKey]: contact[columnKey].filter(t => t !== tag) }
          : contact
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

  // Handle row click to open details panel
  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact)
    setIsSheetOpen(true)
  }

  // Handle row selection
  const handleRowSelect = (contactId: string) => {
    setSelectedRows(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    setSelectedRows(prev => 
      prev.length === contactsData.length ? [] : contactsData.map(c => c.id)
    )
  }

  // Handle column visibility toggle
  const handleToggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey as ColumnKey]
    }))
  }

  // Define table columns using DataTable column definitions
  const columns = React.useMemo<ColumnDef<Contact>[]>(() => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "careTeam",
      header: "Care Team",
      cell: ({ row }) => (
        <TagList
          items={row.getValue("careTeam")}
          variant="chart-primary"
          onRemoveTag={(tag) => handleRemoveTag(row.original.id, "careTeam", tag)}
          onAddTag={(tag) => handleAddTag(row.original.id, "careTeam", tag)}
          availableOptions={availableTagOptions.careTeam}
          allowColorSelection={true}
          globalTagColors={globalTagColors}
          onSetGlobalTagColor={handleSetGlobalTagColor}
        />
      ),
    },
    {
      accessorKey: "sharedWith",
      header: "Shared With",
      cell: ({ row }) => (
        <TagList
          items={row.getValue("sharedWith")}
          variant="chart-secondary"
          onRemoveTag={(tag) => handleRemoveTag(row.original.id, "sharedWith", tag)}
          onAddTag={(tag) => handleAddTag(row.original.id, "sharedWith", tag)}
          availableOptions={availableTagOptions.sharedWith}
          allowColorSelection={true}
          globalTagColors={globalTagColors}
          onSetGlobalTagColor={handleSetGlobalTagColor}
        />
      ),
    },
    {
      accessorKey: "journeys",
      header: "Journeys",
      cell: ({ row }) => (
        <TagList
          items={row.getValue("journeys")}
          variant="chart-tertiary"
          onRemoveTag={(tag) => handleRemoveTag(row.original.id, "journeys", tag)}
          onAddTag={(tag) => handleAddTag(row.original.id, "journeys", tag)}
          availableOptions={availableTagOptions.journeys}
          allowColorSelection={true}
          globalTagColors={globalTagColors}
          onSetGlobalTagColor={handleSetGlobalTagColor}
        />
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => (
        <TagList
          items={row.getValue("tags")}
          variant="chart-accent"
          onRemoveTag={(tag) => handleRemoveTag(row.original.id, "tags", tag)}
          onAddTag={(tag) => handleAddTag(row.original.id, "tags", tag)}
          availableOptions={availableTagOptions.tags}
          allowColorSelection={true}
          globalTagColors={globalTagColors}
          onSetGlobalTagColor={handleSetGlobalTagColor}
        />
      ),
    },
  ], [globalTagColors, availableTagOptions])

  // Configure the DataTable
  const tableConfig: DataTableConfig<Contact> = {
    data: contactsData,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableSelection: true,
    enableDragDrop: false,
    searchPlaceholder: "Search contacts...",
    selectedRows,
    onRowSelect: handleRowSelect,
    onSelectAll: handleSelectAll,
    fixedColumns: ["name"],
    scrollableColumns: [
      { key: "careTeam", label: "Care Team", width: "w-64", sortable: true, visible: true },
      { key: "sharedWith", label: "Shared With", width: "w-64", sortable: true, visible: true },
      { key: "journeys", label: "Journeys", width: "w-64", sortable: true, visible: true },
      { key: "tags", label: "Tags", width: "w-64", sortable: true, visible: true },
    ],
    visibleColumns,
    onToggleColumn: handleToggleColumn,
    hoveredRowId,
    onRowHover: setHoveredRowId,
    actionButtons: [
      {
        label: "Add Contact",
        onClick: () => {
          // Handle add contact
          console.log("Add contact clicked")
        },
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
        label: 'View Contact Details',
      },
    ],
    pageSize: 10,
    getRowId: (row) => row.id,
  }

  return (
    <div className="w-full">
      <DataTable {...tableConfig} />
      
      {/* Contact Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Contact Details</SheetTitle>
            <SheetDescription>
              View and edit contact information for {selectedContact?.name}
            </SheetDescription>
          </SheetHeader>
          {selectedContact && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium">Care Team</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContact.careTeam.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Shared With</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContact.sharedWith.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Journeys</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContact.journeys.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Tags</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContact.tags.join(", ")}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}