import type { Meta, StoryObj } from "@storybook/react";
import { ChartAreaInteractive } from "./chart-area-interactive";

const meta: Meta<typeof ChartAreaInteractive> = {
  title: "Organisms/Dashboard Message Chart",
  component: ChartAreaInteractive,
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="p-8 max-w-4xl mx-auto">
      <ChartAreaInteractive {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof ChartAreaInteractive>;

export const Default: Story = {};