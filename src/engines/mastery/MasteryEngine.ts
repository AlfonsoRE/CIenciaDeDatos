import { MASTERY_CONFIG, MASTERY_THRESHOLDS, type MasteryInput, type MasteryResult, type MasteryStatus } from '@/types/mastery';

function getStatus(score: number): MasteryStatus {
  if (score >= MASTERY_THRESHOLDS.mastered) return 'mastered';
  if (score >= MASTERY_THRESHOLDS.competent) return 'competent';
  if (score >= MASTERY_THRESHOLDS.learning) return 'learning';
  return 'needs-review';
}

export function computeMastery(input: MasteryInput): MasteryResult {
  const { weights, hintPenalty, attemptBonus, maxAttemptsForBonus } = MASTERY_CONFIG;

  let score =
    input.activityScore * weights.activity +
    input.practiceScore * weights.practice +
    input.challengeScore * weights.challenge +
    input.assessmentScore * weights.assessment;

  score -= input.hintsUsed * hintPenalty;

  if (input.attempts <= maxAttemptsForBonus) {
    score += (maxAttemptsForBonus - input.attempts + 1) * attemptBonus;
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const weakConcepts: string[] = [];
  const recommendations: string[] = [];

  if (input.activityScore < 60) weakConcepts.push('conceptos teóricos');
  if (input.practiceScore < 60) weakConcepts.push('práctica aplicada');
  if (input.challengeScore < 60) weakConcepts.push('resolución de problemas');
  if (input.assessmentScore < 60) weakConcepts.push('evaluación de dominio');

  if (score < MASTERY_THRESHOLDS.competent) {
    recommendations.push('Revisar la teoría del subtema');
    recommendations.push('Intentar la práctica guiada nuevamente');
  }
  if (input.hintsUsed > 2) {
    recommendations.push('Intentar resolver sin pistas para reforzar el aprendizaje');
  }
  if (input.attempts > 3) {
    recommendations.push('Consultar con el tutor para aclarar dudas específicas');
  }
  if (score >= MASTERY_THRESHOLDS.mastered) {
    recommendations.push('Continuar con el siguiente subtema');
  }

  return { score, status: getStatus(score), weakConcepts, recommendations };
}

export function computeCourseProgress(lessonScores: Record<string, number>, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const completed = Object.values(lessonScores).filter((s) => s >= MASTERY_THRESHOLDS.competent).length;
  return Math.round((completed / totalLessons) * 100);
}
