"use client"

import * as React from "react"
import { SortableHeader, StaticHeader } from "@/components/atoms/table"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface HeaderColumn {
  key: string
  label: string
  sortable?: boolean
  onSort?: () => void
  className?: string
  width?: string
}

export interface TableHeaderSectionProps {
  columns: HeaderColumn[]
  className?: string
  sticky?: boolean
  showTable?: boolean
}

export function TableHeaderSection({ 
  columns, 
  className = "", 
  sticky = true,
  showTable = true 
}: TableHeaderSectionProps) {
  const headerContent = (
    <TableHeader className={`${sticky ? 'sticky top-0 z-20 bg-background' : ''} ${className}`}>
      <TableRow className="hover:bg-transparent">
        {columns.map((column) => (
          <TableHead 
            key={column.key} 
            className={`whitespace-nowrap ${column.width || ''} ${column.className || ''}`}
          >
            {column.sortable ? (
              <SortableHeader onSort={column.onSort}>
                {column.label}
              </SortableHeader>
            ) : (
              <StaticHeader>{column.label}</StaticHeader>
            )}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )

  // Option to render with or without Table wrapper for flexibility
  if (showTable) {
    return (
      <Table>
        {headerContent}
      </Table>
    )
  }

  return headerContent
}