"use client";

import AppShell from "@/components/layout/AppShell";
import { IMAGES, helpDesks } from "@/lib/mock-data";
import { useToast } from "@/lib/toast-context";
import { useModal } from "@/lib/modal-context";
import Link from "next/link";

export default function SafetyPage() {
  const { showToast } = useToast();
  const { openModal, closeModal } = useModal();

  const handleSOS = () => {
    openModal(
      "🚨 SOS Emergency",
      <div className="space-y-4">
        <p className="text-on-surface font-medium">
          This will immediately alert the nearest security team and send your GPS location.
        </p>
        <p className="text-sm">
          Are you sure you need emergency assistance?
        </p>
      </div>,
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 bg-error text-on-error py-3 rounded-full font-bold active:scale-95 transition-transform"
          onClick={() => {
            closeModal();
            showToast("Emergency alert sent! Help is on the way.", "warning");
          }}
        >
          YES — Send Alert
        </button>
        <button
          className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-full font-bold"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    );
  };

  const handleIncidentReport = () => {
    openModal(
      "Report an Incident",
      <div className="space-y-4">
        <div>
          <label htmlFor="incident-type" className="block text-sm font-medium text-on-surface mb-2">Incident Type</label>
          <select id="incident-type" className="w-full bg-surface-container-high rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary border-none text-on-surface">
            <option>Suspicious Activity</option>
            <option>Overcrowding</option>
            <option>Hazard / Obstruction</option>
            <option>Lost / Found Item</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="incident-desc" className="block text-sm font-medium text-on-surface mb-2">Description</label>
          <textarea id="incident-desc" rows={3} className="w-full bg-surface-container-high rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary border-none text-on-surface resize-none" placeholder="Describe the incident..." />
        </div>
      </div>,
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 gradient-primary text-white py-3 rounded-full font-bold active:scale-95 transition-transform"
          onClick={() => {
            closeModal();
            showToast("Incident reported. Security team notified.", "success");
          }}
        >
          Submit Report
        </button>
        <button className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-full font-bold" onClick={closeModal}>
          Cancel
        </button>
      </div>
    );
  };

  return (
    <AppShell>
      <div className="px-6 pt-8 space-y-6">
        {/* Safety Status Bar */}
        <section className="bg-secondary-container text-on-secondary-container rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-on-secondary-container rounded-full p-2">
              <span className="material-symbols-outlined text-white filled">verified_user</span>
            </div>
            <div>
              <p className="text-xs font-semibold opacity-80 uppercase tracking-widest">Current Status</p>
              <h2 className="text-xl font-bold">Safe Environment</h2>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="h-3 w-3 bg-white rounded-full animate-pulse-soft"></span>
            <p className="text-[10px] font-medium mt-1">REAL-TIME</p>
          </div>
        </section>

        {/* Emergency Exits Map */}
        <section className="space-y-3">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold tracking-tight">Emergency Exits</h3>
            <Link href="/map" className="text-sm font-medium text-primary">Floor Map</Link>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover opacity-80" src={IMAGES.safetyFloorPlan} alt="Emergency exits floor plan" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute top-1/4 left-1/3 p-2 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">door_open</span>
            </div>
            <div className="absolute bottom-1/3 right-1/4 p-2 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-sm">door_open</span>
            </div>
          </div>
        </section>

        {/* Nearest Help Desk */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight">Nearest Help Desk</h3>
          {helpDesks.map((desk) => (
            <div key={desk.id} className="bg-surface-container-lowest rounded-xl p-5 flex items-center gap-5 shadow-sm" style={{ border: "1px solid rgba(195,198,215,0.1)" }}>
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" src={desk.imageUrl} alt={desk.name} />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg leading-tight">{desk.name}</h4>
                <p className="text-sm text-on-surface-variant mb-2">Distance: {desk.distance} • {desk.walkTime}</p>
                <Link href="/map" className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">directions</span>
                  Navigate
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Report an Incident */}
        <section>
          <button
            onClick={handleIncidentReport}
            className="w-full bg-surface-container-low rounded-xl p-6 border-2 border-dashed border-outline-variant flex items-center justify-between hover:bg-surface-container-high transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl">report_problem</span>
              <div>
                <h4 className="font-bold text-on-surface">Report an Incident</h4>
                <p className="text-sm text-on-surface-variant">Non-emergency safety concerns</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-2 gap-4">
          <button
            onClick={() => showToast("3 First Aid Kits found nearby. Closest: 20m away.", "info")}
            className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-2 text-left hover:shadow-cloud transition-shadow"
            style={{ border: "1px solid rgba(195,198,215,0.1)" }}
          >
            <span className="material-symbols-outlined text-primary">medical_services</span>
            <h5 className="font-bold text-sm">First Aid Kit</h5>
            <p className="text-xs text-on-surface-variant">View locations</p>
          </button>
          <button
            onClick={() => showToast("Quiet Zone: Room 105, 2nd Floor. Currently available.", "info")}
            className="bg-surface-container-lowest p-4 rounded-xl shadow-sm space-y-2 text-left hover:shadow-cloud transition-shadow"
            style={{ border: "1px solid rgba(195,198,215,0.1)" }}
          >
            <span className="material-symbols-outlined text-primary">record_voice_over</span>
            <h5 className="font-bold text-sm">Quiet Zones</h5>
            <p className="text-xs text-on-surface-variant">Sensory relief</p>
          </button>
        </section>
      </div>

      {/* SOS Emergency Button */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-50">
        <button
          onClick={handleSOS}
          className="w-full bg-error text-on-error py-6 px-8 rounded-xl shadow-2xl flex items-center justify-center gap-4 transition-transform active:scale-95 border-b-4 border-on-error-container"
          aria-label="SOS Emergency - Tap for immediate help"
        >
          <span className="material-symbols-outlined text-4xl filled">emergency</span>
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tap for Immediate Help</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">SOS EMERGENCY</h2>
          </div>
        </button>
      </div>
    </AppShell>
  );
}
