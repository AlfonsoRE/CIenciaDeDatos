export type MasteryStatus = 'needs-review' | 'learning' | 'competent' | 'mastered';

export interface MasteryInput {
  activityScore: number;
  practiceScore: number;
  challengeScore: number;
  assessmentScore: number;
  hintsUsed: number;
  attempts: number;
}

export interface MasteryResult {
  score: number;
  status: MasteryStatus;
  weakConcepts: string[];
  recommendations: string[];
}

export const MASTERY_THRESHOLDS = {
  'needs-review': 0,
  learning: 50,
  competent: 70,
  mastered: 85,
} as const;

export const MASTERY_CONFIG = {
  weights: {
    activity: 0.2,
    practice: 0.2,
    challenge: 0.25,
    assessment: 0.35,
  },
  hintPenalty: 3,
  attemptBonus: 2,
  maxAttemptsForBonus: 3,
} as const;
