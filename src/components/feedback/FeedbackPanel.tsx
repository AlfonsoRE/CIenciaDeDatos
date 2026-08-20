import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle, TrendingUp, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { MasteryStatus } from '@/types/mastery';

interface FeedbackPanelProps {
  mastery: number;
  masteryStatus: MasteryStatus;
  weakConcepts: string[];
  recommendations: string[];
  lessonTitle: string;
  onContinue: () => void;
  onRetry?: () => void;
}

const STATUS_CONFIG: Record<MasteryStatus, { label: string; variant: 'success' | 'info' | 'warning' | 'danger'; color: string }> = {
  mastered: { label: 'Dominado', variant: 'success', color: 'text-success' },
  competent: { label: 'Competente', variant: 'info', color: 'text-primary' },
  learning: { label: 'En aprendizaje', variant: 'warning', color: 'text-warning' },
  'needs-review': { label: 'Requiere refuerzo', variant: 'danger', color: 'text-danger' },
};

export function FeedbackPanel({
  mastery,
  masteryStatus,
  weakConcepts,
  recommendations,
  lessonTitle,
  onContinue,
  onRetry,
}: FeedbackPanelProps) {
  const config = STATUS_CONFIG[masteryStatus];

  return (
    <div className="space-y-4">
      <Card padding="lg" className="text-center space-y-4">
        <div>
          <h2 className="text-lg font-bold text-text">Resultados de la lección</h2>
          <p className="text-sm text-text-secondary mt-1">{lessonTitle}</p>
        </div>

        <div className="py-4">
          <div className={cn('text-5xl font-bold', config.color)}>{mastery}%</div>
          <Badge variant={config.variant} size="md" className="mt-2">
            {config.label}
          </Badge>
        </div>

        <div className="max-w-xs mx-auto">
          <ProgressBar value={mastery} size="lg" status={masteryStatus} />
        </div>
      </Card>

      {weakConcepts.length > 0 && (
        <Card padding="md" className="border-l-4 border-l-warning">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-text">Conceptos débiles</h3>
              <ul className="mt-1 space-y-0.5">
                {weakConcepts.map((concept, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-1.5">
                    <span className="text-warning">•</span> {concept}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {recommendations.length > 0 && (
        <Card padding="md" className="border-l-4 border-l-primary">
          <div className="flex items-start gap-2">
            <TrendingUp size={16} className="text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-text">Recomendaciones</h3>
              <ul className="mt-1 space-y-0.5">
                {recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-1.5">
                    <ArrowRight size={12} className="text-primary shrink-0 mt-0.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      <Card padding="md">
        <div className="flex items-start gap-2">
          <BookOpen size={16} className="text-text-secondary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-text">Competencias evaluadas</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {['Distribución normal', 'Probabilidad', 'Cálculo de Z-scores'].map((comp) => (
                <Badge
                  key={comp}
                  variant={mastery >= 70 ? 'success' : 'warning'}
                  size="sm"
                >
                  {comp}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3 pt-2">
        {mastery < 70 && onRetry && (
          <Button variant="secondary" onClick={onRetry}>
            <XCircle size={14} /> Intentar de nuevo
          </Button>
        )}
        <Button onClick={onContinue} className="flex-1">
          <CheckCircle2 size={14} />
          {mastery >= 70 ? 'Continuar al siguiente tema' : 'Volver al curso'}
        </Button>
      </div>
    </div>
  );
}
