import type { Meta, StoryObj } from "@storybook/react"
import { SortableHeader } from "./sortable-header"

const meta: Meta<typeof SortableHeader> = {
  title: "Atoms/Table/SortableHeader",
  component: SortableHeader,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "The text content of the header",
    },
    onSort: {
      action: "sort",
      description: "Function called when header is clicked for sorting",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
}

export default meta
type Story = StoryObj<typeof SortableHeader>

export const Default: Story = {
  args: {
    children: "Column Header",
  },
}

export const WithCustomClass: Story = {
  args: {
    children: "Custom Header",
    className: "text-blue-600",
  },
}