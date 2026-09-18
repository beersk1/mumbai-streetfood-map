import { useState } from 'react';
import { X } from 'lucide-react';
import { submitStall } from '@/lib/mock-service';

export function StallForm({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: () => void }) {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [food, setFood] = useState('');
  const [saving, setSaving] = useState(false);
  const canSubmit = name.trim().length > 2 && area.trim().length > 2 && food.trim().length > 2;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    await submitStall({ name: name.trim(), area: area.trim(), foodTypes: food.split(',').map((item) => item.trim()).filter(Boolean), photos: ['https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1000'], location: { lat: 19.076, lng: 72.8777 }, note: 'A new community-recommended stop.', openHours: 'Hours to be confirmed', price: '₹' });
    setSaving(false);
    onSubmitted();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/35 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" data-testid="stall-form-dialog">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-t-[28px] border border-border bg-card p-5 shadow-2xl sm:rounded-[28px] sm:p-7">
        <div className="mb-5 flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Grow the map</p><h2 className="mt-1 font-serif text-2xl font-semibold">Know a great stall?</h2></div><button type="button" onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted" data-testid="button-close-stall-form"><X size={18} /></button></div>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">Put a neighbourhood favourite on the map for the next hungry person.</p>
        <label className="block text-xs font-semibold" htmlFor="stall-name">Stall name</label>
        <input id="stall-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Raju's Cutting Chai" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-name" />
        <label className="mt-4 block text-xs font-semibold" htmlFor="stall-area">Area or landmark</label>
        <input id="stall-area" value={area} onChange={(event) => setArea(event.target.value)} placeholder="e.g. Matunga East" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-area" />
        <label className="mt-4 block text-xs font-semibold" htmlFor="stall-food">What do they make?</label>
        <input id="stall-food" value={food} onChange={(event) => setFood(event.target.value)} placeholder="Separate dishes with commas" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-food" />
        <button disabled={!canSubmit || saving} className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-45" data-testid="button-submit-stall">{saving ? 'Adding to the map…' : 'Add this stall'}</button>
      </form>
    </div>
  );
}