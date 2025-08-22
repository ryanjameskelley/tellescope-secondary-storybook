import type { Meta, StoryObj } from "@storybook/react";
import ActivityDemo from "./activity-demo";

const meta: Meta<typeof ActivityDemo> = {
  title: "Atoms/Activity",
  component: ActivityDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ActivityDemo>;

export const Default: Story = {};