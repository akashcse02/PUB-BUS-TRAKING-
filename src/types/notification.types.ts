export type NotificationType = 'eta' | 'delay';

export interface BusNotification {
  id: string;
  type: NotificationType;
  busNumber: number;
  message: string;
  minutesAgo: number;
}

export const MOCK_NOTIFICATIONS: BusNotification[] = [
  { id: 'n1', type: 'eta', busNumber: 3, message: 'Bus 3 is 6 minutes from your stop.', minutesAgo: 1 },
  {
    id: 'n2',
    type: 'delay',
    busNumber: 8,
    message: 'Driver reported heavy traffic near Gabtoli — running ~15 min late.',
    minutesAgo: 12,
  },
  {
    id: 'n3',
    type: 'delay',
    busNumber: 2,
    message: 'Driver reported a mechanical issue — expect delays on this trip.',
    minutesAgo: 34,
  },
  { id: 'n4', type: 'eta', busNumber: 5, message: 'Bus 5 arrived at Sathmatha stop.', minutesAgo: 48 },
];
