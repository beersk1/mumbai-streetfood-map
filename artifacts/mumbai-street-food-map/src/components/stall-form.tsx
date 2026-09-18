import { useState } from 'react';
import { ImagePlus, MapPin, X } from 'lucide-react';
import { submitStall } from '@/lib/mock-service';

type MapLocation = { lat: number; lng: number };

export function StallForm({ onClose, onSubmitted, initialLocation }: { onClose: () => void; onSubmitted: () => void; initialLocation?: MapLocation }) {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [food, setFood] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const canSubmit = name.trim().length > 2 && area.trim().length > 2 && food.trim().length > 2;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    await submitStall({ name: name.trim(), area: area.trim(), foodTypes: food.split(',').map((item) => item.trim()).filter(Boolean), photos: [photoUrl || 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1000'], location: initialLocation ?? { lat: 19.076, lng: 72.8777 }, note: 'A new community-recommended stop.', openHours: 'Hours to be confirmed', price: '₹' });
    setSaving(false);
    onSubmitted();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/35 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" data-testid="stall-form-dialog">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-t-[28px] border border-border bg-card p-5 shadow-2xl sm:rounded-[28px] sm:p-7">
        <div className="mb-5 flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Grow the map</p><h2 className="mt-1 font-serif text-2xl font-semibold">Know a great stall?</h2></div><button type="button" onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted" data-testid="button-close-stall-form"><X size={18} /></button></div>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">Put a neighbourhood favourite on the map for the next hungry person.</p>
        {initialLocation && <div className="mb-4 flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2.5 text-xs font-semibold text-secondary-foreground"><MapPin size={15} />Pinned at {initialLocation.lat.toFixed(4)}, {initialLocation.lng.toFixed(4)}</div>}
        <label className="block text-xs font-semibold" htmlFor="stall-name">Stall name</label>
        <input id="stall-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Raju's Cutting Chai" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-name" />
        <label className="mt-4 block text-xs font-semibold" htmlFor="stall-area">Area or landmark</label>
        <input id="stall-area" value={area} onChange={(event) => setArea(event.target.value)} placeholder="e.g. Matunga East" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-area" />
        <label className="mt-4 block text-xs font-semibold" htmlFor="stall-food">What do they make?</label>
        <input id="stall-food" value={food} onChange={(event) => setFood(event.target.value)} placeholder="Separate dishes with commas" className="mt-2 w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:border-primary" data-testid="input-stall-food" />
        <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-background px-3.5 py-3 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground" htmlFor="stall-photo"><ImagePlus size={16} className="text-primary" />Add a stall photo <input id="stall-photo" type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPhotoUrl(URL.createObjectURL(file)); }} data-testid="input-stall-photo" /></label>
        {photoUrl && <img src={photoUrl} alt="Selected stall preview" className="mt-2 h-24 w-full rounded-xl object-cover" />}
        <button disabled={!canSubmit || saving} className="mt-5 flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-45" data-testid="button-submit-stall">{saving ? 'Adding to the map…' : 'Add this stall'}</button>
      </form>
    </div>
  );
}