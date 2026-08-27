import type { Lesson } from '@/types/course';

export const LESSON_5_1: Lesson = {
  id: '5.1',
  code: '5.1',
  title: 'Sesgo y equidad en modelos',
  objectives: [
    'Identificar tipos de sesgo en datos y modelos',
    'Explicar métricas de equidad',
    'Aplicar técnicas de mitigación de sesgo',
    'Evaluar impacto ético de un modelo',
  ],
  theory: [
    {
      id: '5.1-t1',
      type: 'text',
      title: '¿Qué es el sesgo algorítmico?',
      content: 'El sesgo algorítmico ocurre cuando un sistema de ML produce resultados sistemáticamente injustos para ciertos grupos. Puede originarse en datos de entrenamiento, diseño del modelo o formas de uso.',
    },
    {
      id: '5.1-t2',
      type: 'list',
      title: 'Tipos de sesgo',
      items: [
        'Sesgo de muestreo: subrepresentación de grupos',
        'Sesgo de medición: errores diferentes por grupo',
        'Sesgo de representación: estereotipos en los datos',
        'Sesgo de evaluación: métricas que ignoran desigualdades',
      ],
    },
    {
      id: '5.1-t3',
      type: 'text',
      title: 'Métricas de equidad',
      content: 'Paridad demográfica: misma tasa de selección por grupo. Igualdad de oportunidades: misma tasa de verdaderos positivos. Equidad calibrada: mismo significado del score por grupo.',
    },
    {
      id: '5.1-t4',
      type: 'warning',
      title: 'Imposibilidad de la equidad perfecta',
      content: 'Es imposible satisfacer todas las definiciones de equidad simultáneamente. Se debe elegir la métrica más relevante según el contexto y el daño potencial.',
    },
  ],
  visualExamples: [
    {
      id: '5.1-v1',
      type: 'chart',
      title: 'Comparacion de metricas por grupo',
      description: 'Visualiza como diferentes metricas varian entre grupos demograficos.',
      chartType: 'bar',
      interactive: false,
      items: [
        { label: 'Sesgo de selección', detail: 'Los datos no representan la población real.', color: 'danger' },
        { label: 'Sesgo de medición', detail: 'Las variables miden algo diferente para cada grupo.', color: 'warning' },
        { label: 'Fairness metrics', detail: 'Equalized odds, demographic parity, calibration.', color: 'primary' },
        { label: 'Mitigación', detail: 'Re-muestreo, re-etiquetado, adversarial debiasing.', color: 'success' },
      ],
    },
  ],
  activities: [
    {
      id: '5.1-a1',
      type: 'multiple-choice',
      title: 'Tipos de sesgo',
      question: 'Un dataset de crédito tiene 90% hombres y 10% mujeres. ¿Qué tipo de sesgo es?',
      options: [
        { id: 'a', text: 'Sesgo de medición' },
        { id: 'b', text: 'Sesgo de muestreo' },
        { id: 'c', text: 'Sesgo de evaluación' },
        { id: 'd', text: 'Sesgo de clasificación' },
      ],
      correctAnswer: 'b',
      explanation: 'La subrepresentación de mujeres es un sesgo de muestreo (underrepresentation).',
      conceptLinked: 'Sesgo de muestreo',
    },
  ],
  guidedPractice: {
    id: '5.1-gp',
    title: 'Detectar sesgo en un modelo',
    objective: 'Calcular métricas de equidad para un clasificador de crédito',
    steps: [
      {
        id: '5.1-gp-1',
        instruction: 'Genera un dataset con sesgo simulado.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 1000

# Simular datos de crédito con sesgo
genero = np.random.choice(['M', 'F'], n, p=[0.7, 0.3])
ingreso = np.where(genero == 'M', 
                   np.random.normal(50000, 15000, n),
                   np.random.normal(40000, 12000, n))
aprobado = np.where((ingreso > 45000) & (genero == 'M'), 1,
            np.where((ingreso > 42000) & (genero == 'F'), 1, 0))

df = pd.DataFrame({'genero': genero, 'ingreso': ingreso, 'aprobado': aprobado})

print("Distribución por género:")
print(df.groupby('genero')['aprobado'].mean())
print(f"\\nTasa general de aprobación: {df['aprobado'].mean():.3f}")`,
        explanation: 'Simulamos un dataset donde las mujeres necesitan menor ingreso para ser aprobadas, pero la tasa de aprobación es diferente.',
        hints: ['np.where crea condiciones', 'groupby.mean calcula tasas por grupo'],
      },
      {
        id: '5.1-gp-2',
        instruction: 'Entrena un modelo y calcula métricas de equidad.',
        codeTemplate: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X = df[['ingreso']]
y = df['aprobado']

X_train, X_test, y_train, y_test, gen_train, gen_test = train_test_split(
    X, y, genero, test_size=0.2, random_state=42
)

model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

result = pd.DataFrame({'genero': gen_test, 'real': y_test, 'pred': y_pred})

# Paridad demográfica
tasa_m = result[result['genero'] == 'M']['pred'].mean()
tasa_f = result[result['genero'] == 'F']['pred'].mean()
print(f"Tasa de selección M: {tasa_m:.3f}")
print(f"Tasa de selección F: {tasa_f:.3f}")
print(f"Diferencia (paridad): {abs(tasa_m - tasa_f):.3f}")

# Igualdad de oportunidades (TPR)
tpr_m = result[(result['genero'] == 'M') & (result['real'] == 1)]['pred'].mean()
tpr_f = result[(result['genero'] == 'F') & (result['real'] == 1)]['pred'].mean()
print(f"\\nTPR M: {tpr_m:.3f}")
print(f"TPR F: {tpr_f:.3f}")
print(f"Diferencia (igualdad de oportunidades): {abs(tpr_m - tpr_f):.3f}")`,
        explanation: 'Calculamos métricas de equidad para detectar discriminación.',
        hints: ['TPR = True Positive Rate = sensitivity', 'Paridad ideal: diferencia = 0'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '5.1-ch',
    title: 'Auditoría de equidad',
    description: 'Realiza una auditoría completa de equidad para un modelo de clasificación.',
    language: 'python',
    codeTemplate: `# Código para generar y auditar un modelo con sesgo
# Tu tarea: identificar el sesgo y proponer soluciones`,
    expectedApproach: 'Métricas de equidad + análisis por grupo + propuestas de mitigación.',
    evaluationCriteria: ['Detección de sesgo', 'Métricas correctas', 'Propuestas viables'],
  },
  assessment: {
    id: '5.1-assess',
    passingScore: 70,
    questions: [
      {
        id: '5.1-q1',
        type: 'multiple-choice',
        text: '¿Qué es la paridad demográfica?',
        options: [
          { id: 'a', text: 'Mismo accuracy por grupo' },
          { id: 'b', text: 'Misma tasa de selección por grupo' },
          { id: 'c', text: 'Mismo número de datos por grupo' },
          { id: 'd', text: 'Mismo error por grupo' },
        ],
        correctAnswer: 'b',
        explanation: 'Paridad demográfica = misma proporción de positivos predichos en cada grupo.',
        conceptLinked: 'Equidad algorítmica',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Ética en IA', 'Sesgo algorítmico', 'Equidad', 'Auditoría de modelos'],
};
