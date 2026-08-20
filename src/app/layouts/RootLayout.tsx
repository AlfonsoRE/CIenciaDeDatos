import { Outlet } from 'react-router-dom';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { DesktopSidebar } from '@/components/navigation/DesktopSidebar';

export function RootLayout() {
  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <DesktopSidebar />
      <MobileNavigation />
      <main className="md:ml-60 pb-20 md:pb-0 min-h-dvh">
        <Outlet />
      </main>
    </div>
  );
}
