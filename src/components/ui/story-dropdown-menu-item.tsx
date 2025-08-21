import { Check } from "lucide-react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./dropdown-menu";

// Reusable Dropdown Menu Item Component
export function StoryDropdownMenuItem({ 
  children, 
  state = "default", 
  showShortcut = false, 
  shortcut = "⌘P", 
  showCheck = false,
  ...props 
}: {
  children: string;
  state?: "default" | "hovered" | "disabled";
  showShortcut?: boolean;
  shortcut?: string;
  showCheck?: boolean;
} & React.ComponentProps<typeof DropdownMenuItem>) {
  const getProps = () => {
    const baseClassName = showCheck 
      ? "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none min-w-0"
      : "flex justify-between items-center px-2 py-1.5 rounded-sm min-w-0";
    
    switch (state) {
      case "hovered":
        return { 
          className: `${baseClassName} bg-accent text-accent-foreground`,
        };
      case "disabled":
        return { 
          disabled: true,
          className: `${baseClassName} data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
        };
      default:
        return {
          className: baseClassName,
        };
    }
  };

  return (
    <DropdownMenuItem {...getProps()} {...props}>
      {showCheck && (
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <Check className="size-4" />
        </span>
      )}
      <span className="text-sm text-popover-foreground flex-1 min-w-0">{children}</span>
      {showShortcut && !showCheck && (
        <span className="ml-6">
          <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
        </span>
      )}
    </DropdownMenuItem>
  );
}