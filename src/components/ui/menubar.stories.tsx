import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "./menubar";
import { StoryMenubarItem } from "./story-menubar-item";
import { StoryMenubarSubTrigger } from "./story-menubar-sub-trigger";

// Custom args interface for menubar controls
interface MenubarStoryArgs {
  showShortcuts: boolean;
  showSubMenu: boolean;
}

const meta: Meta<MenubarStoryArgs> = {
  title: "Molecules/Menu Bar",
  component: Menubar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showShortcuts: { control: "boolean" },
    showSubMenu: { control: "boolean" },
  },
  args: {
    showShortcuts: true,
    showSubMenu: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-[109px]">
      <Menubar className="h-9 w-fit border bg-background shadow-sm">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="w-[192px]">
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘T">
              New Tab
            </StoryMenubarItem>
            <StoryMenubarItem state="hovered" showShortcut={args.showShortcuts} shortcut="⌘N">
              New Window
            </StoryMenubarItem>
            <StoryMenubarItem state="disabled">
              New Incognito Window
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘P">
              Menubar Item Text
            </StoryMenubarItem>
            {args.showSubMenu && (
              <StoryMenubarSubTrigger
                subContent={
                  <>
                    <StoryMenubarItem>Email link</StoryMenubarItem>
                    <StoryMenubarItem>Messages</StoryMenubarItem>
                    <StoryMenubarItem>Notes</StoryMenubarItem>
                  </>
                }
              >
                Share
              </StoryMenubarSubTrigger>
            )}
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘P">
              Menubar Item Text
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘P">
              Print
            </StoryMenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘Z">
              Undo
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⇧⌘Z">
              Redo
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘X">
              Cut
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘C">
              Copy
            </StoryMenubarItem>
            <StoryMenubarItem showShortcut={args.showShortcuts} shortcut="⌘V">
              Paste
            </StoryMenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <StoryMenubarItem showCheck>
              Show Toolbar
            </StoryMenubarItem>
            <StoryMenubarItem showCheck>
              Show Sidebar
            </StoryMenubarItem>
            <StoryMenubarItem>
              Fullscreen
            </StoryMenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <StoryMenubarItem>
              Profile 1
            </StoryMenubarItem>
            <StoryMenubarItem>
              Profile 2
            </StoryMenubarItem>
            <StoryMenubarItem>
              Add Profile...
            </StoryMenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  ),
};

export default meta;
type Story = StoryObj<MenubarStoryArgs>;

export const Default: Story = {
  args: {
    showShortcuts: true,
    showSubMenu: true,
  },
};