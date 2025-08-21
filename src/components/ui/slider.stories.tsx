import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  argTypes: {
    defaultValue: { control: "object" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Slider>) => (
    <div className="w-[60%]">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Range: Story = {
  render: (args: React.ComponentProps<typeof Slider>) => (
    <div className="w-[60%]">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithStep: Story = {
  render: (args: React.ComponentProps<typeof Slider>) => (
    <div className="w-[60%]">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 10,
  },
};

export const Disabled: Story = {
  render: (args: React.ComponentProps<typeof Slider>) => (
    <div className="w-[60%]">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
  },
};