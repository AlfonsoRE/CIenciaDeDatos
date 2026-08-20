export interface PythonRunResult {
  stdout: string;
  stderr: string;
  svgOutput: string | null;
  result: string | null;
  error: string | null;
  duration: number;
  success: boolean;
}

let pyodideInstance: unknown = null;
let pyodideLoadingPromise: Promise<unknown> | null = null;

async function getPyodide(): Promise<unknown> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    const { loadPyodide } = await import('pyodide');
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    });
    await pyodide.loadPackage(['numpy', 'matplotlib']);
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

export async function runPythonCode(code: string, timeoutMs = 30000): Promise<PythonRunResult> {
  const startTime = performance.now();
  let stdout = '';
  let stderr = '';
  let svgOutput: string | null = null;

  try {
    const pyodide = await getPyodide() as {
      runPythonAsync: (code: string) => Promise<unknown>;
      globals: { get: (name: string) => (...args: unknown[]) => string };
    };

    pyodide.runPythonAsync(`
import sys, io
_sys_stdout = sys.stdout
_sys_stderr = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Tiempo de ejecución agotado')), timeoutMs);
    });

    const execPromise = pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import numpy as np

${code}

# Try to capture matplotlib figure
import sys
_buf = sys.stdout.getvalue() if hasattr(sys.stdout, 'getvalue') else ''
_err = sys.stderr.getvalue() if hasattr(sys.stderr, 'getvalue') else ''

# Check for SVG output
_fig_out = ''
try:
    if plt.get_fignums():
        import io
        buf = io.BytesIO()
        plt.savefig(buf, format='svg', bbox_inches='tight', dpi=100)
        buf.seek(0)
        _fig_out = buf.read().decode('utf-8')
        plt.close('all')
except Exception:
    pass

sys.stdout = _sys_stdout
sys.stderr = _sys_stderr
print("STDOUT_DELIM" + _buf)
print("STDERR_DELIM" + _err)
if _fig_out:
    print("SVG_DELIM" + _fig_out)
`);

    await Promise.race([execPromise, timeoutPromise]);

    const output = String(pyodide.globals.get('_') || '');

    const stdoutMatch = output.match(/STDOUT_DELIM([\s\S]*?)(?=STDERR_DELIM|$)/);
    const stderrMatch = output.match(/STDERR_DELIM([\s\S]*?)(?=SVG_DELIM|$)/);
    const svgMatch = output.match(/SVG_DELIM([\s\S]*?)$/);

    stdout = stdoutMatch?.[1]?.trim() || '';
    stderr = stderrMatch?.[1]?.trim() || '';
    svgOutput = svgMatch?.[1]?.trim() || null;

    return {
      stdout,
      stderr,
      svgOutput,
      result: stdout,
      error: stderr || null,
      duration: Math.round(performance.now() - startTime),
      success: true,
    };
  } catch (err) {
    return {
      stdout,
      stderr,
      svgOutput,
      result: null,
      error: err instanceof Error ? err.message : 'Error desconocido',
      duration: Math.round(performance.now() - startTime),
      success: false,
    };
  }
}

export function isPyodideLoaded(): boolean {
  return pyodideInstance !== null;
}

export function getPyodideLoadStatus(): 'idle' | 'loading' | 'loaded' | 'error' {
  if (pyodideInstance) return 'loaded';
  if (pyodideLoadingPromise) return 'loading';
  return 'idle';
}
