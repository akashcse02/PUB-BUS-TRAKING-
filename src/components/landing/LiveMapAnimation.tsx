const ROUTE_PATH =
  'M 60 250 C 150 250 170 130 260 130 C 350 130 370 250 470 250 C 560 250 590 90 700 90';

const STOPS = [
  { x: 60, y: 250, label: 'Gobindaganj' },
  { x: 260, y: 130, label: 'Sherpur' },
  { x: 470, y: 250, label: 'Sathmatha' },
  { x: 700, y: 90, label: 'Pundra University' },
];

export default function LiveMapAnimation() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#0d1b1e]/10 bg-white shadow-[0_28px_60px_-40px_rgba(13,27,30,0.55)]">
      {/* map header bar */}
      <div className="flex items-center justify-between border-b border-[#0d1b1e]/8 bg-[#f3f6f8] px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] font-medium text-[#0d1b1e]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c56c] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00c56c]" />
          </span>
          BUS 03 · ON ROUTE
        </span>
        <span className="font-mono text-[11px] text-[#5c6b70]">ETA 6 MIN</span>
      </div>

      <svg
        viewBox="0 0 760 340"
        className="w-full"
        role="img"
        aria-label="Animated live map showing a bus travelling along its route"
      >
        <rect width="760" height="340" fill="#f7f9fa" />

        {/* water body */}
        <path
          className="map-water"
          d="M 0 300 C 120 280 200 330 320 320 C 460 308 560 340 760 318 L 760 340 L 0 340 Z"
        />

        {/* city blocks */}
        <g>
          <rect className="map-block" x="90" y="60" width="120" height="70" rx="6" />
          <rect className="map-block" x="240" y="190" width="140" height="80" rx="6" />
          <rect className="map-block" x="420" y="60" width="110" height="90" rx="6" />
          <rect className="map-block" x="560" y="170" width="130" height="70" rx="6" />
          <rect className="map-block" x="30" y="150" width="70" height="60" rx="6" />
        </g>

        {/* streets */}
        <g>
          <line className="map-street" x1="0" y1="170" x2="760" y2="170" />
          <line className="map-street" x1="0" y1="60" x2="760" y2="60" />
          <line className="map-street" x1="220" y1="0" x2="220" y2="340" />
          <line className="map-street" x1="540" y1="0" x2="540" y2="340" />
          <line className="map-street-minor" x1="0" y1="280" x2="760" y2="280" />
          <line className="map-street-minor" x1="100" y1="0" x2="100" y2="340" />
          <line className="map-street-minor" x1="390" y1="0" x2="390" y2="340" />
          <line className="map-street-minor" x1="670" y1="0" x2="670" y2="340" />
        </g>

        {/* route */}
        <path className="route-casing" d={ROUTE_PATH} />
        <path className="route-line" d={ROUTE_PATH} />
        <path className="route-flow" d={ROUTE_PATH} />

        {/* stops */}
        {STOPS.map((stop, i) => {
          const terminal = i === 0 || i === STOPS.length - 1;
          return (
            <g key={stop.label}>
              <circle
                className="stop-pulse"
                cx={stop.x}
                cy={stop.y}
                r={terminal ? 14 : 10}
                fill="#00c56c"
                opacity="0.2"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle
                cx={stop.x}
                cy={stop.y}
                r={terminal ? 8 : 5.5}
                fill="#ffffff"
                stroke="#00c56c"
                strokeWidth={terminal ? 4 : 3}
              />
            </g>
          );
        })}

        {/* moving bus */}
        <g className="bus-marker">
          <circle className="gps-ring" r="16" fill="#00c56c" />
          <g transform="translate(-17,-12)">
            <rect width="34" height="24" rx="7" fill="#0d1b1e" />
            <rect x="4" y="4.5" width="14" height="9" rx="3" fill="#8fe9c0" />
            <rect x="21" y="4.5" width="8" height="9" rx="2.5" fill="#00c56c" />
            <circle cx="10" cy="23" r="3.5" fill="#0d1b1e" />
            <circle cx="25" cy="23" r="3.5" fill="#0d1b1e" />
          </g>
        </g>
      </svg>

      {/* map footer */}
      <div className="flex items-center justify-between border-t border-[#0d1b1e]/8 bg-white px-5 py-3 text-[11px] font-mono text-[#5c6b70]">
        <span>GOBINDAGANJ</span>
        <span className="text-[#00c56c]">● LIVE</span>
        <span>PUNDRA UNIVERSITY</span>
      </div>
    </div>
  );
}
