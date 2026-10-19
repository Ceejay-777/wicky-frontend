import { cn } from "@/lib/utils";

// Placeholder line widths (percent); 0 is a paragraph gap.
const LINES = [100, 96, 100, 84, 0, 100, 92, 100, 70, 0, 100, 88, 60];

export function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div aria-hidden="true" style={style} className={cn("rounded-md bg-muted-ink opacity-[0.22]", className)} />;
}

// Same box model as TitleBlock: label, two title lines, meta line beside the stamp, dotted rule.
export function TitleBlockSkeleton() {
  return (
    <div className="px-[22px] pt-2" aria-hidden="true">
      <Bone className="h-[13px] w-36" />
      <Bone className="mt-2.5 h-[40px] w-5/6" />
      <Bone className="mt-2 h-[40px] w-1/2" />
      <div className="mt-3.5 flex items-center justify-between gap-2.5">
        <Bone className="h-3 w-28" />
        <Bone className="mr-0.5 h-[72px] w-[104px] shrink-0 rounded-full" />
      </div>
      <div className="mt-3.5 border-t-2 border-dotted border-muted-ink" />
    </div>
  );
}

export function BodySkeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("px-[22px] pt-[22px]", className)}>
      {LINES.map((w, i) => (w ? <Bone key={i} className="mb-3 h-3" style={{ width: `${w}%` }} /> : <div key={i} className="h-3.5" />))}
    </div>
  );
}

// The rail on desktop, below the text on smaller screens: link rows, then the stamp card.
export function RailSkeleton() {
  return (
    <div aria-hidden="true">
      <Bone className="h-[13px] w-28" />
      <div className="mt-3 flex flex-col gap-2.5">
        {[0, 1, 2].map((i) => (
          <Bone key={i} className="h-[68px] rounded-[12px]" />
        ))}
      </div>
      <Bone className="mt-[26px] h-[144px] rounded-[14px]" />
    </div>
  );
}
