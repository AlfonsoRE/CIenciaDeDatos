import type { Lesson } from '@/types/course';

export const LESSON_2_1: Lesson = {
  id: '2.1',
  code: '2.1',
  title: 'Estadística aplicada a Ciencia de Datos',
  objectives: [
    'Explicar el papel de la estadística en CD',
    'Diferenciar estadística descriptiva e inferencial',
    'Identificar preguntas estadísticas en problemas reales',
  ],
  theory: [
    {
      id: '2.1-t1',
      type: 'text',
      title: 'La estadística como base de la CD',
      content: 'La estadística proporciona las bases para el análisis, interpretación y toma de decisiones. Permite generalizar desde muestras, cuantificar incertidumbre y validar hallazgos con evidencia.',
    },
    {
      id: '2.1-t2',
      type: 'text',
      title: 'Descriptiva vs Inferencial',
      content: 'Estadística descriptiva: resume y describe datos (medias, gráficas). Estadística inferencial: saca conclusiones sobre una población a partir de una muestra (pruebas de hipótesis, intervalos de confianza).',
    },
    {
      id: '2.1-t3',
      type: 'list',
      title: 'Preguntas típicas de CD que usan estadística',
      items: [
        '¿Cuántos clientes perdimos el mes pasado? (descriptiva)',
        '¿La campaña de marketing tuvo efecto? (inferencial)',
        '¿Cuál es el rango de edades de nuestros usuarios? (descriptiva)',
        '¿Los hombres gastan más que las mujeres? (inferencial)',
      ],
    },
  ],
  visualExamples: [
    {
      id: '2.1-v1',
      type: 'diagram',
      title: 'Mapa de la estadistica en CD',
      description: 'Diagrama que muestra como la estadistica se conecta con todas las areas de la CD.',
      interactive: false,
      items: [
        { label: 'Estadística descriptiva', detail: 'Resume y describe las características principales de los datos.', color: 'primary' },
        { label: 'Estadística inferencial', detail: 'Generaliza conclusiones de una muestra a toda la población.', color: 'warning' },
        { label: 'Pruebas de hipótesis', detail: 'Valida si un efecto observado es real o producto del azar.', color: 'success' },
        { label: 'Diseño de experimentos', detail: 'Controla variables para establecer causalidad.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '2.1-a1',
      type: 'multiple-choice',
      title: '¿Descriptiva o inferencial?',
      question: 'Quieres saber si el promedio de gasto de tus clientes es diferente al de la competencia. ¿Qué rama usas?',
      options: [
        { id: 'a', text: 'Estadística descriptiva' },
        { id: 'b', text: 'Estadística inferencial' },
        { id: 'c', text: 'Ninguna' },
        { id: 'd', text: 'Machine Learning' },
      ],
      correctAnswer: 'b',
      explanation: 'Comparar poblaciones requiere inferencia estadística (pruebas de hipótesis).',
      conceptLinked: 'Descriptiva vs Inferencial',
    },
  ],
  guidedPractice: {
    id: '2.1-gp',
    title: 'Identificar enfoque estadístico',
    objective: 'Clasificar problemas de CD en descriptiva o inferencial',
    steps: [
      {
        id: '2.1-gp-1',
        instruction: 'Clasifica cada problema.',
        codeTemplate: `# Clasificación de problemas estadísticos
problemas = {
    "¿Cuántos productos se vendieron en enero?": "Descriptiva",
    "¿El cambio de precio aumentó las ventas?": "Inferencial",
    "¿Cuál es la distribución de edades?": "Descriptiva",
    "¿Los clientes nuevos gastan más que los antiguos?": "Inferencial",
    "¿Cuántos tickets promedio hay por día?": "Descriptiva",
    "¿La ubicación afecta las ventas?": "Inferencial",
    "¿Cuál es el producto más vendido?": "Descriptiva",
    "¿El-color del logo influye en conversiones?": "Inferencial"
}

for problema, tipo in problemas.items():
    simbolo = "📊" if tipo == "Descriptiva" else "🔬"
    print(f"{simbolo} {tipo}: {problema}")

print("\\nRegla: Descriptiva = RESUMEN datos existentes")
print("        Inferencial = GENERALIZAR a una población")`,
        explanation: 'La descriptiva resume; la infiere y generaliza.',
        hints: ['Descriptiva = "qué pasó"', 'Inferencial = "qué va a pasar" o "por qué"'],
      },
      {
        id: '2.1-gp-2',
        instruction: 'Extrae estadísticas descriptivas de un dataset.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 100

# Datos de ventas de una tienda
ventas = pd.DataFrame({
    'monto': np.random.lognormal(6, 1, n).round(2),
    'cantidad': np.random.poisson(3, n) + 1,
    'canal': np.random.choice(['Online', 'Tienda'], n, p=[0.6, 0.4])
})

print("=== ESTADÍSTICAS DESCRIPTIVAS ===")
print("\\n--- Variables numéricas ---")
print(ventas[['monto', 'cantidad']].describe().round(2))

print("\\n--- Variable categórica ---")
print(ventas['canal'].value_counts())
print(f"\\nProporción Online: {ventas['canal'].value_counts(normalize=True)['Online']:.1%}")

print("\\n--- Resumen ejecutivo ---")
print(f"Total facturado: {ventas['monto'].sum():,.2f} pesos")
print(f"Ticket promedio: {ventas['monto'].mean():,.2f} pesos")
print(f"Mediana de monto: {ventas['monto'].median():,.2f} pesos")`,
        explanation: 'El describe() de pandas resume automáticamente las estadísticas clave.',
        hints: ['describe() calcula media, mediana, cuartiles, min, max', 'value_counts() frecuencia de categorías'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '2.1-ch',
    title: 'Análisis de caso',
    description: 'Dado un escenario de negocio, identifica qué preguntas estadísticas hacer.',
    language: 'python',
    codeTemplate: `# Reto: Análisis de caso
# Escenario: Una tienda online quiere aumentar ventas
# Datos: 1000 transacciones con precio, cantidad, canal, descuento, satisfacción
# Identifica:
# 1. 3 preguntas descriptivas
# 2. 3 preguntas inferenciales
# 3. Qué tipo de análisis harías para cada una`,
    expectedApproach: 'Preguntas claras separadas en descriptivas e inferenciales.',
    evaluationCriteria: ['Preguntas relevantes', 'Correcta clasificación', 'Análisis viable'],
  },
  assessment: {
    id: '2.1-assess',
    passingScore: 70,
    questions: [
      {
        id: '2.1-q1',
        type: 'multiple-choice',
        text: '¿Qué hace la estadística descriptiva?',
        options: [
          { id: 'a', text: 'Predice el futuro' },
          { id: 'b', text: 'Resume y describe los datos existentes' },
          { id: 'c', text: 'Crea bases de datos' },
          { id: 'd', text: 'Programa algoritmos' },
        ],
        correctAnswer: 'b',
        explanation: 'La estadística descriptiva resume datos con medias, gráficas, frecuencias.',
        conceptLinked: 'Estadística descriptiva',
        difficulty: 'easy',
      },
      {
        id: '2.1-q2',
        type: 'multiple-choice',
        text: '¿Qué hace la estadística inferencial?',
        options: [
          { id: 'a', text: 'Resume datos' },
          { id: 'b', text: 'Crea gráficas' },
          { id: 'c', text: 'Generaliza conclusiones de una muestra a la población' },
          { id: 'd', text: 'Limpia datos' },
        ],
        correctAnswer: 'c',
        explanation: 'La inferencia saca conclusiones sobre una población usando una muestra.',
        conceptLinked: 'Estadística inferencial',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Pensamiento estadístico', 'Descriptiva', 'Inferencial', 'Formulación de preguntas'],
};
