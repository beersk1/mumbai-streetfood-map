import { Search, SlidersHorizontal, X } from 'lucide-react';
import { foodTypes } from '@/lib/mock-service';

export function FilterSearchBar({ query, onQueryChange, activeType, onTypeChange, onAddStall }: { query: string; onQueryChange: (value: string) => void; activeType: string; onTypeChange: (value: string) => void; onAddStall: () => void }) {
  return (
    <div className="space-y-3" data-testid="filter-search-bar">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-3 shadow-xs transition-colors focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10">
        <Search size={18} className="text-muted-foreground" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search stalls, areas, dishes..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/75" data-testid="input-search-stalls" />
        {query && <button type="button" onClick={() => onQueryChange('')} className="rounded-full p-1 text-muted-foreground hover:bg-muted" data-testid="button-clear-search"><X size={15} /></button>}
        <button type="button" onClick={onAddStall} className="flex shrink-0 items-center gap-1.5 border-l border-border pl-3 text-xs font-semibold text-primary" data-testid="button-add-stall"><SlidersHorizontal size={14} />Add stall</button>
      </div>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-0.5" data-testid="filter-food-types">
        {foodTypes.map((type) => (
          <button type="button" key={type} onClick={() => onTypeChange(type)} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${activeType === type ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground'}`} data-testid={`button-filter-${type.toLowerCase().replaceAll(' ', '-')}`}>
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}