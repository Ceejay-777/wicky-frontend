"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiRequestError } from "@wicky/api-client";
import { useMediaQuery } from "@wicky/hooks";
import { Button } from "@/components/ui/button";
import {
  DialogRoot,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DrawerRoot,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { AuthField } from "@/components/auth/auth-field";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { createSubject } from "@/lib/learning/service";
import {
  subjectCreateSchema,
  type SubjectCreateValues,
} from "@/lib/learning/schemas";

type AddSubjectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFull: boolean;
};

export function AddSubjectModal({
  open,
  onOpenChange,
  isFull,
}: AddSubjectModalProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [alertMessage, setAlertMessage] = useState<string | null>(
    isFull
      ? "You've reached the limit of 5 active subjects. You cannot add a new one until one is completed."
      : null,
  );
  const [isError, setIsError] = useState(isFull);

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<SubjectCreateValues>({
    resolver: zodResolver(subjectCreateSchema),
    mode: "onBlur",
    defaultValues: { name: "" },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
      setAlertMessage(isFull ? "You've reached the limit of 5 active subjects. You cannot add a new one until one is completed." : null);
      setIsError(isFull);
    }
  };

  const onSubmit = handleSubmit((values) => {
    setAlertMessage(null);
    setIsError(false);
    startTransition(async () => {
      try {
        const res = await createSubject(values.name);
        if (res.action === "resolved") {
          handleOpenChange(false);
          router.push(`/subjects/${res.subject.id}`);
          router.refresh();
        } else if (res.action === "narrow") {
          setAlertMessage("Subject name is too broad. " + res.suggestion);
          setIsError(false);
        }
      } catch (err) {
        if (err instanceof ApiRequestError) {
          setAlertMessage(err.message || "Something went wrong.");
          setIsError(true);
        } else {
          setAlertMessage("Network error. Please try again.");
          setIsError(true);
        }
      }
    });
  });

  const formContent = (
    // Only reachable after hydration (it lives in a modal), so `action` runs the validated handler.
    <form action={() => onSubmit()} noValidate className="flex flex-col gap-5">
      {alertMessage ? (
        <AuthFormAlert title={alertMessage} />
      ) : null}

      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <AuthField
            name="name"
            label="Subject name"
            type="text"
            placeholder="e.g. The American Revolution"
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        variant="default"
        size="lg"
        loading={isPending}
        disabled={isFull && isError}
        className="h-12 w-full font-mono text-[11px] uppercase tracking-[0.04em] rounded-none"
      >
        Create subject
      </Button>
    </form>
  );

  if (isDesktop) {
    return (
      <DialogRoot open={open} onOpenChange={handleOpenChange}>
        <DialogPopup>
          <DialogTitle className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            Add a subject
          </DialogTitle>
          <DialogDescription className="sr-only">
            Create a new subject to start learning.
          </DialogDescription>
          <div className="mt-5 border-t border-ink pt-5">
            {formContent}
          </div>
        </DialogPopup>
      </DialogRoot>
    );
  }

  return (
    <DrawerRoot open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <div className="px-4 py-6">
          <DrawerTitle className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            Add a subject
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Create a new subject to start learning.
          </DrawerDescription>
          <div className="mt-5 border-t border-ink pt-5">
            {formContent}
          </div>
        </div>
      </DrawerContent>
    </DrawerRoot>
  );
}
