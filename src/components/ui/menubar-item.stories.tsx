import type { Meta, StoryObj } from "@storybook/react";
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarTrigger,
  MenubarSeparator
} from "./menubar";
import { StoryMenubarItem } from "./story-menubar-item";
import { StoryMenubarSubTrigger } from "./story-menubar-sub-trigger";

// Custom args interface for state control
interface MenuItemStoryArgs {
  children: string;
  state: "default" | "hovered" | "disabled";
  showShortcut: boolean;
  shortcut: string;
  showCheck: boolean;
}

const meta: Meta<MenuItemStoryArgs> = {
  title: "Atoms/Menu Item",
  component: MenubarItem,
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
    children: "Menubar Item Text",
    state: "default",
    showShortcut: false,
    shortcut: "⌘P",
    showCheck: true,
  },
  render: (args) => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <StoryMenubarItem 
            state={args.state}
            showShortcut={args.showShortcut}
            shortcut={args.shortcut}
            showCheck={args.showCheck}
          >
            {args.children}
          </StoryMenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export default meta;
type Story = StoryObj<MenuItemStoryArgs>;

export const Default: Story = {
  args: {
    children: "Menu Item Text",
    state: "default",
  },
};

// Separate story for menubar submenu trigger
export const MenuBarSubTrigger: Story = {
  args: {
    children: "Share",
    state: "default",
    showShortcut: false,
    shortcut: "⌘P",
    showCheck: false,
  },
  render: (args) => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <StoryMenubarSubTrigger
            subContent={
              <>
                <StoryMenubarItem>Email link</StoryMenubarItem>
                <StoryMenubarItem>Messages</StoryMenubarItem>
                <MenubarSeparator />
                <StoryMenubarItem>Notes</StoryMenubarItem>
              </>
            }
          >
            {args.children}
          </StoryMenubarSubTrigger>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};