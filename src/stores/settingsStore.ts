import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  language: 'es';
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  soundEnabled: boolean;
  autoSave: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setReducedMotion: (value: boolean) => void;
  setSoundEnabled: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'es',
      theme: 'system',
      fontSize: 'medium',
      reducedMotion: false,
      soundEnabled: true,
      autoSave: true,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
    }),
    { name: 'cd-settings' }
  )
);
