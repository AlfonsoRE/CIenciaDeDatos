import type { Lesson } from '@/types/course';

export const LESSON_1_2: Lesson = {
  id: '1.2',
  code: '1.2',
  title: 'Ciencia de Datos, IA y Machine Learning',
  objectives: [
    'Diferenciar CD, IA y ML',
    'Explicar sus relaciones y aplicaciones',
    'Identificar cuándo usar cada enfoque',
  ],
  theory: [
    {
      id: '1.2-t1',
      type: 'text',
      title: 'Relación entre campos',
      content: 'La Inteligencia Artificial es el campo más amplio: máquinas que simulan inteligencia humana. El Aprendizaje Automático (ML) es un subconjunto de la IA que aprende de datos sin programación explícita. La Ciencia de Datos utiliza ML como herramienta, pero también incluye estadística, visualización y comunicación.',
    },
    {
      id: '1.2-t2',
      type: 'list',
      title: 'Ejemplos por campo',
      items: [
        'IA: asistentes de voz, coches autónomos, diagnóstico asistido',
        'ML: recomendación de Netflix, detección de spam, predicción de ventas',
        'CD: análisis de mercado, optimización de procesos, reportes ejecutivos',
      ],
    },
    {
      id: '1.2-t3',
      type: 'warning',
      title: 'No son lo mismo',
      content: 'Usar "IA" cuando realmente es un modelo de regresión lineal es un error común. La CD no siempre requiere ML. Un análisis estadístico simple puede ser más efectivo que un modelo complejo.',
    },
  ],
  visualExamples: [
    {
      id: '1.2-v1',
      type: 'diagram',
      title: 'Relación CD, IA, ML',
      description: 'Diagrama de conjuntos que muestra la relación jerárquica.',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '1.2-a1',
      type: 'multiple-choice',
      title: 'Clasificar el ejemplo',
      question: 'Un sistema que recomienda películas basándose en tu historial. ¿Qué campo es?',
      options: [
        { id: 'a', text: 'Solo Inteligencia Artificial' },
        { id: 'b', text: 'Machine Learning aplicado a Ciencia de Datos' },
        { id: 'c', text: 'Solo bases de datos' },
        { id: 'd', text: 'Diseño web' },
      ],
      correctAnswer: 'b',
      explanation: 'Netflix usa ML (aprendizaje de patrones) dentro de un proyecto de CD (entender preferencias del usuario).',
      conceptLinked: 'Relación CD/ML/IA',
    },
  ],
  guidedPractice: {
    id: '1.2-gp',
    title: 'Clasificar aplicaciones',
    objective: 'Clasificar 10 aplicaciones reales en CD, ML o IA',
    steps: [
      {
        id: '1.2-gp-1',
        instruction: 'Clasifica estas aplicaciones tecnológicas.',
        codeTemplate: `# Clasificación de aplicaciones tecnológicas
aplicaciones = {
    "ChatGPT": "IA (usa ML, pero es IA general)",
    "Filtro de spam de Gmail": "ML (clasificación de texto)",
    "Análisis de ventas trimestrales": "CD (análisis estadístico)",
    "Coche autónomo de Tesla": "IA (visión por computadora + ML)",
    "Predicción de demanda": "ML dentro de CD",
    "Reconocimiento facial": "IA (visión por computadora)",
    "Dashboard de KPIs": "CD (visualización)",
    "Alexa/Siri": "IA (procesamiento de lenguaje)",
    "Detección de fraude bancario": "ML dentro de CD",
    "Robot aspiradora": "IA (navegación autónoma)"
}

for app, clasificacion in aplicaciones.items():
    print(f"▸ {app}: {clasificacion}")`,
        explanation: 'Cada aplicación pertenece a un campo o combinación de campos.',
        hints: ['IA es el paraguas más amplio', 'ML es una herramienta que usa CD'],
      },
      {
        id: '1.2-gp-2',
        instruction: 'Decide qué enfoque usar para un problema dado.',
        codeTemplate: `# Problema: Predecir la demanda de un producto
problema = "Necesito saber cuántas unidades venderé el próximo mes"

enfoques = {
    "CD (solo estadística)": {
        "herramienta": "Promedio móvil, regresión simple",
        "cuando": "Datos históricos disponibles, relación lineal",
        "ejemplo": "Media de ventas últimos 12 meses"
    },
    "ML": {
        "herramienta": "Random Forest, XGBoost",
        "cuando": "Múltiples variables, patrones complejos",
        "ejemplo": "Incluir clima, promociones, competencia"
    },
    "IA": {
        "herramienta": "Redes neuronales, LSTM",
        "cuando": "Secuencias temporales largas, patrones no lineales",
        "ejemplo": "Serie temporal con estacionalidad compleja"
    }
}

print(f"Problema: {problema}\\n")
for enfoque, info in enfoques.items():
    print(f"{enfoque}:")
    print(f"  Herramienta: {info['herramienta']}")
    print(f"  Cuándo usar: {info['cuando']}")
    print(f"  Ejemplo: {info['ejemplo']}\\n")`,
        explanation: 'El enfoque adecuado depende de la complejidad del problema y los datos disponibles.',
        hints: ['No siempre se necesita ML complejo', 'Empieza simple y escala si es necesario'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.2-ch',
    title: 'Análisis comparativo',
    description: 'Encuentra un problema real y justifica qué enfoque usarías: CD, ML o IA.',
    language: 'python',
    codeTemplate: `# Reto: Analiza un problema real de tu entorno
# 1. Describe el problema
# 2. ¿Qué datos tendrías disponibles?
# 3. ¿Qué enfoque usarías y por qué?
# 4. ¿Qué herramientas específicas necesitarías?`,
    expectedApproach: 'Justificación clara del enfoque elegido con argumentos.',
    evaluationCriteria: ['Problema bien definido', 'Enfoque justificado', 'Herramientas adecuadas'],
  },
  assessment: {
    id: '1.2-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.2-q1',
        type: 'multiple-choice',
        text: '¿Cuál es la diferencia principal entre IA y ML?',
        options: [
          { id: 'a', text: 'No hay diferencia' },
          { id: 'b', text: 'ML es un subconjunto de la IA' },
          { id: 'c', text: 'IA es un subconjunto del ML' },
          { id: 'd', text: 'Son campos opuestos' },
        ],
        correctAnswer: 'b',
        explanation: 'ML es una técnica dentro del campo más amplio de la IA.',
        conceptLinked: 'Relación IA/ML',
        difficulty: 'easy',
      },
      {
        id: '1.2-q2',
        type: 'multiple-choice',
        text: '¿Un dashboard de ventas con gráficas es CD, ML o IA?',
        options: [
          { id: 'a', text: 'IA' },
          { id: 'b', text: 'ML' },
          { id: 'c', text: 'CD (análisis y visualización)' },
          { id: 'd', text: 'Ninguno de los anteriores' },
        ],
        correctAnswer: 'c',
        explanation: 'Un dashboard es CD puro: análisis, visualización y comunicación de datos.',
        conceptLinked: 'Aplicaciones de CD',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Diferenciación CD/IA/ML', 'Selección de enfoque', 'Pensamiento crítico'],
};
