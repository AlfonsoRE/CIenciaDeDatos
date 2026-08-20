import Dexie, { type Table } from 'dexie';
import type { AnalyticsEvent } from '@/types/progress';

export interface PortfolioEntry {
  id?: number;
  type: 'activity' | 'practice' | 'challenge' | 'assessment' | 'project' | 'code' | 'chart' | 'reflection';
  lessonId: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface CodeState {
  lessonId: string;
  code: string;
  language: 'python' | 'r';
  savedAt: string;
}

class CienciaDatosDB extends Dexie {
  analytics!: Table<AnalyticsEvent, number>;
  portfolio!: Table<PortfolioEntry, number>;
  codeStates!: Table<CodeState, string>;

  constructor() {
    super('CienciaDatosDB');
    this.version(1).stores({
      analytics: '++id, event, timestamp',
      portfolio: '++id, type, lessonId, createdAt',
      codeStates: 'lessonId',
    });
  }
}

export const db = new CienciaDatosDB();

export async function logEvent(event: string, payload: Record<string, unknown> = {}) {
  await db.analytics.add({
    event,
    payload,
    timestamp: new Date().toISOString(),
  });
}

export async function savePortfolioEntry(entry: Omit<PortfolioEntry, 'id'>) {
  await db.portfolio.add(entry);
}

export async function getPortfolioByLesson(lessonId: string) {
  return db.portfolio.where('lessonId').equals(lessonId).toArray();
}

export async function saveCodeState(state: CodeState) {
  await db.codeStates.put(state);
}

export async function getCodeState(lessonId: string) {
  return db.codeStates.get(lessonId);
}
