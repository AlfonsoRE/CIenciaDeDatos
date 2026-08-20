import { Link, useParams } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/stores/progressStore';
import { UNITS_DATA } from '@/content/units';

export function UnitView() {
  const { unitNumber } = useParams();
  const { lessons } = useProgressStore();
  const unit = UNITS_DATA.find((u) => u.number === Number(unitNumber));

  if (!unit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-text-secondary">Unidad no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <Badge variant="info">Unidad {unit.number}</Badge>
        <h1 className="text-2xl font-bold text-text mt-2">{unit.title}</h1>
        <p className="text-text-secondary mt-1">{unit.description}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-text mb-3">Lecciones</h2>
        <div className="space-y-2">
          {unit.lessons.map((lesson) => {
            const progress = lessons[lesson.id];
            const isCompleted = progress?.completed;
            const mastery = progress?.mastery || 0;

            return (
              <Link key={lesson.id} to={`/curso/leccion/${lesson.id}`}>
                <Card variant="elevated" className="group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 size={22} className="text-success" />
                      ) : (
                        <Circle size={22} className="text-border" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary font-mono">{lesson.code}</span>
                        <h3 className="text-sm font-medium text-text truncate">{lesson.title}</h3>
                      </div>
                      {progress && (
                        <div className="mt-1.5">
                          <ProgressBar value={mastery} size="sm" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-text-secondary shrink-0">
                      {lesson.competencies.length} competencias
                    </div>
                    <ChevronRight size={16} className="text-text-secondary group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
