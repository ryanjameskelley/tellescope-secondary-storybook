import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Home, Settings, Menu, X, Calendar, Inbox, Search } from "lucide-react";
import { Button } from "./button";

// Try importing just what we need from sidebar
import { SidebarProvider, useSidebar } from "./sidebar";

interface CollapsibleSidebarProps {
  defaultCollapsed?: boolean;
}

function CollapsibleSidebar({ defaultCollapsed = false }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen w-full">
      <aside 
        className={`bg-sidebar border-r border-border transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">Navigation</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              {isCollapsed ? <Menu className="size-4" /> : <X className="size-4" />}
            </Button>
          </div>
          
          <nav className="space-y-2">
            <a 
              href="#" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent group"
              title={isCollapsed ? "Home" : ""}
            >
              <Home className="size-4 flex-shrink-0" />
              {!isCollapsed && <span>Home</span>}
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent group"
              title={isCollapsed ? "Calendar" : ""}
            >
              <Calendar className="size-4 flex-shrink-0" />
              {!isCollapsed && <span>Calendar</span>}
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent group"
              title={isCollapsed ? "Inbox" : ""}
            >
              <Inbox className="size-4 flex-shrink-0" />
              {!isCollapsed && <span>Inbox</span>}
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent group"
              title={isCollapsed ? "Search" : ""}
            >
              <Search className="size-4 flex-shrink-0" />
              {!isCollapsed && <span>Search</span>}
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent group"
              title={isCollapsed ? "Settings" : ""}
            >
              <Settings className="size-4 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </a>
          </nav>
        </div>
      </aside>
      
      <main className="flex-1 p-6 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleSidebar}
          >
            {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Card 1</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Card 2</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Card 3</span>
          </div>
        </div>
        
        <div className="rounded-xl bg-muted/50 p-6">
          <h2 className="text-lg font-semibold mb-2">Main Content Area</h2>
          <p className="text-muted-foreground">
            This is a collapsible sidebar implementation. Click the toggle button to expand/collapse the sidebar.
            {isCollapsed ? ' The sidebar is currently collapsed.' : ' The sidebar is currently expanded.'}
          </p>
        </div>
      </main>
    </div>
  );
}

const meta: Meta<typeof CollapsibleSidebar> = {
  title: "Molecules/Sidebar",
  component: CollapsibleSidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    defaultCollapsed: {
      control: { type: "boolean" },
      description: "Whether the sidebar starts collapsed",
    },
  },
  args: {
    defaultCollapsed: false,
  },
};
export default meta;
type Story = StoryObj<typeof CollapsibleSidebar>;

export const Default: Story = {
  args: {
    defaultCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    defaultCollapsed: true,
  },
};