"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const description = "An interactive area chart for tickets"

const chartData = [
  { date: "2024-04-01", opened: 222, completed: 150 },
  { date: "2024-04-02", opened: 97, completed: 180 },
  { date: "2024-04-03", opened: 167, completed: 120 },
  { date: "2024-04-04", opened: 242, completed: 260 },
  { date: "2024-04-05", opened: 373, completed: 290 },
  { date: "2024-04-06", opened: 301, completed: 340 },
  { date: "2024-04-07", opened: 245, completed: 180 },
  { date: "2024-04-08", opened: 409, completed: 320 },
  { date: "2024-04-09", opened: 59, completed: 110 },
  { date: "2024-04-10", opened: 261, completed: 190 },
  { date: "2024-04-11", opened: 327, completed: 350 },
  { date: "2024-04-12", opened: 292, completed: 210 },
  { date: "2024-04-13", opened: 342, completed: 380 },
  { date: "2024-04-14", opened: 137, completed: 220 },
  { date: "2024-04-15", opened: 120, completed: 170 },
  { date: "2024-04-16", opened: 138, completed: 190 },
  { date: "2024-04-17", opened: 446, completed: 360 },
  { date: "2024-04-18", opened: 364, completed: 410 },
  { date: "2024-04-19", opened: 243, completed: 180 },
  { date: "2024-04-20", opened: 89, completed: 150 },
  { date: "2024-04-21", opened: 137, completed: 200 },
  { date: "2024-04-22", opened: 224, completed: 170 },
  { date: "2024-04-23", opened: 138, completed: 230 },
  { date: "2024-04-24", opened: 387, completed: 290 },
  { date: "2024-04-25", opened: 215, completed: 250 },
  { date: "2024-04-26", opened: 75, completed: 130 },
  { date: "2024-04-27", opened: 383, completed: 420 },
  { date: "2024-04-28", opened: 122, completed: 180 },
  { date: "2024-04-29", opened: 315, completed: 240 },
  { date: "2024-04-30", opened: 454, completed: 380 },
  { date: "2024-05-01", opened: 165, completed: 220 },
  { date: "2024-05-02", opened: 293, completed: 310 },
  { date: "2024-05-03", opened: 247, completed: 190 },
  { date: "2024-05-04", opened: 385, completed: 420 },
  { date: "2024-05-05", opened: 481, completed: 390 },
  { date: "2024-05-06", opened: 498, completed: 520 },
  { date: "2024-05-07", opened: 388, completed: 300 },
  { date: "2024-05-08", opened: 149, completed: 210 },
  { date: "2024-05-09", opened: 227, completed: 180 },
  { date: "2024-05-10", opened: 293, completed: 330 },
  { date: "2024-05-11", opened: 335, completed: 270 },
  { date: "2024-05-12", opened: 197, completed: 240 },
  { date: "2024-05-13", opened: 197, completed: 160 },
  { date: "2024-05-14", opened: 448, completed: 490 },
  { date: "2024-05-15", opened: 473, completed: 380 },
  { date: "2024-05-16", opened: 338, completed: 400 },
  { date: "2024-05-17", opened: 499, completed: 420 },
  { date: "2024-05-18", opened: 315, completed: 350 },
  { date: "2024-05-19", opened: 235, completed: 180 },
  { date: "2024-05-20", opened: 177, completed: 230 },
  { date: "2024-05-21", opened: 82, completed: 140 },
  { date: "2024-05-22", opened: 81, completed: 120 },
  { date: "2024-05-23", opened: 252, completed: 290 },
  { date: "2024-05-24", opened: 294, completed: 220 },
  { date: "2024-05-25", opened: 201, completed: 250 },
  { date: "2024-05-26", opened: 213, completed: 170 },
  { date: "2024-05-27", opened: 420, completed: 460 },
  { date: "2024-05-28", opened: 233, completed: 190 },
  { date: "2024-05-29", opened: 78, completed: 130 },
  { date: "2024-05-30", opened: 340, completed: 280 },
  { date: "2024-05-31", opened: 178, completed: 230 },
  { date: "2024-06-01", opened: 178, completed: 200 },
  { date: "2024-06-02", opened: 470, completed: 410 },
  { date: "2024-06-03", opened: 103, completed: 160 },
  { date: "2024-06-04", opened: 439, completed: 380 },
  { date: "2024-06-05", opened: 88, completed: 140 },
  { date: "2024-06-06", opened: 294, completed: 250 },
  { date: "2024-06-07", opened: 323, completed: 370 },
  { date: "2024-06-08", opened: 385, completed: 320 },
  { date: "2024-06-09", opened: 438, completed: 480 },
  { date: "2024-06-10", opened: 155, completed: 200 },
  { date: "2024-06-11", opened: 92, completed: 150 },
  { date: "2024-06-12", opened: 492, completed: 420 },
  { date: "2024-06-13", opened: 81, completed: 130 },
  { date: "2024-06-14", opened: 426, completed: 380 },
  { date: "2024-06-15", opened: 307, completed: 350 },
  { date: "2024-06-16", opened: 371, completed: 310 },
  { date: "2024-06-17", opened: 475, completed: 520 },
  { date: "2024-06-18", opened: 107, completed: 170 },
  { date: "2024-06-19", opened: 341, completed: 290 },
  { date: "2024-06-20", opened: 408, completed: 450 },
  { date: "2024-06-21", opened: 169, completed: 210 },
  { date: "2024-06-22", opened: 317, completed: 270 },
  { date: "2024-06-23", opened: 480, completed: 530 },
  { date: "2024-06-24", opened: 132, completed: 180 },
  { date: "2024-06-25", opened: 141, completed: 190 },
  { date: "2024-06-26", opened: 434, completed: 380 },
  { date: "2024-06-27", opened: 448, completed: 490 },
  { date: "2024-06-28", opened: 149, completed: 200 },
  { date: "2024-06-29", opened: 103, completed: 160 },
  { date: "2024-06-30", opened: 446, completed: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  opened: {
    label: "Opened",
    color: "#655560",
  },
  completed: {
    label: "Completed",
    color: "#1564BF",
  },
} satisfies ChartConfig

export function DashboardTicketChart() {
  const [timeRange, setTimeRange] = React.useState("90d")
  
  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case "7d":
        return "7 days"
      case "30d":
        return "30 days"
      case "90d":
        return "3 months"
      default:
        return "3 months"
    }
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <>
      <div className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Ticketing activity</CardTitle>
          <CardDescription>
            during the last {getTimeRangeLabel(timeRange)}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOpened" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-opened)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-opened)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <Area
              dataKey="opened"
              type="natural"
              fill="url(#fillOpened)"
              stroke="var(--color-opened)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </>
  )
}