import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const FallbackOnly: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const BrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-link.jpg" alt="Broken" />
      <AvatarFallback>BR</AvatarFallback>
    </Avatar>
  ),
}

export const UserProfiles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium">Healthcare Team</div>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Dr. Johnson</div>
          <div className="text-xs text-muted-foreground">Cardiologist</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c8a1?w=32&h=32&fit=crop&crop=face" />
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Sarah Wilson</div>
          <div className="text-xs text-muted-foreground">Nurse</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarFallback>PT</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Physical Therapist</div>
          <div className="text-xs text-muted-foreground">Available</div>
        </div>
      </div>
    </div>
  ),
}