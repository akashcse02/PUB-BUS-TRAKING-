import { Phone, User, Clock } from 'lucide-react';
import type { SimulatedBus } from '@/hooks/useSimulatedBuses';
import { ROUTES } from '@/types/route.types';

interface MyRouteCardProps {
  routeId: string;
  buses: SimulatedBus[];
}

export default function MyRouteCard({ routeId, buses }: MyRouteCardProps) {
  const route = ROUTES.find((r) => r.id === routeId);
  const myBuses = buses.filter((b) => b.routeId === routeId);

  return (
    <div className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-6 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-wider text-[#00875a] mb-1">Your route</p>
      <p className="font-display text-xl font-bold text-[#0d1b1e] mb-5">
        {route?.name} · {route?.origin} → {route?.destination}
      </p>

      <div className="space-y-3">
        {myBuses.length === 0 && (
          <p className="text-sm text-[#5c6b70]">No bus assigned to this route right now.</p>
        )}
        {myBuses.map((bus) => (
          <div
            key={bus.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#0d1b1e]/8 px-4 py-3"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm text-[#0d1b1e] bg-[#0d1b1e]/5 rounded-lg px-2 py-1">
                Bus {bus.number}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#5c6b70]">
                <User size={13} /> {bus.driverName}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-mono text-[#5c6b70]">
                <Phone size={13} /> {bus.driverPhone}
              </span>
            </div>
            <span
              className={`flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-lg ${
                bus.status === 'delayed'
                  ? 'bg-[#f59e0b]/15 text-[#b45309]'
                  : bus.status === 'idle'
                    ? 'bg-[#0d1b1e]/5 text-[#5c6b70]'
                    : 'bg-[#00c56c]/15 text-[#00875a]'
              }`}
            >
              <Clock size={12} />
              {bus.status === 'idle' ? 'Not running' : `ETA ${bus.etaMinutes} min`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
