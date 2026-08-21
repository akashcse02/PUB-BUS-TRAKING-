import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { MapPin, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Time Schedule', href: '#schedule' },
  { label: 'Live Map', href: '#live-map' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur border-b border-[#0d1b1e]/8 shadow-[0_10px_30px_-24px_rgba(13,27,30,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-[#0d1b1e]">
          
            <img src="/logo.png"alt="Logo" className="w-[20px] h-[20px] object-contain"/>
        
          PUB BUS TRACKER
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pub-nav-link text-sm font-medium text-[#5c6b70] hover:text-[#0d1b1e] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-[#0d1b1e] hover:text-[#00c56c] transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="pub-btn text-sm font-semibold px-5 py-2.5 rounded-full border-2 border-[#0d1b1e]/12 text-[#0d1b1e] hover:border-[#00c56c]"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-sm font-medium text-[#0d1b1e] hover:text-[#00c56c] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="pub-btn text-sm font-semibold px-5 py-2.5 rounded-full bg-[#00c56c] text-white hover:bg-[#009a54]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-[#0d1b1e]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-white border-b border-[#0d1b1e]/8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-[#5c6b70]">
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-[#0d1b1e]">Dashboard</Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-semibold px-5 py-2.5 rounded-full border-2 border-[#0d1b1e]/12 text-[#0d1b1e]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-sm font-medium text-[#0d1b1e]">Login</Link>
                <Link
                  to="/auth"
                  className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#00c56c] text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
