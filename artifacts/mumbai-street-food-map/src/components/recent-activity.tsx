import { Camera, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import type { Activity } from '@/lib/mock-service';

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('');
}

export function RecentActivityFeed({ items }: { items: Activity[] }) {
  return (
    <section className="mt-7" data-testid="recent-activity">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">The map is moving</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.04em]">Recent activity</h2>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground">Live from Mumbai</span>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((item) => (
          <Link key={item.id} href={`/stall/${item.stall.id}`} className="flex gap-3 p-3.5 transition-colors hover:bg-secondary/30" data-testid={`activity-${item.id}`}>
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-xs font-semibold text-accent-foreground">{initials(item.user.name)}</span>
            <div className="min-w-0">
              <p className="text-xs leading-5">
                <span className="font-semibold">{item.user.name}</span>{' '}
                {item.kind === 'review' ? 'reviewed' : 'added'}{' '}
                <span className="font-semibold">{item.stall.name}</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                {item.kind === 'review' ? <MessageCircle size={12} className="text-primary" /> : <MapPin size={12} className="text-primary" />}
                {item.kind === 'review' ? `${item.review?.rating}/5 · ${item.review?.foodType}` : `New spot in ${item.stall.area}`}
                <span>·</span>{item.timestamp}
                {item.kind === 'review' && item.review?.photoUrl && <><span>·</span><Camera size={12} /></>}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}