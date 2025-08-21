import type { Meta, StoryObj } from "@storybook/react";
import { TabsDemo } from "./tabs-demo";

const meta: Meta<typeof TabsDemo> = {
  title: "Molecules/Tabs",
  component: TabsDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TabsDemo>;

export const Default: Story = {};