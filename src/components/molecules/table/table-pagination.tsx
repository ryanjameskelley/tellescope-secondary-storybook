"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface TablePaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  itemTypeName: string
  showRowsPerPage?: boolean
  rowsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  canPreviousPage: boolean
  canNextPage: boolean
  className?: string
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemTypeName,
  showRowsPerPage = true,
  rowsPerPageOptions = [5, 10, 20, 50],
  onPageChange,
  onRowsPerPageChange,
  canPreviousPage,
  canNextPage,
  className = ""
}: TablePaginationProps) {
  const handlePreviousPage = () => {
    if (canPreviousPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (canNextPage) {
      onPageChange(currentPage + 1)
    }
  }

  const handleRowsPerPageChange = (value: string) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(Number(value))
    }
  }

  return (
    <div className={`flex items-center justify-end space-x-2 py-4 ${className}`}>
      <div className="text-muted-foreground flex-1 text-sm">
        Page {currentPage} of {totalPages} ({totalItems} {itemTypeName})
      </div>
      <div className="flex items-center space-x-4">
        {showRowsPerPage && onRowsPerPageChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleRowsPerPageChange}
            >
              <SelectTrigger className="w-16" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rowsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}