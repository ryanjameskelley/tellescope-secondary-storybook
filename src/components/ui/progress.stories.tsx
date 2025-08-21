import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Atoms/Progress",
  component: Progress,
  argTypes: {
    value: { 
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value (0-100)"
    },
    className: { control: "text" },
  },
  args: {
    value: 50,
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-[60%]">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-[60%]">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 0,
  },
};

export const Quarter: Story = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-[60%]">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 25,
  },
};

export const ThreeQuarters: Story = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-[60%]">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 75,
  },
};

export const Complete: Story = {
  render: (args: React.ComponentProps<typeof Progress>) => (
    <div className="w-[60%]">
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 100,
  },
};