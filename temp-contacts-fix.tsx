// Simplified contacts table structure
return (
  <div className="w-full">
    <div className="flex items-center justify-between py-4">
      {/* Search and View controls */}
    </div>
    <div className="border rounded-lg overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      <Table>
        <TableHeader className="sticky top-0 z-20 bg-background">
          <TableRow className="hover:bg-transparent">
            {visibleColumns.name && (
              <TableHead className="whitespace-nowrap w-48">
                <SortableHeader onSort={() => table.getColumn('name')?.toggleSorting(table.getColumn('name')?.getIsSorted() === 'asc')}>
                  Name
                </SortableHeader>
              </TableHead>
            )}
            {visibleScrollableColumns.map((column) => (
              <TableHead key={column.key} className="whitespace-nowrap">
                <StaticHeader>{column.label}</StaticHeader>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const contact = row.original
            return (
              <TableRow key={contact.id}>
                {visibleColumns.name && (
                  <TableCell className="font-medium py-1 relative whitespace-nowrap w-48">
                    {contact.name}
                  </TableCell>
                )}
                {/* Other columns */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
    <div className="sticky bottom-0 bg-background border-t border-border flex items-center justify-end space-x-2 py-4">
      {/* Pagination */}
    </div>
  </div>
)