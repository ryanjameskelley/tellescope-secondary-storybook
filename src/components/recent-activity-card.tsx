"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ActivityDemo from "./activity-demo"

export default function RecentActivityCard() {
  return (
    <Card className="rounded-xl p-6">
      <CardHeader className="p-0 pb-6">
        <div className="h-10 flex flex-col justify-between">
          <h3 className="text-card-foreground text-base font-semibold leading-6">Recent Activity</h3>
          <p className="text-muted-foreground text-sm leading-5">What your team is up to</p>
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-8">
        <ActivityDemo 
          name="Tea"
          action="Completed a ticket"
          target="Ticket"
        />
        
        <ActivityDemo 
          name="John Dukes"
          action="Replied to a thread"
          target="Thread subject"
        />
        
        <ActivityDemo 
          name="Judith Rodriguez"
          action="Edited a contact"
          target="Contact name"
        />
        
        <ActivityDemo 
          name="Rodger Struck"
          action="Opened a thread"
          target="Thread subject"
        />
        
        <ActivityDemo 
          name="Alex Buckmaster"
          action="Opened a ticket"
          target="Ticket"
        />
      </CardContent>
    </Card>
  )
}