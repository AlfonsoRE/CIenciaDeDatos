import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';

interface BoxPlotProps {
  data: number[];
  label?: string;
  showOutliers?: boolean;
  interactive?: boolean;
}

export function BoxPlot({ data, label = 'Datos', showOutliers = true, interactive = false }: BoxPlotProps) {
  const [highlight, setHighlight] = useState<number | null>(null);

  const stats = useMemo(() => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = sorted.length;
    const q1 = sorted[Math.floor(n * 0.25)];
    const median = sorted[Math.floor(n * 0.5)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const outliers = showOutliers ? sorted.filter((v) => v < lowerFence || v > upperFence) : [];
    const min = Math.max(sorted[0], lowerFence);
    const max = Math.min(sorted[n - 1], upperFence);
    const mean = data.reduce((a, b) => a + b, 0) / n;
    return { q1, median, q3, iqr, min, max, outliers, mean, lowerFence, upperFence };
  }, [data, showOutliers]);

  const allValues = showOutliers ? [...data, ...stats.outliers] : data;
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const range = dataMax - dataMin || 1;
  const padding = range * 0.1;
  const svgMin = dataMin - padding;
  const svgMax = dataMax + padding;
  const svgRange = svgMax - svgMin;

  const toX = (v: number) => ((v - svgMin) / svgRange) * 400 + 50;
  const width = 500;
  const height = 120;

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-text">{label}</span>
        <div className="flex items-center gap-3 text-xs text-text-secondary">
          <span>Min: {stats.min.toFixed(1)}</span>
          <span>Q1: {stats.q1.toFixed(1)}</span>
          <span>Mediana: {stats.median.toFixed(1)}</span>
          <span>Q3: {stats.q3.toFixed(1)}</span>
          <span>Max: {stats.max.toFixed(1)}</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <line x1="50" y1="60" x2="450" y2="60" stroke="var(--border)" strokeWidth="1" />
        <line x1={toX(stats.min)} y1="55" x2={toX(stats.min)} y2="65" stroke="var(--text-secondary)" strokeWidth="2" />
        <line x1={toX(stats.max)} y1="55" x2={toX(stats.max)} y2="65" stroke="var(--text-secondary)" strokeWidth="2" />
        <line x1={toX(stats.min)} y1="60" x2={toX(stats.q1)} y2="60" stroke="var(--text-secondary)" strokeWidth="2" />
        <line x1={toX(stats.q3)} y1="60" x2={toX(stats.max)} y2="60" stroke="var(--text-secondary)" strokeWidth="2" />
        <rect
          x={toX(stats.q1)}
          y="40"
          width={Math.max(1, toX(stats.q3) - toX(stats.q1))}
          height="40"
          rx="4"
          fill="#2563EB"
          fillOpacity="0.2"
          stroke="#2563EB"
          strokeWidth="2"
        />
        <line x1={toX(stats.median)} y1="35" x2={toX(stats.median)} y2="85" stroke="#2563EB" strokeWidth="3" />
        <circle cx={toX(stats.mean)} cy="60" r="4" fill="#DC2626" />
        {stats.outliers.map((v, i) => (
          <circle
            key={i}
            cx={toX(v)}
            cy="60"
            r="3"
            fill="none"
            stroke="#DC2626"
            strokeWidth="1.5"
            onMouseEnter={() => interactive && setHighlight(v)}
            onMouseLeave={() => interactive && setHighlight(null)}
            className={interactive ? 'cursor-pointer' : ''}
          />
        ))}
        {interactive && highlight !== null && (
          <text x={toX(highlight)} y="20" textAnchor="middle" fontSize="11" fill="var(--text)">
            {highlight.toFixed(1)}
          </text>
        )}
      </svg>
      <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Caja (Q1-Q3)</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#DC2626] inline-block" /> Media</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border border-[#DC2626] inline-block" /> Outliers</span>
      </div>
    </Card>
  );
}
