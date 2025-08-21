import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { StoryDropdownMenuItem } from "./story-dropdown-menu-item";

// Custom args interface for dropdown menu controls
interface DropdownMenuStoryArgs {
  triggerText: string;
  triggerVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showShortcuts: boolean;
  showSubMenu: boolean;
}

const meta: Meta<DropdownMenuStoryArgs> = {
  title: "Molecules/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    triggerText: { control: "text" },
    triggerVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    showShortcuts: { control: "boolean" },
    showSubMenu: { control: "boolean" },
  },
  args: {
    triggerText: "Open",
    triggerVariant: "outline",
    showShortcuts: true,
    showSubMenu: true,
  },
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={args.triggerVariant}>{args.triggerText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⇧⌘P">
          Profile
        </StoryDropdownMenuItem>
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⌘B">
          Billing
        </StoryDropdownMenuItem>
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⌘S">
          Settings
        </StoryDropdownMenuItem>
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⌘K">
          Keyboard shortcuts
        </StoryDropdownMenuItem>
        <DropdownMenuSeparator />
        <StoryDropdownMenuItem>Team</StoryDropdownMenuItem>
        {args.showSubMenu && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <StoryDropdownMenuItem>Email</StoryDropdownMenuItem>
              <StoryDropdownMenuItem>Message</StoryDropdownMenuItem>
              <DropdownMenuSeparator />
              <StoryDropdownMenuItem>More...</StoryDropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⌘+T">
          New Team
        </StoryDropdownMenuItem>
        <DropdownMenuSeparator />
        <StoryDropdownMenuItem>GitHub</StoryDropdownMenuItem>
        <StoryDropdownMenuItem>Support</StoryDropdownMenuItem>
        <StoryDropdownMenuItem state="disabled">API</StoryDropdownMenuItem>
        <DropdownMenuSeparator />
        <StoryDropdownMenuItem showShortcut={args.showShortcuts} shortcut="⇧⌘Q">
          Log out
        </StoryDropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export default meta;
type Story = StoryObj<DropdownMenuStoryArgs>;

export const Default: Story = {
  args: {
    triggerText: "Open",
    triggerVariant: "outline",
    showShortcuts: true,
    showSubMenu: true,
  },
};