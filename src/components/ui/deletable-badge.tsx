import * as React from "react";
import { Badge, type BadgeProps } from "./badge";
import { X } from "lucide-react";

export interface DeletableBadgeProps extends BadgeProps {
  onDelete?: () => void;
}

export const DeletableBadge = ({ 
  children, 
  onDelete, 
  variant = "secondary",
  ...props 
}: DeletableBadgeProps) => (
  <Badge variant={variant} {...props}>
    {children}
    {onDelete && (
      <button
        onClick={onDelete}
        className="ml-1 transition-colors"
        aria-label={`Remove ${children}`}
      >
        <X className="h-2.5 w-2.5" />
      </button>
    )}
  </Badge>
);