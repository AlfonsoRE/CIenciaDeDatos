import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLesson } from '@/hooks/useLesson';
import { cn } from '@/utils/cn';

export function LessonLayout() {
  const navigate = useNavigate();
  const { unitTitle, lessonTitle } = useLesson();

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-12">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-lg hover:bg-surface-alt text-text-secondary transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span className="truncate">{unitTitle}</span>
              <ChevronRight size={12} />
              <span className="truncate font-medium text-text">{lessonTitle}</span>
            </div>
          </div>
        </div>
      </header>

      <div className={cn('flex-1', 'max-w-4xl mx-auto w-full px-4 py-6')}>
        <Outlet />
      </div>
    </div>
  );
}
