import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="w-[250px] h-4 rounded-full" />,
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-3 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-5 w-[250px]" />
      <Skeleton className="h-6 w-[350px]" />
    </div>
  ),
}

export const PatientCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center space-y-0 pb-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="ml-4 space-y-2 flex-1">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[80%]" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  ),
}

export const TableLoading: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-3">
      {/* Table header */}
      <div className="flex space-x-4 p-2">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      {/* Table rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4 p-2">
          <Skeleton className="h-4 w-8" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  ),
}

export const DashboardCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        </Card>
      ))}
    </div>
  ),
}

export const AppointmentList: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  ),
}

export const MessageThread: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="flex items-center space-x-3 p-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      
      {/* Messages */}
      <div className="space-y-3">
        {/* Incoming message */}
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
          <div className="space-y-1">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        
        {/* Outgoing message */}
        <div className="flex justify-end">
          <div className="space-y-1">
            <Skeleton className="h-6 w-36 rounded-lg" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        
        {/* Incoming message */}
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
          <div className="space-y-1">
            <Skeleton className="h-12 w-52 rounded-lg" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
      
      {/* Message input */}
      <div className="flex space-x-2 p-3 border-t">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>
    </div>
  ),
}

export const ProfileHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
            <div className="flex space-x-2 mt-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <div className="space-x-2">
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),
}

export const ChartLoading: Story = {
  render: () => (
    <Card className="w-full max-w-lg p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        <div className="space-y-3">
          <Skeleton className="h-40 w-full rounded-md" />
          
          <div className="flex items-center justify-center space-x-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-1">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  ),
}