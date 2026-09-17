"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

const DialogRoot = Dialog.Root;
const DialogTrigger = Dialog.Trigger;
const DialogPortal = Dialog.Portal;
const DialogClose = Dialog.Close;

const DialogBackdrop = React.forwardRef<
  React.ComponentRef<typeof Dialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(({ className, ...props }, ref) => (
  <Dialog.Backdrop
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
DialogBackdrop.displayName = "DialogBackdrop";

const DialogPopup = React.forwardRef<
  React.ComponentRef<typeof Dialog.Popup>,
  React.ComponentPropsWithoutRef<typeof Dialog.Popup>
>(({ className, ...props }, ref) => (
  <Dialog.Portal>
    <DialogBackdrop />
    <Dialog.Popup
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
        "border border-ink bg-muted p-6",
        "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-top-[48%]",
        "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%]",
        className
      )}
      {...props}
    />
  </Dialog.Portal>
));
DialogPopup.displayName = "DialogPopup";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "font-display text-lg font-semibold text-ink",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
};
