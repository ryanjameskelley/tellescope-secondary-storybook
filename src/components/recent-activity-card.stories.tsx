import type { Meta, StoryObj } from "@storybook/react";
import RecentActivityCard from "./recent-activity-card";

const meta: Meta<typeof RecentActivityCard> = {
  title: "Organisms/Recent Activity Card",
  component: RecentActivityCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RecentActivityCard>;

export const Default: Story = {};