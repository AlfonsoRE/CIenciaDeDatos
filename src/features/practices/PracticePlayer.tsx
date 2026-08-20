import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Code, FlaskConical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CodeLab } from '@/components/code/CodeLab';
import { getPractice } from '@/content/practices';
import { getDatasetPreview } from '@/content/datasets';
import { useProgressStore } from '@/stores/progressStore';

export function PracticePlayer() {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const { completePractice } = useProgressStore();

  const practice = getPractice(practiceId || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = useCallback((stepIndex: number, success: boolean) => {
    if (success) {
      setCompletedSteps((prev) => [...new Set([...prev, stepIndex])]);
    }
  }, []);

  const handleNextStep = useCallback(() => {
    if (practice && currentStep < practice.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, practice]);

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleFinish = useCallback(() => {
    if (practiceId) {
      completePractice(practiceId);
      navigate('/laboratorio');
    }
  }, [practiceId, completePractice, navigate]);

  if (!practice) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
        <FlaskConical size={48} className="mx-auto text-text-secondary" />
        <p className="text-text-secondary">Práctica no encontrada.</p>
        <Button onClick={() => navigate('/laboratorio')}>Volver al laboratorio</Button>
      </div>
    );
  }

  const step = practice.steps[currentStep];
  const allCompleted = completedSteps.length === practice.steps.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info" size="sm">Práctica</Badge>
          <span className="text-xs text-text-secondary font-mono">
            Paso {currentStep + 1} de {practice.steps.length}
          </span>
        </div>
        <h1 className="text-xl font-bold text-text">{practice.title}</h1>
        <p className="text-sm text-text-secondary mt-1">{practice.objective}</p>
      </div>

      <nav className="flex gap-1 overflow-x-auto pb-2" aria-label="Pasos de la práctica">
        {practice.steps.map((s, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isCurrent = idx === currentStep;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isCurrent ? 'bg-primary text-white shadow-sm' : isCompleted ? 'bg-success/10 text-success' : 'bg-surface-alt text-text-secondary hover:bg-border/50'
              }`}
            >
              {isCompleted ? <CheckCircle2 size={12} /> : <Code size={12} />}
              <span className="hidden sm:inline">Paso {idx + 1}</span>
            </button>
          );
        })}
      </nav>

      <Card padding="md" className="border-l-4 border-l-primary">
        <p className="text-sm text-text">
          <span className="font-medium">Instrucción:</span> {step.instruction}
        </p>
      </Card>

      <CodeLab
        title={`${practice.title} - Paso ${currentStep + 1}`}
        objective={step.instruction}
        initialCode={step.codeTemplate}
        language={practice.language === 'both' ? 'python' : practice.language}
        hints={step.hints}
        expectedOutput={step.expectedOutput}
        datasetInfo={practice.dataset ? getDatasetPreview(practice.dataset) : undefined}
        stepNumber={currentStep + 1}
        totalSteps={practice.steps.length}
        onStepComplete={(success) => handleStepComplete(currentStep, success)}
      />

      {step.explanation && (
        <Card padding="md" className="border-l-4 border-l-success">
          <p className="text-xs font-medium text-success mb-1">Explicación:</p>
          <p className="text-sm text-text-secondary">{step.explanation}</p>
        </Card>
      )}

      <div className="flex justify-between pt-2">
        <Button
          variant="ghost"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft size={14} /> Anterior
        </Button>

        {currentStep === practice.steps.length - 1 ? (
          <Button onClick={handleFinish}>
            {allCompleted ? 'Completar práctica' : 'Finalizar'}
          </Button>
        ) : (
          <Button onClick={handleNextStep}>
            Siguiente: Paso {currentStep + 2} <ArrowRight size={14} />
          </Button>
        )}
      </div>

      {allCompleted && (
        <Card padding="md" className="border border-success/30 bg-success/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-text">¡Práctica completada!</p>
              <p className="text-xs text-text-secondary">Todos los pasos han sido ejecutados correctamente.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
