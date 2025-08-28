"use client"

import * as React from "react"
import { TableSearch, type TableSearchProps } from "./table-search"
import { TableActions, type TableActionsProps } from "./table-actions"

export interface TableControlsProps {
  search?: TableSearchProps
  actions?: TableActionsProps
  className?: string
}

export function TableControls({
  search,
  actions,
  className = ""
}: TableControlsProps) {
  return (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <div className="flex-1">
        {search && <TableSearch {...search} />}
      </div>
      <div className="flex-shrink-0">
        {actions && <TableActions {...actions} />}
      </div>
    </div>
  )
}