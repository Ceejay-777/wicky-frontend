import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type AuthFormAlertProps = {
  title: string;
  description?: string;
};

export function AuthFormAlert({ title, description }: AuthFormAlertProps) {
  return (
    <Alert className="rounded-none border border-oxblood bg-accent text-ink">
      <AlertTitle className="font-display text-[15px] font-semibold text-oxblood">
        {title}
      </AlertTitle>
      {description ? (
        <AlertDescription className="text-[13px] text-muted-foreground mt-1">
          {description}
        </AlertDescription>
      ) : null}
    </Alert>
  );
}
