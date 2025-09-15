import React from 'react'
import { cn } from '@/lib/utils'

export interface LoadingScreenProps {
  className?: string
  text?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'fullscreen' | 'centered' | 'inline'
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  className,
  text = 'Loading...',
  size = 'md',
  variant = 'fullscreen'
}) => {
  const containerClasses = cn(
    'flex items-center justify-center',
    variant === 'fullscreen' && 'min-h-screen bg-gray-50',
    variant === 'centered' && 'w-full h-full',
    variant === 'inline' && 'p-4',
    className
  )

  const spinnerSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const spinnerSize = spinnerSizes[size]

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className={cn(spinnerSize, "border-4 border-gray-200 rounded-full")}></div>
          <div className={cn(
            spinnerSize,
            "border-4 border-black rounded-full absolute top-0 left-0 animate-spin border-t-transparent"
          )}></div>
        </div>
        {text && (
          <p className="mt-4 text-gray-600 animate-pulse">{text}</p>
        )}
      </div>
    </div>
  )
}