import type { Lesson } from '@/types/course';

export const LESSON_3_1: Lesson = {
  id: '3.1',
  code: '3.1',
  title: 'Preparación y limpieza de datos',
  objectives: [
    'Identificar y manejar datos faltantes',
    'Detectar y eliminar duplicados',
    'Identificar y tratar valores atípicos',
    'Evaluar el impacto de las decisiones de limpieza',
  ],
  theory: [
    {
      id: '3.1-t1',
      type: 'text',
      title: '¿Por qué limpiar datos?',
      content: 'Los datos del mundo real están sucios: tienen valores faltantes, duplicados, errores de formato y valores atípicos. Sin limpieza, cualquier análisis o modelo será incorrecto. La limpieza típicamente consume el 60-80% del tiempo en un proyecto de Ciencia de Datos.',
    },
    {
      id: '3.1-t2',
      type: 'text',
      title: 'Datos faltantes (Missing values)',
      content: 'Los datos faltantes aparecen como NaN, None, null, o valores vacíos. Pueden deberse a errores de recolección, respuestas no proporcionadas, o fusiones de bases de datos.',
    },
    {
      id: '3.1-t3',
      type: 'list',
      title: 'Estrategias para datos faltantes',
      items: [
        'Eliminar filas con faltantes (cuando son pocas y aleatorias)',
        'Eliminar columnas con muchos faltantes (>50%)',
        'Imputar con media/mediana (variables numéricas)',
        'Imputar con moda (variables categóricas)',
        'Imputar con valores前后 (forward/backward fill) en series temporales',
        'Usar modelos de imputación (KNN, regresión)',
      ],
    },
    {
      id: '3.1-t4',
      type: 'text',
      title: 'Valores duplicados',
      content: 'Los duplicados distorsionan estadísticas y modelos. Pueden ser duplicados exactos (todas las columnas iguales) o parciales (mismas columnas clave). Antes de eliminar, verifica si el duplicado es legítimo.',
    },
    {
      id: '3.1-t5',
      type: 'text',
      title: 'Valores atípicos (Outliers)',
      content: 'Un outlier es un valor que se desvía significativamente del resto. Puede ser un error real o un dato legítimo pero extremo. Métodos de detección: rango intercuartílico (IQR), Z-score (>3), percentiles.',
    },
    {
      id: '3.1-t6',
      type: 'note',
      title: 'Regla de Tukey',
      content: 'Outlier = valor < Q1 - 1.5·IQR o valor > Q3 + 1.5·IQR, donde IQR = Q3 - Q1. Es el método más utilizado para detección visual con diagramas de caja.',
    },
    {
      id: '3.1-t7',
      type: 'warning',
      title: 'Cuidado al limpiar',
      content: 'No elimines datos sin justificación. Un outlier puede ser el dato más importante (ej: fraude). Documenta cada decisión de limpieza. El objetivo es mejorar la calidad, no hacer que los datos se vean "bonitos".',
    },
  ],
  visualExamples: [
    {
      id: '3.1-v1',
      type: 'simulation',
      title: 'Impacto de la limpieza',
      description: 'Compara estadisticas antes y despues de limpiar datos con faltantes y atipicos.',
      chartType: 'comparison',
      interactive: true,
      items: [
        { label: 'Valores faltantes', detail: 'Eliminar, imputar con media/mediana, o usar KNN imputation.', color: 'primary' },
        { label: 'Outliers', detail: 'IQR method, Z-score > 3, o dominio del conocimiento.', color: 'warning' },
        { label: 'Datos duplicados', detail: 'Detectar y eliminar registros repetidos.', color: 'success' },
        { label: 'Tipos de datos', detail: 'Convertir strings a fechas, categorías a numéricos, etc.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '3.1-a1',
      type: 'multiple-choice',
      title: 'Estrategia para faltantes',
      question: 'Tienes una columna con 95% de valores faltantes. ¿Cuál es la mejor estrategia?',
      options: [
        { id: 'a', text: 'Imputar con la media' },
        { id: 'b', text: 'Eliminar la columna' },
        { id: 'c', text: 'Imputar con 0' },
        { id: 'd', text: 'Dejar los faltantes como están' },
      ],
      correctAnswer: 'b',
      explanation: 'Con 95% de faltantes, la columna no aporta información útil. Imputarla introduciría sesgo masivo.',
      conceptLinked: 'Manejo de datos faltantes',
    },
    {
      id: '3.1-a2',
      type: 'multiple-select',
      title: 'Métodos de detección de outliers',
      question: '¿Cuáles son métodos válidos para detectar valores atípicos? (Selecciona todas las que apliquen)',
      options: [
        { id: 'a', text: 'Regla de Tukey (IQR)' },
        { id: 'b', text: 'Z-score mayor a 3' },
        { id: 'c', text: 'Diagrama de caja' },
        { id: 'd', text: 'Promedio de los datos' },
        { id: 'e', text: 'Percentil 99' },
      ],
      correctAnswer: ['a', 'b', 'c', 'e'],
      explanation: 'Todos excepto el promedio son métodos válidos. El promedio es sensible a los outliers, por lo que no sirve para detectarlos.',
      conceptLinked: 'Detección de outliers',
    },
  ],
  guidedPractice: {
    id: '3.1-gp',
    title: 'Limpiar un dataset real',
    objective: 'Detectar y manejar datos faltantes, duplicados y atípicos en un dataset de ventas',
    steps: [
      {
        id: '3.1-gp-1',
        instruction: 'Carga el dataset y revisa su estructura.',
        codeTemplate: `import pandas as pd
import numpy as np

# Cargar datos
df = pd.DataFrame({
    'ventas': [100, 150, np.nan, 200, 150, 1200, 180, np.nan, 160, 190],
    'precio': [25, 30, 28, np.nan, 30, 29, 25, 32, 30, 28],
    'region': ['Norte', 'Sur', 'Norte', 'Centro', 'Sur', 'Norte', 'Sur', 'Centro', 'Norte', 'Sur']
})

print("Forma:", df.shape)
print("\\nPrimeras filas:")
print(df.head())`,
        explanation: 'Exploramos la estructura básica del dataset antes de limpiar.',
        hints: ['Usa .shape para ver dimensiones', 'Usa .head() para ver las primeras filas'],
      },
      {
        id: '3.1-gp-2',
        instruction: 'Identifica datos faltantes.',
        codeTemplate: `# Datos faltantes por columna
print("Faltantes por columna:")
print(df.isnull().sum())

# Porcentaje de faltantes
print("\\nPorcentaje de faltantes:")
print((df.isnull().sum() / len(df) * 100).round(2))`,
        explanation: 'Cuantificamos cuántos faltantes hay en cada columna para decidir la estrategia.',
        hints: ['isnull() retorna True/False para cada celda', 'sum() cuenta los True'],
      },
      {
        id: '3.1-gp-3',
        instruction: 'Detecta duplicados.',
        codeTemplate: `# Filas duplicadas exactas
print("Duplicados exactos:", df.duplicated().sum())

# Duplicados por columna clave
print("Filas duplicadas por región+precio:")
print(df.duplicated(subset=['region', 'precio']).sum())`,
        explanation: 'Verificamos si hay filas completamente duplicadas o parcialmente duplicadas.',
        hints: ['duplicated() retorna serie booleana', 'subset permite definir columnas clave'],
      },
      {
        id: '3.1-gp-4',
        instruction: 'Detecta outliers con la regla de Tukey.',
        codeTemplate: `# Regla de Tukey para 'ventas'
Q1 = df['ventas'].quantile(0.25)
Q3 = df['ventas'].quantile(0.75)
IQR = Q3 - Q1
limite_inferior = Q1 - 1.5 * IQR
limite_superior = Q3 + 1.5 * IQR

print(f"Q1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"Límites: [{limite_inferior:.1f}, {limite_superior:.1f}]")
print(f"Outliers: {df[(df['ventas'] < limite_inferior) | (df['ventas'] > limite_superior)]['ventas'].values}")`,
        explanation: 'Usamos el rango intercuartílico para identificar valores extremos en ventas.',
        hints: ['quantile(0.25) retorna Q1', 'quantile(0.75) retorna Q3', 'IQR = Q3 - Q1'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '3.1-ch',
    title: 'Reto: Limpieza completa',
    description: 'Dado un dataset de pacientes con edades faltantes, valores extremos en presión arterial y registros duplicados, realiza una limpieza completa y justifica cada decisión.',
    language: 'python',
    codeTemplate: `import pandas as pd
import numpy as np

# Dataset de pacientes
df = pd.DataFrame({
    'edad': [25, 30, np.nan, 45, 25, 200, 35, np.nan, 28, 42],
    'presion': [120, 130, 115, np.nan, 130, 125, 110, 140, 135, 999],
    'genero': ['M', 'F', 'M', 'F', 'M', 'F', 'M', 'F', 'M', 'F'],
    'diagnostico': ['sano', 'hipertension', 'sano', 'diabetes', 'sano', 'sano', 'sano', 'hipertension', 'sano', 'sano']
})

# Tu código aquí:
# 1. Identifica problemas
# 2. Justifica cada decisión
# 3. Limpia el dataset
# 4. Verifica el resultado`,
    expectedApproach: 'Identificar faltantes en edad, outliers en presión, duplicados. Justificar imputación o eliminación.',
    evaluationCriteria: [
      'Identificación correcta de todos los problemas',
      'Justificación clara de cada decisión',
      'Código limpio y documentado',
      'Resultado verificable',
    ],
    hints: [
      'Identifica problemas con df.isnull().sum() para faltantes, y busca valores atípicos con df.describe() (edad=200 y presion=999 son sospechosos)',
      'Para la edad faltante, justifica: imputar con la media/mediana es razonable para datos numéricos con pocos faltantes',
      'Para presión=999: es un outlier claro (la presión normal es 80-180). Elimínalo o reemplázalo con la mediana',
      'Usa df.drop_duplicates() para eliminar duplicados y df[(df["presion"] < 200)] para filtrar outliers',
      'Documenta cada paso con comentarios: # Problema: edad=200 es imposible → Acción: eliminar fila',
    ],
  },
  assessment: {
    id: '3.1-assess',
    passingScore: 70,
    questions: [
      {
        id: '3.1-q1',
        type: 'multiple-choice',
        text: '¿Qué porcentaje de faltantes generalmente justifica eliminar una columna?',
        options: [
          { id: 'a', text: 'Más del 10%' },
          { id: 'b', text: 'Más del 30%' },
          { id: 'c', text: 'Más del 50%' },
          { id: 'd', text: 'Cualquier porcentaje' },
        ],
        correctAnswer: 'c',
        explanation: 'No hay una regla absoluta, pero generalmente >50% de faltantes hace que la columna no confiable para imputación.',
        conceptLinked: 'Datos faltantes',
        difficulty: 'easy',
      },
      {
        id: '3.1-q2',
        type: 'interpretation',
        text: 'Si Q1=25, Q3=75, IQR=50, ¿cuál es el límite superior para detectar outliers con Tukey?',
        options: [
          { id: 'a', text: '100' },
          { id: 'b', text: '125' },
          { id: 'c', text: '150' },
          { id: 'd', text: '200' },
        ],
        correctAnswer: 'c',
        explanation: 'Límite superior = Q3 + 1.5·IQR = 75 + 1.5·50 = 75 + 75 = 150.',
        conceptLinked: 'Regla de Tukey',
        difficulty: 'easy',
      },
      {
        id: '3.1-q3',
        type: 'multiple-choice',
        text: '¿Cuándo NO debes eliminar un outlier aunque sea extremo?',
        options: [
          { id: 'a', text: 'Cuando el dataset es pequeño' },
          { id: 'b', text: 'Cuando representa un evento real importante (ej: fraude)' },
          { id: 'c', text: 'Cuando hay muchos outliers' },
          { id: 'd', text: 'Siempre se deben eliminar' },
        ],
        correctAnswer: 'b',
        explanation: 'Los outliers pueden ser los datos más importantes. Un fraude o una emergencia médica son valores extremos legítimos.',
        conceptLinked: 'Valores atípicos',
        difficulty: 'medium',
      },
      {
        id: '3.1-q4',
        type: 'numeric',
        text: 'Si tienes 1000 filas y 350 tienen al menos un faltante, ¿qué porcentaje del dataset tiene faltantes?',
        correctAnswer: '35',
        explanation: '350/1000 × 100 = 35%.',
        conceptLinked: 'Cuantificación de faltantes',
        difficulty: 'easy',
      },
      {
        id: '3.1-q5',
        type: 'multiple-choice',
        text: '¿Cuál es la diferencia entre imputar con media vs. mediana?',
        options: [
          { id: 'a', text: 'No hay diferencia' },
          { id: 'b', text: 'La media es más robusta a outliers' },
          { id: 'c', text: 'La mediana es más robusta a outliers' },
          { id: 'd', text: 'Solo la media funciona para datos categóricos' },
        ],
        correctAnswer: 'c',
        explanation: 'La mediana no se afecta por valores extremos, mientras que la media sí. Por eso se recomienda mediana cuando hay outliers.',
        conceptLinked: 'Imputación',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Limpieza de datos', 'Datos faltantes', 'Outliers', 'Calidad de datos'],
};
