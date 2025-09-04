# Claude
This file is a placeholder for Claude-related documentation or notes. Add any relevant information about Claude usage, integration, or configuration here.

code:
"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function MessageCard() {
  return (
    <Card className="rounded-xl border">
      <CardHeader className="p-6 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-foreground rounded-full w-2 h-2"></div>
            <h3 className="text-card-foreground text-lg font-semibold leading-7">Message subject</h3>
          </div>
          <div className="flex -space-x-2">
            <Avatar className="w-5 h-5 border border-card bg-background rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <Avatar className="w-5 h-5 border border-card bg-background rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <Avatar className="w-5 h-5 border border-card bg-background rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <Avatar className="w-5 h-5 border border-card bg-background rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
            <Avatar className="w-5 h-5 border border-card bg-background rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            </Avatar>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-5">
          This is a truncated card description to display the message in a way that is glanceable
        </p>
      </CardHeader>
      <CardFooter className="p-6 border-t flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-foreground text-sm leading-5">Today</span>
        </div>
        <Separator orientation="vertical" className="h-5" />
        <span className="text-muted-foreground text-sm leading-5">10:00 PM</span>
      </CardFooter>
    </Card>
  )
}


cli:
npx shadcn add https://rdhlrr8yducbb6dq.public.blob.vercel-storage.com/figma-to-shadcn/MessageCard-pT7mnBqbB7B6vdgpHLSqV0sEEeFAEl.json