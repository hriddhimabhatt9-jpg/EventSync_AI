"use client";

import AppShell from "@/components/layout/AppShell";
import { IMAGES, trendingEvents } from "@/lib/mock-data";
import { useToast } from "@/lib/toast-context";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const { showToast } = useToast();
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent navigating to event details
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Bookmark removed.", "info");
      } else {
        next.add(id);
        showToast("Event bookmarked!", "success");
      }
      return next;
    });
  };

  return (
    <AppShell>
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-6">
        <div className="relative overflow-hidden rounded-xl gradient-primary p-8 text-white min-h-[380px] flex flex-col justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Dynamic event crowd"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
            src={IMAGES.heroLanding}
          />
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              AI-Powered Events
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight mb-5">
              Elevate Your Event Experience
            </h1>
            <p className="text-lg text-primary-fixed leading-relaxed opacity-90 max-w-md mb-8">
              Discover, navigate, and connect like never before with real-time AI
              insights for every gathering.
            </p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl hover:scale-95 transition-transform"
            >
              Explore Now
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 -mt-10 relative z-20 mb-8">
        <div className="bg-surface-container-lowest p-4 rounded-full shadow-cloud flex items-center gap-3">
          <span className="material-symbols-outlined text-outline ml-3">search</span>
          <input
            className="w-full bg-transparent border-none focus:outline-none text-on-surface font-medium placeholder:text-on-surface-variant"
            placeholder="Search events, venues, or vibes..."
            type="text"
            id="hero-search"
            aria-label="Search events"
          />
          <Link
            href="/discover"
            className="bg-primary p-3 rounded-full text-white flex-shrink-0 hover:bg-primary-container transition-colors"
            aria-label="Filter events"
          >
            <span className="material-symbols-outlined">tune</span>
          </Link>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Safety First - Full Width - NOW CLICKABLE */}
          <Link href="/safety" className="col-span-2 bg-surface-container-low p-8 rounded-xl relative overflow-hidden group hover:shadow-cloud transition-shadow">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined filled">shield_with_heart</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Real-time safety alerts and crowd density monitoring powered by AI.
              </p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[120px]">verified_user</span>
            </div>
          </Link>

          {/* Networking */}
          <Link href="/networking" className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors">
            <div className="w-10 h-10 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Networking</h3>
            <p className="text-xs text-on-surface-variant">Smart matching with relevant peers.</p>
          </Link>

          {/* Navigation */}
          <Link href="/map" className="bg-surface-container p-6 rounded-xl hover:bg-surface-container-high transition-colors">
            <div className="w-10 h-10 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">explore</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Navigation</h3>
            <p className="text-xs text-on-surface-variant">AR-powered indoor venue maps.</p>
          </Link>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-6">
        <div className="px-6 flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Trending Events</h2>
            <p className="text-sm text-on-surface-variant">Handpicked for your preferences</p>
          </div>
          <Link href="/discover" className="text-primary font-bold text-sm">View All</Link>
        </div>
        <div className="flex overflow-x-auto gap-6 px-6 pb-6 no-scrollbar">
          {trendingEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden group"
              style={{ border: "1px solid rgba(195,198,215,0.1)" }}
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={event.imageUrl}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-primary">
                  {event.date}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                <div className="flex items-center gap-1 text-on-surface-variant text-xs mb-3">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {event.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">{event.price}</span>
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      bookmarked.has(event.id) ? "bg-primary/10 text-primary" : "text-primary-container"
                    }`}
                    style={!bookmarked.has(event.id) ? { background: "rgba(219,225,255,0.3)" } : {}}
                    aria-label={bookmarked.has(event.id) ? "Remove bookmark" : "Bookmark event"}
                    onClick={(e) => toggleBookmark(e, event.id)}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={bookmarked.has(event.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-8">
        <div className="bg-on-surface text-surface rounded-xl p-8 text-center relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 relative z-10">Join 50,000+ Event Goers</h2>
          <p className="text-surface-variant mb-8 relative z-10 text-sm leading-relaxed">
            Experience the future of events with the world&apos;s most advanced AI synchronization platform.
          </p>
          <div className="flex justify-center -space-x-3 mb-8 relative z-10">
            {[IMAGES.avatarWoman1, IMAGES.avatarMan1, IMAGES.avatarWoman2].map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} alt="Community member" className="w-10 h-10 rounded-full border-2 border-on-surface object-cover" src={src} />
            ))}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-bold border-2 border-on-surface text-white">+12k</div>
          </div>
          <Link
            href="/auth/register"
            className="bg-primary text-white w-full py-4 rounded-full font-bold relative z-10 hover:bg-primary-container transition-colors block text-center"
          >
            Get Early Access
          </Link>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        </div>
      </section>
    </AppShell>
  );
}
