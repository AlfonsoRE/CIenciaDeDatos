import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { DesktopSidebar } from '@/components/navigation/DesktopSidebar';
import { useSettingsStore } from '@/stores/settingsStore';
import { useProgressStore } from '@/stores/progressStore';

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (theme === 'light') {
    root.classList.add('light');
  } else if (theme === 'dark') {
    root.classList.add('dark');
  }
}

export function RootLayout() {
  const theme = useSettingsStore((s) => s.theme);
  const checkDailyStreak = useProgressStore((s) => s.checkDailyStreak);
  const addTimeSpent = useProgressStore((s) => s.addTimeSpent);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    checkDailyStreak();
  }, [checkDailyStreak]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') addTimeSpent(1);
    }, 60_000);
    return () => clearInterval(interval);
  }, [addTimeSpent]);

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
