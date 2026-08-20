import { Card } from '@/components/ui/Card';
import type { TheoryBlock } from '@/types/course';
import { Lightbulb, AlertTriangle, Info, BookOpen } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TheoryCardProps {
  block: TheoryBlock;
}

const TYPE_CONFIG = {
  text: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/5' },
  formula: { icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/5' },
  list: { icon: BookOpen, color: 'text-primary', bg: 'bg-primary/5' },
  note: { icon: Lightbulb, color: 'text-warning', bg: 'bg-warning/5' },
  warning: { icon: AlertTriangle, color: 'text-danger', bg: 'bg-danger/5' },
  example: { icon: Info, color: 'text-secondary', bg: 'bg-secondary/5' },
};

export function TheoryCard({ block }: TheoryCardProps) {
  const config = TYPE_CONFIG[block.type];
  const Icon = config.icon;

  return (
    <Card className={cn('border-l-4', block.type === 'warning' ? 'border-l-danger' : block.type === 'note' ? 'border-l-warning' : 'border-l-primary')}>
      <div className="flex items-start gap-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5', config.bg)}>
          <Icon size={16} className={config.color} />
        </div>
        <div className="flex-1 min-w-0">
          {block.title && (
            <h3 className="font-semibold text-text mb-1">{block.title}</h3>
          )}
          {block.content && (
            <p className="text-sm text-text-secondary leading-relaxed">{block.content}</p>
          )}
          {block.type === 'formula' && block.formula && (
            <div className="mt-3 bg-surface-alt rounded-xl p-4 text-center">
              <code className="font-mono text-base text-text font-medium">{block.formula}</code>
            </div>
          )}
          {block.items && (
            <ul className="mt-2 space-y-1.5">
              {block.items.map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className={cn('mt-0.5 shrink-0', config.color)}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}
