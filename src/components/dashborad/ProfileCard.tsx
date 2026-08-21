import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/types/route.types';

interface ProfileCardProps {
  roleLabel: string;
  routeId: string;
  onRouteChange: (routeId: string) => void;
}

export default function ProfileCard({ roleLabel, routeId, onRouteChange }: ProfileCardProps) {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setFullName(data?.full_name ?? (user.user_metadata?.['full_name'] as string) ?? '');
      });
  }, [user]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success('Profile saved');
  }

  return (
    <div className="pub-card max-w-xl rounded-3xl border border-[#0d1b1e]/10 bg-white p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-[#00c56c]/12 flex items-center justify-center font-display text-xl font-bold text-[#00875a]">
          {(fullName || user?.email || '?').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-display text-lg font-bold text-[#0d1b1e]">{fullName || 'Your name'}</p>
          <p className="text-xs font-mono uppercase tracking-wider text-[#5c6b70]">{roleLabel}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="pname" className="block text-xs font-mono text-[#5c6b70] mb-1.5">FULL NAME</label>
          <input
            id="pname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c] focus:ring-2 focus:ring-[#00c56c]/20"
          />
        </div>
        <div>
          <label htmlFor="pemail" className="block text-xs font-mono text-[#5c6b70] mb-1.5">EMAIL</label>
          <input
            id="pemail"
            value={user?.email ?? ''}
            readOnly
            className="w-full rounded-2xl border border-[#0d1b1e]/12 bg-[#0d1b1e]/4 px-4 py-3 text-sm text-[#5c6b70]"
          />
        </div>
        <div>
          <label htmlFor="proute" className="block text-xs font-mono text-[#5c6b70] mb-1.5">MY ROUTE</label>
          <select
            id="proute"
            value={routeId}
            onChange={(e) => onRouteChange(e.target.value)}
            className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c]"
          >
            {ROUTES.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="pub-btn rounded-2xl bg-[#00c56c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#009a54] disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
