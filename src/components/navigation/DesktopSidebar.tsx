import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FlaskConical, BarChart3, FolderOpen, Settings, Moon, Sun, Monitor } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSettingsStore } from '@/stores/settingsStore';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/curso', icon: BookOpen, label: 'Curso' },
  { to: '/laboratorio', icon: FlaskConical, label: 'Laboratorio' },
  { to: '/progreso', icon: BarChart3, label: 'Progreso' },
  { to: '/portafolio', icon: FolderOpen, label: 'Portafolio' },
];

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function DesktopSidebar() {
  const { theme, setTheme } = useSettingsStore();
  const ThemeIcon = THEME_ICONS[theme];

  const cycleTheme = () => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const idx = order.indexOf(theme);
    setTheme(order[(idx + 1) % order.length]);
  };

  return (
    <aside className="hidden md:flex fixed left-0 inset-y-0 z-40 w-60 flex-col bg-surface border-r border-border">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-white font-bold text-sm">CD</span>
        </div>
        <div>
          <h1 className="text-sm font-semibold text-text leading-tight">Ciencia de Datos</h1>
          <p className="text-xs text-text-secondary">CDF-2501</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Navegación lateral">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-surface-alt hover:text-text'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        <button
          onClick={cycleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text w-full transition-colors"
        >
          <ThemeIcon size={20} />
          {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Oscuro' : 'Sistema'}
        </button>
        <NavLink
          to="/configuracion"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-alt hover:text-text'
            )
          }
        >
          <Settings size={20} />
          Configuración
        </NavLink>
      </div>
    </aside>
  );
}
