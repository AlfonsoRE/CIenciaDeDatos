import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Eye, Puzzle, Code, Zap, ClipboardCheck, MessageCircle, CheckCircle2, Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TheoryCard } from '@/components/learning/TheoryCard';
import { DistributionChart } from '@/components/charts/DistributionChart';
import { BoxPlot } from '@/components/charts/BoxPlot';
import { ScatterPlot } from '@/components/charts/ScatterPlot';
import { CorrelationMatrix } from '@/components/charts/CorrelationMatrix';
import { ActivityEngine } from '@/components/activities/ActivityEngine';
import { HintSystem } from '@/components/tutor/HintSystem';
import { AssessmentEngine, type AssessmentResult } from '@/features/assessment/AssessmentEngine';
import { FeedbackPanel } from '@/components/feedback/FeedbackPanel';
import { CodeLab } from '@/components/code/CodeLab';
import { computeMastery } from '@/engines/mastery/MasteryEngine';
import { useProgressStore } from '@/stores/progressStore';
import { logEvent, savePortfolioEntry } from '@/storage/db';
import { UNITS_DATA } from '@/content/units';
import { getDatasetPreview } from '@/content/datasets';
import type { LearningStage } from '@/types/learning';
import type { Lesson } from '@/types/course';

const STAGES: { key: LearningStage; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: 'theory', label: 'Teoría', icon: BookOpen },
  { key: 'visual', label: 'Visual', icon: Eye },
  { key: 'activity', label: 'Actividad', icon: Puzzle },
  { key: 'guided-practice', label: 'Práctica', icon: Code },
  { key: 'challenge', label: 'Reto', icon: Zap },
  { key: 'assessment', label: 'Evaluación', icon: ClipboardCheck },
  { key: 'feedback', label: 'Feedback', icon: MessageCircle },
];

function findLesson(lessonId: string): Lesson | undefined {
  return UNITS_DATA.flatMap((u) => u.lessons).find((l) => l.id === lessonId);
}

function findUnitForLesson(lessonId: string) {
  return UNITS_DATA.find((u) => u.lessons.some((l) => l.id === lessonId));
}

export function LessonPlayer() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { updateLessonProgress, completeStage, completeLesson } = useProgressStore();

  const lesson = findLesson(lessonId || '');
  const unit = findUnitForLesson(lessonId || '');

  const [currentStage, setCurrentStage] = useState<LearningStage>('theory');
  const [completedStages, setCompletedStages] = useState<LearningStage[]>([]);
  const [activityScores, setActivityScores] = useState<number[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [practiceSuccess, setPracticeSuccess] = useState<boolean | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState<boolean | null>(null);

  const currentIdx = STAGES.findIndex((s) => s.key === currentStage);

  useEffect(() => {
    if (lessonId) logEvent('lesson_started', { lessonId, stage: currentStage });
  }, [lessonId, currentStage]);

  const advanceStage = useCallback(() => {
    setCompletedStages((prev) => [...new Set([...prev, currentStage])]);
    completeStage(lessonId || '', currentStage);
    if (currentIdx < STAGES.length - 1) {
      setCurrentStage(STAGES[currentIdx + 1].key);
    }
  }, [currentStage, currentIdx, lessonId, completeStage]);

  const handleActivityComplete = useCallback((scores: number[]) => {
    setActivityScores(scores);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    updateLessonProgress(lessonId || '', unit?.id || '', 'activity', avg);
    savePortfolioEntry({
      type: 'activity',
      lessonId: lessonId || '',
      title: `Actividad: ${lesson?.title || lessonId}`,
      content: `Puntuación: ${Math.round(avg)}% (${scores.filter(s => s === 100).length}/${scores.length} correctas)`,
      metadata: { scores, average: avg },
      createdAt: new Date().toISOString(),
    });
    advanceStage();
  }, [lessonId, unit, lesson, updateLessonProgress, advanceStage]);

  const handleAssessmentComplete = useCallback((result: AssessmentResult) => {
    setAssessmentResult(result);
    updateLessonProgress(lessonId || '', unit?.id || '', 'assessment', result.score);
    savePortfolioEntry({
      type: 'assessment',
      lessonId: lessonId || '',
      title: `Evaluación: ${lesson?.title || lessonId}`,
      content: `Puntuación: ${result.score}% — ${result.passed ? 'Aprobado' : 'No aprobado'} (${result.correctAnswers}/${result.totalQuestions} correctas)`,
      metadata: { score: result.score, passed: result.passed, correct: result.correctAnswers, total: result.totalQuestions },
      createdAt: new Date().toISOString(),
    });
    advanceStage();
  }, [lessonId, unit, lesson, updateLessonProgress, advanceStage]);

  const handleHintUsed = useCallback(() => {
    setHintsUsed((prev) => prev + 1);
  }, []);

  const handleStageClick = useCallback((stage: LearningStage) => {
    const stageIdx = STAGES.findIndex((s) => s.key === stage);
    if (stageIdx <= currentIdx || completedStages.includes(stage)) {
      setCurrentStage(stage);
    }
  }, [currentIdx, completedStages]);

  const masteryResult = computeMastery({
    activityScore: activityScores.length > 0 ? activityScores.reduce((a, b) => a + b, 0) / activityScores.length : 0,
    practiceScore: practiceSuccess ? 100 : 0,
    challengeScore: challengeSuccess ? 100 : 0,
    assessmentScore: assessmentResult?.score || 0,
    hintsUsed,
    attempts: 1,
  });

  const handleCompleteLesson = useCallback(() => {
    completeLesson(lessonId || '', masteryResult.score);
    navigate('/curso');
  }, [lessonId, completeLesson, masteryResult.score, navigate]);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
        <p className="text-text-secondary">Lección no encontrada.</p>
        <Button onClick={() => navigate('/curso')}>Volver al curso</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-text-secondary font-mono">{lesson.code}</span>
        </div>
        <h1 className="text-xl font-bold text-text">{lesson.title}</h1>
        <ul className="mt-2 space-y-1">
          {lesson.objectives.map((obj, i) => (
            <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <CheckCircle2 size={14} className="text-success mt-0.5 shrink-0" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      <nav className="flex gap-1 overflow-x-auto pb-2" aria-label="Etapas de la lección">
        {STAGES.map((stage, idx) => {
          const isCompleted = completedStages.includes(stage.key);
          const isCurrent = stage.key === currentStage;
          const isLocked = idx > currentIdx && !isCompleted;
          const Icon = stage.icon;
          return (
            <button
              key={stage.key}
              onClick={() => handleStageClick(stage.key)}
              disabled={isLocked}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isCurrent ? 'bg-primary text-white shadow-sm' : isCompleted ? 'bg-success/10 text-success' : isLocked ? 'bg-surface-alt/50 text-text-secondary/40 cursor-not-allowed' : 'bg-surface-alt text-text-secondary hover:bg-border/50'
              }`}
            >
              {isLocked ? <Lock size={12} /> : isCompleted ? <CheckCircle2 size={12} /> : <Icon size={12} />}
              <span className="hidden sm:inline">{stage.label}</span>
            </button>
          );
        })}
      </nav>

      {currentStage === 'theory' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><BookOpen size={20} className="text-primary" /> Teoría</h2>
          {lesson.theory.map((block) => <TheoryCard key={block.id} block={block} />)}
          <div className="flex justify-end pt-2">
            <Button onClick={advanceStage}>Siguiente: Visual <ArrowRight size={14} /></Button>
          </div>
        </div>
      )}

      {currentStage === 'visual' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><Eye size={20} className="text-primary" /> Ejemplo visual</h2>
          {lesson.visualExamples.length > 0 ? (
            <Card padding="lg">
              <p className="text-sm text-text-secondary mb-4">{lesson.visualExamples[0].description}</p>
              {lesson.visualExamples[0].chartType === 'distribution' && <DistributionChart interactive />}
              {lesson.visualExamples[0].chartType === 'histogram' && <DistributionChart interactive />}
              {lesson.visualExamples[0].chartType === 'binomial' && <DistributionChart interactive />}
              {lesson.visualExamples[0].chartType === 'boxplot' && (
                <BoxPlot data={[12, 15, 18, 22, 25, 28, 30, 32, 35, 40, 45, 50, 55, 60, 100]} label="Ejemplo de distribución" interactive />
              )}
              {lesson.visualExamples[0].chartType === 'scatter' && (
                <ScatterPlot
                  data={Array.from({ length: 50 }, (_, i) => ({ x: Math.random() * 100, y: Math.random() * 100 + i * 0.5 }))}
                  xLabel="Variable X" yLabel="Variable Y" title="Relación entre variables" showTrendline
                />
              )}
              {lesson.visualExamples[0].chartType === 'correlation' && (
                <CorrelationMatrix
                  variables={['Var A', 'Var B', 'Var C', 'Var D']}
                  data={Array.from({ length: 100 }, () => [Math.random() * 10, Math.random() * 10, Math.random() * 5, Math.random() * 8])}
                  title="Matriz de correlaciones"
                />
              )}
              {lesson.visualExamples[0].chartType === 'heatmap' && (
                <CorrelationMatrix
                  variables={['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D']}
                  data={Array.from({ length: 100 }, () => [Math.random() * 10, Math.random() * 10, Math.random() * 5, Math.random() * 8])}
                  title="Mapa de calor"
                />
              )}
              {lesson.visualExamples[0].chartType === 'line' && (
                <ScatterPlot
                  data={Array.from({ length: 30 }, (_, i) => ({ x: i, y: Math.sin(i * 0.3) * 10 + 50 + Math.random() * 5 }))}
                  xLabel="Tiempo" yLabel="Valor" title="Tendencia temporal"
                />
              )}
              {lesson.visualExamples[0].chartType === 'bar' && (
                <ScatterPlot
                  data={[{ x: 1, y: 85 }, { x: 2, y: 72 }, { x: 3, y: 91 }, { x: 4, y: 68 }, { x: 5, y: 78 }]}
                  xLabel="Categoría" yLabel="Frecuencia" title="Comparación por categoría"
                />
              )}
              {(lesson.visualExamples[0].chartType === 'tree' || lesson.visualExamples[0].chartType === 'mixed' || lesson.visualExamples[0].chartType === 'comparison' || !lesson.visualExamples[0].chartType) && (
                <div className="bg-surface-alt rounded-xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-text">
                    {lesson.visualExamples[0].type === 'diagram' && <BookOpen size={16} className="text-primary" />}
                    {lesson.visualExamples[0].type === 'comparison' && <Zap size={16} className="text-warning" />}
                    {lesson.visualExamples[0].type === 'chart' && <Eye size={16} className="text-primary" />}
                    {lesson.visualExamples[0].title}
                  </div>
                  {lesson.visualExamples[0].items && lesson.visualExamples[0].items!.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary">
                      {lesson.visualExamples[0].items!.map((item, idx) => (
                        <div key={idx} className={`bg-surface rounded-lg p-3 border border-border ${item.color ? `border-l-2 border-l-${item.color}` : ''}`}>
                          <p className="font-medium text-text mb-1">{item.label}</p>
                          <p>{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary">
                      <div className="bg-surface rounded-lg p-3 border border-border">
                        <p className="font-medium text-text mb-1">Fase 1</p>
                        <p>Recolección y exploración inicial de los datos.</p>
                      </div>
                      <div className="bg-surface rounded-lg p-3 border border-border">
                        <p className="font-medium text-text mb-1">Fase 2</p>
                        <p>Transformación y preparación para análisis.</p>
                      </div>
                      <div className="bg-surface rounded-lg p-3 border border-border">
                        <p className="font-medium text-text mb-1">Fase 3</p>
                        <p>Modelado y evaluación de resultados.</p>
                      </div>
                      <div className="bg-surface rounded-lg p-3 border border-border">
                        <p className="font-medium text-text mb-1">Fase 4</p>
                        <p>Implementación y monitoreo continuo.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <Card padding="lg" className="text-center text-text-secondary text-sm py-12">No hay visualización para esta lección.</Card>
          )}
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setCurrentStage('theory')}><ArrowLeft size={14} /> Teoría</Button>
            <Button onClick={advanceStage}>Siguiente: Actividad <ArrowRight size={14} /></Button>
          </div>
        </div>
      )}

      {currentStage === 'activity' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><Puzzle size={20} className="text-primary" /> Actividad interactiva</h2>
          {lesson.activities.length > 0 ? (
            <ActivityEngine activities={lesson.activities} onComplete={handleActivityComplete} />
          ) : (
            <Card padding="lg" className="text-center text-text-secondary text-sm py-12">Actividad pendiente de desarrollo.</Card>
          )}
          <HintSystem hints={['Revisa la teoría si tienes dudas', 'Piensa en los conceptos fundamentales', 'Aplica la fórmula paso a paso']} onHintUsed={handleHintUsed} />
        </div>
      )}

      {currentStage === 'guided-practice' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><Code size={20} className="text-primary" /> Práctica guiada</h2>
          {lesson.guidedPractice.steps.length > 0 ? (
            <CodeLab
              title={lesson.guidedPractice.title}
              objective={lesson.guidedPractice.objective}
              initialCode={lesson.guidedPractice.steps.map((s) => s.codeTemplate).join('\n\n')}
              language={lesson.guidedPractice.language === 'r' ? 'r' : 'python'}
              hints={lesson.guidedPractice.steps.flatMap((s) => s.hints)}
              datasetInfo={lesson.guidedPractice.dataset ? getDatasetPreview(lesson.guidedPractice.dataset.replace('.csv', '').trim()) : undefined}
              totalSteps={lesson.guidedPractice.steps.length}
              onStepComplete={(ok) => {
                setPracticeSuccess(ok);
                updateLessonProgress(lessonId || '', unit?.id || '', 'guided-practice', ok ? 100 : 0);
              }}
              onHintUsed={handleHintUsed}
            />
          ) : (
            <Card padding="lg" className="text-center text-text-secondary text-sm py-12">Práctica pendiente de desarrollo.</Card>
          )}
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setCurrentStage('activity')}><ArrowLeft size={14} /> Actividad</Button>
            <Button onClick={advanceStage}>Siguiente: Reto <ArrowRight size={14} /></Button>
          </div>
        </div>
      )}

      {currentStage === 'challenge' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><Zap size={20} className="text-primary" /> Reto individual</h2>
          <Card padding="md" className="space-y-3">
            <div>
              <p className="text-sm font-medium text-text mb-1">Objetivo</p>
              <p className="text-sm text-text-secondary">{lesson.challenge.description}</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <p className="text-xs font-medium text-primary mb-1">Enfoque sugerido</p>
              <p className="text-xs text-text-secondary">{lesson.challenge.expectedApproach}</p>
            </div>
          </Card>
          <CodeLab
            title={lesson.challenge.title}
            objective={lesson.challenge.description}
            initialCode={lesson.challenge.codeTemplate}
            language={lesson.challenge.language === 'r' ? 'r' : 'python'}
            hints={lesson.challenge.hints || ['Revisa la teoría de la lección', 'Desglosa el problema en pasos pequeños', 'Prueba tu código con datos de ejemplo']}
            onStepComplete={(ok) => {
              setChallengeSuccess(ok);
              updateLessonProgress(lessonId || '', unit?.id || '', 'challenge', ok ? 100 : 0);
            }}
            onHintUsed={handleHintUsed}
          />
          <Card padding="md" className="border-l-4 border-l-primary">
            <p className="text-xs font-medium text-text mb-1">Criterios de evaluación:</p>
            <ul className="text-xs text-text-secondary space-y-0.5">
              {lesson.challenge.evaluationCriteria.map((c, i) => <li key={i}>• {c}</li>)}
            </ul>
          </Card>
          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setCurrentStage('guided-practice')}><ArrowLeft size={14} /> Práctica</Button>
            <Button onClick={advanceStage}>Siguiente: Evaluación <ArrowRight size={14} /></Button>
          </div>
        </div>
      )}

      {currentStage === 'assessment' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><ClipboardCheck size={20} className="text-primary" /> Evaluación</h2>
          {lesson.assessment.questions.length > 0 ? (
            <AssessmentEngine questions={lesson.assessment.questions} passingScore={lesson.assessment.passingScore} onComplete={handleAssessmentComplete} />
          ) : (
            <Card padding="lg" className="text-center text-text-secondary text-sm py-12">Evaluación pendiente de desarrollo.</Card>
          )}
        </div>
      )}

      {currentStage === 'feedback' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text flex items-center gap-2"><MessageCircle size={20} className="text-primary" /> Feedback</h2>
          <FeedbackPanel
            mastery={masteryResult.score}
            masteryStatus={masteryResult.status}
            weakConcepts={masteryResult.weakConcepts}
            recommendations={masteryResult.recommendations}
            lessonTitle={lesson.title}
            competencies={lesson.competencies}
            onContinue={handleCompleteLesson}
            onRetry={() => {
              setCurrentStage('theory');
              setCompletedStages([]);
              setActivityScores([]);
              setAssessmentResult(null);
              setPracticeSuccess(null);
              setChallengeSuccess(null);
              setHintsUsed(0);
            }}
          />
        </div>
      )}
    </div>
  );
}
