export type LearningStage =
  | 'theory'
  | 'visual'
  | 'activity'
  | 'guided-practice'
  | 'challenge'
  | 'assessment'
  | 'feedback';

export const LEARNING_STAGES: LearningStage[] = [
  'theory',
  'visual',
  'activity',
  'guided-practice',
  'challenge',
  'assessment',
  'feedback',
];

export const STAGE_LABELS: Record<LearningStage, string> = {
  theory: 'Teoría',
  visual: 'Visual',
  activity: 'Actividad',
  'guided-practice': 'Práctica',
  challenge: 'Reto',
  assessment: 'Evaluación',
  feedback: 'Feedback',
};

export const STAGE_ICONS: Record<LearningStage, string> = {
  theory: 'BookOpen',
  visual: 'Eye',
  activity: 'Puzzle',
  'guided-practice': 'Code',
  challenge: 'Zap',
  assessment: 'ClipboardCheck',
  feedback: 'MessageCircle',
};
