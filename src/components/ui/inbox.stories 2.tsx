import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PanelLeft, PanelLeftClose, Archive, ArchiveX, Trash2, Clock4, Reply, ReplyAll, Forward, EllipsisVertical } from "lucide-react";
import { AppSidebar } from "./app-sidebar";

function MailBlock({ showSidebar = false, onToggleSidebar }: { showSidebar?: boolean; onToggleSidebar?: () => void } = {}) {
  const [activeTab, setActiveTab] = useState("all-mail");
  const [isMuted, setIsMuted] = useState(false);
  
  const messages = [
    { id: 1, sender: "Chompy", subject: "Meeting Tomorrow", isUnread: true, content: "Hi, let's have a meeting tomorrow to discuss the project...", badges: ["meeting", "work", "important"], time: "about 1 year ago" },
    { id: 2, sender: "Alice Smith", subject: "Re: Project Update", isUnread: false, content: "Thank you for the project update. It looks great!...", badges: ["work", "important"], time: "about 1 year ago" },
    { id: 3, sender: "Bob Johnson", subject: "Weekend Plans", isUnread: false, content: "Any plans for the weekend? I was thinking of going hiking...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" },
    { id: 4, sender: "Emily Davis", subject: "Re: Question about Budget", isUnread: true, content: "I have a question about the budget for the upcoming project...", badges: ["personal"], time: "almost 2 years ago" },
    { id: 5, sender: "Michael Wilson", subject: "Important Announcement", isUnread: true, content: "I have an important announcement to make during our team meeting...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" },
    { id: 6, sender: "Sarah Brown", subject: "Re: Feedback on Proposal", isUnread: false, content: "Thank you for your feedback on the proposal. It looks great!...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" }
  ];
  
  const filteredMessages = activeTab === "unread" ? messages.filter(msg => msg.isUnread) : messages;
  
  return (
    <div className="flex bg-background">
      <div className="flex flex-col border-r h-screen min-w-[350px]">
        <div className="flex items-center justify-between px-4 py-2 border-b h-[52px]">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-md" onClick={onToggleSidebar}>
              <PanelLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold">Inbox</h2>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-9 rounded-lg bg-muted">
            <TabsList className="p-0.5">
              <TabsTrigger value="all-mail" className="text-sm font-medium">All mail</TabsTrigger>
              <TabsTrigger value="unread" className="text-sm font-medium">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="px-4 py-4">
          <Input placeholder="Search" className="h-9" />
        </div>
        
        <div className="px-4 pb-4 space-y-2 flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div key={message.id} className={`p-3 rounded-lg border border-border space-y-2 ${message.isUnread ? 'bg-muted' : ''}`}>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{message.sender}</span>
                    {message.isUnread && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div>
                  <span className={`text-xs ${message.isUnread ? 'text-foreground' : 'text-muted-foreground'}`}>{message.time}</span>
                </div>
                <p className="text-xs font-medium">{message.subject}</p>
              </div>
              <p className="text-xs text-muted-foreground">{message.content}</p>
              <div className="flex items-center space-x-2">
                {message.badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    variant={badge === "personal" ? "outline" : index % 2 === 0 ? "secondary" : "default"} 
                    className="text-xs font-semibold"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col h-screen">
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArchiveX className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="icon">
              <Clock4 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Reply className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ReplyAll className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Forward className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" />
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-start px-4 py-4 border-b">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 rounded-full bg-muted">
              <AvatarImage src="https://github.com/shadcn.png" alt="Chompy" />
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">Chompy</h3>
              <p className="text-xs">Meeting Tomorrow</p>
              <p className="text-xs font-medium">Reply-To: chompy@example.com</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Oct 22, 2023, 9:00:00 AM</span>
        </div>
        
        <div className="px-4 py-4 border-b">
          <p className="text-sm text-foreground">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.  I have a few minor suggestions that I'll include in the attached document.  Let's discuss these during our next meeting. Keep up the excellent work!  Best regards, Alice</p>
        </div>
        
        <div className="px-4 py-4 space-y-4 mt-auto pb-2">
          <Textarea placeholder="Reply to Chompy..." className="min-h-[126px]" />
          <div className="flex justify-between items-center">
            <div className="flex items-start space-x-3">
              <Switch id="mute-thread" checked={isMuted} onCheckedChange={setIsMuted} />
              <label htmlFor="mute-thread" className={`text-sm font-medium ${isMuted ? 'text-foreground' : 'text-muted-foreground'}`}>Mute this thread</label>
            </div>
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppSidebar() {
  return (
    <div className="h-full flex flex-col border-r border-border w-full">
      <div className="flex items-center px-2 border-b border-border h-[52px]">
        <div className="flex items-center gap-2 p-2 rounded-md w-full">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 rounded-lg bg-background">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
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
              <Trash2Icon className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">Trash</span>
          </button>
        </div>

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

const meta: Meta<typeof MailBlock> = {
  title: "Pages/Inbox",
  component: MailBlock,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MailBlock>;

export const Default: Story = {
  render: () => {
    const [showSidebar, setShowSidebar] = useState(false);
    
    return (
      <div className="flex bg-background">
        <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
          <AppSidebar />
        </div>
        <MailBlock showSidebar={showSidebar} onToggleSidebar={() => setShowSidebar(!showSidebar)} />
      </div>
    );
  },
};

export const Expanded: Story = {
  render: () => {
    const [showSidebar, setShowSidebar] = useState(true);
    
    return (
      <div className="flex bg-background">
        <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
          <AppSidebar />
        </div>
        <MailBlock showSidebar={showSidebar} onToggleSidebar={() => setShowSidebar(!showSidebar)} />
      </div>
    );
  },
};