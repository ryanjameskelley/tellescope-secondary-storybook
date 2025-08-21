import type { Meta, StoryObj } from "@storybook/react";
import CollapsibleDemo from "../../components/collapsible";

const meta: Meta<typeof CollapsibleDemo> = {
  title: "Molecules/Collapsible",
  component: CollapsibleDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CollapsibleDemo>;

export const Default: Story = {};