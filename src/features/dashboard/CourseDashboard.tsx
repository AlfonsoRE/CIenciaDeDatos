import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, FlaskConical, Clock, ChevronRight, Award, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/stores/progressStore';
import { UNITS_DATA } from '@/content/units';

const ICONS = [BookOpen, TrendingUp, FlaskConical, Target, Award];

export function Dashboard() {
  const { streak, badges, timeSpent, lessons } = useProgressStore();
  const completedLessons = Object.values(lessons).filter((l) => l.completed).length;
  const totalLessons = UNITS_DATA.reduce((sum, u) => sum + u.lessons.length, 0);
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-text">Hola de nuevo</h1>
        <p className="text-text-secondary mt-1">Continúa aprendiendo Ciencia de Datos</p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card padding="md" className="flex items-center gap-3">
          <ProgressRing value={courseProgress} size={52} strokeWidth={5} />
          <div>
            <p className="text-xs text-text-secondary">Progreso</p>
            <p className="text-lg font-bold text-text">{courseProgress}%</p>
          </div>
        </Card>
        <Card padding="md" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Lecciones</p>
            <p className="text-lg font-bold text-text">{completedLessons}/{totalLessons}</p>
          </div>
        </Card>
        <Card padding="md" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <Clock size={20} className="text-warning" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Tiempo</p>
            <p className="text-lg font-bold text-text">{Math.round(timeSpent / 60)}h</p>
          </div>
        </Card>
        <Card padding="md" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Award size={20} className="text-success" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Racha</p>
            <p className="text-lg font-bold text-text">{streak}d</p>
          </div>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-text mb-3">Unidades del curso</h2>
        <div className="space-y-3">
          {UNITS_DATA.map((unit, idx) => {
            const unitLessonsCompleted = Object.values(lessons).filter(
              (l) => l.unitId === unit.id && l.completed
            ).length;
            const totalUnitLessons = unit.lessons.length;
            const pct = totalUnitLessons > 0 ? Math.round((unitLessonsCompleted / totalUnitLessons) * 100) : 0;
            const Icon = ICONS[idx] || BookOpen;

            return (
              <Link key={unit.id} to={`/curso/unidad/${unit.number}`}>
                <Card variant="elevated" className="group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="sm">Unidad {unit.number}</Badge>
                        {pct === 100 && <Badge variant="success" size="sm">Completada</Badge>}
                      </div>
                      <h3 className="text-sm font-semibold text-text mt-1 truncate">{unit.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <ProgressBar value={pct} size="sm" className="flex-1" />
                        <span className="text-xs text-text-secondary">{unitLessonsCompleted}/{totalUnitLessons}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {badges.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-text mb-3">Insignias recientes</h2>
          <div className="flex gap-2 flex-wrap">
            {badges.slice(0, 5).map((b) => (
              <Badge key={b.id} variant="success">{b.name}</Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
