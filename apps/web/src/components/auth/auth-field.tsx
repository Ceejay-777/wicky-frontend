import { Field } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

type AuthFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  rightSlot?: React.ReactNode;
};

export function AuthField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  error,
  rightSlot,
}: AuthFieldProps) {
  return (
    <Field.Root
      data-invalid={error ? "" : undefined}
      className="flex flex-col gap-2"
    >
      <div className="flex items-baseline justify-between gap-2">
        <Field.Label
          htmlFor={name}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          {label}
        </Field.Label>
        {rightSlot}
      </div>
      <Field.Control
        render={(props) => (
          <input
            {...props}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            className={cn(
              "h-12 w-full border border-ink bg-paper px-3 text-[15px] text-ink",
              "font-body placeholder:text-muted-foreground",
              "outline-none transition-shadow rounded-none",
              "focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              "disabled:bg-surface disabled:text-muted-foreground disabled:opacity-50",
              "data-[invalid]:border-oxblood data-[invalid]:ring-2 data-[invalid]:ring-oxblood data-[invalid]:ring-offset-2"
            )}
          />
        )}
      />
      {error ? (
        <p
          role="alert"
          className="font-mono text-[11px] text-oxblood"
        >
          {error}
        </p>
      ) : null}
    </Field.Root>
  );
}
