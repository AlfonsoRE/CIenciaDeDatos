import type { LearningStage } from './learning';
import type { MasteryStatus } from './mastery';

export interface LessonProgress {
  lessonId: string;
  unitId: string;
  stage: LearningStage;
  mastery: number;
  masteryStatus: MasteryStatus;
  attempts: number;
  hintsUsed: number;
  completed: boolean;
  stageScores: Partial<Record<LearningStage, number>>;
  startedAt: string;
  completedAt?: string;
  lastActivityAt: string;
}

export interface StudentProgress {
  courseProgress: number;
  currentUnit: string;
  currentLesson: string;
  lessons: Record<string, LessonProgress>;
  competencies: Record<string, number>;
  practicesCompleted: string[];
  projectsCompleted: string[];
  assessments: AssessmentAttempt[];
  lastActivityAt: string;
  streak: number;
  badges: Badge[];
  timeSpent: number;
}

export interface AssessmentAttempt {
  id: string;
  lessonId: string;
  assessmentId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, string | number | string[]>;
  startedAt: string;
  completedAt: string;
  duration: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'competency' | 'streak' | 'milestone' | 'special';
}

export interface AnalyticsEvent {
  id?: number;
  event: string;
  payload: Record<string, unknown>;
  timestamp: string;
}
