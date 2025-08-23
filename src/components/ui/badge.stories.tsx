import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { DeletableBadge } from "./deletable-badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Deletable: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <DeletableBadge variant="default" onDelete={() => console.log("Delete default")}>
        Default
      </DeletableBadge>
      <DeletableBadge variant="secondary" onDelete={() => console.log("Delete secondary")}>
        Secondary
      </DeletableBadge>
      <DeletableBadge variant="outline" onDelete={() => console.log("Delete outline")}>
        Outline
      </DeletableBadge>
      <DeletableBadge variant="destructive" onDelete={() => console.log("Delete destructive")}>
        Destructive
      </DeletableBadge>
    </div>
  ),
};
