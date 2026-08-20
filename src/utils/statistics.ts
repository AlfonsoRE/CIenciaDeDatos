export function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mode(arr: number[]): number {
  const freq = new Map<number, number>();
  arr.forEach((v) => freq.set(v, (freq.get(v) || 0) + 1));
  let maxFreq = 0;
  let result = arr[0];
  freq.forEach((count, val) => {
    if (count > maxFreq) { maxFreq = count; result = val; }
  });
  return result;
}

export function standardDeviation(arr: number[]): number {
  const m = mean(arr);
  const variance = arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

export function variance(arr: number[]): number {
  const m = mean(arr);
  return arr.reduce((sum, val) => sum + (val - m) ** 2, 0) / arr.length;
}

export function percentile(arr: number[], p: number): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const low = Math.floor(idx);
  const high = Math.ceil(idx);
  if (low === high) return sorted[low];
  return sorted[low] + (sorted[high] - sorted[low]) * (idx - low);
}

export function skewness(arr: number[]): number {
  const n = arr.length;
  const m = mean(arr);
  const s = standardDeviation(arr);
  if (s === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + ((val - m) / s) ** 3, 0);
  return (n / ((n - 1) * (n - 2))) * sum;
}

export function normalPDF(x: number, mu: number, sigma: number): number {
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * ((x - mu) / sigma) ** 2;
  return coeff * Math.exp(exponent);
}

export function normalCDF(x: number, mu: number, sigma: number): number {
  const z = (x - mu) / sigma;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327;
  const p = d * Math.exp(-z * z / 2) *
    (t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.8212560 + t * 1.3302744)))));
  return z > 0 ? 1 - p : p;
}

export function zScore(value: number, mu: number, sigma: number): number {
  return (value - mu) / sigma;
}
