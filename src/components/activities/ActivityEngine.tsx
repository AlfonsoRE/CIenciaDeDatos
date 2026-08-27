import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Activity, ActivityOption } from '@/types/course';

interface ActivityEngineProps {
  activities: Activity[];
  onComplete: (scores: number[]) => void;
}

export function ActivityEngine({ activities, onComplete }: ActivityEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [scores, setScores] = useState<number[]>([]);

  const activity = activities[currentIdx];
  const isLast = currentIdx === activities.length - 1;
  const isSubmitted = activity ? submitted[activity.id] : false;
  const currentAnswer = activity ? selectedAnswers[activity.id] : undefined;

  const handleSelect = useCallback((activityId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [activityId]: optionId }));
  }, []);

  const handleMultiSelect = useCallback((activityId: string, optionId: string) => {
    setSelectedAnswers((prev) => {
      const current = (prev[activityId] as string[]) || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [activityId]: next } as Record<string, string | string[]>;
    });
  }, []);

  const handleNumericInput = useCallback((activityId: string, value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [activityId]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!activity) return;
    const answer = selectedAnswers[activity.id];
    let isCorrect = false;

    if (activity.type === 'multiple-select' && Array.isArray(answer)) {
      const correct = activity.correctAnswer as string[];
      isCorrect = answer.length === correct.length && answer.every((a) => correct.includes(a));
    } else if (activity.type === 'numeric') {
      const numAnswer = parseFloat(answer as string);
      const numCorrect = parseFloat(activity.correctAnswer as string);
      isCorrect = Math.abs(numAnswer - numCorrect) < 0.01;
    } else {
      isCorrect = answer === activity.correctAnswer;
    }

    const score = isCorrect ? 100 : 0;
    setScores((prev) => [...prev, score]);
    setSubmitted((prev) => ({ ...prev, [activity.id]: true }));
  }, [activity, selectedAnswers]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete(scores);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  }, [isLast, scores, onComplete]);

  const handleRetry = useCallback(() => {
    if (!activity) return;
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[activity.id];
      return next;
    });
    setSubmitted((prev) => ({ ...prev, [activity.id]: false }));
  }, [activity]);

  if (!activity) {
    return (
      <Card padding="lg" className="text-center">
        <p className="text-text-secondary">No hay actividades disponibles.</p>
      </Card>
    );
  }

  const isCorrect = isSubmitted && currentAnswer === activity.correctAnswer;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="info">
          Actividad {currentIdx + 1} de {activities.length}
        </Badge>
        {isSubmitted && (
          <Badge variant={isCorrect ? 'success' : 'danger'}>
            {isCorrect ? 'Correcto' : 'Incorrecto'}
          </Badge>
        )}
      </div>

      <Card padding="lg" className="space-y-4">
        <h3 className="font-semibold text-text">{activity.title}</h3>
        <p className="text-sm text-text-secondary">{activity.question}</p>

        {activity.options && (activity.type === 'multiple-choice' || activity.type === 'multiple-select' || activity.type === 'classification') && (
          <div className="space-y-2">
            {activity.options.map((option: ActivityOption) => {
              const isSelected = activity.type === 'multiple-select'
                ? Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                : currentAnswer === option.id;
              const showResult = isSubmitted;
              const isOptionCorrect = showResult && (
                activity.type === 'multiple-select'
                  ? (activity.correctAnswer as string[]).includes(option.id)
                  : option.id === activity.correctAnswer
              );

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (isSubmitted) return;
                    if (activity.type === 'multiple-select') {
                      handleMultiSelect(activity.id, option.id);
                    } else {
                      handleSelect(activity.id, option.id);
                    }
                  }}
                  disabled={isSubmitted}
                  className={cn(
                    'w-full text-left p-3 rounded-xl border text-sm transition-all',
                    !showResult && isSelected && 'border-primary bg-primary/5 text-primary',
                    !showResult && !isSelected && 'border-border hover:border-primary/50 text-text',
                    showResult && isOptionCorrect && 'border-success bg-success/5 text-success',
                    showResult && isSelected && !isOptionCorrect && 'border-danger bg-danger/5 text-danger',
                    showResult && !isSelected && !isOptionCorrect && 'border-border text-text-secondary opacity-50',
                    isSubmitted && 'cursor-default'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {showResult && isOptionCorrect && <CheckCircle2 size={16} />}
                    {showResult && isSelected && !isOptionCorrect && <XCircle size={16} />}
                    <span>{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {activity.type === 'numeric' && (
          <div>
            <label className="text-sm text-text-secondary mb-1 block">Tu respuesta:</label>
            <input
              type="number"
              step="any"
              value={(currentAnswer as string) || ''}
              onChange={(e) => handleNumericInput(activity.id, e.target.value)}
              disabled={isSubmitted}
              className={cn(
                'w-full h-10 px-3 rounded-[var(--radius-input)] border bg-surface text-text text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors',
                isSubmitted && isCorrect ? 'border-success' : isSubmitted ? 'border-danger' : 'border-border',
                isSubmitted && 'opacity-70'
              )}
              placeholder="Escribe un número"
            />
          </div>
        )}
      </Card>

      {isSubmitted && (
        <Card padding="md" className={cn('border-l-4', isCorrect ? 'border-l-success' : 'border-l-danger')}>
          <p className="text-sm font-medium text-text mb-1">
            {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
          </p>
          <p className="text-sm text-text-secondary">{activity.explanation}</p>
          <p className="text-xs text-text-secondary mt-1">
            <span className="font-medium">Concepto:</span> {activity.conceptLinked}
          </p>
        </Card>
      )}

      <div className="flex items-center justify-between pt-2">
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={!currentAnswer}>
            Verificar respuesta
          </Button>
        ) : (
          <div className="flex gap-2">
            {!isCorrect && (
              <Button variant="secondary" onClick={handleRetry}>
                <RotateCcw size={14} /> Intentar de nuevo
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLast ? 'Ver resultados' : 'Siguiente'} <ChevronRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
