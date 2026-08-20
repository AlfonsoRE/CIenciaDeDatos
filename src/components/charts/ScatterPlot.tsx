import { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '@/components/ui/Card';

interface ScatterPlotProps {
  data: Array<{ x: number; y: number; label?: string }>;
  xLabel?: string;
  yLabel?: string;
  title?: string;
  showTrendline?: boolean;
}

function linearRegression(points: Array<{ x: number; y: number }>) {
  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  const r2 = (() => {
    const yMean = sumY / n;
    const ssTot = points.reduce((s, p) => s + (p.y - yMean) ** 2, 0);
    const ssRes = points.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
    return 1 - ssRes / ssTot;
  })();
  return { slope, intercept, r2 };
}

export function ScatterPlot({ data, xLabel = 'X', yLabel = 'Y', title, showTrendline = false }: ScatterPlotProps) {
  const regression = useMemo(() => showTrendline ? linearRegression(data) : null, [data, showTrendline]);

  const trendData = useMemo(() => {
    if (!regression) return [];
    const minX = Math.min(...data.map((d) => d.x));
    const maxX = Math.max(...data.map((d) => d.x));
    return [
      { x: minX, y: regression.slope * minX + regression.intercept },
      { x: maxX, y: regression.slope * maxX + regression.intercept },
    ];
  }, [data, regression]);

  return (
    <Card padding="lg">
      {title && <h3 className="font-semibold text-text text-sm mb-3">{title}</h3>}
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="x" name={xLabel} tick={{ fontSize: 11 }} label={{ value: xLabel, position: 'bottom', fontSize: 12 }} />
          <YAxis dataKey="y" name={yLabel} tick={{ fontSize: 11 }} label={{ value: yLabel, angle: -90, position: 'insideLeft', fontSize: 12 }} />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
                  <p className="text-text font-medium">{xLabel}: {d.x.toFixed(2)}</p>
                  <p className="text-primary">{yLabel}: {d.y.toFixed(2)}</p>
                  {d.label && <p className="text-text-secondary">{d.label}</p>}
                </div>
              );
            }}
          />
          <Scatter data={data} fill="#2563EB" fillOpacity={0.6} />
          {showTrendline && trendData.length > 0 && (
            <Scatter data={trendData} fill="#DC2626" line={{ stroke: '#DC2626', strokeWidth: 2 }} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
      {regression && (
        <div className="mt-2 text-xs text-text-secondary flex items-center gap-4">
          <span>y = {regression.slope.toFixed(3)}x + {regression.intercept.toFixed(3)}</span>
          <span>R² = {regression.r2.toFixed(4)}</span>
        </div>
      )}
    </Card>
  );
}
