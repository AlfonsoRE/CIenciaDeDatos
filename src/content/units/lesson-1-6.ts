import type { Lesson } from '@/types/course';

export const LESSON_1_6: Lesson = {
  id: '1.6',
  code: '1.6',
  title: 'Repositorios y fuentes de datos',
  objectives: [
    'Identificar fuentes de datos abiertas',
    'Evaluar calidad de un dataset',
    'Seleccionar la fuente adecuada para un problema',
  ],
  theory: [
    {
      id: '1.6-t1',
      type: 'text',
      title: 'Dónde encontrar datos',
      content: 'Existe una enorme cantidad de datos abiertos disponibles: Kaggle (comunidad + datasets + competencias), UCI ML Repository (datasets clásicos de investigación), datos.gob.mx (gobierno mexicano), data.gov (gobierno de EE.UU.), World Bank Open Data (economía global).',
    },
    {
      id: '1.6-t2',
      type: 'list',
      title: 'Criterios para elegir un dataset',
      items: [
        'Relevancia: ¿responde a tu pregunta de negocio?',
        'Calidad: ¿tiene pocos valores faltantes?',
        'Tamaño: ¿es suficiente para el análisis?',
        'Actualización: ¿está reciente?',
        'Licencia: ¿puedes usarlo libremente?',
      ],
    },
    {
      id: '1.6-t3',
      type: 'warning',
      title: 'Cuidado con los datos',
      content: 'No todos los datasets son confiables. Verifica la fuente, revisa si hay sesgos, comprueba si los datos fueron simulados o son reales. Datos malos producen análisis malos.',
    },
  ],
  visualExamples: [],
  activities: [
    {
      id: '1.6-a1',
      type: 'multiple-choice',
      title: 'Criterio principal',
      question: '¿Cuál es el criterio MÁS importante al elegir un dataset?',
      options: [
        { id: 'a', text: 'Que sea gratuito' },
        { id: 'b', text: 'Que tenga millones de filas' },
        { id: 'c', text: 'Que sea relevante para tu problema' },
        { id: 'd', text: 'Que sea de Kaggle' },
      ],
      correctAnswer: 'c',
      explanation: 'La relevancia es primordial: un dataset enorme pero irrelevante no sirve.',
      conceptLinked: 'Selección de datos',
    },
  ],
  guidedPractice: {
    id: '1.6-gp',
    title: 'Buscar y evaluar datasets',
    objective: 'Encontrar un dataset y evaluar su calidad con Python',
    steps: [
      {
        id: '1.6-gp-1',
        instruction: 'Simula la evaluación de un dataset.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 500

# Simular dataset de clientes (con problemas de calidad)
df = pd.DataFrame({
    'edad': np.where(np.random.random(n) > 0.05, np.random.normal(35, 12, n), np.nan),
    'ingreso': np.random.lognormal(10.5, 0.8, n),
    'compras': np.random.poisson(5, n),
    'ciudad': np.random.choice(['CDMX', 'GDL', 'MTY', np.nan], n, p=[0.4, 0.3, 0.25, 0.05]),
    'satisfaccion': np.random.choice([1, 2, 3, 4, 5, np.nan], n, p=[0.1, 0.15, 0.3, 0.25, 0.15, 0.05])
})

print("=== EVALUACIÓN DE CALIDAD ===")
print(f"Registros: {len(df)}")
print(f"Columnas: {len(df.columns)}")

# Completitud
faltantes = df.isnull().sum()
pct_faltantes = (faltantes / len(df) * 100).round(1)
print(f"\\nValores faltantes:")
for col in df.columns:
    if faltantes[col] > 0:
        print(f"  {col}: {faltantes[col]} ({pct_faltantes[col]}%)")`,
        explanation: 'La primera evaluación es verificar completitud y tipos.',
        hints: ['isnull().sum() cuenta faltantes', 'Nan son valores faltantes'],
      },
      {
        id: '1.6-gp-2',
        instruction: 'Evalúa la calidad de los datos numéricos.',
        codeTemplate: `# Evaluación de calidad numérica
print("=== CALIDAD NUMÉRICA ===")
num_cols = ['edad', 'ingreso', 'compras']

for col in num_cols:
    data = df[col].dropna()
    Q1, Q3 = data.quantile(0.25), data.quantile(0.75)
    IQR = Q3 - Q1
    outliers = ((data < Q1 - 1.5*IQR) | (data > Q3 + 1.5*IQR)).sum()
    
    print(f"\\n{col}:")
    print(f"  Rango: {data.min():.1f} - {data.max():.1f}")
    print(f"  Media: {data.mean():.1f}, Mediana: {data.median():.1f}")
    print(f"  Outliers: {outliers} ({outliers/len(data)*100:.1f}%)")

# Calidad general
completitud = (1 - df.isnull().sum().sum()/(df.shape[0]*df.shape[1]))*100
print(f"\\n=== RESUMEN ===")
print(f"Completitud: {completitud:.1f}%")
print(f"Recomendación: {'Aceptable' if completitud > 90 else 'Requiere limpieza'}")`,
        explanation: 'Outliers pueden distorsionar análisis y modelos.',
        hints: ['IQR detecta outliers automáticamente', 'Completitud > 90% es generalmente aceptable'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.6-ch',
    title: 'Evaluación de datasets',
    description: 'Evalúa la calidad de 3 datasets y elige el mejor para un análisis.',
    language: 'python',
    codeTemplate: `# Reto: Evalúa y compara 3 datasets
# Dataset A: 1000 filas, 20% faltantes, sin outliers
# Dataset B: 5000 filas, 5% faltantes, 10% outliers
# Dataset C: 500 filas, 0% faltantes, 2% outliers
# ¿Cuál elegirías y por qué?`,
    expectedApproach: 'Evaluación sistemática de completitud, outliers y tamaño.',
    evaluationCriteria: ['Criterios claros', 'Comparación justa', 'Decisión fundamentada'],
  },
  assessment: {
    id: '1.6-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.6-q1',
        type: 'multiple-choice',
        text: '¿Qué hacer si un dataset tiene 30% de valores faltantes?',
        options: [
          { id: 'a', text: 'Ignorar los faltantes' },
          { id: 'b', text: 'Eliminar el dataset' },
          { id: 'c', text: 'Evaluar si se pueden imputar o si el dataset es usable' },
          { id: 'd', text: 'Llenar todo con ceros' },
        ],
        correctAnswer: 'c',
        explanation: 'Se evalúa la cantidad y tipo de faltantes antes de decidir imputar o descartar.',
        conceptLinked: 'Calidad de datos',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Fuentes de datos', 'Evaluación de calidad', 'Selección de datasets'],
};
