import type { Lesson } from '@/types/course';
import { LESSON_1_1 } from './lesson-1-1';
import { LESSON_1_2 } from './lesson-1-2';
import { LESSON_1_3 } from './lesson-1-3';
import { LESSON_1_4 } from './lesson-1-4';
import { LESSON_1_5 } from './lesson-1-5';
import { LESSON_1_6 } from './lesson-1-6';
import { LESSON_2_1 } from './lesson-2-1';
import { LESSON_2_2 } from './lesson-2-2';
import { LESSON_2_3 } from './lesson-2-3';
import { LESSON_2_4 } from './lesson-2-4';
import { LESSON_2_5 } from './lesson-2-5';
import { LESSON_3_1 } from './lesson-3-1';
import { LESSON_3_2 } from './lesson-3-2';
import { LESSON_3_3 } from './lesson-3-3';
import { LESSON_3_4 } from './lesson-3-4';
import { LESSON_4_1 } from './lesson-4-1';
import { LESSON_4_2 } from './lesson-4-2';
import { LESSON_4_3 } from './lesson-4-3';
import { LESSON_5_1 } from './lesson-5-1';
import { LESSON_5_2 } from './lesson-5-2';
import { LESSON_5_3 } from './lesson-5-3';
import { LESSON_5_4 } from './lesson-5-4';

const LESSONS_UNIT_1: Lesson[] = [
  LESSON_1_1,
  LESSON_1_2,
  LESSON_1_3,
  LESSON_1_4,
  LESSON_1_5,
  LESSON_1_6,
];

const LESSONS_UNIT_2: Lesson[] = [
  LESSON_2_1,
  LESSON_2_2,
  LESSON_2_3,
  LESSON_2_4,
  LESSON_2_5,
];

export const UNITS_DATA = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Introducción a la Ciencia de Datos',
    description: 'Fundamentos, objetivos, ciclo de vida y herramientas.',
    lessons: LESSONS_UNIT_1,
    practiceIds: ['p1', 'p2', 'p3', 'p4'],
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Estadística y Ciencia de Datos',
    description: 'Estadística descriptiva, probabilidad e inferencia.',
    lessons: LESSONS_UNIT_2,
    practiceIds: ['p5', 'p6', 'p7', 'p8'],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Análisis Exploratorio de Datos',
    description: 'Limpieza, transformación, visualización y EDA.',
    lessons: [LESSON_3_1, LESSON_3_2, LESSON_3_3, LESSON_3_4],
    practiceIds: ['p9', 'p10', 'p11', 'p12', 'p13'],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Modelos Analíticos y ML',
    description: 'Aprendizaje supervisado, no supervisado y evaluación.',
    lessons: [LESSON_4_1, LESSON_4_2, LESSON_4_3],
    practiceIds: ['p14', 'p15', 'p16', 'p17', 'p18', 'p19'],
  },
  {
    id: 'unit-5',
    number: 5,
    title: 'Ciencia de Datos Aplicada',
    description: 'Aplicaciones sectoriales, proyectos, ética y tendencias.',
    lessons: [LESSON_5_1, LESSON_5_2, LESSON_5_3, LESSON_5_4],
    practiceIds: ['p20', 'p21', 'p22', 'p23'],
  },
];
