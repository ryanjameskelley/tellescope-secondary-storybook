import type { Meta, StoryObj } from "@storybook/react";
import TicketsPage from "./tickets-page";

const meta: Meta<typeof TicketsPage> = {
  title: "Pages/Tickets",
  component: TicketsPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TicketsPage>;

export const Default: Story = {};