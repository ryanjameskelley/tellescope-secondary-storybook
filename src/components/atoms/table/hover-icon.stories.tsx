import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { HoverIcon } from './hover-icon'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof HoverIcon> = {
  title: 'Atoms/Table/HoverIcon',
  component: HoverIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'sm',
  },
  render: (args) => (
    <div className="relative p-8 border rounded-lg bg-muted/5">
      <div className="text-sm text-muted-foreground mb-2">Hover icon positioned absolutely</div>
      <div className="relative h-12 w-48 bg-background border rounded flex items-center px-3">
        <span>Table cell content</span>
        <HoverIcon {...args} />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <div className="text-sm text-muted-foreground mb-4">Different sizes</div>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="space-y-2">
          <div className="text-xs text-muted-foreground">{size}</div>
          <div className="relative h-12 w-48 bg-background border rounded flex items-center px-3">
            <span>Size {size}</span>
            <HoverIcon size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <div className="text-sm text-muted-foreground mb-4">Different positions</div>
      {[
        { label: 'Left (default)', position: { left: '8px' } },
        { label: 'Right', position: { right: '8px' } },
        { label: 'Center Left', position: { left: '50%', transform: 'translateX(-50%) translateY(-50%)' } },
      ].map((config) => (
        <div key={config.label} className="space-y-2">
          <div className="text-xs text-muted-foreground">{config.label}</div>
          <div className="relative h-12 w-48 bg-background border rounded flex items-center px-3">
            <span>Position test</span>
            <HoverIcon position={config.position} />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const WithSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<{ name: string; email: string } | null>(null)

    const handleOpenSheet = (item: { name: string; email: string }) => {
      setSelectedItem(item)
      setIsOpen(true)
    }

    return (
      <div className="p-8">
        <div className="text-sm text-muted-foreground mb-4">Click hover icon to open sheet panel</div>
        <div className="border rounded-lg">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', email: 'john@example.com' },
                { name: 'Jane Smith', email: 'jane@example.com' },
                { name: 'Bob Johnson', email: 'bob@example.com' },
              ].map((row, index) => (
                <tr key={index} className="border-b hover:bg-muted/50 group">
                  <td className="px-4 py-2 relative">
                    {row.name}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <HoverIcon onClick={() => handleOpenSheet(row)} />
                    </div>
                  </td>
                  <td className="px-4 py-2">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
            <SheetHeader>
              <SheetTitle>{selectedItem?.name}</SheetTitle>
              <SheetDescription>
                Contact details and information
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false)
    
    return (
      <div className="relative p-8 border rounded-lg bg-muted/5">
        <div className="text-sm text-muted-foreground mb-2">
          Click the icon {clicked && '✓ Clicked!'}
        </div>
        <div className="relative h-12 w-48 bg-background border rounded flex items-center px-3">
          <span>Interactive example</span>
          <HoverIcon onClick={() => setClicked(true)} />
        </div>
        {clicked && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => setClicked(false)}
          >
            Reset
          </Button>
        )}
      </div>
    )
  },
}