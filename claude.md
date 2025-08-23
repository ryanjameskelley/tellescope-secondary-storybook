# Claude

This file is a placeholder for Claude-related documentation or notes. Add any relevant information about Claude usage, integration, or configuration here.
code:
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CirclePlus, ChevronDown, GripVertical, CheckCheck, Pencil, AlarmClockMinus, Trash, CircleX } from "lucide-react"

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const handleRowSelect = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index))
    } else {
      setSelectedRows([...selectedRows, index])
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2">
          <div className="w-[249px]">
            <Input placeholder="Find" />
          </div>
          <Select>
            <SelectTrigger className="w-[142px]">
              <span className="text-muted-foreground">Columns</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Columns</SelectItem>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="opened">Opened</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="actions">Actions</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <CirclePlus className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="rounded-t-lg overflow-hidden border border-border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[40px] text-center">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[261px]">Header</TableHead>
              <TableHead className="w-[117px]">Opened</TableHead>
              <TableHead className="w-[225px]">Status</TableHead>
              <TableHead className="w-[151px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((row, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Checkbox 
                      checked={selectedRows.includes(index)}
                      onCheckedChange={() => handleRowSelect(index)}
                    />
                  </div>
                </TableCell>
                <TableCell className="w-[40px] text-center">
                  <div className="flex justify-center">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>Truncated ticket title</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-foreground font-medium">MM/DD/YYYY</span>
                    <span className="text-muted-foreground">Journey</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      tag
                      <CircleX className="h-3 w-3" />
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      tag
                      <CircleX className="h-3 w-3" />
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      tag
                      <CircleX className="h-3 w-3" />
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      tag
                      <CircleX className="h-3 w-3" />
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      tag
                      <CircleX className="h-3 w-3" />
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <CheckCheck className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <AlarmClockMinus className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}



cli:
npx shadcn add https://rdhlrr8yducbb6dq.public.blob.vercel-storage.com/figma-to-shadcn/DataTable-XXXcB73g988Wj4Le5DhuyhgIBngwXP.json
