import { useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import type { Stall } from '@/lib/mock-service';
import 'leaflet/dist/leaflet.css';

type MapLocation = { lat: number; lng: number };

function MapClickHandler({ onMapClick }: { onMapClick: (location: MapLocation) => void }) {
  useMapEvents({
    click(event) {
      onMapClick({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
}

export function MapView({
  stalls,
  selectedId,
  onSelect,
  onAddStall,
}: {
  stalls: Stall[];
  selectedId?: string;
  onSelect: (stall: Stall) => void;
  onAddStall: (location: MapLocation) => void;
}) {
  const [pendingLocation, setPendingLocation] = useState<MapLocation>();

  function handleMapClick(location: MapLocation) {
    setPendingLocation(location);
  }

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[22px] border border-border bg-[#dfe9e3] shadow-sm sm:min-h-[500px]" data-testid="map-view">
      <MapContainer center={[19.076, 72.8777]} zoom={11} scrollWheelZoom className="z-0 min-h-[360px] sm:min-h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={handleMapClick} />
        {stalls.map((stall) => {
          const selected = stall.id === selectedId;
          return (
            <CircleMarker
              key={stall.id}
              center={[stall.location.lat, stall.location.lng]}
              radius={selected ? 11 : 8}
              pathOptions={{
                color: '#fff7e6',
                weight: 3,
                fillColor: selected ? '#13233c' : '#ed6845',
                fillOpacity: 1,
              }}
              eventHandlers={{ click: () => onSelect(stall) }}
              data-testid={`button-map-pin-${stall.id}`}
            >
              <Popup>
                <div className="min-w-[150px]">
                  <p className="font-semibold">{stall.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{stall.area} · {stall.avgRating || 'New'} rating</p>
                  <button type="button" onClick={() => onSelect(stall)} className="mt-3 rounded-lg bg-[#13233c] px-2.5 py-1.5 text-xs font-semibold text-white">
                    View this spot
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
        {pendingLocation && (
          <CircleMarker
            center={[pendingLocation.lat, pendingLocation.lng]}
            radius={10}
            pathOptions={{ color: '#13233c', weight: 3, fillColor: '#f2c744', fillOpacity: 1, dashArray: '4 4' }}
          />
        )}
      </MapContainer>
      <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-lg bg-[#f7f0dd]/90 px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#6c746d]">OpenStreetMap · Mumbai</div>
      {pendingLocation && (
        <div className="absolute bottom-4 left-1/2 z-[1000] w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 rounded-2xl border border-border bg-card p-3 shadow-xl sm:left-4 sm:translate-x-0" data-testid="map-add-stall-prompt">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-serif text-lg font-semibold">Add a stall here?</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">{pendingLocation.lat.toFixed(4)}, {pendingLocation.lng.toFixed(4)}</p>
            </div>
            <button type="button" onClick={() => setPendingLocation(undefined)} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Not here</button>
          </div>
          <button type="button" onClick={() => { onAddStall(pendingLocation); setPendingLocation(undefined); }} className="mt-3 w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground" data-testid="button-add-stall-at-pin">
            Start adding this spot
          </button>
        </div>
      )}
    </div>
  );
}