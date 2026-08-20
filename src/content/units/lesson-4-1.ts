import type { Lesson } from '@/types/course';

export const LESSON_4_1: Lesson = {
  id: '4.1',
  code: '4.1',
  title: 'Tipos de aprendizaje automático',
  objectives: [
    'Diferenciar aprendizaje supervisado, no supervisado y semisupervisado',
    'Identificar qué tipo de problema corresponde a cada caso',
    'Reconocer algoritmos comunes de cada familia',
  ],
  theory: [
    {
      id: '4.1-t1',
      type: 'text',
      title: 'Aprendizaje Supervisado',
      content: 'El modelo aprende a partir de datos etiquetados (input → output conocido). El objetivo es predecir la salida para datos nuevos. Ejemplos: clasificar emails como spam/no spam, predecir precios de casas.',
    },
    {
      id: '4.1-t2',
      type: 'list',
      title: 'Subtipos supervisados',
      items: [
        'Clasificación: predecir una categoría (spam/no spam, gato/perro)',
        'Regresión: predecir un valor continuo (precio, temperatura)',
      ],
    },
    {
      id: '4.1-t3',
      type: 'text',
      title: 'Aprendizaje No Supervisado',
      content: 'El modelo trabaja sin etiquetas. Busca patrones ocultos o estructura en los datos. Ejemplos: agrupar clientes por comportamiento, reducir dimensionalidad para visualización.',
    },
    {
      id: '4.1-t4',
      type: 'list',
      title: 'Subtipos no supervisados',
      items: [
        'Clustering: agrupar datos similares (K-Means, DBSCAN)',
        'Redución de dimensionalidad: simplificar datos (PCA, t-SNE)',
        'Reglas de asociación: encontrar relaciones (Apriori)',
      ],
    },
    {
      id: '4.1-t5',
      type: 'text',
      title: 'Aprendizaje Semisupervisado',
      content: 'Combina datos etiquetados y no etiquetados. Es útil cuando etiquetar es costoso. El modelo usa la estructura de los datos no etiquetados para mejorar la predicción.',
    },
    {
      id: '4.1-t6',
      type: 'note',
      title: '¿Cómo elegir?',
      content: 'Si tienes etiquetas → supervisado. Si no tienes etiquetas → no supervisado. Si tienes pocas etiquetas → semisupervisado. Si el objetivo es predecir → regresión o clasificación. Si es explorar → clustering o reducción.',
    },
  ],
  visualExamples: [
    {
      id: '4.1-v1',
      type: 'diagram',
      title: 'Mapa de decisión de algoritmos',
      description: 'Árbol de decisión para elegir el algoritmo correcto según el tipo de problema.',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '4.1-a1',
      type: 'classification',
      title: 'Clasificar problemas',
      question: 'Clasifica cada problema: ¿es supervisado o no supervisado?',
      options: [
        { id: 'a', text: 'Predecir si un cliente pagará un préstamo' },
        { id: 'b', text: 'Agrupar clientes por patrones de compra' },
        { id: 'c', text: 'Clasificar mensajes como spam o no spam' },
        { id: 'd', text: 'Encontrar anomalías en transacciones' },
        { id: 'e', text: 'Predecir la temperatura de mañana' },
      ],
      correctAnswer: 'a=supervisado, b=no_supervisado, c=supervisado, d=no_supervisado, e=supervisado',
      explanation: 'Problemas con etiquetas conocidas (a, c, e) son supervisados. Sin etiquetas (b, d) son no supervisados.',
      conceptLinked: 'Tipos de aprendizaje',
    },
    {
      id: '4.1-a2',
      type: 'multiple-choice',
      title: 'Identificar subtipo',
      question: 'Predecir el precio de una casa según sus características es:',
      options: [
        { id: 'a', text: 'Clasificación supervisada' },
        { id: 'b', text: 'Regresión supervisada' },
        { id: 'c', text: 'Clustering no supervisado' },
        { id: 'd', text: 'Reducción de dimensionalidad' },
      ],
      correctAnswer: 'b',
      explanation: 'El precio es un valor continuo (numérico), por lo que es regresión. Tenemos datos etiquetados, por lo que es supervisado.',
      conceptLinked: 'Regresión supervisada',
    },
  ],
  guidedPractice: {
    id: '4.1-gp',
    title: 'Explorar tipos de aprendizaje con Python',
    objective: 'Cargar un dataset y determinar qué tipo de aprendizaje aplicar',
    steps: [
      {
        id: '4.1-gp-1',
        instruction: 'Carga el dataset Iris y explora sus columnas.',
        codeTemplate: `import pandas as pd
from sklearn.datasets import load_iris

# Cargar dataset
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target

print("Forma:", df.shape)
print("\\nColumnas:", df.columns.tolist())
print("\\nPrimeras filas:")
print(df.head())
print("\\nEspecies:", iris.target_names)`,
        explanation: 'Iris es un dataset supervisado: tenemos 4 características y 1 etiqueta (species).',
        hints: ['load_iris() carga el dataset clásico', 'target_names muestra las clases'],
      },
      {
        id: '4.1-gp-2',
        instruction: 'Demuestra clustering (no supervisado) ignorando las etiquetas.',
        codeTemplate: `from sklearn.cluster import KMeans
import numpy as np

# Usar solo las características (sin etiquetas)
X = df[iris.feature_names].values

# K-Means con 3 grupos
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X)

# Comparar clusters vs especies reales
print("Clusters vs Especies reales:")
print(pd.crosstab(df['cluster'], df['species']))`,
        explanation: 'K-Means agrupa los datos sin usar etiquetas. Comparamos sus clusters con las especies reales para ver qué tan bien lo hizo.',
        hints: ['KMeans agrupa por similitud', 'crosstab muestra la tabla cruzada'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '4.1-ch',
    title: 'Reto: Decidir el enfoque',
    description: 'Para cada escenario, define: (1) tipo de aprendizaje, (2) subtipo, (3) algoritmo sugerido, (4) métrica de evaluación.',
    language: 'python',
    codeTemplate: `# Escenario A: Detectar grupos de clientes según su comportamiento de compra
# Escenario B: Predecir si un tumor es maligno o benigno
# Escenario C: Predecir la demanda semanal de un producto

# Tu análisis para cada escenario:
escenarios = {
    'A': {'tipo': '', 'subtipo': '', 'algoritmo': '', 'metrica': ''},
    'B': {'tipo': '', 'subtipo': '', 'algoritmo': '', 'metrica': ''},
    'C': {'tipo': '', 'subtipo': '', 'algoritmo': '', 'metrica': ''},
}

for k, v in escenarios.items():
    print(f"Escenario {k}: {v}")`,
    expectedApproach: 'A=clustering, B=clasificación, C=regresión. Elegir algoritmos y métricas apropiadas.',
    evaluationCriteria: [
      'Clasificación correcta del tipo de aprendizaje',
      'Selección apropiada de algoritmos',
      'Justificación de métricas',
    ],
  },
  assessment: {
    id: '4.1-assess',
    passingScore: 70,
    questions: [
      {
        id: '4.1-q1',
        type: 'multiple-choice',
        text: '¿Cuál es la diferencia principal entre aprendizaje supervisado y no supervisado?',
        options: [
          { id: 'a', text: 'El supervisado es más rápido' },
          { id: 'b', text: 'El supervisado usa datos etiquetados' },
          { id: 'c', text: 'El no supervisado es más preciso' },
          { id: 'd', text: 'No hay diferencia' },
        ],
        correctAnswer: 'b',
        explanation: 'La diferencia clave es que el supervisado tiene datos con etiquetas (respuesta conocida), mientras que el no supervisado busca patrones sin etiquetas.',
        conceptLinked: 'Tipos de aprendizaje',
        difficulty: 'easy',
      },
      {
        id: '4.1-q2',
        type: 'multiple-choice',
        text: '¿Qué tipo de aprendizaje usarías para detectar fraudes en transacciones sin tener ejemplos previos de fraude?',
        options: [
          { id: 'a', text: 'Clasificación supervisada' },
          { id: 'b', text: 'Regresión supervisada' },
          { id: 'c', text: 'Clustering no supervisado' },
          { id: 'd', text: 'Aprendizaje por refuerzo' },
        ],
        correctAnswer: 'c',
        explanation: 'Sin ejemplos etiquetados de fraude, usamos no supervisado para detectar anomalías o patrones inusuales.',
        conceptLinked: 'No supervisado',
        difficulty: 'medium',
      },
      {
        id: '4.1-q3',
        type: 'model-selection',
        text: '¿Qué algoritmo usarías para predecir si un email es spam?',
        options: [
          { id: 'a', text: 'K-Means' },
          { id: 'b', text: 'Regresión logística' },
          { id: 'c', text: 'PCA' },
          { id: 'd', text: 'DBSCAN' },
        ],
        correctAnswer: 'b',
        explanation: 'Spam es clasificación binaria (spam/no spam). Regresión logística es un clasificador supervisado adecuado.',
        conceptLinked: 'Clasificación supervisada',
        difficulty: 'easy',
      },
      {
        id: '4.1-q4',
        type: 'interpretation',
        text: 'Un modelo de clustering agrupa clientes en 3 grupos. ¿Cómo evaluas la calidad de los clusters?',
        options: [
          { id: 'a', text: 'Usando accuracy' },
          { id: 'b', text: 'Usando la distancia intra-cluster (inercia)' },
          { id: 'c', text: 'Usando la matriz de confusión' },
          { id: 'd', text: 'No se puede evaluar' },
        ],
        correctAnswer: 'b',
        explanation: 'En clustering no hay etiquetas, así que usamos métricas internas como la inercia (distancia de puntos a sus centroides).',
        conceptLinked: 'Evaluación no supervisada',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Aprendizaje supervisado', 'Aprendizaje no supervisado', 'Selección de algoritmos', 'Clasificación de problemas'],
};
