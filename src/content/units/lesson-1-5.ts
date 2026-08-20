import type { Lesson } from '@/types/course';

export const LESSON_1_5: Lesson = {
  id: '1.5',
  code: '1.5',
  title: 'Herramientas y entornos',
  objectives: [
    'Identificar las herramientas principales de CD',
    'Comparar Python vs R para diferentes tareas',
    'Configurar un entorno básico de trabajo',
  ],
  theory: [
    {
      id: '1.5-t1',
      type: 'text',
      title: 'El ecosistema de herramientas',
      content: 'La Ciencia de Datos usa un ecosistema diverso: lenguajes de programación (Python, R, SQL), entornos (Jupyter, VS Code), librerías (pandas, scikit-learn), y plataformas (Databricks, Google Colab).',
    },
    {
      id: '1.5-t2',
      type: 'list',
      title: 'Python: el estándar de la industria',
      items: [
        'pandas: manipulación de datos tabulares',
        'numpy: computación numérica',
        'matplotlib/seaborn: visualización',
        'scikit-learn: machine learning',
        'tensorflow/pytorch: deep learning',
      ],
    },
    {
      id: '1.5-t3',
      type: 'text',
      title: 'Python vs R',
      content: 'Python es más versátil (CD + ingeniería + web). R es más especializado en estadística y visualización académica. La industria favorece Python; la academia usa ambos.',
    },
  ],
  visualExamples: [
    {
      id: '1.5-v1',
      type: 'comparison',
      title: 'Python vs R vs SQL',
      description: 'Comparación de fortalezas de cada herramienta.',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '1.5-a1',
      type: 'multiple-choice',
      title: '¿Cuándo usar qué?',
      question: 'Necesitas hacer un modelo de predicción de ventas. ¿Qué herramienta es más adecuada?',
      options: [
        { id: 'a', text: 'Excel' },
        { id: 'b', text: 'Python con scikit-learn' },
        { id: 'c', text: 'PowerPoint' },
        { id: 'd', text: 'Calculadora' },
      ],
      correctAnswer: 'b',
      explanation: 'Python con scikit-learn es el estándar para modelos de ML en la industria.',
      conceptLinked: 'Selección de herramientas',
    },
  ],
  guidedPractice: {
    id: '1.5-gp',
    title: 'Configurar entorno de Python',
    objective: 'Verificar que las herramientas principales estén instaladas',
    steps: [
      {
        id: '1.5-gp-1',
        instruction: 'Verifica las versiones de las librerías principales.',
        codeTemplate: `import sys
import pandas as pd
import numpy as np
import matplotlib
import sklearn

print("=== ENTORNO DE CIENCIA DE DATOS ===")
print(f"Python: {sys.version.split()[0]}")
print(f"pandas: {pd.__version__}")
print(f"numpy: {np.__version__}")
print(f"matplotlib: {matplotlib.__version__}")
print(f"scikit-learn: {sklearn.__version__}")
print("\\n✓ Todas las librerías principales están instaladas")`,
        explanation: 'Verificar versiones asegura compatibilidad.',
        hints: ['sys.version da la versión de Python', '__version__ muestra la versión de cada librería'],
      },
      {
        id: '1.5-gp-2',
        instruction: 'Compara el tiempo de ejecución de operaciones.',
        codeTemplate: `import time

# Generar datos grandes
n = 1_000_000
data = np.random.randn(n)

# Método 1: loops de Python (lento)
start = time.time()
result_py = [x**2 for x in data[:10000]]
time_python = time.time() - start

# Método 2: numpy (rápido)
start = time.time()
result_np = data[:10000]**2
time_numpy = time.time() - start

print("=== RENDIMIENTO ===")
print(f"Loop Python: {time_python*1000:.2f} ms")
print(f"Numpy vectorizado: {time_numpy*1000:.4f} ms")
print(f"Numpy es {time_python/time_numpy:.0f}x más rápido")
print("\\nLección: siempre usa operaciones vectorizadas con numpy/pandas")`,
        explanation: 'Las operaciones vectorizadas de numpy son órdenes de magnitud más rápidas.',
        hints: ['time.time() mide tiempo', 'Vectorizar = operar sobre arrays completos'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '1.5-ch',
    title: 'Comparación Python vs R',
    description: 'Realiza la misma tarea (calcular media y crear gráfica) en Python y R.',
    language: 'python',
    codeTemplate: `# Reto: Compara Python y R
# Tarea: Calcular la media de 1000 números aleatorios y crear un histograma
# Hazlo en Python (usa este script) y luego en R (si tienes R instalado)
# ¿Cuál es más rápido de escribir? ¿Cuál produce mejor visualización?`,
    expectedApproach: 'Ambas implementaciones funcionales con comparación reflexiva.',
    evaluationCriteria: ['Ambos lenguajes funcionan', 'Comparación justa', 'Reflexión sobre diferencias'],
  },
  assessment: {
    id: '1.5-assess',
    passingScore: 70,
    questions: [
      {
        id: '1.5-q1',
        type: 'multiple-choice',
        text: '¿Qué librería de Python se usa para machine learning?',
        options: [
          { id: 'a', text: 'pandas' },
          { id: 'b', text: 'numpy' },
          { id: 'c', text: 'scikit-learn' },
          { id: 'd', text: 'matplotlib' },
        ],
        correctAnswer: 'c',
        explanation: 'scikit-learn es la librería principal de ML en Python.',
        conceptLinked: 'Herramientas de CD',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Herramientas', 'Python', 'R', 'Entornos'],
};
