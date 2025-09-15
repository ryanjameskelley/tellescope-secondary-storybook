import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Check, UserPlus } from "lucide-react";

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

const meta: Meta<typeof AssigneeAvatarGroup> = {
  title: "Components/AssigneeAvatarGroup",
  component: AssigneeAvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof AssigneeAvatarGroup>;

const availableAdmins: AssigneeAdmin[] = [
  { id: "admin1", name: "John Admin", email: "john@company.com", avatar: "https://github.com/shadcn.png" },
  { id: "admin2", name: "Sarah Manager", email: "sarah@company.com", avatar: "https://github.com/vercel.png" },
  { id: "admin3", name: "Mike Support", email: "mike@company.com", avatar: "https://github.com/microsoft.png" },
  { id: "admin4", name: "Lisa Director", email: "lisa@company.com", avatar: "https://github.com/facebook.png" },
  { id: "admin5", name: "Tom Senior", email: "tom@company.com" },
  { id: "admin6", name: "Emma Lead", email: "emma@company.com" }
]

export const Default: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>(["admin2", "admin3"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin2")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Default Assignee Avatar Group</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground">
          Primary: {availableAdmins.find(a => a.id === primaryAdmin)?.name || 'None'}
          <br />
          Assignees: {assignees.length}
        </div>
      </div>
    )
  }
};

export const Empty: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>([])
    const [primaryAdmin, setPrimaryAdmin] = useState<string | undefined>(undefined)

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin)
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Empty Assignee Group (shows + button)</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground">
          Click + to assign admins
        </div>
      </div>
    )
  }
};

export const ManyAssignees: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>(["admin1", "admin2", "admin3", "admin4", "admin5"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin1")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Many Assignees (shows overflow counter)</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground">
          Shows first 2 avatars + counter for remaining assignees
          <br />
          Primary admin shown with "P" badge
        </div>
      </div>
    )
  }
};

export const SingleAssignee: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>(["admin4"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin4")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Single Assignee</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground">
          Single assignee who is also the primary admin
        </div>
      </div>
    )
  }
};

export const NoPrimaryAdmin: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>(["admin5", "admin6"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string | undefined>(undefined)

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin)
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Assignees without Primary Admin</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground">
          Multiple assignees but no primary admin designated
          <br />
          Click P button to set primary admin
        </div>
      </div>
    )
  }
};

export const Interactive: Story = {
  render: () => {
    const [assignees, setAssignees] = useState<string[]>(["admin2"])
    const [primaryAdmin, setPrimaryAdmin] = useState<string>("admin2")

    const handleAssigneeChange = (newAssignees: string[], newPrimaryAdmin?: string) => {
      setAssignees(newAssignees)
      setPrimaryAdmin(newPrimaryAdmin || "")
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Interactive Assignee Management</div>
        <AssigneeAvatarGroup
          availableAdmins={availableAdmins}
          assignees={assignees}
          primaryAdmin={primaryAdmin}
          onAssigneeChange={handleAssigneeChange}
        />
        <div className="text-xs text-muted-foreground space-y-1">
          <div><strong>Features:</strong></div>
          <div>• Click avatars to open management panel</div>
          <div>• Click admin names to assign/unassign</div>
          <div>• Click P button to set/unset primary admin</div>
          <div>• Search functionality for large admin lists</div>
          <div>• Visual primary admin indicator with P badge</div>
          <div><strong>Current State:</strong></div>
          <div>Primary: {availableAdmins.find(a => a.id === primaryAdmin)?.name || 'None'}</div>
          <div>Assignees: {assignees.map(id => availableAdmins.find(a => a.id === id)?.name).join(', ') || 'None'}</div>
        </div>
      </div>
    )
  }
};