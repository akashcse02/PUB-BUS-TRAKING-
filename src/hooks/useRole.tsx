import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type AppRole = 'student' | 'teacher' | 'driver' | 'admin';

export const ROLE_LABEL: Record<AppRole, string> = {
  student: 'Student',
  teacher: 'Teacher',
  driver: 'Driver',
  admin: 'Administrator',
};

export function useRole() {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!active) return;
        const roles = (data ?? []).map((r) => r.role as AppRole);
        const priority: AppRole[] = ['admin', 'driver', 'teacher', 'student'];
        setRole(priority.find((p) => roles.includes(p)) ?? 'student');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  return { role, loading: loading || authLoading };
}
