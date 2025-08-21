import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Badge",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Badge",
  },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Badge",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Badge",
  },
};

