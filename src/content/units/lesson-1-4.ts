import type { Lesson } from '@/types/course';

export const LESSON_1_4: Lesson = {
  id: '1.4',
  code: '1.4',
  title: 'Exploración, minería y modelado',
  objectives: [
    'Describir técnicas básicas de exploración de datos',
    'Explicar qué es la minería de datos',
    'Diferenciar modelos descriptivos y predictivos',
  ],
  theory: [
    {
      id: '1.4-t1',
      type: 'text',
      title: 'Exploración de datos (EDA)',
      content: 'El Análisis Exploratorio de Datos es el proceso de investigar datasets para descubrir patrones, anomalías, probar hipótesis y verificar supuestos. Es el paso fundamental antes de cualquier modelado.',
    },
    {
      id: '1.4-t2',
      type: 'list',
      title: 'Técnicas de EDA',
      items: [
        'Estadísticas descriptivas (media, mediana, DE)',
        'Visualizaciones (histogramas, scatter plots, boxplots)',
        'Análisis de correlaciones',
        'Detección de valores faltantes y outliers',
      ],
    },
    {
      id: '1.4-t3',
      type: 'text',
      title: 'Minería de datos',
      content: 'La minería de datos aplica algoritmos para descubrir patrones automáticamente en grandes volúmenes de datos. Incluye clustering, asociación, clasificación y reglas de anomalía.',
    },
    {
      id: '1.4-t4',
      type: 'text',
      title: 'Modelado',
      content: 'Los modelos pueden ser descriptivos (qué está pasando: clustering, segmentación) o predictivos (qué pasará: regresión, clasificación). La elección depende del problema y los datos.',
    },
  ],
  visualExamples: [
    {
      id: '1.4-v1',
      type: 'chart',
      title: 'Ejemplos de EDA',
      description: 'Visualizaciones tipicas de un analisis exploratorio.',
      chartType: 'histogram',
      interactive: false,
      items: [
        { label: 'Histogramas', detail: 'Muestran la distribución de una variable numérica.', color: 'primary' },
        { label: 'Box plots', detail: 'Detectan outliers y muestran medianas por grupo.', color: 'warning' },
        { label: 'Scatter plots', detail: 'Revelan correlaciones entre dos variables numéricas.', color: 'success' },
        { label: 'Heatmaps', detail: 'Matrices de correlación con colores para identificar patrones.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '1.4-a1',
      type: 'multiple-choice',
      title: 'EDA vs Modelado',
      question: '¿Qué haces primero: EDA o modelado?',
      options: [
        { id: 'a', text: 'Modelado para ver qué sale' },
        { id: 'b', text: 'EDA para entender los datos antes de modelar' },
        { id: 'c', text: 'Depende del caso' },
        { id: 'd', text: 'Ambos al mismo tiempo' },
      ],
      correctAnswer: 'b',
      explanation: 'Siempre se hace EDA primero para entender la estructura, calidad y patrones de los datos.',
      conceptLinked: 'Proceso de CD',
    },
  ],
  guidedPractice: {
    id: '1.4-gp',
    title: 'EDA completo con Python',
    objective: 'Realizar un análisis exploratorio paso a paso',
    steps: [
      {
        id: '1.4-gp-1',
        instruction: 'Carga un dataset y explora su estructura.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 200

# Dataset de ventas de tienda
df = pd.DataFrame({
    'producto': np.random.choice(['Laptop', 'Celular', 'Tablet', 'Audífonos'], n),
    'precio': np.random.uniform(500, 15000, n).round(0),
    'unidades': np.random.poisson(3, n) + 1,
    'dia_semana': np.random.choice(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], n),
    'canal': np.random.choice(['Online', 'Tienda'], n, p=[0.6, 0.4])
})
df['total'] = df['precio'] * df['unidades']

# PASO 1: Estructura
print("=== ESTRUCTURA ===")
print(f"Registros: {len(df)}")
print(f"Columnas: {list(df.columns)}")
print(f"Tipos:\\n{df.dtypes}")

# PASO 2: Primeras filas
print("\\n=== PRIMERAS FILAS ===")
print(df.head())

# PASO 3: Estadísticas
print("\\n=== ESTADÍSTICAS ===")
print(df[['precio', 'unidades', 'total']].describe().round(0))`,
        explanation: 'El primer paso del EDA es entender la estructura y distribución de los datos.',
        hints: ['df.dtypes muestra tipos de columna', 'describe() da estadísticas resumen'],
      },
      {
        id: '1.4-gp-2',
        instruction: 'Analiza distribuciones y patrones.',
        codeTemplate: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Distribución de precios
axes[0, 0].hist(df['precio'], bins=20, color='steelblue', edgecolor='white')
axes[0, 0].set_title('Distribución de precios')
axes[0, 0].set_xlabel('Precio ($)')

# Ventas por producto
ventas_prod = df.groupby('producto')['total'].sum().sort_values()
axes[0, 1].barh(ventas_prod.index, ventas_prod.values, color='coral')
axes[0, 1].set_title('Ventas por producto')

# Ventas por día
ventas_dia = df.groupby('dia_semana')['total'].sum()
axes[1, 0].bar(ventas_dia.index, ventas_dia.values, color='teal')
axes[1, 0].set_title('Ventas por día')
axes[1, 0].tick_params(axis='x', rotation=45)

# Online vs Tienda
ventas_canal = df.groupby('canal')['total'].mean()
axes[1, 1].pie(ventas_canal.values, labels=ventas_canal.index, autopct='%1.1f%%', colors=['#FF6B6B', '#4ECDC4'])
axes[1, 1].set_title('Venta promedio por canal')

plt.tight_layout()
plt.show()`,
        explanation: 'Las visualizaciones revelan patrones que las estadísticas solas no muestran.',
        hints: ['plt.subplots crea panel de gráficas', 'tight_layout ajusta espaciado'],
      },
      {
        id: '1.4-gp-3',
        instruction: 'Detecta calidad de datos.',
        codeTemplate: `# Análisis de calidad de datos
print("=== CALIDAD DE DATOS ===")

# Valores faltantes
faltantes = df.isnull().sum()
print(f"\\nValores faltantes:")
print(faltantes[faltantes > 0] if faltantes.any() else "  Ninguno ✓")

# Duplicados
duplicados = df.duplicated().sum()
print(f"\\nRegistros duplicados: {duplicados}")

# Outliers en precio (método IQR)
Q1 = df['precio'].quantile(0.25)
Q3 = df['precio'].quantile(0.75)
IQR = Q3 - Q1
outliers = ((df['precio'] < Q1 - 1.5*IQR) | (df['precio'] > Q3 + 1.5*IQR)).sum()
print(f"\\nOutliers en precio (IQR): {outliers}")

# Resumen
print(f"\\n=== RESUMEN DE CALIDAD ===")
print(f"  Registros totales: {len(df)}")
print(f"  Completitud: {(1 - df.isnull().sum().sum()/(df.shape[0]*df.shape[1]))*100:.1f}%")
print(f"  Unicidad: {(1 - duplicados/len(df))*100:.1f}%")`,
        explanation: 'La calidad de datos determina la confiabilidad del análisis.',
        hints: ['IQR = rango intercuartílico', 'Outliers son valores atípicos'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.4-ch',
    title: 'EDA de un dataset real',
    description: 'Selecciona un dataset de Kaggle y realiza un EDA completo.',
    language: 'python',
    codeTemplate: `# Reto: EDA completo
# 1. Carga un dataset real de Kaggle
# 2. Explora estructura y tipos
# 3. Crea al menos 4 visualizaciones
# 4. Detecta problemas de calidad
# 5. Resume tus hallazgos principales`,
    expectedApproach: 'EDA sistemático: estructura → distribuciones → relaciones → calidad → conclusiones.',
    evaluationCriteria: ['Profundidad del análisis', 'Calidad de visualizaciones', 'Hallazgos relevantes'],
    hints: [
      'Empieza con df.info(), df.describe() y df.shape para entender la estructura del dataset antes de graficar',
      'Crea al menos 4 tipos de gráfica: histograma (distribución), boxplot (outliers), scatterplot (relaciones), heatmap (correlaciones)',
      'Usa seaborn para visualizaciones más atractivas: sns.heatmap(df.corr(), annot=True) para correlaciones',
      'Detecta calidad de datos con df.isnull().sum() para faltantes y describe() para identificar valores atípicos',
      'Termina con un resumen de hallazgos clave: ¿Qué variables son más relevantes? ¿Hay patrones o anomalías?',
    ],
  },
  assessment: {
    id: '1.4-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.4-q1',
        type: 'multiple-choice',
        text: '¿Qué es el EDA?',
        options: [
          { id: 'a', text: 'Un tipo de algoritmo de ML' },
          { id: 'b', text: 'Exploración de datos antes de modelar' },
          { id: 'c', text: 'Una base de datos' },
          { id: 'd', text: 'Un lenguaje de programación' },
        ],
        correctAnswer: 'b',
        explanation: 'EDA = Análisis Exploratorio de Datos, el paso inicial de cualquier proyecto.',
        conceptLinked: 'EDA',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['EDA', 'Minería de datos', 'Modelado', 'Calidad de datos'],
};
