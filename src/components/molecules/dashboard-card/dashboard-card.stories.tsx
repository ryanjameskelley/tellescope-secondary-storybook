import type { Meta, StoryObj } from '@storybook/react'
import { DashboardCard } from './dashboard-card'
import { AlertTriangle, Clock } from 'lucide-react'

const meta: Meta<typeof DashboardCard> = {
  title: 'Molecules/DashboardCard',
  component: DashboardCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Ticket: Story = {
  args: {},
}

export const TicketPriorityNotSet: Story = {
  args: {
    priority: 'Priority not set',
  },
}

export const TicketNotAssigned: Story = {
  args: {
    assignees: null,
  },
}

export const Message: Story = {
  args: {
    statusLabel: '',
    title: 'Message title',
    status: undefined,
  },
}

