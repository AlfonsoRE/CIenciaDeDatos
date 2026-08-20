import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FlaskConical, BarChart3, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Inicio' },
  { to: '/curso', icon: BookOpen, label: 'Curso' },
  { to: '/laboratorio', icon: FlaskConical, label: 'Laboratorio' },
  { to: '/progreso', icon: BarChart3, label: 'Progreso' },
  { to: '/mas', icon: MoreHorizontal, label: 'Más' },
];

export function MobileNavigation() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border safe-area-bottom md:hidden"
      role="navigation"
      aria-label="Navegación principal"
    >
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
      </div>
    </nav>
  );
}
