import { useEffect, useState } from 'react';
import { ROUTES } from '@/types/route.types';

export interface SimulatedBus {
  id: string;
  number: number;
  routeId: string;
  driverName: string;
  driverPhone: string;
  status: 'running' | 'delayed' | 'idle';
  etaMinutes: number;
  progress: number;
}

const SEED: Omit<SimulatedBus, 'progress'>[] = [
  { id: 'b1', number: 2, routeId: 'gobindaganj', driverName: 'Jashim Uddin', driverPhone: '01711-220301', status: 'running', etaMinutes: 12 },
  { id: 'b2', number: 3, routeId: 'sherpur', driverName: 'Rafiqul Islam', driverPhone: '01711-220302', status: 'running', etaMinutes: 6 },
  { id: 'b3', number: 5, routeId: 'sathmatha', driverName: 'Anwar Hossain', driverPhone: '01711-220303', status: 'idle', etaMinutes: 0 },
  { id: 'b4', number: 8, routeId: 'gabtoli', driverName: 'Sohel Rana', driverPhone: '01711-220304', status: 'delayed', etaMinutes: 21 },
];

export function useSimulatedBuses(): SimulatedBus[] {
  const [buses, setBuses] = useState<SimulatedBus[]>(
    SEED.map((b, i) => ({ ...b, progress: 0.15 + i * 0.2 })),
  );

  useEffect(() => {
    const t = setInterval(() => {
      setBuses((prev) =>
        prev.map((b) =>
          b.status === 'idle'
            ? b
            : {
                ...b,
                progress: (b.progress + 0.01) % 1,
                etaMinutes: Math.max(1, b.etaMinutes - (Math.random() > 0.6 ? 1 : 0)),
              },
        ),
      );
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return buses;
}

export function routeName(routeId: string) {
  return ROUTES.find((r) => r.id === routeId)?.name ?? routeId;
}
