import type { Meta, StoryObj } from "@storybook/react";
import { TicketTableContainer } from "./ticket-table-container";

const meta: Meta<typeof TicketTableContainer> = {
  title: "Molecules/Ticket Table Container",
  component: TicketTableContainer,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <TicketTableContainer 
        {...args}
        queuesContent={<div className="p-4 text-muted-foreground">Queues chart content would go here</div>}
        ticketsContent={<div className="p-4 text-muted-foreground">Tickets chart content would go here</div>}
        boardContent={<div className="p-4 text-muted-foreground">Board chart content would go here</div>}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof TicketTableContainer>;

export const Default: Story = {};