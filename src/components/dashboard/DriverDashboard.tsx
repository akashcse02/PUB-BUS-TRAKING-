import { useState } from 'react';
import { LayoutDashboard, Map, Bell, UserCircle, Play, Square, AlertTriangle, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import DashboardShell from './DashboardShell';
import NotificationsPanel from './NotificationsPanel';
import ProfileCard from './ProfileCard';
import LiveMap from '@/components/landing/LiveMap';
import { MOCK_NOTIFICATIONS } from '@/types/notification.types';
import { ROUTES } from '@/types/route.types';

export default function DriverDashboard({ userName }: { userName: string }) {
  const [tab, setTab] = useState('overview');
  const [routeId, setRouteId] = useState('gabtoli');
  const [onTrip, setOnTrip] = useState(false);
  const [sharing, setSharing] = useState(false);
  const route = ROUTES.find((r) => r.id === routeId);

  return (
    <DashboardShell
      userName={userName}
      roleLabel="Driver"
      activeTab={tab}
      onTabChange={setTab}
      navItems={[
        { id: 'overview', label: 'My Trip', icon: LayoutDashboard },
        { id: 'map', label: 'Live Map', icon: Map },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'profile', label: 'Profile', icon: UserCircle },
      ]}
    >
      {tab === 'overview' && (
        <div className="space-y-6 max-w-2xl">
          <div className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[#00875a]">Assigned route</p>
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c]"
            >
              {ROUTES.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <p className="mt-3 text-sm text-[#5c6b70]">
              {route?.origin} → {route?.destination} · {route?.stops} stops · {route?.approxDistanceKm} km
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setOnTrip((v) => !v);
                  toast.success(onTrip ? 'Trip ended' : 'Trip started — passengers can see you');
                }}
                className={`pub-btn inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white ${
                  onTrip ? 'bg-[#0d1b1e]' : 'bg-[#00c56c] hover:bg-[#009a54]'
                }`}
              >
                {onTrip ? <Square size={15} /> : <Play size={15} />}
                {onTrip ? 'End trip' : 'Start trip'}
              </button>
              <button
                onClick={() => {
                  setSharing((v) => !v);
                  toast.success(sharing ? 'Location sharing off' : 'Sharing live location');
                }}
                className="pub-btn inline-flex items-center gap-2 rounded-2xl border-2 border-[#0d1b1e]/12 px-5 py-3 text-sm font-semibold text-[#0d1b1e] hover:border-[#00c56c]"
              >
                <Navigation size={15} /> {sharing ? 'Stop sharing GPS' : 'Share GPS'}
              </button>
              <button
                onClick={() => toast.success('Delay reported to passengers')}
                className="pub-btn inline-flex items-center gap-2 rounded-2xl border-2 border-[#f59e0b]/40 px-5 py-3 text-sm font-semibold text-[#b45309] hover:border-[#f59e0b]"
              >
                <AlertTriangle size={15} /> Report delay
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Trip status', value: onTrip ? 'Running' : 'Idle' },
              { label: 'GPS', value: sharing ? 'Live' : 'Off' },
              { label: 'Next departure', value: route?.morningTrips[0] ?? '—' },
            ].map((s) => (
              <div key={s.label} className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5c6b70]">{s.label}</p>
                <p className="mt-2 font-display text-lg font-bold text-[#0d1b1e]">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'map' && (
        <div className="-m-6">
          <LiveMap />
        </div>
      )}

      {tab === 'notifications' && <NotificationsPanel notifications={MOCK_NOTIFICATIONS} />}

      {tab === 'profile' && (
        <ProfileCard roleLabel="Driver" routeId={routeId} onRouteChange={setRouteId} />
      )}
    </DashboardShell>
  );
}
