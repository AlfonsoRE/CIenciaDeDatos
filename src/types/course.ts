export interface TheoryBlock {
  id: string;
  type: 'text' | 'formula' | 'list' | 'note' | 'warning' | 'example';
  title?: string;
  content?: string;
  formula?: string;
  items?: string[];
}

export interface VisualExample {
  id: string;
  type: 'chart' | 'diagram' | 'simulation' | 'comparison';
  title: string;
  description: string;
  chartType?: string;
  interactive: boolean;
  parameters?: InteractiveParameter[];
  items?: { label: string; detail: string; color?: string }[];
}

export interface InteractiveParameter {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  question: string;
  options?: ActivityOption[];
  correctAnswer: string | string[];
  explanation: string;
  conceptLinked: string;
  parameters?: Record<string, unknown>;
}

export type ActivityType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'matching'
  | 'ordering'
  | 'classification'
  | 'drag-drop'
  | 'numeric'
  | 'chart-analysis'
  | 'parameter-experiment'
  | 'code-prediction';

export interface ActivityOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  matchId?: string;
}

export interface Practice {
  id: string;
  title: string;
  objective: string;
  dataset?: string;
  steps: PracticeStep[];
  language: 'python' | 'r' | 'both';
}

export interface PracticeStep {
  id: string;
  instruction: string;
  codeTemplate: string;
  expectedOutput?: string;
  explanation: string;
  hints: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  dataset?: string;
  language: 'python' | 'r' | 'both';
  codeTemplate: string;
  expectedApproach: string;
  evaluationCriteria: string[];
  hints?: string[];
}

export interface Assessment {
  id: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  type: 'conceptual' | 'multiple-choice' | 'interpretation' | 'numeric' | 'code' | 'model-selection';
  text: string;
  options?: QuestionOption[];
  correctAnswer: string | number | string[];
  explanation: string;
  conceptLinked: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  code: string;
  title: string;
  objectives: string[];
  prerequisites?: string[];
  theory: TheoryBlock[];
  visualExamples: VisualExample[];
  activities: Activity[];
  guidedPractice: Practice;
  challenge: Challenge;
  assessment: Assessment;
  competencies: string[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  practiceIds: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  units: Unit[];
}
