import type { Meta, StoryObj } from "@storybook/react"
import { TicketingTable } from "./ticketing-table"

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
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}