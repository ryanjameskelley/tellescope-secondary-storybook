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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TableSearch,
  TableActions,
  TablePagination,
  RowSelector,
  DraggableRowHandle,
  TableHeaderSection,
  TagSelector,
  TagList,
  type HeaderColumn,
  type TagSelectorOption,
  type TagListProps,
} from "@/components/molecules/table"

// Core configuration interfaces
export interface ActionButtonConfig {
  label: string
  onClick: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ComponentType<any>
}

export interface FilterConfig {
  label: string
  items: Array<{ label: string; count: number }>
  selectedFilters: string[]
  onFilterSelectionChange: (selected: string[]) => void
  placeholder?: string
  showFilter?: boolean
}

export interface ColumnConfig {
  key: string
  label: string
  width?: string
  sortable?: boolean
  visible?: boolean
}

export interface CustomCellRenderer {
  component: React.ComponentType<any>
  props?: Record<string, any>
}

export interface DataTableConfig<TData = any> {
  // Data & Columns
  data: TData[]
  columns: ColumnDef<TData>[]

  // Features
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableSelection?: boolean
  enableDragDrop?: boolean

  // Layout & Display
  fixedColumns?: string[]
  scrollableColumns?: ColumnConfig[]
  visibleColumns?: Record<string, boolean>
  onToggleColumn?: (columnKey: string) => void

  // Search & Filtering
  searchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  filterConfig?: FilterConfig

  // Actions & Interaction
  actionButtons?: ActionButtonConfig[]
  onRowClick?: (row: TData) => void
  onRowSelect?: (rowId: string) => void
  selectedRows?: string[]
  onSelectAll?: () => void

  // Drag & Drop (optional)
  onDragStart?: (itemId: string) => void
  onDragEnd?: () => void
  onDrop?: (draggedId: string, targetId: string) => void
  draggedItem?: string | null
  dragOverItem?: string | null

  // Hover states
  hoveredRowId?: string | null
  onRowHover?: (rowId: string | null) => void

  // Custom renderers
  cellRenderers?: Record<string, CustomCellRenderer>
  hoverActions?: Array<{
    icon: React.ComponentType<any>
    onClick: (row: TData) => void
    label?: string
  }>

  // Pagination
  pageSize?: number
  currentPage?: number
  totalItems?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  rowsPerPageOptions?: number[]

  // Row identification
  getRowId?: (row: TData) => string
}

export interface DataTableProps<TData = any> extends DataTableConfig<TData> {
  className?: string
}

export function DataTable<TData = any>({
  data,
  columns: tableColumns,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableSelection = false,
  enableDragDrop = false,
  fixedColumns = [],
  scrollableColumns = [],
  visibleColumns = {},
  onToggleColumn,
  searchPlaceholder = "Search...",
  globalFilter = "",
  onGlobalFilterChange,
  filterConfig,
  actionButtons = [],
  onRowClick,
  onRowSelect,
  selectedRows = [],
  onSelectAll,
  onDragStart,
  onDragEnd,
  onDrop,
  draggedItem,
  dragOverItem,
  hoveredRowId,
  onRowHover,
  cellRenderers = {},
  hoverActions = [],
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
  rowsPerPageOptions = [10, 20, 50, 100],
  getRowId = (row: any) => row.id || String(row),
  className = "",
}: DataTableProps<TData>) {
  // Internal state
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState(globalFilter)
  const [rowSelection, setRowSelection] = React.useState({})
  
  // Use external or internal global filter state
  const activeGlobalFilter = onGlobalFilterChange ? globalFilter : internalGlobalFilter
  const setActiveGlobalFilter = onGlobalFilterChange || setInternalGlobalFilter

  // Create table instance
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnFiltersChange: enableFiltering ? setColumnFilters : undefined,
    onGlobalFilterChange: setActiveGlobalFilter,
    onRowSelectionChange: enableSelection ? setRowSelection : undefined,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      globalFilter: enableFiltering ? activeGlobalFilter : undefined,
      rowSelection: enableSelection ? rowSelection : undefined,
    },
    initialState: {
      pagination: enablePagination ? {
        pageSize,
        pageIndex: currentPage - 1,
      } : undefined,
    },
  })

  // Event handlers
  const handleRowClick = (row: TData) => {
    onRowClick?.(row)
  }

  const handleRowSelect = (rowId: string) => {
    onRowSelect?.(rowId)
  }

  const handleSelectAll = () => {
    onSelectAll?.()
  }

  const handleDragStart = (itemId: string) => {
    onDragStart?.(itemId)
  }

  const handleDragEnd = () => {
    onDragEnd?.()
  }

  const handleDrop = (draggedId: string, targetId: string) => {
    onDrop?.(draggedId, targetId)
  }

  const handleRowHover = (rowId: string | null) => {
    onRowHover?.(rowId)
  }

  // Render custom cell if renderer is provided
  const renderCell = (cell: any, columnKey: string) => {
    const renderer = cellRenderers[columnKey]
    if (renderer) {
      return React.createElement(renderer.component, {
        ...renderer.props,
        value: cell.getValue(),
        row: cell.row.original,
        cell,
      })
    }
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between py-4">
        <TableSearch
          placeholder={searchPlaceholder}
          value={activeGlobalFilter ?? ""}
          onChange={setActiveGlobalFilter}
          showFilter={filterConfig?.showFilter}
          filterLabel={filterConfig?.label}
          filterItems={filterConfig?.items}
          selectedFilters={filterConfig?.selectedFilters}
          onFilterSelectionChange={filterConfig?.onFilterSelectionChange}
          filterPlaceholder={filterConfig?.placeholder}
        />
        
        <TableActions
          columnSelector={onToggleColumn ? {
            columns: scrollableColumns.map(col => ({ 
              key: col.key, 
              label: col.label, 
              width: col.width 
            })),
            visibleColumns,
            onToggleColumn,
          } : undefined}
          addButton={actionButtons.find(btn => btn.label.toLowerCase().includes('add')) ? {
            label: actionButtons.find(btn => btn.label.toLowerCase().includes('add'))!.label,
            onClick: actionButtons.find(btn => btn.label.toLowerCase().includes('add'))!.onClick,
          } : undefined}
        />
      </div>

      {/* Table Container */}
      <div className="border rounded-lg overflow-hidden flex">
        {/* Fixed Columns */}
        {fixedColumns.length > 0 && (
          <div className="flex-shrink-0 border-r bg-white">
            <Table>
              <TableHeader className="sticky top-0 z-20 bg-background">
                <TableRow className="hover:bg-transparent">
                  {enableSelection && (
                    <TableHead className="w-10 text-center">
                      <RowSelector
                        checked={selectedRows.length === table.getFilteredRowModel().rows.length && table.getFilteredRowModel().rows.length > 0}
                        indeterminate={selectedRows.length > 0 && selectedRows.length < table.getFilteredRowModel().rows.length}
                        onCheckedChange={handleSelectAll}
                        showCheckbox={true}
                        showHoverIcon={false}
                      />
                    </TableHead>
                  )}
                  {enableDragDrop && (
                    <TableHead className="w-10 text-center"></TableHead>
                  )}
                  {fixedColumns.map(columnKey => {
                    const column = table.getColumn(columnKey)
                    const colConfig = scrollableColumns.find(c => c.key === columnKey)
                    return (
                      <TableHead key={columnKey} className={colConfig?.width}>
                        {colConfig?.sortable && column ? (
                          <button
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                            className="flex items-center gap-1 hover:bg-muted rounded px-2 py-1 -mx-2 -my-1"
                          >
                            {colConfig.label}
                          </button>
                        ) : (
                          colConfig?.label
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const rowData = row.original
                  const rowId = getRowId(rowData)
                  return (
                    <TableRow
                      key={rowId}
                      className={`
                        ${hoveredRowId === rowId ? "bg-muted/50" : ""}
                        ${draggedItem === rowId ? "opacity-50" : ""} 
                        ${dragOverItem === rowId ? "bg-blue-100 hover:bg-blue-100" : ""}
                        ${onRowClick ? "cursor-pointer" : ""}
                      `}
                      onClick={() => handleRowClick(rowData)}
                      onMouseEnter={() => handleRowHover(rowId)}
                      onMouseLeave={() => handleRowHover(null)}
                    >
                      {enableSelection && (
                        <TableCell className="w-10 text-center py-1 relative">
                          <RowSelector
                            checked={selectedRows.includes(rowId)}
                            onCheckedChange={() => handleRowSelect(rowId)}
                            showCheckbox={true}
                            showHoverIcon={hoverActions.length > 0}
                            isHovered={hoveredRowId === rowId}
                            onHoverIconClick={() => hoverActions[0]?.onClick(rowData)}
                            hoverIconRelativeToParent={true}
                          />
                        </TableCell>
                      )}
                      {enableDragDrop && (
                        <TableCell className="w-10 text-center py-1">
                          <DraggableRowHandle
                            itemId={rowId}
                            onDragStart={() => handleDragStart(rowId)}
                            onDragEnd={handleDragEnd}
                            isDragging={draggedItem === rowId}
                          />
                        </TableCell>
                      )}
                      {fixedColumns.map(columnKey => {
                        const cell = row.getVisibleCells().find(c => c.column.id === columnKey)
                        const colConfig = scrollableColumns.find(c => c.key === columnKey)
                        return (
                          <TableCell key={columnKey} className={`py-1 ${colConfig?.width}`}>
                            {cell ? renderCell(cell, columnKey) : null}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Scrollable Columns */}
        {scrollableColumns.filter(col => visibleColumns[col.key] !== false).length > 0 && (
          <div className="flex-1 overflow-x-auto">
            <Table>
              <TableHeaderSection
                columns={scrollableColumns
                  .filter(col => visibleColumns[col.key] !== false)
                  .map((col): HeaderColumn => ({
                    key: col.key,
                    label: col.label,
                    sortable: col.sortable,
                    onSort: col.sortable 
                      ? () => table.getColumn(col.key)?.toggleSorting(table.getColumn(col.key)?.getIsSorted() === 'asc')
                      : undefined,
                    className: col.width
                  }))}
                showTable={false}
              />
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  const rowData = row.original
                  const rowId = getRowId(rowData)
                  return (
                    <TableRow
                      key={rowId}
                      className={`
                        ${hoveredRowId === rowId ? "bg-muted/50" : ""}
                        ${draggedItem === rowId ? "opacity-50" : ""} 
                        ${dragOverItem === rowId ? "bg-blue-100 hover:bg-blue-100" : ""}
                        ${onRowClick ? "cursor-pointer" : ""}
                      `}
                      onClick={() => handleRowClick(rowData)}
                      onMouseEnter={() => handleRowHover(rowId)}
                      onMouseLeave={() => handleRowHover(null)}
                    >
                      {scrollableColumns
                        .filter(col => visibleColumns[col.key] !== false)
                        .map(col => {
                          const cell = row.getVisibleCells().find(c => c.column.id === col.key)
                          return (
                            <TableCell key={col.key} className={`py-1 whitespace-nowrap ${col.width}`}>
                              {cell ? renderCell(cell, col.key) : null}
                            </TableCell>
                          )
                        })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {enablePagination && (
        <TablePagination
          currentPage={table.getState().pagination?.pageIndex ? table.getState().pagination.pageIndex + 1 : 1}
          totalPages={table.getPageCount()}
          totalItems={table.getFilteredRowModel().rows.length}
          itemsPerPage={table.getState().pagination?.pageSize || pageSize}
          itemTypeName="items"
          onPageChange={onPageChange || ((page) => table.setPageIndex(page - 1))}
          onRowsPerPageChange={onPageSizeChange || ((size) => table.setPageSize(size))}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </div>
  )
}