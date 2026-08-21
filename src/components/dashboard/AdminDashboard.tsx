import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Bus, Map as MapIcon, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';
import DashboardShell from './DashboardShell';
import NotificationsPanel from './NotificationsPanel';
import LiveMap from '@/components/landing/LiveMap';
import { supabase } from '@/integrations/supabase/client';
import { useSimulatedBuses } from '@/hooks/useSimulatedBuses';
import { MOCK_NOTIFICATIONS } from '@/types/notification.types';
import { ROUTES } from '@/types/route.types';
import type { AppRole } from '@/hooks/useRole';

const ROLES: AppRole[] = ['student', 'teacher', 'driver', 'admin'];

interface ManagedUser {
  id: string;
  full_name: string | null;
  created_at: string;
  role: AppRole;
}

export default function AdminDashboard({ userName }: { userName: string }) {
  const [tab, setTab] = useState('overview');
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const buses = useSimulatedBuses();

  async function load() {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from('profiles').select('id, full_name, created_at').order('created_at', { ascending: false }),
      supabase.from('user_roles').select('user_id, role'),
    ]);
    const roleMap = new Map<string, AppRole>();
    (roles ?? []).forEach((r) => roleMap.set(r.user_id, r.role as AppRole));
    setUsers(
      (profiles ?? []).map((p) => ({
        id: p.id,
        full_name: p.full_name,
        created_at: p.created_at,
        role: roleMap.get(p.id) ?? 'student',
      })),
    );
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function changeRole(userId: string, next: AppRole) {
    const { error: delErr } = await supabase.from('user_roles').delete().eq('user_id', userId);
    if (delErr) {
      toast.error(delErr.message);
      return;
    }
    const { error } = await supabase.from('user_roles').insert({ user_id: userId, role: next });
    if (error) {
      toast.error(error.message);
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: next } : u)));
    toast.success(`Role updated to ${next}`);
  }

  const counts = ROLES.map((r) => ({ role: r, count: users.filter((u) => u.role === r).length }));

  return (
    <DashboardShell
      userName={userName}
      roleLabel="Administrator"
      activeTab={tab}
      onTabChange={setTab}
      navItems={[
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'users', label: 'Users & Roles', icon: Users },
        { id: 'fleet', label: 'Fleet & Routes', icon: Bus },
        { id: 'map', label: 'Live Map', icon: MapIcon },
        { id: 'notifications', label: 'Alerts', icon: Bell },
      ]}
    >
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {counts.map((c) => (
              <div key={c.role} className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5c6b70]">{c.role}s</p>
                <p className="mt-2 font-display text-3xl font-bold text-[#0d1b1e]">{c.count}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Buses tracked', value: String(buses.length) },
              { label: 'Routes', value: String(ROUTES.length) },
              { label: 'Delays today', value: String(MOCK_NOTIFICATIONS.filter((n) => n.type === 'delay').length) },
            ].map((s) => (
              <div key={s.label} className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-[#5c6b70]">{s.label}</p>
                <p className="mt-2 font-display text-2xl font-bold text-[#0d1b1e]">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="pub-card rounded-3xl border border-[#00c56c]/30 bg-[#00c56c]/8 p-5 flex items-start gap-3">
            <Shield size={18} className="mt-0.5 text-[#00875a]" />
            <p className="text-sm text-[#0d1b1e]">
              Admin accounts require the admin access code at sign-up. You can also promote any existing
              user from <strong>Users &amp; Roles</strong>.
            </p>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="pub-card overflow-x-auto rounded-3xl border border-[#0d1b1e]/10 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0d1b1e]/8 text-left font-mono text-xs uppercase text-[#5c6b70]">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Joined</th>
                <th className="px-5 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={3} className="px-5 py-6 text-[#5c6b70]">Loading users…</td></tr>
              )}
              {!loading && users.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-6 text-[#5c6b70]">No users yet.</td></tr>
              )}
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[#0d1b1e]/6 last:border-0">
                  <td className="px-5 py-3 text-[#0d1b1e]">{u.full_name ?? 'Unnamed user'}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#5c6b70]">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value as AppRole)}
                      className="rounded-xl border border-[#0d1b1e]/12 px-3 py-1.5 text-sm focus:outline-none focus:border-[#00c56c]"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'fleet' && (
        <div className="grid gap-4 md:grid-cols-2">
          {ROUTES.map((r) => {
            const routeBuses = buses.filter((b) => b.routeId === r.id);
            return (
              <div key={r.id} className="pub-card rounded-3xl border border-[#0d1b1e]/10 bg-white p-5">
                <p className="font-display text-lg font-bold text-[#0d1b1e]">{r.name}</p>
                <p className="text-sm text-[#5c6b70]">
                  {r.origin} → {r.destination} · {r.stops} stops · {r.approxDistanceKm} km
                </p>
                <div className="mt-4 space-y-2">
                  {routeBuses.map((b) => (
                    <div key={b.id} className="flex items-center justify-between rounded-2xl border border-[#0d1b1e]/8 px-3 py-2 text-sm">
                      <span className="font-mono text-[#0d1b1e]">Bus {b.number} · {b.driverName}</span>
                      <span className={b.status === 'delayed' ? 'text-[#b45309]' : 'text-[#00875a]'}>{b.status}</span>
                    </div>
                  ))}
                  {routeBuses.length === 0 && <p className="text-sm text-[#5c6b70]">No bus assigned.</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'map' && <div className="-m-6"><LiveMap /></div>}
      {tab === 'notifications' && <NotificationsPanel notifications={MOCK_NOTIFICATIONS} />}
    </DashboardShell>
  );
}
