import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { submitReview } from '@/lib/mock-service';

export function ReviewForm({ stallId, stallName, onClose, onSubmitted }: { stallId: string; stallName: string; onClose: () => void; onSubmitted: () => void }) {
  const [rating, setRating] = useState(0);
  const [foodType, setFoodType] = useState('Signature dish');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const canSubmit = rating > 0 && text.trim().length > 8;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    await submitReview({ stallId, foodType, rating, text: text.trim(), photoUrl: '' });
    setSaving(false);
    onSubmitted();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/35 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" data-testid="review-form-dialog">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-t-[28px] border border-border bg-card p-5 shadow-2xl sm:rounded-[28px] sm:p-7">
        <div className="mb-5 flex items-start justify-between">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Leave a trail</p><h2 className="mt-1 font-serif text-2xl font-semibold">Review {stallName}</h2></div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted" data-testid="button-close-review"><X size={18} /></button>
        </div>
        <label className="block text-xs font-semibold">How was it?</label>
        <div className="mt-2 flex gap-1.5" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" onClick={() => setRating(value)} className="rounded-lg p-2 transition-transform hover:scale-110" data-testid={`button-rating-${value}`}><Star size={25} className={value <= rating ? 'fill-secondary text-secondary' : 'text-muted-foreground/40'} /></button>)}
        </div>
        <label className="mt-4 block text-xs font-semibold" htmlFor="review-food-type">What did you eat?</label>
        <input id="review-food-type" value={foodType} onChange={(event) => setFoodType(event.target.value)} className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-review-food-type" />
        <label className="mt-4 block text-xs font-semibold" htmlFor="review-text">Your local intel</label>
        <textarea id="review-text" value={text} onChange={(event) => setText(event.target.value)} placeholder="Tell the next hungry person what to order..." rows={4} className="mt-2 w-full resize-none rounded-xl border border-input bg-background px-3.5 py-3 text-sm leading-6 outline-none focus:border-primary" data-testid="textarea-review-text" />
        <button disabled={!canSubmit || saving} className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-45" data-testid="button-submit-review">{saving ? 'Pinning your review…' : 'Publish review'}</button>
      </form>
    </div>
  );
}