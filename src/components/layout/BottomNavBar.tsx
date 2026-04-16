"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/discover", icon: "explore", label: "Discover" },
  { href: "/map", icon: "map", label: "Map" },
  { href: "/safety", icon: "shield_with_heart", label: "Safety" },
  { href: "/profile", icon: "person", label: "Profile" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 w-full z-50 rounded-t-[3rem]"
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 -10px 40px -10px rgba(25,28,30,0.06)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-around items-center px-4 pb-6 pt-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
                active
                  ? "bg-primary-container text-white scale-90"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              <span
                className="material-symbols-outlined"
                style={
                  active
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              {!active && (
                <span className="text-xs font-medium mt-1">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
