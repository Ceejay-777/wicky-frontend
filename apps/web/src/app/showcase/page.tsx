"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Field, PasswordField } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Stepper } from "@/components/ui/stepper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Stamp } from "@/components/stamp/stamp";
import { TopBar } from "@/components/nav/top-bar";
import { ThemeToggle } from "@/components/nav/theme-toggle";

const LONG = "The Rise and Fall of the Hanseatic League's Baltic Trade Monopoly";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-xs font-bold tracking-[0.14em] text-muted-ink normal-case">{title}</h2>
      {children}
    </section>
  );
}

export default function ShowcasePage() {
  const [on, setOn] = useState(true);
  const [hours, setHours] = useState(6);

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-5 py-8">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[56px] md:text-[72px]">Design system</h1>
        <ThemeToggle />
      </div>

      <Section title="BUTTONS">
        <div className="flex flex-wrap gap-3">
          <Button>Open my passport</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="destructive">Remove subject</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Forgot your password?</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="FIELDS">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Email" defaultValue="ceejay@example.com" />
          <PasswordField label="Password" defaultValue="stampcollector" hint="At least 8 characters." />
          <Field label="Email" defaultValue="not-an-email" error="Enter a valid email." />
          <Field label="Email" readOnly defaultValue="a.very.long.email.address.that.keeps.going@example-university.edu" />
        </div>
        <Alert variant="destructive">
          <AlertDescription>Invalid email or password.</AlertDescription>
        </Alert>
      </Section>

      <Section title="CHIPS, SWITCH, STEPPER">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="pine" fill>Enrolled</Chip>
          <Chip tone="gold">Completed</Chip>
          <Chip tone="cobalt">Advanced</Chip>
          <Chip tone="tomato" dashed>Locked</Chip>
          <Chip>Ink</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <Switch checked={on} onCheckedChange={setOn} label="Show me on leaderboards" />
          <Stepper value={hours} onValueChange={setHours} min={1} max={24} unit="H" label="reminder interval" />
        </div>
      </Section>

      <Section title="CARDS (LONG TEXT CLAMPS TO 2 LINES)">
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>{LONG}</CardTitle></CardHeader>
            <CardContent className="text-ink-2">Solid border: earned or active.</CardContent>
          </Card>
          <Card dashed>
            <CardHeader><CardTitle>Not yet</CardTitle></CardHeader>
            <CardContent className="text-ink-2">Dashed border: optional, locked or read only.</CardContent>
          </Card>
        </div>
      </Section>

      <Section title="STAMPS">
        <div className="flex flex-wrap items-center gap-6">
          <Stamp title="Road to War" date="03 Oct 2026" color="tomato" press />
          <Stamp title="Poland 1939" date="05 Oct 2026" color="cobalt" shape="rect" />
          <Stamp title={LONG} date="08 Oct 2026" color="pine" />
          <Stamp title="Dunkirk" color="gold" ghost />
          <Stamp title="Blitz" color="ink" shape="rect" ghost />
        </div>
      </Section>

      <Section title="TOP BAR">
        <div className="rounded-xl border-[1.5px] border-ink">
          <TopBar title="ACCOUNT" backHref="/showcase" backLabel="Back to profile" />
        </div>
      </Section>
    </div>
  );
}
