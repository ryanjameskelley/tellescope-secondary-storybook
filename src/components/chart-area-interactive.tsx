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

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", email: 222, chat: 150, sms: 89 },
  { date: "2024-04-02", email: 97, chat: 180, sms: 75 },
  { date: "2024-04-03", email: 167, chat: 120, sms: 45 },
  { date: "2024-04-04", email: 242, chat: 260, sms: 120 },
  { date: "2024-04-05", email: 373, chat: 290, sms: 135 },
  { date: "2024-04-06", email: 301, chat: 340, sms: 180 },
  { date: "2024-04-07", email: 245, chat: 180, sms: 95 },
  { date: "2024-04-08", email: 409, chat: 320, sms: 165 },
  { date: "2024-04-09", email: 59, chat: 110, sms: 35 },
  { date: "2024-04-10", email: 261, chat: 190, sms: 85 },
  { date: "2024-04-11", email: 327, chat: 350, sms: 175 },
  { date: "2024-04-12", email: 292, chat: 210, sms: 110 },
  { date: "2024-04-13", email: 342, chat: 380, sms: 190 },
  { date: "2024-04-14", email: 137, chat: 220, sms: 65 },
  { date: "2024-04-15", email: 120, chat: 170, sms: 55 },
  { date: "2024-04-16", email: 138, chat: 190, sms: 70 },
  { date: "2024-04-17", email: 446, chat: 360, sms: 200 },
  { date: "2024-04-18", email: 364, chat: 410, sms: 185 },
  { date: "2024-04-19", email: 243, chat: 180, sms: 95 },
  { date: "2024-04-20", email: 89, chat: 150, sms: 45 },
  { date: "2024-04-21", email: 137, chat: 200, sms: 80 },
  { date: "2024-04-22", email: 224, chat: 170, sms: 90 },
  { date: "2024-04-23", email: 138, chat: 230, sms: 75 },
  { date: "2024-04-24", email: 387, chat: 290, sms: 155 },
  { date: "2024-04-25", email: 215, chat: 250, sms: 125 },
  { date: "2024-04-26", email: 75, chat: 130, sms: 40 },
  { date: "2024-04-27", email: 383, chat: 420, sms: 210 },
  { date: "2024-04-28", email: 122, chat: 180, sms: 60 },
  { date: "2024-04-29", email: 315, chat: 240, sms: 130 },
  { date: "2024-04-30", email: 454, chat: 380, sms: 195 },
  { date: "2024-05-01", email: 165, chat: 220, sms: 85 },
  { date: "2024-05-02", email: 293, chat: 310, sms: 145 },
  { date: "2024-05-03", email: 247, chat: 190, sms: 105 },
  { date: "2024-05-04", email: 385, chat: 420, sms: 180 },
  { date: "2024-05-05", email: 481, chat: 390, sms: 205 },
  { date: "2024-05-06", email: 498, chat: 520, sms: 260 },
  { date: "2024-05-07", email: 388, chat: 300, sms: 155 },
  { date: "2024-05-08", email: 149, chat: 210, sms: 75 },
  { date: "2024-05-09", email: 227, chat: 180, sms: 95 },
  { date: "2024-05-10", email: 293, chat: 330, sms: 140 },
  { date: "2024-05-11", email: 335, chat: 270, sms: 135 },
  { date: "2024-05-12", email: 197, chat: 240, sms: 100 },
  { date: "2024-05-13", email: 197, chat: 160, sms: 80 },
  { date: "2024-05-14", email: 448, chat: 490, sms: 245 },
  { date: "2024-05-15", email: 473, chat: 380, sms: 190 },
  { date: "2024-05-16", email: 338, chat: 400, sms: 170 },
  { date: "2024-05-17", email: 499, chat: 420, sms: 210 },
  { date: "2024-05-18", email: 315, chat: 350, sms: 175 },
  { date: "2024-05-19", email: 235, chat: 180, sms: 90 },
  { date: "2024-05-20", email: 177, chat: 230, sms: 115 },
  { date: "2024-05-21", email: 82, chat: 140, sms: 40 },
  { date: "2024-05-22", email: 81, chat: 120, sms: 35 },
  { date: "2024-05-23", email: 252, chat: 290, sms: 145 },
  { date: "2024-05-24", email: 294, chat: 220, sms: 110 },
  { date: "2024-05-25", email: 201, chat: 250, sms: 125 },
  { date: "2024-05-26", email: 213, chat: 170, sms: 85 },
  { date: "2024-05-27", email: 420, chat: 460, sms: 230 },
  { date: "2024-05-28", email: 233, chat: 190, sms: 95 },
  { date: "2024-05-29", email: 78, chat: 130, sms: 40 },
  { date: "2024-05-30", email: 340, chat: 280, sms: 140 },
  { date: "2024-05-31", email: 178, chat: 230, sms: 115 },
  { date: "2024-06-01", email: 178, chat: 200, sms: 100 },
  { date: "2024-06-02", email: 470, chat: 410, sms: 205 },
  { date: "2024-06-03", email: 103, chat: 160, sms: 50 },
  { date: "2024-06-04", email: 439, chat: 380, sms: 190 },
  { date: "2024-06-05", email: 88, chat: 140, sms: 45 },
  { date: "2024-06-06", email: 294, chat: 250, sms: 125 },
  { date: "2024-06-07", email: 323, chat: 370, sms: 185 },
  { date: "2024-06-08", email: 385, chat: 320, sms: 160 },
  { date: "2024-06-09", email: 438, chat: 480, sms: 240 },
  { date: "2024-06-10", email: 155, chat: 200, sms: 100 },
  { date: "2024-06-11", email: 92, chat: 150, sms: 50 },
  { date: "2024-06-12", email: 492, chat: 420, sms: 210 },
  { date: "2024-06-13", email: 81, chat: 130, sms: 40 },
  { date: "2024-06-14", email: 426, chat: 380, sms: 190 },
  { date: "2024-06-15", email: 307, chat: 350, sms: 175 },
  { date: "2024-06-16", email: 371, chat: 310, sms: 155 },
  { date: "2024-06-17", email: 475, chat: 520, sms: 260 },
  { date: "2024-06-18", email: 107, chat: 170, sms: 55 },
  { date: "2024-06-19", email: 341, chat: 290, sms: 145 },
  { date: "2024-06-20", email: 408, chat: 450, sms: 225 },
  { date: "2024-06-21", email: 169, chat: 210, sms: 85 },
  { date: "2024-06-22", email: 317, chat: 270, sms: 135 },
  { date: "2024-06-23", email: 480, chat: 530, sms: 265 },
  { date: "2024-06-24", email: 132, chat: 180, sms: 65 },
  { date: "2024-06-25", email: 141, chat: 190, sms: 70 },
  { date: "2024-06-26", email: 434, chat: 380, sms: 190 },
  { date: "2024-06-27", email: 448, chat: 490, sms: 245 },
  { date: "2024-06-28", email: 149, chat: 200, sms: 75 },
  { date: "2024-06-29", email: 103, chat: 160, sms: 50 },
  { date: "2024-06-30", email: 446, chat: 400, sms: 200 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  email: {
    label: "Email",
    color: "#655560",
  },
  chat: {
    label: "Chat",
    color: "#1564BF",
  },
  sms: {
    label: "SMS",
    color: "#405F90",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
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
          <CardTitle>Messaging activity</CardTitle>
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
              <linearGradient id="fillEmail" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-email)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillChat" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chat)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chat)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSms" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sms)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sms)"
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
              dataKey="sms"
              type="natural"
              fill="url(#fillSms)"
              stroke="var(--color-sms)"
              stackId="a"
            />
            <Area
              dataKey="chat"
              type="natural"
              fill="url(#fillChat)"
              stroke="var(--color-chat)"
              stackId="a"
            />
            <Area
              dataKey="email"
              type="natural"
              fill="url(#fillEmail)"
              stroke="var(--color-email)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </>
  )
}