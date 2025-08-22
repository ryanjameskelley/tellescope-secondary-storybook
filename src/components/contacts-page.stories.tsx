import type { Meta, StoryObj } from "@storybook/react";
import ContactsPage from "./contacts-page";

const meta: Meta<typeof ContactsPage> = {
  title: "Pages/Contacts",
  component: ContactsPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ContactsPage>;

export const Default: Story = {};