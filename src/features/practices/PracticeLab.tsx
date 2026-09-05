import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FlaskConical, Code, BarChart3, Database, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PRACTICES = [
  { id: 'p1', number: 1, title: 'Introducción a Python y R para CD', unit: 1, icon: Code, language: 'both' as const },
  { id: 'p2', number: 2, title: 'Uso de notebooks para análisis', unit: 1, icon: Code, language: 'python' as const },
  { id: 'p3', number: 3, title: 'Repositorios de datos abiertos', unit: 1, icon: Database, language: 'python' as const },
  { id: 'p4', number: 4, title: 'Comparación Python vs R', unit: 1, icon: Code, language: 'both' as const },
  { id: 'p5', number: 5, title: 'Estadística descriptiva', unit: 2, icon: BarChart3, language: 'python' as const },
  { id: 'p6', number: 6, title: 'Pruebas de hipótesis', unit: 2, icon: TrendingUp, language: 'python' as const },
  { id: 'p7', number: 7, title: 'Simulación de distribuciones', unit: 2, icon: BarChart3, language: 'python' as const },
  { id: 'p8', number: 8, title: 'Comparación con software estadístico', unit: 2, icon: Code, language: 'python' as const },
  { id: 'p9', number: 9, title: 'Limpieza y preparación', unit: 3, icon: Database, language: 'python' as const },
  { id: 'p10', number: 10, title: 'Correlación y selección', unit: 3, icon: TrendingUp, language: 'python' as const },
  { id: 'p11', number: 11, title: 'Dashboard interactivo', unit: 3, icon: BarChart3, language: 'python' as const },
  { id: 'p12', number: 12, title: 'Reportes automatizados', unit: 3, icon: Code, language: 'python' as const },
  { id: 'p13', number: 13, title: 'Integración de múltiples fuentes', unit: 3, icon: Database, language: 'python' as const },
  { id: 'p14', number: 14, title: 'Regresión lineal y logística', unit: 4, icon: TrendingUp, language: 'python' as const },
  { id: 'p15', number: 15, title: 'Clasificación: Árboles, RF, SVM', unit: 4, icon: Brain, language: 'python' as const },
  { id: 'p16', number: 16, title: 'Red neuronal para imágenes', unit: 4, icon: Brain, language: 'python' as const },
  { id: 'p17', number: 17, title: 'Series temporales', unit: 4, icon: TrendingUp, language: 'python' as const },
  { id: 'p18', number: 18, title: 'Pipeline completo de ML', unit: 4, icon: Code, language: 'python' as const },
  { id: 'p19', number: 19, title: 'Bagging y Boosting', unit: 4, icon: Brain, language: 'python' as const },
  { id: 'p20', number: 20, title: 'Proyecto sectorial', unit: 5, icon: FlaskConical, language: 'python' as const },
  { id: 'p21', number: 21, title: 'Caso de uso generativo', unit: 5, icon: Brain, language: 'python' as const },
  { id: 'p22', number: 22, title: 'Evaluación de sesgos', unit: 5, icon: BarChart3, language: 'python' as const },
  { id: 'p23', number: 23, title: 'Anonimización y privacidad', unit: 5, icon: Database, language: 'python' as const },
];

export function PracticeLab() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Laboratorio de prácticas</h1>
        <p className="text-text-secondary mt-1">23 prácticas oficiales del curso</p>
      </div>

      {[1, 2, 3, 4, 5].map((unitNum) => (
        <div key={unitNum}>
          <h2 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wider">
            Unidad {unitNum}
          </h2>
          <div className="space-y-2">
            {PRACTICES.filter((p) => p.unit === unitNum).map((practice) => (
              <Card key={practice.id} variant="elevated" padding="md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <practice.icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary font-mono">P{practice.number}</span>
                        <h3 className="text-sm font-medium text-text truncate">{practice.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-end shrink-0">
                    <Badge
                      variant={practice.language === 'both' ? 'info' : practice.language === 'python' ? 'success' : 'warning'}
                      title={practice.language === 'both' ? 'Se ejecuta Python; R se compara solo en teoría' : undefined}
                    >
                      {practice.language === 'both' ? 'Python + R (teoría)' : practice.language === 'python' ? 'Python' : 'R'}
                    </Badge>
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/laboratorio/${practice.id}`)}>
                      Iniciar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
