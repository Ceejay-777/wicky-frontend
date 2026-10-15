import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border-[1.5px] border-transparent font-sans font-semibold whitespace-nowrap transition-[background-color,color,transform] duration-(--duration-fast) outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-tomato [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-tomato text-on-tomato hover:bg-tomato/90",
        outline: "border-ink bg-transparent text-ink hover:bg-kraft",
        secondary: "border-ink bg-kraft text-ink hover:bg-kraft/70",
        ghost: "text-ink hover:bg-kraft",
        destructive: "border-tomato bg-transparent text-tomato hover:bg-tomato/10",
        link: "min-h-11 text-cobalt underline underline-offset-4 hover:text-ink",
      },
      // Every size keeps the 44px minimum touch target.
      size: {
        default: "h-14 px-5 text-[17px]",
        lg: "h-14 px-5 text-[17px]",
        sm: "h-11 px-4 text-[15px]",
        xs: "h-11 px-3 text-sm",
        icon: "size-11",
        "icon-lg": "size-12",
        "icon-sm": "size-11",
        "icon-xs": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
