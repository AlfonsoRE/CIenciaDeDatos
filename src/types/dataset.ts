export interface DatasetColumn {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'date';
  nullable: boolean;
  description?: string;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  source: string;
  columns: DatasetColumn[];
  rows: Record<string, unknown>[];
  size: number;
}

export interface DatasetStats {
  rowCount: number;
  columnCount: number;
  missingValues: Record<string, number>;
  duplicates: number;
  numericSummary?: Record<string, {
    mean: number;
    median: number;
    std: number;
    min: number;
    max: number;
    q1: number;
    q3: number;
  }>;
}
