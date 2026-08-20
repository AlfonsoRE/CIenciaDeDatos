import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudentProgress, AssessmentAttempt, Badge } from '@/types/progress';
import type { LearningStage } from '@/types/learning';
import type { MasteryStatus } from '@/types/mastery';

interface ProgressState extends StudentProgress {
  initProgress: () => void;
  updateLessonProgress: (lessonId: string, unitId: string, stage: LearningStage, score: number) => void;
  completeStage: (lessonId: string, stage: LearningStage) => void;
  completeLesson: (lessonId: string) => void;
  addAssessmentAttempt: (attempt: AssessmentAttempt) => void;
  completePractice: (practiceId: string) => void;
  completeProject: (projectId: string) => void;
  updateCompetency: (name: string, score: number) => void;
  addBadge: (badge: Badge) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addTimeSpent: (minutes: number) => void;
}

const INITIAL_STATE: StudentProgress = {
  courseProgress: 0,
  currentUnit: '',
  currentLesson: '',
  lessons: {},
  competencies: {},
  practicesCompleted: [],
  projectsCompleted: [],
  assessments: [],
  lastActivityAt: new Date().toISOString(),
  streak: 0,
  badges: [],
  timeSpent: 0,
};

function computeMasteryStatus(score: number): MasteryStatus {
  if (score >= 85) return 'mastered';
  if (score >= 70) return 'competent';
  if (score >= 50) return 'learning';
  return 'needs-review';
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      initProgress: () => {
        const now = new Date().toISOString();
        set({ lastActivityAt: now });
      },

      updateLessonProgress: (lessonId, unitId, stage, score) => {
        const lessons = { ...get().lessons };
        const existing = lessons[lessonId] || {
          lessonId,
          unitId,
          stage,
          mastery: 0,
          masteryStatus: 'needs-review' as MasteryStatus,
          attempts: 0,
          hintsUsed: 0,
          completed: false,
          stageScores: {},
          startedAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
        };

        const newStageScores = { ...existing.stageScores, [stage]: score };
        const scores = Object.values(newStageScores).filter((s): s is number => s !== undefined);
        const avgMastery = scores.reduce((a, b) => a + b, 0) / scores.length;

        lessons[lessonId] = {
          ...existing,
          stage,
          mastery: Math.round(avgMastery),
          masteryStatus: computeMasteryStatus(avgMastery),
          attempts: existing.attempts + 1,
          stageScores: newStageScores,
          lastActivityAt: new Date().toISOString(),
        };

        set({ lessons, lastActivityAt: new Date().toISOString() });
      },

      completeStage: (lessonId, stage) => {
        const lessons = { ...get().lessons };
        if (lessons[lessonId]) {
          lessons[lessonId] = {
            ...lessons[lessonId],
            stage,
            stageScores: { ...lessons[lessonId].stageScores, [stage]: 100 },
            lastActivityAt: new Date().toISOString(),
          };
          set({ lessons });
        }
      },

      completeLesson: (lessonId) => {
        const lessons = { ...get().lessons };
        if (lessons[lessonId]) {
          lessons[lessonId] = {
            ...lessons[lessonId],
            completed: true,
            completedAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
          };
          set({ lessons, lastActivityAt: new Date().toISOString() });
        }
      },

      addAssessmentAttempt: (attempt) => {
        set({
          assessments: [...get().assessments, attempt],
          lastActivityAt: new Date().toISOString(),
        });
      },

      completePractice: (practiceId) => {
        const practices = get().practicesCompleted;
        if (!practices.includes(practiceId)) {
          set({
            practicesCompleted: [...practices, practiceId],
            lastActivityAt: new Date().toISOString(),
          });
        }
      },

      completeProject: (projectId) => {
        const projects = get().projectsCompleted;
        if (!projects.includes(projectId)) {
          set({
            projectsCompleted: [...projects, projectId],
            lastActivityAt: new Date().toISOString(),
          });
        }
      },

      updateCompetency: (name, score) => {
        const competencies = { ...get().competencies };
        const current = competencies[name] || 0;
        competencies[name] = Math.max(current, score);
        set({ competencies });
      },

      addBadge: (badge) => {
        const badges = get().badges;
        if (!badges.find((b) => b.id === badge.id)) {
          set({ badges: [...badges, badge] });
        }
      },

      incrementStreak: () => set({ streak: get().streak + 1 }),
      resetStreak: () => set({ streak: 0 }),
      addTimeSpent: (minutes) => set({ timeSpent: get().timeSpent + minutes }),
    }),
    { name: 'cd-progress' }
  )
);
