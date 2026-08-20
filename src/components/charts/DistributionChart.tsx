import { useState, useMemo, useCallback } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, Line } from 'recharts';
import { Card } from '@/components/ui/Card';
import { normalPDF, normalCDF } from '@/utils/statistics';

interface DistributionChartProps {
  initialMu?: number;
  initialSigma?: number;
  showZones?: boolean;
  showCDF?: boolean;
  interactive?: boolean;
  width?: string;
  height?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: number;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length || label === undefined) return null;
  return (
    <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="text-text font-medium">x = {label.toFixed(2)}</p>
      <p className="text-primary">f(x) = {payload[0].value.toFixed(4)}</p>
    </div>
  );
}

export function DistributionChart({
  initialMu = 0,
  initialSigma = 1,
  showZones = true,
  showCDF = false,
  interactive = true,
  width = '100%',
  height = 300,
}: DistributionChartProps) {
  const [mu, setMu] = useState(initialMu);
  const [sigma, setSigma] = useState(initialSigma);

  const data = useMemo(() => {
    const points: { x: number; y: number; yCdf: number }[] = [];
    const minX = -4;
    const maxX = 4;
    const step = 0.05;
    for (let x = minX; x <= maxX; x += step) {
      const scaledX = x * sigma + mu;
      points.push({
        x: parseFloat(scaledX.toFixed(2)),
        y: normalPDF(scaledX, mu, sigma),
        yCdf: normalCDF(scaledX, mu, sigma),
      });
    }
    return points;
  }, [mu, sigma]);

  const zones = useMemo(() => {
    if (!showZones) return [];
    return [
      { label: '68%', from: mu - sigma, to: mu + sigma, color: 'rgba(37,99,235,0.08)' },
      { label: '95%', from: mu - 2 * sigma, to: mu + 2 * sigma, color: 'rgba(37,99,235,0.04)' },
    ];
  }, [mu, sigma, showZones]);

  const stats = useMemo(() => {
    const peak = normalPDF(mu, mu, sigma);
    return { peak, p1: (mu - sigma).toFixed(2), p2: (mu + sigma).toFixed(2) };
  }, [mu, sigma]);

  const handleMuChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMu(parseFloat(e.target.value));
  }, []);

  const handleSigmaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSigma(parseFloat(e.target.value));
  }, []);

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">Distribución Normal</h3>
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span>μ = {mu.toFixed(1)}</span>
          <span>σ = {sigma.toFixed(1)}</span>
        </div>
      </div>

      <div style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          {showCDF ? (
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="cdfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" tick={{ fontSize: 11 }} tickCount={9} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="yCdf" stroke="#06B6D4" fill="url(#cdfGrad)" strokeWidth={2} />
            </AreaChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="pdfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" tick={{ fontSize: 11 }} tickCount={9} />
              <YAxis domain={[0, stats.peak * 1.15]} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={mu} stroke="#94A3B8" strokeDasharray="4 4" />
              {showZones && zones.map((z, i) => (
                <Area
                  key={i}
                  type="monotone"
                  dataKey={() => z.label === '68%' ? stats.peak * 0.6 : stats.peak * 0.2}
                  fill={z.color}
                  stroke="none"
                  isAnimationActive={false}
                />
              ))}
              <Line
                type="monotone"
                dataKey="y"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: '#2563EB' }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {interactive && (
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-text">Media (μ)</label>
              <span className="text-xs text-primary font-mono">{mu.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.1}
              value={mu}
              onChange={handleMuChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-alt accent-primary"
              aria-label="Media"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-text">Desviación estándar (σ)</label>
              <span className="text-xs text-primary font-mono">{sigma.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={3}
              step={0.1}
              value={sigma}
              onChange={handleSigmaChange}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-alt accent-primary"
              aria-label="Desviación estándar"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-6 text-xs text-text-secondary pt-1 border-t border-border">
        <span>P({(mu - sigma).toFixed(1)} &lt; X &lt; {(mu + sigma).toFixed(1)}) ≈ 68%</span>
        <span>P({(mu - 2 * sigma).toFixed(1)} &lt; X &lt; {(mu + 2 * sigma).toFixed(1)}) ≈ 95%</span>
      </div>
    </Card>
  );
}
