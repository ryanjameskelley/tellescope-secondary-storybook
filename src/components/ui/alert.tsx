import * as React from "react"
import { cn } from "@/lib/utils"
import { Popcorn, AlertCircle } from "lucide-react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
  const Icon = variant === "destructive" ? AlertCircle : Popcorn;
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11",
          variant === "destructive"
            ? "border-destructive/50 text-destructive dark:border-destructive bg-background"
            : "bg-background text-foreground",
          className
        )}
        {...props}
      >
        <Icon
          className={cn(
            "absolute left-4 top-4 h-5 w-5 min-h-[20px] min-w-[20px]",
            variant === "destructive"
              ? "text-destructive"
              : "text-foreground"
          )}
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }
)
Alert.displayName = "Alert"

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        "mb-1 font-semibold tracking-tight",
        className,
        // Always apply text-destructive if parent is destructive
        "text-inherit"
      )}
      {...props}
    />
  )
}
AlertTitle.displayName = "AlertTitle"

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm",
        className,
        // Always apply text-destructive if parent is destructive
        "text-inherit"
      )}
      {...props}
    />
  )
}
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
