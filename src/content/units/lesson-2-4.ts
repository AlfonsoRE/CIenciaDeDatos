import type { Lesson } from '@/types/course';

export const LESSON_2_4: Lesson = {
  id: '2.4',
  code: '2.4',
  title: 'Probabilidad',
  objectives: [
    'Explicar los fundamentos de probabilidad',
    'Distinguir distribuciones discretas y continuas',
    'Calcular probabilidades con distribución binomial y Poisson',
    'Aplicar la regla de Bayes',
  ],
  theory: [
    {
      id: '2.4-t1',
      type: 'text',
      title: 'Fundamentos de probabilidad',
      content: 'La probabilidad mide la probabilidad de que ocurra un evento. Va de 0 (imposible) a 1 (seguro). P(A) = casos favorables / casos totales.',
    },
    {
      id: '2.4-t2',
      type: 'list',
      title: 'Reglas básicas',
      items: [
        'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
        'P(A | B) = P(A ∩ B) / P(B)  (probabilidad condicional)',
        'Eventos mutuamente excluyentes: P(A ∩ B) = 0',
        'Eventos independientes: P(A ∩ B) = P(A) · P(B)',
      ],
    },
    {
      id: '2.4-t3',
      type: 'text',
      title: 'Distribución Binomial',
      content: 'Modela el número de éxitos en n ensayos independientes con probabilidad p de éxito. Ejemplos: caras en n lanzamientos de moneda, defectos en n productos.',
    },
    {
      id: '2.4-t4',
      type: 'formula',
      title: 'Función de masa binomial',
      content: 'Probabilidad de exactamente k éxitos en n ensayos:',
      formula: 'P(X = k) = C(n,k) · p^k · (1-p)^(n-k)',
    },
    {
      id: '2.4-t5',
      type: 'text',
      title: 'Distribución de Poisson',
      content: 'Modela el número de eventos en un intervalo de tiempo o espacio. Ejemplos: llamadas por hora, accidentes por día, defectos por metro.',
    },
    {
      id: '2.4-t6',
      type: 'formula',
      title: 'Función de masa de Poisson',
      content: 'Probabilidad de k eventos cuando el promedio es λ:',
      formula: 'P(X = k) = (λ^k · e^(-λ)) / k!',
    },
    {
      id: '2.4-t7',
      type: 'text',
      title: 'Teorema de Bayes',
      content: 'Permite actualizar probabilidades con nueva evidencia. P(A|B) = P(B|A)·P(A) / P(B). Fundamental para clasificadores bayesianos.',
    },
    {
      id: '2.4-t8',
      type: 'note',
      title: 'Distribución Normal como límite',
      content: 'La distribución binomial se aproxima a la normal cuando n es grande (n > 30) y p no es extremo. La Poisson se aproxima a la normal cuando λ es grande.',
    },
  ],
  visualExamples: [
    {
      id: '2.4-v1',
      type: 'simulation',
      title: 'Binomial interactiva',
      description: 'Modifica n (ensayos) y p (probabilidad) para ver como cambia la distribucion.',
      chartType: 'binomial',
      interactive: true,
      parameters: [
        { id: 'n', label: 'Ensayos (n)', min: 1, max: 30, step: 1, defaultValue: 10 },
        { id: 'p', label: 'Probabilidad (p)', min: 0.05, max: 0.95, step: 0.05, defaultValue: 0.5 },
      ],
      items: [
        { label: 'Distribución binomial', detail: 'Resultado de n ensayos independientes con probabilidad p.', color: 'primary' },
        { label: ' Distribución de Poisson', detail: 'Eventos raros en un intervalo de tiempo o espacio.', color: 'warning' },
        { label: 'Distribución normal', detail: 'Campana de Gauss: la más común en naturaleza.', color: 'success' },
        { label: 'Aplicación', detail: 'Fraudes, defectos de fabrica, llamadas a un call center.', color: 'danger' },
      ],
    },
  ],
    },
  ],
  activities: [
    {
      id: '2.4-a1',
      type: 'numeric',
      title: 'Binomial simple',
      question: 'Lanzas una moneda 5 veces. ¿Cuál es la probabilidad de obtener exactamente 3 caras?',
      correctAnswer: '0.3125',
      explanation: 'P(X=3) = C(5,3)·(0.5)³·(0.5)² = 10·0.125·0.25 = 0.3125.',
      conceptLinked: 'Distribución binomial',
    },
    {
      id: '2.4-a2',
      type: 'multiple-choice',
      title: 'Poisson o Binomial',
      question: 'El promedio de clientes por hora es 12. ¿Qué distribución modela el número de clientes en una hora?',
      options: [
        { id: 'a', text: 'Binomial' },
        { id: 'b', text: 'Poisson' },
        { id: 'c', text: 'Normal' },
        { id: 'd', text: 'Uniforme' },
      ],
      correctAnswer: 'b',
      explanation: 'Contamos eventos en un intervalo de tiempo con un promedio conocido → Poisson.',
      conceptLinked: 'Selección de distribuciones',
    },
  ],
  guidedPractice: {
    id: '2.4-gp',
    title: 'Simulaciones de probabilidad',
    objective: 'Simular distribuciones binomial y Poisson con Python',
    steps: [
      {
        id: '2.4-gp-1',
        instruction: 'Simula una distribución binomial y compara con la teórica.',
        codeTemplate: `import numpy as np
import matplotlib.pyplot as plt

# Parámetros
n, p = 10, 0.3  # 10 ensayos, probabilidad 0.3

# Simulación
simulaciones = np.random.binomial(n, p, size=10000)

# Distribución teórica
from scipy.stats import binom
k = np.arange(0, n+1)
teorica = binom.pmf(k, n, p)

# Gráfica
plt.figure(figsize=(10, 4))
plt.hist(simulaciones, bins=np.arange(-0.5, n+1.5, 1), 
         density=True, alpha=0.7, label='Simulada', edgecolor='black')
plt.plot(k, teorica, 'ro-', label='Teórica')
plt.xlabel('Éxitos')
plt.ylabel('Probabilidad')
plt.title(f'Binomial(n={n}, p={p})')
plt.legend()
plt.show()`,
        explanation: 'La simulación con 10,000 repeticiones se aproxima a la distribución teórica.',
        hints: ['np.random.binomial genera muestras', 'scipy.stats.binom calcula la PMF teórica'],
      },
      {
        id: '2.4-gp-2',
        instruction: 'Simula una distribución de Poisson.',
        codeTemplate: `from scipy.stats import poisson

lam = 5  # promedio de eventos

# Simulación
simulaciones = np.random.poisson(lam, size=10000)

# Teórica
k = np.arange(0, 15)
teorica = poisson.pmf(k, lam)

plt.figure(figsize=(10, 4))
plt.hist(simulaciones, bins=np.arange(-0.5, 15.5, 1),
         density=True, alpha=0.7, label='Simulada', edgecolor='black')
plt.plot(k, teorica, 'ro-', label='Teórica')
plt.xlabel('Eventos')
plt.ylabel('Probabilidad')
plt.title(f'Poisson(λ={lam})')
plt.legend()
plt.show()`,
        explanation: 'Poisson modela eventos en un intervalo. λ controla la frecuencia promedio.',
        hints: ['np.random.poisson genera muestras', 'poisson.pmf calcula la probabilidad teórica'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '2.4-ch',
    title: 'Reto: Análisis de call center',
    description: 'Un call center recibe 20 llamadas por hora. (a) P(recibir > 25 llamadas en una hora). (b) P(recibir exactamente 15). (c) Simula 1000 horas y compara.',
    language: 'python',
    codeTemplate: `from scipy.stats import poisson
import numpy as np

lam = 20

# (a) P(X > 25)
# P(X > 25) = 1 - P(X <= 25) = 1 - CDF(25)

# (b) P(X = 15)

# (c) Simulación`,
    expectedApproach: 'Usar 1-poison.cdf(25, lam) para (a), poisson.pmf(15, lam) para (b).',
    evaluationCriteria: ['Cálculos correctos', 'Uso apropiado de CDF/PMF', 'Comparación simulación vs teórica'],
  },
  assessment: {
    id: '2.4-assess',
    passingScore: 70,
    questions: [
      {
        id: '2.4-q1', type: 'multiple-choice', text: '¿Cuándo se usa la distribución de Poisson?',
        options: [
          { id: 'a', text: 'Para contar éxitos en n ensayos' },
          { id: 'b', text: 'Para contar eventos en un intervalo de tiempo/espacio' },
          { id: 'c', text: 'Para medir altura de personas' },
          { id: 'd', text: 'Para datos categóricos' },
        ],
        correctAnswer: 'b', explanation: 'Poisson modela eventos que ocurren a una tasa promedio conocida en un intervalo continuo.',
        conceptLinked: 'Poisson', difficulty: 'easy',
      },
      {
        id: '2.4-q2', type: 'numeric', text: 'Si X ~ Binomial(8, 0.25), ¿cuál es P(X=2)?',
        correctAnswer: '0.3115', explanation: 'P(X=2) = C(8,2)·(0.25)²·(0.75)⁶ = 28·0.0625·0.178 ≈ 0.3115.',
        conceptLinked: 'Binomial', difficulty: 'medium',
      },
      {
        id: '2.4-q3', type: 'multiple-choice', text: '¿Qué establece el Teorema de Bayes?',
        options: [
          { id: 'a', text: 'La suma de probabilidades es 1' },
          { id: 'b', text: 'Permite actualizar probabilidades con nueva evidencia' },
          { id: 'c', text: 'Los eventos independientes no afectan a otros' },
          { id: 'd', text: 'La distribución normal es simétrica' },
        ],
        correctAnswer: 'b', explanation: 'Bayes conecta P(A|B) con P(B|A), permitiendo actualizar creencias con datos.',
        conceptLinked: 'Bayes', difficulty: 'easy',
      },
    ],
  },
  competencies: ['Probabilidad', 'Distribución binomial', 'Poisson', 'Teorema de Bayes'],
};
