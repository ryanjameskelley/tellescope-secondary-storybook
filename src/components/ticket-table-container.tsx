"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LayoutList, Table, Columns3, Plus } from "lucide-react"
import { AddViewCommandMenu } from "./add-view-command-menu"
import { ViewsCommandMenu } from "./views-command-menu"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TicketTableContainerProps {
  queuesContent?: React.ReactNode
  ticketsContent?: React.ReactNode
  boardContent?: React.ReactNode
}

export function TicketTableContainer({
  queuesContent,
  ticketsContent,
  boardContent
}: TicketTableContainerProps) {
  const [activeTab, setActiveTab] = React.useState("tickets")
  const [isViewsDialogOpen, setIsViewsDialogOpen] = React.useState(false)
  const [isAddViewDialogOpen, setIsAddViewDialogOpen] = React.useState(false)
  const [thirdTabSelection, setThirdTabSelection] = React.useState("board")
  const [additionalViews, setAdditionalViews] = React.useState<Array<{ id: string; name: string; type: "Table" | "Board" }>>([])
  
  // Update third tab selection when a table item is selected
  React.useEffect(() => {
    const tableViews = ["table1", "table2", "table3", "table4", "table5"]
    const additionalViewIds = additionalViews.map(view => view.id)
    if (tableViews.includes(activeTab) || additionalViewIds.includes(activeTab)) {
      setThirdTabSelection(activeTab)
    }
  }, [activeTab, additionalViews])
  
  // Handle adding new views
  const handleAddView = (name: string, type: "Table" | "Board") => {
    const newViewId = `custom-${Date.now()}`
    const newView = { id: newViewId, name, type }
    setAdditionalViews(prev => [...prev, newView])
    setActiveTab(newViewId)
    setIsAddViewDialogOpen(false)
  }
  
  // Determine what to show in third tab slot
  const getThirdTabInfo = () => {
    const tableViews = ["table1", "table2", "table3", "table4", "table5"]
    
    // Check if it's an additional custom view
    const customView = additionalViews.find(view => view.id === thirdTabSelection)
    if (customView) {
      return {
        value: customView.id,
        icon: customView.type === "Table" ? Table : Columns3,
        label: customView.name,
        content: <div className="p-4 text-muted-foreground">{customView.name} chart content would go here</div>
      }
    }
    
    // Check if it's a default table view
    if (tableViews.includes(thirdTabSelection)) {
      const tableNumber = thirdTabSelection.replace("table", "")
      return {
        value: thirdTabSelection,
        icon: Table,
        label: `Table ${tableNumber}`,
        content: <div className="p-4 text-muted-foreground">Table {tableNumber} chart content would go here</div>
      }
    }
    
    // Default to board
    return {
      value: "board",
      icon: Columns3,
      label: "Board", 
      content: boardContent || <div className="p-4 text-muted-foreground">Board chart content would go here</div>
    }
  }
  
  const thirdTab = getThirdTabInfo()
  return (
    <Card className="p-6 border rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-card-foreground text-base">Ticketing</p>
          <p className="text-muted-foreground text-sm">All tickets</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center gap-4">
              <TabsList className="h-9 bg-muted rounded-lg">
                <TabsTrigger value="queues" className="flex items-center gap-2">
                  <LayoutList className="w-4 h-4" />
                  <span>Queues</span>
                </TabsTrigger>
                <TabsTrigger value="tickets" className="flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  <span>Tickets</span>
                </TabsTrigger>
                <TabsTrigger value={thirdTab.value} className="flex items-center gap-2">
                  <thirdTab.icon className="w-4 h-4" />
                  <span>{thirdTab.label}</span>
                </TabsTrigger>
              </TabsList>
              
              <Dialog open={isAddViewDialogOpen} onOpenChange={setIsAddViewDialogOpen}>
                <DialogTrigger asChild>
                  <button className="p-0 border-0 bg-transparent cursor-pointer outline-none focus:outline-none">
                    <Plus className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none [&>[data-slot=dialog-close]]:top-3 [&>[data-slot=dialog-close]]:right-3 [&>[data-slot=dialog-close]]:focus:ring-0 [&>[data-slot=dialog-close]]:focus:ring-offset-0">
                  <AddViewCommandMenu 
                    onAddView={handleAddView}
                    onClose={() => setIsAddViewDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              
              <Dialog open={isViewsDialogOpen} onOpenChange={setIsViewsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="p-0 border-0 bg-transparent cursor-pointer text-muted-foreground text-sm">
                    and {5 + additionalViews.length} more...
                  </button>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 bg-transparent shadow-none [&>[data-slot=dialog-close]]:top-3 [&>[data-slot=dialog-close]]:right-3 [&>[data-slot=dialog-close]]:focus:ring-0 [&>[data-slot=dialog-close]]:focus:ring-offset-0">
                  <ViewsCommandMenu 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab}
                    onClose={() => setIsViewsDialogOpen(false)}
                    additionalViews={additionalViews}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            <TabsContent value="queues" className="mt-6">
              {queuesContent || <div className="p-4 text-muted-foreground">Queues chart content would go here</div>}
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-6">
              {ticketsContent || <div className="p-4 text-muted-foreground">Tickets chart content would go here</div>}
            </TabsContent>
            
            <TabsContent value="board" className="mt-6">
              {boardContent || <div className="p-4 text-muted-foreground">Board chart content would go here</div>}
            </TabsContent>
            
            {/* Individual TabsContent for table views when they are directly selected */}
            <TabsContent value="table1" className="mt-6">
              <div className="p-4 text-muted-foreground">Table 1 chart content would go here</div>
            </TabsContent>
            <TabsContent value="table2" className="mt-6">
              <div className="p-4 text-muted-foreground">Table 2 chart content would go here</div>
            </TabsContent>
            <TabsContent value="table3" className="mt-6">
              <div className="p-4 text-muted-foreground">Table 3 chart content would go here</div>
            </TabsContent>
            <TabsContent value="table4" className="mt-6">
              <div className="p-4 text-muted-foreground">Table 4 chart content would go here</div>
            </TabsContent>
            <TabsContent value="table5" className="mt-6">
              <div className="p-4 text-muted-foreground">Table 5 chart content would go here</div>
            </TabsContent>
            
            {/* Dynamic TabsContent for additional custom views */}
            {additionalViews.map((view) => (
              <TabsContent key={view.id} value={view.id} className="mt-6">
                <div className="p-4 text-muted-foreground">{view.name} chart content would go here</div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Card>
  )
}