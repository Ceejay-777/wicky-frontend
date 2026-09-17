"use client";

import * as React from "react";
import { Drawer } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

const DrawerRoot = Drawer.Root;
const DrawerTrigger = Drawer.Trigger;
const DrawerPortal = Drawer.Portal;
const DrawerClose = Drawer.Close;

const DrawerBackdrop = React.forwardRef<
  React.ComponentRef<typeof Drawer.Backdrop>,
  React.ComponentPropsWithoutRef<typeof Drawer.Backdrop>
>(({ className, ...props }, ref) => (
  <Drawer.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-foreground/40",
      "data-[open]:animate-in data-[open]:fade-in-0",
      "data-[closed]:animate-out data-[closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
DrawerBackdrop.displayName = "DrawerBackdrop";

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof Drawer.Popup>,
  React.ComponentPropsWithoutRef<typeof Drawer.Popup>
>(({ className, ...props }, ref) => (
  <Drawer.Portal>
    <DrawerBackdrop />
    <Drawer.Popup
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col",
        "border border-ink bg-muted",
        "max-h-[85vh]",
        "data-[open]:slide-in-from-bottom",
        "data-[closed]:slide-out-to-bottom",
        className
      )}
      {...props}
    />
  </Drawer.Portal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHandle = React.forwardRef<
  React.ComponentRef<typeof Drawer.Handle>,
  React.ComponentPropsWithoutRef<typeof Drawer.Handle>
>(({ className, ...props }, ref) => (
  <Drawer.Handle
    ref={ref}
    className={cn(
      "mx-auto mt-4 h-1 w-10 rounded-full bg-muted-foreground/30",
      className
    )}
    {...props}
  />
));
DrawerHandle.displayName = "DrawerHandle";

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof Drawer.Title>,
  React.ComponentPropsWithoutRef<typeof Drawer.Title>
>(({ className, ...props }, ref) => (
  <Drawer.Title
    ref={ref}
    className={cn(
      "font-display text-lg font-semibold text-ink",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof Drawer.Description>,
  React.ComponentPropsWithoutRef<typeof Drawer.Description>
>(({ className, ...props }, ref) => (
  <Drawer.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerBackdrop,
  DrawerContent,
  DrawerHandle,
  DrawerTitle,
  DrawerDescription,
};
