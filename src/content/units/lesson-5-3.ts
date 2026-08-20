import type { Lesson } from '@/types/course';

export const LESSON_5_3: Lesson = {
  id: '5.3',
  code: '5.3',
  title: 'Ciencia de Datos en el sector salud',
  objectives: [
    'Identificar aplicaciones de CD en salud',
    'Analizar datos clínicos con Python',
    'Evaluar modelos de predicción de diagnóstico',
    'Discutir retos éticos en salud digital',
  ],
  theory: [
    {
      id: '5.3-t1',
      type: 'text',
      title: 'CD transformando la salud',
      content: 'La Ciencia de Datos revoluciona la medicina: predicción temprana de enfermedades, optimización de tratamientos, descubrimiento de fármacos, gestión hospitalaria y salud pública.',
    },
    {
      id: '5.3-t2',
      type: 'list',
      title: 'Aplicaciones clave',
      items: [
        'Diagnóstico asistido por IA (imágenes médicas)',
        'Predicción de reingresos hospitalarios',
        'Personalización de tratamientos (medicina de precisión)',
        'Detección de brotes epidémicos',
        'Optimización de recursos hospitalarios',
      ],
    },
    {
      id: '5.3-t3',
      type: 'warning',
      title: 'Retos éticos en salud',
      content: 'Privacidad de historiales médicos, sesgo en datasets (subrepresentación de grupos), responsabilidad de decisiones clínicas automatizadas, necesidad de validación clínica rigurosa.',
    },
    {
      id: '5.3-t4',
      type: 'text',
      title: 'Métricas críticas en salud',
      content: 'En diagnóstico, la sensibilidad (detectar enfermos) suele ser más importante que la especificidad. Un falso negativo (no detectar enfermedad) es más peligroso que un falso positivo.',
    },
  ],
  visualExamples: [
    {
      id: '5.3-v1',
      type: 'chart',
      title: 'Matriz de confusión clínica',
      description: 'Visualiza verdaderos positivos, falsos negativos y su impacto.',
      chartType: 'heatmap',
      interactive: false,
    },
  ],
  activities: [
    {
      id: '5.3-a1',
      type: 'multiple-choice',
      title: 'Métrica prioritaria',
      question: 'En un modelo de detección de cáncer, ¿qué métrica es más crítica maximizar?',
      options: [
        { id: 'a', text: 'Especificidad' },
        { id: 'b', text: 'Precisión' },
        { id: 'c', text: 'Sensibilidad (Recall)' },
        { id: 'd', text: 'Exactitud (Accuracy)' },
      ],
      correctAnswer: 'c',
      explanation: 'La sensibilidad maximiza la detección de casos positivos (enfermos). Un falso negativo puede costar la vida.',
      conceptLinked: 'Métricas en salud',
    },
  ],
  guidedPractice: {
    id: '5.3-gp',
    title: 'Predicción de diabetes',
    objective: 'Construir un modelo para predecir diabetes usando datos clínicos',
    steps: [
      {
        id: '5.3-gp-1',
        instruction: 'Genera un dataset clínico simulado.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 500

# Simular dataset de diabetes (similar al Pima Indians Diabetes)
glucosa = np.where(np.random.random(n) > 0.3,
                   np.random.normal(140, 30, n),
                   np.random.normal(100, 15, n))
presion = np.random.normal(72, 12, n)
imc = np.random.normal(32, 8, n)
edad = np.random.randint(20, 80, n)
insulina = np.random.lognormal(4.5, 0.8, n)

# Variable objetivo con relación a las features
probabilidad = 1 / (1 + np.exp(-(0.02*(glucosa-100) + 0.03*(imc-25) + 0.01*(edad-40) - 2)))
diabetes = (np.random.random(n) < probabilidad).astype(int)

df = pd.DataFrame({
    'glucosa': glucosa.round(0),
    'presion_arterial': presion.round(0),
    'imc': imc.round(1),
    'edad': edad,
    'insulina': insulina.round(0),
    'diabetes': diabetes
})

print(f"Dataset: {len(df)} pacientes")
print(f"Diabéticos: {df['diabetes'].sum()} ({df['diabetes'].mean():.1%})")
print(f"\\nEstadísticas por grupo:")
print(df.groupby('diabetes').mean().round(1))`,
        explanation: 'Dataset clínico simulado basado en el Pima Indians Diabetes Dataset.',
        hints: ['La función sigmoide modela probabilidades', 'Las variables están correlacionadas con el resultado'],
      },
      {
        id: '5.3-gp-2',
        instruction: 'Entrena un modelo y analiza la matriz de confusión.',
        codeTemplate: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt

X = df.drop('diabetes', axis=1)
y = df['diabetes']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Matriz de confusión
cm = confusion_matrix(y_test, y_pred)
print("Matriz de confusión:")
print(cm)
print(f"\\nVerdaderos Negativos: {cm[0][0]}")
print(f"Falsos Positivos: {cm[0][1]}")
print(f"Falsos Negativos: {cm[1][0]}  ← ¡Los más peligrosos!")
print(f"Verdaderos Positivos: {cm[1][1]}")
print(f"\\n{classification_report(y_test, y_pred, target_names=['Sano', 'Diabético'])}")`,
        explanation: 'La matriz de confusión revela qué tipos de errores comete el modelo.',
        hints: ['Falsos negativos = enfermos no detectados', 'Verdaderos positivos = enfermos detectados'],
      },
      {
        id: '5.3-gp-3',
        instruction: 'Ajusta el umbral para priorizar sensibilidad.',
        codeTemplate: `# Obtener probabilidades en lugar de predicciones binarias
y_proba = model.predict_proba(X_test)[:, 1]

# Evaluar diferentes umbrales
umbrales = [0.3, 0.4, 0.5, 0.6, 0.7]
print("Umbral | Sensibilidad | Especificidad | Precisión")
print("-" * 55)

for u in umbrales:
    y_pred_u = (y_proba >= u).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_test, y_pred_u).ravel()
    sens = tp / (tp + fn) if (tp + fn) > 0 else 0
    esp = tn / (tn + fp) if (tn + fp) > 0 else 0
    prec = tp / (tp + fp) if (tp + fp) > 0 else 0
    print(f"  {u:.1f}   |    {sens:.3f}    |     {esp:.3f}     |   {prec:.3f}")

print(f"\\nRecomendación: usar umbral 0.3 para maximizar sensibilidad en screening")`,
        explanation: 'Bajar el umbral aumenta la sensibilidad (detectamos más enfermos) pero reduce la especificidad.',
        hints: ['Umbral bajo = más sensibilidad, menos especificidad', 'En screening médico se prioriza sensibilidad'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '5.3-ch',
    title: 'Análisis de reingresos hospitalarios',
    description: 'Construye un modelo que prediga qué pacientes tienen alto riesgo de reingresar en 30 días.',
    language: 'python',
    codeTemplate: `import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, classification_report

np.random.seed(42)
n = 800

# Dataset de reingresos
df = pd.DataFrame({
    'edad': np.random.normal(65, 12, n).astype(int).clip(18, 100),
    'dias_estancia': np.random.poisson(5, n) + 1,
    'num_diagnosticos': np.random.poisson(3, n),
    'num_procedimientos': np.random.poisson(2, n),
    'comorbilidades': np.random.poisson(1.5, n),
    'seguro': np.random.choice(['IMSS', 'ISSSTE', 'Privado', 'Ninguno'], n, p=[0.4, 0.2, 0.3, 0.1]),
    'reingreso_30d': np.random.choice([0, 1], n, p=[0.8, 0.2])
})

# Tu código:
# 1. Analiza qué variables se asocian con reingreso
# 2. Preprocesa (escala numéricas, codifica categóricas)
# 3. Entrena GradientBoostingClassifier
# 4. Evalúa con AUC y sensibilidad
# 5. ¿Qué pacientes priorizarías?`,
    expectedApproach: 'EDA → preprocesamiento → GradientBoosting → AUC + sensibilidad al umbral óptimo.',
    evaluationCriteria: ['Análisis exploratorio', 'Modelo adecuado', 'Métricas clínicas relevantes'],
  },
  assessment: {
    id: '5.3-assess',
    passingScore: 70,
    questions: [
      {
        id: '5.3-q1',
        type: 'multiple-choice',
        text: '¿Por qué la sensibilidad es más crítica que la precisión en detección de enfermedades?',
        options: [
          { id: 'a', text: 'Porque es más fácil de calcular' },
          { id: 'b', text: 'Porque un falso negativo tiene consecuencias graves' },
          { id: 'c', text: 'Porque los datos están balanceados' },
          { id: 'd', text: 'Porque los médicos prefieren esa métrica' },
        ],
        correctAnswer: 'b',
        explanation: 'En salud, no detectar una enfermedad (falso negativo) puede significar la muerte del paciente.',
        conceptLinked: 'Métricas clínicas',
        difficulty: 'easy',
      },
      {
        id: '5.3-q2',
        type: 'multiple-choice',
        text: '¿Qué es la medicina de precisión?',
        options: [
          { id: 'a', text: 'Usar solo datos precisos' },
          { id: 'b', text: 'Personalizar tratamientos según perfil genético/clínico' },
          { id: 'c', text: 'Medir todo con alta precisión' },
          { id: 'd', text: 'Usar instrumentos de precisión' },
        ],
        correctAnswer: 'b',
        explanation: 'La medicina de precisión tailora tratamientos a las características individuales del paciente.',
        conceptLinked: 'Medicina de precisión',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Salud digital', 'Diagnóstico asistido', 'Métricas clínicas', 'Ética en salud'],
};
