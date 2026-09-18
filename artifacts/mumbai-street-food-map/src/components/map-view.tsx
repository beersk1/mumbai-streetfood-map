import { useState } from 'react';
import { LocateFixed, Minus, Plus } from 'lucide-react';
import type { Stall } from '@/lib/mock-service';

const pinPositions = [
  { left: '68%', top: '27%' }, { left: '44%', top: '34%' }, { left: '61%', top: '44%' },
  { left: '24%', top: '72%' }, { left: '34%', top: '60%' }, { left: '74%', top: '57%' },
  { left: '51%', top: '18%' }, { left: '79%', top: '40%' }, { left: '47%', top: '76%' },
  { left: '58%', top: '66%' },
];

export function MapView({ stalls, selectedId, onSelect }: { stalls: Stall[]; selectedId?: string; onSelect: (stall: Stall) => void }) {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[22px] border border-border bg-[#e3d8bf] shadow-sm sm:min-h-[500px]" data-testid="map-view">
      <div className="absolute inset-0 opacity-70 transition-transform duration-300" style={{ transform: `scale(${zoom})`, backgroundImage: 'linear-gradient(26deg, transparent 0 35%, rgba(255,250,230,.7) 35.2% 36%, transparent 36.2% 100%), linear-gradient(103deg, transparent 0 58%, rgba(255,250,230,.66) 58.2% 59%, transparent 59.2% 100%), linear-gradient(8deg, transparent 0 16%, rgba(111,131,131,.17) 16.2% 16.7%, transparent 17% 100%), linear-gradient(84deg, transparent 0 75%, rgba(111,131,131,.14) 75.2% 75.6%, transparent 76% 100%), repeating-linear-gradient(32deg, transparent 0 29px, rgba(98,108,104,.09) 30px 31px)' }} />
      <div className="absolute -left-16 top-[39%] h-36 w-[125%] -rotate-[18deg] rounded-[50%] border-[18px] border-[#b8d2ca]/75 bg-[#d5e4dc]/65" />
      <div className="absolute -right-20 bottom-[2%] h-40 w-[110%] rotate-[24deg] rounded-[50%] border-[13px] border-[#b8d2ca]/55 bg-[#d5e4dc]/55" />
      <div className="absolute left-[8%] top-[15%] rotate-[-12deg] font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-[#778277]">Arabian sea</div>
      <div className="absolute right-[9%] top-[11%] rotate-[-10deg] font-mono text-[9px] uppercase tracking-[0.18em] text-[#889086]">Mumbai</div>
      <div className="absolute left-[22%] top-[49%] -rotate-12 font-mono text-[9px] uppercase tracking-[0.15em] text-[#8a8f85]">Western express highway</div>
      <div className="absolute bottom-3 left-3 rounded-lg bg-[#f7f0dd]/90 px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#6c746d]">Map view · Mumbai</div>
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-[#d4c8af] bg-[#f7f0dd]/90 shadow-sm">
        <button type="button" onClick={() => setZoom((value) => Math.min(value + 0.12, 1.35))} className="p-2.5 text-[#44504b] hover:bg-[#eadfc8]" data-testid="button-map-zoom-in"><Plus size={16} /></button>
        <div className="h-px bg-[#d4c8af]" />
        <button type="button" onClick={() => setZoom((value) => Math.max(value - 0.12, 0.88))} className="p-2.5 text-[#44504b] hover:bg-[#eadfc8]" data-testid="button-map-zoom-out"><Minus size={16} /></button>
      </div>
      <button type="button" onClick={() => setZoom(1)} className="absolute bottom-3 right-3 rounded-xl border border-[#d4c8af] bg-[#f7f0dd]/90 p-2.5 text-[#44504b] shadow-sm hover:bg-[#eadfc8]" data-testid="button-map-locate"><LocateFixed size={17} /></button>
      {stalls.map((stall, index) => {
        const position = pinPositions[index % pinPositions.length];
        const selected = stall.id === selectedId;
        return (
          <button key={stall.id} type="button" onClick={() => onSelect(stall)} className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110" style={position} data-testid={`button-map-pin-${stall.id}`}>
            <span className={`absolute -inset-2 rounded-full bg-primary/50 ${selected ? 'pin-pulse' : 'opacity-0'}`} />
            <span className={`relative flex size-9 items-center justify-center rounded-full border-2 border-[#fff7e6] text-xs font-bold shadow-lg ${selected ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground'}`}>{index + 1}</span>
            {selected && <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-semibold text-background shadow-md">{stall.name}</span>}
          </button>
        );
      })}
    </div>
  );
}