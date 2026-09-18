import { useEffect, useState } from 'react';
import { ArrowDown, Clock3, List, Map, Sparkles } from 'lucide-react';
import type { Activity, Stall } from '@/lib/mock-service';
import { getRecentActivity, getTopRatedStalls, listStalls } from '@/lib/mock-service';
import { AppHeader, MobileNav } from '@/components/app-header';
import { FilterSearchBar } from '@/components/filter-search-bar';
import { MapView } from '@/components/map-view';
import { StallCard } from '@/components/stall-card';
import { StallForm } from '@/components/stall-form';
import { TopTenList } from '@/components/top-ten-list';
import { RecentActivityFeed } from '@/components/recent-activity';

type MapLocation = { lat: number; lng: number };

export default function HomePage() {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [topStalls, setTopStalls] = useState<Stall[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedId, setSelectedId] = useState<string>();
  const [showStallForm, setShowStallForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stallLocation, setStallLocation] = useState<MapLocation>();

  async function loadStalls() {
    setLoading(true);
    const [filtered, top, recent] = await Promise.all([listStalls(query, activeType), getTopRatedStalls(), getRecentActivity()]);
    setStalls(filtered);
    setTopStalls(top);
    setActivity(recent);
    setLoading(false);
  }

  useEffect(() => { void loadStalls(); }, [query, activeType]);

  function selectStall(stall: Stall) {
    setSelectedId(stall.id);
    if (view === 'map') window.setTimeout(() => document.getElementById('selected-stall')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  function openStallForm(location?: MapLocation) {
    setStallLocation(location);
    setShowStallForm(true);
  }

  return (
    <div className="noise min-h-[100dvh] bg-background">
      <AppHeader onAddStall={() => openStallForm()} />
      <main className="mx-auto max-w-[1440px] px-4 pb-28 pt-6 sm:px-6 sm:pt-9 lg:px-10 lg:pb-14">
        <section className="mb-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="animate-rise-in">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" />Sunday crawl · 10 spots pinned</p>
            <h1 className="max-w-2xl font-serif text-[clamp(2.45rem,7vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.06em]">Find your next<br /><span className="text-primary">favourite bite.</span></h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">A local-first map of the food that makes Mumbai stop, queue, and order one more.</p>
            <button type="button" onClick={() => openStallForm()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5" data-testid="button-hero-add-stall">Know a spot? Add it <ArrowDown size={15} className="-rotate-90" /></button>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-2xl border border-border bg-card px-4 py-3"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Map notes</p><p className="mt-1 font-serif text-xl font-semibold">284 <span className="font-sans text-xs font-normal text-muted-foreground">local reviews</span></p></div>
            <div className="rounded-2xl bg-secondary px-4 py-3"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary-foreground/70">Good to know</p><p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><Clock3 size={14} /> Peak hours vary</p></div>
          </div>
        </section>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3.5" data-testid="social-proof-strip">
          <p className="text-sm font-semibold"><span className="text-primary">12 stalls added this week</span> by hungry locals across Mumbai.</p>
          <button type="button" onClick={() => openStallForm()} className="text-xs font-semibold text-accent underline-offset-4 hover:underline">Add yours</button>
        </div>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)]">
          <section className="min-w-0">
            <FilterSearchBar query={query} onQueryChange={setQuery} activeType={activeType} onTypeChange={setActiveType} onAddStall={() => setShowStallForm(true)} />
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground"><span className="font-semibold text-foreground">{stalls.length}</span> stalls around Mumbai</p>
              <div className="flex items-center rounded-xl border border-border bg-card p-1" data-testid="view-toggle">
                <button type="button" onClick={() => setView('map')} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'map' ? 'bg-foreground text-background' : 'text-muted-foreground'}`} data-testid="button-view-map"><Map size={14} />Map</button>
                <button type="button" onClick={() => setView('list')} className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${view === 'list' ? 'bg-foreground text-background' : 'text-muted-foreground'}`} data-testid="button-view-list"><List size={14} />List</button>
              </div>
            </div>
            {loading ? <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="skeleton h-[380px] rounded-[22px]" /><div className="skeleton hidden h-[380px] rounded-[22px] sm:block" /></div> : view === 'map' ? (
              <div className="mt-3 space-y-3">
                <MapView stalls={stalls} selectedId={selectedId} onSelect={selectStall} onAddStall={(location) => openStallForm(location)} />
                {selectedId && stalls.find((stall) => stall.id === selectedId) && <div id="selected-stall" className="animate-rise-in sm:max-w-md"><StallCard stall={stalls.find((stall) => stall.id === selectedId)!} onSelect={() => setSelectedId(undefined)} /></div>}
              </div>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">{stalls.map((stall) => <StallCard key={stall.id} stall={stall} onSelect={() => selectStall(stall)} />)}</div>
            )}
            {!loading && stalls.length === 0 && <div className="mt-3 rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center"><Sparkles className="mx-auto text-primary" size={24} /><h2 className="mt-3 font-serif text-xl font-semibold">No spots pinned here yet</h2><p className="mt-1 text-sm text-muted-foreground">Be the first to add a stall in this area or food category.</p><button type="button" onClick={() => openStallForm()} className="mt-4 rounded-xl bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground" data-testid="button-empty-add-stall">Add the first spot</button></div>}
          </section>
          <aside className="lg:pt-[76px]">
            <TopTenList stalls={topStalls} onSelect={selectStall} onSeeAll={() => setView('list')} />
            <RecentActivityFeed items={activity} />
            <div className="mt-7 rounded-2xl bg-accent p-5 text-accent-foreground">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-foreground/65">Your turn</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight">Know a spot<br />we missed?</h3>
              <p className="mt-2 text-sm leading-5 text-accent-foreground/75">The best recommendations come from people who actually eat there.</p>
              <button type="button" onClick={() => setShowStallForm(true)} className="mt-4 flex items-center gap-2 rounded-xl bg-accent-foreground px-3.5 py-2.5 text-xs font-semibold text-accent transition-transform hover:-translate-y-0.5" data-testid="button-spotlight-add-stall">Add to the map <ArrowDown size={14} className="-rotate-90" /></button>
            </div>
          </aside>
        </div>
      </main>
      <MobileNav onAddStall={() => openStallForm()} />
      {showStallForm && <StallForm initialLocation={stallLocation} onClose={() => { setShowStallForm(false); setStallLocation(undefined); }} onSubmitted={() => { setShowStallForm(false); setStallLocation(undefined); void loadStalls(); }} />}
    </div>
  );
}