import { Bus, Navigation, Users } from 'lucide-react';
import { ROUTES } from '../../types/route.types';

const HIGHLIGHTS = [
  {
    icon: Bus,
    title: 'One tracker, four routes',
    body: 'Gobindaganj, Sherpur, Sathmatha, and Gabtoli — every shuttle to and from Pundra University in one place.',
  },
  {
    icon: Navigation,
    title: 'Live position, not a timetable guess',
    body: 'Drivers broadcast GPS location every few seconds, so the map reflects where the bus actually is.',
  },
  {
    icon: Users,
    title: 'Built for the whole campus',
    body: 'Separate views for students, teachers, drivers, and admins — each sees exactly what they need.',
  },
];

const ROUTE_COLORS = ['#00c56c', '#2d9cdb', '#ff6b35', '#9b51e0'];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        <div className="reveal">
          <p className="font-mono text-xs font-medium text-[#00c56c] mb-3">ABOUT THE SYSTEM</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0d1b1e] mb-6">
            The university bus, minus the guesswork.
          </h2>
          <p className="text-[#5c6b70] mb-8 leading-relaxed">
            PUBTrack replaces the daily "is the bus close yet?" question with a
            live map. Every driver's phone shares GPS location in real time, so
            students and teachers on any of the four routes can see exactly
            when to head to the stop — and get notified the moment a bus is
            running late.
          </p>

          <div className="space-y-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d6f7e7]">
                  <Icon size={17} className="text-[#009a54]" />
                </span>
                <div>
                  <p className="text-[#0d1b1e] font-semibold">{title}</p>
                  <p className="text-sm text-[#5c6b70] mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 content-start" style={{ animationDelay: '0.15s' }}>
          {ROUTES.map((route, i) => (
            <div
              key={route.id}
              className="pub-card rounded-2xl border border-[#0d1b1e]/10 bg-white p-5"
            >
              <span
                className="inline-block h-1.5 w-10 rounded-full mb-4"
                style={{ backgroundColor: ROUTE_COLORS[i % ROUTE_COLORS.length] }}
              />
              <p className="font-display text-[#0d1b1e] font-semibold">{route.name}</p>
              <p className="text-xs text-[#5c6b70] mt-1">
                {route.origin} → {route.destination}
              </p>
              <div className="flex justify-between mt-4 font-mono text-xs text-[#5c6b70]">
                <span>{route.stops} stops</span>
                <span>{route.approxDistanceKm} km</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
