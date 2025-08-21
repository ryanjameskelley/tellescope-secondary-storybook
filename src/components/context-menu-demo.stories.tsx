import type { Meta, StoryObj } from "@storybook/react";
import { ContextMenuDemo } from "./context-menu-demo";

const meta: Meta<typeof ContextMenuDemo> = {
  title: "Molecules/Context Menu",
  component: ContextMenuDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenuDemo>;

export const Default: Story = {};