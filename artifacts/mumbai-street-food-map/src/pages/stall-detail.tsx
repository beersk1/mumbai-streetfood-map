import { useEffect, useState } from 'react';
import { ArrowLeft, Clock3, Heart, MapPin, Navigation, Share2 } from 'lucide-react';
import { Link, useParams } from 'wouter';
import type { Review, Stall, User } from '@/lib/mock-service';
import { getReviewsForStall, getStallById } from '@/lib/mock-service';
import { AppHeader, MobileNav } from '@/components/app-header';
import { Rating } from '@/components/rating';
import { ReviewForm } from '@/components/review-form';
import { ReviewList } from '@/components/review-list';
import { StallForm } from '@/components/stall-form';

export default function StallDetailPage() {
  const params = useParams<{ id: string }>();
  const [stall, setStall] = useState<Stall>();
  const [reviews, setReviews] = useState<{ review: Review; user: User }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showStallForm, setShowStallForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [directionsCopied, setDirectionsCopied] = useState(false);

  async function load() {
    setLoading(true);
    const found = await getStallById(params.id ?? '');
    setStall(found);
    if (found) setReviews(await getReviewsForStall(found.id));
    setLoading(false);
  }
  useEffect(() => { void load(); }, [params.id]);

  if (loading) return <div className="min-h-[100dvh] bg-background p-5"><div className="mx-auto max-w-3xl space-y-4 pt-10"><div className="skeleton h-8 w-24 rounded-lg" /><div className="skeleton h-72 rounded-3xl" /><div className="skeleton h-6 w-2/3 rounded-lg" /></div></div>;
  if (!stall) return <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5 text-center"><div><h1 className="font-serif text-3xl font-semibold">That stall wandered off.</h1><p className="mt-2 text-sm text-muted-foreground">Try exploring the map again.</p><Link href="/" className="mt-5 inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground" data-testid="link-back-home">Back to map</Link></div></div>;

  return (
    <div className="noise min-h-[100dvh] bg-background">
      <AppHeader onAddStall={() => setShowStallForm(true)} />
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-5 sm:px-6 sm:pt-8 lg:px-10 lg:pb-14">
        <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" data-testid="link-back-map"><ArrowLeft size={15} />Back to map</Link>
        <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="grid min-h-[340px] grid-cols-2 gap-2 overflow-hidden rounded-[24px] sm:min-h-[470px]">
            <img src={stall.photos[0]} alt={`${stall.name} food`} className="size-full object-cover" data-testid="img-stall-primary" />
            <div className="grid gap-2"><img src={stall.photos[1]} alt={`${stall.name} dish`} className="min-h-0 size-full object-cover" data-testid="img-stall-secondary" /><div className="relative min-h-0 overflow-hidden bg-secondary"><div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(hsl(218 31% 19% / .2) 1px, transparent 1px)', backgroundSize: '10px 10px' }} /><span className="absolute bottom-4 left-4 font-serif text-xl font-semibold text-secondary-foreground">A proper<br />Mumbai stop.</span></div></div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">The {stall.area} classic</p>
            <h1 className="mt-2 font-serif text-[clamp(2.5rem,6vw,4.6rem)] font-semibold leading-[.92] tracking-[-0.06em]" data-testid="text-stall-name">{stall.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3"><Rating value={stall.avgRating} reviews={stall.reviewCount} large /><span className="text-border">|</span><span className="text-sm text-muted-foreground">{stall.price} price point</span></div>
            <p className="mt-5 text-base leading-7 text-foreground/75">{stall.note}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border bg-card p-3"><MapPin size={16} className="text-primary" /><p className="mt-2 text-xs font-semibold">{stall.area}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Mumbai, Maharashtra</p></div>
              <div className="rounded-xl border border-border bg-card p-3"><Clock3 size={16} className="text-primary" /><p className="mt-2 text-xs font-semibold">{stall.openHours}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Hours may vary</p></div>
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setShowReviewForm(true)} className="flex flex-1 items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-detail-add-review">Write a review</button>
              <button type="button" onClick={() => setLiked(!liked)} className={`rounded-xl border px-3.5 transition-colors ${liked ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`} data-testid="button-save-stall"><Heart size={18} className={liked ? 'fill-primary' : ''} /></button>
              <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="rounded-xl border border-border bg-card px-3.5 text-muted-foreground hover:text-foreground" data-testid="button-share-stall"><Share2 size={18} /></button>
            </div>
            <button type="button" onClick={() => { void navigator.clipboard?.writeText(`${stall.location.lat}, ${stall.location.lng}`); setDirectionsCopied(true); }} className="mt-3 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-accent" data-testid="button-get-directions"><Navigation size={14} /> {directionsCopied ? 'Location copied' : 'Copy location'}</button>
          </div>
        </section>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <ReviewList items={reviews} onAddReview={() => setShowReviewForm(true)} />
          <aside className="h-fit rounded-2xl border border-border bg-card p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Order this</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold">The move</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Ask for the signature {stall.foodTypes[0].toLowerCase()}, extra chutney, and eat it standing up. That is the whole point.</p>
            <div className="mt-5 flex flex-wrap gap-2">{stall.foodTypes.map((type) => <span key={type} className="rounded-full bg-secondary/70 px-3 py-1.5 text-xs font-semibold text-secondary-foreground">{type}</span>)}</div>
            <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Neighbourhood note:</span> Best enjoyed with a little chaos around you.</div>
          </aside>
        </div>
      </main>
      <MobileNav onAddStall={() => setShowStallForm(true)} />
      {showReviewForm && <ReviewForm stallId={stall.id} stallName={stall.name} onClose={() => setShowReviewForm(false)} onSubmitted={() => { setShowReviewForm(false); void load(); }} />}
      {showStallForm && <StallForm onClose={() => setShowStallForm(false)} onSubmitted={() => setShowStallForm(false)} />}
    </div>
  );
}