import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Question } from '@/types/course';

interface AssessmentEngineProps {
  questions: Question[];
  passingScore: number;
  onComplete: (result: AssessmentResult) => void;
}

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  answers: Record<string, string | number>;
  passed: boolean;
}

function isAnswerCorrect(question: Question, answer: string | number | undefined): boolean {
  if (answer === undefined) return false;
  if (question.type === 'numeric') {
    const numAnswer = typeof answer === 'number' ? answer : parseFloat(answer);
    const numCorrect = typeof question.correctAnswer === 'number' ? question.correctAnswer : parseFloat(String(question.correctAnswer));
    if (Number.isNaN(numAnswer) || Number.isNaN(numCorrect)) return false;
    return Math.abs(numAnswer - numCorrect) < 0.01;
  }
  return answer === question.correctAnswer;
}

export function AssessmentEngine({ questions, passingScore, onComplete }: AssessmentEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  const shuffledOptions = useMemo(() => {
    if (!question?.options) return [];
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [question?.id]);

  const handleAnswer = useCallback((value: string | number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }, [question?.id, submitted]);

  const handleSubmit = useCallback(() => {
    if (isLast) {
      let correct = 0;
      questions.forEach((q) => {
        if (isAnswerCorrect(q, answers[q.id])) correct++;
      });
      const score = Math.round((correct / questions.length) * 100);
      setShowResults(true);
      setSubmitted(true);
      onComplete({
        score,
        totalQuestions: questions.length,
        correctAnswers: correct,
        answers,
        passed: score >= passingScore,
      });
    } else {
      setSubmitted(true);
    }
  }, [isLast, questions, answers, passingScore, onComplete]);

  const handleNext = useCallback(() => {
    setSubmitted(false);
    setCurrentIdx((prev) => prev + 1);
  }, []);

  if (showResults) {
    let correct = 0;
    questions.forEach((q) => {
      if (isAnswerCorrect(q, answers[q.id])) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= passingScore;

    return (
      <Card padding="lg" className="space-y-4">
        <div className="text-center space-y-2">
          <div className={cn('text-5xl font-bold', passed ? 'text-success' : 'text-danger')}>
            {score}%
          </div>
          <Badge variant={passed ? 'success' : 'danger'} size="md">
            {passed ? 'Aprobado' : 'No aprobado'}
          </Badge>
          <p className="text-sm text-text-secondary">
            {correct} de {questions.length} respuestas correctas
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const isCorrect = isAnswerCorrect(q, answers[q.id]);
            return (
              <div key={q.id} className={cn('p-3 rounded-lg border text-sm', isCorrect ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5')}>
                <div className="flex items-start gap-2">
                  {isCorrect ? <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" /> : <XCircle size={16} className="text-danger shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-medium text-text">Pregunta {idx + 1}</p>
                    <p className="text-text-secondary mt-0.5">{q.text}</p>
                    {!isCorrect && (
                      <p className="text-xs text-text-secondary mt-1">
                        <span className="font-medium">Tu respuesta:</span> {String(answers[q.id])}
                        <br />
                        <span className="font-medium">Correcta:</span> {String(q.correctAnswer)}
                      </p>
                    )}
                    <p className="text-xs text-text-secondary mt-1 italic">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  if (!question) {
    return (
      <Card padding="lg" className="text-center">
        <p className="text-text-secondary">No hay preguntas disponibles.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="info">
          Pregunta {currentIdx + 1} de {questions.length}
        </Badge>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={12} />
          <Badge variant={question.difficulty === 'easy' ? 'success' : question.difficulty === 'medium' ? 'warning' : 'danger'} size="sm">
            {question.difficulty === 'easy' ? 'Fácil' : question.difficulty === 'medium' ? 'Media' : 'Difícil'}
          </Badge>
        </div>
      </div>

      <Card padding="lg" className="space-y-4">
        <p className="text-sm font-medium text-text">{question.text}</p>

        {question.options && (
          <div className="space-y-2">
            {shuffledOptions.map((opt) => {
              const isSelected = answers[question.id] === opt.id;
              const showCorrect = submitted && opt.id === question.correctAnswer;
              const showWrong = submitted && isSelected && opt.id !== question.correctAnswer;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  disabled={submitted}
                  aria-pressed={isSelected}
                  className={cn(
                    'w-full text-left p-3 rounded-xl border text-sm transition-all',
                    !submitted && isSelected && 'border-primary bg-primary/5 text-primary',
                    !submitted && !isSelected && 'border-border hover:border-primary/50 text-text',
                    showCorrect && 'border-success bg-success/5 text-success',
                    showWrong && 'border-danger bg-danger/5 text-danger',
                    submitted && !showCorrect && !showWrong && 'border-border text-text-secondary opacity-50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {showCorrect && <CheckCircle2 size={14} />}
                    {showWrong && <XCircle size={14} />}
                    {opt.text}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {question.type === 'numeric' && (
          <input
            type="number"
            step="any"
            value={answers[question.id] !== undefined ? String(answers[question.id]) : ''}
            onChange={(e) => {
              if (e.target.value === '') {
                setAnswers((prev) => {
                  const next = { ...prev };
                  delete next[question.id];
                  return next;
                });
                return;
              }
              handleAnswer(e.target.value);
            }}
            disabled={submitted}
            aria-label="Tu respuesta numérica"
            className="w-full h-10 px-3 rounded-[var(--radius-input)] border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Tu respuesta numérica"
          />
        )}
      </Card>

      {submitted && !isLast && (
        <Card padding="md" className={cn('border-l-4', isAnswerCorrect(question, answers[question.id]) ? 'border-l-success' : 'border-l-danger')}>
          <p className="text-sm font-medium text-text mb-1">
            {isAnswerCorrect(question, answers[question.id]) ? '¡Correcto!' : 'Incorrecto'}
          </p>
          <p className="text-sm text-text-secondary">{question.explanation}</p>
        </Card>
      )}

      <div className="flex justify-end">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={answers[question.id] === undefined}>
            {isLast ? 'Finalizar evaluación' : 'Responder'}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {isLast ? 'Ver resultados' : 'Siguiente pregunta'}
          </Button>
        )}
      </div>
    </div>
  );
}
