import type { Lesson } from '@/types/course';

export const LESSON_3_4: Lesson = {
  id: '3.4',
  code: '3.4',
  title: 'Visualización de datos',
  objectives: [
    'Seleccionar el tipo de gráfica adecuado',
    'Crear gráficas con matplotlib y seaborn',
    'Diseñar visualizaciones efectivas',
    'Identificar malas prácticas en visualización',
  ],
  theory: [
    {
      id: '3.4-t1',
      type: 'text',
      title: 'Principios de visualización efectiva',
      content: 'Una buena visualización comunica información compleja de forma clara. Principios: simplicidad, precisión, consistencia, énfasis en lo importante.',
    },
    {
      id: '3.4-t2',
      type: 'list',
      title: 'Tipos de gráfica y cuándo usarlos',
      items: [
        'Barras: comparar categorías',
        'Líneas: tendencias temporales',
        'Scatter: relación entre dos numéricas',
        'Histograma: distribución de una variable',
        'Boxplot: resumen estadístico por grupo',
        'Heatmap: correlaciones o matrices',
      ],
    },
    {
      id: '3.4-t3',
      type: 'warning',
      title: 'Malas prácticas comunes',
      content: 'Evitar: ejes truncados que engañan, usar 3D innecesariamente, exceso de colores, etiquetas ilegibles, gráficas que no aportan información.',
    },
    {
      id: '3.4-t4',
      type: 'text',
      title: 'Storytelling con datos',
      content: 'El objetivo no es solo mostrar datos, sino contar una historia. Identifica el mensaje clave antes de elegir la visualización.',
    },
  ],
  visualExamples: [
    {
      id: '3.4-v1',
      type: 'chart',
      title: 'Galeria de visualizaciones',
      description: 'Ejemplos de diferentes tipos de graficas y sus usos.',
      chartType: 'mixed',
      interactive: false,
      items: [
        { label: 'Histogramas', detail: 'Distribución de frecuencias de variables numéricas.', color: 'primary' },
        { label: 'Box plots', detail: 'Resumen de cinco números + detección de outliers.', color: 'warning' },
        { label: 'Scatter plots', detail: 'Relación entre dos variables numéricas.', color: 'success' },
        { label: 'Heatmaps', detail: 'Intensidad de valores en una matriz con colores.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '3.4-a1',
      type: 'multiple-choice',
      title: '¿Qué gráfica usar?',
      question: 'Quieres mostrar la evolución de ventas mensuales durante 3 años. ¿Qué gráfica es más adecuada?',
      options: [
        { id: 'a', text: 'Gráfica de barras' },
        { id: 'b', text: 'Gráfica de líneas' },
        { id: 'c', text: 'Gráfica circular' },
        { id: 'd', text: 'Histograma' },
      ],
      correctAnswer: 'b',
      explanation: 'Las gráficas de líneas son ideales para mostrar tendencias temporales.',
      conceptLinked: 'Selección de visualización',
    },
  ],
  guidedPractice: {
    id: '3.4-gp',
    title: 'Dashboard de ventas con matplotlib',
    objective: 'Crear un panel de visualización completo con múltiples gráficas',
    steps: [
      {
        id: '3.4-gp-1',
        instruction: 'Genera un dataset de ventas.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 365
dates = pd.date_range('2024-01-01', periods=n)

df = pd.DataFrame({
    'fecha': dates,
    'ventas': np.random.poisson(50, n) + np.sin(np.arange(n) * 2 * np.pi / 365) * 15,
    'categoria': np.random.choice(['Electrónica', 'Ropa', 'Hogar'], n),
    'region': np.random.choice(['Norte', 'Centro', 'Sur'], n, p=[0.4, 0.35, 0.25]),
    'precio': np.random.uniform(10, 500, n).round(2)
})

df['mes'] = df['fecha'].dt.month
df['dia_semana'] = df['fecha'].dt.day_name()

print(df.head())
print(f"\\nRegistros: {len(df)}")`,
        explanation: 'Dataset de ventas diarias con múltiples dimensiones.',
        hints: ['pd.date_range genera fechas', 'dt.month extrae el mes'],
      },
      {
        id: '3.4-gp-2',
        instruction: 'Crea un dashboard de 4 paneles.',
        codeTemplate: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Dashboard de Ventas 2024', fontsize=16, fontweight='bold')

# Panel 1: Ventas diarias (línea suavizada)
ventas_diarias = df.groupby('fecha')['ventas'].sum()
axes[0, 0].plot(ventas_diarias.index, ventas_diarias.values, alpha=0.3, color='steelblue')
axes[0, 0].plot(ventas_diarias.index, ventas_diarias.rolling(7).mean(), color='navy', linewidth=2, label='Media móvil 7d')
axes[0, 0].set_title('Tendencia diaria de ventas')
axes[0, 0].legend()
axes[0, 0].grid(True, alpha=0.3)

# Panel 2: Ventas por categoría (barras)
ventas_cat = df.groupby('categoria')['ventas'].sum().sort_values()
axes[0, 1].barh(ventas_cat.index, ventas_cat.values, color=['#FF6B6B', '#4ECDC4', '#45B7D1'])
axes[0, 1].set_title('Ventas por categoría')
axes[0, 1].set_xlabel('Unidades vendidas')

# Panel 3: Distribución de precios (histograma)
axes[1, 0].hist(df['precio'], bins=30, color='coral', edgecolor='white', alpha=0.7)
axes[1, 0].set_title('Distribución de precios')
axes[1, 0].set_xlabel('Precio ($)')
axes[1, 0].axvline(df['precio'].mean(), color='red', linestyle='--', label=f'Media: {df["precio"].mean():.0f}')
axes[1, 0].legend()

# Panel 4: Boxplot de ventas por región
region_data = [df[df['region'] == r]['ventas'].values for r in df['region'].unique()]
bp = axes[1, 1].boxplot(region_data, labels=df['region'].unique(), patch_artist=True)
colors = ['#FF9999', '#66B2FF', '#99FF99']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
axes[1, 1].set_title('Ventas por región')
axes[1, 1].grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('dashboard_ventas.png', dpi=100, bbox_inches='tight')
plt.show()`,
        explanation: 'Combinamos 4 tipos de gráfica en un dashboard informativo.',
        hints: ['plt.subplots crea el panel', 'tight_layout ajusta el espaciado', 'alpha controla transparencia'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '3.4-ch',
    title: 'Visualización de encuesta',
    description: 'Crea una visualización completa de una encuesta de satisfacción con al menos 4 gráficas.',
    language: 'python',
    codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
n = 500
df = pd.DataFrame({
    'satisfaccion': np.random.choice([1, 2, 3, 4, 5], n, p=[0.05, 0.1, 0.25, 0.35, 0.25]),
    'departamento': np.random.choice(['Ventas', 'IT', 'RRHH', 'Finanzas'], n),
    'antiguedad': np.random.choice(['<1 año', '1-3 años', '3-5 años', '>5 años'], n),
    'recomendaria': np.random.choice([0, 1], n, p=[0.3, 0.7])
})

# Crea un dashboard que responda:
# 1. ¿Cuál es la distribución de satisfacción?
# 2. ¿Qué departamentos tienen mejor satisfacción?
# 3. ¿Hay relación entre antigüedad y satisfacción?
# 4. ¿Qué % recomendaría la empresa?
# Usa al menos 4 tipos de gráfica diferentes.`,
    expectedApproach: 'Histograma + barplot + heatmap o lineplot + gráfico circular o barras.',
    evaluationCriteria: ['4+ gráficas diferentes', 'Insights claros', 'Buen diseño visual'],
    hints: [
      'Usa plt.figure(figsize=(12, 10)) y plt.subplot(2,2,1) para crear un dashboard con 4 gráficas en una figura',
      'Gráfica 1: sns.countplot para distribución de satisfacción. Gráfica 2: sns.boxplot(x="departamento", y="satisfaccion")',
      'Gráfica 3: sns.heatmap con pd.crosstab(antiguedad, satisfaccion) para ver relaciones. Gráfica 4: plt.pie para % que recomienda',
      'Agrega títulos con plt.title(), etiquetas con plt.xlabel()/ylabel(), y usa plt.tight_layout() para que no se sobrepongan',
      'Incluye insights textuales: print("Insight: IT tiene la mayor satisfacción promedio") al final del análisis',
    ],
  },
  assessment: {
    id: '3.4-assess',
    passingScore: 70,
    questions: [
      {
        id: '3.4-q1',
        type: 'multiple-choice',
        text: '¿Qué gráfica es mejor para mostrar composición de un todo?',
        options: [
          { id: 'a', text: 'Gráfica de líneas' },
          { id: 'b', text: 'Gráfica circular' },
          { id: 'c', text: 'Scatter plot' },
          { id: 'd', text: 'Boxplot' },
        ],
        correctAnswer: 'b',
        explanation: 'Las gráficas circulares (pie charts) muestran proporciones de un todo.',
        conceptLinked: 'Tipos de gráfica',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Visualización', 'matplotlib', 'Diseño de gráficas', 'Storytelling'],
};
