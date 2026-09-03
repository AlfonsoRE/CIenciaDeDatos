import type { Lesson } from '@/types/course';

export const LESSON_1_1: Lesson = {
  id: '1.1',
  code: '1.1',
  title: 'Conceptos clave de Ciencia de Datos',
  objectives: [
    'Definir qué es la Ciencia de Datos',
    'Describir los objetivos de la disciplina',
    'Explicar el ciclo de vida de un proyecto de Ciencia de Datos',
  ],
  theory: [
    {
      id: '1.1-t1',
      type: 'text',
      title: '¿Qué es Ciencia de Datos?',
      content: 'La Ciencia de Datos es un campo interdisciplinario que utiliza métodos científicos, procesos, algoritmos y sistemas para obtener conocimiento y extraer información de datos estructurados y no estructurados. Combina estadística, matemáticas, programación y conocimiento del dominio.',
    },
    {
      id: '1.1-t2',
      type: 'list',
      title: 'Objetivos principales',
      items: [
        'Descubrir patrones ocultos en los datos',
        'Generar conocimiento accionable',
        'Apoyar la toma de decisiones basada en evidencia',
        'Automatizar procesos mediante modelos predictivos',
      ],
    },
    {
      id: '1.1-t3',
      type: 'text',
      title: 'Ciclo de vida de un proyecto',
      content: 'Un proyecto sigue estas fases: 1) Definición del problema, 2) Recopilación de datos, 3) Limpieza y preparación, 4) Análisis exploratorio, 5) Modelado, 6) Evaluación, 7) Despliegue, 8) Monitoreo.',
    },
    {
      id: '1.1-t4',
      type: 'warning',
      title: 'El 80/20 de la Ciencia de Datos',
      content: 'Aproximadamente el 80% del tiempo se dedica a limpiar y preparar datos. El 20% restante es modelado y análisis. La preparación de datos es la etapa más crítica y frecuentemente subestimada.',
    },
  ],
  visualExamples: [
    {
      id: '1.1-v1',
      type: 'diagram',
      title: 'El ciclo de vida de la Ciencia de Datos',
      description: 'Diagrama de las 8 fases del ciclo de vida y sus entregables.',
      interactive: false,
      items: [
        { label: 'Definición del problema', detail: 'Identificar el objetivo del negocio y las preguntas clave.', color: 'primary' },
        { label: 'Recolección de datos', detail: 'Obtener datos de fuentes internas y externas.', color: 'primary' },
        { label: 'Limpieza y preparación', detail: 'Tratar valores faltantes, outliers y transformar.', color: 'warning' },
        { label: 'Análisis exploratorio (EDA)', detail: 'Visualizar patrones, distribuciones y correlaciones.', color: 'warning' },
        { label: 'Modelado', detail: 'Aplicar algoritmos de ML según el tipo de problema.', color: 'success' },
        { label: 'Evaluación', detail: 'Validar métricas: accuracy, RMSE, F1, AUC.', color: 'success' },
        { label: 'Despliegue', detail: 'Integrar el modelo en producción (API, dashboard).', color: 'danger' },
        { label: 'Monitoreo', detail: 'Detectar drift y reentrenar periódicamente.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '1.1-a1',
      type: 'multiple-choice',
      title: '¿Qué es CD?',
      question: '¿Cuál es el objetivo PRINCIPAL de la Ciencia de Datos?',
      options: [
        { id: 'a', text: 'Escribir código perfecto' },
        { id: 'b', text: 'Extraer conocimiento accionable de los datos' },
        { id: 'c', text: 'Crear bases de datos' },
        { id: 'd', text: 'Diseñar páginas web' },
      ],
      correctAnswer: 'b',
      explanation: 'La CD busca transformar datos en conocimiento que apoye la toma de decisiones.',
      conceptLinked: 'Definición de CD',
    },
    {
      id: '1.1-a2',
      type: 'multiple-choice',
      title: 'Fases del ciclo',
      question: '¿Cuál es la fase que usualmente consume MÁS tiempo en un proyecto de CD?',
      options: [
        { id: 'a', text: 'Modelado' },
        { id: 'b', text: 'Despliegue' },
        { id: 'c', text: 'Limpieza y preparación de datos' },
        { id: 'd', text: 'Evaluación' },
      ],
      correctAnswer: 'c',
      explanation: 'La limpieza y preparación consume ~80% del tiempo del proyecto.',
      conceptLinked: 'Ciclo de vida',
    },
  ],
  guidedPractice: {
    id: '1.1-gp',
    title: 'Explorar el concepto con Python',
    objective: 'Usar Python para explorar la definición de Ciencia de Datos',
    steps: [
      {
        id: '1.1-gp-1',
        instruction: 'Investiga y muestra las áreas que componen la Ciencia de Datos.',
        codeTemplate: `# Las 5 áreas fundamentales de la Ciencia de Datos
areas = {
    "Estadística": "Base matemática para inferir conclusionses de datos",
    "Programación": "Herramientas para manipular y analizar datos (Python, R)",
    "Machine Learning": "Algoritmos que aprenden de los datos",
    "Conocimiento del dominio": "Contexto del problema a resolver",
    "Comunicación": "Presentar hallazgos de forma clara y accionable"
}

for area, descripcion in areas.items():
    print(f"▸ {area}: {descripcion}")

print("\\nIntersección: donde se superponen estas áreas nace la Ciencia de Datos")`,
        explanation: 'La CD es la intersección de estas 5 disciplinas.',
        hints: ['Cada área aporta algo único', 'Sin conocimiento del dominio, los modelos no tienen contexto'],
      },
      {
        id: '1.1-gp-2',
        instruction: 'Simula un proyecto pequeño paso a paso.',
        codeTemplate: `import pandas as pd
import numpy as np

# FASE 1: Definición del problema
problema = "Predecir si un estudiante aprobará el curso"
print(f"Problema: {problema}")

# FASE 2: Datos simulados
np.random.seed(42)
n = 50
df = pd.DataFrame({
    'horas_estudio': np.random.exponential(5, n).round(1),
    'asistencia_pct': np.random.uniform(50, 100, n).round(0),
    'tareas_entregadas': np.random.randint(0, 11, n)
})

# Variable objetivo basada en las features
prob_aprobar = 1 / (1 + np.exp(-(0.3*df['horas_estudio'] + 0.02*df['asistencia_pct'] + 0.15*df['tareas_entregadas'] - 3)))
df['aprueba'] = (np.random.random(n) < prob_aprobar).astype(int)

print(f"\\nFASE 3 - Datos generados: {len(df)} registros")
print(df.head())
print(f"\\nFASE 4 - Tasa de aprobación: {df['aprueba'].mean():.1%}")`,
        explanation: 'Simulamos un proyecto completo de CD con datos ficticios.',
        hints: ['np.random.exponential genera distribución exponencial', 'La función sigmoide modela probabilidades'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.1-ch',
    title: 'Mapa conceptual del ciclo de vida',
    description: 'Crea un diagrama en Python que muestre las 8 fases del ciclo de vida de la CD con sus entregables.',
    language: 'python',
    codeTemplate: `# Reto: Visualiza el ciclo de vida de la Ciencia de Datos
# El diagrama debe mostrar las 8 fases y al menos 2 entregables por fase
# Usa matplotlib para crear un diagrama de flujo o circular`,
    expectedApproach: 'matplotlib con flechas o diagrama circular.',
    evaluationCriteria: ['8 fases presentes', 'Entregables claros', 'Diseño profesional'],
    hints: [
      'Identifica las 8 fases del ciclo de vida antes de empezar a programar: definición, adquisición, limpieza, exploración, modelado, evaluación, implementación y mantenimiento',
      'Usa matplotlib.pyplot para crear cajas o elipses representando cada fase, y conectalas con plt.annotate o plt.arrow',
      'Para un diagrama circular, usa plt.Circle y ax.add_patch en un bucle que distribuya las fases en 360 grados',
      'Incluye al menos 2 entregables por fase como texto dentro o al lado de cada caja (ej: "EDA Report", "Modelo entrenado")',
      'Personaliza colores con plt.cm.Set3 y usa ax.set_aspect("equal") para que el diagrama se vea proporcional',
    ],
  },
  assessment: {
    id: '1.1-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.1-q1',
        type: 'multiple-choice',
        text: '¿Qué NO es parte de la Ciencia de Datos?',
        options: [
          { id: 'a', text: 'Estadística' },
          { id: 'b', text: 'Machine Learning' },
          { id: 'c', text: 'Diseño de interfaces web' },
          { id: 'd', text: 'Comunicación de resultados' },
        ],
        correctAnswer: 'c',
        explanation: 'El diseño de interfaces web no es parte directa de la CD.',
        conceptLinked: 'Definición de CD',
        difficulty: 'easy',
      },
      {
        id: '1.1-q2',
        type: 'multiple-choice',
        text: '¿Cuánto tiempo consume la limpieza de datos en un proyecto típico?',
        options: [
          { id: 'a', text: '10%' },
          { id: 'b', text: '50%' },
          { id: 'c', text: '80%' },
          { id: 'd', text: '20%' },
        ],
        correctAnswer: 'c',
        explanation: 'El 80% del tiempo se dedica a limpiar y preparar datos.',
        conceptLinked: 'Ciclo de vida',
        difficulty: 'easy',
      },
      {
        id: '1.1-q3',
        type: 'multiple-choice',
        text: '¿Cuál de los siguientes es un objetivo principal de la Ciencia de Datos según la lección?',
        options: [
          { id: 'a', text: 'Automatizar procesos mediante modelos predictivos' },
          { id: 'b', text: 'Reemplazar completamente el juicio humano' },
          { id: 'c', text: 'Vender más licencias de software' },
          { id: 'd', text: 'Reducir el número de programadores' },
        ],
        correctAnswer: 'a',
        explanation: 'Uno de los objetivos principales de la CD es automatizar procesos mediante modelos predictivos, además de descubrir patrones y apoyar decisiones.',
        conceptLinked: 'Objetivos',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Definición de CD', 'Ciclo de vida', 'Objetivos'],
};
