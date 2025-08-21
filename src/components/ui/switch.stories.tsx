import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args: React.ComponentProps<typeof Switch>) => (
    <div className="flex items-center gap-2">
      <Switch id="switch" {...args} />
      <Label htmlFor="switch">Switch</Label>
    </div>
  ),
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  render: (args: React.ComponentProps<typeof Switch>) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-checked" {...args} />
      <Label htmlFor="switch-checked">Checked</Label>
    </div>
  ),
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args: React.ComponentProps<typeof Switch>) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-disabled" {...args} />
      <Label htmlFor="switch-disabled">Disabled</Label>
    </div>
  ),
  args: {
    checked: false,
    disabled: true,
  },
};

