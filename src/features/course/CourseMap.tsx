import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useProgressStore } from '@/stores/progressStore';
import { UNITS_DATA } from '@/content/units';

export function CourseMap() {
  const { lessons } = useProgressStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Ruta de aprendizaje</h1>
        <p className="text-text-secondary mt-1">Ciencia de Datos CDF-2501</p>
      </div>

      <div className="space-y-6">
        {UNITS_DATA.map((unit) => {
          const unitLessonsCompleted = unit.lessons.filter(
            (l) => lessons[l.id]?.completed
          ).length;
          const pct = Math.round((unitLessonsCompleted / unit.lessons.length) * 100);

          return (
            <div key={unit.id}>
              <Link to={`/curso/unidad/${unit.number}`} className="group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-text group-hover:text-primary transition-colors">
                      Unidad {unit.number}: {unit.title}
                    </h2>
                  </div>
                  <span className="text-sm text-text-secondary">{pct}%</span>
                  <ChevronRight size={16} className="text-text-secondary group-hover:text-primary" />
                </div>
              </Link>
              <ProgressBar value={pct} size="sm" className="mb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-[52px]">
                {unit.lessons.map((lesson) => {
                  const progress = lessons[lesson.id];
                  return (
                    <Link key={lesson.id} to={`/curso/leccion/${lesson.id}`}>
                      <Card
                        variant={progress?.completed ? 'default' : 'outlined'}
                        padding="sm"
                        className={`hover:border-primary/30 transition-all cursor-pointer ${
                          progress?.completed ? 'bg-success/5' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary font-mono">{lesson.code}</span>
                          <span className="text-sm text-text truncate">{lesson.title}</span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
