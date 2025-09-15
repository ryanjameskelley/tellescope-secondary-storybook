import type { Meta, StoryObj } from '@storybook/react'
import { LoadingScreen } from './loading-screen'

const meta: Meta<typeof LoadingScreen> = {
  title: 'Atoms/LoadingScreen',
  component: LoadingScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Loading text to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading spinner',
    },
    variant: {
      control: 'select',
      options: ['fullscreen', 'centered', 'inline'],
      description: 'Display variant of the loading screen',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomText: Story = {
  args: {
    text: 'Please wait while we load your data...',
  },
}

export const NoText: Story = {
  args: {
    text: '',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    text: 'Loading...',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    text: 'Loading large dataset...',
  },
}

export const CenteredVariant: Story = {
  args: {
    variant: 'centered',
    text: 'Centered loading',
  },
  parameters: {
    layout: 'centered',
  },
}

export const InlineVariant: Story = {
  args: {
    variant: 'inline',
    text: 'Inline loading',
  },
  parameters: {
    layout: 'centered',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <LoadingScreen variant="inline" size="sm" text="Small spinner" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <LoadingScreen variant="inline" size="md" text="Medium spinner" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <LoadingScreen variant="inline" size="lg" text="Large spinner" />
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-white p-4 border rounded">
        <h3 className="text-lg font-semibold mb-4">Inline Variant</h3>
        <div className="h-32 border-2 border-dashed border-gray-200">
          <LoadingScreen variant="inline" text="Inline loading" />
        </div>
      </div>
      
      <div className="bg-white p-4 border rounded">
        <h3 className="text-lg font-semibold mb-4">Centered Variant</h3>
        <div className="h-32 border-2 border-dashed border-gray-200">
          <LoadingScreen variant="centered" text="Centered loading" />
        </div>
      </div>
      
      <div className="bg-white p-4 border rounded">
        <h3 className="text-lg font-semibold mb-4">Fullscreen Variant (Simulated)</h3>
        <div className="h-64 border-2 border-dashed border-gray-200 relative">
          <LoadingScreen 
            variant="fullscreen" 
            text="Fullscreen loading" 
            className="!min-h-full absolute inset-0"
          />
        </div>
      </div>
    </div>
  ),
}

export const WithCustomStyling: Story = {
  args: {
    variant: 'inline',
    text: 'Custom styled loading',
    className: 'bg-gray-50 border-2 border-gray-200 rounded-lg',
  },
  parameters: {
    layout: 'centered',
  },
}