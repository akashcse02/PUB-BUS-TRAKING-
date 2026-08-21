import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { useAuth } from '@/hooks/useAuth';
import '../styles/landing-theme.css';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Sign in | PUBTrack Bus Tracker' },
      { name: 'description', content: 'Sign in or create a PUBTrack account to track Pundra University shuttles in real time.' },
      { property: 'og:title', content: 'Sign in | PUBTrack Bus Tracker' },
      { property: 'og:description', content: 'Sign in or create a PUBTrack account to track Pundra University shuttles in real time.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: AuthPage,
});

type SignupRole = 'student' | 'teacher' | 'driver' | 'admin';

const ROLE_OPTIONS: { id: SignupRole; label: string }[] = [
  { id: 'student', label: 'Student' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'driver', label: 'Driver' },
  { id: 'admin', label: 'Admin' },
];

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<SignupRole>('student');
  const [adminCode, setAdminCode] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: '/dashboard' });
  }, [loading, user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, role, admin_code: role === 'admin' ? adminCode : '' },
          },
        });
        if (error) throw error;
        toast.success('Account created. Check your email to confirm, then sign in.');
        setMode('signin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
        navigate({ to: '/dashboard' });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(
        message.toLowerCase().includes('invalid admin access code') ||
          message.toLowerCase().includes('database error')
          ? 'Invalid admin access code'
          : message,
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error('Google sign-in failed. Please try again.');
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: '/dashboard' });
  }

  return (
    <main className="min-h-dvh bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-display font-bold text-xl text-[#0d1b1e] mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00c56c]">
            <MapPin size={17} className="text-white" />
          </span>
          PUBTrack
        </Link>

        <div className="rounded-[2rem] border border-[#0d1b1e]/10 bg-white p-8 shadow-[0_28px_60px_-40px_rgba(13,27,30,0.55)]">
          <h1 className="font-display text-2xl font-bold text-[#0d1b1e]">
            {mode === 'signin' ? 'Sign in to PUBTrack' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-[#5c6b70]">
            {mode === 'signin'
              ? 'Track your shuttle live, get ETAs and delay alerts.'
              : 'Join students, teachers and drivers using PUBTrack.'}
          </p>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="pub-btn mt-6 w-full inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#0d1b1e]/12 px-5 py-3 text-sm font-semibold text-[#0d1b1e] hover:border-[#00c56c] disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
              <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
              <path fill="#EA4335" d="M12 4.7c1.8 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.7 12 4.7z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#0d1b1e]/10" />
            <span className="font-mono text-[11px] text-[#5c6b70]">OR</span>
            <div className="h-px flex-1 bg-[#0d1b1e]/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="fullName" className="block text-xs font-mono text-[#5c6b70] mb-1.5">FULL NAME</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c] focus:ring-2 focus:ring-[#00c56c]/20"
                  placeholder="Md. Rahim"
                />
              </div>
            )}
            {mode === 'signup' && (
              <div>
                <span className="block text-xs font-mono text-[#5c6b70] mb-1.5">I AM A</span>
                <div className="grid grid-cols-4 gap-2">
                  {ROLE_OPTIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                        role === r.id
                          ? 'border-[#00c56c] bg-[#00c56c]/10 text-[#00875a]'
                          : 'border-[#0d1b1e]/12 text-[#5c6b70] hover:border-[#00c56c]/50'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {mode === 'signup' && role === 'admin' && (
              <div>
                <label htmlFor="adminCode" className="block text-xs font-mono text-[#5c6b70] mb-1.5">
                  ADMIN ACCESS CODE
                </label>
                <input
                  id="adminCode"
                  type="text"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c] focus:ring-2 focus:ring-[#00c56c]/20"
                  placeholder="PUB-ADMIN-XXXX"
                />
                <p className="mt-1.5 text-[11px] text-[#5c6b70]">
                  Admin accounts are protected — the code is issued by the university IT office.
                </p>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-[#5c6b70] mb-1.5">EMAIL</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c] focus:ring-2 focus:ring-[#00c56c]/20"
                placeholder="you@pub.ac.bd"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-mono text-[#5c6b70] mb-1.5">PASSWORD</label>
              <input
                id="password"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-[#0d1b1e]/12 px-4 py-3 text-sm focus:outline-none focus:border-[#00c56c] focus:ring-2 focus:ring-[#00c56c]/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="pub-btn w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00c56c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#009a54] disabled:opacity-60"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#5c6b70]">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-semibold text-[#00c56c] hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
