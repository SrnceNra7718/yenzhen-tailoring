'use client'

import * as React from 'react'

const SelectContext = React.createContext<{
  value: string
  onChange: (value: string) => void
} | null>(null)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onValueChange, children, className, ...props }, ref) => (
    <SelectContext.Provider value={{ value, onChange: onValueChange }}>
      <select
        ref={ref}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          'flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground transition-colors appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </SelectContext.Provider>
  )
)
Select.displayName = 'Select'

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
  </button>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = ({
  placeholder,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }) => {
  const context = React.useContext(SelectContext)
  return (
    <span {...props}>
      {context?.value || placeholder}
    </span>
  )
}
SelectValue.displayName = 'SelectValue'

const SelectContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-md',
      className
    )}
    {...props}
  />
)
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, value, children, ...props }, ref) => (
  <option
    ref={ref}
    value={value}
    className={cn(
      'relative flex w-full cursor-default select-none items-center py-2 pl-4 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
      className
    )}
    {...props}
  >
    {children}
  </option>
))
SelectItem.displayName = 'SelectItem'

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m6 8 4 4 4-4" />
    </svg>
  )
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ')
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }