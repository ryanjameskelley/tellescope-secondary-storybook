import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppSidebar } from "./app-sidebar";

const meta: Meta<typeof AppSidebar> = {
  title: "Organisms/App Sidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen">
      <div className="w-64">
        <AppSidebar />
      </div>
      <div className="flex-1 p-6 bg-background">
        <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
        <p className="text-muted-foreground">
          This is the main content area. The app sidebar demonstrates a complete navigation structure
          with user profile, main navigation items, messaging section with counts, and team channels.
        </p>
      </div>
    </div>
  ),
};