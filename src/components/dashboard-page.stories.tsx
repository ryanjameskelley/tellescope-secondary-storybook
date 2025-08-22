import type { Meta, StoryObj } from "@storybook/react";
import DashboardPage from "./dashboard-page";

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/Dashboard",
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};