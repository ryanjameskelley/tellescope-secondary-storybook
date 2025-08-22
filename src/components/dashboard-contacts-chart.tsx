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

export const description = "An interactive area chart for contacts"

const chartData = [
  { date: "2024-04-01", added: 222, removed: 150 },
  { date: "2024-04-02", added: 97, removed: 180 },
  { date: "2024-04-03", added: 167, removed: 120 },
  { date: "2024-04-04", added: 242, removed: 260 },
  { date: "2024-04-05", added: 373, removed: 290 },
  { date: "2024-04-06", added: 301, removed: 340 },
  { date: "2024-04-07", added: 245, removed: 180 },
  { date: "2024-04-08", added: 409, removed: 320 },
  { date: "2024-04-09", added: 59, removed: 110 },
  { date: "2024-04-10", added: 261, removed: 190 },
  { date: "2024-04-11", added: 327, removed: 350 },
  { date: "2024-04-12", added: 292, removed: 210 },
  { date: "2024-04-13", added: 342, removed: 380 },
  { date: "2024-04-14", added: 137, removed: 220 },
  { date: "2024-04-15", added: 120, removed: 170 },
  { date: "2024-04-16", added: 138, removed: 190 },
  { date: "2024-04-17", added: 446, removed: 360 },
  { date: "2024-04-18", added: 364, removed: 410 },
  { date: "2024-04-19", added: 243, removed: 180 },
  { date: "2024-04-20", added: 89, removed: 150 },
  { date: "2024-04-21", added: 137, removed: 200 },
  { date: "2024-04-22", added: 224, removed: 170 },
  { date: "2024-04-23", added: 138, removed: 230 },
  { date: "2024-04-24", added: 387, removed: 290 },
  { date: "2024-04-25", added: 215, removed: 250 },
  { date: "2024-04-26", added: 75, removed: 130 },
  { date: "2024-04-27", added: 383, removed: 420 },
  { date: "2024-04-28", added: 122, removed: 180 },
  { date: "2024-04-29", added: 315, removed: 240 },
  { date: "2024-04-30", added: 454, removed: 380 },
  { date: "2024-05-01", added: 165, removed: 220 },
  { date: "2024-05-02", added: 293, removed: 310 },
  { date: "2024-05-03", added: 247, removed: 190 },
  { date: "2024-05-04", added: 385, removed: 420 },
  { date: "2024-05-05", added: 481, removed: 390 },
  { date: "2024-05-06", added: 498, removed: 520 },
  { date: "2024-05-07", added: 388, removed: 300 },
  { date: "2024-05-08", added: 149, removed: 210 },
  { date: "2024-05-09", added: 227, removed: 180 },
  { date: "2024-05-10", added: 293, removed: 330 },
  { date: "2024-05-11", added: 335, removed: 270 },
  { date: "2024-05-12", added: 197, removed: 240 },
  { date: "2024-05-13", added: 197, removed: 160 },
  { date: "2024-05-14", added: 448, removed: 490 },
  { date: "2024-05-15", added: 473, removed: 380 },
  { date: "2024-05-16", added: 338, removed: 400 },
  { date: "2024-05-17", added: 499, removed: 420 },
  { date: "2024-05-18", added: 315, removed: 350 },
  { date: "2024-05-19", added: 235, removed: 180 },
  { date: "2024-05-20", added: 177, removed: 230 },
  { date: "2024-05-21", added: 82, removed: 140 },
  { date: "2024-05-22", added: 81, removed: 120 },
  { date: "2024-05-23", added: 252, removed: 290 },
  { date: "2024-05-24", added: 294, removed: 220 },
  { date: "2024-05-25", added: 201, removed: 250 },
  { date: "2024-05-26", added: 213, removed: 170 },
  { date: "2024-05-27", added: 420, removed: 460 },
  { date: "2024-05-28", added: 233, removed: 190 },
  { date: "2024-05-29", added: 78, removed: 130 },
  { date: "2024-05-30", added: 340, removed: 280 },
  { date: "2024-05-31", added: 178, removed: 230 },
  { date: "2024-06-01", added: 178, removed: 200 },
  { date: "2024-06-02", added: 470, removed: 410 },
  { date: "2024-06-03", added: 103, removed: 160 },
  { date: "2024-06-04", added: 439, removed: 380 },
  { date: "2024-06-05", added: 88, removed: 140 },
  { date: "2024-06-06", added: 294, removed: 250 },
  { date: "2024-06-07", added: 323, removed: 370 },
  { date: "2024-06-08", added: 385, removed: 320 },
  { date: "2024-06-09", added: 438, removed: 480 },
  { date: "2024-06-10", added: 155, removed: 200 },
  { date: "2024-06-11", added: 92, removed: 150 },
  { date: "2024-06-12", added: 492, removed: 420 },
  { date: "2024-06-13", added: 81, removed: 130 },
  { date: "2024-06-14", added: 426, removed: 380 },
  { date: "2024-06-15", added: 307, removed: 350 },
  { date: "2024-06-16", added: 371, removed: 310 },
  { date: "2024-06-17", added: 475, removed: 520 },
  { date: "2024-06-18", added: 107, removed: 170 },
  { date: "2024-06-19", added: 341, removed: 290 },
  { date: "2024-06-20", added: 408, removed: 450 },
  { date: "2024-06-21", added: 169, removed: 210 },
  { date: "2024-06-22", added: 317, removed: 270 },
  { date: "2024-06-23", added: 480, removed: 530 },
  { date: "2024-06-24", added: 132, removed: 180 },
  { date: "2024-06-25", added: 141, removed: 190 },
  { date: "2024-06-26", added: 434, removed: 380 },
  { date: "2024-06-27", added: 448, removed: 490 },
  { date: "2024-06-28", added: 149, removed: 200 },
  { date: "2024-06-29", added: 103, removed: 160 },
  { date: "2024-06-30", added: 446, removed: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  added: {
    label: "Added",
    color: "#655560",
  },
  removed: {
    label: "Removed",
    color: "#1564BF",
  },
} satisfies ChartConfig

export function DashboardContactsChart() {
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
          <CardTitle>Patient activity</CardTitle>
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
              <linearGradient id="fillAdded" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-added)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-added)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRemoved" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-removed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-removed)"
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
              dataKey="removed"
              type="natural"
              fill="url(#fillRemoved)"
              stroke="var(--color-removed)"
              stackId="a"
            />
            <Area
              dataKey="added"
              type="natural"
              fill="url(#fillAdded)"
              stroke="var(--color-added)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </>
  )
}