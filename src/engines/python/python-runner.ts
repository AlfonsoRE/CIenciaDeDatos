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
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v314.0.5/full/',
    });
    for (const pkg of ['numpy', 'matplotlib', 'pandas', 'scipy', 'scikit-learn']) {
      try {
        await pyodide.loadPackage(pkg);
      } catch (e) {
        console.warn(`[Pyodide] No se pudo cargar ${pkg}:`, e);
      }
    }
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  return btoa(binary);
}

export async function runPythonCode(code: string, timeoutMs = 30000): Promise<PythonRunResult> {
  const startTime = performance.now();

  try {
    const pyodide = await getPyodide() as {
      runPythonAsync: (code: string) => Promise<unknown>;
      globals: { set: (name: string, value: unknown) => void; get: (name: string) => unknown };
    };

    const encoded = toBase64(code);
    pyodide.globals.set('__user_code_b64', encoded);

    const runnerCode = `
import sys as _sys, io as _io, traceback as _tb, base64 as _b64

_orig_out = _sys.stdout
_orig_err = _sys.stderr
_buf_out = _io.StringIO()
_buf_err = _io.StringIO()
_sys.stdout = _buf_out
_sys.stderr = _buf_err

_svg = ''
_error_msg = ''

try:
    _decoded = _b64.b64decode(__user_code_b64).decode('utf-8')

    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import numpy as np
    import warnings
    warnings.filterwarnings('ignore')
    matplotlib.rcParams['font.size'] = 10

    exec(_decoded)

    if plt.get_fignums():
        import io as _io2
        _buf = _io2.BytesIO()
        plt.savefig(_buf, format='svg', bbox_inches='tight', dpi=100)
        _buf.seek(0)
        _svg = _buf.read().decode('utf-8')
except:
    _error_msg = _tb.format_exc()
finally:
    try:
        import matplotlib.pyplot as _plt_cleanup
        _plt_cleanup.close('all')
    except Exception:
        pass

_sys.stdout = _orig_out
_sys.stderr = _orig_err

_py_result_stdout = _buf_out.getvalue()
_py_result_stderr = _buf_err.getvalue()
_py_result_svg = _svg
_py_result_error = _error_msg
`;

    // Pyodide ejecuta en el hilo principal: un bucle síncrono infinito igual congela
    // la pestaña. Esta carrera solo protege el caso async (I/O, awaits explícitos).
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Tiempo de ejecución excedido (${(timeoutMs / 1000).toFixed(0)}s). Revisa si tu código tiene un bucle infinito o una operación muy lenta.`)), timeoutMs);
    });
    await Promise.race([pyodide.runPythonAsync(runnerCode), timeoutPromise]);

    const stdout = String(pyodide.globals.get('_py_result_stdout') || '');
    const stderr = String(pyodide.globals.get('_py_result_stderr') || '');
    const svgOutput = String(pyodide.globals.get('_py_result_svg') || '').trim() || null;
    const pythonError = String(pyodide.globals.get('_py_result_error') || '').trim();

    for (const k of ['__user_code_b64', '_py_result_stdout', '_py_result_stderr', '_py_result_svg', '_py_result_error']) {
      try { pyodide.globals.set(k, undefined); } catch { /* ok */ }
    }

    const errorMsg = pythonError || (stderr.trim().length > 0 ? stderr.trim() : null);

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      svgOutput,
      result: stdout.trim(),
      error: errorMsg,
      duration: Math.round(performance.now() - startTime),
      success: !errorMsg,
    };
  } catch (err: unknown) {
    let msg: string;
    if (err instanceof Error) {
      msg = err.message || String(err);
    } else if (typeof err === 'string') {
      msg = err;
    } else {
      msg = String(err) || 'Error desconocido';
    }
    console.error('[PythonRunner]', msg);
    return {
      stdout: '',
      stderr: '',
      svgOutput: null,
      result: null,
      error: msg,
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
