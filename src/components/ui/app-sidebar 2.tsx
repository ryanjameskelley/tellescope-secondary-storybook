import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown, ChevronRight, ChevronDown, Inbox, File, Send, Archive, Trash2, Plus, MoreHorizontal } from "lucide-react";
import avatarImage from "@/assets/images/Screenshot 2025-04-10 at 1.30.28 PM.png";

export function AppSidebar() {
  return (
    <div className="h-full flex flex-col border-r border-border w-full">
      <div className="flex items-center px-2 border-b border-border h-[52px]">
        <div className="flex items-center gap-2 p-2 rounded-md w-full">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 rounded-lg bg-background">
              <AvatarImage src={avatarImage} alt="Avatar" />
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Tea</p>
            <p className="text-xs text-muted-foreground">m@example.com</p>
          </div>
          <div className="flex items-center justify-center">
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex items-center w-full">
        <button className="flex items-center gap-2 p-2 h-8 rounded-md w-full">
          <span className="text-sm font-medium text-foreground">Dashboard</span>
        </button>
      </div>

      <div className="flex items-center w-full">
        <button className="flex items-center gap-2 p-2 h-8 rounded-md w-full">
          <span className="text-sm font-medium text-foreground">Contacts</span>
        </button>
      </div>

      <div className="flex items-center w-full">
        <button className="flex items-center justify-between gap-2 p-2 h-8 rounded-md w-full">
          <span className="text-sm font-medium text-foreground">Ticketing</span>
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>
      </div>

      <div className="flex items-center justify-between px-2 h-8 rounded-md">
        <span className="text-sm font-medium leading-5 text-foreground">Messaging</span>
        <ChevronDown className="h-4 w-4 text-foreground" />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-1 p-2 border-border">
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary w-full">
            <div className="flex items-center pr-2">
              <Inbox className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Inbox</span>
            <span className="ml-auto text-sm font-medium text-white">128</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md w-full">
            <div className="flex items-center pr-2">
              <File className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Drafts</span>
            <span className="ml-auto text-sm font-medium text-foreground">123</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md w-full">
            <div className="flex items-center pr-2">
              <Send className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Sent</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md w-full">
            <div className="flex items-center pr-2">
              <Archive className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Archive</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md w-full">
            <div className="flex items-center pr-2">
              <Trash2 className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Trash</span>
          </button>
        </div>

        <Separator className="mx-2" />

        <div className="p-2">
          <div className="space-y-1">
            <button className="flex items-center justify-between gap-2 p-2 h-8 rounded-md w-full">
              <div className="flex items-center gap-2">
                <span className="text-base">📊</span>
                <span className="text-sm text-foreground">Tickets & such</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-foreground" />
            </button>

            <button className="flex items-center justify-between gap-2 p-2 h-8 rounded-md w-full">
              <div className="flex items-center gap-2">
                <span className="text-base">🍳</span>
                <span className="text-sm text-foreground">Data cleanliness</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-foreground" />
            </button>

            <button className="flex items-center justify-between gap-2 p-2 h-8 rounded-md w-full">
              <div className="flex items-center gap-2">
                <span className="text-base">💪</span>
                <span className="text-sm text-foreground">Customer service</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-foreground" />
            </button>

            <button className="flex items-center justify-between gap-2 p-2 h-8 rounded-md w-full">
              <div className="flex items-center gap-2">
                <span className="text-base">📚</span>
                <span className="text-sm text-foreground">Resources</span>
              </div>
              <MoreHorizontal className="h-4 w-4 text-foreground" />
            </button>

            <button className="flex items-center gap-2 p-2 h-8 rounded-md w-full">
              <Plus className="h-4 w-4 text-foreground" />
              <span className="text-sm text-foreground">Add a team channel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}