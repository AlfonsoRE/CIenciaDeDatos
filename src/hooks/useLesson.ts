import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { UNITS_DATA } from '@/content/units';
import { useProgressStore } from '@/stores/progressStore';
import type { LearningStage } from '@/types/learning';

const STAGE_ORDER: LearningStage[] = ['theory', 'visual', 'activity', 'guided-practice', 'challenge', 'assessment', 'feedback'];

export function useLesson() {
  const { lessonId } = useParams();
  const { lessons } = useProgressStore();

  const lesson = useMemo(() => {
    return UNITS_DATA.flatMap((u) => u.lessons).find((l) => l.id === lessonId);
  }, [lessonId]);

  const unit = useMemo(() => {
    return UNITS_DATA.find((u) => u.lessons.some((l) => l.id === lessonId));
  }, [lessonId]);

  const progress = lessonId ? lessons[lessonId] : undefined;

  const completedStages: LearningStage[] = useMemo(() => {
    if (!progress?.stageScores) return [];
    return STAGE_ORDER.filter((stage) => progress.stageScores[stage] !== undefined);
  }, [progress]);

  const [currentStage, setCurrentStage] = useState<LearningStage>('theory');

  const setStage = useCallback((stage: LearningStage) => {
    setCurrentStage(stage);
  }, []);

  const completeStage = useCallback((stage: LearningStage) => {
    setCurrentStage((prev) => {
      const idx = STAGE_ORDER.indexOf(stage);
      return idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : prev;
    });
  }, []);

  const mastery = progress?.mastery || 0;

  return {
    unitTitle: unit ? `Unidad ${unit.number} — ${unit.title}` : '',
    lessonTitle: lesson?.title || '',
    currentStage,
    completedStages,
    mastery,
    setStage,
    completeStage,
  };
}
