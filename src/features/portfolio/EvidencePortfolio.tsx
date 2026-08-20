import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FolderOpen, Download } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/storage/db';
import { formatDate } from '@/utils/formatters';

const TYPE_LABELS: Record<string, string> = {
  activity: 'Actividad',
  practice: 'Práctica',
  challenge: 'Reto',
  assessment: 'Evaluación',
  project: 'Proyecto',
  code: 'Código',
  chart: 'Gráfica',
  reflection: 'Reflexión',
};

export function EvidencePortfolio() {
  const entries = useLiveQuery(() => db.portfolio.orderBy('createdAt').reverse().toArray()) || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Portafolio de evidencias</h1>
          <p className="text-text-secondary mt-1">{entries.length} evidencias guardadas</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
          <Download size={16} />
          Exportar
        </button>
      </div>

      {entries.length === 0 ? (
        <Card padding="lg" className="text-center py-12">
          <FolderOpen size={48} className="text-text-secondary/30 mx-auto" />
          <p className="text-text-secondary mt-4">Aún no tienes evidencias.</p>
          <p className="text-sm text-text-secondary/70 mt-1">Completa actividades para que se guarden automáticamente aquí.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry.id} variant="elevated" padding="md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info" size="sm">{TYPE_LABELS[entry.type] || entry.type}</Badge>
                    <span className="text-xs text-text-secondary">{formatDate(entry.createdAt)}</span>
                  </div>
                  <h3 className="text-sm font-medium text-text mt-1">{entry.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">{entry.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
