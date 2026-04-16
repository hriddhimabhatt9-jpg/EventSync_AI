"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

interface TopAppBarProps {
  showShare?: boolean;
  transparent?: boolean;
}

export default function TopAppBar({ showShare = false }: TopAppBarProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      id="top-app-bar"
      className="fixed top-0 w-full z-50 transition-colors"
      style={{
        background: "rgba(247, 249, 251, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2" aria-label="EventSync AI Home">
          <span className="material-symbols-outlined text-primary-container text-2xl">
            bubble_chart
          </span>
          <span className="text-xl font-bold gradient-text tracking-tight">
            EventSync AI
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {showShare && (
            <button
              className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-on-surface-variant"
              aria-label="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: document.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <span className="material-symbols-outlined">share</span>
            </button>
          )}
          <button
            className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-on-surface-variant relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* Auth Button */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-surface-container-low transition-colors"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Account menu"
                aria-expanded={showMenu}
              >
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} aria-hidden="true" />
                  <div className="absolute right-0 top-12 bg-surface-container-lowest rounded-xl shadow-cloud-lg p-2 min-w-[200px] z-50 animate-scale-in">
                    <div className="px-4 py-3 border-b border-surface-container mb-1">
                      <p className="font-bold text-sm text-on-surface">{user?.name}</p>
                      <p className="text-xs text-on-surface-variant">{user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-container-low transition-colors text-sm text-on-surface"
                      onClick={() => setShowMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      My Profile
                    </Link>
                    <Link
                      href="/profile/badge"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-container-low transition-colors text-sm text-on-surface"
                      onClick={() => setShowMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg">badge</span>
                      My Badge
                    </Link>
                    <button
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error-container transition-colors text-sm text-error w-full text-left"
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
