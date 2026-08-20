import type { Lesson } from '@/types/course';

interface HintContext {
  lesson: Lesson;
  currentStage: string;
  errorHistory: string[];
  attemptCount: number;
}

export interface GeneratedHint {
  level: 1 | 2 | 3;
  text: string;
  type: 'conceptual' | 'strategic' | 'partial-solution';
}

const CONCEPTUAL_HINTS: Record<string, string[]> = {
  '2.3': [
    'La distribución normal se define completamente por dos parámetros: media (μ) y desviación estándar (σ).',
    'La regla 68-95-99.7 te permite hacer estimaciones rápidas sin calcular.',
    'El área bajo la curva siempre es 1 (100%).',
  ],
  default: [
    'Revisa los conceptos fundamentales del tema.',
    '¿Puedes identificar qué técnica estadística corresponde al problema?',
    'Piensa en qué datos tienes y qué necesitas encontrar.',
  ],
};

const STRATEGIC_HINTS: Record<string, string[]> = {
  '2.3': [
    'Primero identifica si necesitas P(X > a), P(X < a) o P(a < X < b).',
    'Para P(X > a), usa: 1 - CDF(a).',
    'Para P(a < X < b), usa: CDF(b) - CDF(a).',
  ],
  default: [
    'Desglosa el problema en pasos más pequeños.',
    'Identifica las variables y sus distribuciones.',
    'Verifica tus unidades antes de interpretar.',
  ],
};

const PARTIAL_SOLUTION_HINTS: Record<string, string[]> = {
  '2.3': [
    'from scipy import stats\n# Usa stats.norm.cdf(x, loc=mu, scale=sigma)',
    'Z = (X - mu) / sigma\n# Luego busca P(Z > z)',
    'Para percentiles: stats.norm.ppf(0.90, loc=mu, scale=sigma)',
  ],
  default: [
    'Importa las librerías necesarias primero.',
    'Define tus variables antes de calcular.',
    'Imprime cada paso para verificar.',
  ],
};

export function generateHints(ctx: HintContext): GeneratedHint[] {
  const lessonId = ctx.lesson.id.split('.')[0] + '.' + ctx.lesson.id.split('.')[1];
  const hints: GeneratedHint[] = [];

  const conceptualPool = CONCEPTUAL_HINTS[lessonId] || CONCEPTUAL_HINTS.default;
  const strategicPool = STRATEGIC_HINTS[lessonId] || STRATEGIC_HINTS.default;
  const partialPool = PARTIAL_SOLUTION_HINTS[lessonId] || PARTIAL_SOLUTION_HINTS.default;

  if (ctx.attemptCount >= 1) {
    hints.push({
      level: 1,
      text: conceptualPool[Math.min(0, ctx.attemptCount - 1) % conceptualPool.length],
      type: 'conceptual',
    });
  }

  if (ctx.attemptCount >= 2) {
    hints.push({
      level: 2,
      text: strategicPool[Math.min(0, ctx.attemptCount - 2) % strategicPool.length],
      type: 'strategic',
    });
  }

  if (ctx.attemptCount >= 3) {
    hints.push({
      level: 3,
      text: partialPool[Math.min(0, ctx.attemptCount - 3) % partialPool.length],
      type: 'partial-solution',
    });
  }

  return hints;
}
