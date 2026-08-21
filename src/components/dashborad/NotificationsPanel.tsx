import { Clock, AlertTriangle } from 'lucide-react';
import type { BusNotification } from '@/types/notification.types';

function timeAgoLabel(minutesAgo: number) {
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  return `${Math.floor(minutesAgo / 60)} hr ago`;
}

export default function NotificationsPanel({ notifications }: { notifications: BusNotification[] }) {
  if (!notifications.length) {
    return (
      <div className="rounded-3xl border border-[#0d1b1e]/10 bg-white p-6 text-sm text-[#5c6b70]">
        No alerts right now — ETA updates and delay reports appear here.
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-2xl">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`flex gap-3 rounded-2xl border p-4 ${
            n.type === 'delay' ? 'border-[#f59e0b]/30 bg-[#f59e0b]/8' : 'border-[#0d1b1e]/10 bg-white'
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
              n.type === 'delay' ? 'bg-[#f59e0b]/15' : 'bg-[#00c56c]/15'
            }`}
          >
            {n.type === 'delay' ? (
              <AlertTriangle size={15} className="text-[#b45309]" />
            ) : (
              <Clock size={15} className="text-[#00875a]" />
            )}
          </span>
          <div className="flex-1">
            <p className="text-sm text-[#0d1b1e]">{n.message}</p>
            <p className="text-xs font-mono text-[#5c6b70] mt-1">{timeAgoLabel(n.minutesAgo)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
