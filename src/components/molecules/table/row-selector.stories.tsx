import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RowSelector } from './row-selector'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const meta: Meta<typeof RowSelector> = {
  title: 'Molecules/Table/RowSelector',
  component: RowSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onCheckedChange: { action: 'checkbox toggled' },
    onHoverIconClick: { action: 'hover icon clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    showHoverIcon: true,
    isHovered: false,
    onCheckedChange: () => {},
    onHoverIconClick: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">Default row selector</div>
      <RowSelector {...args} />
    </div>
  ),
}

export const Checked: Story = {
  args: {
    checked: true,
    showHoverIcon: true,
    isHovered: false,
    onCheckedChange: () => {},
    onHoverIconClick: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">Checked state</div>
      <RowSelector {...args} />
    </div>
  ),
}

export const WithHoverIcon: Story = {
  args: {
    checked: false,
    showHoverIcon: true,
    isHovered: true,
    onCheckedChange: () => {},
    onHoverIconClick: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">With hover icon visible</div>
      <RowSelector {...args} />
    </div>
  ),
}

export const WithoutHoverIcon: Story = {
  args: {
    checked: false,
    showHoverIcon: false,
    isHovered: true,
    onCheckedChange: () => {},
    onHoverIconClick: () => {},
  },
  render: (args) => (
    <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
      <div className="text-sm text-muted-foreground mb-4">Without hover icon</div>
      <RowSelector {...args} />
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [clickCount, setClickCount] = useState(0)

    const handleHoverIconClick = () => {
      setClickCount(prev => prev + 1)
    }

    return (
      <div className="p-8 border rounded-lg bg-muted/5 w-full max-w-sm">
        <div className="text-sm text-muted-foreground mb-4">Interactive demo</div>
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="p-4 border rounded bg-background"
        >
          <RowSelector
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            isHovered={isHovered}
            onHoverIconClick={handleHoverIconClick}
          />
        </div>
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <div><strong>Checked:</strong> {checked ? 'Yes' : 'No'}</div>
          <div><strong>Hovered:</strong> {isHovered ? 'Yes' : 'No'}</div>
          <div><strong>Icon clicks:</strong> {clickCount}</div>
        </div>
      </div>
    )
  },
}

export const TicketsTableExample: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [hoveredRowId, setHoveredRowId] = useState<string | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState<any>(null)

    const tickets = [
      { id: 'T001', title: 'Fix navigation bug', status: 'In Progress' },
      { id: 'T002', title: 'Add user authentication', status: 'Done' },
      { id: 'T003', title: 'Update documentation', status: 'Backlog' },
    ]

    const handleRowSelect = (ticketId: string) => {
      setSelectedRows(prev => 
        prev.includes(ticketId) 
          ? prev.filter(id => id !== ticketId)
          : [...prev, ticketId]
      )
    }

    const handlePanelClick = (ticket: any) => {
      setSelectedTicket(ticket)
      setIsSheetOpen(true)
    }

    const handleSelectAll = () => {
      if (selectedRows.length === tickets.length) {
        setSelectedRows([])
      } else {
        setSelectedRows(tickets.map(t => t.id))
      }
    }

    return (
      <div className="w-full max-w-2xl">
        <div className="text-sm text-muted-foreground mb-4">Tickets table example</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">
                <RowSelector
                  checked={selectedRows.length === tickets.length && tickets.length > 0}
                  onCheckedChange={handleSelectAll}
                  showHoverIcon={false}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow 
                key={ticket.id}
                onMouseEnter={() => setHoveredRowId(ticket.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className="hover:bg-muted/50"
              >
                <TableCell className="w-10 text-center py-1 relative">
                  <RowSelector
                    checked={selectedRows.includes(ticket.id)}
                    onCheckedChange={() => handleRowSelect(ticket.id)}
                    isHovered={hoveredRowId === ticket.id}
                    onHoverIconClick={() => handlePanelClick(ticket)}
                  />
                </TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <div><strong>Selected tickets:</strong> {selectedRows.join(', ') || 'None'}</div>
          <div><strong>Hovered row:</strong> {hoveredRowId || 'None'}</div>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Ticket Details</SheetTitle>
              <SheetDescription>
                Details for ticket {selectedTicket?.id}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              <div><strong>Title:</strong> {selectedTicket?.title}</div>
              <div><strong>Status:</strong> {selectedTicket?.status}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  },
}

export const ContactsTableExample: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [hoveredRowId, setHoveredRowId] = useState<string | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState<any>(null)

    const contacts = [
      { id: 'C001', name: 'Alice Johnson', email: 'alice@example.com' },
      { id: 'C002', name: 'Bob Smith', email: 'bob@example.com' },
      { id: 'C003', name: 'Carol Davis', email: 'carol@example.com' },
    ]

    const handleRowSelect = (contactId: string) => {
      setSelectedRows(prev => 
        prev.includes(contactId) 
          ? prev.filter(id => id !== contactId)
          : [...prev, contactId]
      )
    }

    const handlePanelClick = (contact: any) => {
      setSelectedContact(contact)
      setIsSheetOpen(true)
    }

    const handleSelectAll = () => {
      if (selectedRows.length === contacts.length) {
        setSelectedRows([])
      } else {
        setSelectedRows(contacts.map(c => c.id))
      }
    }

    return (
      <div className="w-full max-w-2xl">
        <div className="text-sm text-muted-foreground mb-4">Contacts table example</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">
                <RowSelector
                  checked={selectedRows.length === contacts.length && contacts.length > 0}
                  onCheckedChange={handleSelectAll}
                  showHoverIcon={false}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow 
                key={contact.id}
                onMouseEnter={() => setHoveredRowId(contact.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className="hover:bg-muted/50"
              >
                <TableCell className="w-10 text-center py-1 relative">
                  <RowSelector
                    checked={selectedRows.includes(contact.id)}
                    onCheckedChange={() => handleRowSelect(contact.id)}
                    isHovered={hoveredRowId === contact.id}
                    onHoverIconClick={() => handlePanelClick(contact)}
                  />
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <div><strong>Selected contacts:</strong> {selectedRows.join(', ') || 'None'}</div>
          <div><strong>Hovered row:</strong> {hoveredRowId || 'None'}</div>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Contact Details</SheetTitle>
              <SheetDescription>
                Details for {selectedContact?.name}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              <div><strong>Name:</strong> {selectedContact?.name}</div>
              <div><strong>Email:</strong> {selectedContact?.email}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  },
}

export const HoverStates: Story = {
  render: () => {
    const [hoveredState, setHoveredState] = useState<'none' | 'unchecked' | 'checked'>('none')

    return (
      <div className="p-8 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">Hover state demonstrations</div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-medium">Not Hovered</div>
            <div className="flex gap-4">
              <div className="p-4 border rounded bg-background">
                <RowSelector
                  checked={false}
                  onCheckedChange={() => {}}
                  isHovered={false}
                  onHoverIconClick={() => {}}
                />
              </div>
              <div className="p-4 border rounded bg-background">
                <RowSelector
                  checked={true}
                  onCheckedChange={() => {}}
                  isHovered={false}
                  onHoverIconClick={() => {}}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium">Hovered</div>
            <div className="flex gap-4">
              <div className="p-4 border rounded bg-muted/50">
                <RowSelector
                  checked={false}
                  onCheckedChange={() => {}}
                  isHovered={true}
                  onHoverIconClick={() => {}}
                />
              </div>
              <div className="p-4 border rounded bg-muted/50">
                <RowSelector
                  checked={true}
                  onCheckedChange={() => {}}
                  isHovered={true}
                  onHoverIconClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}