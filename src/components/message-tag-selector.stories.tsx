import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Tag, X, Plus } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface TagData {
  id: string
  name: string
  color: string
}

interface MessageTagSelectorProps {
  availableTags: TagData[]
  selectedTags: string[]
  onTagsChange: (selectedTags: string[]) => void
  onCreateTag: (tag: Omit<TagData, 'id'>) => void
  onDeleteTag: (tagId: string) => void
}

function MessageTagSelector({ 
  availableTags, 
  selectedTags, 
  onTagsChange, 
  onCreateTag, 
  onDeleteTag 
}: MessageTagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#3b82f6")
  const [isCreating, setIsCreating] = useState(false)

  const selectedTagData = availableTags.filter(tag => selectedTags.includes(tag.id))
  const visibleTags = selectedTagData.slice(0, 2)
  const remainingCount = Math.max(0, selectedTagData.length - 2)

  const handleTagToggle = (tagId: string) => {
    const isCurrentlySelected = selectedTags.includes(tagId)
    if (isCurrentlySelected) {
      onTagsChange(selectedTags.filter(id => id !== tagId))
    } else {
      onTagsChange([...selectedTags, tagId])
    }
  }

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag({
        name: newTagName.trim(),
        color: newTagColor
      })
      setNewTagName("")
      setNewTagColor("#3b82f6")
      setIsCreating(false)
    }
  }

  const getAccessibleTagColors = (color: string) => {
    return {
      backgroundColor: color,
      textColor: '#ffffff',
      borderColor: color
    }
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-1 cursor-pointer min-h-[32px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTagData.length === 0 ? (
          <div className="w-6 h-6 hover:bg-muted transition-colors rounded-md flex items-center justify-center">
            <Tag className="w-3 h-3 text-muted-foreground" />
          </div>
        ) : (
          <>
            {visibleTags.map((tag) => {
              const { backgroundColor, textColor, borderColor } = getAccessibleTagColors(tag.color);
              return (
                <Badge 
                  key={tag.id}
                  variant="secondary" 
                  className="text-xs border"
                  style={{ 
                    backgroundColor,
                    borderColor,
                    color: textColor
                  }}
                >
                  {tag.name}
                </Badge>
              );
            })}
            {remainingCount > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingCount}
              </Badge>
            )}
          </>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-popover border rounded-md shadow-md z-50">
          <div className="p-3 border-b">
            <div className="flex gap-2">
              <Input
                placeholder="Search tags..."
                className="h-8"
              />
              <Button 
                size="sm" 
                onClick={() => setIsCreating(true)}
                className="h-8 px-3"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {isCreating && (
            <div className="p-3 border-b space-y-3">
              <Input
                placeholder="Tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="h-8"
                autoFocus
              />
              <div className="flex justify-between items-start">
                <div className="flex-shrink-0">
                  <HexColorPicker color={newTagColor} onChange={setNewTagColor} />
                </div>
                <div className="flex flex-col gap-2 ml-6">
                  <Button size="sm" onClick={handleCreateTag} disabled={!newTagName.trim()}>
                    Create
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setIsCreating(false)
                    setNewTagName("")
                    setNewTagColor("#3b82f6")
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-h-64 overflow-y-auto">
            {availableTags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
                <div 
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: tag.color }}
                />
                <div 
                  className="flex-1 min-w-0 cursor-pointer" 
                  onClick={() => handleTagToggle(tag.id)}
                >
                  <p className="text-sm font-medium truncate">{tag.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedTags.includes(tag.id) && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteTag(tag.id)
                    }}
                    className="h-6 w-6 p-0 hover:bg-muted"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof MessageTagSelector> = {
  title: "Components/MessageTagSelector",
  component: MessageTagSelector,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof MessageTagSelector>;

const initialTags: TagData[] = [
  { id: "tag1", name: "urgent", color: "#ef4444" },
  { id: "tag2", name: "follow-up", color: "#f97316" },
  { id: "tag3", name: "review", color: "#eab308" },
  { id: "tag4", name: "client", color: "#22c55e" },
  { id: "tag5", name: "meeting", color: "#3b82f6" },
  { id: "tag6", name: "important", color: "#8b5cf6" },
]

export const Default: Story = {
  render: () => {
    const [availableTags, setAvailableTags] = useState<TagData[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<string[]>(["tag1", "tag3"])

    const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
      const newTag = {
        ...tagData,
        id: `tag${Date.now()}`
      }
      setAvailableTags([...availableTags, newTag])
    }

    const handleDeleteTag = (tagId: string) => {
      setAvailableTags(availableTags.filter(tag => tag.id !== tagId))
      setSelectedTags(selectedTags.filter(id => id !== tagId))
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Message Tag Selector</div>
        <MessageTagSelector
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          onCreateTag={handleCreateTag}
          onDeleteTag={handleDeleteTag}
        />
        <div className="text-xs text-muted-foreground">
          Selected: {selectedTags.length} tags
        </div>
      </div>
    )
  }
};

export const Empty: Story = {
  render: () => {
    const [availableTags, setAvailableTags] = useState<TagData[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
      const newTag = {
        ...tagData,
        id: `tag${Date.now()}`
      }
      setAvailableTags([...availableTags, newTag])
    }

    const handleDeleteTag = (tagId: string) => {
      setAvailableTags(availableTags.filter(tag => tag.id !== tagId))
      setSelectedTags(selectedTags.filter(id => id !== tagId))
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Empty Message Tag Selector</div>
        <MessageTagSelector
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          onCreateTag={handleCreateTag}
          onDeleteTag={handleDeleteTag}
        />
        <div className="text-xs text-muted-foreground">
          Click "+ Tag" to add tags to this message
        </div>
      </div>
    )
  }
};

export const ManyTags: Story = {
  render: () => {
    const [availableTags, setAvailableTags] = useState<TagData[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<string[]>(["tag1", "tag2", "tag3", "tag4", "tag5"])

    const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
      const newTag = {
        ...tagData,
        id: `tag${Date.now()}`
      }
      setAvailableTags([...availableTags, newTag])
    }

    const handleDeleteTag = (tagId: string) => {
      setAvailableTags(availableTags.filter(tag => tag.id !== tagId))
      setSelectedTags(selectedTags.filter(id => id !== tagId))
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Many Tags (shows overflow)</div>
        <MessageTagSelector
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          onCreateTag={handleCreateTag}
          onDeleteTag={handleDeleteTag}
        />
        <div className="text-xs text-muted-foreground">
          Shows first 2 tags + counter for remaining tags
        </div>
      </div>
    )
  }
};

export const Interactive: Story = {
  render: () => {
    const [availableTags, setAvailableTags] = useState<TagData[]>(initialTags)
    const [selectedTags, setSelectedTags] = useState<string[]>(["tag2"])

    const handleCreateTag = (tagData: Omit<TagData, 'id'>) => {
      const newTag = {
        ...tagData,
        id: `tag${Date.now()}`
      }
      setAvailableTags([...availableTags, newTag])
    }

    const handleDeleteTag = (tagId: string) => {
      setAvailableTags(availableTags.filter(tag => tag.id !== tagId))
      setSelectedTags(selectedTags.filter(id => id !== tagId))
    }

    return (
      <div className="p-8 space-y-4">
        <div className="text-sm text-muted-foreground">Interactive Tag Management</div>
        <MessageTagSelector
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          onCreateTag={handleCreateTag}
          onDeleteTag={handleDeleteTag}
        />
        <div className="text-xs text-muted-foreground space-y-1">
          <div><strong>Features:</strong></div>
          <div>• Click tags to select/deselect</div>
          <div>• Create new tags with the + button</div>
          <div>• Delete tags with the × button</div>
          <div>• Color-coded tags with accessible contrast</div>
          <div><strong>Selected:</strong> {selectedTags.join(', ') || 'None'}</div>
          <div><strong>Available:</strong> {availableTags.length} tags</div>
        </div>
      </div>
    )
  }
};