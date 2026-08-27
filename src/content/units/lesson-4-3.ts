import type { Lesson } from '@/types/course';

export const LESSON_4_3: Lesson = {
  id: '4.3',
  code: '4.3',
  title: 'Árboles de decisión y random forest',
  objectives: [
    'Explicar cómo funcionan los árboles de decisión',
    'Entrenar y visualizar un árbol',
    'Entender el sobreajuste y la poda',
    'Combinar árboles en Random Forest',
  ],
  theory: [
    {
      id: '4.3-t1',
      type: 'text',
      title: 'Árboles de decisión',
      content: 'Un árbol de decisión divide el espacio de features en regiones, haciendo predicciones basadas en reglas simples if-then. Son fáciles de interpretar pero propensos a sobreajuste.',
    },
    {
      id: '4.3-t2',
      type: 'text',
      title: 'Criterios de división',
      content: 'Para clasificación: Gini impurity o entropía (information gain). Para regresión: varianza mínima. El árbol elige la división que mejor separa las clases.',
    },
    {
      id: '4.3-t3',
      type: 'text',
      title: 'Sobreajuste en árboles',
      content: 'Un árbol sin límite de profundidad memoriza el training data (overfitting). Soluciones: podar (max_depth, min_samples_leaf), o usar ensambles.',
    },
    {
      id: '4.3-t4',
      type: 'text',
      title: 'Random Forest',
      content: 'Combina muchos árboles entrenados con submuestras aleatorias y diferentes features. La predicción es la moda (clasificación) o media (regresión) de todos los árboles.',
    },
    {
      id: '4.3-t5',
      type: 'text',
      title: 'Ventajas del ensemble',
      content: 'Random Forest reduce el sobreajuste, es más robusto, maneja bien datos faltantes, y proporciona importancia de features.',
    },
  ],
  visualExamples: [
    {
      id: '4.3-v1',
      type: 'chart',
      title: 'Arbol de decision visual',
      description: 'Visualiza las divisiones del arbol y como clasifica las regiones.',
      chartType: 'tree',
      interactive: false,
      items: [
        { label: 'Árbol de decisión', detail: 'Divisiones binarias por特征. Fácil de interpretar.', color: 'primary' },
        { label: 'Random Forest', detail: 'Ensemble de árboles. Reduce overfitting.', color: 'warning' },
        { label: 'Overfitting', detail: 'El modelo memoriza el entrenamiento pero falla en test.', color: 'danger' },
        { label: 'Feature importance', detail: 'Mide qué variables contribuyen más a la predicción.', color: 'success' },
      ],
    },
  ],
  activities: [
    {
      id: '4.3-a1',
      type: 'multiple-choice',
      title: '¿Por qué Random Forest?',
      question: '¿Cuál es la principal ventaja de Random Forest sobre un solo árbol?',
      options: [
        { id: 'a', text: 'Es más rápido de entrenar' },
        { id: 'b', text: 'Reduce el sobreajuste' },
        { id: 'c', text: 'Es más fácil de interpretar' },
        { id: 'd', text: 'No necesita preprocesamiento' },
      ],
      correctAnswer: 'b',
      explanation: 'El promedio de muchos árboles reduce la varianza y el sobreajuste individual.',
      conceptLinked: 'Ensemble methods',
    },
    {
      id: '4.3-a2',
      type: 'multiple-choice',
      title: 'Criterio de Gini',
      question: '¿Qué mide la impureza de Gini?',
      options: [
        { id: 'a', text: 'La entropía del sistema' },
        { id: 'b', text: 'La probabilidad de error de clasificación' },
        { id: 'c', text: 'La varianza de los datos' },
        { id: 'd', text: 'La correlación entre features' },
      ],
      correctAnswer: 'b',
      explanation: 'Gini mide la probabilidad de que un elemento sea clasificado incorrectamente si se elige al azar.',
      conceptLinked: 'Impureza de Gini',
    },
  ],
  guidedPractice: {
    id: '4.3-gp',
    title: 'Clasificación con árbol y Random Forest',
    objective: 'Comparar un árbol de decisión con Random Forest en un problema de clasificación',
    steps: [
      {
        id: '4.3-gp-1',
        instruction: 'Carga un dataset y explora.',
        codeTemplate: `from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
import pandas as pd

wine = load_wine()
X = pd.DataFrame(wine.data, columns=wine.feature_names)
y = pd.Series(wine.target, name='clase')

print(f"Clases: {wine.target_names}")
print(f"Features: {wine.feature_names}")
print(f"Dimensiones: {X.shape}")
print(f"\\nDistribución de clases:")
print(y.value_counts().sort_index())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)`,
        explanation: 'El dataset Wine tiene 3 clases de vino y 13 features fisicoquímicas.',
        hints: ['load_wine carga el dataset', 'stratify=y mantiene la proporción de clases'],
      },
      {
        id: '4.3-gp-2',
        instruction: 'Entrena un árbol de decisión y visualízalo.',
        codeTemplate: `from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

# Árbol sin límites
tree = DecisionTreeClassifier(random_state=42)
tree.fit(X_train, y_train)

y_pred_tree = tree.predict(X_test)
print("Árbol (sin poda):")
print(f"  Profundidad: {tree.get_depth()}")
print(f"  Nodos hoja: {tree.get_n_leaves()}")
print(f"  Accuracy: {accuracy_score(y_test, y_pred_tree):.4f}")

# Visualizar árbol (primeros 3 niveles)
plt.figure(figsize=(20, 8))
plot_tree(tree, max_depth=3, feature_names=wine.feature_names, 
          class_names=wine.target_names, filled=True, rounded=True, fontsize=8)
plt.title("Árbol de Decisión (profundidad limitada a 3)")
plt.tight_layout()
plt.show()`,
        explanation: 'Un árbol sin límites crece mucho y sobreajusta.',
        hints: ['get_depth() da la profundidad', 'plot_tree visualiza el árbol'],
      },
      {
        id: '4.3-gp-3',
        instruction: 'Entrena Random Forest y compara.',
        codeTemplate: `from sklearn.ensemble import RandomForestClassifier

# Random Forest con 100 árboles
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

y_pred_rf = rf.predict(X_test)
print("Random Forest (100 árboles):")
print(f"  Accuracy: {accuracy_score(y_test, y_pred_rf):.4f}")
print(f"\\nClassification Report:")
print(classification_report(y_test, y_pred_rf, target_names=wine.target_names))

# Importancia de features
importancia = pd.Series(rf.feature_importances_, index=wine.feature_names).sort_values(ascending=True)
print("\\nTop 5 features más importantes:")
for feat, imp in importancia.tail(5).items():
    print(f"  {feat}: {imp:.4f}")`,
        explanation: 'Random Forest combina 100 árboles para reducir sobreajuste.',
        hints: ['n_estimators es el número de árboles', 'feature_importances_ mide la relevancia'],
      },
      {
        id: '4.3-gp-4',
        instruction: 'Compara efecto de la profundidad del árbol.',
        codeTemplate: `depths = range(1, 15)
train_scores = []
test_scores = []

for d in depths:
    t = DecisionTreeClassifier(max_depth=d, random_state=42)
    t.fit(X_train, y_train)
    train_scores.append(accuracy_score(y_train, t.predict(X_train)))
    test_scores.append(accuracy_score(y_test, t.predict(X_test)))

plt.figure(figsize=(8, 5))
plt.plot(depths, train_scores, 'o-', label='Train', color='steelblue')
plt.plot(depths, test_scores, 's-', label='Test', color='coral')
plt.xlabel('Profundidad del árbol')
plt.ylabel('Accuracy')
plt.title('Efecto de la profundidad en el sobreajuste')
plt.legend()
plt.grid(True, alpha=0.3)
plt.xticks(depths)
plt.tight_layout()
plt.show()

best_depth = depths[test_scores.index(max(test_scores))]
print(f"Mejor profundidad: {best_depth} (test accuracy: {max(test_scores):.4f}")`,
        explanation: 'Visualizamos el trade-off entre bias y varianza según la profundidad.',
        hints: ['Profundidad baja = underfitting', 'Profundidad alta = overfitting'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '4.3-ch',
    title: 'Comparación de modelos en dataset real',
    description: 'Compara Logistic Regression, Decision Tree y Random Forest en el dataset Breast Cancer.',
    language: 'python',
    codeTemplate: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import numpy as np

data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.2, random_state=42, stratify=data.target
)

# Tu código:
# 1. Crea pipelines con escalado para cada modelo
# 2. Compara con cross_val_score (5-fold)
# 3. Evalúa en test set
# 4. ¿Qué modelo es mejor? ¿Por qué?`,
    expectedApproach: 'Pipeline(StandardScaler, modelo) → cross_val_score → score en test.',
    evaluationCriteria: ['Pipelines correctos', 'Validación cruzada', 'Comparación justa'],
  },
  assessment: {
    id: '4.3-assess',
    passingScore: 70,
    questions: [
      {
        id: '4.3-q1',
        type: 'multiple-choice',
        text: '¿Qué es el sobreajuste (overfitting)?',
        options: [
          { id: 'a', text: 'El modelo es demasiado simple' },
          { id: 'b', text: 'El modelo memoriza el training data' },
          { id: 'c', text: 'El modelo generaliza bien' },
          { id: 'd', text: 'El modelo tiene bajo bias' },
        ],
        correctAnswer: 'b',
        explanation: 'Overfitting = el modelo aprende ruido del training data y no generaliza.',
        conceptLinked: 'Sobreajuste',
        difficulty: 'easy',
      },
      {
        id: '4.3-q2',
        type: 'multiple-choice',
        text: '¿Cómo reduce Random Forest el sobreajuste?',
        options: [
          { id: 'a', text: 'Usando un solo árbol profundo' },
          { id: 'b', text: 'Promediando múltiples árboles con bagging' },
          { id: 'c', text: 'Eliminando features' },
          { id: 'd', text: 'Usando solo variables numéricas' },
        ],
        correctAnswer: 'b',
        explanation: 'Bagging + Features aleatorias = árboles decorrelacionados cuyo promedio reduce varianza.',
        conceptLinked: 'Random Forest',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Árboles de decisión', 'Random Forest', 'Ensemble', 'Overfitting', 'Feature importance'],
};
