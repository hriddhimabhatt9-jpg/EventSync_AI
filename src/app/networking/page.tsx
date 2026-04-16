"use client";

import AppShell from "@/components/layout/AppShell";
import { networkUsers, aiMatch } from "@/lib/mock-data";
import { useToast } from "@/lib/toast-context";
import { useState } from "react";

export default function NetworkingPage() {
  const { showToast } = useToast();
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnect = (userId: string, name: string) => {
    setConnected((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
        showToast(`Disconnected from ${name}.`, "info");
      } else {
        next.add(userId);
        showToast(`Connection request sent to ${name}!`, "success");
      }
      return next;
    });
  };

  const handleMessage = (name: string) => {
    showToast(`Opening chat with ${name}...`, "info");
  };

  const filteredUsers = networkUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="px-6 pt-4">
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">Networking</h2>
            <p className="text-on-surface-variant font-medium text-sm">Find and connect with industry leaders and peers.</p>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="w-full pl-12 pr-6 py-4 bg-surface-container-high border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant text-sm font-medium"
              placeholder="Search by name, skill, or role..."
              type="text"
              id="networking-search"
              aria-label="Search people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="absolute right-4 text-on-surface-variant" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </section>

        {/* AI Best Match Card */}
        <section className="mb-10">
          <div className="bg-primary p-8 rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container opacity-20 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10 w-full">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold mb-4 uppercase tracking-wider">AI Best Match</span>
              <h3 className="text-2xl text-white font-bold leading-tight mb-4">Connect with {aiMatch.user.name}</h3>
              <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">{aiMatch.reason}</p>
              <button
                className={`px-6 py-3 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-all ${
                  connected.has(aiMatch.user.id)
                    ? "bg-white/30 text-white border-2 border-white/50"
                    : "bg-white text-primary"
                }`}
                onClick={() => handleConnect(aiMatch.user.id, aiMatch.user.name)}
              >
                {connected.has(aiMatch.user.id) ? "✓ Connected" : "Connect Now"}
              </button>
            </div>
            <div className="relative z-10 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={aiMatch.user.name} className="w-32 h-32 rounded-lg object-cover ring-4 ring-white/10" src={aiMatch.user.avatar} />
            </div>
          </div>
        </section>

        {/* People to Connect With */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-on-surface">People to Connect with</h3>
            <span className="text-on-surface-variant text-sm">{filteredUsers.length} found</span>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-3 block">person_search</span>
              <p className="text-on-surface-variant text-sm">No people matching &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredUsers.map((user) => (
                <div key={user.id} className="bg-surface-container-lowest p-6 rounded-lg flex flex-col gap-6 relative overflow-hidden" style={{ boxShadow: "0 10px 40px -10px rgba(25,28,30,0.06)" }}>
                  <div className="flex gap-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={user.name} className="w-16 h-16 rounded-lg object-cover shadow-sm" src={user.avatar} />
                    <div className="flex flex-col justify-center">
                      <h4 className="text-lg font-bold text-on-surface">{user.name}</h4>
                      <p className="text-on-surface-variant text-xs font-medium">
                        {user.title}{user.company ? ` at ${user.company}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((tag) => (
                      <span key={tag} className={`px-3 py-1 text-xs font-bold rounded-full ${tag === "#CreativeTech" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-low text-on-surface-variant"}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      className={`flex-1 py-3 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-all ${
                        connected.has(user.id)
                          ? "bg-surface-container-high text-on-surface"
                          : "gradient-primary text-white"
                      }`}
                      onClick={() => handleConnect(user.id, user.name)}
                    >
                      {connected.has(user.id) ? "✓ Connected" : "Connect"}
                    </button>
                    <button
                      className="flex-1 bg-secondary-container text-on-secondary-container py-3 rounded-full text-sm font-bold active:scale-95 transition-all"
                      onClick={() => handleMessage(user.name)}
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
