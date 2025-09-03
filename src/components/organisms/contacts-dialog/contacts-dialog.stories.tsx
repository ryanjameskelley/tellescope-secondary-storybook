import type { Meta, StoryObj } from '@storybook/react'
import { SettingsDialog } from './contacts-dialog'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TagSelector } from "@/components/molecules/table/tag-selector"
import { DatePicker } from "@/components/molecules/date-picker"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  UserRound,
  Ticket,
  CalendarCheck,
  ClipboardCheck,
  Package,
  RefreshCw,
  File,
  FileText,
  FileImage,
  Pill,
  DollarSign,
  Fullscreen,
  Minimize,
  Plus,
} from "lucide-react"
import * as React from "react"

const meta: Meta<typeof SettingsDialog> = {
  title: 'Organisms/ContactsDialog',
  component: SettingsDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    
    if (isExpanded) {
      return (
        <div className="p-2 w-screen h-screen bg-black/20">
          <Dialog open={true} onOpenChange={() => {}}>
            <DialogContent className="overflow-hidden p-0 m-0 max-w-none max-h-none w-[calc(100%-16px)] h-[calc(100%-16px)]" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', maxWidth: 'none', maxHeight: 'none' }}>
              <DialogTitle className="sr-only">Settings</DialogTitle>
              <DialogDescription className="sr-only">
                Customize your settings here.
              </DialogDescription>
              <SidebarProvider className="items-start w-full h-full">
                <Sidebar collapsible="none" className="hidden md:flex flex-shrink-0">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {data.nav.map((item) => (
                            <SidebarMenuItem key={item.name}>
                              <SidebarMenuButton
                                asChild
                                isActive={item.name === "Information"}
                              >
                                <a href="#">
                                  <item.icon />
                                  <span>{item.name}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <main className="flex h-full flex-1 flex-col overflow-hidden w-full min-w-0">
                  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(false)}
                        className="p-1"
                      >
                        <Minimize className="h-4 w-4" />
                      </Button>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Information</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                  </header>
                  <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-muted/50 aspect-video w-[1000px] rounded-xl"
                      />
                    ))}
                  </div>
                </main>
              </SidebarProvider>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
    
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
          <DialogTitle className="sr-only">Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Customize your settings here.
          </DialogDescription>
          <SidebarProvider className="items-start">
            <Sidebar collapsible="none" className="hidden md:flex">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {data.nav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.name === "Information"}
                          >
                            <a href="#">
                              <item.icon />
                              <span>{item.name}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="p-1"
                  >
                    <Fullscreen className="h-4 w-4" />
                  </Button>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Information</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
                  />
                ))}
              </div>
            </main>
          </SidebarProvider>
        </DialogContent>
      </Dialog>
    )
  },
}

export const Information: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [selectedTags, setSelectedTags] = React.useState(["High Priority", "Medicare"])
    const [careTeamMembers, setCareTeamMembers] = React.useState(["Dr. Sarah Johnson", "Nurse Katie Martinez"])
    
    const careTeamOptions = ["Dr. Johnson", "Dr. Chen", "Dr. Martinez", "Dr. Taylor", "Dr. White", "Nurse Wilson", "Therapist Brown", "Case Manager"]
    
    const tagOptions = [
      { value: "High Priority", label: "High Priority" },
      { value: "Medicare", label: "Medicare" },
      { value: "Diabetic", label: "Diabetic" },
      { value: "Hypertension", label: "Hypertension" },
    ]
    
    if (isExpanded) {
      return (
        <div className="p-2 w-screen h-screen bg-black/20">
          <Dialog open={true} onOpenChange={() => {}}>
            <DialogContent className="overflow-hidden p-0 m-0 max-w-none max-h-none w-[calc(100%-16px)] h-[calc(100%-16px)]" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', maxWidth: 'none', maxHeight: 'none' }}>
              <DialogTitle className="sr-only">Patient Information</DialogTitle>
              <DialogDescription className="sr-only">
                View and edit patient information.
              </DialogDescription>
              <SidebarProvider className="items-start w-full h-full">
                <Sidebar collapsible="none" className="hidden md:flex flex-shrink-0">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {data.nav.map((item) => (
                            <SidebarMenuItem key={item.name}>
                              <SidebarMenuButton
                                asChild
                                isActive={item.name === "Information"}
                              >
                                <a href="#">
                                  <item.icon />
                                  <span>{item.name}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
                <main className="flex h-full flex-1 flex-col overflow-hidden w-full min-w-0">
                  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(false)}
                        className="p-1"
                      >
                        <Minimize className="h-4 w-4" />
                      </Button>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Maria Rodriguez</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Information</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                  </header>
                  <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DatePicker
                        id="dob"
                        label="Date of Birth"
                        value={new Date("1985-03-15")}
                        placeholder="March 15, 1985"
                      />
                      <div className="space-y-2">
                        <Label htmlFor="dateAdded">Date Added</Label>
                        <Input id="dateAdded" value="2023-01-12" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateUpdated">Date Updated</Label>
                        <Input id="dateUpdated" value="2024-12-20" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primaryInsurance">Primary Insurance</Label>
                        <Input id="primaryInsurance" defaultValue="Blue Cross Blue Shield" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryInsurance">Secondary Insurance</Label>
                        <Input id="secondaryInsurance" defaultValue="Medicare Part B" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main St, Springfield, IL 62701" />
                      </div>
                    </div>
                  </div>
                </main>
              </SidebarProvider>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
    
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
          <DialogTitle className="sr-only">Patient Information</DialogTitle>
          <DialogDescription className="sr-only">
            View and edit patient information.
          </DialogDescription>
          <SidebarProvider className="items-start">
            <Sidebar collapsible="none" className="hidden md:flex">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {data.nav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.name === "Information"}
                          >
                            <a href="#">
                              <item.icon />
                              <span>{item.name}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="p-1"
                  >
                    <Fullscreen className="h-4 w-4" />
                  </Button>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Maria Rodriguez</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Information</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePicker
                    id="dob"
                    label="Date of Birth"
                    value={new Date("1985-03-15")}
                    placeholder="March 15, 1985"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="dateAdded">Date Added</Label>
                    <Input id="dateAdded" value="2023-01-12" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateUpdated">Date Updated</Label>
                    <Input id="dateUpdated" value="2024-12-20" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primaryInsurance">Primary Insurance</Label>
                    <Input id="primaryInsurance" defaultValue="Blue Cross Blue Shield" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryInsurance">Secondary Insurance</Label>
                    <Input id="secondaryInsurance" defaultValue="Medicare Part B" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St, Springfield, IL 62701" />
                  </div>
                </div>
                
              </div>
            </main>
          </SidebarProvider>
        </DialogContent>
      </Dialog>
    )
  },
}

const data = {
  nav: [
    { name: "Information", icon: UserRound },
    { name: "Tickets", icon: Ticket },
    { name: "Events", icon: CalendarCheck },
    { name: "Eligibility", icon: ClipboardCheck },
    { name: "Device orders", icon: Package },
    { name: "Encounters", icon: RefreshCw },
    { name: "Files", icon: File },
    { name: "Forms", icon: FileText },
    { name: "Content", icon: FileImage },
    { name: "Medications", icon: Pill },
    { name: "Payment", icon: DollarSign },
  ],
}

export const Expanded: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: '100vh' } },
  },
  decorators: [
    (Story) => (
      <div className="p-2 w-screen h-screen bg-black/20">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [open, setOpen] = React.useState(true)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">Open Expanded Dialog</Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden p-0 m-0 max-w-none max-h-none w-[calc(100%-16px)] h-[calc(100%-16px)]" style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', maxWidth: 'none', maxHeight: 'none' }}>
            <DialogTitle className="sr-only">Settings</DialogTitle>
            <DialogDescription className="sr-only">
              Customize your settings here.
            </DialogDescription>
            <SidebarProvider className="items-start w-full h-full">
            <Sidebar collapsible="none" className="hidden md:flex flex-shrink-0">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {data.nav.map((item) => (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.name === "Information"}
                          >
                            <a href="#">
                              <item.icon />
                              <span>{item.name}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <main className="flex h-full flex-1 flex-col overflow-hidden w-full min-w-0">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Information</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-muted/50 aspect-video w-[1000px] rounded-xl"
                  />
                ))}
              </div>
            </main>
          </SidebarProvider>
          </DialogContent>
        </Dialog>
    )
  },
}