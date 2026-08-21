import { useState } from 'react';
import { LayoutDashboard, Map, Bell, UserCircle, Bus } from 'lucide-react';
import DashboardShell from './DashboardShell';
import MyRouteCard from './MyRouteCard';
import NotificationsPanel from './NotificationsPanel';
import ProfileCard from './ProfileCard';
import LiveMap from '@/components/landing/LiveMap';
import { useSimulatedBuses } from '@/hooks/useSimulatedBuses';
import { MOCK_NOTIFICATIONS } from '@/types/notification.types';
import { ROUTES } from '@/types/route.types';

export default function PassengerDashboard({
  role,
  userName,
}: {
  role: 'student' | 'teacher';
  userName: string;
}) {
  const [tab, setTab] = useState('overview');
  const [routeId, setRouteId] = useState('sherpur');
  const buses = useSimulatedBuses();
  const delayCount = MOCK_NOTIFICATIONS.filter((n) => n.type === 'delay').length;
  const route = ROUTES.find((r) => r.id === routeId);

  return (
    <DashboardShell
      userName={userName}
      roleLabel={role === 'student' ? 'Student' : 'Teacher'}
      activeTab={tab}
      onTabChange={setTab}
      navItems={[
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'map', label: 'Live Map', icon: Map },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: delayCount },
        { id: 'profile', label: 'Profile', icon: UserCircle },
      ]}
    >
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
            {[
              { label: 'My route', value: route?.name ?? '—' },
              { label: 'Next trip', value: route?.morningTrips[0] ?? '—' },
              { label: 'Stops', value: String(route?.stops ?? '—') },
            ].map((s) => (
              <div key={s.label} className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5c6b70]">
                  <Bus size={13} className="text-[#00c56c]" /> {s.label}
                </div>
                <p className="mt-2 font-display text-lg font-bold text-[#0d1b1e]">{s.value}</p>
              </div>
            ))}
          </div>
          <MyRouteCard routeId={routeId} buses={buses} />
          <div>
            <p className="text-xs font-mono uppercase text-[#5c6b70] mb-3">Recent alerts</p>
            <NotificationsPanel notifications={MOCK_NOTIFICATIONS.slice(0, 2)} />
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
        <ProfileCard
          roleLabel={role === 'student' ? 'Student' : 'Teacher'}
          routeId={routeId}
          onRouteChange={setRouteId}
        />
      )}
    </DashboardShell>
  );
}
