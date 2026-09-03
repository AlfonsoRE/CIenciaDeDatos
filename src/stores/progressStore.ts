import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StudentProgress, AssessmentAttempt, Badge } from '@/types/progress';
import type { LearningStage } from '@/types/learning';
import type { MasteryStatus } from '@/types/mastery';
import { UNITS_DATA } from '@/content/units';
import { PRACTICES_DATA } from '@/content/practices';

interface ProgressState extends StudentProgress {
  checkDailyStreak: () => void;
  updateLessonProgress: (lessonId: string, unitId: string, stage: LearningStage, score: number) => void;
  completeStage: (lessonId: string, stage: LearningStage) => void;
  completeLesson: (lessonId: string, masteryScore: number) => void;
  addAssessmentAttempt: (attempt: AssessmentAttempt) => void;
  completePractice: (practiceId: string) => void;
  completeProject: (projectId: string) => void;
  updateCompetency: (name: string, score: number) => void;
  addBadge: (badge: Badge) => void;
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

      checkDailyStreak: () => {
        const { lastActivityAt, streak } = get();
        const now = new Date();
        const todayKey = now.toDateString();
        const lastKey = lastActivityAt ? new Date(lastActivityAt).toDateString() : null;

        // Ya se contó hoy — evita reprocesar en cada montaje/navegación del layout raíz.
        if (streak > 0 && lastKey === todayKey) return;

        let newStreak: number;
        if (streak === 0) {
          newStreak = 1; // primera visita registrada
        } else {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          newStreak = lastKey === yesterday.toDateString() ? streak + 1 : 1;
        }

        set({ streak: newStreak, lastActivityAt: now.toISOString() });

        if (newStreak === 3) {
          get().addBadge({
            id: 'streak-3', name: 'Racha de 3 días', description: 'Estudiaste 3 días seguidos',
            icon: 'Flame', earnedAt: now.toISOString(), category: 'streak',
          });
        } else if (newStreak === 7) {
          get().addBadge({
            id: 'streak-7', name: 'Racha de 7 días', description: 'Estudiaste 7 días seguidos',
            icon: 'Flame', earnedAt: now.toISOString(), category: 'streak',
          });
        } else if (newStreak === 30) {
          get().addBadge({
            id: 'streak-30', name: 'Racha de 30 días', description: 'Estudiaste 30 días seguidos',
            icon: 'Flame', earnedAt: now.toISOString(), category: 'streak',
          });
        }
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
            lastActivityAt: new Date().toISOString(),
          };
          set({ lessons });
        }
      },

      completeLesson: (lessonId, masteryScore) => {
        const lessons = { ...get().lessons };
        if (!lessons[lessonId]) return;

        const wasAlreadyCompleted = lessons[lessonId].completed;
        lessons[lessonId] = {
          ...lessons[lessonId],
          completed: true,
          completedAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString(),
        };
        set({ lessons, lastActivityAt: new Date().toISOString() });

        if (wasAlreadyCompleted) return;

        const now = new Date().toISOString();
        const completedCount = Object.values(lessons).filter((l) => l.completed).length;

        if (completedCount === 1) {
          get().addBadge({
            id: 'first-lesson', name: 'Primer paso', description: 'Completaste tu primera lección',
            icon: 'BookOpen', earnedAt: now, category: 'milestone',
          });
        }

        if (masteryScore >= 100) {
          get().addBadge({
            id: 'perfect-lesson', name: 'Dominio perfecto', description: 'Obtuviste 100% de maestría en una lección',
            icon: 'Award', earnedAt: now, category: 'competency',
          });
        }

        const unit = UNITS_DATA.find((u) => u.lessons.some((l) => l.id === lessonId));
        if (unit && unit.lessons.every((l) => lessons[l.id]?.completed)) {
          get().addBadge({
            id: `unit-${unit.id}`, name: `Unidad ${unit.number} completada`, description: `Terminaste "${unit.title}"`,
            icon: 'Trophy', earnedAt: now, category: 'milestone',
          });
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
        if (practices.includes(practiceId)) return;

        const next = [...practices, practiceId];
        set({ practicesCompleted: next, lastActivityAt: new Date().toISOString() });

        const now = new Date().toISOString();
        if (next.length === 5) {
          get().addBadge({
            id: 'practice-5', name: 'Manos a la obra', description: 'Completaste 5 prácticas de laboratorio',
            icon: 'FlaskConical', earnedAt: now, category: 'milestone',
          });
        } else if (next.length === PRACTICES_DATA.length) {
          get().addBadge({
            id: 'practice-all', name: 'Laboratorio completo', description: 'Completaste todas las prácticas del curso',
            icon: 'FlaskConical', earnedAt: now, category: 'milestone',
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

      addTimeSpent: (minutes) => set({ timeSpent: get().timeSpent + minutes }),
    }),
    { name: 'cd-progress' }
  )
);
