export interface FlowVisualProps {
  caption: string;
  highlight: string;
  regions?: string[];
}

function VisualFrame({
  children,
  caption,
  highlight,
}: {
  children: React.ReactNode;
  caption: string;
  highlight: string;
}) {
  return (
    <div className="flex h-full flex-col justify-end rounded-3xl border border-white/12 bg-panel2 p-8">
      <div className="relative mb-6 h-[230px]">{children}</div>
      <div className="text-center font-mono text-xs tracking-[0.16em] text-[#FBFAF8]/60">
        {caption}
        <br />
        <span className="text-accent-light">{highlight}</span>
      </div>
    </div>
  );
}

export function ExtrusionVisual({ caption, highlight }: FlowVisualProps) {
  return (
    <VisualFrame caption={caption} highlight={highlight}>
      <div className="absolute top-5.5 left-0 h-32 w-23 rounded-xl border border-white/10 bg-[#26272B]" />
      <div className="absolute top-18 left-22 h-7.5 w-1.5 rounded-sm bg-accent shadow-[0_0_14px_rgba(210,35,42,0.9)]" />
      <div className="absolute top-25 right-0 left-26 h-0.5 bg-white/10" />
      <div className="absolute top-19.5 left-26 h-5 w-29.5 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-flow-extrude absolute inset-0 rounded-[5px]"
            style={{
              background: i === 0 ? "#EFEDE8" : i === 1 ? "#D9D5CD" : "#C7C2B9",
              animationDelay: `${i * -1.07}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-3 bottom-0 w-37.5 space-y-1.5">
        <div className="h-3.5 rounded bg-[#A6A199]" />
        <div className="h-3.5 rounded bg-[#BFBAB0]" />
        <div className="h-3.5 rounded bg-[#D9D5CD]" />
      </div>
    </VisualFrame>
  );
}

export function PressVisual({ caption, highlight }: FlowVisualProps) {
  return (
    <VisualFrame caption={caption} highlight={highlight}>
      <div className="absolute top-0 left-1/2 h-[230px] w-[300px] -translate-x-1/2">
        <div className="absolute top-0 right-6 left-6 h-4 rounded-md bg-[#26272B]" />
        <div className="absolute top-0 left-6 h-[190px] w-4 rounded-md bg-[#26272B]" />
        <div className="absolute top-0 right-6 h-[190px] w-4 rounded-md bg-[#26272B]" />
        <div className="animate-flow-press absolute top-6.5 right-13 left-13 h-7.5 rounded-md border border-white/12 bg-[#34353A]" />
        <div className="animate-flow-glow absolute top-30 right-13 left-13 h-10 rounded-full bg-[radial-gradient(ellipse,rgba(210,35,42,0.55)_0%,rgba(210,35,42,0)_70%)]" />
        <div className="animate-flow-sheet absolute top-34.5 right-14 left-14 rounded-[5px] bg-[#EFEDE8]" />
        <div className="absolute top-43.5 right-9 left-9 h-4 rounded-md bg-[#26272B]" />
      </div>
    </VisualFrame>
  );
}

export function ConveyorVisual({ caption, highlight }: FlowVisualProps) {
  return (
    <VisualFrame caption={caption} highlight={highlight}>
      <div className="absolute inset-x-0 top-1.5 h-full overflow-hidden">
        <div className="absolute top-1.5 left-1/2 h-32 w-22.5 -translate-x-1/2 rounded-t-[14px] border-[3px] border-b-0 border-[#26272B]" />
        <div className="animate-flow-scan absolute top-4 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(210,35,42,0.9)]" />
        <div className="animate-flow-belt absolute inset-x-0 top-[134px] h-4 rounded-full bg-[repeating-linear-gradient(90deg,#26272B_0px,#26272B_16px,#2E2F34_16px,#2E2F34_32px)]" />
        <div className="absolute top-[156px] left-[12%] h-3 w-3 rounded-full bg-[#26272B]" />
        <div className="absolute top-[156px] left-[48%] h-3 w-3 rounded-full bg-[#26272B]" />
        <div className="absolute top-[156px] left-[84%] h-3 w-3 rounded-full bg-[#26272B]" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="animate-flow-conveyor-item absolute top-26 left-0 h-7 w-18.5 rounded-[100%_100%_9px_9px/85%_85%_7px_7px] bg-[linear-gradient(100deg,#E04A46,#A50E0E)]"
            style={{ animationDelay: `${i * -1.33}s` }}
          />
        ))}
      </div>
    </VisualFrame>
  );
}

export function DistributionVisual({ caption, regions = [] }: FlowVisualProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/12 bg-panel2 p-8">
      <div className="relative mb-6 h-50 w-50">
        <div className="animate-flow-pulse-ring absolute inset-0 rounded-full border-[1.5px] border-accent/50" />
        <div className="animate-flow-pulse-ring absolute inset-0 rounded-full border-[1.5px] border-accent/50 [animation-delay:1.1s]" />
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-white/25" />
        <div className="absolute inset-9.5 rounded-full border border-white/12" />
        <div className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_18px_rgba(210,35,42,0.9)]" />
        <div className="animate-flow-orbit-cw absolute inset-0">
          <span className="absolute -top-1 left-1/2 h-2.25 w-2.25 -translate-x-1/2 rounded-full bg-accent-light" />
          <span className="absolute top-1/2 -left-1 h-2.25 w-2.25 -translate-y-1/2 rounded-full bg-[#F28B82]" />
        </div>
        <div className="animate-flow-orbit-ccw absolute inset-9.5">
          <span className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FBFAF8]" />
        </div>
      </div>
      <div className="mb-4.5 flex flex-wrap justify-center gap-2">
        {regions.map((r) => (
          <span
            key={r}
            className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.08em] text-[#FBFAF8]/75"
          >
            {r}
          </span>
        ))}
      </div>
      <div className="font-mono text-xs tracking-[0.16em] text-accent-light">{caption}</div>
    </div>
  );
}
