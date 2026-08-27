import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/settingsStore';
import { Moon, Sun, Monitor } from 'lucide-react';

const THEMES = [
  { value: 'light' as const, icon: Sun, label: 'Claro' },
  { value: 'dark' as const, icon: Moon, label: 'Oscuro' },
  { value: 'system' as const, icon: Monitor, label: 'Sistema' },
];

export function SettingsPage() {
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-text">Configuración</h1>

      <Card padding="lg" className="space-y-4">
        <h2 className="font-semibold text-text">Apariencia</h2>
        <div>
          <p className="text-sm text-text-secondary mb-2">Tema</p>
          <div className="flex gap-2">
            {THEMES.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  theme === value ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary hover:bg-border/50'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
