# Claude

This file is a placeholder for Claude-related documentation or notes. Add any relevant information about Claude usage, integration, or configuration here.
code:
"use client"

import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupComponent() {
  const [value, setValue] = React.useState("last-7-days")

  return (
    <ToggleGroup 
      type="single" 
      value={value} 
      onValueChange={(value) => {
        if (value) setValue(value)
      }}
      className="flex"
    >
      <ToggleGroupItem 
        value="last-3-months" 
        className="h-9 px-3 text-sm font-medium rounded-l-md border shadow-sm"
      >
        Last 3 months
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="last-30-days" 
        className="h-9 px-2 text-sm font-medium border shadow-sm"
      >
        Last 30 days
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="last-7-days" 
        className="h-9 px-3 text-sm font-medium rounded-r-md border shadow-sm"
      >
        Last 7 days
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
