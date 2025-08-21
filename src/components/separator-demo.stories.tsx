import type { Meta, StoryObj } from "@storybook/react";
import { SeparatorDemo } from "./separator-demo";

const meta: Meta<typeof SeparatorDemo> = {
  title: "Atoms/Separator",
  component: SeparatorDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SeparatorDemo>;

export const Default: Story = {};