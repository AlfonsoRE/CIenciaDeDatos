import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';

interface CorrelationMatrixProps {
  variables: string[];
  data: number[][];
  title?: string;
}

function getColor(value: number): string {
  if (value >= 0.7) return '#16A34A';
  if (value >= 0.3) return '#2563EB';
  if (value >= -0.3) return '#94A3B8';
  if (value >= -0.7) return '#F59E0B';
  return '#DC2626';
}

function getBgOpacity(value: number): number {
  return Math.abs(value) * 0.3 + 0.05;
}

export function CorrelationMatrix({ variables, data, title }: CorrelationMatrixProps) {
  const matrix = useMemo(() => {
    const n = variables.length;
    const result: number[][] = [];
    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          result[i][j] = 1;
        } else if (j < i) {
          result[i][j] = result[j][i];
        } else {
          const colI = data.map((row) => row[i]);
          const colJ = data.map((row) => row[j]);
          const meanI = colI.reduce((a, b) => a + b, 0) / colI.length;
          const meanJ = colJ.reduce((a, b) => a + b, 0) / colJ.length;
          const num = colI.reduce((sum, v, k) => sum + (v - meanI) * (colJ[k] - meanJ), 0);
          const denI = Math.sqrt(colI.reduce((s, v) => s + (v - meanI) ** 2, 0));
          const denJ = Math.sqrt(colJ.reduce((s, v) => s + (v - meanJ) ** 2, 0));
          result[i][j] = denI && denJ ? num / (denI * denJ) : 0;
        }
      }
    }
    return result;
  }, [variables, data]);

  const cellSize = 60;
  const labelWidth = 80;
  const width = labelWidth + variables.length * cellSize + 20;
  const height = labelWidth + variables.length * cellSize + 20;

  return (
    <Card padding="lg" className="overflow-x-auto">
      {title && <h3 className="font-semibold text-text text-sm mb-3">{title}</h3>}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
        {variables.map((v, i) => (
          <text
            key={`label-x-${i}`}
            x={labelWidth + i * cellSize + cellSize / 2}
            y={labelWidth - 5}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            transform={`rotate(-30, ${labelWidth + i * cellSize + cellSize / 2}, ${labelWidth - 5})`}
          >
            {v}
          </text>
        ))}
        {variables.map((v, i) => (
          <text
            key={`label-y-${i}`}
            x={labelWidth - 5}
            y={labelWidth + i * cellSize + cellSize / 2 + 4}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            {v}
          </text>
        ))}
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <g key={`cell-${i}-${j}`}>
              <rect
                x={labelWidth + j * cellSize + 2}
                y={labelWidth + i * cellSize + 2}
                width={cellSize - 4}
                height={cellSize - 4}
                rx="4"
                fill={getColor(val)}
                fillOpacity={getBgOpacity(val)}
              />
              <text
                x={labelWidth + j * cellSize + cellSize / 2}
                y={labelWidth + i * cellSize + cellSize / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text)"
              >
                {val.toFixed(2)}
              </text>
            </g>
          ))
        )}
      </svg>
      <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-secondary">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#DC2626', opacity: 0.35 }} /> -1.0</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#F59E0B', opacity: 0.25 }} /> -0.5</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#94A3B8', opacity: 0.1 }} /> 0.0</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#2563EB', opacity: 0.25 }} /> 0.5</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: '#16A34A', opacity: 0.35 }} /> 1.0</span>
      </div>
    </Card>
  );
}
