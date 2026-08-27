import type { Lesson } from '@/types/course';

export const LESSON_4_2: Lesson = {
  id: '4.2',
  code: '4.2',
  title: 'Regresión lineal',
  objectives: [
    'Explicar el modelo de regresión lineal',
    'Calcular coeficientes manualmente',
    'Interpretar R² y residuos',
    'Aplicar regresión múltiple con scikit-learn',
  ],
  theory: [
    {
      id: '4.2-t1',
      type: 'text',
      title: '¿Qué es la regresión lineal?',
      content: 'La regresión lineal modela la relación entre una variable dependiente (y) y una o más independientes (X) mediante una línea recta.',
    },
    {
      id: '4.2-t2',
      type: 'formula',
      title: 'Modelo de regresión simple',
      content: 'La ecuación de la recta de regresión:',
      formula: 'ŷ = β₀ + β₁·x',
    },
    {
      id: '4.2-t3',
      type: 'formula',
      title: 'Mínimos cuadrados ordinarios',
      content: 'Los coeficientes se calculan minimizando la suma de errores al cuadrado:',
      formula: 'β₁ = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²',
    },
    {
      id: '4.2-t4',
      type: 'text',
      title: 'R² (coeficiente de determinación)',
      content: 'Indica qué proporción de la varianza de y es explicada por el modelo. R²=1 es ajuste perfecto, R²=0 es igual que predecir la media.',
    },
    {
      id: '4.2-t5',
      type: 'warning',
      title: 'Supuestos de la regresión lineal',
      content: 'Linealidad, independencia de residuos, homocedasticidad (varianza constante), normalidad de residuos. Si se violan, los resultados pueden ser engañosos.',
    },
  ],
  visualExamples: [
    {
      id: '4.2-v1',
      type: 'chart',
      title: 'Regresión lineal ajustada',
      description: 'Visualiza la línea de mejor ajuste con intervalos de confianza.',
      chartType: 'scatter',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '4.2-a1',
      type: 'numeric',
      title: 'Calcular pendiente',
      question: 'Si x̄=5, ȳ=10, Σ(xi-x̄)(yi-ȳ)=20, Σ(xi-x̄)²=8, ¿cuál es β₁?',
      correctAnswer: '2.5',
      explanation: 'β₁ = 20 / 8 = 2.5. Por cada unidad que aumenta x, y aumenta 2.5.',
      conceptLinked: 'Mínimos cuadrados',
    },
    {
      id: '4.2-a2',
      type: 'multiple-choice',
      title: 'Interpretar R²',
      question: 'Un modelo tiene R² = 0.85. ¿Qué significa?',
      options: [
        { id: 'a', text: 'El modelo es 85% correcto' },
        { id: 'b', text: 'El 85% de la varianza de y es explicada por X' },
        { id: 'c', text: '85% de los datos son precisos' },
        { id: 'd', text: 'El error es del 15%' },
      ],
      correctAnswer: 'b',
      explanation: 'R² = 0.85 significa que el 85% de la variabilidad en y se explica por el modelo.',
      conceptLinked: 'Coeficiente de determinación',
    },
  ],
  guidedPractice: {
    id: '4.2-gp',
    title: 'Regresión con scikit-learn',
    objective: 'Construir un modelo de regresión lineal múltiple para predecir precios',
    steps: [
      {
        id: '4.2-gp-1',
        instruction: 'Genera un dataset con relaciones lineales.',
        codeTemplate: `import numpy as np
import pandas as pd

np.random.seed(42)
n = 300

# Precio de vivienda = f(tamaño, habitaciones, edad)
tamano = np.random.uniform(50, 200, n)
habitaciones = np.random.randint(1, 6, n)
edad = np.random.uniform(0, 50, n)

# Relación lineal con ruido
precio = 1500 * tamano + 20000 * habitaciones - 1000 * edad + np.random.normal(0, 30000, n)

df = pd.DataFrame({
    'tamano_m2': tamano.round(1),
    'habitaciones': habitaciones,
    'edad_anios': edad.round(1),
    'precio': precio.round(0)
})

print(df.head())
print(f"\\nCorrelaciones con precio:")
print(df.corr()['precio'].round(3))`,
        explanation: 'Creamos datos de vivienda con 3 variables predictoras.',
        hints: ['np.random.uniform genera valores uniformes', 'df.corr() calcula correlaciones'],
      },
      {
        id: '4.2-gp-2',
        instruction: 'Entrena y evalúa el modelo.',
        codeTemplate: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# Separar features y target
X = df[['tamano_m2', 'habitaciones', 'edad_anios']]
y = df['precio']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluar
y_pred = model.predict(X_test)

print("Coeficientes:")
for name, coef in zip(X.columns, model.coef_):
    print(f"  {name}: {coef:,.0f}")
print(f"\\nIntercepto: {model.intercept_:,.0f}")
print(f"\\nR² train: {model.score(X_train, y_train):.4f}")
print(f"R² test: {r2_score(y_test, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):,.0f}")`,
        explanation: 'LinearRegression ajusta el modelo por mínimos cuadrados.',
        hints: ['train_test_split separa datos', 'R² y RMSE evalúan el modelo'],
      },
      {
        id: '4.2-gp-3',
        instruction: 'Analiza los residuos.',
        codeTemplate: `import matplotlib.pyplot as plt

residuos = y_test - y_pred

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Residuos vs predichos
axes[0].scatter(y_pred, residuos, alpha=0.5, s=20)
axes[0].axhline(y=0, color='red', linestyle='--')
axes[0].set_xlabel('Valores predichos')
axes[0].set_ylabel('Residuos')
axes[0].set_title('Residuos vs Predichos')
axes[0].grid(True, alpha=0.3)

# Histograma de residuos
axes[1].hist(residuos, bins=25, edgecolor='white', alpha=0.7, color='steelblue')
axes[1].set_title('Distribución de residuos')
axes[1].set_xlabel('Residuo')
axes[1].axvline(x=0, color='red', linestyle='--')

plt.tight_layout()
plt.show()

# Estadísticas de residuos
print(f"Media residuos: {residuos.mean():.2f}")
print(f"Std residuos: {residuos.std():.2f}")`,
        explanation: 'Los residuos deben ser aleatorios (sin patrones) y normalmente distribuidos.',
        hints: ['Residuos = y_real - y_predicho', 'Si hay patrones, el modelo puede no ser adecuado'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '4.2-ch',
    title: 'Regresión de ventas con features',
    description: 'Construye un modelo de regresión para predecir ventas usando al menos 5 variables.',
    language: 'python',
    codeTemplate: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

np.random.seed(42)
n = 500

# Dataset de ventas
df = pd.DataFrame({
    'precio': np.random.uniform(10, 100, n),
    'gasto_pub': np.random.uniform(100, 10000, n),
    'competidores': np.random.randint(0, 20, n),
    'estacion': np.random.choice(['Primavera', 'Verano', 'Otoño', 'Invierno'], n),
    'dia_semana': np.random.choice(['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], n),
    'ventas': np.random.poisson(200, n)
})

# Tu modelo:
# 1. Codifica variables categóricas
# 2. Divide train/test
# 3. Entrena regresión múltiple
# 4. Evalúa R², RMSE
# 5. ¿Qué variables son más importantes?`,
    expectedApproach: 'pd.get_dummies → train_test_split → LinearRegression → métricas.',
    evaluationCriteria: ['Codificación correcta', 'Evaluación completa', 'Interpretación de coeficientes'],
    hints: [
      'Codifica categóricas con pd.get_dummies(df, drop_first=True) para evitar multicolinealidad en regresión',
      'Divide datos: X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)',
      'Entrena con LinearRegression().fit(X_train, y_train) y evalúa con model.score(X_test, y_test) para R²',
      'RMSE se calcula: np.sqrt(mean_squared_error(y_test, y_pred)). Un RMSE más bajo es mejor',
      'Los coeficientes model.coef_ te dicen la importancia relativa de cada variable: valores absolutos altos = mayor impacto',
    ],
  },
  assessment: {
    id: '4.2-assess',
    passingScore: 70,
    questions: [
      {
        id: '4.2-q1',
        type: 'numeric',
        text: 'Si β₁ = 3 y β₂ = -2, al aumentar x₁ en 1 unidad y x₂ en 2 unidades, ¿cuánto cambia ŷ?',
        correctAnswer: '-1',
        explanation: 'Δŷ = 3(1) + (-2)(2) = 3 - 4 = -1.',
        conceptLinked: 'Interpretación de coeficientes',
        difficulty: 'easy',
      },
      {
        id: '4.2-q2',
        type: 'multiple-choice',
        text: '¿Qué indica un residuo positivo grande?',
        options: [
          { id: 'a', text: 'El modelo sobreestimó' },
          { id: 'b', text: 'El modelo subestimó' },
          { id: 'c', text: 'La variable es irrelevante' },
          { id: 'd', text: 'Hay outliers en X' },
        ],
        correctAnswer: 'b',
        explanation: 'Residuo = y_real - y_predicho. Si es positivo, el real fue mayor que el predicho (subestimó).',
        conceptLinked: 'Análisis de residuos',
        difficulty: 'medium',
      },
    ],
  },
  competencies: ['Regresión lineal', 'Mínimos cuadrados', 'R²', 'Residuos', 'scikit-learn'],
};
