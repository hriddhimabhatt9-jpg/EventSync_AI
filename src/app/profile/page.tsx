"use client";

import AppShell from "@/components/layout/AppShell";
import { registeredEvents, dashboardSchedule, announcements } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
        </div>
      </AppShell>
    );
  }

  if (!isAuthenticated) {
    return (
      <AppShell>
        <div className="px-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-primary">person</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-3">Sign In Required</h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-xs">
            Sign in to view your dashboard, registered events, and digital badge.
          </p>
          <div className="flex gap-3">
            <Link href="/auth/login" className="gradient-primary text-white px-8 py-3 rounded-full font-bold active:scale-95 transition-transform">
              Sign In
            </Link>
            <Link href="/auth/register" className="bg-surface-container-high text-on-surface px-8 py-3 rounded-full font-bold active:scale-95 transition-transform">
              Register
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-6 pt-4">
        {/* Welcome Header */}
        <section className="mb-6">
          <p className="text-on-surface-variant text-sm">Welcome back,</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Hi, {user?.name?.split(" ")[0] || "User"}</h1>
        </section>

        {/* Search */}
        <section className="mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-4 text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="w-full pl-12 pr-6 py-4 bg-surface-container-high border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-on-surface placeholder:text-on-surface-variant text-sm font-medium" placeholder="Find upcoming events in India..." type="text" id="dashboard-search" aria-label="Search upcoming events" />
          </div>
        </section>

        {/* Rewards & Points */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Total Earnings</p>
                  <h3 className="text-4xl font-extrabold">₹{user?.balance || 0}</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 flex items-center gap-2">
                  <span className="material-symbols-outlined filled text-yellow-400">military_tech</span>
                  <span className="font-bold text-sm">{user?.points || 0} pts</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end text-xs">
                  <p className="font-bold">Next Reward Progress</p>
                  <p className="text-white/80">{(user?.points || 0) % 20}/20 events</p>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000" 
                    style={{ width: `${((user?.points || 0) % 20) * 5}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-white/60 italic">Earn ₹100 for every 20 events you enroll in!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registered Events */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Registered Events</h2>
            <Link href="/discover" className="text-primary font-bold text-sm">See all</Link>
          </div>
          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
            {registeredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="min-w-[260px] bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group">
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={event.imageUrl} />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{event.daysUntil}</div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-base mb-1 line-clamp-1">{event.title}</h4>
                  <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {event.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Upcoming Schedule */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6">Upcoming Schedule</h2>
          <div className="space-y-4">
            {dashboardSchedule.map((item) => (
              <Link key={item.id} href={`/events/e1`} className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-cloud transition-shadow block">
                <div className="flex flex-col items-center min-w-[48px]">
                  <span className={`text-lg font-bold ${item.isActive ? "text-primary" : "text-on-surface"}`}>{item.time.split(" ")[0]}</span>
                  <span className="text-xs text-on-surface-variant font-medium">{item.time.split(" ")[1]}</span>
                </div>
                <div className={`w-0.5 h-12 rounded-full ${item.isActive ? "bg-primary" : "bg-outline-variant/30"}`}></div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant">{item.description}</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-primary-fixed/30 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-sm filled">campaign</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{ann.title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-1">{ann.message}</p>
                </div>
              </div>
              {ann.cta && (
                <Link href={ann.ctaLink || "#"} className="text-primary font-bold text-sm flex items-center gap-1 ml-[52px]">
                  {ann.cta}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/profile/badge" className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col items-start gap-3 hover:shadow-cloud transition-shadow" style={{ border: "1px solid rgba(195,198,215,0.1)" }}>
              <span className="material-symbols-outlined text-primary text-2xl">badge</span>
              <div>
                <h4 className="font-bold text-sm">My Badge</h4>
                <p className="text-xs text-on-surface-variant">View digital badge</p>
              </div>
            </Link>
            <Link href="/safety" className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col items-start gap-3 hover:shadow-cloud transition-shadow" style={{ border: "1px solid rgba(195,198,215,0.1)" }}>
              <span className="material-symbols-outlined text-error text-2xl">emergency</span>
              <div>
                <h4 className="font-bold text-sm">Safety Center</h4>
                <p className="text-xs text-on-surface-variant">Emergency tools</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
