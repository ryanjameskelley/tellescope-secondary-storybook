"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TicketingTable } from "./ticketing-table"
import { AppSidebar } from "./ui/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

function TicketsContent({ showSidebar = false, onToggleSidebar }: { showSidebar?: boolean; onToggleSidebar?: () => void } = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex bg-background min-h-screen w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center px-4 border-b h-[52px]">
          <div className="flex items-center gap-2">
            {/* Desktop toggle button */}
            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-md hidden md:flex" onClick={onToggleSidebar}>
              <PanelLeft className="h-5 w-5" />
            </Button>
            
            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-md md:hidden">
                  <PanelLeft className="h-5 w-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <AppSidebar activePage="tickets" />
              </SheetContent>
            </Sheet>
            
            <h1 className="text-xl font-bold">Tickets</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Ticketing Table */}
          <TicketingTable />
        </div>
      </div>
    </div>
  )
}

export default function TicketsPage() {
  const [showSidebar, setShowSidebar] = useState(false)
  
  return (
    <SidebarProvider>
      <div className="flex bg-background w-screen">
        <div className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[254px]' : 'w-0'} overflow-hidden flex-shrink-0`}>
          <AppSidebar activePage="tickets" />
        </div>
        <div className="flex-1 min-w-0">
          <TicketsContent showSidebar={showSidebar} onToggleSidebar={() => setShowSidebar(!showSidebar)} />
        </div>
      </div>
    </SidebarProvider>
  )
}