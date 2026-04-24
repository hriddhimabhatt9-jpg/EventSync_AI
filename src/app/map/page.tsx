"use client";

import AppShell from "@/components/layout/AppShell";
import dynamic from "next/dynamic";
import { useToast } from "@/lib/toast-context";

const GoogleMap = dynamic(() => import("@/components/ui/GoogleMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container-high animate-pulse flex items-center justify-center"><span className="material-symbols-outlined text-outline text-4xl">map</span></div>
});
import { useState } from "react";

export default function SmartNavigationPage() {
  const { showToast } = useToast();
  const [navActive, setNavActive] = useState(false);

  const handleStartNav = () => {
    setNavActive(true);
    showToast("Navigation started! Follow the dotted path.", "success");
  };

  const handleCancelNav = () => {
    setNavActive(false);
    showToast("Navigation cancelled.", "info");
  };

  return (
    <AppShell className="!pt-16 !pb-0">
      <div className="relative w-full" style={{ height: "calc(100dvh - 80px)" }}>
        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-surface-container-lowest rounded-full p-3 px-5 flex items-center gap-3 shadow-cloud">
            <span className="material-symbols-outlined text-outline">search</span>
            <input
              className="flex-grow bg-transparent border-none focus:outline-none text-on-surface placeholder:text-on-surface-variant text-sm font-medium"
              placeholder="Search venue locations..."
              type="text"
              id="map-search"
              aria-label="Search venue locations"
            />
            <button className="text-on-surface-variant" aria-label="Voice search" onClick={() => showToast("Voice search activated. Listening...", "info")}>
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
        </div>

        {/* Map Content */}
            <div className="absolute inset-0 w-full h-full">
              {/* Google Maps integration using reusable GoogleMap component */}
              <GoogleMap
                mode={navActive ? "directions" : "place"}
                origin={navActive ? "Current Location" : ""}
                destination={navActive ? "Workshop 1, Moscone Center, San Francisco, CA" : ""}
                query={!navActive ? "Moscone Center, San Francisco, CA" : ""}
                title="EventSync Venue Map"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
              />
            </div>

            {/* Location Labels */}
            <div className="absolute top-[28%] left-[15%] z-20 flex items-center gap-2 bg-surface-container-lowest rounded-full px-3 py-2 shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm filled">meeting_room</span>
              <span className="text-xs font-bold text-on-surface">Hall A</span>
            </div>

            <div className="absolute top-[62%] right-[15%] z-20 flex items-center gap-2 bg-surface-container-lowest rounded-full px-3 py-2 shadow-sm">
              <span className="material-symbols-outlined text-on-surface-variant text-sm">restaurant</span>
              <span className="text-xs font-medium text-on-surface">Food Court</span>
            </div>

            <button
              className="absolute bottom-48 right-4 z-20 bg-surface-container-lowest p-3 rounded-xl shadow-cloud hover:shadow-cloud-lg transition-shadow"
              aria-label="Toggle map layers"
              onClick={() => showToast("Toggled satellite layer view.", "info")}
            >
              <span className="material-symbols-outlined text-primary">layers</span>
            </button>

        {/* Bottom Sheet */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-surface-container-lowest rounded-t-3xl px-6 pt-3 pb-6 shadow-cloud">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 rounded-full bg-outline-variant"></div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${navActive ? "bg-primary/20" : "bg-secondary-container/30"}`}>
                <span className={`material-symbols-outlined ${navActive ? "text-primary" : "text-secondary"}`}>
                  {navActive ? "navigation" : "directions_walk"}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  {navActive ? "Navigating" : "Active Route"}
                </p>
                <h3 className="text-lg font-bold text-on-surface">Walking to Workshop 1:</h3>
                <p className="text-lg font-bold text-on-surface">3 mins</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary">my_location</span>
              <span className="text-xs font-bold text-primary">240m</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className={`flex-1 py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform ${
                navActive ? "bg-surface-container-high text-on-surface-variant" : "gradient-primary text-white"
              }`}
              onClick={navActive ? handleCancelNav : handleStartNav}
            >
              <span className="material-symbols-outlined text-sm">{navActive ? "stop" : "play_arrow"}</span>
              {navActive ? "Stop Nav" : "Start Nav"}
            </button>
            <button
              className="flex-1 bg-surface-container-high text-on-surface-variant py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
              onClick={handleCancelNav}
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
