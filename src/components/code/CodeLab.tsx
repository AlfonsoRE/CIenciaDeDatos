import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { HintSystem } from '@/components/tutor/HintSystem';
import { usePythonRunner } from '@/engines/python/usePythonRunner';
import { Play, Square, RotateCcw, Loader2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface CodeLabProps {
  title: string;
  objective: string;
  initialCode: string;
  language?: 'python' | 'r';
  hints?: string[];
  expectedOutput?: string;
  datasetInfo?: string;
  stepNumber?: number;
  totalSteps?: number;
  onStepComplete?: (success: boolean) => void;
  onHintUsed?: (hintIndex: number) => void;
}

const darkTheme = EditorView.theme({
  '&': { backgroundColor: '#1E293B' },
  '.cm-content': { color: '#F8FAFC', caretColor: '#2563EB' },
  '.cm-gutters': { backgroundColor: '#1E293B', color: '#64748B', border: 'none' },
  '.cm-activeLine': { backgroundColor: '#334155' },
  '.cm-activeLineGutter': { backgroundColor: '#334155' },
  '.cm-selectionBackground': { backgroundColor: '#2563EB33' },
  '.cm-cursor': { borderLeftColor: '#2563EB' },
  '.cm-matchingBracket': { backgroundColor: '#2563EB22', outline: '1px solid #2563EB' },
});

const lightTheme = EditorView.theme({
  '&': { backgroundColor: '#F8FAFC' },
  '.cm-content': { color: '#0F172A', caretColor: '#2563EB' },
  '.cm-gutters': { backgroundColor: '#F1F5F9', color: '#94A3B8', border: 'none' },
  '.cm-activeLine': { backgroundColor: '#E2E8F022' },
  '.cm-activeLineGutter': { backgroundColor: '#E2E8F022' },
  '.cm-selectionBackground': { backgroundColor: '#2563EB22' },
  '.cm-cursor': { borderLeftColor: '#2563EB' },
});

export function CodeLab({
  title,
  objective,
  initialCode,
  language = 'python',
  hints = [],
  expectedOutput,
  datasetInfo,
  stepNumber,
  totalSteps,
  onStepComplete,
  onHintUsed,
}: CodeLabProps) {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState('code');
  const [copied, setCopied] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const { status, output, run, stop } = usePythonRunner();

  const handleRun = useCallback(async () => {
    setActiveTab('output');
    const result = await run(code);
    onStepComplete?.(result?.success ?? false);
  }, [code, run, onStepComplete]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const tabs = [
    { id: 'instructions', label: 'Instrucciones', icon: undefined },
    { id: 'code', label: 'Código', icon: undefined },
    { id: 'output', label: 'Resultado', icon: undefined },
    ...(datasetInfo ? [{ id: 'data', label: 'Datos', icon: undefined }] : []),
  ];

  return (
    <Card padding="none" className="overflow-hidden border border-border">
      <div className="bg-surface-alt px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {stepNumber && (
              <Badge variant="info" size="sm">
                Paso {stepNumber}/{totalSteps}
              </Badge>
            )}
            <h3 className="font-semibold text-text text-sm">{title}</h3>
          </div>
          <Badge variant={language === 'python' ? 'success' : 'warning'} size="sm">
            {language === 'python' ? 'Python' : 'R'}
          </Badge>
        </div>
        <p className="text-xs text-text-secondary mt-1">{objective}</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="min-h-[300px]">
        {activeTab === 'instructions' && (
          <div className="p-4 space-y-3">
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text mb-2">Objetivo:</p>
              <p>{objective}</p>
            </div>
            {expectedOutput && (
              <div className="bg-surface-alt rounded-lg p-3">
                <p className="text-xs font-medium text-text-secondary mb-1">Salida esperada:</p>
                <pre className="text-xs text-text font-mono whitespace-pre-wrap">{expectedOutput}</pre>
              </div>
            )}
            {hints.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setShowHints(!showHints)}>
                {showHints ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Pistas disponibles ({hints.length})
              </Button>
            )}
            {showHints && <HintSystem hints={hints} onHintUsed={onHintUsed ?? (() => {})} />}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="relative">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-surface border-b border-border">
              <Button
                size="sm"
                variant={status === 'running' ? 'danger' : 'success'}
                onClick={status === 'running' ? stop : handleRun}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><Loader2 size={12} className="animate-spin" /> Cargando...</>
                ) : status === 'running' ? (
                  <><Square size={12} /> Detener</>
                ) : (
                  <><Play size={12} /> Ejecutar</>
                )}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleReset}>
                <RotateCcw size={12} /> Reiniciar
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCopy}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copiado' : 'Copiar'}
              </Button>
              <div className="flex-1" />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsDark(!isDark)}
                aria-label={isDark ? 'Cambiar editor a tema claro' : 'Cambiar editor a tema oscuro'}
              >
                {isDark ? '☀️' : '🌙'}
              </Button>
            </div>
            <CodeMirror
              value={code}
              onChange={(val) => setCode(val)}
              extensions={[python(), EditorView.lineWrapping]}
              theme={isDark ? darkTheme : lightTheme}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                highlightActiveLineGutter: true,
                foldGutter: true,
                autocompletion: true,
                bracketMatching: true,
              }}
              style={{ minHeight: '250px', fontSize: '13px' }}
            />
          </div>
        )}

        {activeTab === 'output' && (
          <div className="p-4 space-y-3">
            {status === 'loading' && (
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Loader2 size={16} className="animate-spin text-primary" />
                Preparando entorno de Python...
              </div>
            )}
            {status === 'running' && (
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Loader2 size={16} className="animate-spin text-primary" />
                Ejecutando código...
              </div>
            )}
            {output && (
              <>
                {output.stdout && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                      <span className="text-xs text-text-secondary ml-1 font-mono">terminal</span>
                    </div>
                    <pre className="bg-[#1a1b26] rounded-xl p-4 text-sm text-[#a9b1d6] font-mono whitespace-pre-wrap overflow-x-auto max-h-[420px] leading-relaxed border border-border/30 shadow-inner">
                      <span className="text-success">$</span> python output
                      <span className="text-text-secondary">
{'\n'}{'─'.repeat(50)}
                      </span>
{'\n'}{output.stdout}
                    </pre>
                  </div>
                )}
                {output.svgOutput && (
                  <div>
                    <p className="text-xs font-medium text-text-secondary mb-1">Gráfica:</p>
                    <div
                      className="bg-white rounded-xl p-4 border border-border overflow-x-auto shadow-sm"
                      dangerouslySetInnerHTML={{ __html: output.svgOutput }}
                    />
                  </div>
                )}
                {output.error && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                      <span className="text-xs text-danger ml-1 font-mono">error</span>
                    </div>
                    <pre className="bg-[#1a1b26] rounded-xl p-4 text-sm text-danger font-mono whitespace-pre-wrap overflow-x-auto max-h-[420px] leading-relaxed border border-danger/30 shadow-inner">
                      <span className="text-danger">✗</span> Traceback
                      <span className="text-text-secondary">
{'\n'}{'─'.repeat(50)}
                      </span>
{'\n'}{output.error}
                    </pre>
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-text-secondary pt-2 border-t border-border">
                  <span className="font-mono">{output.duration}ms</span>
                  <Badge variant={output.success ? 'success' : 'danger'} size="sm">
                    {output.success ? 'Completado' : 'Error'}
                  </Badge>
                </div>
              </>
            )}
            {!output && status === 'idle' && (
              <div className="bg-[#1a1b26] rounded-xl p-8 text-center border border-border/30">
                <p className="text-sm text-text-secondary font-mono">
                  <span className="text-success">$</span> Presiona "Ejecutar" para ver los resultados.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'data' && datasetInfo && (
          <div className="p-4">
            <pre className="bg-surface-alt rounded-lg p-3 text-xs text-text font-mono whitespace-pre-wrap overflow-x-auto max-h-80">
              {datasetInfo}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}
