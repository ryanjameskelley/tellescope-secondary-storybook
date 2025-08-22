import type { Meta, StoryObj } from "@storybook/react";
import { ContactsTable } from "./contacts-table";

const meta: Meta<typeof ContactsTable> = {
  title: "Organisms/Contacts Table",
  component: ContactsTable,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-6xl mx-auto">
      <ContactsTable {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof ContactsTable>;

export const Default: Story = {};