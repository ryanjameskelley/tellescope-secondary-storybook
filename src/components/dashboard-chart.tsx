"use client"

import { DashboardChartContainer } from "./dashboard-chart-container"
import { ChartAreaInteractive } from "./chart-area-interactive"
import { DashboardTicketChart } from "./dashboard-ticket-chart"
import { DashboardContactsChart } from "./dashboard-contacts-chart"

export function DashboardChart() {
  return (
    <DashboardChartContainer
      defaultValue="messages"
      messagesContent={<ChartAreaInteractive />}
      ticketsContent={<DashboardTicketChart />}
      contactsContent={<DashboardContactsChart />}
    />
  )
}