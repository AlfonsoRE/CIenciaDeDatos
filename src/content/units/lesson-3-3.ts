import type { Lesson } from '@/types/course';

export const LESSON_3_3: Lesson = {
  id: '3.3',
  code: '3.3',
  title: 'Reducción de dimensionalidad',
  objectives: [
    'Explicar el problema de la maldición de la dimensionalidad',
    'Aplicar Análisis de Componentes Principales (PCA)',
    'Interpretar la varianza explicada',
    'Comparar PCA con t-SNE',
  ],
  theory: [
    {
      id: '3.3-t1',
      type: 'text',
      title: 'Maldición de la dimensionalidad',
      content: 'A medida que aumentan las dimensiones, los datos se vuelven escasos y las distancias pierden sentido. Esto afecta el rendimiento de los algoritmos de ML.',
    },
    {
      id: '3.3-t2',
      type: 'text',
      title: 'PCA: Intuición',
      content: 'PCA encuentra las direcciones de máxima varianza (componentes principales) y proyecta los datos a un espacio de menor dimensión, preservando la mayor información posible.',
    },
    {
      id: '3.3-t3',
      type: 'formula',
      title: 'Componentes principales',
      content: 'Los componentes son combinaciones lineales de las variables originales, ortogonales entre sí, ordenados por varianza explicada.',
      formula: 'PC1 = w₁·X₁ + w₂·X₂ + ... + wₙ·Xₙ',
    },
    {
      id: '3.3-t4',
      type: 'text',
      title: 'Varianza explicada',
      content: 'Cada componente explica un porcentaje de la varianza total. Seleccionamos componentes hasta alcanzar un umbral (usualmente 80-95%).',
    },
    {
      id: '3.3-t5',
      type: 'text',
      title: 't-SNE vs PCA',
      content: 'PCA es lineal y preserva estructura global. t-SNE es no lineal y preserva estructura local (vecinos cercanos). t-SNE es más lento y adecuado para visualización.',
    },
  ],
  visualExamples: [
    {
      id: '3.3-v1',
      type: 'chart',
      title: 'Scree Plot',
      description: 'Visualiza la varianza explicada por cada componente para decidir cuantos conservar.',
      chartType: 'line',
      interactive: false,
      items: [
        { label: 'PCA', detail: 'Reduce dimensiones proyectando en direcciones de máxima varianza.', color: 'primary' },
        { label: 't-SNE', detail: 'Visualización en 2D/3D preservando estructura local.', color: 'warning' },
        { label: 'Scree Plot', detail: 'Gráfica de varianza explicada acumulada por componente.', color: 'success' },
        { label: 'Regla de Kaiser', detail: 'Conservar componentes con autovalor > 1.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '3.3-a1',
      type: 'multiple-choice',
      title: '¿Cuántos componentes conservar?',
      question: 'Si 3 componentes explican el 92% de la varianza de un dataset de 10 variables, ¿cuántos conservarías?',
      options: [
        { id: 'a', text: 'Todos (10)' },
        { id: 'b', text: '3' },
        { id: 'c', text: '5' },
        { id: 'd', text: '1' },
      ],
      correctAnswer: 'b',
      explanation: 'Si 3 componentes ya explican el 92%, se puede reducir de 10 a 3 dimensiones sin perder mucha información.',
      conceptLinked: 'Varianza explicada',
    },
  ],
  guidedPractice: {
    id: '3.3-gp',
    title: 'PCA con scikit-learn',
    objective: 'Aplicar PCA a un dataset y analizar la varianza explicada',
    steps: [
      {
        id: '3.3-gp-1',
        instruction: 'Genera un dataset con correlaciones entre variables.',
        codeTemplate: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 200

# Variables con correlaciones
x1 = np.random.normal(0, 1, n)
x2 = x1 * 0.8 + np.random.normal(0, 0.3, n)  # correlacionada con x1
x3 = x1 * 0.5 + np.random.normal(0, 0.5, n)  # parcialmente correlacionada
x4 = np.random.normal(0, 1, n)  # independiente
x5 = x2 * 0.6 + np.random.normal(0, 0.4, n)

df = pd.DataFrame({'x1': x1, 'x2': x2, 'x3': x3, 'x4': x4, 'x5': x5})
print("Matriz de correlación:")
print(df.corr().round(2))
print(f"\\nForma: {df.shape}")`,
        explanation: 'Creamos 5 variables, 4 de las cuales tienen correlaciones entre sí.',
        hints: ['Las variables correlacionadas son candidatas para PCA', 'np.corrcoef calcula la correlación'],
      },
      {
        id: '3.3-gp-2',
        instruction: 'Aplica PCA y analiza la varianza explicada.',
        codeTemplate: `from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

# Estandarizar primero
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# Aplicar PCA
pca = PCA()
X_pca = pca.fit_transform(X_scaled)

# Varianza explicada
print("Varianza explicada por componente:")
for i, (var, cum) in enumerate(zip(pca.explained_variance_ratio_, np.cumsum(pca.explained_variance_ratio_))):
    print(f"  PC{i+1}: {var:.3f} ({cum:.3f} acumulada)")

print(f"\\nComponentes conservados para 95% varianza: {np.argmax(np.cumsum(pca.explained_variance_ratio_) >= 0.95) + 1}")`,
        explanation: 'PCA calcula componentes ordenados por varianza explicada.',
        hints: ['explained_variance_ratio_ da el % de varianza', 'np.cumsum calcula la suma acumulada'],
      },
      {
        id: '3.3-gp-3',
        instruction: 'Visualiza los datos en 2D usando las primeras componentes.',
        codeTemplate: `import matplotlib.pyplot as plt

# Reducir a 2 dimensiones
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_scaled)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Datos originales (proyectados en x1, x2)
axes[0].scatter(df['x1'], df['x2'], alpha=0.5, s=20, c='blue')
axes[0].set_title('Original: x1 vs x2')
axes[0].set_xlabel('x1')
axes[0].set_ylabel('x2')
axes[0].grid(True, alpha=0.3)

# Datos en PCA
axes[1].scatter(X_2d[:, 0], X_2d[:, 1], alpha=0.5, s=20, c='red')
axes[1].set_title(f'PCA: PC1 vs PC2\\n(Varianza: {pca_2d.explained_variance_ratio_.sum():.1%})')
axes[1].set_xlabel(f'PC1 ({pca_2d.explained_variance_ratio_[0]:.1%})')
axes[1].set_ylabel(f'PC2 ({pca_2d.explained_variance_ratio_[1]:.1%})')
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('pca_comparison.png', dpi=100, bbox_inches='tight')
plt.show()`,
        explanation: 'Comparamos los datos originales con la proyección PCA.',
        hints: ['plt.subplots crea múltiples gráficas', 'alpha controla la transparencia'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '3.3-ch',
    title: 'Análisis de componentes con Iris',
    description: 'Aplica PCA al dataset Iris y compara la clasificación antes y después de la reducción.',
    language: 'python',
    codeTemplate: `from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import numpy as np

iris = load_iris()
X, y = iris.data, iris.target
print(f"Dimensiones originales: {X.shape}")

# Tu código:
# 1. Estandariza X
# 2. Aplica PCA (mantén 95% varianza)
# 3. Compara accuracy con RandomForest en datos originales vs reducidos
# 4. Visualiza en 2D con colores por clase`,
    expectedApproach: 'StandardScaler → PCA → RandomForestClassifier con cross_val_score.',
    evaluationCriteria: ['PCA correcto', 'Comparación de accuracy', 'Visualización clara'],
    hints: [
      'Primero estandariza: scaler = StandardScaler(); X_scaled = scaler.fit_transform(X) — PCA es sensible a la escala',
      'Para mantener 95% de varianza: pca = PCA(n_components=0.95). El n_components puede ser un decimal entre 0 y 1',
      'Compara accuracy con cross_val_score: RandomForestClassifier().fit(X, y) en datos originales y reducidos',
      'Para visualizar 2D: usa PCA(n_components=2) y plt.scatter(X_pca[:,0], X_pca[:,1], c=y, cmap="viridis")',
      'Revisa pca.explained_variance_ratio_ para ver cuánta varianza conserva cada componente principal',
    ],
  },
  assessment: {
    id: '3.3-assess',
    passingScore: 70,
    questions: [
      {
        id: '3.3-q1',
        type: 'multiple-choice',
        text: '¿Qué preserva PCA al reducir dimensiones?',
        options: [
          { id: 'a', text: 'Los valores exactos' },
          { id: 'b', text: 'La varianza máxima' },
          { id: 'c', text: 'Las distancias exactas' },
          { id: 'd', text: 'Las correlaciones originales' },
        ],
        correctAnswer: 'b',
        explanation: 'PCA busca preservar la mayor varianza posible al proyectar los datos.',
        conceptLinked: 'PCA',
        difficulty: 'easy',
      },
      {
        id: '3.3-q2',
        type: 'multiple-choice',
        text: '¿Cuál es una diferencia clave entre PCA y t-SNE?',
        options: [
          { id: 'a', text: 'PCA es más rápido' },
          { id: 'b', text: 't-SNE es lineal' },
          { id: 'c', text: 'PCA preserva estructura local' },
          { id: 'd', text: 't-SNE no necesita estandarización' },
        ],
        correctAnswer: 'a',
        explanation: 'PCA es lineal y más rápido. t-SNE es no lineal pero computacionalmente más costoso.',
        conceptLinked: 'PCA vs t-SNE',
        difficulty: 'medium',
      },
      {
        id: '3.3-q3',
        type: 'multiple-choice',
        text: '¿Qué ocurre cuando aumentan las dimensiones de un dataset (maldición de la dimensionalidad)?',
        options: [
          { id: 'a', text: 'Los datos se vuelven más densos y fáciles de modelar' },
          { id: 'b', text: 'Los datos se vuelven escasos y las distancias pierden sentido' },
          { id: 'c', text: 'Los algoritmos de ML siempre mejoran su precisión' },
          { id: 'd', text: 'El tamaño del dataset disminuye automáticamente' },
        ],
        correctAnswer: 'b',
        explanation: 'A mayor número de dimensiones, los datos se dispersan y las nociones de distancia/cercanía dejan de ser útiles, afectando a los algoritmos de ML.',
        conceptLinked: 'Maldición de la dimensionalidad',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['PCA', 'Reducción de dimensionalidad', 't-SNE', 'Varianza explicada'],
};
