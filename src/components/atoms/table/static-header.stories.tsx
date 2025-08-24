import type { Meta, StoryObj } from "@storybook/react"
import { StaticHeader } from "./static-header"

const meta: Meta<typeof StaticHeader> = {
  title: "Atoms/Table/StaticHeader",
  component: StaticHeader,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "The text content of the header",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
}

export default meta
type Story = StoryObj<typeof StaticHeader>

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