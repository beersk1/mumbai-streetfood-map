import { ArrowUpRight, MapPin, Navigation, Star } from 'lucide-react';
import { Link } from 'wouter';
import type { Stall } from '@/lib/mock-service';
import { Rating } from '@/components/rating';

export function StallCard({ stall, rank, compact = false, onSelect }: { stall: Stall; rank?: number; compact?: boolean; onSelect?: () => void }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${compact ? 'flex gap-3 p-2.5' : 'p-3'}`} data-testid={`card-stall-${stall.id}`}>
      {rank && <span className="absolute left-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-foreground font-mono text-[11px] text-background">{String(rank).padStart(2, '0')}</span>}
      <button type="button" onClick={onSelect} className={`text-left ${compact ? 'flex min-w-0 flex-1 gap-3' : 'block w-full'}`} data-testid={`button-select-stall-${stall.id}`}>
        <div className={`relative overflow-hidden rounded-xl bg-muted ${compact ? 'size-[76px] shrink-0' : 'mb-3 h-40'}`}>
          <img src={stall.photos[0]} alt={stall.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute bottom-2 left-2 rounded-full bg-background/90 px-2 py-1 font-mono text-[10px] font-medium text-foreground">{stall.price} · {stall.area}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`${compact ? 'text-[15px]' : 'text-[17px]'} truncate font-semibold tracking-[-0.02em]`}>{stall.name}</h3>
            {!compact && <ArrowUpRight size={17} className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </div>
          <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground"><MapPin size={12} />{stall.area}</p>
          <div className="mt-2 flex items-center gap-2">
            <Rating value={stall.avgRating} reviews={stall.reviewCount} />
            <span className="text-muted-foreground">·</span>
            <span className="truncate text-xs text-muted-foreground">{stall.foodTypes.slice(0, 2).join(' · ')}</span>
          </div>
        </div>
      </button>
      <Link href={`/stall/${stall.id}`} className={compact ? 'mt-1 flex shrink-0 items-center justify-center self-center rounded-lg bg-secondary/50 p-2 text-foreground transition-colors hover:bg-secondary' : 'mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary/50 py-2.5 text-xs font-semibold transition-colors hover:bg-secondary'} data-testid={`link-stall-detail-${stall.id}`}>
        {compact ? <Navigation size={15} /> : <><span>View stall</span><ArrowUpRight size={14} /></>}
      </Link>
    </article>
  );
}