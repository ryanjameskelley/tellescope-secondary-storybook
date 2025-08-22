import {
  LayoutList,
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
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border max-w-lg bg-popover">
      <CommandInput placeholder="Type a command or search" className="h-12 p-3" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Views" className="p-1">
          <CommandItem className="rounded-sm p-3 bg-accent">
            <LayoutList className="h-4 text-muted-foreground" />
            <span className="text-accent-foreground">Queues</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Tickets</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Columns3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator className="h-0 px-px" />
        <CommandGroup heading="Add View" className="p-1">
          <CommandItem className="rounded-sm p-3">
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Table</span>
            <CommandShortcut className="text-muted-foreground text-xs">⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem className="rounded-sm p-3">
            <Columns3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Board</span>
            <CommandShortcut className="text-muted-foreground text-xs">⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}