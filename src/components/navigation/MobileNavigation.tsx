import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, FlaskConical, BarChart3, MoreHorizontal, FolderOpen, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/curso', icon: BookOpen, label: 'Curso' },
  { to: '/laboratorio', icon: FlaskConical, label: 'Laboratorio' },
  { to: '/progreso', icon: BarChart3, label: 'Progreso' },
];

const MORE_ITEMS = [
  { to: '/portafolio', icon: FolderOpen, label: 'Portafolio' },
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
];

export function MobileNavigation() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();
  const moreActive = MORE_ITEMS.some((item) => pathname.startsWith(item.to));

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border safe-area-bottom md:hidden"
      role="navigation"
      aria-label="Navegación principal"
    >
      {moreOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMoreOpen(false)}
          className="fixed inset-0 z-40 bg-black/20"
        />
      )}

      {moreOpen && (
        <div className="absolute bottom-16 right-2 z-50 w-44 rounded-xl border border-border bg-surface shadow-lg py-1">
          {MORE_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMoreOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 text-sm font-medium',
                  isActive ? 'text-primary' : 'text-text-secondary hover:bg-surface-alt hover:text-text'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors',
                isActive ? 'text-primary' : 'text-text-secondary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          aria-haspopup="menu"
          aria-label="Más opciones"
          className={cn(
            'flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors',
            moreActive || moreOpen ? 'text-primary' : 'text-text-secondary'
          )}
        >
          <MoreHorizontal size={22} strokeWidth={moreActive ? 2.5 : 2} />
          <span className="font-medium">Más</span>
        </button>
      </div>
    </nav>
  );
}
