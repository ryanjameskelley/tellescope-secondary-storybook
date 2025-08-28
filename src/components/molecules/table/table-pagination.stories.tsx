import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TablePagination } from './table-pagination'

const meta: Meta<typeof TablePagination> = {
  title: 'Molecules/Table/TablePagination',
  component: TablePagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onPageChange: { action: 'page changed' },
    onRowsPerPageChange: { action: 'rows per page changed' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ContactsTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    
    const totalItems = 145
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }
    
    const handleRowsPerPageChange = (rows: number) => {
      setItemsPerPage(rows)
      setCurrentPage(1) // Reset to first page when changing page size
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Contacts table pagination</div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemTypeName="contacts"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage < totalPages}
        />
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Current page:</strong> {currentPage} of {totalPages}</div>
          <div><strong>Items per page:</strong> {itemsPerPage}</div>
          <div><strong>Showing items:</strong> {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</div>
        </div>
      </div>
    )
  },
}

export const TicketsTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    
    const totalItems = 87
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }
    
    const handleRowsPerPageChange = (rows: number) => {
      setItemsPerPage(rows)
      setCurrentPage(1) // Reset to first page when changing page size
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Tickets table pagination</div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemTypeName="tickets"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage < totalPages}
        />
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Current page:</strong> {currentPage} of {totalPages}</div>
          <div><strong>Items per page:</strong> {itemsPerPage}</div>
          <div><strong>Showing items:</strong> {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</div>
        </div>
      </div>
    )
  },
}

export const WithoutRowsPerPage: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(2)
    
    const totalItems = 50
    const itemsPerPage = 10
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Without rows per page selector</div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemTypeName="items"
          onPageChange={handlePageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage < totalPages}
          showRowsPerPage={false}
        />
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Fixed page size:</strong> {itemsPerPage} items per page</div>
        </div>
      </div>
    )
  },
}

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    totalItems: 95,
    itemsPerPage: 10,
    itemTypeName: "users",
    canPreviousPage: false,
    canNextPage: true,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">First page (Previous disabled)</div>
        <TablePagination {...args} />
      </div>
    )
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    totalItems: 48,
    itemsPerPage: 10,
    itemTypeName: "orders",
    canPreviousPage: true,
    canNextPage: false,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Last page (Next disabled)</div>
        <TablePagination {...args} />
      </div>
    )
  },
}

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 5,
    itemsPerPage: 10,
    itemTypeName: "results",
    canPreviousPage: false,
    canNextPage: false,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
  },
  render: (args) => {
    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Single page (both buttons disabled)</div>
        <TablePagination {...args} />
      </div>
    )
  },
}

export const CustomRowsOptions: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    
    const totalItems = 1000
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }
    
    const handleRowsPerPageChange = (rows: number) => {
      setItemsPerPage(rows)
      setCurrentPage(1)
    }

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Custom rows per page options</div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemTypeName="records"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage < totalPages}
          rowsPerPageOptions={[25, 50, 100, 250]}
        />
        <div className="p-4 pt-0 text-xs text-muted-foreground">
          <div><strong>Large dataset:</strong> {totalItems} total records</div>
          <div><strong>Custom options:</strong> 25, 50, 100, 250 per page</div>
        </div>
      </div>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [items, setItems] = useState(
      Array.from({ length: 37 }, (_, i) => `Item ${i + 1}`)
    )
    
    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    
    const handlePageChange = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }
    
    const handleRowsPerPageChange = (rows: number) => {
      setItemsPerPage(rows)
      setCurrentPage(1)
    }

    const addItems = () => {
      const newItems = Array.from(
        { length: 5 },
        (_, i) => `Item ${items.length + i + 1}`
      )
      setItems([...items, ...newItems])
    }

    const removeItems = () => {
      if (items.length > 5) {
        setItems(items.slice(0, -5))
        // Adjust current page if needed
        const newTotalPages = Math.ceil((items.length - 5) / itemsPerPage)
        if (currentPage > newTotalPages) {
          setCurrentPage(Math.max(1, newTotalPages))
        }
      }
    }

    const currentItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )

    return (
      <div className="border rounded-lg bg-card w-full">
        <div className="text-sm text-muted-foreground mb-2 p-4 pb-0">Interactive demo</div>
        <div className="p-4 pb-0">
          <div className="flex gap-2 mb-4">
            <button
              onClick={addItems}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Add 5 Items
            </button>
            <button
              onClick={removeItems}
              className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
              disabled={items.length <= 5}
            >
              Remove 5 Items
            </button>
          </div>
        </div>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemTypeName="items"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          canPreviousPage={currentPage > 1}
          canNextPage={currentPage < totalPages}
        />
        <div className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
          <div><strong>Current page items:</strong> {currentItems.join(', ')}</div>
          <div><strong>Page range:</strong> {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</div>
        </div>
      </div>
    )
  },
}