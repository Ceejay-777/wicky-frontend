"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DialogRoot, DialogPopup, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { removeSubject } from "@/lib/learning/service";

export function RemoveSubject({ subjectId, name }: { subjectId: number; name: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const confirm = () =>
    start(async () => {
      try {
        setError(null);
        await removeSubject(subjectId);
        router.replace("/");
        router.refresh();
      } catch {
        setError("We could not remove it. Check your connection and try again.");
      }
    });

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 px-3 text-sm font-semibold text-tomato underline underline-offset-4"
        >
          Remove this subject
        </button>
      </div>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogPopup className="max-w-sm">
          <DialogTitle className="line-clamp-2 text-[28px] [overflow-wrap:break-word]">Remove {name}?</DialogTitle>
          <DialogDescription className="mt-2 text-ink-2">
            It leaves your passport and frees a slot. You can add it again later.
          </DialogDescription>
          {error && <p role="alert" className="mt-3 text-sm font-medium text-tomato">{error}</p>}
          <div className="mt-5 flex flex-col gap-2.5">
            <Button type="button" variant="destructive" size="sm" loading={pending} onClick={confirm}>
              Remove subject
            </Button>
            <Button type="button" variant="outline" size="sm" disabled={pending} onClick={() => setOpen(false)}>
              Keep it
            </Button>
          </div>
        </DialogPopup>
      </DialogRoot>
    </>
  );
}
