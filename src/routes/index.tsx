import { createFileRoute } from "@tanstack/react-router";
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import ScheduleSection from '../components/landing/ScheduleSection';
import LiveMap from '../components/landing/LiveMap';
import '../styles/landing-theme.css';

export const Route = createFileRoute("/")({
  head: () => ({
    title: "PUBTrack | Pundra University Bus Tracker",
    meta: [
      { name: "description", content: "Real-time location, ETA, and delay alerts for every Pundra University shuttle." },
      { property: "og:title", content: "PUBTrack | Pundra University Bus Tracker" },
      { property: "og:description", content: "Real-time location, ETA, and delay alerts for every Pundra University shuttle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <LiveMap />
    </main>

  );
}

