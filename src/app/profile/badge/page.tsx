"use client";

import AppShell from "@/components/layout/AppShell";
import { IMAGES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";

// Deterministic QR code pattern to prevent hydration mismatch
const QR_PATTERN = [
  [1,1,1,0,1,0,1,0,1,1],
  [1,0,1,1,0,1,0,1,1,0],
  [1,1,1,0,0,1,1,0,1,1],
  [0,0,0,1,1,0,1,0,0,0],
  [1,0,1,0,0,1,0,1,0,1],
  [0,1,0,1,1,0,1,1,0,0],
  [1,0,0,0,1,0,0,1,1,0],
  [1,1,1,0,1,1,0,0,1,1],
  [1,0,1,1,0,0,1,0,1,0],
  [1,1,1,0,0,1,1,1,1,1],
];

export default function BadgePage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const displayName = isAuthenticated && user ? user.name : "Dr. Harrison Wells";
  const displayRole = isAuthenticated && user ? (user.role === "organizer" ? "Organizer" : "Attendee") : "Speaker";
  const displaySpecialty = isAuthenticated && user ? user.title : "AI Ethics & Future Systems";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${displayName} — EventSync AI Badge`,
          text: `Check out my EventSync AI badge for Global Summit 2024!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Badge link copied to clipboard!", "success");
      }
    } catch {
      showToast("Could not share badge.", "error");
    }
  };

  const handleSave = () => {
    showToast("Badge saved to your device!", "success");
  };

  return (
    <AppShell>
      <div className="px-6 pt-4">
        <section className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Digital Event Badge</h1>
          <p className="text-on-surface-variant text-sm">Ready for scanning at the main entrance.</p>
        </section>

        <section className="mb-6">
          <div className="rounded-xl overflow-hidden shadow-cloud-lg">
            <div className="gradient-primary p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-xl">bubble_chart</span>
                  <span className="text-white font-bold text-sm">EVENTSYNC AI</span>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5">
                  <span className="text-white text-xs font-bold">GLOBAL SUMMIT 2024</span>
                </div>
              </div>
              <div className="mt-3 relative z-10">
                <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full uppercase tracking-wider">
                  {displayRole}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container-low shadow-md -mt-16 mb-4 relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={displayName} className="w-full h-full object-cover" src={IMAGES.badgeAvatar} />
              </div>

              <h2 className="text-2xl font-extrabold text-on-surface text-center">{displayName}</h2>
              <p className="text-primary text-sm font-medium text-center mb-6">{displaySpecialty}</p>

              <div className="bg-surface-container-low rounded-xl p-6 w-full max-w-[220px] flex flex-col items-center">
                <div className="w-40 h-40 mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="QR Code for badge scanning">
                    {QR_PATTERN.map((row, ri) =>
                      row.map((cell, ci) =>
                        cell ? (
                          <rect key={`${ri}-${ci}`} x={ci * 10} y={ri * 10} width="9" height="9" fill="#191c1e" rx="1" />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">Scan for Entry & Bio</p>
              </div>

              <div className="flex justify-between w-full mt-6 pt-4">
                <p className="text-xs text-on-surface-variant font-medium">ID: ES-2024-0482</p>
                <p className="text-xs text-on-surface-variant font-medium">VALID: OCT 12-15</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex gap-4">
          <button
            onClick={handleShare}
            className="flex-1 bg-surface-container-high text-on-surface py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">share</span>
            Share
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-surface-container-high text-on-surface py-4 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Save
          </button>
        </section>
      </div>
    </AppShell>
  );
}
