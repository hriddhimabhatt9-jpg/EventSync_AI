"use client";

import TopAppBar from "@/components/layout/TopAppBar";
import dynamic from "next/dynamic";
import { featuredEvent, IMAGES } from "@/lib/mock-data";

const GoogleMap = dynamic(() => import("@/components/ui/GoogleMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container-high animate-pulse flex items-center justify-center"><span className="material-symbols-outlined text-outline text-4xl">map</span></div>
});
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { useModal } from "@/lib/modal-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EventDetailsPage() {
  const event = featuredEvent;
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const handleRegister = () => {
    if (!isAuthenticated) {
      openModal(
        "Sign In Required",
        <p className="text-on-surface">You need to sign in to register for this event. Create an account or log in to continue.</p>,
        <div className="flex gap-3 w-full">
          <button
            className="flex-1 gradient-primary text-white py-3 rounded-full font-bold active:scale-95 transition-transform"
            onClick={() => { closeModal(); router.push("/auth/login"); }}
          >
            Sign In
          </button>
          <button
            className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-full font-bold"
            onClick={() => { closeModal(); router.push("/auth/register"); }}
          >
            Register
          </button>
        </div>
      );
      return;
    }
    openModal(
      "Confirm Registration",
      <div className="space-y-4">
        <p className="text-on-surface font-medium">You&apos;re about to register for:</p>
        <div className="bg-surface-container-low rounded-xl p-4">
          <h4 className="font-bold text-on-surface">Future of Neural Interfaces 2024</h4>
          <p className="text-xs text-on-surface-variant mt-1">September 24, 2024 • Grand Innovation Center</p>
          <p className="text-primary font-bold mt-2">$299.00</p>
        </div>
      </div>,
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 gradient-primary text-white py-3 rounded-full font-bold active:scale-95 transition-transform"
          onClick={() => {
            closeModal();
            showToast("Successfully registered for the event! 🎉", "success");
          }}
        >
          Confirm & Pay
        </button>
        <button className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-full font-bold" onClick={closeModal}>
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <TopAppBar showShare />

      <main className="pt-16">
        {/* Hero Banner */}
        <section className="relative w-full aspect-[4/5] md:aspect-[16/7] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={event.title} className="w-full h-full object-cover" src={IMAGES.eventDetailsBanner} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-4 py-1.5 bg-primary-container text-on-primary-container text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              {event.category}
            </span>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
              Future of Neural Interfaces 2024
            </h1>
          </div>
        </section>

        {/* Quick Info */}
        <section className="px-6 -mt-4 relative z-10">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-cloud-lg flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">September 24, 2024</p>
                <p className="text-xs text-on-surface-variant">09:00 AM - 05:00 PM EST</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Grand Innovation Center</p>
                <p className="text-xs text-on-surface-variant">451 Tech Plaza, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="px-6 py-10">
          <h2 className="text-xl font-bold mb-4">About the Event</h2>
          <p className="text-on-surface-variant leading-relaxed text-sm mb-6">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-on-surface-variant">{tag}</span>
            ))}
          </div>
        </section>

        {/* Speakers */}
        <section className="px-6 py-2" style={{ background: "rgba(242,244,246,0.5)" }}>
          <div className="flex justify-between items-center mb-6 pt-8">
            <h2 className="text-xl font-bold">Keynote Speakers</h2>
            <button
              className="text-primary text-sm font-semibold"
              onClick={() => showToast(`${event.speakers.length} speakers scheduled for this event.`, "info")}
            >
              See All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
            {event.speakers.map((speaker) => (
              <div key={speaker.id} className="flex-shrink-0 w-32 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={speaker.name} src={speaker.imageUrl} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-bold text-center">{speaker.name}</p>
                <p className="text-[10px] text-on-surface-variant text-center uppercase tracking-tighter">{speaker.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section className="px-6 py-10">
          <h2 className="text-xl font-bold mb-8">Schedule</h2>
          <div className="space-y-8 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/30"></div>
            {event.schedule.map((item) => (
              <div key={item.id} className="relative pl-12">
                <div className={`absolute left-3 top-1.5 w-2.5 h-2.5 rounded-full ${item.isActive ? "bg-primary ring-4 ring-primary/20" : "bg-outline-variant ring-4 ring-outline-variant/10"}`}></div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <span className={`text-[11px] font-semibold py-0.5 px-2 rounded-full ${item.isActive ? "text-primary bg-primary/10" : "text-on-surface-variant bg-surface-container"}`}>{item.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Map — Google Maps Embed */}
        <section className="px-6 py-6 mb-24">
          <h2 className="text-xl font-bold mb-4">Location</h2>
          <Link href="/map" className="block w-full h-48 bg-surface-container-high rounded-xl overflow-hidden relative" style={{ border: "1px solid rgba(195,198,215,0.2)" }}>
            <GoogleMap
              query="Grand Innovation Center, 451 Tech Plaza, San Francisco, CA"
              title="Event Venue Location"
              className="w-full h-full"
              style={{ filter: "grayscale(0.3) opacity(0.85)" }}
            />
          </Link>
        </section>
      </main>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 w-full px-6 py-6 flex items-center gap-4 z-50"
        style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(195,198,215,0.1)" }}
      >
        <div className="flex-grow">
          <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Early Bird</p>
          <p className="text-lg font-extrabold text-on-surface">$299.00</p>
        </div>
        <button
          onClick={handleRegister}
          className="gradient-primary text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95"
          style={{ boxShadow: "0 10px 40px -10px rgba(0,74,198,0.3)" }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
