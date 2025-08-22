import * as React from "react"
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
  CommandShortcut,
} from "@/components/ui/command"

interface ViewsCommandMenuProps {
  activeTab: string
  onTabChange: (value: string) => void
  onClose: () => void
  additionalViews?: Array<{ id: string; name: string; type: "Table" | "Board" }>
}

export function ViewsCommandMenu({ activeTab, onTabChange, onClose, additionalViews = [] }: ViewsCommandMenuProps) {
  const handleSelect = React.useCallback((value: string) => {
    const tabMapping: { [key: string]: string } = {
      "Queues": "queues",
      "Tickets": "tickets", 
      "Board": "board",
      "Table 1": "table1",
      "Table 2": "table2",
      "Table 3": "table3",
      "Table 4": "table4",
      "Table 5": "table5"
    }
    
    // Add additional views to the mapping
    additionalViews.forEach(view => {
      tabMapping[view.name] = view.id
    })
    
    if (tabMapping[value]) {
      onTabChange(tabMapping[value])
      onClose()
    }
  }, [onTabChange, onClose, additionalViews])

  // Known issue: Safari keyboard shortcuts are not working properly due to event handling differences
  // Need to investigate Safari-specific event capture and metaKey detection issues
  // For now, we disable shortcuts in Safari to avoid broken functionality
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  // Handle keyboard shortcuts (disabled in Safari for now)
  React.useEffect(() => {
    if (isSafari) return // Skip keyboard shortcuts in Safari until fixed
    
    const handleKeydown = (e: KeyboardEvent) => {
      const isCommandPressed = e.metaKey || e.ctrlKey
      
      if (isCommandPressed) {
        const shortcutMap: { [key: string]: string } = {
          '1': 'Queues',
          '2': 'Tickets',
          '3': 'Board',
          '4': 'Table 1',
          '5': 'Table 2',
          '6': 'Table 3',
          '7': 'Table 4',
          '8': 'Table 5'
        }
        
        // Add shortcuts for additional views
        additionalViews.forEach((view, index) => {
          const position = 9 + index
          if (position <= 9) {
            shortcutMap[position.toString()] = view.name
          } else {
            const letterIndex = Math.floor((position - 10) / 9)
            const numberIndex = ((position - 10) % 9) + 1
            const letter = String.fromCharCode(65 + letterIndex).toLowerCase()
            shortcutMap[`${letter}${numberIndex}`] = view.name
          }
        })

        if (shortcutMap[e.key]) {
          e.preventDefault()
          e.stopPropagation()
          handleSelect(shortcutMap[e.key])
        }
      }
    }

    document.addEventListener('keydown', handleKeydown, true)
    return () => document.removeEventListener('keydown', handleKeydown, true)
  }, [handleSelect, additionalViews, isSafari])

  // Generate command shortcut based on position
  const getCommandShortcut = (position: number) => {
    if (position <= 9) {
      return `⌘${position}`
    } else {
      const letterIndex = Math.floor((position - 10) / 9)
      const numberIndex = ((position - 10) % 9) + 1
      const letter = String.fromCharCode(65 + letterIndex) // A, B, C, etc.
      return `⌘${letter}${numberIndex}`
    }
  }
  return (
    <div className="relative">
      <Command className="rounded-lg border max-w-lg bg-popover">
        <CommandInput placeholder="Type a command or search" className="h-12 p-3" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Views" className="p-1">
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'queues' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Queues')}
          >
            <LayoutList className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'queues' ? 'text-accent-foreground' : 'text-foreground'}>Queues</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(1)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'tickets' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Tickets')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'tickets' ? 'text-accent-foreground' : 'text-foreground'}>Tickets</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(2)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'board' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Board')}
          >
            <Columns3 className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'board' ? 'text-accent-foreground' : 'text-foreground'}>Board</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(3)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'table1' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Table 1')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'table1' ? 'text-accent-foreground' : 'text-foreground'}>Table 1</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(4)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'table2' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Table 2')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'table2' ? 'text-accent-foreground' : 'text-foreground'}>Table 2</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(5)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'table3' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Table 3')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'table3' ? 'text-accent-foreground' : 'text-foreground'}>Table 3</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(6)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'table4' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Table 4')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'table4' ? 'text-accent-foreground' : 'text-foreground'}>Table 4</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(7)}</CommandShortcut>}
          </CommandItem>
          <CommandItem 
            className={`rounded-sm p-3 ${activeTab === 'table5' ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
            onSelect={() => handleSelect('Table 5')}
          >
            <Table className="w-4 h-4 text-muted-foreground" />
            <span className={activeTab === 'table5' ? 'text-accent-foreground' : 'text-foreground'}>Table 5</span>
            {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(8)}</CommandShortcut>}
          </CommandItem>
          {additionalViews.map((view, index) => {
            const position = 9 + index
            const isActive = activeTab === view.id
            return (
              <CommandItem 
                key={view.id}
                className={`rounded-sm p-3 ${isActive ? '!bg-accent data-[selected]:!bg-accent' : 'data-[selected]:!bg-transparent'}`}
                onSelect={() => handleSelect(view.name)}
              >
                {view.type === "Table" ? <Table className="w-4 h-4 text-muted-foreground" /> : <Columns3 className="w-4 h-4 text-muted-foreground" />}
                <span className={isActive ? 'text-accent-foreground' : 'text-foreground'}>{view.name}</span>
                {!isSafari && <CommandShortcut className="text-muted-foreground text-xs">{getCommandShortcut(position)}</CommandShortcut>}
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
    </div>
  )
}