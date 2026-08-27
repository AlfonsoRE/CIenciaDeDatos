import type { Lesson } from '@/types/course';

export const LESSON_2_5: Lesson = {
  id: '2.5',
  code: '2.5',
  title: 'Estadística inferencial',
  objectives: [
    'Explicar el Teorema del Límite Central',
    'Calcular intervalos de confianza',
    'Realizar pruebas de hipótesis',
    'Interpretar p-values correctamente',
    'Distinguir error Tipo I y Tipo II',
  ],
  theory: [
    {
      id: '2.5-t1',
      type: 'text',
      title: 'Del sample a la población',
      content: 'La inferencia estadística permite generalizar desde una muestra hacia una población. Con muestras representativas, podemos hacer estimaciones y pruebas sobre el todo.',
    },
    {
      id: '2.5-t2',
      type: 'text',
      title: 'Teorema del Límite Central',
      content: 'La distribución de las medias muestrales se aproxima a una distribución normal, sin importar la distribución original, cuando el tamaño de muestra es grande (n > 30).',
    },
    {
      id: '2.5-t3',
      type: 'formula',
      title: 'Error estándar de la media',
      content: 'La desviación estándar de la distribución muestral de la media:',
      formula: 'SE = σ / √n',
    },
    {
      id: '2.5-t4',
      type: 'text',
      title: 'Intervalos de confianza',
      content: 'Un intervalo de confianza da un rango de valores plausibles para un parámetro poblacional. El 95% de confianza significa que si repitiéramos el muestreo infinitas veces, el 95% contendría el verdadero valor.',
    },
    {
      id: '2.5-t5',
      type: 'formula',
      title: 'IC del 95% para la media',
      content: 'Intervalo de confianza usando distribución normal:',
      formula: 'IC = x̄ ± z·(σ/√n)',
    },
    {
      id: '2.5-t6',
      type: 'text',
      title: 'Pruebas de hipótesis',
      content: 'H₀: hipótesis nula (no hay efecto/diferencia). H₁: hipótesis alternativa (sí hay efecto). Decidimos si rechazar H₀ basándonos en los datos.',
    },
    {
      id: '2.5-t7',
      type: 'text',
      title: 'El p-value',
      content: 'Es la probabilidad de observar un resultado igual o más extremo que el obtenido, asumiendo que H₀ es verdadera. Si p < α (0.05), rechazamos H₀.',
    },
    {
      id: '2.5-t8',
      type: 'list',
      title: 'Tipos de error',
      items: [
        'Error Tipo I (falso positivo): rechazar H₀ cuando es verdadera. Probabilidad = α.',
        'Error Tipo II (falso negativo): no rechazar H₀ cuando es falsa. Probabilidad = β.',
        'Potencia = 1 - β: probabilidad de detectar un efecto real.',
      ],
    },
    {
      id: '2.5-t9',
      type: 'warning',
      title: 'Errores comunes de interpretación',
      content: 'El p-value NO es la probabilidad de que H₀ sea verdadera. NO significa que el resultado sea importante. Un p-value muy pequeño puede ser estadísticamente significativo pero prácticamente irrelevante.',
    },
  ],
  visualExamples: [
    {
      id: '2.5-v1',
      type: 'simulation',
      title: 'Simulacion del TLC',
      description: 'Simula la distribucion de medias muestrales para diferentes distribuciones originales.',
      chartType: 'histogram',
      interactive: true,
      parameters: [
        { id: 'sample_size', label: 'Tamano de muestra', min: 5, max: 100, step: 5, defaultValue: 30 },
        { id: 'n_samples', label: 'Numero de muestras', min: 100, max: 5000, step: 100, defaultValue: 1000 },
      ],
      items: [
        { label: 'Intervalos de confianza', detail: 'Rango probable del parámetro poblacional (ej: 95% CI).', color: 'primary' },
        { label: 'Prueba de hipótesis', detail: 'H₀ vs H₁: determinar si rechazar la hipótesis nula.', color: 'warning' },
        { label: 'p-value', detail: 'Probabilidad de observar el resultado si H₀ fuera cierta.', color: 'success' },
        { label: 'Teorema Central del Límite', detail: 'Las medias muestrales se distribuyen normalmente.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '2.5-a1',
      type: 'numeric',
      title: 'IC 95% de la media',
      question: 'Si x̄=50, σ=10, n=25, calcula el límite inferior del IC al 95%.',
      correctAnswer: '46.08',
      explanation: 'IC = 50 ± 1.96·(10/√25) = 50 ± 3.92. Límite inferior = 50 - 3.92 = 46.08.',
      conceptLinked: 'Intervalos de confianza',
    },
    {
      id: '2.5-a2',
      type: 'multiple-choice',
      title: 'Interpretar p-value',
      question: 'Un test tiene p-value = 0.03. ¿Qué concluyes con α = 0.05?',
      options: [
        { id: 'a', text: 'No hay evidencia suficiente' },
        { id: 'b', text: 'Se rechaza H₀, hay diferencia significativa' },
        { id: 'c', text: 'El efecto es grande' },
        { id: 'd', text: 'Los datos están equivocados' },
      ],
      correctAnswer: 'b',
      explanation: 'p = 0.03 < α = 0.05, por lo que rechazamos H₀. Hay evidencia estadísticamente significativa.',
      conceptLinked: 'Interpretación de p-values',
    },
    {
      id: '2.5-a3',
      type: 'multiple-choice',
      title: 'Error Tipo I y II',
      question: '¿Qué es un error Tipo I?',
      options: [
        { id: 'a', text: 'No detectar un efecto real' },
        { id: 'b', text: 'Concluir que hay efecto cuando no lo hay' },
        { id: 'c', text: 'Usar muestra muy pequeña' },
        { id: 'd', text: 'Calcular mal la media' },
      ],
      correctAnswer: 'b',
      explanation: 'Error Tipo I = falso positivo = rechazar H₀ cuando es verdadera = concluir un efecto que no existe.',
      conceptLinked: 'Errores de hipótesis',
    },
  ],
  guidedPractice: {
    id: '2.5-gp',
    title: 'Prueba de hipótesis paso a paso',
    objective: 'Realizar una prueba t de una muestra para testear si la media difiere de un valor',
    steps: [
      {
        id: '2.5-gp-1',
        instruction: 'Genera datos de ejemplo y explora.',
        codeTemplate: `import numpy as np
from scipy import stats

# Simular: grupo de estudiantes, ¿promedio = 75?
np.random.seed(42)
notas = np.random.normal(loc=78, scale=12, size=50)

print("Media muestral:", np.mean(notas).round(2))
print("DE muestral:", np.std(notas, ddof=1).round(2))
print("Tamaño de muestra:", len(notas))`,
        explanation: 'Generamos 50 notas simuladas con media real de 78 y DE de 12.',
        hints: ['np.random.normal genera datos normales', 'ddof=1 para DE muestral'],
      },
      {
        id: '2.5-gp-2',
        instruction: 'Realiza la prueba t.',
        codeTemplate: `# H0: μ = 75 (la media es 75)
# H1: μ ≠ 75 (la media NO es 75)
# Nivel de significancia α = 0.05

valor_hipotetico = 75

t_stat, p_value = stats.ttest_1samp(notas, valor_hipotetico)

print(f"Estadístico t: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")
print(f"\\nConclusión (α=0.05):")
if p_value < 0.05:
    print("Se rechaza H0: hay evidencia de que la media ≠ 75")
else:
    print("No se rechaza H0: no hay evidencia suficiente")`,
        explanation: 'La prueba t compara la media muestral con el valor hipotetizado.',
        hints: ['ttest_1samp realiza la prueba t de una muestra', 'Si p < α, rechazamos H0'],
      },
      {
        id: '2.5-gp-3',
        instruction: 'Calcula el intervalo de confianza del 95%.',
        codeTemplate: `from scipy.stats import t as t_dist

n = len(notas)
media = np.mean(notas)
se = stats.sem(notas)  # error estándar

# IC del 95% usando distribución t (n < 30 o σ desconocida)
ic_95 = stats.t.interval(0.95, df=n-1, loc=media, scale=se)

print(f"Media: {media:.2f}")
print(f"Error estándar: {se:.2f}")
print(f"IC 95%: ({ic_95[0]:.2f}, {ic_95[1]:.2f})")
print(f"\\nInterpretación: Estamos 95% seguros de que la verdadera")
print(f"media poblacional está entre {ic_95[0]:.2f} y {ic_95[1]:.2f}")`,
        explanation: 'El IC nos da un rango de valores plausibles para la media poblacional.',
        hints: ['stats.t.interval calcula el IC con distribución t', 'stats.sem calcula el error estándar'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '2.5-ch',
    title: 'Reto: Comparación de dos grupos',
    description: 'Un medicamento promete reducir la presión arterial. Grupo A (tratamiento): media=120, DE=15, n=40. Grupo B (placebo): media=130, DE=18, n=45. ¿Hay diferencia significativa?',
    language: 'python',
    codeTemplate: `from scipy import stats
import numpy as np

np.random.seed(42)
# Grupo A: tratamiento
grupo_a = np.random.normal(120, 15, 40)
# Grupo B: placebo
grupo_b = np.random.normal(130, 18, 45)

# Tu código aquí:
# 1. Prueba t para dos muestras independientes
# 2. IC de la diferencia de medias
# 3. ¿Cuál es el tamaño del efecto (Cohen's d)?
# 4. Conclusión`,
    expectedApproach: 'ttest_ind para prueba t, Cohen\'s d para tamaño del efecto.',
    evaluationCriteria: ['Prueba t correcta', 'Interpretación del p-value', 'Cálculo de tamaño del efecto'],
    hints: [
      'Usa stats.ttest_ind(grupo_a, grupo_b) para la prueba t de dos muestras independientes',
      'El p-value < 0.05 indica diferencia significativa: "Rechazamos H0: las medias son diferentes"',
      'Para el IC de la diferencia de medias: media_diff = grupo_a.mean() - grupo_b.mean() y calcula el error estándar combinado',
      "Cohen's d = (media_A - media_B) / std_pooled. Un valor > 0.8 es un efecto grande",
      'Interpreta el tamaño del efecto junto con el p-value: un resultado significativo con efecto grande es más relevante clínicamente',
    ],
  },
  assessment: {
    id: '2.5-assess',
    passingScore: 70,
    questions: [
      {
        id: '2.5-q1', type: 'multiple-choice', text: '¿Qué dice el Teorema del Límite Central?',
        options: [
          { id: 'a', text: 'Los datos siempre son normales' },
          { id: 'b', text: 'Las medias muestrales se distribuyen normalmente' },
          { id: 'c', text: 'La muestra siempre es representativa' },
          { id: 'd', text: 'El p-value es siempre confiable' },
        ],
        correctAnswer: 'b', explanation: 'El TLC establece que la distribución de medias muestrales tiende a ser normal.',
        conceptLinked: 'TLC', difficulty: 'easy',
      },
      {
        id: '2.5-q2', type: 'numeric', text: 'Si x̄=100, σ=20, n=100, ¿cuál es el error estándar?',
        correctAnswer: '2', explanation: 'SE = σ/√n = 20/√100 = 20/10 = 2.',
        conceptLinked: 'Error estándar', difficulty: 'easy',
      },
      {
        id: '2.5-q3', type: 'multiple-choice', text: '¿Qué significa "rechazar H₀ al nivel α=0.05"?',
        options: [
          { id: 'a', text: 'Hay 5% de probabilidad de que H₀ sea verdadera' },
          { id: 'b', text: 'Si H₀ fuera verdadera, la probabilidad del resultado es < 5%' },
          { id: 'c', text: 'El efecto es del 5%' },
          { id: 'd', text: '5 de cada 100 personas se benefician' },
        ],
        correctAnswer: 'b', explanation: 'El p-value es P(datos | H₀), no P(H₀ | datos).',
        conceptLinked: 'Interpretación de p-values', difficulty: 'medium',
      },
    ],
  },
  competencies: ['Inferencia estadística', 'Teorema del Límite Central', 'Intervalos de confianza', 'Pruebas de hipótesis', 'p-value'],
};
