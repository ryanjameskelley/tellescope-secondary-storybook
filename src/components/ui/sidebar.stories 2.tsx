import type { Meta, StoryObj } from "@storybook/react";
import * as SidebarComponents from "./sidebar";
import { Button } from "./button";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User,
  FileText,
  PlusCircle,
} from "lucide-react";

interface SidebarDemoProps {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  defaultOpen?: boolean;
}

function SidebarDemo({
  side = "left",
  variant = "sidebar", 
  collapsible = "offcanvas",
  defaultOpen = true,
}: SidebarDemoProps) {
  return (
    <SidebarComponents.SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full">
        <SidebarComponents.Sidebar side={side} variant={variant} collapsible={collapsible}>
          <SidebarComponents.SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Home className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Acme Inc</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </div>
          </SidebarComponents.SidebarHeader>
          
          <SidebarComponents.SidebarContent>
            <SidebarComponents.SidebarGroup>
              <SidebarComponents.SidebarGroupLabel>Platform</SidebarComponents.SidebarGroupLabel>
              <SidebarComponents.SidebarGroupContent>
                <SidebarComponents.SidebarMenu>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton isActive>
                      <Home />
                      <span>Home</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <Inbox />
                      <span>Inbox</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <Calendar />
                      <span>Calendar</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <Search />
                      <span>Search</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                </SidebarComponents.SidebarMenu>
              </SidebarComponents.SidebarGroupContent>
            </SidebarComponents.SidebarGroup>
            
            <SidebarComponents.SidebarSeparator />
            
            <SidebarComponents.SidebarGroup>
              <SidebarComponents.SidebarGroupLabel>Projects</SidebarComponents.SidebarGroupLabel>
              <SidebarComponents.SidebarGroupContent>
                <SidebarComponents.SidebarMenu>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <FileText />
                      <span>Design System</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <FileText />
                      <span>Website Redesign</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                  <SidebarComponents.SidebarMenuItem>
                    <SidebarComponents.SidebarMenuButton>
                      <PlusCircle />
                      <span>Add Project</span>
                    </SidebarComponents.SidebarMenuButton>
                  </SidebarComponents.SidebarMenuItem>
                </SidebarComponents.SidebarMenu>
              </SidebarComponents.SidebarGroupContent>
            </SidebarComponents.SidebarGroup>
          </SidebarComponents.SidebarContent>
          
          <SidebarComponents.SidebarFooter>
            <SidebarComponents.SidebarMenu>
              <SidebarComponents.SidebarMenuItem>
                <SidebarComponents.SidebarMenuButton>
                  <User />
                  <span>Profile</span>
                </SidebarComponents.SidebarMenuButton>
              </SidebarComponents.SidebarMenuItem>
              <SidebarComponents.SidebarMenuItem>
                <SidebarComponents.SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarComponents.SidebarMenuButton>
              </SidebarComponents.SidebarMenuItem>
            </SidebarComponents.SidebarMenu>
          </SidebarComponents.SidebarFooter>
          
          <SidebarComponents.SidebarRail />
        </SidebarComponents.Sidebar>
        
        <SidebarComponents.SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              <SidebarComponents.SidebarTrigger />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarComponents.SidebarInset>
      </div>
    </SidebarComponents.SidebarProvider>
  );
}

const meta: Meta<typeof SidebarDemo> = {
  title: "Molecules/Sidebar",
  component: SidebarDemo,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Which side the sidebar appears on",
    },
    variant: {
      control: { type: "select" },
      options: ["sidebar", "floating", "inset"],
      description: "Visual variant of the sidebar",
    },
    collapsible: {
      control: { type: "select" },
      options: ["offcanvas", "icon", "none"],
      description: "How the sidebar collapses",
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "Whether the sidebar is open by default",
    },
  },
  args: {
    side: "left",
    variant: "sidebar", 
    collapsible: "offcanvas",
    defaultOpen: true,
  },
};
export default meta;
type Story = StoryObj<typeof SidebarDemo>;

export const Default: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
};

export const RightSide: Story = {
  args: {
    side: "right",
    variant: "sidebar",
    collapsible: "offcanvas", 
    defaultOpen: true,
  },
};

export const FloatingVariant: Story = {
  args: {
    side: "left",
    variant: "floating",
    collapsible: "offcanvas",
    defaultOpen: true,
  },
};

export const InsetVariant: Story = {
  args: {
    side: "left",
    variant: "inset", 
    collapsible: "offcanvas",
    defaultOpen: true,
  },
};

export const IconCollapsible: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
    defaultOpen: true,
  },
};

export const NonCollapsible: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "none",
    defaultOpen: true,
  },
};

export const StartCollapsed: Story = {
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "offcanvas",
    defaultOpen: false,
  },
};