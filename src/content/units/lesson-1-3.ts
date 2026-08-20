import type { Lesson } from '@/types/course';

export const LESSON_1_3: Lesson = {
  id: '1.3',
  code: '1.3',
  title: 'Tipos de datos',
  objectives: [
    'Clasificar datos en estructurados, semiestructurados y no estructurados',
    'Identificar formatos comunes de cada tipo',
    'Evaluar ventajas y desventajas de cada formato',
  ],
  theory: [
    {
      id: '1.3-t1',
      type: 'text',
      title: 'Los tres tipos de datos',
      content: 'Los datos se clasifican por su estructura: Estructurados (tablas con esquema fijo como CSV, SQL), Semiestructurados (JSON, XML con etiquetas pero no tabulares), y No estructurados (texto, imágenes, video, audio sin formato predefinido).',
    },
    {
      id: '1.3-t2',
      type: 'list',
      title: 'Ejemplos por tipo',
      items: [
        'Estructurados: hojas de cálculo, bases de datos SQL, CSV',
        'Semiestructurados: JSON de APIs, correos electrónicos, logs',
        'No estructurados: redes sociales, imágenes médicas, grabaciones',
      ],
    },
    {
      id: '1.3-t3',
      type: 'text',
      title: 'El problema del 80/20',
      content: 'El 80% de los datos del mundo son no estructurados. Sin embargo, la mayoría de las herramientas de CD trabajan mejor con datos estructurados. Por eso la limpieza y transformación es tan importante.',
    },
  ],
  visualExamples: [
    {
      id: '1.3-v1',
      type: 'comparison',
      title: 'Estructurado vs No estructurado',
      description: 'Comparación visual entre datos en tabla vs datos en texto libre.',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '1.3-a1',
      type: 'classification',
      title: 'Clasificar fuentes',
      question: '¿Qué tipo de dato es un tweet de Twitter?',
      options: [
        { id: 'a', text: 'Estructurado' },
        { id: 'b', text: 'Semiestructurado' },
        { id: 'c', text: 'No estructurado' },
      ],
      correctAnswer: 'c',
      explanation: 'Un tweet es texto libre, sin esquema predefinido. Es un dato no estructurado.',
      conceptLinked: 'Tipos de datos',
    },
  ],
  guidedPractice: {
    id: '1.3-gp',
    title: 'Explorar tipos de datos con Python',
    objective: 'Cargar y analizar datos de diferentes formatos',
    steps: [
      {
        id: '1.3-gp-1',
        instruction: 'Simula datos estructurados (CSV-like).',
        codeTemplate: `import pandas as pd
import numpy as np

# Datos estructurados: tabla con esquema fijo
df = pd.DataFrame({
    'id': range(1, 6),
    'nombre': ['Ana', 'Luis', 'María', 'Pedro', 'Sofía'],
    'edad': [22, 35, 28, 41, 19],
    'ciudad': ['CDMX', 'GDL', 'MTY', 'CDMX', 'OAX'],
    'ingreso': [15000, 35000, 22000, 48000, 12000]
})

print("=== DATOS ESTRUCTURADOS ===")
print(f"Filas: {len(df)}, Columnas: {len(df.columns)}")
print(f"Esquema: {dict(df.dtypes)}")
print(df)
print("\\nVentajas: fáciles de query, analizar, modelar")
print("Desventajas: requieren limpieza previa, pierden contexto")`,
        explanation: 'Los datos estructurados son tablas con tipos definidos.',
        hints: ['DataFrame es la estructura principal de pandas', 'dtypes muestra el tipo de cada columna'],
      },
      {
        id: '1.3-gp-2',
        instruction: 'Simula datos semiestructurados (JSON).',
        codeTemplate: `import json

# Datos semiestructurados: JSON de una API
datos_json = {
    "usuario": {
        "id": 123,
        "nombre": "Carlos",
        "preferencias": {
            "tema": "tecnología",
            "frecuencia": "diaria",
            "idiomas": ["es", "en"]
        },
        "actividad": [
            {"fecha": "2025-01-15", "accion": "login"},
            {"fecha": "2025-01-15", "accion": "compra", "monto": 599.99},
            {"fecha": "2025-01-16", "accion": "login"}
        ]
    }
}

print("=== DATOS SEMIESTRUCTURADOS ===")
print(json.dumps(datos_json, indent=2, ensure_ascii=False))
print("\\nCaracterísticas:")
print("- Tiene estructura pero no es tabular")
print("- Permite jerarquías y listas anidadas")
print("- Flexible pero más difícil de analizar directamente")`,
        explanation: 'JSON es el formato semiestructurado más común en APIs web.',
        hints: ['json.dumps imprime JSON formateado', 'Los datos anidados requieren aplanar para análisis'],
      },
      {
        id: '1.3-gp-3',
        instruction: 'Simula datos no estructurados (texto).',
        codeTemplate: `# Datos no estructurados: texto libre
reviews = [
    "¡Excelente producto! Llegó rápido y funciona perfecto. 10/10",
    "Muy decepcionante. Se rompió después de una semana. No lo recomiendo.",
    "Buen precio pero la calidad podría ser mejor. Regular.",
    "¡LO MEJOR QUE HE COMPRADO! Mi gato lo ama 😻",
    "Envío lento pero el producto está bien. 3 estrellas."
]

print("=== DATOS NO ESTRUCTURADOS ===")
print("Ejemplo: reviews de un producto\\n")
for i, review in enumerate(reviews, 1):
    print(f"Review {i}: {review}")

print("\\n\\nCaracterísticas:")
print("- Texto libre, sin formato predefinido")
print("- Requieren NLP para extraer información")
print("- Volumen enorme (redes sociales, correos, etc.)")

print("\\nPosibles análisis:")
print("- Sentimiento: positivo/negativo/neutro")
print("- Temas frecuentes: calidad, precio, envío")
print("- Entidades: producto, marca, ubicación")`,
        explanation: 'El texto libre es el tipo de dato no estructurado más abundante.',
        hints: ['NLP = Procesamiento de Lenguaje Natural', 'Los emojis y mayúsculas dan pistas de sentimiento'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.3-ch',
    title: 'Clasificar 10 fuentes de datos',
    description: 'Clasifica estas fuentes como estructurado, semiestructurado o no estructurado.',
    language: 'python',
    codeTemplate: `# Reto: Clasifica estas fuentes de datos
fuentes = [
    "Base de datos de clientes (SQL)",
    "Correo electrónico completo",
    "Archivo CSV de ventas",
    "Tweet de Twitter",
    "Respuesta de API en JSON",
    "Imagen de resonancia magnética",
    "Hoja de cálculo de Excel",
    "Log de servidor web",
    "Grabación de reunión (audio)",
    "Archivo de transacciones bancarias"
]
# Tu código: clasifica cada fuente y explica por qué`,
    expectedApproach: 'Clasificación con justificación para cada fuente.',
    evaluationCriteria: ['Clasificación correcta', 'Justificación clara'],
  },
  assessment: {
    id: '1.3-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.3-q1',
        type: 'multiple-choice',
        text: '¿Un archivo CSV es datos estructurados o no?',
        options: [
          { id: 'a', text: 'Estructurados' },
          { id: 'b', text: 'Semiestructurados' },
          { id: 'c', text: 'No estructurados' },
          { id: 'd', text: 'Depende del contenido' },
        ],
        correctAnswer: 'a',
        explanation: 'CSV es una tabla con esquema fijo: datos estructurados.',
        conceptLinked: 'Tipos de datos',
        difficulty: 'easy',
      },
      {
        id: '1.3-q2',
        type: 'multiple-choice',
        text: '¿Qué porcentaje aproximado de datos mundiales son no estructurados?',
        options: [
          { id: 'a', text: '20%' },
          { id: 'b', text: '50%' },
          { id: 'c', text: '80%' },
          { id: 'd', text: '10%' },
        ],
        correctAnswer: 'c',
        explanation: 'El 80% de los datos del mundo son no estructurados (texto, imágenes, video).',
        conceptLinked: 'Volumen de datos',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Clasificación de datos', 'Formatos', 'Estructuras'],
};
