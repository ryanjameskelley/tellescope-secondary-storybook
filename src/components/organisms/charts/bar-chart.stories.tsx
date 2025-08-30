import type { Meta, StoryObj } from '@storybook/react'
import { ChartBarInteractive } from './bar-chart'

const meta: Meta<typeof ChartBarInteractive> = {
  title: 'Organisms/Charts/BarChart',
  component: ChartBarInteractive,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const BarChart: Story = {
  render: () => <ChartBarInteractive />,
}