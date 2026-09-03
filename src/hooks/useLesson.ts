import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { UNITS_DATA } from '@/content/units';

export function useLesson() {
  const { lessonId } = useParams();

  const lesson = useMemo(() => {
    return UNITS_DATA.flatMap((u) => u.lessons).find((l) => l.id === lessonId);
  }, [lessonId]);

  const unit = useMemo(() => {
    return UNITS_DATA.find((u) => u.lessons.some((l) => l.id === lessonId));
  }, [lessonId]);

  return {
    unitTitle: unit ? `Unidad ${unit.number} — ${unit.title}` : '',
    lessonTitle: lesson?.title || '',
  };
}
