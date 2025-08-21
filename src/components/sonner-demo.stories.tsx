import type { Meta, StoryObj } from "@storybook/react";
import { SonnerDemo } from "./sonner-demo";
import { Toaster as Sonner } from "sonner";

const meta: Meta<typeof SonnerDemo> = {
  title: "Molecules/Sonner",
  component: SonnerDemo,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Sonner theme="light" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SonnerDemo>;

export const Default: Story = {};