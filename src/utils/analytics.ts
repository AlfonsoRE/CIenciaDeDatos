import { logEvent } from '@/storage/db';

export type AnalyticsEventType =
  | 'lesson_started'
  | 'theory_completed'
  | 'visual_interacted'
  | 'activity_attempted'
  | 'activity_completed'
  | 'practice_started'
  | 'practice_completed'
  | 'hint_requested'
  | 'challenge_completed'
  | 'assessment_started'
  | 'assessment_completed'
  | 'lesson_mastered'
  | 'lesson_review_required'
  | 'project_started'
  | 'project_completed'
  | 'code_executed'
  | 'tutor_interaction'
  | 'page_viewed';

interface AnalyticsPayload {
  [key: string]: unknown;
}

export function trackEvent(event: AnalyticsEventType, payload: AnalyticsPayload = {}) {
  logEvent(event, { ...payload, _timestamp: new Date().toISOString() }).catch(() => {
    // Silent fail for analytics
  });
}

export function trackLessonProgress(lessonId: string, stage: string, score?: number) {
  trackEvent('lesson_started', { lessonId, stage, score });
}

export function trackActivity(lessonId: string, activityId: string, correct: boolean) {
  trackEvent('activity_attempted', { lessonId, activityId, correct });
}

export function trackAssessment(lessonId: string, score: number, passed: boolean) {
  trackEvent('assessment_completed', { lessonId, score, passed });
}

export function trackCodeExecution(lessonId: string, language: string, success: boolean, duration: number) {
  trackEvent('code_executed', { lessonId, language, success, duration });
}

export function trackHintUsage(lessonId: string, hintLevel: number) {
  trackEvent('hint_requested', { lessonId, hintLevel });
}
