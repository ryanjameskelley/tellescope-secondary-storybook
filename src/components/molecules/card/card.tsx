"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card as UICard,
  CardAction as UICardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface CardAction {
  label: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onClick?: () => void
  href?: string
}

export interface CardProps {
  title?: string
  description?: string
  headerAction?: CardAction
  footerActions?: CardAction[]
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "secondary"
  size?: "sm" | "default" | "lg"
}

const sizeClasses = {
  sm: "max-w-xs",
  default: "max-w-sm", 
  lg: "max-w-md"
}

export function Card({
  title,
  description,
  headerAction,
  footerActions = [],
  children,
  className = "",
  variant = "default",
  size = "default"
}: CardProps) {
  const cardVariantClass = variant === "outline" 
    ? "border-2" 
    : variant === "secondary"
    ? "bg-secondary"
    : ""

  return (
    <UICard className={`w-full ${sizeClasses[size]} ${cardVariantClass} ${className}`}>
      {(title || description || headerAction) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {headerAction && (
            <UICardAction>
              <Button
                variant={headerAction.variant || "link"}
                size="sm"
                onClick={headerAction.onClick}
                asChild={!!headerAction.href}
              >
                {headerAction.href ? (
                  <a href={headerAction.href}>{headerAction.label}</a>
                ) : (
                  headerAction.label
                )}
              </Button>
            </UICardAction>
          )}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footerActions.length > 0 && (
        <CardFooter className="flex-col gap-2">
          {footerActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "default"}
              className="w-full"
              onClick={action.onClick}
              asChild={!!action.href}
            >
              {action.href ? (
                <a href={action.href}>{action.label}</a>
              ) : (
                action.label
              )}
            </Button>
          ))}
        </CardFooter>
      )}
    </UICard>
  )
}