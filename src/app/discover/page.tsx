"use client";

import AppShell from "@/components/layout/AppShell";
import { events, IMAGES } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { label: "All Events", icon: "tune", key: "all" },
  { label: "AI Tech", icon: "psychology", key: "AI Tech" },
  { label: "Design", icon: "palette", key: "Design" },
  { label: "Business", icon: "business_center", key: "Business" },
];

export default function DiscoverPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = events.filter((e) => {
    const matchesCategory = activeFilter === "all" || e.category === activeFilter;
    const matchesSearch =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered[0];
  const listEvents = filtered.slice(1);

  return (
    <AppShell>
      <div className="px-6 pt-8">
        {/* Search & Filter */}
        <section className="mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input
              className="w-full bg-surface-container-high border-none rounded-full py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary text-on-surface-variant placeholder:text-on-surface-variant/60 shadow-sm"
              placeholder="Search events, workshops..."
              type="text"
              id="discover-search"
              aria-label="Search events and workshops"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Event categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeFilter === cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  activeFilter === cat.key
                    ? "bg-primary-container text-white"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Nearby Section */}
        <section className="mb-8 bg-surface-container-low rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" src={IMAGES.nearbyMap} alt="Nearby events map" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Nearby You</p>
              <p className="text-sm font-medium text-on-surface">{filtered.length} Events in San Francisco</p>
            </div>
          </div>
          <Link href="/map" className="bg-surface-container-lowest text-primary p-3 rounded-full shadow-sm hover:scale-95 transition-transform" aria-label="View map">
            <span className="material-symbols-outlined">map</span>
          </Link>
        </section>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-3 block">event_busy</span>
            <p className="text-on-surface-variant">No events matching your search.</p>
          </div>
        ) : (
          <>
            {/* Featured Event */}
            {featured && (
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Link href={`/events/${featured.id}`} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-cloud group">
                  <div className="relative h-64">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={featured.imageUrl} alt={featured.title} />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                      <span className="text-xs font-bold text-on-surface">FEATURED</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-primary font-bold text-sm tracking-tight">{featured.date}</span>
                    <h3 className="text-2xl font-extrabold text-on-surface mt-1 leading-tight">{featured.title}</h3>
                    <div className="flex items-center gap-2 text-on-surface-variant mb-6 text-sm mt-2">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{featured.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                      <span className="text-lg font-bold text-on-surface">{featured.priceLabel}</span>
                      <span className="gradient-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg">Register</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Event List */}
            <div className="grid grid-cols-1 gap-6">
              {listEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} className="bg-surface-container-lowest rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-cloud transition-shadow">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-full h-full object-cover" src={event.imageUrl} alt={event.title} />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{event.date} • {event.time}</span>
                      <h4 className="font-bold text-on-surface leading-tight mt-1 line-clamp-1">{event.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">{event.location}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-bold text-on-surface">{event.priceLabel}</span>
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Register</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
