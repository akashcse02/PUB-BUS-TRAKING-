import { ArrowRight, Radio } from 'lucide-react';
import LiveMapAnimation from './LiveMapAnimation';

export default function HeroSection() {
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-white">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[46rem] rounded-full bg-[#00c56c]/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-[#00c56c]/30 bg-[#d6f7e7] px-4 py-1.5 text-xs font-mono font-medium text-[#009a54] mb-6">
            <Radio size={12} className="animate-pulse" />
            LIVE GPS TRACKING · PUNDRA UNIVERSITY
          </div>

          <h1 className="reveal font-display text-4xl md:text-6xl font-bold text-[#0d1b1e] leading-[1.05]">
            PUB Bus location Detec
          </h1>

          <p
            className="reveal max-w-xl mt-5 text-[#5c6b70] text-lg leading-relaxed"
            style={{ animationDelay: '0.1s' }}
          >
            Real-time location, ETA, and delay alerts for every Pundra University
            shuttle — for students, teachers, drivers, and admins alike.
          </p>

          <div className="reveal flex flex-wrap gap-3 mt-8" style={{ animationDelay: '0.2s' }}>
            <a
              href="#signup"
              className="pub-btn inline-flex items-center gap-2 rounded-full bg-[#00c56c] px-6 py-3 text-sm font-semibold text-white hover:bg-[#009a54]"
            >
              Track my bus <ArrowRight size={16} />
            </a>
            <a
              href="#live-map"
              className="pub-btn inline-flex items-center gap-2 rounded-full border-2 border-[#0d1b1e]/12 px-6 py-3 text-sm font-semibold text-[#0d1b1e] hover:border-[#00c56c]"
            >
              View live map
            </a>
          </div>

          <div className="reveal grid grid-cols-3 gap-4 mt-10 max-w-md" style={{ animationDelay: '0.25s' }}>
            <div>
              <p className="font-mono text-2xl font-semibold text-[#0d1b1e]">4</p>
              <p className="text-xs text-[#5c6b70] mt-1">Routes live</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-[#0d1b1e]">8</p>
              <p className="text-xs text-[#5c6b70] mt-1">Buses tracked</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-[#00c56c]">~6 min</p>
              <p className="text-xs text-[#5c6b70] mt-1">Avg. ETA accuracy</p>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ animationDelay: '0.3s' }}>
          <LiveMapAnimation />
        </div>
      </div>
    </section>
  );
}
