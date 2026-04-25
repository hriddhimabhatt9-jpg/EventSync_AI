import TopAppBar from "./TopAppBar";
import BottomNavBar from "./BottomNavBar";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface AppShellProps {
  children: React.ReactNode;
  showShare?: boolean;
  hideBottomNav?: boolean;
  className?: string;
}

export default function AppShell({
  children,
  showShare = false,
  hideBottomNav = false,
  className = "",
}: AppShellProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // List of paths that don't require authentication or onboarding
    const isAuthPath = pathname?.startsWith("/auth");
    
    if (!isAuthenticated && !isAuthPath) {
      router.push("/auth/login");
    } else if (isAuthenticated && !user?.onboardingCompleted && pathname !== "/auth/onboarding") {
      router.push("/auth/onboarding");
    }
  }, [isLoading, isAuthenticated, user, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <TopAppBar showShare={showShare} />
      <main className={`pt-16 pb-28 ${className}`}>{children}</main>
      {!hideBottomNav && <BottomNavBar />}
    </div>
  );
}
