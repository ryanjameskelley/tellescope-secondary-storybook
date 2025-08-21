import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronsUpDown, 
  LayoutDashboard, 
  Sparkles, 
  UsersRound, 
  Ticket, 
  Inbox, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  MoreHorizontal 
} from "lucide-react";

export function AppSidebar() {
  const [isMessagingExpanded, setIsMessagingExpanded] = useState(true);
  return (
    <div className="border-r h-full bg-sidebar text-sidebar-foreground w-full">
      <div className="px-2 py-2 border-b h-[52px] flex items-center">
        <div className="flex items-center gap-2 p-2 rounded-md">
          <div className="flex items-start">
            <Avatar className="h-8 w-8 rounded-lg bg-background">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
          </div>
          <div className="flex flex-col justify-center items-start gap-0.5">
            <p className="text-sm font-semibold text-sidebar-foreground leading-none">Tea</p>
            <p className="text-xs text-sidebar-foreground leading-none">m@example.com</p>
          </div>
          <div className="flex items-center justify-center">
            <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground" />
          </div>
        </div>
      </div>

      <div className="pt-2 px-2">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
            <LayoutDashboard className="h-4 w-4 mr-2 text-sidebar-foreground" />
            <span className="text-sm text-sidebar-foreground">Dashboard</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
            <Sparkles className="h-4 w-4 mr-2 text-sidebar-foreground" />
            <span className="text-sm text-sidebar-foreground">Ask AI</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
            <UsersRound className="h-4 w-4 mr-2 text-sidebar-foreground" />
            <span className="text-sm text-sidebar-foreground">Contacts</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
            <Ticket className="h-4 w-4 mr-2 text-sidebar-foreground" />
            <span className="text-sm text-sidebar-foreground">Tickets</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md" onClick={() => setIsMessagingExpanded(!isMessagingExpanded)}>
            <Inbox className="h-4 w-4 mr-2 text-sidebar-foreground" />
            <span className="text-sm text-sidebar-foreground">Messaging</span>
            {isMessagingExpanded ? 
              <ChevronDown className="ml-auto h-4 w-4 text-sidebar-foreground" /> : 
              <ChevronRight className="ml-auto h-4 w-4 text-sidebar-foreground" />
            }
          </Button>
        </div>
      </div>

      {isMessagingExpanded && (
        <>
          <div className="px-2 py-2">
            <div className="space-y-1">
              <Button className="w-full justify-start h-9 px-3 py-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <span className="text-sm font-medium">Inbox</span>
                <span className="ml-auto text-sm font-medium">128</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 px-3 py-2 rounded-md">
                <span className="text-sm font-medium text-foreground">Drafts</span>
                <span className="ml-auto text-sm font-medium text-foreground">123</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 px-3 py-2 rounded-md">
                <span className="text-sm font-medium text-foreground">Sent</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 px-3 py-2 rounded-md">
                <span className="text-sm font-medium text-foreground">Archive</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-9 px-3 py-2 rounded-md">
                <span className="text-sm font-medium text-foreground">Trash</span>
              </Button>
            </div>
          </div>

          <Separator className="mx-2" />

          <div className="px-2 py-2">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
                <Plus className="h-4 w-4 mr-2 text-sidebar-foreground" />
                <span className="text-sm text-sidebar-foreground">Add a team channel</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
                <span className="mr-2">📊</span>
                <span className="text-sm text-sidebar-foreground">Tickets & such</span>
                <MoreHorizontal className="ml-auto h-4 w-4 text-sidebar-foreground" />
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
                <span className="mr-2">🍳</span>
                <span className="text-sm text-sidebar-foreground">Data cleanliness</span>
                <MoreHorizontal className="ml-auto h-4 w-4 text-sidebar-foreground" />
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
                <span className="mr-2">💪</span>
                <span className="text-sm text-sidebar-foreground">Customer service</span>
                <MoreHorizontal className="ml-auto h-4 w-4 text-sidebar-foreground" />
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 px-2 py-2 rounded-md">
                <span className="mr-2">📚</span>
                <span className="text-sm text-sidebar-foreground">Resources</span>
                <MoreHorizontal className="ml-auto h-4 w-4 text-sidebar-foreground" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}