import type { Meta, StoryObj } from "@storybook/react";
import { CommandDemo } from "./command-demo";

const meta: Meta<typeof CommandDemo> = {
  title: "Molecules/Command",
  component: CommandDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CommandDemo>;

export const Default: Story = {};