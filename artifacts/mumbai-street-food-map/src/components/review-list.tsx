import { BadgeCheck, Camera, Quote } from 'lucide-react';
import type { Review, User } from '@/lib/mock-service';
import { Rating } from '@/components/rating';

export function ReviewList({ items, onAddReview }: { items: { review: Review; user: User }[]; onAddReview: () => void }) {
  return (
    <section data-testid="review-list">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">From the crawl</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-[-0.04em]">What locals say</h2>
        </div>
        <button type="button" onClick={onAddReview} className="rounded-xl bg-foreground px-3.5 py-2.5 text-xs font-semibold text-background transition-transform hover:-translate-y-0.5" data-testid="button-add-review">Add your review</button>
      </div>
      <div className="max-h-[680px] overflow-y-auto divide-y divide-border rounded-2xl border border-border bg-card">
        {items.length === 0 && <div className="px-5 py-12 text-center text-sm text-muted-foreground">No reviews yet. Be the first to leave a trail.</div>}
        {items.map(({ review, user }) => (
          <article key={review.id} className="p-4" data-testid={`review-${review.id}`}>
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-serif text-sm font-semibold text-accent-foreground">{user.name.split(' ').map((part) => part[0]).join('')}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">{user.name}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground"><BadgeCheck size={12} className="text-accent" />Trust score {user.trustScore} · {review.timestamp}</p>
                  </div>
                  <Rating value={review.rating} />
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/80">{review.text}</p>
                {review.photoUrl && <img src={review.photoUrl} alt={`${user.name}'s food photo`} className="mt-3 max-h-56 w-full rounded-xl object-cover" />}
                <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-muted-foreground"><Quote size={12} className="text-primary" />{review.foodType}{review.photoUrl && <><span>·</span><Camera size={12} />Photo</>}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}