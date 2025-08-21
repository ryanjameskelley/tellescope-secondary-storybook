import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroupDemo } from "./toggle-group-demo";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const meta: Meta<typeof ToggleGroupDemo> = {
  title: "Atoms/Toggle Group",
  component: ToggleGroupDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroupDemo>;

export const Default: Story = {};

export const ToggleSelector: Story = {
  render: () => (
    <ToggleGroup variant="outline" type="single" defaultValue="last-7-days" className="w-fit">
      <ToggleGroupItem value="last-3-months" className="font-normal px-3 w-fit">
        Last 3 months
      </ToggleGroupItem>
      <ToggleGroupItem value="last-30-days" className="font-normal px-2 w-fit">
        Last 30 days
      </ToggleGroupItem>
      <ToggleGroupItem value="last-7-days" className="font-normal px-2.5 w-fit">
        Last 7 days
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};