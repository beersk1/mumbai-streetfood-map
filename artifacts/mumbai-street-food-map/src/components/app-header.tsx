import { Compass, Plus, Utensils } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { BrandMark } from '@/components/brand-mark';

export function AppHeader({ onAddStall }: { onAddStall: () => void }) {
  const [location] = useLocation();
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" data-testid="link-home"><BrandMark /></Link>
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 md:flex" aria-label="Primary navigation">
          <Link href="/" className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${location === '/' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`} data-testid="link-discover"><Compass size={15} />Discover</Link>
          <button type="button" onClick={onAddStall} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" data-testid="button-header-add-stall"><Plus size={15} />Add a stall</button>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"><span className="size-1.5 rounded-full bg-accent" />Live from Mumbai</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary font-serif text-sm font-semibold text-secondary-foreground" data-testid="avatar-current-user">AM</span>
        </div>
      </div>
    </header>
  );
}

export function MobileNav({ onAddStall }: { onAddStall: () => void }) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-border bg-card/95 p-2 shadow-lg backdrop-blur-md md:hidden" aria-label="Mobile navigation">
      <Link href="/" className="flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-foreground" data-testid="link-mobile-discover"><Compass size={18} /><span>Discover</span></Link>
      <button type="button" onClick={onAddStall} className="flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-primary" data-testid="button-mobile-add-stall"><Plus size={18} /><span>Add stall</span></button>
      <Link href="/" className="flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground" data-testid="link-mobile-crawl"><Utensils size={18} /><span>My crawl</span></Link>
    </nav>
  );
}