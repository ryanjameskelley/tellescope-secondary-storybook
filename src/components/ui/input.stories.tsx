import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "small"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    size: "default",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Small input...",
    size: "small",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};
