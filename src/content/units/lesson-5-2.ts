import type { Lesson } from '@/types/course';

export const LESSON_5_2: Lesson = {
  id: '5.2',
  code: '5.2',
  title: 'Privacidad y protección de datos',
  objectives: [
    'Explicar principios de protección de datos personales',
    'Identificar técnicas de anonimización',
    'Aplicar enmascaramiento y perturbación',
    'Evaluar riesgos de reidentificación',
  ],
  theory: [
    {
      id: '5.2-t1',
      type: 'text',
      title: 'Datos personales y sensibles',
      content: 'Datos personales: cualquier información que identifique a una persona (nombre, RFC, dirección). Datos sensibles: salud, origen étnico, orientación sexual, afiliación política. Estos requieren protección reforzada.',
    },
    {
      id: '5.2-t2',
      type: 'text',
      title: 'Marco regulatorio',
      content: 'LGPD (México), GDPR (Europa), CCPA (California). Principios clave: minimización de datos, consentimiento, derecho al olvido, seguridad por diseño.',
    },
    {
      id: '5.2-t3',
      type: 'text',
      title: 'Técnicas de anonimización',
      content: 'Supresión: eliminar identificadores directos. Generalización: reducir precisión (edad → rango). Enmascaramiento: reemplazar valores. Perturbación: agregar ruido aleatorio.',
    },
    {
      id: '5.2-t4',
      type: 'warning',
      title: 'Reidentificación',
      content: 'La anonimización no es perfecta. Combinando datos anonimizados con fuentes externas, es posible reidentificar personas. La k-anonimidad garantiza que cada registro sea indistinguible de al menos k-1 otros.',
    },
    {
      id: '5.2-t5',
      type: 'formula',
      title: 'Privacidad diferencial',
      content: 'Mecanismo que agrega ruido controlado para proteger individuos mientras mantiene utilidad estadística.',
      formula: 'ε-differential privacy: P(M(D) ∈ S) ≤ e^ε · P(M(D\') ∈ S)',
    },
  ],
  visualExamples: [
    {
      id: '5.2-v1',
      type: 'diagram',
      title: 'Técnicas de anonimización',
      description: 'Diagrama de las diferentes técnicas y cuándo usarlas.',
      interactive: false,
      items: [
        { label: 'K-Anonimidad', detail: 'Cada registro es indistinguible de al menos k-1 otros.', color: 'primary' },
        { label: 'L-Diversidad', detail: 'Garantiza diversidad de valores sensibles dentro de cada grupo.', color: 'warning' },
        { label: 'Differential Privacy', detail: 'Agrega ruido para proteger individuos en consultas.', color: 'success' },
        { label: 'GDPR / Leyes', detail: 'Derecho al olvido, consentimiento, minimización de datos.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '5.2-a1',
      type: 'multiple-choice',
      title: 'Datos sensibles',
      question: '¿Cuál de estos es un dato sensible según la LGPD?',
      options: [
        { id: 'a', text: 'Nombre completo' },
        { id: 'b', text: 'Número de empleado' },
        { id: 'c', text: 'Historial médico' },
        { id: 'd', text: 'Dirección de oficina' },
      ],
      correctAnswer: 'c',
      explanation: 'El historial médico es un dato sensible que requiere protección reforzada y consentimiento explícito.',
      conceptLinked: 'Datos sensibles',
    },
    {
      id: '5.2-a2',
      type: 'multiple-choice',
      title: 'Técnica adecuada',
      question: 'Para publicar datos de clientes de forma anónima, ¿qué técnica es más apropiada?',
      options: [
        { id: 'a', text: 'Suprimir solo el nombre' },
        { id: 'b', text: 'Generalizar edades y suprimir IDs' },
        { id: 'c', text: 'No publicar nada' },
        { id: 'd', text: 'Encriptar todo el dataset' },
      ],
      correctAnswer: 'b',
      explanation: 'Combinar supresión de identificadores directos con generalización de indirectos reduce el riesgo de reidentificación.',
      conceptLinked: 'Anonimización',
    },
  ],
  guidedPractice: {
    id: '5.2-gp',
    title: 'Anonimización de datos',
    objective: 'Aplicar técnicas de anonimización a un dataset y evaluar el riesgo de reidentificación',
    steps: [
      {
        id: '5.2-gp-1',
        instruction: 'Crea un dataset con información personal.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 100

df = pd.DataFrame({
    'nombre': [f'Persona_{i}' for i in range(n)],
    'rfc': [f'RFC{i:04d}' for i in range(n)],
    'edad': np.random.randint(18, 80, n),
    'ciudad': np.random.choice(['CDMX', 'GDL', 'MTY', 'OAX', 'CANCUN'], n),
    'ingreso': np.random.lognormal(10.5, 0.7, n).round(0),
    'enfermedad': np.random.choice(['Diabetes', 'Hipertensión', 'Ninguna'], n, p=[0.15, 0.25, 0.6])
})

print("Dataset original (primeras filas):")
print(df.head())
print(f"\\nRegistros: {len(df)}")`,
        explanation: 'Dataset con identificadores directos (nombre, RFC) y datos sensibles (enfermedad).',
        hints: ['Los identificadores directos deben eliminarse', 'Los datos sensibles requieren protección extra'],
      },
      {
        id: '5.2-gp-2',
        instruction: 'Aplica técnicas de anonimización.',
        codeTemplate: `# Técnica 1: Supresión
df_anon = df.drop(columns=['nombre', 'rfc'])

# Técnica 2: Generalización de edades
bins = [0, 25, 35, 45, 55, 65, 100]
labels = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
df_anon['rango_edad'] = pd.cut(df['edad'], bins=bins, labels=labels)
df_anon = df_anon.drop(columns=['edad'])

# Técnica 3: Enmascaramiento de ingreso (redondeo a miles)
df_anon['ingreso_aprox'] = (df['ingreso'] / 1000).round(0) * 1000
df_anon = df_anon.drop(columns=['ingreso'])

print("Dataset anonimizado:")
print(df_anon.head())
print(f"\\nColumnas originales: {list(df.columns)}")
print(f"Columnas anonimizadas: {list(df_anon.columns)}")`,
        explanation: 'Suprimimos identificadores directos, generalizamos edades y enmascaramos ingresos.',
        hints: ['pd.cut crea rangos', 'round(0) * 1000 redondea a miles'],
      },
      {
        id: '5.2-gp-3',
        instruction: 'Evalúa el riesgo de reidentificación.',
        codeTemplate: `# Evaluar riesgo de reidentificación
print("=== ANÁLISIS DE RIESGO ===")

# ¿Cuántos registros son únicos por combinación de attributes?
unique_combos = df_anon.drop(columns=['enfermedad']).duplicated().sum()
print(f"Combinaciones únicas (sin enfermedad): {unique_combos} de {len(df_anon)}")
print(f"Riesgo de reidentificación: {1 - unique_combos/len(df_anon):.1%}")

# k-anonimidad: ¿cuántos registros comparten los mismos valores?
k_checks = ['ciudad', 'rango_edad', 'ingreso_aprox']
k_groups = df_anon.groupby(k_checks).size().reset_index(name='count')
min_k = k_groups['count'].min()
print(f"\\nk-anonimidad (ciudad, edad, ingreso): k={min_k}")
print(f"Registros en grupo más pequeño: {min_k}")
if min_k < 3:
    print("⚠️ Riesgo alto: hay grupos con menos de 3 registros")
else:
    print("✓ Riesgo bajo: todos los grupos tienen al menos 3 registros")`,
        explanation: 'Evaluamos la k-anonimidad para medir la protección contra reidentificación.',
        hints: ['k-anonimidad = cada grupo tiene al menos k registros', 'Menor k = mayor riesgo'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '5.2-ch',
    title: 'Privacidad diferencial simple',
    description: 'Implementa un mecanismo de privacidad diferencial para una consulta de conteo.',
    language: 'python',
    codeTemplate: `import numpy as np

def laplace_mechanism(true_value, sensitivity, epsilon):
    """Mecanismo de Laplace para privacidad diferencial"""
    scale = sensitivity / epsilon
    noise = np.random.laplace(0, scale)
    return true_value + noise

# Datos simulados de pacientes
np.random.seed(42)
n = 1000
enfermedades = np.random.choice(['Diabetes', 'Hipertensión', 'COVID', 'Ninguna'], n, p=[0.1, 0.2, 0.15, 0.55])
conteo_real = (enfermedades == 'Diabetes').sum()

print(f"Conteo real de Diabetes: {conteo_real}")

# Tu código: aplica el mecanismo de Laplace con epsilon = 0.5 y epsilon = 2.0
# ¿Qué pasa con diferentes valores de epsilon?
# ¿Cuántas ejecuciones necesitas para estimar bien el valor real?`,
    expectedApproach: 'laplace_mechanism(conteo_real, 1, epsilon) repetido múltiples veces.',
    evaluationCriteria: ['Mecanismo correcto', 'Análisis de epsilon', 'Interpretación de utilidad vs privacidad'],
    hints: [
      'El mecanismo de Laplace agrega ruido: true_value + np.random.laplace(0, sensitivity/epsilon). Sensitivity=1 para conteo',
      'Epsilon pequeño (0.5) = más privacidad pero más ruido. epsilon grande (2.0) = menos privacidad pero más precisión',
      'Ejecuta el mecanismo múltiples veces (100+) con un bucle y calcula la media estimada para ver cómo se comporta',
      'Grafica la distribución del ruido: plt.hist([laplace_mechanism(conteo_real, 1, 0.5) for _ in range(1000)]) para cada epsilon',
      'Interpreta: con epsilon=0.5 el ruido es grande (poca utilidad, mucha privacidad); con epsilon=2.0 es más preciso',
    ],
  },
  assessment: {
    id: '5.2-assess',
    passingScore: 70,
    questions: [
      {
        id: '5.2-q1',
        type: 'multiple-choice',
        text: '¿Qué garantiza la k-anonimidad con k=5?',
        options: [
          { id: 'a', text: 'Que hay 5 datos duplicados' },
          { id: 'b', text: 'Que cada grupo tiene al menos 5 registros indistinguibles' },
          { id: 'c', text: 'Que se usaron 5 técnicas de anonimización' },
          { id: 'd', text: 'Que la precisión es del 5%' },
        ],
        correctAnswer: 'b',
        explanation: 'k-anonimidad k=5 significa que cada combinación de atributos aparece en al menos 5 registros.',
        conceptLinked: 'k-anonimidad',
        difficulty: 'medium',
      },
      {
        id: '5.2-q2',
        type: 'multiple-choice',
        text: '¿Qué efecto tiene un epsilon más bajo en privacidad diferencial?',
        options: [
          { id: 'a', text: 'Menos ruido, más utilidad' },
          { id: 'b', text: 'Más ruido, más privacidad' },
          { id: 'c', text: 'Los datos se eliminan' },
          { id: 'd', text: 'No hay efecto' },
        ],
        correctAnswer: 'b',
        explanation: 'Menor epsilon = más ruido = mayor privacidad pero menor utilidad estadística.',
        conceptLinked: 'Privacidad diferencial',
        difficulty: 'medium',
      },
      {
        id: '5.2-q3',
        type: 'multiple-choice',
        text: '¿Qué técnica de anonimización consiste en reducir la precisión de un valor (por ejemplo, convertir una edad exacta en un rango)?',
        options: [
          { id: 'a', text: 'Supresión' },
          { id: 'b', text: 'Generalización' },
          { id: 'c', text: 'Cifrado' },
          { id: 'd', text: 'Indexación' },
        ],
        correctAnswer: 'b',
        explanation: 'La generalización reduce la precisión de un dato (edad → rango de edad) para dificultar la reidentificación.',
        conceptLinked: 'Técnicas de anonimización',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Privacidad de datos', 'Anonimización', 'LGPD/GDPR', 'k-anonimidad', 'Privacidad diferencial'],
};
