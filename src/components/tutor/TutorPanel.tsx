import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MessageCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TutorPanelProps {
  lessonId: string;
  currentStage: string;
  errorHistory: string[];
  score: number;
  attempts: number;
}

interface TutorMessage {
  id: string;
  text: string;
  type: 'hint' | 'explanation' | 'encouragement' | 'redirect';
}

function generateTutorMessages(
  errorHistory: string[],
  score: number,
  attempts: number
): TutorMessage[] {
  const messages: TutorMessage[] = [];

  if (attempts === 0 && score === 0) {
    messages.push({
      id: 'welcome',
      text: '¡Hola! Soy tu tutor. Estoy aquí para ayudarte mientras aprendes. Si tienes dudas, hazme clic.',
      type: 'encouragement',
    });
  }

  if (attempts > 0 && score < 50) {
    messages.push({
      id: 'low-score',
      text: 'Parece que este tema está siendo un poco difícil. ¿Qué intentaste hacer? Puedo ayudarte a entender el concepto desde otro ángulo.',
      type: 'redirect',
    });
  }

  if (attempts > 2 && score < 70) {
    messages.push({
      id: 'retry-hint',
      text: 'Has intentado varias veces. A veces es útil volver a la teoría antes de intentar de nuevo. ¿Quieres que repasemos el concepto?',
      type: 'redirect',
    });
  }

  if (errorHistory.includes('varianza') || errorHistory.includes('desviacion')) {
    messages.push({
      id: 'variance-help',
      text: 'Parece que confundiste varianza con desviación estándar. La desviación estándar está en las mismas unidades que los datos, mientras que la varianza está al cuadrado. ¿Recuerdas que σ = √(σ²)?',
      type: 'explanation',
    });
  }

  if (errorHistory.includes('probabilidad') || errorHistory.includes('P(X)')) {
    messages.push({
      id: 'probability-help',
      text: 'Para calcular P(X > a), recuerda que P(X > a) = 1 - P(X ≤ a). Usa la función de distribución acumulada (CDF).',
      type: 'explanation',
    });
  }

  if (score >= 80) {
    messages.push({
      id: 'good-progress',
      text: '¡Buen progreso! Tu comprensión es sólida. ¿Quieres intentar el siguiente nivel de dificultad?',
      type: 'encouragement',
    });
  }

  if (messages.length === 0) {
    messages.push({
      id: 'default',
      text: '¿Tienes alguna duda sobre el contenido? Puedo explicar conceptos, darte pistas o ayudarte a interpretar resultados.',
      type: 'hint',
    });
  }

  return messages;
}

export function TutorPanel({ lessonId: _lessonId, currentStage: _currentStage, errorHistory, score, attempts }: TutorPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const messages = generateTutorMessages(errorHistory, score, attempts).filter(
    (m) => !dismissed.has(m.id)
  );

  const handleDismiss = useCallback((id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  }, []);

  const typeStyles = {
    hint: 'border-l-primary bg-primary/5',
    explanation: 'border-l-secondary bg-secondary/5',
    encouragement: 'border-l-success bg-success/5',
    redirect: 'border-l-warning bg-warning/5',
  };

  return (
    <Card padding="md" className="border border-border/50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <MessageCircle size={16} className="text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-text">Tutor</span>
          {messages.length > 0 && (
            <span className="ml-2 text-xs text-primary">({messages.length} mensaje{messages.length > 1 ? 's' : ''})</span>
          )}
        </div>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn('border-l-4 p-3 rounded-r-lg', typeStyles[msg.type])}
            >
              <p className="text-sm text-text-secondary leading-relaxed">{msg.text}</p>
              <button
                onClick={() => handleDismiss(msg.id)}
                className="text-xs text-text-secondary/50 hover:text-text-secondary mt-1"
              >
                Descartar
              </button>
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const q: TutorMessage = {
                  id: `q-${Date.now()}`,
                  text: '¿Sobre qué concepto tienes duda?',
                  type: 'hint',
                };
                handleDismiss(q.id);
              }}
            >
              <HelpCircle size={12} /> Preguntar
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
