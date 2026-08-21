import type { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { MapPin, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export interface ShellNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface DashboardShellProps {
  userName: string;
  roleLabel: string;
  navItems: ShellNavItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export default function DashboardShell({
  userName,
  roleLabel,
  navItems,
  activeTab,
  onTabChange,
  children,
}: DashboardShellProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate({ to: '/', replace: true });
  }

  return (
    <div className="min-h-dvh bg-[#f6f8f7] flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[#0d1b1e]/8 bg-white p-5">
        <Link to="/" className="flex items-center gap-2 mb-8 px-1 font-display font-bold text-[#0d1b1e]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00c56c]">
            <MapPin size={17} className="text-white" />
          </span>
          PUBTrack
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-[#00c56c]/10 text-[#00875a] border border-[#00c56c]/30'
                  : 'text-[#5c6b70] hover:text-[#0d1b1e] hover:bg-[#0d1b1e]/4 border border-transparent'
              }`}
            >
              <Icon size={16} />
              {label}
              {badge ? (
                <span className="ml-auto rounded-full bg-[#f59e0b] text-white text-[10px] font-mono px-1.5 py-0.5">
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#5c6b70] hover:text-[#0d1b1e] transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between gap-4 border-b border-[#0d1b1e]/8 bg-white px-6 py-4">
          <div>
            <p className="font-display text-lg font-bold text-[#0d1b1e]">Hi, {userName}</p>
            <p className="text-xs font-mono uppercase tracking-wider text-[#5c6b70]">{roleLabel}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="md:hidden pub-btn rounded-full border-2 border-[#0d1b1e]/12 px-4 py-2 text-xs font-semibold text-[#0d1b1e]"
          >
            Sign out
          </button>
        </header>

        <div className="md:hidden flex gap-2 overflow-x-auto border-b border-[#0d1b1e]/8 bg-white px-4 py-3">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === id ? 'bg-[#00c56c] text-white' : 'bg-[#0d1b1e]/5 text-[#5c6b70]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
