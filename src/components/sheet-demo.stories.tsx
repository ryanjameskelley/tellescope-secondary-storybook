import type { Meta, StoryObj } from "@storybook/react";
import { SheetDemo } from "./sheet-demo";

const meta: Meta<typeof SheetDemo> = {
  title: "Molecules/Sheet",
  component: SheetDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SheetDemo>;

export const Default: Story = {};