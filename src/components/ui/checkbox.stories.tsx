import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    checked: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Checkbox>) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox" {...args} />
      <Label htmlFor="checkbox">Checkbox</Label>
    </div>
  ),
  args: {
    checked: false,
    disabled: false,
  },
};
export const Checked: Story = {
  render: (args: React.ComponentProps<typeof Checkbox>) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-checked" {...args} />
      <Label htmlFor="checkbox-checked">Checked</Label>
    </div>
  ),
  args: {
    checked: true,
    disabled: false,
  },
};
export const Disabled: Story = {
  render: (args: React.ComponentProps<typeof Checkbox>) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-disabled" {...args} />
      <Label htmlFor="checkbox-disabled">Disabled</Label>
    </div>
  ),
  args: {
    checked: false,
    disabled: true,
  },
};
