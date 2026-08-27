import type { Lesson } from '@/types/course';

export const LESSON_5_4: Lesson = {
  id: '5.4',
  code: '5.4',
  title: 'Tendencias y proyecto integrador',
  objectives: [
    'Identificar tendencias actuales en Ciencia de Datos',
    'Planificar un proyecto de fin de curso',
    'Integrar todas las unidades en un caso práctico',
    'Presentar resultados de forma profesional',
  ],
  theory: [
    {
      id: '5.4-t1',
      type: 'text',
      title: 'Tendencias actuales',
      content: 'La Ciencia de Datos evoluciona rápidamente. Tendencias 2025-2026: IA generativa aplicada a análisis, MLOps y monitoreo de modelos, datos sintéticos, análisis de texto a escala, ciencia de datos autoexplicable.',
    },
    {
      id: '5.4-t2',
      type: 'list',
      title: 'Herramientas emergentes',
      items: [
        'LangChain / LlamaIndex para RAG',
        'MLflow / Weights & Biases para experiment tracking',
        'DuckDB / Polars para análisis rápido',
        'Streamlit / Gradio para despliegue de modelos',
        'Great Expectations para validación de datos',
      ],
    },
    {
      id: '5.4-t3',
      type: 'text',
      title: 'El ciclo de un proyecto completo',
      content: 'Un proyecto real sigue: pregunta de negocio → recolección → limpieza → EDA → modelado → evaluación → despliegue → monitoreo. Cada etapa requiere habilidades de las 5 unidades.',
    },
    {
      id: '5.4-t4',
      type: 'text',
      title: 'Comunicación de resultados',
      content: 'El mejor análisis es inútil si no se comunica bien. Principios: conocé tu audiencia, empezá con el hallazgo clave, usá visualizaciones claras, documentá tu código.',
    },
  ],
  visualExamples: [
    {
      id: '5.4-v1',
      type: 'diagram',
      title: 'Proyecto integrador de CD',
      description: 'Diagrama del flujo completo de un proyecto de Ciencia de Datos: desde la pregunta hasta el deploy.',
      interactive: false,
      items: [
        { label: 'Pregunta de negocio', detail: 'Definir el problema concreto y las métricas de éxito.', color: 'primary' },
        { label: 'Pipeline de datos', detail: 'ETL, limpieza, feature engineering, almacenamiento.', color: 'warning' },
        { label: 'Modelado y evaluación', detail: 'Entrenar, validar con cross-validation, comparar modelos.', color: 'success' },
        { label: 'Deploy y monitoreo', detail: 'API REST, dashboard, detección de drift, reentrenamiento.', color: 'danger' },
      ],
    },
  ],
  activities: [
    {
      id: '5.4-a1',
      type: 'multiple-choice',
      title: 'Herramienta adecuada',
      question: '¿Qué herramienta usarías para registrar experimentos de ML?',
      options: [
        { id: 'a', text: 'Excel' },
        { id: 'b', text: 'MLflow' },
        { id: 'c', text: 'Notepad' },
        { id: 'd', text: 'PowerPoint' },
      ],
      correctAnswer: 'b',
      explanation: 'MLflow es una plataforma especializada en tracking de experimentos de ML.',
      conceptLinked: 'MLOps',
    },
  ],
  guidedPractice: {
    id: '5.4-gp',
    title: 'Proyecto integrador: Caso completo',
    objective: 'Resolver un problema real usando todo lo aprendido en el curso',
    steps: [
      {
        id: '5.4-gp-1',
        instruction: 'Carga y explora un dataset real.',
        codeTemplate: `import pandas as pd
import numpy as np

# Dataset de clientes de telecomunicaciones
np.random.seed(42)
n = 1000

df = pd.DataFrame({
    'antiguedad_meses': np.random.exponential(24, n).astype(int) + 1,
    'cargo_mensual': np.random.uniform(20, 100, n).round(2),
    'cargo_total': np.random.uniform(200, 8000, n).round(2),
    'servicio_internet': np.random.choice(['DSL', 'Fibra óptica', 'No'], n, p=[0.35, 0.45, 0.2]),
    'contrato': np.random.choice(['Mes a mes', 'Un año', 'Dos años'], n, p=[0.5, 0.3, 0.2]),
    'genero': np.random.choice(['M', 'F'], n),
    'abandono': np.random.choice([0, 1], n, p=[0.73, 0.27])
})

print("=== EXPLORACIÓN ===")
print(f"Registros: {len(df)}")
print(f"\\nDistribución de abandono:")
print(df['abandono'].value_counts(normalize=True).round(3))
print(f"\\nEstadísticas numéricas:")
print(df.describe())`,
        explanation: 'Dataset de churn (abandono) de clientes de telecomunicaciones.',
        hints: ['np.random.exponential genera distribución exponencial', 'value_counts(normalize=True) da proporciones'],
      },
      {
        id: '5.4-gp-2',
        instruction: 'Limpia y transforma los datos.',
        codeTemplate: `from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Identificar tipos
num_cols = ['antiguedad_meses', 'cargo_mensual', 'cargo_total']
cat_cols = ['servicio_internet', 'contrato', 'genero']

# Crear preprocesador
preprocessor = ColumnTransformer([
    ('num', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ]), num_cols),
    ('cat', Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(drop='first', sparse_output=False))
    ]), cat_cols)
])

print("Preprocesador creado:")
print(f"  Variables numéricas: {num_cols}")
print(f"  Variables categóricas: {cat_cols}")`,
        explanation: 'Creamos un pipeline de preprocesamiento completo.',
        hints: ['ColumnTransformer aplica diferentes transformaciones', 'drop_first evita multicolinealidad'],
      },
      {
        id: '5.4-gp-3',
        instruction: 'Entrena y compara modelos.',
        codeTemplate: `from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
import warnings
warnings.filterwarnings('ignore')

X = df.drop('abandono', axis=1)
y = df['abandono']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Modelo 1: Regresión logística
pipe_lr = Pipeline([('prep', preprocessor), ('clf', LogisticRegression(max_iter=1000))])
pipe_lr.fit(X_train, y_train)
y_pred_lr = pipe_lr.predict(X_test)
auc_lr = roc_auc_score(y_test, pipe_lr.predict_proba(X_test)[:, 1])

# Modelo 2: Random Forest
pipe_rf = Pipeline([('prep', preprocessor), ('clf', RandomForestClassifier(n_estimators=100, random_state=42))])
pipe_rf.fit(X_train, y_train)
y_pred_rf = pipe_rf.predict(X_test)
auc_rf = roc_auc_score(y_test, pipe_rf.predict_proba(X_test)[:, 1])

print("=== RESULTADOS ===")
print(f"Regresión Logística - AUC: {auc_lr:.4f}")
print(f"Random Forest - AUC: {auc_rf:.4f}")
print(f"\\nMejor modelo: {'Random Forest' if auc_rf > auc_lr else 'Regresión Logística'}")`,
        explanation: 'Comparamos dos modelos con la métrica AUC.',
        hints: ['AUC mide capacidad discriminativa', 'Pipeline mantiene el preprocesamiento integrado'],
      },
    ],
    language: 'python',
  },
  challenge: {
    id: '5.4-ch',
    title: 'Proyecto final: Análisis completo',
    description: 'Selecciona un dataset real, réalizalo EDA completo, limpia, modela y presenta los hallazgos.',
    language: 'python',
    codeTemplate: `# Proyecto Integrador Final
# 
# Elige UN dataset de: 
# - https://www.kaggle.com/datasets
# - https://archive.ics.uci.edu/ml/datasets.php
#
# Tu entrega debe incluir:
# 1. Pregunta de negocio clara
# 2. EDA con visualizaciones
# 3. Limpieza y transformación
# 4. Al menos 2 modelos comparados
# 5. Métricas de evaluación
# 6. Conclusiones y recomendaciones
# 7. Código documentado`,
    expectedApproach: 'Flujo completo: pregunta → datos → EDA → limpieza → modelado → evaluación → conclusiones.',
    evaluationCriteria: ['Pregunta clara', 'EDA exhaustivo', 'Modelos justificados', 'Resultados comunicados'],
    hints: [
      'Empieza definiendo una pregunta de negocio clara y medible: "¿Qué factores predicen la cancelación de clientes?" es mejor que "Analizar clientes"',
      'Flujo completo: carga → EDA (df.info, describe, visualizaciones) → limpieza (faltantes, outliers) → modelado → evaluación',
      'Usa al menos 2 modelos diferentes y compáralos: LogisticRegression vs RandomForest, o LinearRegression vs GradientBoosting',
      'Documenta cada sección con markdown o comentarios: # 1. Pregunta de negocio, # 2. Exploración de datos, etc.',
      'Termina con conclusiones accionables: "El factor más importante es X, se recomienda acción Y para reducir Z"',
    ],
  },
  assessment: {
    id: '5.4-assess',
    passingScore: 70,
    questions: [
      {
        id: '5.4-q1',
        type: 'multiple-choice',
        text: '¿Cuál es el primer paso en un proyecto de Ciencia de Datos?',
        options: [
          { id: 'a', text: 'Elegir un algoritmo' },
          { id: 'b', text: 'Cargar los datos' },
          { id: 'c', text: 'Definir la pregunta de negocio' },
          { id: 'd', text: 'Crear visualizaciones' },
        ],
        correctAnswer: 'c',
        explanation: 'Sin una pregunta clara, el análisis no tiene dirección ni valor.',
        conceptLinked: 'Metodología de proyectos',
        difficulty: 'easy',
      },
    ],
  },
  competencies: ['Proyecto integrador', 'Tendencias', 'Comunicación', 'Metodología'],
};
