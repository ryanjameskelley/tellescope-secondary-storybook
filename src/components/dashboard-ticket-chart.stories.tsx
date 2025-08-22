import type { Meta, StoryObj } from "@storybook/react";
import { DashboardTicketChart } from "./dashboard-ticket-chart";

const meta: Meta<typeof DashboardTicketChart> = {
  title: "Organisms/Dashboard Ticket Chart",
  component: DashboardTicketChart,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardTicketChart {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardTicketChart>;

export const Default: Story = {};