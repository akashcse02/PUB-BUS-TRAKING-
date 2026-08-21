import { useEffect, useRef, useState } from 'react';
import { Radio, Search, Navigation, Info, Bus, MapPin, Clock } from 'lucide-react';

const STOPS = [
  { id: '1', name: 'Gobindaganj', lat: 25.132, lng: 89.395, type: 'terminal' },
  { id: '2', name: 'Sherpur', lat: 24.842, lng: 89.412, type: 'stop' },
  { id: '3', name: 'Sathmatha', lat: 24.851, lng: 89.373, type: 'stop' },
  { id: '4', name: 'Pundra University', lat: 24.885, lng: 89.362, type: 'terminal' },
];

const BUSES = [
  { id: 'B01', route: 'R1', lat: 24.851, lng: 89.373, status: 'on-time', occupancy: 'low' },
  { id: 'B03', route: 'R1', lat: 24.870, lng: 89.368, status: 'delayed', occupancy: 'medium' },
];

export default function LiveMap() {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <section id="live-map" className="relative w-full max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00c56c]/30 bg-[#d6f7e7] px-4 py-1.5 text-xs font-mono font-medium text-[#009a54] mb-4">
              <Radio size={12} className="animate-pulse" />
              LIVE SYSTEM STATUS · ALL SYSTEMS NOMINAL
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0d1b1e]">Live Network Map</h2>
            <p className="mt-4 text-[#5c6b70] text-lg">
              Track university shuttles in real-time across the city. Select a bus or stop to see detailed arrival times and occupancy.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5c6b70] transition-colors group-focus-within:text-[#00c56c]" size={18} />
              <input 
                type="text" 
                placeholder="Search route or stop..." 
                className="pl-12 pr-6 py-3 rounded-full border border-[#0d1b1e]/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00c56c]/20 focus:border-[#00c56c] transition-all w-full md:w-72 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[600px] w-full rounded-[2.5rem] overflow-hidden border border-[#0d1b1e]/10 bg-[#f7f9fa] shadow-[0_32px_64px_-32px_rgba(13,27,30,0.3)]">
          {/* Map Controls */}
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
            <button className="p-3 bg-white rounded-2xl border border-[#0d1b1e]/10 shadow-sm hover:bg-[#f3f6f8] text-[#0d1b1e] transition-colors">
              <Navigation size={20} />
            </button>
            <button className="p-3 bg-white rounded-2xl border border-[#0d1b1e]/10 shadow-sm hover:bg-[#f3f6f8] text-[#0d1b1e] transition-colors">
              <Info size={20} />
            </button>
          </div>

          {/* Map Overlay Info */}
          <div className="absolute bottom-6 left-6 z-20 w-80 md:w-96">
            <div className="bg-white rounded-[2rem] p-6 border border-[#0d1b1e]/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-lg">Bus 03 · Sathmatha</span>
                <span className="px-3 py-1 bg-[#d6f7e7] text-[#009a54] text-xs font-mono font-bold rounded-full">LIVE</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-[#f3f6f8] rounded-xl">
                    <MapPin size={18} className="text-[#00c56c]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5c6b70] font-mono">NEXT STOP</p>
                    <p className="font-semibold text-[#0d1b1e]">Pundra University Terminal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-[#f3f6f8] rounded-xl">
                    <Clock size={18} className="text-[#00c56c]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5c6b70] font-mono">ESTIMATED ARRIVAL</p>
                    <p className="font-semibold text-[#0d1b1e]">10:42 AM · <span className="text-[#00c56c]">On time</span></p>
                  </div>
                </div>
              </div>
              <button className="pub-btn w-full mt-6 py-3 bg-[#0d1b1e] text-white rounded-2xl font-semibold text-sm">
                Full schedule
              </button>
            </div>
          </div>

          {/* SVG Map Base (Simulation of a map) */}
          <div className="absolute inset-0 z-0 bg-[#f7f9fa]">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              {/* City Layout Lines */}
              <g stroke="#0d1b1e" strokeWidth="0.5" strokeOpacity="0.08">
                {Array.from({ length: 20 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="800" />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 60} x2="1200" y2={i * 60} />
                ))}
              </g>

              {/* Main Road */}
              <path 
                d="M 100 600 C 300 600 400 300 600 300 C 800 300 900 500 1100 500" 
                fill="none" 
                stroke="#0d1b1e" 
                strokeWidth="12" 
                strokeOpacity="0.05" 
                strokeLinecap="round" 
              />
              <path 
                d="M 100 600 C 300 600 400 300 600 300 C 800 300 900 500 1100 500" 
                fill="none" 
                stroke="#00c56c" 
                strokeWidth="6" 
                strokeLinecap="round"
                className="opacity-40"
              />

              {/* Stops */}
              <g>
                <circle cx="100" cy="600" r="10" fill="white" stroke="#00c56c" strokeWidth="3" />
                <circle cx="500" cy="380" r="8" fill="white" stroke="#00c56c" strokeWidth="3" />
                <circle cx="850" cy="420" r="8" fill="white" stroke="#00c56c" strokeWidth="3" />
                <circle cx="1100" cy="500" r="10" fill="white" stroke="#00c56c" strokeWidth="3" />
              </g>

              {/* Animated Bus */}
              <BusMarker />
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute top-6 left-6 z-20 flex gap-2">
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#0d1b1e]/10 shadow-sm flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00c56c]"></div>
                <span className="text-xs font-medium text-[#0d1b1e]">Route 01</span>
              </div>
              <div className="w-px h-4 bg-[#0d1b1e]/10"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0d1b1e]"></div>
                <span className="text-xs font-medium text-[#0d1b1e]">Bus Location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Buses', value: '12', icon: Bus },
            { label: 'Total Stops', value: '28', icon: MapPin },
            { label: 'System Load', value: 'Normal', icon: Radio, color: 'text-[#00c56c]' },
            { label: 'Avg. Accuracy', value: '98%', icon: Navigation },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#0d1b1e]/10 shadow-sm hover:border-[#00c56c]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#f3f6f8] rounded-xl">
                  <stat.icon size={16} className={stat.color || "text-[#5c6b70]"} />
                </div>
                <span className="text-xs font-mono text-[#5c6b70] uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-display font-bold text-[#0d1b1e]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusMarker() {
  return (
    <g className="bus-live-marker">
      <circle r="24" fill="#00c56c" className="animate-ping opacity-20" />
      <g transform="translate(-18, -14)">
        <rect width="36" height="28" rx="8" fill="#0d1b1e" className="shadow-lg" />
        <rect x="5" y="5" width="16" height="10" rx="3" fill="#8fe9c0" />
        <rect x="23" y="5" width="8" height="10" rx="2" fill="#00c56c" />
        <circle cx="10" cy="28" r="4" fill="#0d1b1e" />
        <circle cx="26" cy="28" r="4" fill="#0d1b1e" />
      </g>
      <style>{`
        .bus-live-marker {
          offset-path: path("M 100 600 C 300 600 400 300 600 300 C 800 300 900 500 1100 500");
          animation: bus-live-drive 20s linear infinite;
        }
        @keyframes bus-live-drive {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
    </g>
  );
}
