import type { Meta, StoryObj } from "@storybook/react";
import { DashboardChartContainer } from "./dashboard-chart-container";

const meta: Meta<typeof DashboardChartContainer> = {
  title: "Molecules/Dashboard Chart Container",
  component: DashboardChartContainer,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardChartContainer 
        {...args}
        messagesContent={<div className="p-4 text-muted-foreground">Messages chart content would go here</div>}
        ticketsContent={<div className="p-4 text-muted-foreground">Tickets chart content would go here</div>}
        contactsContent={<div className="p-4 text-muted-foreground">Contacts chart content would go here</div>}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof DashboardChartContainer>;

export const Default: Story = {};