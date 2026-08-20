import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';

interface HintSystemProps {
  hints: string[];
  onHintUsed: (hintIndex: number) => void;
  maxVisible?: number;
}

export function HintSystem({ hints, onHintUsed, maxVisible = 3 }: HintSystemProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const showNextHint = () => {
    if (visibleCount < Math.min(hints.length, maxVisible)) {
      const nextIdx = visibleCount;
      setVisibleCount((prev) => prev + 1);
      onHintUsed(nextIdx);
    }
  };

  const visibleHints = hints.slice(0, visibleCount);
  const canShowMore = visibleCount < Math.min(hints.length, maxVisible);

  if (hints.length === 0) return null;

  return (
    <Card padding="md" className="border-l-4 border-l-warning">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Lightbulb size={16} className="text-warning shrink-0" />
        <span className="text-sm font-medium text-text flex-1">Pistas</span>
        <span className="text-xs text-text-secondary">
          {visibleCount}/{hints.length}
        </span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {visibleHints.map((hint, idx) => (
            <div
              key={idx}
              className={cn(
                'p-3 rounded-lg text-sm text-text-secondary',
                idx === visibleHints.length - 1 && visibleHints.length === visibleCount
                  ? 'bg-warning/5 border border-warning/20'
                  : 'bg-surface-alt'
              )}
            >
              <span className="font-medium text-warning text-xs">Pista {idx + 1}:</span>{' '}
              {hint}
            </div>
          ))}

          {canShowMore && (
            <Button
              variant="secondary"
              size="sm"
              onClick={showNextHint}
            >
              <Lightbulb size={12} />
              {visibleCount === 0 ? 'Pedir primera pista' : 'Siguiente pista'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
