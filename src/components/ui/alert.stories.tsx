import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

const Template = (args: any) => (
  <Alert {...args}>
    {args.variant === "destructive" ? (
      <>
        <AlertTitle>Unable to process your payment</AlertTitle>
        <AlertDescription>
          Please verify your billing information and try again.
        </AlertDescription>
      </>
    ) : (
      <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the CLI.
        </AlertDescription>
      </>
    )}
  </Alert>
);

export const Default: Story = {
  render: Template,
  args: {
    variant: "default",
  },
};

export const Destructive: Story = {
  render: Template,
  args: {
    variant: "destructive",
  },
};
