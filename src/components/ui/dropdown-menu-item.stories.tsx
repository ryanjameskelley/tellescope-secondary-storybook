import type { Meta, StoryObj } from "@storybook/react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator
} from "./dropdown-menu";
import { Button } from "./button";
import { StoryDropdownMenuItem } from "./story-dropdown-menu-item";

// Custom args interface for state control
interface DropdownMenuItemStoryArgs {
  children: string;
  state: "default" | "hovered" | "disabled";
  showShortcut: boolean;
  shortcut: string;
  showCheck: boolean;
}

const meta: Meta<DropdownMenuItemStoryArgs> = {
  title: "Atoms/Dropdown Menu Item",
  component: DropdownMenuItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "hovered", "disabled"],
    },
    children: { control: "text" },
    showShortcut: { control: "boolean" },
    shortcut: { control: "text" },
    showCheck: { control: "boolean" },
  },
  args: {
    children: "Dropdown Menu Item Text",
    state: "default",
    showShortcut: false,
    shortcut: "⌘P",
    showCheck: false,
  },
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <StoryDropdownMenuItem 
          state={args.state}
          showShortcut={args.showShortcut}
          shortcut={args.shortcut}
          showCheck={args.showCheck}
        >
          {args.children}
        </StoryDropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export default meta;
type Story = StoryObj<DropdownMenuItemStoryArgs>;

export const Default: Story = {
  args: {
    children: "Dropdown Menu Item Text",
    state: "default",
    showShortcut: false,
    shortcut: "⌘P",
    showCheck: false,
  },
};

// Separate story for submenu trigger
export const SubMenuTrigger: Story = {
  args: {
    children: "Invite users",
    state: "default",
    showShortcut: false,
    shortcut: "⌘P",
    showCheck: false,
  },
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {args.children}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <StoryDropdownMenuItem>Email</StoryDropdownMenuItem>
            <StoryDropdownMenuItem>Message</StoryDropdownMenuItem>
            <DropdownMenuSeparator />
            <StoryDropdownMenuItem>More...</StoryDropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};