"use client";

import * as React from "react";
import { useId, useState } from "react";
import { IconLock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type FieldProps = Omit<React.ComponentProps<"input">, "id"> & {
  /** Sits inside the box, top-left, in the mono label style. */
  label: string;
  error?: string;
  /** Flag the box as wrong without a message (the message lives in a form alert). */
  invalid?: boolean;
  /** Helper text under the box (e.g. the password rule). */
  hint?: string;
  /** Right-hand control inside the box (e.g. a show/hide button). */
  trailing?: React.ReactNode;
  /** Right padding class that keeps text clear of `trailing`. */
  trailingSpace?: string;
  wrapperClassName?: string;
};

// Read-only fields get a dashed border and a lock; errors a 2px tomato border.
function Field({
  label,
  error,
  invalid,
  hint,
  trailing,
  trailingSpace = "pr-3.5",
  readOnly,
  className,
  wrapperClassName,
  ...props
}: FieldProps) {
  const id = useId();
  const noteId = `${id}-note`;
  const note = error ?? hint;
  const flagged = !!error || !!invalid;

  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute top-[9px] right-12 left-3.5 truncate font-mono text-[10px] font-bold tracking-[0.12em] uppercase",
            flagged ? "text-tomato" : "text-muted-ink"
          )}
        >
          {label}
        </label>
        <input
          id={id}
          readOnly={readOnly}
          aria-invalid={flagged || undefined}
          aria-describedby={note ? noteId : undefined}
          className={cn(
            "h-[62px] w-full truncate rounded-md bg-field pt-[25px] pb-1.5 pl-3.5 font-sans text-[17px] font-medium text-ink outline-none",
            "placeholder:text-muted-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
            readOnly ? "border-[1.5px] border-dashed border-ink bg-transparent pr-11 text-ink-2" : trailingSpace,
            !readOnly && (flagged ? "border-2 border-tomato" : "border-[1.5px] border-ink"),
            className
          )}
          {...props}
        />
        {readOnly && (
          <IconLock size={18} stroke={2} aria-hidden="true" className="absolute top-5 right-3.5 text-muted-ink" />
        )}
        {trailing}
      </div>
      {note && (
        <p
          id={noteId}
          role={error ? "alert" : undefined}
          className={cn("mt-1.5 px-0.5 text-[13px] leading-snug", error ? "font-medium text-tomato" : "text-ink-2")}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function PasswordField(props: Omit<FieldProps, "type" | "trailing" | "trailingSpace">) {
  const [shown, setShown] = useState(false);
  return (
    <Field
      {...props}
      type={shown ? "text" : "password"}
      trailingSpace="pr-[70px]"
      trailing={
        <button
          type="button"
          onClick={() => setShown((v) => !v)}
          aria-pressed={shown}
          aria-label={shown ? "Hide password" : "Show password"}
          className="absolute top-2.5 right-1.5 h-11 px-2.5 font-mono text-xs font-bold tracking-[0.1em] text-cobalt underline"
        >
          {shown ? "HIDE" : "SHOW"}
        </button>
      }
    />
  );
}

export { Field, PasswordField };
