export interface BusRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: number;
  approxDistanceKm: number;
  morningTrips: string[];
  afternoonTrips: string[];
}

export const ROUTES: BusRoute[] = [
  {
    id: 'gobindaganj',
    name: 'Gobindaganj Route',
    origin: 'Gobindaganj',
    destination: 'Pundra University',
    stops: 6,
    approxDistanceKm: 22,
    morningTrips: ['7:00 AM', '8:15 AM'],
    afternoonTrips: ['4:00 PM', '5:30 PM'],
  },
  {
    id: 'sherpur',
    name: 'Sherpur Route',
    origin: 'Sherpur',
    destination: 'Pundra University',
    stops: 5,
    approxDistanceKm: 18,
    morningTrips: ['7:10 AM', '8:20 AM'],
    afternoonTrips: ['4:05 PM', '5:35 PM'],
  },
  {
    id: 'sathmatha',
    name: 'Sathmatha Route',
    origin: 'Sathmatha',
    destination: 'Pundra University',
    stops: 4,
    approxDistanceKm: 9,
    morningTrips: ['7:20 AM', '8:30 AM'],
    afternoonTrips: ['4:10 PM', '5:40 PM'],
  },
  {
    id: 'gabtoli',
    name: 'Gabtoli Route',
    origin: 'Gabtoli',
    destination: 'Pundra University',
    stops: 5,
    approxDistanceKm: 14,
    morningTrips: ['7:15 AM', '8:25 AM'],
    afternoonTrips: ['4:00 PM', '5:30 PM'],
  },
];
