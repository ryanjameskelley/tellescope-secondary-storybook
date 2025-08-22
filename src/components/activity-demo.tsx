"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface ActivityProps {
  name?: string
  avatarSrc?: string
  action?: string
  target?: string
}

export default function ActivityDemo({
  name = "Tea",
  avatarSrc = "https://github.com/shadcn.png",
  action = "Completed a ticket",
  target = "Ticket"
}: ActivityProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 rounded-full bg-muted">
        <AvatarImage src={avatarSrc} alt={name} />
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-medium leading-5 text-foreground">{name}</p>
        <div className="flex items-start gap-2">
          <span className="text-sm text-muted-foreground">{action}</span>
          <span className="text-sm text-muted-foreground">/</span>
          <a href="#" className="text-sm font-medium text-muted-foreground underline hover:text-foreground">
            {target}
          </a>
        </div>
      </div>
    </div>
  )
}