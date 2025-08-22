import * as React from "react"
import {
  Table,
  Columns3,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { ViewNameInput } from "./view-name-input"

interface AddViewCommandMenuProps {
  onAddView?: (name: string, type: "Table" | "Board") => void
  onClose?: () => void
}

export function AddViewCommandMenu({ onAddView, onClose }: AddViewCommandMenuProps) {
  const [selectedViewType, setSelectedViewType] = React.useState<"Table" | "Board" | null>(null)

  const handleItemSelect = (type: "Table" | "Board") => {
    setSelectedViewType(type)
  }

  const handleConfirm = (name: string, type: "Table" | "Board") => {
    if (onAddView) {
      onAddView(name, type)
    }
    if (onClose) {
      onClose()
    }
  }

  const handleCancel = () => {
    setSelectedViewType(null)
  }

  if (selectedViewType) {
    return (
      <ViewNameInput
        viewType={selectedViewType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )
  }
  return (
    <div className="relative">
      <Command className="rounded-lg border max-w-lg bg-popover">
        <CommandInput placeholder="Type a command or search" className="h-12 p-3" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Add View" className="p-1">
          <CommandItem 
            className="rounded-sm p-3"
            onSelect={() => handleItemSelect("Table")}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Table</span>
            <CommandShortcut className="text-muted-foreground text-xs">⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem 
            className="rounded-sm p-3"
            onSelect={() => handleItemSelect("Board")}
          >
            <Columns3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
            <CommandShortcut className="text-muted-foreground text-xs">⌘K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
  )
}