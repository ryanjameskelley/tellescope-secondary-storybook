import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

function SelectDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="framework">Select a framework</Label>
      <Select>
        <SelectTrigger className="w-[180px]" id="framework">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="sveltekit">SvelteKit</SelectItem>
          <SelectItem value="nuxt">Nuxt.js</SelectItem>
          <SelectItem value="remix">Remix</SelectItem>
          <SelectItem value="astro">Astro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SelectWithGroups() {
  return (
    <div className="space-y-2">
      <Label htmlFor="fruit">Select a fruit</Label>
      <Select>
        <SelectTrigger className="w-[180px]" id="fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="spinach">Spinach</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function SelectSizes() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="size-default">Default size</Label>
        <Select>
          <SelectTrigger className="w-[180px]" id="size-default">
            <SelectValue placeholder="Default size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="size-small">Small size</Label>
        <Select>
          <SelectTrigger className="w-[180px]" size="sm" id="size-small">
            <SelectValue placeholder="Small size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function SelectWithDefaultValue() {
  return (
    <div className="space-y-2">
      <Label htmlFor="theme">Select theme</Label>
      <Select defaultValue="dark">
        <SelectTrigger className="w-[180px]" id="theme">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

const meta: Meta<typeof SelectDemo> = {
  title: "Molecules/Select",
  component: SelectDemo,
};
export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Default: Story = {
  render: () => <SelectDemo />,
};

export const WithGroups: Story = {
  render: () => <SelectWithGroups />,
};

export const Sizes: Story = {
  render: () => <SelectSizes />,
};

export const WithDefaultValue: Story = {
  render: () => <SelectWithDefaultValue />,
};