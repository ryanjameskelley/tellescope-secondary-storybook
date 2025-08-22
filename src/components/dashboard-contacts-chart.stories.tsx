import type { Meta, StoryObj } from "@storybook/react";
import { DashboardContactsChart } from "./dashboard-contacts-chart";

const meta: Meta<typeof DashboardContactsChart> = {
  title: "Organisms/Dashboard Contacts Chart",
  component: DashboardContactsChart,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardContactsChart {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardContactsChart>;

export const Default: Story = {};