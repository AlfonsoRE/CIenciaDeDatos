import { cn } from '@/utils/cn';
import type { MasteryStatus } from '@/types/mastery';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  status?: MasteryStatus;
  className?: string;
}

const statusColors: Record<MasteryStatus, string> = {
  'needs-review': 'bg-danger',
  learning: 'bg-warning',
  competent: 'bg-primary',
  mastered: 'bg-success',
};

function getStatus(value: number): MasteryStatus {
  if (value >= 85) return 'mastered';
  if (value >= 70) return 'competent';
  if (value >= 50) return 'learning';
  return 'needs-review';
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({ value, max = 100, size = 'md', showLabel = false, status, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const resolvedStatus = status || getStatus(pct);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 rounded-full bg-surface-alt overflow-hidden', sizeStyles[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', statusColors[resolvedStatus])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-text-secondary tabular-nums min-w-[3ch] text-right">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
