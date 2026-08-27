import type { Lesson } from '@/types/course';

export const LESSON_3_2: Lesson = {
  id: '3.2',
  code: '3.2',
  title: 'Transformación de datos',
  objectives: [
    'Aplicar normalización y estandarización',
    'Codificar variables categóricas',
    'Crear variables derivadas',
    'Identificar distribuciones sesgadas y transformarlas',
  ],
  theory: [
    {
      id: '3.2-t1',
      type: 'text',
      title: '¿Por qué transformar?',
      content: 'Los algoritmos de ML asumen ciertas propiedades de los datos (normalidad, escala comparable). Transformar los datos mejora el rendimiento de los modelos.',
    },
    {
      id: '3.2-t2',
      type: 'formula',
      title: 'Min-Max Scaling',
      content: 'Escalado al rango [0, 1] preservando la forma de la distribución.',
      formula: 'x\' = (x - min) / (max - min)',
    },
    {
      id: '3.2-t3',
      type: 'formula',
      title: 'Estandarización (Z-score)',
      content: 'Transforma a media 0 y desviación estándar 1. Adecuada para datos con outliers.',
      formula: 'z = (x - μ) / σ',
    },
    {
      id: '3.2-t4',
      type: 'text',
      title: 'Codificación de categorías',
      content: 'One-hot encoding crea columnas binarias para cada categoría. Label encoding asigna un número entero a cada categoría. Ordinal encoding preserva el orden.',
    },
    {
      id: '3.2-t5',
      type: 'warning',
      title: 'Error común: leakage de escalado',
      content: 'Nunca ajustes el escalador con datos de test. Ajusta solo con train y transforma test con esos parámetros.',
    },
  ],
  visualExamples: [
    {
      id: '3.2-v1',
      type: 'chart',
      title: 'Efecto del escalado',
      description: 'Comparacion antes y despues de aplicar Min-Max y Z-score.',
      chartType: 'histogram',
      interactive: false,
      items: [
        { label: 'Min-Max Scaling', detail: 'Reescala al rango [0, 1]. Sensible a outliers.', color: 'primary' },
        { label: 'Z-Score (StandardScaler)', detail: 'Media=0, desviación=1. Mejor para datos normales.', color: 'warning' },
        { label: 'Log Transform', detail: 'Reduce asimetría. Ideal para distribuciones log-normales.', color: 'success' },
        { label: 'One-Hot Encoding', detail: 'Convierte categorías en columnas binarias (0/1).', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '3.2-a1',
      type: 'multiple-choice',
      title: '¿Cuándo usar Z-score?',
      question: '¿Qué método de escalado es mejor cuando hay outliers?',
      options: [
        { id: 'a', text: 'Min-Max' },
        { id: 'b', text: 'Z-score (estandarización)' },
        { id: 'c', text: 'No escalar' },
        { id: 'd', text: 'Logaritmo' },
      ],
      correctAnswer: 'b',
      explanation: 'Z-score es robusto a outliers porque usa media y DE. Min-Max se ve afectado por valores extremos.',
      conceptLinked: 'Estandarización',
    },
    {
      id: '3.2-a2',
      type: 'numeric',
      title: 'Cálculo de Min-Max',
      question: 'Si min=10, max=50, y x=30, ¿cuál es el valor escalado con Min-Max?',
      correctAnswer: '0.5',
      explanation: "x' = (30 - 10) / (50 - 10) = 20 / 40 = 0.5",
      conceptLinked: 'Min-Max scaling',
    },
  ],
  guidedPractice: {
    id: '3.2-gp',
    title: 'Pipeline de transformación',
    objective: 'Crear un pipeline completo de preprocesamiento con pandas y sklearn',
    steps: [
      {
        id: '3.2-gp-1',
        instruction: 'Crea un dataset con diferentes tipos de variables.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 200

df = pd.DataFrame({
    'edad': np.random.normal(35, 10, n).astype(int),
    'ingreso': np.random.lognormal(10.5, 0.8, n).round(0),
    'ciudad': np.random.choice(['CDMX', 'GDL', 'MTY', 'Otro'], n),
    'nivel_educ': np.random.choice(['Secundaria', 'Prepa', 'Licenciatura', 'Maestría'], n),
    'compra': np.random.choice([0, 1], n, p=[0.7, 0.3])
})

print(df.head(10))
print("\\nTipos:")
print(df.dtypes)
print("\\nEstadísticas:")
print(df.describe())`,
        explanation: 'Creamos un dataset mixto con variables numéricas y categóricas.',
        hints: ['np.random.lognormal genera distribución log-normal', 'df.dtypes muestra tipos de columna'],
      },
      {
        id: '3.2-gp-2',
        instruction: 'Aplica Min-Max y Z-score a las variables numéricas.',
        codeTemplate: `from sklearn.preprocessing import MinMaxScaler, StandardScaler

num_cols = ['edad', 'ingreso']

# Min-Max
minmax = MinMaxScaler()
df[num_cols + '_minmax'] = pd.DataFrame(
    minmax.fit_transform(df[num_cols]),
    columns=num_cols, index=df.index
)

# Z-score
zscore = StandardScaler()
df[num_cols + '_zscore'] = pd.DataFrame(
    zscore.fit_transform(df[num_cols]),
    columns=num_cols, index=df.index
)

print("Antes (edad):", df['edad'].describe()[['mean', 'std', 'min', 'max']].round(2))
print("\\nMin-Max (edad):", df['edad_minmax'].describe()[['mean', 'std', 'min', 'max']].round(2))
print("\\nZ-score (edad):", df['edad_zscore'].describe()[['mean', 'std', 'min', 'max']].round(2))`,
        explanation: 'MinMaxScaler y StandardScaler transforman las variables numéricas.',
        hints: ['fit_transform ajusta y transforma', 'El resultado de Min-Max estará entre 0 y 1'],
      },
      {
        id: '3.2-gp-3',
        instruction: 'Codifica las variables categóricas.',
        codeTemplate: `# One-hot encoding
df_encoded = pd.get_dummies(df, columns=['ciudad', 'nivel_educ'], drop_first=True)

print("Columnas después de codificar:")
print(df_encoded.columns.tolist())
print("\\nPrimeras filas:")
print(df_encoded.head())

# Verificar dimensión original vs codificada
print(f"\\nColumnas originales: {len(df.columns)}")
print(f"Columnas codificadas: {len(df_encoded.columns)}")`,
        explanation: 'get_dummies crea columnas binarias para cada categoría.',
        hints: ['drop_first evita multicolinealidad', 'Una categoría se convierte en 0 para evitar redundancia'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '3.2-ch',
    title: 'Pipeline completo de preprocesamiento',
    description: 'Crea un pipeline con imputación, escalado y codificación para un dataset de clientes.',
    language: 'python',
    codeTemplate: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

np.random.seed(42)
n = 300

# Dataset con valores faltantes
df = pd.DataFrame({
    'edad': np.where(np.random.random(n) > 0.1, np.random.normal(40, 12, n), np.nan),
    'ingreso': np.where(np.random.random(n) > 0.05, np.random.lognormal(10.5, 0.7, n), np.nan),
    'genero': np.random.choice(['M', 'F', 'Otro'], n, p=[0.45, 0.45, 0.1]),
    'region': np.random.choice(['Norte', 'Centro', 'Sur'], n),
    'compras_mes': np.random.poisson(3, n)
})

# Tu código: crea un ColumnTransformer que:
# 1. Impute y escale numéricas
# 2. Impute y codifique categóricas
# 3. Aplique el transformador al dataframe`,
    expectedApproach: 'ColumnTransformer con pipelines para cada tipo de columna.',
    evaluationCriteria: ['Imputación correcta', 'Escalado apropiado', 'One-hot encoding válido'],
    hints: [
      'Crea un ColumnTransformer con sklearn.compose: aplica diferentes transformaciones a columnas numéricas y categóricas',
      'Para numéricas: Pipeline con SimpleImputer(strategy="median") y StandardScaler o MinMaxScaler',
      'Para categóricas: Pipeline con SimpleImputer(strategy="most_frequent") y OneHotEncoder(handle_unknown="ignore")',
      'Usa make_column_selector de sklearn.compose para identificar automáticamente columnas numéricas y categóricas',
      'Aplica fit_transform al dataframe y muestra el resultado con pd.DataFrame(transformed, columns=feature_names)',
    ],
  },
  assessment: {
    id: '3.2-assess',
    passingScore: 70,
    questions: [
      {
        id: '3.2-q1',
        type: 'multiple-choice',
        text: '¿Cuál es el rango de salida de Min-Max scaling?',
        options: [
          { id: 'a', text: '(-∞, +∞)' },
          { id: 'b', text: '[0, 1]' },
          { id: 'c', text: '[-3, 3]' },
          { id: 'd', text: '[0, 100]' },
        ],
        correctAnswer: 'b',
        explanation: 'Min-Max transforma al rango [0, 1].',
        conceptLinked: 'Min-Max scaling',
        difficulty: 'easy',
      },
      {
        id: '3.2-q2',
        type: 'multiple-choice',
        text: '¿Qué problema tiene Label Encoding con variables nominales?',
        options: [
          { id: 'a', text: 'Crea demasiadas columnas' },
          { id: 'b', text: 'Introduce un orden artificial' },
          { id: 'c', text: 'No funciona con pandas' },
          { id: 'd', text: 'Elimina outliers' },
        ],
        correctAnswer: 'b',
        explanation: 'Label encoding asigna números (0, 1, 2...) que implican un orden que no existe en variables nominales.',
        conceptLinked: 'Codificación de categorías',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Preprocesamiento', 'Estandarización', 'Codificación', 'Feature engineering'],
};
