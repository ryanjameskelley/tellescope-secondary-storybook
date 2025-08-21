import type { Meta, StoryObj } from "@storybook/react";
import { ComboboxDemo } from "./combobox-demo";

const meta: Meta<typeof ComboboxDemo> = {
  title: "Molecules/Combobox",
  component: ComboboxDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ComboboxDemo>;

export const Default: Story = {};