import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = [
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold',
  'ring-offset-background transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
]

const variants = {
  default: 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20',
  outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
}

const sizes = {
  default: 'h-11 px-6 py-2',
  sm: 'h-9 rounded-full px-4 text-xs',
  lg: 'h-12 rounded-full px-8 text-base',
  icon: 'h-10 w-10',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          ...buttonVariants,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
