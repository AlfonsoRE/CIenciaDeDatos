import type { Lesson } from '@/types/course';

export const LESSON_2_2: Lesson = {
  id: '2.2',
  code: '2.2',
  title: 'Estadística descriptiva',
  objectives: [
    'Calcular media, mediana y moda',
    'Calcular varianza y desviación estándar',
    'Interpretar sesgo y curtosis',
    'Crear histogramas y diagramas de caja',
    'Distinguir medidas de tendencia central y dispersión',
  ],
  theory: [
    {
      id: '2.2-t1',
      type: 'text',
      title: '¿Qué es la estadística descriptiva?',
      content: 'La estadística descriptiva resume y organiza los datos para facilitar su comprensión. No hace inferencias sobre una población, solo describe lo que los datos muestran.',
    },
    {
      id: '2.2-t2',
      type: 'formula',
      title: 'Media aritmética',
      content: 'Es el promedio de todos los valores. Sensible a valores extremos.',
      formula: 'x̄ = Σxi / n',
    },
    {
      id: '2.2-t3',
      type: 'formula',
      title: 'Mediana',
      content: 'Es el valor central cuando los datos están ordenados. Robusta ante outliers.',
      formula: 'Me = valor del percentil 50',
    },
    {
      id: '2.2-t4',
      type: 'text',
      title: 'Moda',
      content: 'Es el valor más frecuente. Puede haber multimodalidad (2 o más modas). Es la única medida que funciona con datos categóricos.',
    },
    {
      id: '2.2-t5',
      type: 'formula',
      title: 'Varianza',
      content: 'Mide la dispersión promedio de los datos respecto a la media.',
      formula: 's² = Σ(xi - x̄)² / (n-1)',
    },
    {
      id: '2.2-t6',
      type: 'formula',
      title: 'Desviación estándar',
      content: 'Es la raíz de la varianza. Expresada en las mismas unidades que los datos.',
      formula: 's = √(s²)',
    },
    {
      id: '2.2-t7',
      type: 'text',
      title: 'Sesgo (Skewness)',
      content: 'Mide la asimetría de la distribución. Sesgo positivo: cola a la derecha. Sesgo negativo: cola a la izquierda. Sesgo 0: simétrica.',
    },
    {
      id: '2.2-t8',
      type: 'note',
      title: '¿Cuándo usar cada medida?',
      content: 'Usa media cuando no hay outliers. Usa mediana cuando los datos están sesgados. Usa moda para datos categóricos. Usa desviación estándar para datos simétricos, IQR para sesgados.',
    },
  ],
  visualExamples: [
    {
      id: '2.2-v1',
      type: 'simulation',
      title: 'Comparacion de medidas',
      description: 'Ingresa datos y observa como cambian media, mediana y moda en tiempo real.',
      chartType: 'histogram',
      interactive: true,
      parameters: [
        { id: 'n', label: 'Numero de datos', min: 5, max: 100, step: 1, defaultValue: 20 },
        { id: 'outlier', label: 'Incluir outlier', min: 0, max: 1, step: 1, defaultValue: 0 },
      ],
      items: [
        { label: 'Media', detail: 'Promedio aritmético. Sensible a valores atípicos.', color: 'primary' },
        { label: 'Mediana', detail: 'Valor central. Robusta ante outliers.', color: 'warning' },
        { label: 'Moda', detail: 'Valor más frecuente. Útil para datos categóricos.', color: 'success' },
        { label: 'Desviación estándar', detail: 'Mide la dispersión respecto a la media.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '2.2-a1',
      type: 'numeric',
      title: 'Calcular media',
      question: 'Dados los datos: 12, 15, 18, 22, 25, 30, 100. ¿Cuál es la media?',
      correctAnswer: '31.71',
      explanation: 'Media = (12+15+18+22+25+30+100)/7 = 222/7 ≈ 31.71. Observa cómo el valor 100 (outlier) desplaza la media.',
      conceptLinked: 'Media aritmética',
    },
    {
      id: '2.2-a2',
      type: 'multiple-choice',
      title: 'Mediana vs media',
      question: 'Si la media salarial de una empresa es $50,000 pero la mediana es $35,000, ¿qué indica esto?',
      options: [
        { id: 'a', text: 'Todos ganan exactamente $50,000' },
        { id: 'b', text: 'Hay pocos salarios muy altos que elevan la media' },
        { id: 'c', text: 'La empresa paga por debajo del mercado' },
        { id: 'd', text: 'La mediana está equivocada' },
      ],
      correctAnswer: 'b',
      explanation: 'Cuando la media > mediana, la distribución está sesgada a la derecha, indicando que unos pocos salarios altos elevan el promedio.',
      conceptLinked: 'Sesgo y medidas de tendencia',
    },
    {
      id: '2.2-a3',
      type: 'multiple-select',
      title: 'Propiedades de la desviación estándar',
      question: '¿Cuáles son propiedades correctas de la desviación estándar? (Selecciona todas)',
      options: [
        { id: 'a', text: 'Mide la dispersión de los datos' },
        { id: 'b', text: 'Está en las mismas unidades que los datos' },
        { id: 'c', text: 'Es siempre positiva o cero' },
        { id: 'd', text: 'Es sensible a valores atípicos' },
        { id: 'e', text: 'Puede ser negativa' },
      ],
      correctAnswer: ['a', 'b', 'c', 'd'],
      explanation: 'La DE mide dispersión, está en las mismas unidades, es ≥ 0, y es sensible a outliers. Nunca es negativa.',
      conceptLinked: 'Desviación estándar',
    },
  ],
  guidedPractice: {
    id: '2.2-gp',
    title: 'Análisis descriptivo con Python',
    objective: 'Calcular todas las medidas descriptivas y crear visualizaciones básicas',
    steps: [
      {
        id: '2.2-gp-1',
        instruction: 'Crea un dataset de edades y calcula medidas de tendencia central.',
        codeTemplate: `import numpy as np
import pandas as pd

# Datos de edades
edades = [22, 25, 28, 30, 32, 35, 40, 45, 50, 65]

# Medidas de tendencia central
print("Media:", np.mean(edades))
print("Mediana:", np.median(edades))
print("Moda:", pd.Series(edades).mode().values)

# Medidas de dispersión
print("\\nVarianza:", np.var(edades, ddof=1))
print("Desviación estándar:", np.std(edades, ddof=1))
print("Rango:", np.max(edades) - np.min(edades))
print("IQR:", np.percentile(edades, 75) - np.percentile(edades, 25))`,
        explanation: 'Calculamos todas las medidas descriptivas básicas usando NumPy y Pandas.',
        hints: ['ddof=1 para varianza muestral', 'IQR = Q3 - Q1'],
      },
      {
        id: '2.2-gp-2',
        instruction: 'Crea un histograma y un diagrama de caja.',
        codeTemplate: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Histograma
axes[0].hist(edades, bins=5, edgecolor='black', alpha=0.7)
axes[0].set_title('Histograma de edades')
axes[0].set_xlabel('Edad')
axes[0].set_ylabel('Frecuencia')

# Diagrama de caja
axes[1].boxplot(edades, vert=True)
axes[1].set_title('Diagrama de caja')
axes[1].set_ylabel('Edad')

plt.tight_layout()
plt.show()`,
        explanation: 'El histograma muestra la distribución. El boxplot muestra la mediana, cuartiles y posibles outliers.',
        hints: ['figsize controla el tamaño', 'hist() crea histogramas', 'boxplot() crea diagramas de caja'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '2.2-ch',
    title: 'Reto: Análisis completo de salarios',
    description: 'Analiza un dataset de salarios: calcula todas las medidas descriptivas, identifica outliers, compara media y mediana, y determina el sesgo.',
    language: 'python',
    codeTemplate: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Dataset de salarios (simulado)
np.random.seed(42)
salarios = np.concatenate([
    np.random.normal(45000, 10000, 90),  # 90% salario normal
    np.random.normal(150000, 20000, 10)  # 10% ejecutivos
])

# Tu análisis aquí:
# 1. Calcula media, mediana, moda
# 2. Calcula varianza, DE, IQR
# 3. Calcula sesgo
# 4. Detecta outliers con Tukey
# 5. Crea histograma + boxplot
# 6. Interpreta los resultados`,
    expectedApproach: 'Media >> Mediana por outliers. Sesgo positivo. Outliers en extremo superior.',
    evaluationCriteria: ['Cálculos correctos', 'Visualizaciones claras', 'Interpretación fundamentada'],
    hints: [
      'Calcula media, mediana y moda con numpy: np.mean(), np.median(), y from scipy.stats import mode para la moda',
      'La varianza usa ddof=1 (muestreo): np.var(salarios, ddof=1). La DE es la raíz cuadrada: np.std(salarios, ddof=1)',
      'El IQR es Q3 - Q1: Q1, Q3 = np.percentile(salarios, [25, 75]). Outliers por Tukey: fuera de [Q1-1.5*IQR, Q3+1.5*IQR]',
      'Compara media vs mediana: si la media >> mediana, hay sesgo positivo (valores altos de ejecutivos)',
      'Usa plt.subplot(1,2,1) para histograma y subplot(1,2,2) para boxplot en una sola figura con plt.tight_layout()',
    ],
  },
  assessment: {
    id: '2.2-assess',
    passingScore: 70,
    questions: [
      {
        id: '2.2-q1', type: 'numeric', text: '¿Cuál es la media de 10, 20, 30, 40, 50?',
        correctAnswer: '30', explanation: 'Media = (10+20+30+40+50)/5 = 150/5 = 30.',
        conceptLinked: 'Media', difficulty: 'easy',
      },
      {
        id: '2.2-q2', type: 'multiple-choice', text: '¿Por qué se usa n-1 en la varianza muestral?',
        options: [
          { id: 'a', text: 'Para que sea más grande' },
          { id: 'b', text: 'Por los grados de libertad (corrección de Bessel)' },
          { id: 'c', text: 'Es un error matemático' },
          { id: 'd', text: 'Para que sea más fácil de calcular' },
        ],
        correctAnswer: 'b', explanation: 'La corrección de Bessel usa n-1 porque estamos estimando la varianza poblacional con una muestra.',
        conceptLinked: 'Varianza muestral', difficulty: 'medium',
      },
      {
        id: '2.2-q3', type: 'interpretation', text: 'Si la distribución de ingresos tiene sesgo positivo, ¿qué afirmación es correcta?',
        options: [
          { id: 'a', text: 'La mayoría gana mucho' },
          { id: 'b', text: 'Pocos ganan mucho, la mayoría gana menos' },
          { id: 'c', text: 'Todos ganan lo mismo' },
          { id: 'd', text: 'La distribución es simétrica' },
        ],
        correctAnswer: 'b', explanation: 'Sesgo positivo = cola a la derecha = pocos valores altos que elevan la media.',
        conceptLinked: 'Sesgo', difficulty: 'medium',
      },
      {
        id: '2.2-q4', type: 'multiple-choice', text: '¿Qué medida de tendencia central es más robusta a outliers?',
        options: [
          { id: 'a', text: 'Media' },
          { id: 'b', text: 'Mediana' },
          { id: 'c', text: 'Moda' },
          { id: 'd', text: 'Todas son igualmente robustas' },
        ],
        correctAnswer: 'b', explanation: 'La mediana solo depende de la posición central, no de los valores extremos.',
        conceptLinked: 'Robustez de medidas', difficulty: 'easy',
      },
      {
        id: '2.2-q5', type: 'numeric', text: 'Si los datos son 5, 10, 15, 20, 25, ¿cuál es la desviación estándar poblacional?',
        correctAnswer: '7.07', explanation: 'μ=15. σ = √(Σ(xi-μ)²/N) = √((100+25+0+25+100)/5) = √(50) ≈ 7.07.',
        conceptLinked: 'Desviación estándar', difficulty: 'medium',
      },
    ],
  },
  competencies: ['Estadística descriptiva', 'Medidas de tendencia', 'Medidas de dispersión', 'Sesgo', 'Visualización básica'],
};
