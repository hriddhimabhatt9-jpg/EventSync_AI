import TopAppBar from "./TopAppBar";
import BottomNavBar from "./BottomNavBar";

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
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <TopAppBar showShare={showShare} />
      <main className={`pt-16 pb-28 ${className}`}>{children}</main>
      {!hideBottomNav && <BottomNavBar />}
    </div>
  );
}
