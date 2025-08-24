import type { Meta, StoryObj } from "@storybook/react"
import { TicketingTable } from "./ticketing-table"
import { Toaster as Sonner } from "sonner"

const meta: Meta<typeof TicketingTable> = {
  title: "Organisms/TicketingTable", 
  component: TicketingTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A comprehensive ticketing table organism with filtering, drag-and-drop reordering, row selection, and status management. Based on the structure shown in CLAUDE.md with additional features like search filtering and interactive status tags."
      }
    }
  },
  render: (args) => (
    <div className="p-8 max-w-6xl mx-auto">
      <TicketingTable {...args} />
    </div>
  ),
  decorators: [
    (Story) => (
      <>
        <Story />
        <Sonner theme="light" />
      </>
    ),
  ],
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}