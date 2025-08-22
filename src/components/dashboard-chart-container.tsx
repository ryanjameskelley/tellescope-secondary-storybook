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

interface TabbedContainerProps {
  children?: React.ReactNode
  defaultValue?: string
  tabs: { value: string; label: string; content?: React.ReactNode }[]
}

export function TabbedContainer({ 
  children,
  defaultValue,
  tabs
}: TabbedContainerProps) {
  return (
    <Card className="pt-0">
      <CardHeader className="space-y-0 pb-0">
        <Tabs defaultValue={defaultValue || tabs[0]?.value} className="w-full">
          <TabsList className="mt-6 mb-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  )
}