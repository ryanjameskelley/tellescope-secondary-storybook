import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDemo } from "./calendar-demo";

const meta: Meta<typeof CalendarDemo> = {
  title: "Molecules/Calendar",
  component: CalendarDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarDemo>;

export const Default: Story = {};