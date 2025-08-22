import { Button } from "../components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    children: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default Button",
  },
};
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};
export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};
