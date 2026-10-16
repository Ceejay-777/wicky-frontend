"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm, type FieldValues, type Path, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, ZodTypeDef } from "zod";
import type { ActionState } from "./actions";

// A form is a Server Action (`<form action={formAction}>`), so a submit before hydration is still a POST
// and never a GET with the credentials in the URL. After hydration react-hook-form validates first,
// then hands the same FormData to the action. (A pre-hydration failure does not keep what was typed.)
export function useActionForm<V extends FieldValues>(
  action: (prev: ActionState, form: FormData) => Promise<ActionState>,
  schema: ZodType<V, ZodTypeDef, V>,
  defaultValues: DefaultValues<V>,
) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const form = useForm<V>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues });
  const { setError } = form;
  // A successful sign in redirects, so the action settles with the same state while the next page loads.
  // Keep reporting "pending" until the state changes (a failure) or this page unmounts (the redirect).
  const [submittedFrom, setSubmittedFrom] = useState<{ state: ActionState } | null>(null);
  const busy = isPending || (submittedFrom !== null && submittedFrom.state === state);

  useEffect(() => {
    for (const [name, message] of Object.entries(state?.fields ?? {})) setError(name as Path<V>, { message });
  }, [state, setError]);

  const onSubmit = form.handleSubmit((_, event) => {
    setSubmittedFrom({ state });
    startTransition(() => formAction(new FormData(event!.target as HTMLFormElement)));
  });

  return { form, formAction, onSubmit, state, isPending: busy };
}
