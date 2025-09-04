"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarClock, BadgeAlert } from "lucide-react"

export interface DashboardCardProps {
  status?: "default" | "secondary" | "destructive" | "outline"
  statusLabel?: string
  title?: string
  assignees?: Array<{
    src?: string
    alt?: string
  }> | null
  description?: string
  dueDate?: string
  priority?: string
  priorityIcon?: React.ComponentType<{ className?: string }>
  updatedTime?: string
  className?: string
}

export function DashboardCard({
  status = "default",
  statusLabel = "In progress",
  title = "Ticket title",
  assignees = [
    { src: "https://github.com/shadcn.png", alt: "User" },
    { src: "https://github.com/shadcn.png", alt: "User" },
    { src: "https://github.com/shadcn.png", alt: "User" },
    { src: "https://github.com/shadcn.png", alt: "User" },
    { src: "https://github.com/shadcn.png", alt: "User" },
  ],
  description = "This is a truncated card description to display the description of the ticket in a way that is glancable",
  dueDate = "Today",
  priority = "Low priority",
  priorityIcon: PriorityIcon = BadgeAlert,
  updatedTime = "Updated 4h ago",
  className = "",
}: DashboardCardProps) {
  return (
    <Card className={`rounded-xl border shadow-sm w-[450px] hover:shadow-md transition-shadow cursor-pointer ${className}`}>
      <CardHeader className="px-6 pt-0 pb-0 space-y-4">
        <div className="flex flex-col space-y-2">
{statusLabel ? (
            <div className="flex items-center justify-between">
              <Badge className="w-fit" variant={status}>
                {statusLabel}
              </Badge>
              {assignees ? (
                <div className="flex -space-x-2">
                  {assignees.map((assignee, index) => (
                    <Avatar key={index} className="h-5 w-5 border border-card bg-background">
                      <AvatarImage src={assignee.src} alt={assignee.alt} />
                    </Avatar>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Not assigned</span>
              )}
            </div>
          ) : null}
          
          <div className={`flex items-center ${statusLabel ? 'space-x-1.5' : 'justify-between'}`}>
            <div className="flex items-center flex-1 pr-4">
              {!statusLabel && <div className="bg-black rounded-full w-3 h-3 mr-2 flex-shrink-0"></div>}
              <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
            </div>
            {!statusLabel && assignees && (
              <div className="flex -space-x-2">
                {assignees.map((assignee, index) => (
                  <Avatar key={index} className="h-5 w-5 border border-card bg-background">
                    <AvatarImage src={assignee.src} alt={assignee.alt} />
                  </Avatar>
                ))}
              </div>
            )}
            {!statusLabel && !assignees && (
              <span className="text-sm text-muted-foreground">Not assigned</span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1">
            {description}
          </p>
        </div>
      </CardHeader>
      
      <CardFooter className="px-6 pt-6 pb-0 flex items-center space-x-3 border-t">
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-foreground">{dueDate}</span>
          </div>
        </div>
        
        <div className="h-5 w-px bg-border"></div>
        
        <span className="text-sm text-muted-foreground">10:00 PM</span>
      </CardFooter>
    </Card>
  )
}