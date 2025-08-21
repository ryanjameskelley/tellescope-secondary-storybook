import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    type: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    type: "email",
    placeholder: "Placeholder",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Input>) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
  args: {
    type: "email",
    placeholder: "Placeholder",
  },
};
export const Disabled: Story = {
  render: (args: React.ComponentProps<typeof Input>) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
  args: {
    type: "email",
    placeholder: "Placeholder",
    disabled: true,
  },
};
