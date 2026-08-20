export interface TutorRule {
  id: string;
  trigger: TutorTrigger;
  response: TutorResponse;
  priority: number;
}

export interface TutorTrigger {
  errorPatterns?: string[];
  scoreBelow?: number;
  attemptsExceed?: number;
  hintsUsedExceed?: number;
  stage?: string;
  competencyWeakness?: string[];
}

export interface TutorResponse {
  message: string;
  type: 'hint' | 'explanation' | 'encouragement' | 'redirect' | 'concept-review';
  followUp?: string;
  relatedContent?: string;
}

interface TutorContext {
  errorHistory: string[];
  score: number;
  attempts: number;
  hintsUsed: number;
  currentStage: string;
  weakConcepts: string[];
  completedStages: string[];
  lessonId: string;
}

const TUTOR_RULES: TutorRule[] = [
  {
    id: 'variance-std-confusion',
    trigger: { errorPatterns: ['varianza', 'desviacion', 'σ', 'std'] },
    response: {
      message: 'Parece que confundiste varianza con desviación estándar. La varianza (σ²) está en unidades al cuadrado, mientras que la desviación estándar (σ) está en las mismas unidades que los datos. Recuerda: σ = √(σ²).',
      type: 'concept-review',
      followUp: '¿Puedes identificar en qué unidad está expresada cada una?',
    },
    priority: 10,
  },
  {
    id: 'probability-cdf-help',
    trigger: { errorPatterns: ['probabilidad', 'P(X)', 'cdf', 'acumulada'] },
    response: {
      message: 'Para calcular P(X > a), recuerda que la probabilidad total es 1. Entonces P(X > a) = 1 - P(X ≤ a) = 1 - CDF(a). La función CDF te da la probabilidad acumulada hasta un punto.',
      type: 'explanation',
      followUp: 'Intenta aplicar esta fórmula con el valor dado.',
    },
    priority: 9,
  },
  {
    id: 'z-score-help',
    trigger: { errorPatterns: ['z-score', 'puntuacion z', 'estandarizar'] },
    response: {
      message: 'La puntuación Z mide cuántas desviaciones estándar está un valor de la media. La fórmula es: Z = (X - μ) / σ. Un Z positivo significa que X está por encima de la media.',
      type: 'concept-review',
      followUp: 'Practica con un ejemplo: si μ=100, σ=15, ¿cuál es Z para X=130?',
    },
    priority: 8,
  },
  {
    id: 'low-score-encouragement',
    trigger: { scoreBelow: 40 },
    response: {
      message: 'Este tema está siendo un poco difícil, y eso está bien. Todo aprendizaje requiere persistencia. ¿Qué intentaste hacer? Puedo ayudarte a entender el concepto desde otro ángulo.',
      type: 'encouragement',
      followUp: '¿Quieres que volvamos a la teoría o prefieres intentar una actividad más sencilla?',
    },
    priority: 7,
  },
  {
    id: 'many-attempts-redirect',
    trigger: { attemptsExceed: 3 },
    response: {
      message: 'Has intentado varias veces. A veces es útil tomar un paso atrás y revisar el concepto desde la teoría antes de intentar de nuevo. No se trata de cantidad, sino de comprensión.',
      type: 'redirect',
      relatedContent: 'theory',
    },
    priority: 6,
  },
  {
    id: 'many-hints-warning',
    trigger: { hintsUsedExceed: 3 },
    response: {
      message: 'Has usado varias pistas. Las pistas están para guiarte, pero el verdadero aprendizaje viene de resolver por ti mismo. ¿Puedes intentar la siguiente pregunta sin ayuda?',
      type: 'hint',
    },
    priority: 5,
  },
  {
    id: 'stage-theory-encourage',
    trigger: { stage: 'theory', scoreBelow: 50 },
    response: {
      message: 'Estás en la etapa de teoría. Asegúrate de leer cada bloque cuidadosamente. Los conceptos se construyen unos sobre otros.',
      type: 'concept-review',
    },
    priority: 4,
  },
  {
    id: 'good-progress',
    trigger: { scoreBelow: 101, competencyWeakness: [] },
    response: {
      message: '¡Buen progreso! Tu comprensión es sólida. Sigue así.',
      type: 'encouragement',
    },
    priority: 1,
  },
];

function matchesTrigger(trigger: TutorTrigger, ctx: TutorContext): boolean {
  if (trigger.errorPatterns) {
    const hasMatch = trigger.errorPatterns.some((pattern) =>
      ctx.errorHistory.some((err) => err.toLowerCase().includes(pattern.toLowerCase()))
    );
    if (!hasMatch) return false;
  }
  if (trigger.scoreBelow !== undefined && ctx.score >= trigger.scoreBelow) return false;
  if (trigger.attemptsExceed !== undefined && ctx.attempts <= trigger.attemptsExceed) return false;
  if (trigger.hintsUsedExceed !== undefined && ctx.hintsUsed <= trigger.hintsUsedExceed) return false;
  if (trigger.stage && ctx.currentStage !== trigger.stage) return false;
  if (trigger.competencyWeakness) {
    const hasWeakness = trigger.competencyWeakness.some((c) => ctx.weakConcepts.includes(c));
    if (!hasWeakness) return false;
  }
  return true;
}

export function getTutorResponse(ctx: TutorContext): TutorResponse | null {
  const matched = TUTOR_RULES
    .filter((rule) => matchesTrigger(rule.trigger, ctx))
    .sort((a, b) => b.priority - a.priority);

  if (matched.length === 0) {
    return {
      message: '¿Tienes alguna duda sobre el contenido? Puedo explicar conceptos, darte pistas o ayudarte a interpretar resultados.',
      type: 'hint',
    };
  }

  return matched[0].response;
}
