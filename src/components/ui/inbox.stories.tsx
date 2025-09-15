import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Archive, 
  ArchiveX, 
  Trash2, 
  Clock4, 
  Reply, 
  ReplyAll, 
  Forward, 
  EllipsisVertical, 
  Filter, 
  SquarePen, 
  MessageSquare, 
  Mail, 
  Phone,
  PanelLeft,
  Check,
  Tag,
  X,
  Plus,
  UserPlus
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type ComposeView = 'none' | 'chat' | 'email' | 'sms'

// Mock components for compose views (these would be imported from actual components)
function MockChatCompose({ onClose, onSend }: { onClose: () => void; onSend: (data: any) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">New Chat</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm text-muted-foreground">Chat compose interface would go here</p>
        <Button onClick={() => onSend({ type: 'chat', content: 'Test message' })} className="mt-4">
          Send Chat
        </Button>
      </div>
    </div>
  )
}

function MockEmailCompose({ onClose, onSend }: { onClose: () => void; onSend: (data: any) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">New Email</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm text-muted-foreground">Email compose interface would go here</p>
        <Button onClick={() => onSend({ type: 'email', content: 'Test email' })} className="mt-4">
          Send Email
        </Button>
      </div>
    </div>
  )
}

function MockSmsCompose({ onClose, onSend }: { onClose: () => void; onSend: (data: any) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">New SMS</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
      </div>
      <div className="flex-1 p-4">
        <p className="text-sm text-muted-foreground">SMS compose interface would go here</p>
        <Button onClick={() => onSend({ type: 'sms', content: 'Test SMS' })} className="mt-4">
          Send SMS
        </Button>
      </div>
    </div>
  )
}

// Mock InboxHeader component
function InboxHeader({ onToggleSidebar, rightContent }: { onToggleSidebar?: () => void; rightContent?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b h-[52px]">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-md" onClick={onToggleSidebar}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Inbox</h2>
      </div>
      {rightContent}
    </div>
  )
}

// Mock InboxSearchBar component
function InboxSearchBar({ placeholder, rightContent }: { placeholder: string; rightContent?: React.ReactNode }) {
  return (
    <div className="px-4 py-4 flex items-center gap-2">
      <Input placeholder={placeholder} className="h-9 flex-1" />
      {rightContent}
    </div>
  )
}

// Mock InboxFilterDialog component
function InboxFilterDialog() {
  return (
    <Button variant="ghost" size="icon" className="h-9 w-9">
      <Filter className="h-4 w-4" />
    </Button>
  )
}

// Mock MessageTagSelector component with full functionality
interface TagData {
  id: string
  name: string
  color: string
}

interface MessageTagSelectorProps {
  availableTags: TagData[]
  selectedTags: string[]
  onTagsChange: (selectedTags: string[]) => void
  onCreateTag: (tag: Omit<TagData, 'id'>) => void
  onDeleteTag: (tagId: string) => void
}

function MessageTagSelector({ 
  availableTags, 
  selectedTags, 
  onTagsChange, 
  onCreateTag, 
  onDeleteTag 
}: MessageTagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#3b82f6")
  const [isCreating, setIsCreating] = useState(false)

  // Get selected tag data
  const selectedTagData = availableTags.filter(tag => selectedTags.includes(tag.id))
  const visibleTags = selectedTagData.slice(0, 2)
  const remainingCount = Math.max(0, selectedTagData.length - 2)

  const handleTagToggle = (tagId: string) => {
    const isCurrentlySelected = selectedTags.includes(tagId)
    if (isCurrentlySelected) {
      onTagsChange(selectedTags.filter(id => id !== tagId))
    } else {
      onTagsChange([...selectedTags, tagId])
    }
  }

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag({
        name: newTagName.trim(),
        color: newTagColor
      })
      setNewTagName("")
      setNewTagColor("#3b82f6")
      setIsCreating(false)
    }
  }

  const getAccessibleTagColors = (color: string) => {
    return {
      backgroundColor: color,
      textColor: '#ffffff',
      borderColor: color
    }
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-1 cursor-pointer min-h-[32px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTagData.length === 0 ? (
          <div className="w-6 h-6 hover:bg-muted transition-colors rounded-md flex items-center justify-center">
            <Tag className="w-3 h-3 text-muted-foreground" />
          </div>
        ) : (
          <>
            {visibleTags.map((tag) => {
              const { backgroundColor, textColor, borderColor } = getAccessibleTagColors(tag.color);
              return (
                <Badge 
                  key={tag.id}
                  variant="secondary" 
                  className="text-xs border"
                  style={{ 
                    backgroundColor,
                    borderColor,
                    color: textColor
                  }}
                >
                  {tag.name}
                </Badge>
              );
            })}
            {remainingCount > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingCount}
              </Badge>
            )}
          </>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-popover border rounded-md shadow-md z-50">
          <div className="p-3 border-b">
            <div className="flex gap-2">
              <Input
                placeholder="Search tags..."
                className="h-8"
              />
              <Button 
                size="sm" 
                onClick={() => setIsCreating(true)}
                className="h-8 px-3"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {isCreating && (
            <div className="p-3 border-b space-y-3">
              <Input
                placeholder="Tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="h-8"
                autoFocus
              />
              <div className="flex justify-between items-start">
                <div className="flex-shrink-0">
                  <HexColorPicker color={newTagColor} onChange={setNewTagColor} />
                </div>
                <div className="flex flex-col gap-2 ml-6">
                  <Button size="sm" onClick={handleCreateTag} disabled={!newTagName.trim()}>
                    Create
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setIsCreating(false)
                    setNewTagName("")
                    setNewTagColor("#3b82f6")
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-h-64 overflow-y-auto">
            {availableTags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: tag.color }}
                />
                <div 
                  className="flex-1 min-w-0 cursor-pointer" 
                  onClick={() => handleTagToggle(tag.id)}
                >
                  <p className="text-sm font-medium truncate">{tag.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedTags.includes(tag.id) && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteTag(tag.id)
                    }}
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Mock AssigneeAvatarGroup component with full functionality
interface AssigneeAdmin {
  id: string
  name: string
  email?: string
  avatar?: string
}

interface AssigneeAvatarGroupProps {
  availableAdmins: AssigneeAdmin[]
  assignees: string[]
  primaryAdmin?: string
  onAssigneeChange: (assignees: string[], primaryAdmin?: string) => void
}

function AssigneeAvatarGroup({ 
  availableAdmins, 
  assignees, 
  primaryAdmin, 
  onAssigneeChange 
}: AssigneeAvatarGroupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get assigned admins, with primary admin first
  const assignedAdmins = availableAdmins.filter(admin => assignees.includes(admin.id))
  const sortedAssignedAdmins = assignedAdmins.sort((a, b) => {
    if (primaryAdmin === a.id) return -1
    if (primaryAdmin === b.id) return 1
    return 0
  })
  
  const visibleAvatars = sortedAssignedAdmins.slice(0, 2)
  const remainingCount = Math.max(0, sortedAssignedAdmins.length - 2)

  const handlePrimaryAdminChange = (adminId: string, isPrimary: boolean) => {
    if (isPrimary) {
      const newAssignees = assignees.includes(adminId) ? assignees : [...assignees, adminId]
      onAssigneeChange(newAssignees, adminId)
    } else if (primaryAdmin === adminId) {
      onAssigneeChange(assignees, undefined)
    }
  }

  const handleAssigneeToggle = (adminId: string) => {
    const isCurrentlyAssigned = assignees.includes(adminId)
    if (isCurrentlyAssigned) {
      const newAssignees = assignees.filter(id => id !== adminId)
      const newPrimaryAdmin = primaryAdmin === adminId ? undefined : primaryAdmin
      onAssigneeChange(newAssignees, newPrimaryAdmin)
    } else {
      const newAssignees = [...assignees, adminId]
      onAssigneeChange(newAssignees, primaryAdmin)
    }
  }

  if (assignedAdmins.length === 0) {
    return (
      <div className="relative">
        <div 
          className="w-8 h-8 hover:bg-muted transition-colors rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserPlus className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-80 bg-popover border rounded-md shadow-md z-50">
            <div className="p-3 border-b">
              <Input
                placeholder="Search admins..."
                className="h-8"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {availableAdmins.map((admin) => (
                <div key={admin.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                  <button
                    onClick={() => handlePrimaryAdminChange(admin.id, primaryAdmin !== admin.id)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                      primaryAdmin === admin.id 
                        ? "bg-black border-black text-white" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {primaryAdmin === admin.id && "P"}
                  </button>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={admin.avatar} alt={admin.name} />
                    <div className="w-full h-full bg-muted flex items-center justify-center text-xs">
                      {getInitials(admin.name)}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleAssigneeToggle(admin.id)}>
                    <p className="text-sm font-medium truncate">{admin.name}</p>
                    {admin.email && (
                      <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
                    )}
                  </div>
                  {assignees.includes(admin.id) && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center -space-x-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {visibleAvatars.map((admin, index) => (
          <div key={admin.id} className="relative" style={{ zIndex: visibleAvatars.length - index }}>
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <div className="w-full h-full bg-muted flex items-center justify-center text-sm">
                {getInitials(admin.name)}
              </div>
            </Avatar>
            {primaryAdmin === admin.id && (
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-black border-2 border-white rounded-full flex items-center justify-center z-10">
                <span className="text-white text-[10px] font-bold leading-none">P</span>
              </div>
            )}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="relative w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center" style={{ zIndex: 1 }}>
            <span className="text-sm text-muted-foreground">+{remainingCount}</span>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-popover border rounded-md shadow-md z-50">
          <div className="p-3 border-b">
            <Input
              placeholder="Search admins..."
              className="h-8"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {availableAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                <button
                  onClick={() => handlePrimaryAdminChange(admin.id, primaryAdmin !== admin.id)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                    primaryAdmin === admin.id 
                      ? "bg-black border-black text-white" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {primaryAdmin === admin.id && "P"}
                </button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={admin.avatar} alt={admin.name} />
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs">
                    {getInitials(admin.name)}
                  </div>
                </Avatar>
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleAssigneeToggle(admin.id)}>
                  <p className="text-sm font-medium truncate">{admin.name}</p>
                  {admin.email && (
                    <p className="text-xs text-muted-foreground truncate">{admin.email}</p>
                  )}
                </div>
                {assignees.includes(admin.id) && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MailBlock({ 
  showSidebar = false, 
  onToggleSidebar, 
  initialComposeView = 'none',
  assignees = ["admin2", "admin3"],
  primaryAdmin = "admin2",
  onAssigneeChange = () => {}
}: { 
  showSidebar?: boolean; 
  onToggleSidebar?: () => void; 
  initialComposeView?: ComposeView;
  assignees?: string[];
  primaryAdmin?: string;
  onAssigneeChange?: (assignees: string[], primaryAdmin?: string) => void;
} = {}) {
  const [isMuted, setIsMuted] = useState(false)
  const [composeView, setComposeView] = useState<ComposeView>(initialComposeView)
  const [availableTags, setAvailableTags] = useState<TagData[]>([
    { id: "tag1", name: "urgent", color: "#ef4444" },
    { id: "tag2", name: "follow-up", color: "#f97316" },
    { id: "tag3", name: "review", color: "#eab308" },
    { id: "tag4", name: "client", color: "#22c55e" },
    { id: "tag5", name: "meeting", color: "#3b82f6" },
    { id: "tag6", name: "important", color: "#8b5cf6" },
  ])
  const [messageTags, setMessageTags] = useState<Record<number, string[]>>({
    1: ["tag1", "tag3"], // Chompy's message has urgent and review tags
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }
  
  useEffect(() => {
    // Scroll to bottom after component mounts
    setTimeout(() => {
      scrollToBottom()
    }, 0)
  }, [])

  const handleTagsChange = (messageId: number, newTags: string[]) => {
    setMessageTags(prev => ({
      ...prev,
      [messageId]: newTags
    }))
  }

  const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
    const newTag = {
      ...tagData,
      id: `tag${Date.now()}`
    }
    setAvailableTags([...availableTags, newTag])
  }

  const handleDeleteTag = (tagId: string) => {
    setAvailableTags(availableTags.filter(tag => tag.id !== tagId))
    // Remove the deleted tag from all messages
    setMessageTags(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(messageId => {
        updated[Number(messageId)] = updated[Number(messageId)].filter(id => id !== tagId)
      })
      return updated
    })
  }

  const availableAdmins: AssigneeAdmin[] = [
    { id: "admin1", name: "John Admin", email: "john@company.com", avatar: "https://github.com/shadcn.png" },
    { id: "admin2", name: "Sarah Manager", email: "sarah@company.com", avatar: "https://github.com/vercel.png" },
    { id: "admin3", name: "Mike Support", email: "mike@company.com", avatar: "https://github.com/microsoft.png" },
    { id: "admin4", name: "Lisa Director", email: "lisa@company.com", avatar: "https://github.com/facebook.png" },
    { id: "admin5", name: "Tom Senior", email: "tom@company.com" },
    { id: "admin6", name: "Emma Lead", email: "emma@company.com" }
  ]

  const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
    onAssigneeChange(newAssignees, newPrimaryAdmin)
  }

  const messages = [
    { id: 1, sender: "Chompy", subject: "Meeting Tomorrow", isUnread: true, content: "Hi, let's have a meeting tomorrow to discuss the project...", badges: ["urgent", "review"], time: "about 5 months ago" },
    { id: 2, sender: "Alice Smith", subject: "Re: Project Update", isUnread: false, content: "Thank you for the project update. It looks great!...", badges: ["work", "important"], time: "about 1 year ago" },
    { id: 3, sender: "Bob Johnson", subject: "Weekend Plans", isUnread: false, content: "Any plans for the weekend? I was thinking of going hiking...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" },
    { id: 4, sender: "Emily Davis", subject: "Re: Question about Budget", isUnread: true, content: "I have a question about the budget for the upcoming project...", badges: ["personal"], time: "almost 2 years ago" },
    { id: 5, sender: "Michael Wilson", subject: "Important Announcement", isUnread: true, content: "I have an important announcement to make during our team meeting...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" },
    { id: 6, sender: "Sarah Brown", subject: "Re: Feedback on Proposal", isUnread: false, content: "Thank you for your feedback on the proposal. It looks great!...", badges: ["meeting", "work", "important"], time: "almost 2 years ago" }
  ]
  
  const filteredMessages = messages
  
  return (
    <div className="flex bg-background">
      <div className="flex flex-col border-r h-screen" style={{ width: '350px', minWidth: '350px', maxWidth: '350px', flexShrink: 0 }}>
        <InboxHeader 
          onToggleSidebar={onToggleSidebar}
          rightContent={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <SquarePen className="h-4 w-4" />
                </Button>
                <div className="absolute top-full right-0 mt-1 hidden">
                  <div className="bg-popover border rounded-md shadow-md p-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setComposeView('chat')}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setComposeView('email')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setComposeView('sms')}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      SMS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        
        <InboxSearchBar 
          placeholder="Search"
          rightContent={<InboxFilterDialog />}
        />
        
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
                {message.badges.slice(0, 2).map((badge, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="text-xs border"
                  >
                    {badge}
                  </Badge>
                ))}
                {message.badges.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{message.badges.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col h-screen flex-1">
        {composeView === 'chat' && (
          <MockChatCompose
            onClose={() => setComposeView('none')}
            onSend={(data) => {
              console.log('Send chat:', data)
              setComposeView('none')
            }}
          />
        )}
        
        {composeView === 'email' && (
          <MockEmailCompose
            onClose={() => setComposeView('none')}
            onSend={(data) => {
              console.log('Send email:', data)
              setComposeView('none')
            }}
          />
        )}
        
        {composeView === 'sms' && (
          <MockSmsCompose
            onClose={() => setComposeView('none')}
            onSend={(data) => {
              console.log('Send SMS:', data)
              setComposeView('none')
            }}
          />
        )}
        
        {composeView === 'none' && (
          <>
            <div className="flex justify-between items-center px-4 border-b h-[52px] flex-shrink-0">
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
            
            <div className="flex justify-between items-start px-4 py-4 border-b flex-shrink-0 min-h-[120px]">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10 rounded-full bg-muted">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Chompy" />
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">Chompy</h3>
                  <p className="text-xs">Meeting Tomorrow</p>
                  <p className="text-xs font-medium">Reply-To: chompy@example.com</p>
                  <div className="mt-2 h-8 flex items-center">
                    <MessageTagSelector
                      availableTags={availableTags}
                      selectedTags={messageTags[1] || []} 
                      onTagsChange={(newTags) => handleTagsChange(1, newTags)}
                      onCreateTag={handleCreateTag}
                      onDeleteTag={handleDeleteTag}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="text-xs text-muted-foreground">Today, 9:00 AM</span>
                <AssigneeAvatarGroup
                  availableAdmins={availableAdmins}
                  assignees={assignees}
                  primaryAdmin={primaryAdmin}
                  onAssigneeChange={handleAssigneeChange}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Initial message from Chompy */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 rounded-full bg-muted flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Chompy" />
                </Avatar>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold">Chompy</span>
                    <span className="text-xs text-muted-foreground">Yesterday at 9:00 AM</span>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">Hi, let's have a meeting tomorrow to discuss the project. I've reviewed the initial requirements and have some questions about the timeline.</p>
                  </div>
                </div>
              </div>

              {/* Reply from current user */}
              <div className="flex gap-3 justify-end">
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-xs text-muted-foreground">Yesterday at 10:30 AM</span>
                    <span className="text-xs font-semibold">You</span>
                  </div>
                  <div className="rounded-lg bg-primary text-primary-foreground p-3">
                    <p className="text-sm">Sounds good! I'm available after 2 PM. Should we include the design team as well?</p>
                  </div>
                </div>
              </div>

              {/* Follow up from Chompy */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 rounded-full bg-muted flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Chompy" />
                </Avatar>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold">Chompy</span>
                    <span className="text-xs text-muted-foreground">Yesterday at 11:15 AM</span>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">Yes, definitely include the design team. I'll send out the calendar invite for 3 PM. We should cover:</p>
                    <ul className="text-sm mt-2 ml-4 space-y-1">
                      <li>• Project timeline and milestones</li>
                      <li>• Resource allocation</li>
                      <li>• Design system requirements</li>
                      <li>• Testing strategy</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Another reply from current user */}
              <div className="flex gap-3 justify-end">
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-xs text-muted-foreground">Yesterday at 2:45 PM</span>
                    <span className="text-xs font-semibold">You</span>
                  </div>
                  <div className="rounded-lg bg-primary text-primary-foreground p-3">
                    <p className="text-sm">Perfect! I've prepared a draft timeline that we can review. Also added some notes about potential risks we should discuss.</p>
                  </div>
                </div>
              </div>

              {/* Most recent message from Chompy */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 rounded-full bg-muted flex-shrink-0">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Chompy" />
                </Avatar>
                <div className="flex flex-col gap-1 max-w-[70%]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold">Chompy</span>
                    <span className="text-xs text-muted-foreground">Today at 9:00 AM</span>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.</p>
                    <p className="text-sm mt-2">I have a few minor suggestions that I'll include in the attached document. Let's discuss these during our next meeting. Keep up the excellent work!</p>
                    <p className="text-sm mt-2">Best regards,<br/>Chompy</p>
                  </div>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
            
            <div className="px-4 py-4 space-y-4 border-t flex-shrink-0">
              <Textarea placeholder="Reply to Chompy..." className="min-h-[100px]" />
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Switch id="mute-thread" checked={isMuted} onCheckedChange={setIsMuted} />
                  <label htmlFor="mute-thread" className={`text-sm ${isMuted ? 'text-foreground' : 'text-muted-foreground'}`}>Mute this thread</label>
                </div>
                <Button>Send</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof MailBlock> = {
  title: "Pages/Inbox",
  component: MailBlock,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        height: '100vh'
      }
    }
  },
  argTypes: {
    initialComposeView: {
      control: {
        type: 'select',
        options: ['none', 'chat', 'email', 'sms']
      },
      description: 'Initial compose view to display',
      defaultValue: 'none'
    }
  },
  args: {
    initialComposeView: 'none'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof MailBlock>;

export const Default: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin2", "admin3"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin2")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView={args.initialComposeView}
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  },
  args: {
    initialComposeView: 'none'
  }
};

export const ChatCompose: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin1"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin1")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="chat"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

export const EmailCompose: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin4", "admin5"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin4")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="email"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

export const SmsCompose: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin3", "admin6"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin3")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="sms"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

// New stories showcasing tagging and assignee functionality
export const ManyAssignees: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin1", "admin2", "admin3", "admin4", "admin5"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin1")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="none"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

export const SingleAssignee: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin6"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin6")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="none"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

export const NoAssignees: Story = {
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>([])
    const [primaryAdmin, setPrimaryAdmin] = useState<string | undefined>(undefined)

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin)
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="none"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};

export const TagManagement: Story = {
  name: "Tag Management Demo",
  render: (args) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [assignees, setAssignees] = useState<string[]>(["admin2"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin2")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }
    
    return (
      <SidebarProvider>
        <div className="flex bg-background">
          <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[255px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
            <AppSidebar activePage="inbox" />
          </div>
          <MailBlock 
            showSidebar={showSidebar} 
            onToggleSidebar={() => setShowSidebar(!showSidebar)} 
            initialComposeView="none"
            assignees={assignees}
            primaryAdmin={primaryAdmin}
            onAssigneeChange={handleAssigneeChange}
          />
        </div>
      </SidebarProvider>
    );
  }
};