import type { Meta, StoryObj } from "@storybook/react";
import { DashboardChart } from "./dashboard-chart";

const meta: Meta<typeof DashboardChart> = {
  title: "Organisms/Dashboard Chart",
  component: DashboardChart,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardChart {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardChart>;

export const Default: Story = {};