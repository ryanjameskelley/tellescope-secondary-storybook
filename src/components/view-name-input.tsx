import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ViewNameInputProps {
  viewType: "Table" | "Board"
  onConfirm: (name: string, type: "Table" | "Board") => void
  onCancel: () => void
}

export function ViewNameInput({ viewType, onConfirm, onCancel }: ViewNameInputProps) {
  const [name, setName] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onConfirm(name.trim(), viewType)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel()
    }
  }

  React.useEffect(() => {
    // Focus the input when component mounts
    const input = document.querySelector('input[data-view-name-input]') as HTMLInputElement
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-popover">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">Create New {viewType}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Enter a name for your new {viewType.toLowerCase()} view. Press Enter to add it to available views.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            data-view-name-input
            placeholder={`${viewType} name...`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9"
          />
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="sm"
              disabled={!name.trim()}
            >
              Add View
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}