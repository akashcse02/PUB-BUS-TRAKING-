import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import PassengerDashboard from '@/components/dashboard/PassengerDashboard';
import DriverDashboard from '@/components/dashboard/DriverDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import '../styles/landing-theme.css';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: 'My dashboard | PUBTrack' },
      { name: 'description', content: 'Your PUBTrack dashboard: live shuttle status, routes, alerts and role tools for students, teachers, drivers and admins.' },
      { property: 'og:title', content: 'My dashboard | PUBTrack' },
      { property: 'og:description', content: 'Live shuttle status, routes, alerts and role tools for students, teachers, drivers and admins.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: '/auth' });
  }, [loading, user, navigate]);

  if (loading || !user || roleLoading || !role) {
    return (
      <main className="min-h-dvh grid place-items-center bg-white text-[#5c6b70]">Loading…</main>
    );
  }

  const name =
    (user.user_metadata?.['full_name'] as string | undefined) ?? user.email?.split('@')[0] ?? 'there';

  if (role === 'admin') return <AdminDashboard userName={name} />;
  if (role === 'driver') return <DriverDashboard userName={name} />;
  return <PassengerDashboard role={role} userName={name} />;
}
