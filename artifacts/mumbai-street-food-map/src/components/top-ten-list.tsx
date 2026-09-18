import { ChevronRight, Trophy } from 'lucide-react';
import type { Stall } from '@/lib/mock-service';
import { StallCard } from '@/components/stall-card';

export function TopTenList({ stalls, onSelect, onSeeAll }: { stalls: Stall[]; onSelect: (stall: Stall) => void; onSeeAll: () => void }) {
  return (
    <section data-testid="top-ten-list">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-primary"><Trophy size={13} />Local favourites</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.04em]">The top ten, today</h2>
        </div>
        <button type="button" onClick={onSeeAll} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground" data-testid="button-see-all-stalls">See all <ChevronRight size={15} /></button>
      </div>
      <div className="space-y-2.5">
        {stalls.map((stall, index) => <StallCard key={stall.id} stall={stall} rank={index + 1} compact onSelect={() => onSelect(stall)} />)}
      </div>
    </section>
  );
}