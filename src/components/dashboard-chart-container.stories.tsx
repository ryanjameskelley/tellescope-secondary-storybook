import type { Meta, StoryObj } from "@storybook/react";
import { TabbedContainer } from "./dashboard-chart-container";

const meta: Meta<typeof TabbedContainer> = {
  title: "Molecules/Tabbed Container",
  component: TabbedContainer,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-6xl mx-auto">
      <TabbedContainer {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof TabbedContainer>;

export const Chart: Story = {
  args: {
    defaultValue: "messages",
    tabs: [
      { value: "messages", label: "Messages", content: <div className="p-4 text-muted-foreground">Messages chart content would go here</div> },
      { value: "tickets", label: "Tickets", content: <div className="p-4 text-muted-foreground">Tickets chart content would go here</div> },
      { value: "contacts", label: "Contacts", content: <div className="p-4 text-muted-foreground">Contacts chart content would go here</div> }
    ]
  },
};

export const ContactsTable: Story = {
  args: {
    defaultValue: "patients",
    tabs: [
      { value: "patients", label: "Patients", content: <div className="p-4 text-muted-foreground">Patients table content would go here</div> },
      { value: "other", label: "Other", content: <div className="p-4 text-muted-foreground">Other table content would go here</div> }
    ]
  },
};