"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown, CirclePlus, GripVertical, CheckCheck, Pencil, AlarmClockMinus, Trash, CircleX, Plus, Check, X, Circle, PanelRight, PlusCircle, Settings2 } from "lucide-react"
import { SortableHeader, StaticHeader } from "@/components/atoms/table"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DeletableBadge } from "@/components/ui/deletable-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type Ticket = {
  id: string
  title: string
  opened: {
    date: string
    journey: string
  }
  status: string[]
  order: number
  selected: boolean
}

const initialTicketsData: Ticket[] = [
  {
    id: "T001",
    title: "Implement user authentication system",
    opened: {
      date: "12/15/2023",
      journey: "Authentication Flow"
    },
    status: ["Feature", "Backend", "Security", "High Priority", "In Progress"],
    order: 1,
    selected: false
  },
  {
    id: "T002",
    title: "Fix responsive layout issues on mobile",
    opened: {
      date: "12/14/2023", 
      journey: "UI/UX Improvements"
    },
    status: ["Bug", "Frontend", "CSS", "Medium Priority", "To Do"],
    order: 2,
    selected: false
  },
  {
    id: "T003",
    title: "Add dark mode support to application",
    opened: {
      date: "12/13/2023",
      journey: "Theme Enhancement"
    },
    status: ["Feature", "UI", "Enhancement", "Low Priority", "Backlog"],
    order: 3,
    selected: false
  },
  {
    id: "T004",
    title: "Database optimization and indexing",
    opened: {
      date: "12/12/2023",
      journey: "Performance Optimization"
    },
    status: ["Performance", "Database", "Backend", "High Priority", "Done"],
    order: 4,
    selected: false
  },
  {
    id: "T005",
    title: "Update API documentation and examples",
    opened: {
      date: "12/11/2023", 
      journey: "Documentation"
    },
    status: ["Documentation", "Content", "Low Priority", "Canceled"],
    order: 5,
    selected: false
  },
  {
    id: "T006",
    title: "Implement email notification system",
    opened: {
      date: "12/10/2023",
      journey: "Communication Features"  
    },
    status: ["Feature", "Backend", "Email", "Medium Priority", "In Progress"],
    order: 6,
    selected: false
  },
  {
    id: "T007",
    title: "Refactor payment processing module",
    opened: {
      date: "12/09/2023",
      journey: "Payment System"
    },
    status: ["Enhancement", "Backend", "Payment", "High Priority", "In Progress"],
    order: 7,
    selected: false
  },
  {
    id: "T008",
    title: "Add unit tests for user service",
    opened: {
      date: "12/08/2023",
      journey: "Testing"
    },
    status: ["Testing", "Backend", "Coverage", "Medium Priority", "To Do"],
    order: 8,
    selected: false
  },
  {
    id: "T009",
    title: "Implement real-time chat feature",
    opened: {
      date: "12/07/2023",
      journey: "Communication Features"
    },
    status: ["Feature", "Frontend", "WebSocket", "Low Priority", "Backlog"],
    order: 9,
    selected: false
  },
  {
    id: "T010",
    title: "Fix memory leak in dashboard",
    opened: {
      date: "12/06/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Frontend", "Performance", "High Priority", "In Progress"],
    order: 10,
    selected: false
  },
  {
    id: "T011",
    title: "Add PDF export functionality",
    opened: {
      date: "12/05/2023",
      journey: "Export Features"
    },
    status: ["Feature", "Backend", "Export", "Medium Priority", "To Do"],
    order: 11,
    selected: false
  },
  {
    id: "T012",
    title: "Implement two-factor authentication",
    opened: {
      date: "12/04/2023",
      journey: "Authentication Flow"
    },
    status: ["Security", "Feature", "Backend", "High Priority", "In Progress"],
    order: 12,
    selected: false
  },
  {
    id: "T013",
    title: "Update dependency versions",
    opened: {
      date: "12/03/2023",
      journey: "Maintenance"
    },
    status: ["Maintenance", "Security", "Dependencies", "Medium Priority", "Done"],
    order: 13,
    selected: false
  },
  {
    id: "T014",
    title: "Create admin dashboard analytics",
    opened: {
      date: "12/02/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Frontend", "Analytics", "Low Priority", "Backlog"],
    order: 14,
    selected: false
  },
  {
    id: "T015",
    title: "Fix broken search functionality",
    opened: {
      date: "12/01/2023",
      journey: "Search System"
    },
    status: ["Bug", "Backend", "Search", "High Priority", "In Progress"],
    order: 15,
    selected: false
  },
  {
    id: "T016",
    title: "Implement file upload with progress",
    opened: {
      date: "11/30/2023",
      journey: "File Management"
    },
    status: ["Feature", "Frontend", "Upload", "Medium Priority", "To Do"],
    order: 16,
    selected: false
  },
  {
    id: "T017",
    title: "Add email template system",
    opened: {
      date: "11/29/2023",
      journey: "Communication Features"
    },
    status: ["Feature", "Backend", "Email", "Low Priority", "Backlog"],
    order: 17,
    selected: false
  },
  {
    id: "T018",
    title: "Optimize database queries",
    opened: {
      date: "11/28/2023",
      journey: "Performance Optimization"
    },
    status: ["Performance", "Database", "Backend", "High Priority", "Done"],
    order: 18,
    selected: false
  },
  {
    id: "T019",
    title: "Create user onboarding flow",
    opened: {
      date: "11/27/2023",
      journey: "User Experience"
    },
    status: ["Feature", "Frontend", "UX", "Medium Priority", "In Progress"],
    order: 19,
    selected: false
  },
  {
    id: "T020",
    title: "Fix calendar integration bugs",
    opened: {
      date: "11/26/2023",
      journey: "Calendar System"
    },
    status: ["Bug", "Integration", "Calendar", "Medium Priority", "To Do"],
    order: 20,
    selected: false
  },
  {
    id: "T021",
    title: "Add multi-language support",
    opened: {
      date: "11/25/2023",
      journey: "Internationalization"
    },
    status: ["Feature", "Frontend", "i18n", "Low Priority", "Backlog"],
    order: 21,
    selected: false
  },
  {
    id: "T022",
    title: "Implement data backup system",
    opened: {
      date: "11/24/2023",
      journey: "Data Management"
    },
    status: ["Feature", "Backend", "Backup", "High Priority", "In Progress"],
    order: 22,
    selected: false
  },
  {
    id: "T023",
    title: "Create mobile app prototype",
    opened: {
      date: "11/23/2023",
      journey: "Mobile Development"
    },
    status: ["Feature", "Mobile", "Prototype", "Low Priority", "Backlog"],
    order: 23,
    selected: false
  },
  {
    id: "T024",
    title: "Fix SSL certificate issues",
    opened: {
      date: "11/22/2023",
      journey: "Security"
    },
    status: ["Bug", "Security", "SSL", "High Priority", "Done"],
    order: 24,
    selected: false
  },
  {
    id: "T025",
    title: "Add advanced filtering options",
    opened: {
      date: "11/21/2023",
      journey: "Search System"
    },
    status: ["Feature", "Frontend", "Filtering", "Medium Priority", "To Do"],
    order: 25,
    selected: false
  },
  {
    id: "T026",
    title: "Implement role-based permissions",
    opened: {
      date: "11/20/2023",
      journey: "Security"
    },
    status: ["Feature", "Backend", "Authorization", "High Priority", "In Progress"],
    order: 26,
    selected: false
  },
  {
    id: "T027",
    title: "Add batch operations for users",
    opened: {
      date: "11/19/2023",
      journey: "User Management"
    },
    status: ["Feature", "Frontend", "Batch", "Medium Priority", "To Do"],
    order: 27,
    selected: false
  },
  {
    id: "T028",
    title: "Fix timezone handling issues",
    opened: {
      date: "11/18/2023",
      journey: "Internationalization"
    },
    status: ["Bug", "Backend", "Timezone", "Medium Priority", "In Progress"],
    order: 28,
    selected: false
  },
  {
    id: "T029",
    title: "Create audit logging system",
    opened: {
      date: "11/17/2023",
      journey: "Security"
    },
    status: ["Feature", "Backend", "Logging", "High Priority", "To Do"],
    order: 29,
    selected: false
  },
  {
    id: "T030",
    title: "Implement WebSocket real-time updates",
    opened: {
      date: "11/16/2023",
      journey: "Real-time Features"
    },
    status: ["Feature", "Backend", "WebSocket", "Low Priority", "Backlog"],
    order: 30,
    selected: false
  },
  {
    id: "T031",
    title: "Add custom field builder",
    opened: {
      date: "11/15/2023",
      journey: "Configuration"
    },
    status: ["Feature", "Frontend", "Builder", "Low Priority", "Backlog"],
    order: 31,
    selected: false
  },
  {
    id: "T032",
    title: "Fix database connection pooling",
    opened: {
      date: "11/14/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Database", "Connection", "High Priority", "Done"],
    order: 32,
    selected: false
  },
  {
    id: "T033",
    title: "Create workflow automation",
    opened: {
      date: "11/13/2023",
      journey: "Automation"
    },
    status: ["Feature", "Backend", "Workflow", "Medium Priority", "In Progress"],
    order: 33,
    selected: false
  },
  {
    id: "T034",
    title: "Add integration with Slack",
    opened: {
      date: "11/12/2023",
      journey: "Integrations"
    },
    status: ["Feature", "Integration", "Slack", "Low Priority", "Backlog"],
    order: 34,
    selected: false
  },
  {
    id: "T035",
    title: "Implement caching strategy",
    opened: {
      date: "11/11/2023",
      journey: "Performance Optimization"
    },
    status: ["Enhancement", "Backend", "Cache", "High Priority", "In Progress"],
    order: 35,
    selected: false
  },
  {
    id: "T036",
    title: "Add chart visualization components",
    opened: {
      date: "11/10/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Frontend", "Charts", "Medium Priority", "To Do"],
    order: 36,
    selected: false
  },
  {
    id: "T037",
    title: "Fix memory leaks in notifications",
    opened: {
      date: "11/09/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Frontend", "Memory", "High Priority", "In Progress"],
    order: 37,
    selected: false
  },
  {
    id: "T038",
    title: "Create API rate limiting",
    opened: {
      date: "11/08/2023",
      journey: "Security"
    },
    status: ["Feature", "Backend", "Rate Limiting", "Medium Priority", "To Do"],
    order: 38,
    selected: false
  },
  {
    id: "T039",
    title: "Add keyboard shortcuts",
    opened: {
      date: "11/07/2023",
      journey: "User Experience"
    },
    status: ["Feature", "Frontend", "Shortcuts", "Low Priority", "Backlog"],
    order: 39,
    selected: false
  },
  {
    id: "T040",
    title: "Implement data encryption",
    opened: {
      date: "11/06/2023",
      journey: "Security"
    },
    status: ["Security", "Backend", "Encryption", "High Priority", "Done"],
    order: 40,
    selected: false
  },
  {
    id: "T041",
    title: "Add drag and drop file upload",
    opened: {
      date: "11/05/2023",
      journey: "File Management"
    },
    status: ["Feature", "Frontend", "Upload", "Medium Priority", "In Progress"],
    order: 41,
    selected: false
  },
  {
    id: "T042",
    title: "Create custom dashboard widgets",
    opened: {
      date: "11/04/2023",
      journey: "Dashboard"
    },
    status: ["Feature", "Frontend", "Widgets", "Low Priority", "Backlog"],
    order: 42,
    selected: false
  },
  {
    id: "T043",
    title: "Fix cross-browser compatibility",
    opened: {
      date: "11/03/2023",
      journey: "Browser Support"
    },
    status: ["Bug", "Frontend", "Compatibility", "Medium Priority", "To Do"],
    order: 43,
    selected: false
  },
  {
    id: "T044",
    title: "Implement OAuth integration",
    opened: {
      date: "11/02/2023",
      journey: "Authentication Flow"
    },
    status: ["Feature", "Backend", "OAuth", "High Priority", "In Progress"],
    order: 44,
    selected: false
  },
  {
    id: "T045",
    title: "Add email queue management",
    opened: {
      date: "11/01/2023",
      journey: "Communication Features"
    },
    status: ["Feature", "Backend", "Queue", "Medium Priority", "To Do"],
    order: 45,
    selected: false
  },
  {
    id: "T046",
    title: "Create automated testing pipeline",
    opened: {
      date: "10/31/2023",
      journey: "Testing"
    },
    status: ["Enhancement", "CI/CD", "Testing", "High Priority", "Done"],
    order: 46,
    selected: false
  },
  {
    id: "T047",
    title: "Add infinite scroll for lists",
    opened: {
      date: "10/30/2023",
      journey: "User Experience"
    },
    status: ["Feature", "Frontend", "Scroll", "Low Priority", "Backlog"],
    order: 47,
    selected: false
  },
  {
    id: "T048",
    title: "Implement progressive web app",
    opened: {
      date: "10/29/2023",
      journey: "Mobile Development"
    },
    status: ["Feature", "Frontend", "PWA", "Medium Priority", "In Progress"],
    order: 48,
    selected: false
  },
  {
    id: "T049",
    title: "Add geolocation features",
    opened: {
      date: "10/28/2023",
      journey: "Location Services"
    },
    status: ["Feature", "Frontend", "Geolocation", "Low Priority", "Backlog"],
    order: 49,
    selected: false
  },
  {
    id: "T050",
    title: "Fix session timeout handling",
    opened: {
      date: "10/27/2023",
      journey: "Authentication Flow"
    },
    status: ["Bug", "Backend", "Session", "Medium Priority", "To Do"],
    order: 50,
    selected: false
  },
  {
    id: "T051",
    title: "Create advanced search filters",
    opened: {
      date: "10/26/2023",
      journey: "Search System"
    },
    status: ["Feature", "Frontend", "Search", "High Priority", "In Progress"],
    order: 51,
    selected: false
  },
  {
    id: "T052",
    title: "Add bulk data export",
    opened: {
      date: "10/25/2023",
      journey: "Export Features"
    },
    status: ["Feature", "Backend", "Export", "Medium Priority", "To Do"],
    order: 52,
    selected: false
  },
  {
    id: "T053",
    title: "Implement custom themes",
    opened: {
      date: "10/24/2023",
      journey: "Theme Enhancement"
    },
    status: ["Feature", "Frontend", "Themes", "Low Priority", "Backlog"],
    order: 53,
    selected: false
  },
  {
    id: "T054",
    title: "Fix API response caching",
    opened: {
      date: "10/23/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Backend", "Cache", "High Priority", "Done"],
    order: 54,
    selected: false
  },
  {
    id: "T055",
    title: "Add notification preferences",
    opened: {
      date: "10/22/2023",
      journey: "User Preferences"
    },
    status: ["Feature", "Frontend", "Notifications", "Medium Priority", "In Progress"],
    order: 55,
    selected: false
  },
  {
    id: "T056",
    title: "Create webhook system",
    opened: {
      date: "10/21/2023",
      journey: "Integrations"
    },
    status: ["Feature", "Backend", "Webhooks", "Low Priority", "Backlog"],
    order: 56,
    selected: false
  },
  {
    id: "T057",
    title: "Fix form validation errors",
    opened: {
      date: "10/20/2023",
      journey: "Form Handling"
    },
    status: ["Bug", "Frontend", "Validation", "Medium Priority", "To Do"],
    order: 57,
    selected: false
  },
  {
    id: "T058",
    title: "Implement content versioning",
    opened: {
      date: "10/19/2023",
      journey: "Version Control"
    },
    status: ["Feature", "Backend", "Versioning", "High Priority", "In Progress"],
    order: 58,
    selected: false
  },
  {
    id: "T059",
    title: "Add social media integration",
    opened: {
      date: "10/18/2023",
      journey: "Social Features"
    },
    status: ["Feature", "Integration", "Social", "Low Priority", "Backlog"],
    order: 59,
    selected: false
  },
  {
    id: "T060",
    title: "Create performance monitoring",
    opened: {
      date: "10/17/2023",
      journey: "Monitoring"
    },
    status: ["Feature", "Backend", "Monitoring", "High Priority", "Done"],
    order: 60,
    selected: false
  },
  {
    id: "T061",
    title: "Add multi-factor authentication",
    opened: {
      date: "10/16/2023",
      journey: "Security"
    },
    status: ["Security", "Backend", "MFA", "High Priority", "In Progress"],
    order: 61,
    selected: false
  },
  {
    id: "T062",
    title: "Implement lazy loading images",
    opened: {
      date: "10/15/2023",
      journey: "Performance Optimization"
    },
    status: ["Enhancement", "Frontend", "Images", "Medium Priority", "To Do"],
    order: 62,
    selected: false
  },
  {
    id: "T063",
    title: "Add comment system",
    opened: {
      date: "10/14/2023",
      journey: "Social Features"
    },
    status: ["Feature", "Frontend", "Comments", "Low Priority", "Backlog"],
    order: 63,
    selected: false
  },
  {
    id: "T064",
    title: "Fix CORS configuration",
    opened: {
      date: "10/13/2023",
      journey: "API Configuration"
    },
    status: ["Bug", "Backend", "CORS", "Medium Priority", "Done"],
    order: 64,
    selected: false
  },
  {
    id: "T065",
    title: "Create data migration tools",
    opened: {
      date: "10/12/2023",
      journey: "Data Management"
    },
    status: ["Feature", "Backend", "Migration", "High Priority", "In Progress"],
    order: 65,
    selected: false
  },
  {
    id: "T066",
    title: "Add user activity tracking",
    opened: {
      date: "10/11/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Backend", "Tracking", "Medium Priority", "To Do"],
    order: 66,
    selected: false
  },
  {
    id: "T067",
    title: "Implement service worker",
    opened: {
      date: "10/10/2023",
      journey: "Mobile Development"
    },
    status: ["Feature", "Frontend", "Service Worker", "Low Priority", "Backlog"],
    order: 67,
    selected: false
  },
  {
    id: "T068",
    title: "Fix memory optimization",
    opened: {
      date: "10/09/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Backend", "Memory", "High Priority", "Done"],
    order: 68,
    selected: false
  },
  {
    id: "T069",
    title: "Add custom field validation",
    opened: {
      date: "10/08/2023",
      journey: "Form Handling"
    },
    status: ["Feature", "Frontend", "Validation", "Medium Priority", "In Progress"],
    order: 69,
    selected: false
  },
  {
    id: "T070",
    title: "Create scheduled tasks system",
    opened: {
      date: "10/07/2023",
      journey: "Automation"
    },
    status: ["Feature", "Backend", "Scheduler", "Low Priority", "Backlog"],
    order: 70,
    selected: false
  },
  {
    id: "T071",
    title: "Fix responsive table layout",
    opened: {
      date: "10/06/2023",
      journey: "UI/UX Improvements"
    },
    status: ["Bug", "Frontend", "Responsive", "Medium Priority", "To Do"],
    order: 71,
    selected: false
  },
  {
    id: "T072",
    title: "Implement search autocomplete",
    opened: {
      date: "10/05/2023",
      journey: "Search System"
    },
    status: ["Feature", "Frontend", "Autocomplete", "High Priority", "In Progress"],
    order: 72,
    selected: false
  },
  {
    id: "T073",
    title: "Add team collaboration features",
    opened: {
      date: "10/04/2023",
      journey: "Collaboration"
    },
    status: ["Feature", "Frontend", "Collaboration", "Medium Priority", "To Do"],
    order: 73,
    selected: false
  },
  {
    id: "T074",
    title: "Create error boundary components",
    opened: {
      date: "10/03/2023",
      journey: "Error Handling"
    },
    status: ["Enhancement", "Frontend", "Error Handling", "Low Priority", "Backlog"],
    order: 74,
    selected: false
  },
  {
    id: "T075",
    title: "Fix database indexing performance",
    opened: {
      date: "10/02/2023",
      journey: "Performance Optimization"
    },
    status: ["Bug", "Database", "Indexing", "High Priority", "Done"],
    order: 75,
    selected: false
  },
  {
    id: "T076",
    title: "Add machine learning recommendations",
    opened: {
      date: "10/01/2023",
      journey: "AI Features"
    },
    status: ["Feature", "Backend", "ML", "Low Priority", "Backlog"],
    order: 76,
    selected: false
  },
  {
    id: "T077",
    title: "Implement content security policy",
    opened: {
      date: "09/30/2023",
      journey: "Security"
    },
    status: ["Security", "Backend", "CSP", "High Priority", "In Progress"],
    order: 77,
    selected: false
  },
  {
    id: "T078",
    title: "Add drag and drop kanban board",
    opened: {
      date: "09/29/2023",
      journey: "Project Management"
    },
    status: ["Feature", "Frontend", "Kanban", "Medium Priority", "To Do"],
    order: 78,
    selected: false
  },
  {
    id: "T079",
    title: "Create custom report builder",
    opened: {
      date: "09/28/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Frontend", "Reports", "Low Priority", "Backlog"],
    order: 79,
    selected: false
  },
  {
    id: "T080",
    title: "Fix concurrent user sessions",
    opened: {
      date: "09/27/2023",
      journey: "Session Management"
    },
    status: ["Bug", "Backend", "Sessions", "High Priority", "Done"],
    order: 80,
    selected: false
  },
  {
    id: "T081",
    title: "Add voice command interface",
    opened: {
      date: "09/26/2023",
      journey: "Accessibility"
    },
    status: ["Feature", "Frontend", "Voice", "Low Priority", "Backlog"],
    order: 81,
    selected: false
  },
  {
    id: "T082",
    title: "Implement blockchain integration",
    opened: {
      date: "09/25/2023",
      journey: "Blockchain"
    },
    status: ["Feature", "Backend", "Blockchain", "Low Priority", "Backlog"],
    order: 82,
    selected: false
  },
  {
    id: "T083",
    title: "Fix email delivery issues",
    opened: {
      date: "09/24/2023",
      journey: "Communication Features"
    },
    status: ["Bug", "Backend", "Email", "High Priority", "In Progress"],
    order: 83,
    selected: false
  },
  {
    id: "T084",
    title: "Add video conferencing integration",
    opened: {
      date: "09/23/2023",
      journey: "Communication Features"
    },
    status: ["Feature", "Integration", "Video", "Medium Priority", "To Do"],
    order: 84,
    selected: false
  },
  {
    id: "T085",
    title: "Create automated backup system",
    opened: {
      date: "09/22/2023",
      journey: "Data Management"
    },
    status: ["Feature", "Backend", "Backup", "High Priority", "Done"],
    order: 85,
    selected: false
  },
  {
    id: "T086",
    title: "Add push notification system",
    opened: {
      date: "09/21/2023",
      journey: "Mobile Development"
    },
    status: ["Feature", "Frontend", "Push Notifications", "Medium Priority", "In Progress"],
    order: 86,
    selected: false
  },
  {
    id: "T087",
    title: "Implement GraphQL API",
    opened: {
      date: "09/20/2023",
      journey: "API Development"
    },
    status: ["Enhancement", "Backend", "GraphQL", "Low Priority", "Backlog"],
    order: 87,
    selected: false
  },
  {
    id: "T088",
    title: "Fix cross-site scripting vulnerabilities",
    opened: {
      date: "09/19/2023",
      journey: "Security"
    },
    status: ["Security", "Frontend", "XSS", "High Priority", "Done"],
    order: 88,
    selected: false
  },
  {
    id: "T089",
    title: "Add smart contract functionality",
    opened: {
      date: "09/18/2023",
      journey: "Blockchain"
    },
    status: ["Feature", "Backend", "Smart Contracts", "Low Priority", "Backlog"],
    order: 89,
    selected: false
  },
  {
    id: "T090",
    title: "Create advanced analytics dashboard",
    opened: {
      date: "09/17/2023",
      journey: "Analytics"
    },
    status: ["Feature", "Frontend", "Dashboard", "Medium Priority", "In Progress"],
    order: 90,
    selected: false
  },
  {
    id: "T091",
    title: "Fix API rate limit errors",
    opened: {
      date: "09/16/2023",
      journey: "API Development"
    },
    status: ["Bug", "Backend", "Rate Limiting", "High Priority", "To Do"],
    order: 91,
    selected: false
  },
  {
    id: "T092",
    title: "Add augmented reality features",
    opened: {
      date: "09/15/2023",
      journey: "AR/VR"
    },
    status: ["Feature", "Frontend", "AR", "Low Priority", "Backlog"],
    order: 92,
    selected: false
  },
  {
    id: "T093",
    title: "Implement quantum encryption",
    opened: {
      date: "09/14/2023",
      journey: "Security"
    },
    status: ["Security", "Backend", "Quantum", "Low Priority", "Backlog"],
    order: 93,
    selected: false
  },
  {
    id: "T094",
    title: "Create IoT device integration",
    opened: {
      date: "09/13/2023",
      journey: "IoT"
    },
    status: ["Feature", "Backend", "IoT", "Medium Priority", "In Progress"],
    order: 94,
    selected: false
  },
  {
    id: "T095",
    title: "Add neural network processing",
    opened: {
      date: "09/12/2023",
      journey: "AI Features"
    },
    status: ["Feature", "Backend", "Neural Network", "Low Priority", "Backlog"],
    order: 95,
    selected: false
  },
  {
    id: "T096",
    title: "Fix quantum computing compatibility",
    opened: {
      date: "09/11/2023",
      journey: "Quantum Computing"
    },
    status: ["Bug", "Backend", "Quantum", "Low Priority", "Backlog"],
    order: 96,
    selected: false
  },
  {
    id: "T097",
    title: "Implement holographic display support",
    opened: {
      date: "09/10/2023",
      journey: "Display Technology"
    },
    status: ["Feature", "Frontend", "Holographic", "Low Priority", "Backlog"],
    order: 97,
    selected: false
  },
  {
    id: "T098",
    title: "Add telepathic user interface",
    opened: {
      date: "09/09/2023",
      journey: "Brain-Computer Interface"
    },
    status: ["Feature", "Frontend", "BCI", "Low Priority", "Backlog"],
    order: 98,
    selected: false
  },
  {
    id: "T099",
    title: "Create time travel debugging tool",
    opened: {
      date: "09/08/2023",
      journey: "Time Travel"
    },
    status: ["Feature", "Development", "Time Travel", "Low Priority", "Backlog"],
    order: 99,
    selected: false
  },
  {
    id: "T100",
    title: "Implement interdimensional data sync",
    opened: {
      date: "09/07/2023",
      journey: "Multiverse"
    },
    status: ["Feature", "Backend", "Interdimensional", "Low Priority", "Backlog"],
    order: 100,
    selected: false
  }
]

const availableStatusOptions = [
  "Feature", "Bug", "Enhancement", "Security", "Performance", "Frontend", "Backend", "UI", "Database", "Documentation", "Content", "CSS", "Testing", "API",
  "High Priority", "Medium Priority", "Low Priority",
  "Backlog", "To Do", "In Progress", "Done", "Canceled"
]

interface TagListProps {
  items: string[]
  variant?: "default" | "secondary" | "destructive" | "outline" | "chart-primary" | "chart-secondary" | "chart-tertiary" | "chart-accent"
  onRemoveTag?: (tag: string) => void
  onAddTag?: (tag: string) => void
  availableOptions?: string[]
  columnKey?: string
  allowColorSelection?: boolean
  globalTagColors?: Record<string, TagColor>
  onSetGlobalTagColor?: (tag: string, color: TagColor) => void
}

type TagColor = {
  name: string
  variant: "default" | "secondary" | "destructive" | "outline"
  bgColor: string
  textColor: string
}

const availableTagColors: TagColor[] = [
  { name: "Default", variant: "default", bgColor: "bg-slate-900", textColor: "text-white" },
  { name: "Secondary", variant: "secondary", bgColor: "bg-slate-100", textColor: "text-slate-900" },
  { name: "Success", variant: "outline", bgColor: "bg-green-500", textColor: "text-white" },
  { name: "Warning", variant: "outline", bgColor: "bg-yellow-500", textColor: "text-black" },
  { name: "Info", variant: "outline", bgColor: "bg-blue-500", textColor: "text-white" },
  { name: "Destructive", variant: "destructive", bgColor: "bg-red-500", textColor: "text-white" },
]

const getColorValue = (tailwindClass: string): string => {
  const colorMap: Record<string, string> = {
    'bg-slate-900': '#0f172a',
    'bg-slate-100': '#f1f5f9',
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-blue-500': '#3b82f6',
    'bg-red-500': '#ef4444',
  }
  return colorMap[tailwindClass] || '#6b7280'
}

const getTagStyles = (variant: TagListProps['variant']) => {
  switch (variant) {
    case "chart-primary":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    case "chart-secondary": 
      return "bg-[#1564BF] text-white border-[#1564BF] hover:bg-[#1564BF]/90"
    case "chart-tertiary":
      return "bg-[#405F90] text-white border-[#405F90] hover:bg-[#405F90]/90"
    case "chart-accent":
      return "bg-[#655560] text-white border-[#655560] hover:bg-[#655560]/90"
    default:
      return ""
  }
}

function TagList({ 
  items, 
  variant = "secondary", 
  onRemoveTag, 
  onAddTag, 
  availableOptions = [],
  columnKey,
  allowColorSelection = false,
  globalTagColors = {},
  onSetGlobalTagColor
}: TagListProps) {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)
  const [isColorDialogOpen, setIsColorDialogOpen] = React.useState(false)
  const [selectedTagForColor, setSelectedTagForColor] = React.useState<string>("")
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const handleToggleTag = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (items.includes(tag)) {
      onRemoveTag?.(tag)
    } else {
      onAddTag?.(tag)
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth
        }
      }, 0)
    }
  }

  const handleColorClick = (tag: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedTagForColor(tag)
    setIsColorDialogOpen(true)
    setIsSelectOpen(false)
  }

  const handleColorSelection = (color: TagColor) => {
    if (selectedTagForColor && onSetGlobalTagColor) {
      onSetGlobalTagColor(selectedTagForColor, color)
    }
    setIsColorDialogOpen(false)
    setSelectedTagForColor("")
  }

  return (
    <div className="flex gap-1 items-center">
      {onAddTag && (
        <DropdownMenu open={isSelectOpen} onOpenChange={setIsSelectOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-5 w-5 p-0 flex-shrink-0 border-none bg-transparent hover:bg-muted/50 flex items-center justify-center shadow-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Plus className="h-2.5 w-2.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="p-0 w-48">
            <Command className="rounded-md border-none shadow-none">
              <CommandGroup className="p-1">
                {availableOptions.map((option) => {
                  const tagColor = globalTagColors[option]
                  return (
                    <CommandItem
                      key={option}
                      onSelect={(event) => event.preventDefault()}
                      className="flex items-center justify-between rounded-xs py-1.5 px-2"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            if (allowColorSelection) {
                              handleColorClick(option, event)
                            }
                          }}
                        >
                          <Circle 
                            className="h-4 w-4"
                            style={tagColor ? { 
                              backgroundColor: getColorValue(tagColor.bgColor),
                              color: getColorValue(tagColor.bgColor),
                              border: `1px solid ${getColorValue(tagColor.bgColor)}`,
                              borderRadius: '50%',
                              fill: getColorValue(tagColor.bgColor),
                              stroke: 'none'
                            } : {
                              backgroundColor: 'transparent',
                              border: 'none',
                              borderRadius: '50%',
                              color: '#e5e7eb',
                              fill: '#e5e7eb',
                              stroke: 'none'
                            }}
                          />
                        </div>
                        <span 
                          className="text-popover-foreground text-sm cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            handleToggleTag(option, event)
                          }}
                        >
                          {option}
                        </span>
                      </div>
                      <div className="h-4 w-4 flex items-center justify-center">
                        {items.includes(option) && (
                          <Check className="h-4 w-4 text-popover-foreground" />
                        )}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <div ref={containerRef} className="flex gap-1 overflow-x-auto max-w-[250px] w-fit items-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {items.map((item, index) => {
          const itemColor = globalTagColors[item]
          const badgeVariant = itemColor ? itemColor.variant : 'secondary'
          const customColorClass = itemColor ? `${itemColor.bgColor} ${itemColor.textColor} border-transparent` : 'bg-gray-200 text-gray-700 border-transparent'
          return (
            <DeletableBadge
              key={index}
              variant={badgeVariant}
              className={`whitespace-nowrap flex-shrink-0 h-5 ${customColorClass}`}
              onDelete={onRemoveTag ? () => onRemoveTag(item) : undefined}
            >
              {item}
            </DeletableBadge>
          )
        })}
      </div>

      {/* Color Selection Dialog */}
      <Dialog open={isColorDialogOpen} onOpenChange={setIsColorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Color for "{selectedTagForColor}"</DialogTitle>
            <DialogDescription>
              Select a color for this tag
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {availableTagColors.map((color) => (
              <Button
                key={color.name}
                variant="ghost"
                className="h-auto p-3 flex items-center gap-2 justify-start hover:bg-muted"
                onClick={() => handleColorSelection(color)}
              >
                <div className={`w-4 h-4 rounded ${color.bgColor} flex-shrink-0`} />
                <span>{color.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

type ColumnKey = "title" | "id" | "opened" | "origin" | "status" | "actions"

const columns = [
  { key: "title" as ColumnKey, label: "Title", width: "w-48" },
  { key: "id" as ColumnKey, label: "ID", width: "w-20" },
  { key: "opened" as ColumnKey, label: "Opened", width: "w-24" },
  { key: "origin" as ColumnKey, label: "Origin", width: "w-32" },
  { key: "status" as ColumnKey, label: "Status", width: "w-48" },
  { key: "actions" as ColumnKey, label: "Actions", width: "w-32" }
]

export function TicketingTable() {
  const [ticketsData, setTicketsData] = React.useState<Ticket[]>(initialTicketsData)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null)
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [globalTagColors, setGlobalTagColors] = React.useState<Record<string, TagColor>>({})
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState({})
  const [visibleColumns, setVisibleColumns] = React.useState<Record<ColumnKey, boolean>>({
    title: true,
    id: false,
    opened: true,
    origin: false,
    status: true,
    actions: true
  })
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(null)
  const [isAddTicketSheetOpen, setIsAddTicketSheetOpen] = React.useState(false)

  // Define table columns
  const tableColumns = React.useMemo<ColumnDef<Ticket>[]>(() => [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <SortableHeader onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
        </SortableHeader>
      ),
    },
    {
      accessorKey: "id",
      header: () => <StaticHeader>ID</StaticHeader>,
    },
    {
      accessorKey: "opened",
      header: ({ column }) => (
        <SortableHeader onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Opened
        </SortableHeader>
      ),
      accessorFn: (row) => row.opened.date,
    },
    {
      accessorKey: "origin",
      header: ({ column }) => (
        <SortableHeader onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Origin
        </SortableHeader>
      ),
      accessorFn: (row) => row.opened.journey,
    },
    {
      accessorKey: "status",
      header: () => <StaticHeader>Status</StaticHeader>,
    },
    {
      accessorKey: "actions",
      header: () => <StaticHeader>Actions</StaticHeader>,
    },
  ], [])

  const table = useReactTable({
    data: ticketsData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleTitleFilter = (value: string) => {
    setGlobalFilter(value)
  }

  const scrollableColumns = columns.filter(column => column.key !== "title")
  const visibleScrollableColumns = scrollableColumns.filter(column => visibleColumns[column.key])

  const filteredData = table.getRowModel().rows.map(row => row.original)

  const handleRowSelect = (ticketId: string) => {
    if (selectedRows.includes(ticketId)) {
      setSelectedRows(selectedRows.filter(id => id !== ticketId))
    } else {
      setSelectedRows([...selectedRows, ticketId])
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.length === table.getFilteredRowModel().rows.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(table.getFilteredRowModel().rows.map(row => row.original.id))
    }
  }

  const handleDragStart = (ticketId: string) => {
    setDraggedItem(ticketId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e: React.DragEvent, ticketId: string) => {
    e.preventDefault()
    if (draggedItem && draggedItem !== ticketId) {
      setDragOverItem(ticketId)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only clear if we're leaving the table row entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e: React.DragEvent, targetTicketId: string) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem === targetTicketId) return

    setTicketsData(prev => {
      const updated = [...prev]
      const draggedIndex = updated.findIndex(t => t.id === draggedItem)
      const targetIndex = updated.findIndex(t => t.id === targetTicketId)
      
      // Remove dragged item
      const [removed] = updated.splice(draggedIndex, 1)
      
      // Insert at target position
      updated.splice(targetIndex, 0, removed)
      
      // Update order values
      return updated.map((ticket, index) => ({
        ...ticket,
        order: index + 1
      }))
    })

    setDraggedItem(null)
    setDragOverItem(null)
  }

  const removeStatusTag = (ticketId: string, tagToRemove: string) => {
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: ticket.status.filter(tag => tag !== tagToRemove) }
          : ticket
      )
    )
  }

  const addStatusTag = (ticketId: string, tagToAdd: string) => {
    setTicketsData(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: [...ticket.status, tagToAdd] }
          : ticket
      )
    )
  }

  const handleSetGlobalTagColor = (tag: string, color: TagColor) => {
    setGlobalTagColors(prev => ({
      ...prev,
      [tag]: color
    }))
  }

  const handlePanelClick = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsSheetOpen(true)
  }

  const handleAddTicketClick = () => {
    setIsAddTicketSheetOpen(true)
  }

  const toggleColumn = (columnKey: ColumnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }))
  }

  const copyToClipboard = async (text: string) => {
    // Try multiple approaches for maximum compatibility
    const methods = [
      // Method 1: Modern Clipboard API
      async () => {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
          return true
        }
        throw new Error('Clipboard API not available')
      },
      // Method 2: Legacy with setTimeout for Safari
      () => new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          try {
            const textArea = document.createElement("textarea")
            textArea.value = text
            textArea.style.position = "fixed"
            textArea.style.left = "-999999px"
            textArea.style.top = "-999999px"
            textArea.style.opacity = "0"
            textArea.style.pointerEvents = "none"
            textArea.style.zIndex = "-1"
            textArea.setAttribute('readonly', '')
            
            document.body.appendChild(textArea)
            
            // Focus and select
            textArea.focus()
            textArea.select()
            textArea.setSelectionRange(0, text.length)
            
            const successful = document.execCommand('copy')
            document.body.removeChild(textArea)
            
            if (successful) {
              resolve(true)
            } else {
              reject(new Error('execCommand failed'))
            }
          } catch (err) {
            reject(err)
          }
        }, 0)
      }),
      // Method 3: Alternative Safari approach
      () => new Promise<boolean>((resolve, reject) => {
        try {
          const range = document.createRange()
          const span = document.createElement('span')
          span.textContent = text
          span.style.position = 'absolute'
          span.style.left = '-9999px'
          span.style.top = '-9999px'
          
          document.body.appendChild(span)
          range.selectNode(span)
          
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
          
          const successful = document.execCommand('copy')
          document.body.removeChild(span)
          selection?.removeAllRanges()
          
          if (successful) {
            resolve(true)
          } else {
            reject(new Error('Range selection copy failed'))
          }
        } catch (err) {
          reject(err)
        }
      })
    ]
    
    for (const method of methods) {
      try {
        await method()
        return true
      } catch (err) {
        continue
      }
    }
    
    throw new Error('All clipboard methods failed')
  }

  const handleRightClick = async (e: React.MouseEvent, ticketId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      await copyToClipboard(ticketId)
      toast("Ticket ID copied", {
        description: `${ticketId} has been copied to clipboard`,
      })
    } catch (err) {
      // KNOWN ISSUE: Safari has strict clipboard API restrictions in development environments
      // This fallback provides alternative methods for users to copy the ticket ID
      // when automatic clipboard access fails
      showSelectableTicketId(ticketId)
    }
  }

  const showSelectableTicketId = (ticketId: string) => {
    toast("Copy Ticket ID", {
      description: "Select and copy the ID below:",
      action: {
        label: ticketId,
        onClick: () => {
          // Try to copy when user clicks the ID in the toast
          copyToClipboard(ticketId).then(() => {
            toast("Ticket ID copied", {
              description: `${ticketId} has been copied to clipboard`,
            })
          }).catch(() => {
            // If still fails, create a temporary input field
            createSelectableInput(ticketId)
          })
        },
      },
    })
  }

  const createSelectableInput = (text: string) => {
    // Create a temporary modal-like overlay with selectable text
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '50%'
    overlay.style.left = '50%'
    overlay.style.transform = 'translate(-50%, -50%)'
    overlay.style.background = 'white'
    overlay.style.border = '2px solid #ccc'
    overlay.style.borderRadius = '8px'
    overlay.style.padding = '20px'
    overlay.style.zIndex = '10000'
    overlay.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'

    const instructions = document.createElement('div')
    instructions.textContent = 'Select and copy the ticket ID:'
    instructions.style.marginBottom = '10px'
    instructions.style.fontSize = '14px'

    const input = document.createElement('input')
    input.value = text
    input.style.width = '200px'
    input.style.padding = '8px'
    input.style.border = '1px solid #ccc'
    input.style.borderRadius = '4px'
    input.style.fontSize = '14px'
    input.readOnly = true

    const closeButton = document.createElement('button')
    closeButton.textContent = 'Close'
    closeButton.style.marginLeft = '10px'
    closeButton.style.padding = '8px 12px'
    closeButton.style.border = '1px solid #ccc'
    closeButton.style.borderRadius = '4px'
    closeButton.style.background = '#f5f5f5'
    closeButton.style.cursor = 'pointer'

    overlay.appendChild(instructions)
    overlay.appendChild(input)
    overlay.appendChild(closeButton)
    document.body.appendChild(overlay)

    // Auto-select the text
    input.focus()
    input.select()

    // Remove overlay when close button is clicked or after 10 seconds
    const removeOverlay = () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay)
      }
    }

    closeButton.onclick = removeOverlay
    setTimeout(removeOverlay, 10000)

    // Remove on click outside
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        removeOverlay()
      }
    }
  }


  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Find tickets"
            value={globalFilter ?? ""}
            onChange={(event) =>
              handleTitleFilter(event.target.value)
            }
            size="small"
            className="max-w-sm"
          />
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-dashed" style={{ borderDashArray: '4px' }}>
            <PlusCircle className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {columns.map((column) => (
              <DropdownMenuItem
                key={column.key}
                onSelect={(e) => e.preventDefault()}
                onClick={() => toggleColumn(column.key)}
                className="px-2 py-1.5 flex items-center justify-between"
              >
                <span className="text-popover-foreground text-sm">{column.label}</span>
                <div className="h-4 w-4 flex items-center justify-center">
                  {visibleColumns[column.key] && (
                    <Check className="h-4 w-4 text-popover-foreground" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
          <Button size="sm" className="flex items-center gap-2" onClick={handleAddTicketClick}>
            Add Ticket
          </Button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden flex">
        {/* Fixed left columns - checkbox, drag handle, and title */}
        <div className="flex-shrink-0 border-r bg-white">
          <Table>
            <TableHeader className="sticky top-0 z-20 bg-background">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10 text-center">
                  <Checkbox 
                    checked={selectedRows.length === table.getFilteredRowModel().rows.length && table.getFilteredRowModel().rows.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < table.getFilteredRowModel().rows.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-10 text-center"></TableHead>
                {visibleColumns.title && (
                  <TableHead className="whitespace-nowrap max-w-[270px] w-[270px]">
                    <SortableHeader onSort={() => table.getColumn('title')?.toggleSorting(table.getColumn('title')?.getIsSorted() === 'asc')}>
                      Title
                    </SortableHeader>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                const ticket = row.original
                return (
                  <TableRow 
                    key={ticket.id}
                  className={`
                    ${hoveredRowId === ticket.id ? "bg-muted/50" : ""}
                    ${draggedItem === ticket.id ? "opacity-50" : ""} 
                    ${dragOverItem === ticket.id ? "bg-blue-100 hover:bg-blue-100" : ""}
                  `}
                  onMouseEnter={() => setHoveredRowId(ticket.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  onDragOver={(e) => handleDragOver(e, ticket.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, ticket.id)}
                  onContextMenu={(e) => handleRightClick(e, ticket.id)}
                >
                  <TableCell className="w-10 text-center py-1 relative">
                    <div className="flex justify-center">
                      <Checkbox 
                        checked={selectedRows.includes(ticket.id)}
                        onCheckedChange={() => handleRowSelect(ticket.id)}
                      />
                    </div>
                    {hoveredRowId === ticket.id && (
                      <button
                        onClick={() => handlePanelClick(ticket)}
                        className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-sm rounded p-0.5 hover:bg-gray-50 transition-colors"
                        style={{ left: '8px' }}
                      >
                        <PanelRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="w-10 text-center py-1">
                    <div className="flex justify-center">
                      <button
                        draggable
                        onDragStart={() => handleDragStart(ticket.id)}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted/50 rounded transition-colors"
                        aria-label="Drag to reorder"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </TableCell>
                  {visibleColumns.title && (
                    <TableCell className="font-medium py-1 max-w-[270px] w-[270px]">
                      <div className="truncate">{ticket.title}</div>
                    </TableCell>
                  )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Scrollable columns */}
        {visibleScrollableColumns.length > 0 && (
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 z-20 bg-background">
                <TableRow className="hover:bg-transparent">
                  {visibleScrollableColumns.map((column) => {
                    const renderSortableHeader = (label: string, columnKey: string) => (
                      <SortableHeader onSort={() => table.getColumn(columnKey)?.toggleSorting(table.getColumn(columnKey)?.getIsSorted() === 'asc')}>
                        {label}
                      </SortableHeader>
                    )
                    
                    return (
                      <TableHead key={column.key} className={`whitespace-nowrap ${column.width}`}>
                        {column.key === 'opened' ? renderSortableHeader('Opened', 'opened') :
                         column.key === 'origin' ? renderSortableHeader('Origin', 'origin') :
                         <StaticHeader>{column.label}</StaticHeader>}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const ticket = row.original
                  return (
                    <TableRow 
                      key={ticket.id}
                    className={`
                      ${hoveredRowId === ticket.id ? "bg-muted/50" : ""}
                      ${draggedItem === ticket.id ? "opacity-50" : ""} 
                      ${dragOverItem === ticket.id ? "bg-blue-100 hover:bg-blue-100" : ""}
                    `}
                    onMouseEnter={() => setHoveredRowId(ticket.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                    onDragOver={(e) => handleDragOver(e, ticket.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, ticket.id)}
                    onContextMenu={(e) => handleRightClick(e, ticket.id)}
                  >
                    {visibleColumns.id && (
                      <TableCell className="py-1 whitespace-nowrap">
                        <div className="text-sm text-muted-foreground">{ticket.id}</div>
                      </TableCell>
                    )}
                    {visibleColumns.opened && (
                      <TableCell className="py-1 whitespace-nowrap">
                        <div className="text-foreground font-medium">{ticket.opened.date}</div>
                      </TableCell>
                    )}
                    {visibleColumns.origin && (
                      <TableCell className="py-1 whitespace-nowrap">
                        <div className="text-muted-foreground text-sm">{ticket.opened.journey}</div>
                      </TableCell>
                    )}
                    {visibleColumns.status && (
                      <TableCell className="py-1 whitespace-nowrap">
                        <TagList 
                          items={ticket.status}
                          variant="chart-primary"
                          onRemoveTag={(tag) => removeStatusTag(ticket.id, tag)}
                          onAddTag={(tag) => addStatusTag(ticket.id, tag)}
                          availableOptions={availableStatusOptions}
                          columnKey="status"
                          allowColorSelection={true}
                          globalTagColors={globalTagColors}
                          onSetGlobalTagColor={handleSetGlobalTagColor}
                        />
                      </TableCell>
                    )}
                    {visibleColumns.actions && (
                      <TableCell className="py-1 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <CheckCheck className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <AlarmClockMinus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
        </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length} tickets)
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Ticket Details</SheetTitle>
            <SheetDescription>
              View and edit ticket information for {selectedTicket?.title}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet open={isAddTicketSheetOpen} onOpenChange={setIsAddTicketSheetOpen}>
        <SheetContent className="[&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <SheetHeader>
            <SheetTitle>Add Ticket</SheetTitle>
            <SheetDescription>
              Ticket details
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}