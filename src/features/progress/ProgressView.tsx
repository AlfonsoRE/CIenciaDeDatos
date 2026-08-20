import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { useProgressStore } from '@/stores/progressStore';
import { UNITS_DATA } from '@/content/units';
import { Clock, BookOpen, Target, Award, TrendingUp } from 'lucide-react';
import { formatDuration } from '@/utils/formatters';

export function ProgressView() {
  const { lessons, competencies, practicesCompleted, assessments, timeSpent, streak } = useProgressStore();
  const completedLessons = Object.values(lessons).filter((l) => l.completed).length;
  const totalLessons = UNITS_DATA.reduce((sum, u) => sum + u.lessons.length, 0);
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const sortedCompetencies = Object.entries(competencies)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Mi progreso</h1>
        <p className="text-text-secondary mt-1">Seguimiento de tu avance en el curso</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card padding="md" className="flex flex-col items-center text-center">
          <ProgressRing value={courseProgress} size={64} strokeWidth={5} />
          <p className="text-sm font-medium text-text mt-2">Progreso total</p>
        </Card>
        <Card padding="md" className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text mt-2">{completedLessons}/{totalLessons}</p>
          <p className="text-xs text-text-secondary">Lecciones</p>
        </Card>
        <Card padding="md" className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <Clock size={24} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-text mt-2">{formatDuration(timeSpent)}</p>
          <p className="text-xs text-text-secondary">Tiempo total</p>
        </Card>
        <Card padding="md" className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Target size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text mt-2">{streak}</p>
          <p className="text-xs text-text-secondary">Racha días</p>
        </Card>
      </div>

      <Card padding="lg">
        <h2 className="text-lg font-semibold text-text mb-4">Avance por unidad</h2>
        <div className="space-y-3">
          {UNITS_DATA.map((unit) => {
            const unitCompleted = unit.lessons.filter((l) => lessons[l.id]?.completed).length;
            const pct = unit.lessons.length > 0 ? Math.round((unitCompleted / unit.lessons.length) * 100) : 0;
            return (
              <div key={unit.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text">Unidad {unit.number}: {unit.title}</span>
                  <span className="text-xs text-text-secondary">{unitCompleted}/{unit.lessons.length}</span>
                </div>
                <ProgressBar value={pct} size="sm" />
              </div>
            );
          })}
        </div>
      </Card>

      {sortedCompetencies.length > 0 && (
        <Card padding="lg">
          <h2 className="text-lg font-semibold text-text mb-4">
            <TrendingUp size={18} className="inline mr-2" />
            Mapa de competencias
          </h2>
          <div className="space-y-2">
            {sortedCompetencies.map(([name, score]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="text-sm text-text min-w-[180px] truncate">{name}</span>
                <ProgressBar value={score} size="sm" className="flex-1" />
                <span className="text-xs text-text-secondary w-8 text-right">{score}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-primary" />
            <h3 className="font-semibold text-text text-sm">Prácticas completadas</h3>
          </div>
          <p className="text-2xl font-bold text-text">{practicesCompleted.length}</p>
          <p className="text-xs text-text-secondary">de 23 prácticas</p>
        </Card>
        <Card padding="md">
          <div className="flex items-center gap-2 mb-2">
            <Target size={18} className="text-primary" />
            <h3 className="font-semibold text-text text-sm">Evaluaciones realizadas</h3>
          </div>
          <p className="text-2xl font-bold text-text">{assessments.length}</p>
          <p className="text-xs text-text-secondary">intentos totales</p>
        </Card>
      </div>
    </div>
  );
}
