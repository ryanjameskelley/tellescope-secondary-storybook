import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroupColors() {
  return (
    <RadioGroup defaultValue="blue">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="red" id="red" />
        <Label htmlFor="red">Red</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="blue" id="blue" />
        <Label htmlFor="blue">Blue</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="green" id="green" />
        <Label htmlFor="green">Green</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yellow" id="yellow" />
        <Label htmlFor="yellow">Yellow</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroupWithDisabled() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" disabled />
        <Label htmlFor="option3" className="opacity-50">Option 3 (Disabled)</Label>
      </div>
    </RadioGroup>
  );
}

const meta: Meta<typeof RadioGroupDemo> = {
  title: "Atoms/Radio Group",
  component: RadioGroupDemo,
};
export default meta;
type Story = StoryObj<typeof RadioGroupDemo>;

export const Default: Story = {
  render: () => <RadioGroupDemo />,
};

export const Colors: Story = {
  render: () => <RadioGroupColors />,
};

export const WithDisabled: Story = {
  render: () => <RadioGroupWithDisabled />,
};