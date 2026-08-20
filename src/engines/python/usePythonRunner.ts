import { useState, useCallback, useRef } from 'react';
import { runPythonCode, isPyodideLoaded, getPyodideLoadStatus, type PythonRunResult } from './python-runner';

export function usePythonRunner() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'success' | 'error'>(getPyodideLoadStatus() === 'loaded' ? 'idle' : 'idle');
  const [output, setOutput] = useState<PythonRunResult | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const ensureLoaded = useCallback(async () => {
    if (isPyodideLoaded()) return true;
    setStatus('loading');
    setLoadProgress(30);
    try {
      await runPythonCode('print("ok")', 60000);
      setLoadProgress(100);
      setStatus('idle');
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  }, []);

  const run = useCallback(async (code: string, timeoutMs = 30000) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus('loading');
    setOutput(null);
    setLoadProgress(20);

    const loaded = await ensureLoaded();
    if (!loaded) return null;

    setLoadProgress(80);
    setStatus('running');
    setLoadProgress(100);

    const result = await runPythonCode(code, timeoutMs);
    setOutput(result);
    setStatus(result.success ? 'success' : 'error');
    return result;
  }, [ensureLoaded]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setStatus('idle');
  }, []);

  return { status, output, run, stop, loadProgress, ensureLoaded };
}
