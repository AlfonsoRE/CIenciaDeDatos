import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/settingsStore';
import { Moon, Sun, Monitor, Type, Volume2, Save } from 'lucide-react';

export function SettingsPage() {
  const { theme, setTheme, fontSize, setFontSize, reducedMotion, setReducedMotion, soundEnabled, setSoundEnabled } = useSettingsStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-text">Configuración</h1>

      <Card padding="lg" className="space-y-4">
        <h2 className="font-semibold text-text">Apariencia</h2>
        <div>
          <p className="text-sm text-text-secondary mb-2">Tema</p>
          <div className="flex gap-2">
            {([
              { value: 'light' as const, icon: Sun, label: 'Claro' },
              { value: 'dark' as const, icon: Moon, label: 'Oscuro' },
              { value: 'system' as const, icon: Monitor, label: 'Sistema' },
            ]).map(({ value, icon: Icon, label }) => (
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

        <div>
          <p className="text-sm text-text-secondary mb-2">
            <Type size={14} className="inline mr-1" />
            Tamaño de texto
          </p>
          <div className="flex gap-2">
            {([
              { value: 'small' as const, label: 'Pequeño' },
              { value: 'medium' as const, label: 'Mediano' },
              { value: 'large' as const, label: 'Grande' },
            ]).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFontSize(value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  fontSize === value ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary hover:bg-border/50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card padding="lg" className="space-y-4">
        <h2 className="font-semibold text-text">Accesibilidad</h2>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-text">Reducir movimiento</span>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className="w-5 h-5 accent-primary rounded"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-text flex items-center gap-1.5">
            <Volume2 size={16} />
            Sonidos
          </span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="w-5 h-5 accent-primary rounded"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-text flex items-center gap-1.5">
            <Save size={16} />
            Guardado automático
          </span>
          <input
            type="checkbox"
            checked={true}
            readOnly
            className="w-5 h-5 accent-primary rounded"
          />
        </label>
      </Card>
    </div>
  );
}
