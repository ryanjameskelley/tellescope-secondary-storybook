"use client"

import * as React from "react"
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface DashboardChartContainerProps {
  children?: React.ReactNode
  defaultValue?: string
  messagesContent?: React.ReactNode
  ticketsContent?: React.ReactNode
  contactsContent?: React.ReactNode
}

export function DashboardChartContainer({ 
  defaultValue = "messages",
  messagesContent,
  ticketsContent,
  contactsContent
}: DashboardChartContainerProps) {
  return (
    <Card className="pt-0">
      <CardHeader className="space-y-0 pb-0">
        <Tabs defaultValue={defaultValue} className="w-full">
          <TabsList className="mt-6 mb-1">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-0">
            {messagesContent}
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-0">
            {ticketsContent}
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-0">
            {contactsContent}
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}