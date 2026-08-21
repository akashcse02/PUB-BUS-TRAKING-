import { Clock } from 'lucide-react';
import { ROUTES } from '../../types/route.types';

const ROUTE_COLORS = ['#00c56c', '#2d9cdb', '#ff6b35', '#9b51e0'];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="px-6 py-24 bg-[#f3f6f8]">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-3 mb-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6f7e7]">
            <Clock size={18} className="text-[#009a54]" />
          </span>
          <h2 className="font-display text-3xl font-bold text-[#0d1b1e]">
            Time Schedule
          </h2>
        </div>

        <div
          className="reveal overflow-x-auto rounded-2xl border border-[#0d1b1e]/10 bg-white"
          style={{ animationDelay: '0.1s' }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#f3f6f8] text-[#5c6b70] font-mono text-xs uppercase">
                <th className="px-5 py-3 font-medium">Route</th>
                <th className="px-5 py-3 font-medium">Morning trips</th>
                <th className="px-5 py-3 font-medium">Afternoon trips</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((route, i) => (
                <tr
                  key={route.id}
                  className="border-t border-[#0d1b1e]/8 hover:bg-[#d6f7e7]/40 transition-colors"
                >
                  <td className="px-5 py-4 text-[#0d1b1e] font-semibold">
                    <span className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: ROUTE_COLORS[i % ROUTE_COLORS.length] }}
                      />
                      {route.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[#5c6b70]">
                    {route.morningTrips.join(' · ')}
                  </td>
                  <td className="px-5 py-4 font-mono text-[#5c6b70]">
                    {route.afternoonTrips.join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#5c6b70] mt-4">
          Scheduled times are a guide — check the live map for a bus's actual position and ETA.
        </p>
      </div>
    </section>
  );
}
