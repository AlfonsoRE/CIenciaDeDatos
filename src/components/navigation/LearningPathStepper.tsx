import { cn } from '@/utils/cn';
import type { LearningStage } from '@/types/learning';
import { LEARNING_STAGES, STAGE_LABELS } from '@/types/learning';
import { BookOpen, Eye, Puzzle, Code, Zap, ClipboardCheck, MessageCircle, Check } from 'lucide-react';

interface LearningPathStepperProps {
  currentStage: LearningStage;
  completedStages: LearningStage[];
  onStageClick?: (stage: LearningStage) => void;
  className?: string;
}

const STAGE_ICONS: Record<LearningStage, React.ComponentType<{ size?: number }>> = {
  theory: BookOpen,
  visual: Eye,
  activity: Puzzle,
  'guided-practice': Code,
  challenge: Zap,
  assessment: ClipboardCheck,
  feedback: MessageCircle,
};

export function LearningPathStepper({ currentStage, completedStages, onStageClick, className }: LearningPathStepperProps) {
  const currentIdx = LEARNING_STAGES.indexOf(currentStage);

  return (
    <nav className={cn('flex items-center gap-1 overflow-x-auto py-2 px-1', className)} aria-label="Progreso de la lección">
      {LEARNING_STAGES.map((stage, idx) => {
        const Icon = STAGE_ICONS[stage];
        const isCompleted = completedStages.includes(stage);
        const isCurrent = stage === currentStage;
        const isPast = idx < currentIdx;

        return (
          <div key={stage} className="flex items-center">
            <button
              onClick={() => onStageClick?.(stage)}
              disabled={!isPast && !isCurrent && !isCompleted}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
                isCurrent && 'bg-primary text-white shadow-sm',
                isCompleted && 'bg-success/10 text-success',
                isPast && !isCompleted && 'bg-surface-alt text-text-secondary',
                !isCurrent && !isCompleted && !isPast && 'bg-surface-alt/50 text-text-secondary/50',
                (isPast || isCurrent || isCompleted) && 'cursor-pointer hover:opacity-80'
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCompleted ? <Check size={14} /> : <Icon size={14} />}
              <span className="hidden sm:inline">{STAGE_LABELS[stage]}</span>
            </button>
            {idx < LEARNING_STAGES.length - 1 && (
              <div className={cn('w-3 h-px mx-0.5', isPast || isCompleted ? 'bg-success' : 'bg-border')} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
