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
import { ChartAreaInteractive } from "./chart-area-interactive"
import { DashboardTicketChart } from "./dashboard-ticket-chart"
import { DashboardContactsChart } from "./dashboard-contacts-chart"

export function DashboardChart() {
  return (
    <Card className="pt-0">
      <CardHeader className="space-y-0 pb-0">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="mt-6 mb-1">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-0">
            <ChartAreaInteractive />
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-0">
            <DashboardTicketChart />
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-0">
            <DashboardContactsChart />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}