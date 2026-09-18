import { MapPinned } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-mark">
      <span className="flex size-10 items-center justify-center rounded-[13px] bg-primary text-primary-foreground shadow-sm">
        <MapPinned size={21} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-serif text-[20px] font-semibold tracking-[-0.035em]">Mumbai</span>
          <span className="mt-0.5 block font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-primary">Street Food Map</span>
        </span>
      )}
    </div>
  );
}