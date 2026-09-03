import type { Practice } from '@/types/course';

export const PRACTICES_DATA: Practice[] = [
  {
    id: 'p1',
    title: 'Introducción a Python y R para Ciencia de Datos',
    objective: 'Familiarizarse con el entorno de Python (el único que se ejecuta aquí en el navegador), ejecutar comandos básicos y entender por qué Python y R son fundamentales en Ciencia de Datos.',
    language: 'both',
    steps: [
      {
        id: 'p1-s1',
        instruction: 'Imprime tu primer mensaje en Python para confirmar que el entorno funciona correctamente.',
        codeTemplate: `# Tu primera línea de código en Python
print("¡Hola, Ciencia de Datos!")
print("Python está listo para analizar datos")

# Imprime el tipo de dato de un número
x = 42
print(f"El valor {x} es de tipo: {type(x).__name__}")`,
        expectedOutput: '¡Hola, Ciencia de Datos!\nPython está listo para analizar datos\nEl valor 42 es de tipo: int',
        explanation: 'Python es un lenguaje interpretado que permite ejecutar código línea por línea. La función print() muestra resultados en consola.',
        hints: ['Usa print() para mostrar texto', 'Las f-strings permiten interpolar variables con {}']
      },
      {
        id: 'p1-s2',
        instruction: 'Crea listas y diccionarios en Python, las estructuras de datos más utilizadas en Ciencia de Datos.',
        codeTemplate: `# Listas: colecciones ordenadas
notas = [85, 90, 78, 92, 88]
print(f"Notas: {notas}")
print(f"Promedio: {sum(notas) / len(notas)}")

# Diccionarios: pares clave-valor
estudiante = {
    "nombre": "Ana García",
    "edad": 21,
    "carrera": "Ingeniería",
    "promedio": 86.6
}

for clave, valor in estudiante.items():
    print(f"{clave}: {valor}")`,
        explanation: 'Las listas almacenan múltiples valores. Los diccionarios asocian claves con valores, ideales para representar registros de datos.',
        hints: ['Las listas usan [] y los diccionarios {}', 'Usa .items() para iterar claves y valores']
      },
      {
        id: 'p1-s3',
        instruction: 'Instala y usa NumPy para operaciones numéricas básicas.',
        codeTemplate: `import numpy as np

# Crear un arreglo de números
edades = np.array([22, 25, 21, 23, 28, 30, 24])
print(f"Edades: {edades}")
print(f"Media: {edades.mean():.1f}")
print(f"Desviación estándar: {edades.std():.1f}")
print(f"Mínimo: {edades.min()}, Máximo: {edades.max()}")

# Operaciones vectorizadas
edades_dobles = edades * 2
print(f"Edades duplicadas: {edades_dobles}")`,
        explanation: 'NumPy es la librería base para computación científica en Python. Sus arreglos son mucho más rápidos que las listas para operaciones matemáticas.',
        hints: ['np.array() crea un arreglo NumPy', 'Los métodos .mean(), .std() calculan estadísticas']
      }
    ]
  },
  {
    id: 'p2',
    title: 'Uso de notebooks para análisis de datos',
    objective: 'Aprender a estructurar un análisis de datos en celdas, mezclando código, resultados y texto explicativo.',
    language: 'python',
    steps: [
      {
        id: 'p2-s1',
        instruction: 'Crea un análisis paso a paso: importa librerías, carga datos y explora su estructura.',
        codeTemplate: `import pandas as pd
import numpy as np

# Simular un dataset de estudiantes
np.random.seed(42)
n = 50
datos = pd.DataFrame({
    'nombre': [f'Estudiante_{i}' for i in range(1, n+1)],
    'edad': np.random.randint(18, 25, n),
    'promedio': np.round(np.random.normal(75, 10, n), 1),
    'materia': np.random.choice(['Matemáticas', 'Física', 'Programación'], n)
})

print("=== Primeras 5 filas ===")
print(datos.head())
print(f"=== Dimensiones: {datos.shape} ===")
print(f"=== Tipos de datos ===")
print(datos.dtypes)`,
        explanation: 'Un notebook permite organizar el análisis en celdas independientes. Cada celda puede contener código, visualizaciones o texto explicativo.',
        hints: ['pd.DataFrame() crea una tabla de datos', '.head() muestra las primeras filas']
      },
      {
        id: 'p2-s2',
        instruction: 'Genera estadísticas descriptivas y resume la información del dataset.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
datos = pd.DataFrame({
    'nombre': [f'Estudiante_{i}' for i in range(1, 51)],
    'edad': np.random.randint(18, 25, 50),
    'promedio': np.round(np.random.normal(75, 10, 50), 1),
    'materia': np.random.choice(['Matemáticas', 'Física', 'Programación'], 50)
})

# Resumen estadístico completo
print("=== Resumen Estadístico ===")
print(datos.describe())

print("=== Promedio por materia ===")
print(datos.groupby('materia')['promedio'].mean().round(2))

print("=== Distribución de edades ===")
print(datos['edad'].value_counts().sort_index())`,
        explanation: 'La función describe() genera estadísticas como media, desviación, percentiles. groupby() permite agrupar datos por categorías.',
        hints: ['describe() genera un resumen estadístico', 'groupby() agrupa los datos']
      }
    ]
  },
  {
    id: 'p3',
    title: 'Repositorios de datos abiertos',
    objective: 'Aprender a cargar, explorar y guardar datasets de diferentes fuentes.',
    language: 'python',
    dataset: 'heights',
    steps: [
      {
        id: 'p3-s1',
        instruction: 'Crea un dataset simulado de estaturas y guárdalo como CSV.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)

# Generar datos simulados de estaturas
n = 100
u1 = np.random.random(n)
u2 = np.random.random(n)
z = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
estaturas = np.round(170 + z * 8, 1)

df = pd.DataFrame({
    'id': range(1, n+1),
    'estatura_cm': estaturas,
    'genero': np.random.choice(['M', 'F'], n)
})

print("=== Primeras 10 filas ===")
print(df.head(10))
print(f"Estadísticas:")
print(f"Media: {df['estatura_cm'].mean():.1f} cm")
print(f"Desviación: {df['estatura_cm'].std():.1f} cm")`,
        explanation: 'Los datos simulados son útiles para probar algoritmos antes de trabajar con datos reales. La distribución normal se genera con el método Box-Muller.',
        hints: ['np.random.random() genera números uniformes [0,1)', 'La fórmula Box-Muller convierte uniformes a normales']
      },
      {
        id: 'p3-s2',
        instruction: 'Explora la estructura del dataset: tipos, nulos, dimensiones.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 100
u1 = np.random.random(n)
u2 = np.random.random(n)
z = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
estaturas = np.round(170 + z * 8, 1)

df = pd.DataFrame({
    'id': range(1, n+1),
    'estatura_cm': estaturas,
    'genero': np.random.choice(['M', 'F'], n)
})

# Introducir algunos valores nulos para explorar
df.loc[5:7, 'estatura_cm'] = np.nan

print(f"Dimensiones: {df.shape}")
print(f"Valores nulos por columna:")
print(df.isnull().sum())
print(f"Tipos de datos:")
print(df.dtypes)
print(f"Resumen:")
print(df.describe())`,
        explanation: 'Antes de analizar datos, es fundamental entender su estructura: dimensiones, tipos de datos y valores faltantes.',
        hints: ['.shape devuelve (filas, columnas)', '.isnull().sum() cuenta valores nulos']
      }
    ]
  },
  {
    id: 'p4',
    title: 'Comparación Python vs R',
    objective: 'Comparar la sintaxis y el enfoque de Python (ejecutable aquí) con el de R (referencia conceptual) para tareas comunes de Ciencia de Datos.',
    language: 'both',
    steps: [
      {
        id: 'p4-s1',
        instruction: 'Realiza operaciones básicas en Python y compara con la filosofía de R.',
        codeTemplate: `import pandas as pd
import numpy as np

# === Python: crear y manipular datos ===
np.random.seed(42)
n = 100

# Crear DataFrame
df = pd.DataFrame({
    'ingreso': np.random.lognormal(10.5, 0.5, n).astype(int),
    'edad': np.random.randint(22, 65, n),
    'experiencia': np.random.randint(0, 30, n)
})

# Filtrar: personas con más de 5 años de experiencia
filtrado = df[df['experiencia'] > 5]
print(f"Total registros: {len(df)}")
print(f"Filtrados (>5 años exp): {len(filtrado)}")
print(f"Promedio de ingreso por grupo:")
print("  Total: $" + f"{df['ingreso'].mean():,.0f}")
print("  Filtrado: $" + f"{filtrado['ingreso'].mean():,.0f}")

# Correlación
corr = df[['ingreso', 'edad', 'experiencia']].corr()
print(f"Matriz de correlación:")
print(corr.round(3))`,
        explanation: 'Python usa Pandas para manipulación de datos con sintaxis basada en métodos. R usa data.frames con una sintaxis más funcional y orientada a estadística.',
        hints: ['df[filtro] filtra filas', '.corr() calcula correlaciones']
      }
    ]
  },
  {
    id: 'p5',
    title: 'Estadística descriptiva',
    objective: 'Calcular e interpretar medidas de tendencia central, dispersión y formas de distribución.',
    language: 'python',
    dataset: 'exam-scores',
    steps: [
      {
        id: 'p5-s1',
        instruction: 'Calcula medidas de tendencia central: media, mediana y moda.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 200
u1 = np.random.random(n)
u2 = np.random.random(n)
z = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
puntuaciones = np.round(np.clip(75 + z * 12, 0, 100), 1)

df = pd.DataFrame({
    'alumno_id': range(1, n+1),
    'puntuacion': puntuaciones,
    'materia': np.random.choice(['Matemáticas', 'Física', 'Estadística'], n)
})

print("=== Medidas de Tendencia Central ===")
print(f"Media: {df['puntuacion'].mean():.2f}")
print(f"Mediana: {df['puntuacion'].median():.2f}")
print(f"Moda: {df['puntuacion'].mode().values[0]:.2f}")

print("=== Por materia ===")
for mat in df['materia'].unique():
    subset = df[df['materia'] == mat]
    print(f"{mat}:")
    print(f"  Media={subset['puntuacion'].mean():.2f}, Mediana={subset['puntuacion'].median():.2f}")`,
        explanation: 'La media es sensible a valores extremos. La mediana es más robusta. La moda es el valor más frecuente.',
        hints: ['.mean() calcula la media', '.median() la mediana', '.mode() la moda']
      },
      {
        id: 'p5-s2',
        instruction: 'Mide la dispersión de los datos con varianza, desviación estándar y rango intercuartílico.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 200
u1 = np.random.random(n)
u2 = np.random.random(n)
z = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
puntuaciones = np.round(np.clip(75 + z * 12, 0, 100), 1)

df = pd.DataFrame({
    'puntuacion': puntuaciones,
    'materia': np.random.choice(['Matemáticas', 'Física', 'Estadística'], n)
})

print("=== Medidas de Dispersión ===")
print(f"Varianza: {df['puntuacion'].var():.2f}")
print(f"Desviación estándar: {df['puntuacion'].std():.2f}")
print(f"Rango: {df['puntuacion'].max() - df['puntuacion'].min():.2f}")
print(f"IQR (Q3-Q1): {df['puntuacion'].quantile(0.75) - df['puntuacion'].quantile(0.25):.2f}")

# Coeficiente de variación
cv = (df['puntuacion'].std() / df['puntuacion'].mean()) * 100
print(f"Coef. de variación: {cv:.1f}%")

print("=== Percentiles ===")
for q in [0.1, 0.25, 0.5, 0.75, 0.9]:
    print(f"P{int(q*100)}: {df['puntuacion'].quantile(q):.1f}")`,
        explanation: 'La desviación estándar mide cuánto se alejan los datos de la media. El IQR es robusto ante valores atípicos.',
        hints: ['.var() y .std() calculan varianza y desviación', '.quantile() obtiene percentiles']
      }
    ]
  },
  {
    id: 'p6',
    title: 'Pruebas de hipótesis',
    objective: 'Aplicar pruebas estadísticas para validar hipótesis sobre poblaciones.',
    language: 'python',
    steps: [
      {
        id: 'p6-s1',
        instruction: 'Realiza una prueba t de Student para comparar dos grupos.',
        codeTemplate: `import numpy as np
from scipy import stats

np.random.seed(42)

# Simular dos grupos: control y tratamiento
grupo_control = np.random.normal(75, 10, 50)
grupo_tratamiento = np.random.normal(80, 10, 50)

print("=== Prueba t de Student ===")
print(f"Control - Media: {grupo_control.mean():.2f}, DE: {grupo_control.std():.2f}")
print(f"Tratamiento - Media: {grupo_tratamiento.mean():.2f}, DE: {grupo_tratamiento.std():.2f}")

# Prueba t bilateral
t_stat, p_value = stats.ttest_ind(grupo_control, grupo_tratamiento)
print(f"Estadístico t: {t_stat:.4f}")
print(f"Valor p: {p_value:.4f}")

alpha = 0.05
if p_value < alpha:
    print(f"→ Se rechaza H0 (p < {alpha}): Hay diferencia significativa")
else:
    print(f"→ No se rechaza H0 (p >= {alpha}): No hay diferencia significativa")`,
        explanation: 'La prueba t compara las medias de dos grupos. Si p < 0.05, concluimos que la diferencia es estadísticamente significativa.',
        hints: ['ttest_ind() realiza la prueba t para muestras independientes', 'Un valor p < 0.05 indica significancia']
      },
      {
        id: 'p6-s2',
        instruction: 'Realiza una prueba de normalidad con Shapiro-Wilk.',
        codeTemplate: `import numpy as np
from scipy import stats

np.random.seed(42)

# Datos que siguen distribución normal
datos_normales = np.random.normal(50, 15, 100)

# Datos uniformes (no normales)
datos_uniformes = np.random.uniform(20, 80, 100)

print("=== Prueba de Normalidad (Shapiro-Wilk) ===")

for nombre, datos in [("Normales", datos_normales), ("Uniformes", datos_uniformes)]:
    stat, p = stats.shapiro(datos)
    print(f"{nombre}:")
    print(f"  Estadístico W: {stat:.4f}")
    print(f"  Valor p: {p:.4f}")
    if p > 0.05:
        print(f"  → No se rechaza normalidad (p > 0.05)")
    else:
        print(f"  → Se rechaza normalidad (p <= 0.05)")`,
        explanation: 'La prueba de Shapiro-Wilk verifica si los datos siguen una distribución normal. Es un requisito para muchas pruebas paramétricas.',
        hints: ['shapiro() prueba la hipótesis de normalidad', 'H0: los datos son normales']
      }
    ]
  },
  {
    id: 'p7',
    title: 'Simulación de distribuciones',
    objective: 'Generar y visualizar diferentes distribuciones de probabilidad.',
    language: 'python',
    steps: [
      {
        id: 'p7-s1',
        instruction: 'Simula datos de una distribución normal y calcula sus propiedades.',
        codeTemplate: `import numpy as np

np.random.seed(42)

# Generar muestras de distribución normal
media, desv, n = 170, 8, 1000
muestra = np.random.normal(media, desv, n)

print(f"=== Distribución Normal N({media}, {desv}²) ===")
print(f"Muestra generada: {n} valores")
print(f"Media teórica: {media}")
print(f"Media muestral: {muestra.mean():.2f}")
print(f"Desviación teórica: {desv}")
print(f"Desviación muestral: {muestra.std():.2f}")

# Regla empírica 68-95-99.7
dentro_1s = np.sum(np.abs(muestra - media) < desv) / n * 100
dentro_2s = np.sum(np.abs(muestra - media) < 2*desv) / n * 100
dentro_3s = np.sum(np.abs(muestra - media) < 3*desv) / n * 100

print(f"Regla empírica:")
print(f"Dentro de 1σ: {dentro_1s:.1f}% (esperado ~68%)")
print(f"Dentro de 2σ: {dentro_2s:.1f}% (esperado ~95%)")
print(f"Dentro de 3σ: {dentro_3s:.1f}% (esperado ~99.7%)")`,
        explanation: 'La distribución normal es fundamental en estadística. La regla 68-95-99.7 describe qué porcentaje de datos cae dentro de 1, 2 o 3 desviaciones estándar.',
        hints: ['np.random.normal(m, s, n) genera n valores con media m y desviación s']
      },
      {
        id: 'p7-s2',
        instruction: 'Compara distribución normal con uniforme y exponencial.',
        codeTemplate: `import numpy as np

np.random.seed(42)
n = 1000

# Tres distribuciones diferentes
normal = np.random.normal(50, 15, n)
uniforme = np.random.uniform(0, 100, n)
exponencial = np.random.exponential(25, n)

distribuciones = {
    'Normal(50, 15)': normal,
    'Uniforme(0, 100)': uniforme,
    'Exponencial(25)': exponencial
}

print("=== Comparación de Distribuciones ===")
for nombre, datos in distribuciones.items():
    print(f"{nombre}:")
    print(f"  Media: {datos.mean():.2f}")
    print(f"  Desviación: {datos.std():.2f}")
    print(f"  Asimetría: {float(((datos - datos.mean())**3).mean() / datos.std()**3):.3f}")
    print(f"  Mín: {datos.min():.2f}, Máx: {datos.max():.2f}")
    print(f"  Q1: {np.percentile(datos, 25):.2f}, Q3: {np.percentile(datos, 75):.2f}")`,
        explanation: 'Cada distribución tiene características útiles: la normal para fenómenos naturales, la uniforme para muestreo aleatorio, la exponencial para tiempos de espera.',
        hints: ['np.random.uniform() genera distribución uniforme', 'np.random.exponential() genera distribución exponencial']
      }
    ]
  },
  {
    id: 'p8',
    title: 'Comparación con software estadístico',
    objective: 'Demostrar que Python puede realizar las mismas funciones que software estadístico como SPSS o Excel.',
    language: 'python',
    steps: [
      {
        id: 'p8-s1',
        instruction: 'Realiza análisis de frecuencias y tablas cruzadas, similares a SPSS.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 200

df = pd.DataFrame({
    'genero': np.random.choice(['M', 'F'], n, p=[0.48, 0.52]),
    'nivel': np.random.choice(['Básico', 'Intermedio', 'Avanzado'], n, p=[0.3, 0.5, 0.2]),
    'nota': np.round(np.random.normal(75, 12, n), 1)
})

# Tabla de frecuencias (como en SPSS)
print("=== Tabla de Frecuencias: Género ===")
freq = df['genero'].value_counts()
freq_pct = df['genero'].value_counts(normalize=True) * 100
tabla = pd.DataFrame({'Frecuencia': freq, 'Porcentaje': freq_pct.round(1)})
print(tabla)

# Tabla cruzada
print("=== Tabla Cruzada: Género × Nivel ===")
cruzada = pd.crosstab(df['genero'], df['nivel'], margins=True)
print(cruzada)

# Estadísticos por grupo
print("=== Estadísticos por nivel ===")
print(df.groupby('nivel')['nota'].agg(['count', 'mean', 'std', 'min', 'max']).round(2))`,
        explanation: 'Las tablas de frecuencias y cruzadas son herramientas básicas de análisis exploratorio disponibles en cualquier software estadístico.',
        hints: ['value_counts() cuenta frecuencias', 'pd.crosstab() crea tablas cruzadas']
      }
    ]
  },
  {
    id: 'p9',
    title: 'Limpieza y preparación de datos',
    objective: 'Identificar y tratar valores faltantes, duplicados y errores en datasets.',
    language: 'python',
    dataset: 'iris',
    steps: [
      {
        id: 'p9-s1',
        instruction: 'Detecta y maneja valores faltantes en un dataset.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)

# Crear dataset con problemas típicos
n = 150
df = pd.DataFrame({
    'sepal_length': np.round(np.random.normal(5.8, 0.8, n), 1),
    'sepal_width': np.round(np.random.normal(3.0, 0.4, n), 1),
    'petal_length': np.round(np.random.normal(3.8, 1.7, n), 1),
    'species': np.random.choice(['setosa', 'versicolor', 'virginica'], n)
})

# Introducir valores faltantes (5%)
idx = np.random.choice(n, size=7, replace=False)
df.loc[idx, 'sepal_length'] = np.nan

print("=== Valores faltantes ===")
print(df.isnull().sum())
print(f"Total filas con nulos: {df.isnull().any(axis=1).sum()}")

# Estrategia 1: Eliminar filas con nulos
df_drop = df.dropna()
print(f"Después de dropna(): {len(df_drop)} filas")

# Estrategia 2: Imputar con la media
df_imputed = df.copy()
df_imputed['sepal_length'].fillna(df['sepal_length'].mean(), inplace=True)
print(f"Después de imputar media: {df_imputed['sepal_length'].isnull().sum()} nulos")`,
        explanation: 'Los valores faltantes son comunes en datos reales. Las estrategias incluyen eliminación, imputación con media/mediana/moda, o modelos de imputación.',
        hints: ['.isnull().sum() cuenta nulos por columna', '.fillna() reemplaza nulos']
      },
      {
        id: 'p9-s2',
        instruction: 'Elimina duplicados y corrige inconsistencias en los datos.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)

# Dataset con problemas
data = {
    'nombre': ['Ana', 'ana', 'Pedro', 'Pedro', 'María', 'maria', 'Luis', 'LUIS'],
    'edad': [22, 22, 25, 25, 21, 21, 28, 28],
    'ciudad': ['CDMX', 'cdmx', 'GDL', 'Guadalajara', 'MTY', 'Monterrey', 'CDMX', 'CDMX']
}
df = pd.DataFrame(data)

print("=== Datos originales ===")
print(df)
print(f"Duplicados exactos: {df.duplicated().sum()}")

# Normalizar texto
df['nombre'] = df['nombre'].str.title()
df['ciudad'] = df['ciudad'].replace({
    'cdmx': 'CDMX', 'Guadalajara': 'GDL', 'Monterrey': 'MTY'
})

# Eliminar duplicados
df_clean = df.drop_duplicates()
print(f"Después de limpiar:")
print(df_clean)
print(f"Duplicados restantes: {df_clean.duplicated().sum()}")`,
        explanation: 'La limpieza incluye normalizar texto (capitalización), unificar categorías y eliminar duplicados.',
        hints: ['.str.title() capitaliza texto', '.replace() reemplaza valores']
      }
    ]
  },
  {
    id: 'p10',
    title: 'Correlación y selección de variables',
    objective: 'Calcular correlaciones y seleccionar las variables más relevantes para un modelo.',
    language: 'python',
    dataset: 'iris',
    steps: [
      {
        id: 'p10-s1',
        instruction: 'Calcula la matriz de correlación e identifica las variables más relacionadas.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
n = 150
df = pd.DataFrame({
    'sepal_length': np.round(np.random.normal(5.8, 0.8, n), 1),
    'sepal_width': np.round(np.random.normal(3.0, 0.4, n), 1),
    'petal_length': np.round(np.random.normal(3.8, 1.7, n), 1),
    'petal_width': np.round(np.random.normal(1.2, 0.7, n), 1),
    'species': np.random.choice(['setosa', 'versicolor', 'virginica'], n)
})

# Seleccionar solo numéricas
numericas = df.select_dtypes(include=[np.number])

# Matriz de correlación
corr = numericas.corr()
print("=== Matriz de Correlación ===")
print(corr.round(3))

# Encontrar pares más correlacionados
print("=== Top correlaciones (valor absoluto) ===")
for i in range(len(corr.columns)):
    for j in range(i+1, len(corr.columns)):
        val = corr.iloc[i, j]
        print(f"  {corr.columns[i]} ↔ {corr.columns[j]}: {val:.3f}")`,
        explanation: 'La correlación mide la relación lineal entre variables (-1 a 1). Valores cercanos a ±1 indican fuerte relación.',
        hints: ['.corr() calcula la matriz de correlación de Pearson']
      }
    ]
  },
  {
    id: 'p11',
    title: 'Dashboard interactivo',
    objective: 'Crear resúmenes visuales y tableros de control con métricas clave.',
    language: 'python',
    dataset: 'sales-monthly',
    steps: [
      {
        id: 'p11-s1',
        instruction: 'Genera un reporte de métricas clave de ventas.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)
meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
canales = ['Online', 'Tienda', 'Mayoreo']

rows = []
for y in range(2021, 2024):
    for m in range(12):
        base = 1000 + m * 50 + (y - 2021) * 200
        ventas = int(base + (np.random.random() - 0.5) * 200)
        rows.append({
            'mes': f'{meses[m]} {y}',
            'ventas': ventas,
            'ingreso': ventas * int(150 + np.random.random() * 50),
            'canal': np.random.choice(canales)
        })

df = pd.DataFrame(rows)

print("╔══════════════════════════════════════╗")
print("║      DASHBOARD DE VENTAS            ║")
print("╚══════════════════════════════════════╝")
print(f"📊 Resumen General:")
print(f"  Total ventas: {df['ventas'].sum():,} unidades")
print("  Total ingreso: $" + f"{df['ingreso'].sum():,.0f}" + " MXN")
print(f"  Promedio mensual: {df['ventas'].mean():,.0f} unidades")

print(f"📈 Por canal:")
for canal in canales:
    sub = df[df['canal'] == canal]
    print(f"  {canal}: {sub['ventas'].sum():,} unidades ($" + f"{sub['ingreso'].sum():,.0f}" + ")")

print(f"📅 Mejor mes: {df.groupby('mes')['ventas'].sum().idxmax()}")`,
        explanation: 'Un dashboard de métricas resume los KPIs más importantes. Las tablas dinámicas permiten explorar datos desde diferentes ángulos.',
        hints: ['groupby() permite agrupar por cualquier columna', '.agg() aplica múltiples funciones']
      }
    ]
  },
  {
    id: 'p12',
    title: 'Reportes automatizados',
    objective: 'Generar reportes estructurados con código Python que pueden ejecutarse periódicamente.',
    language: 'python',
    steps: [
      {
        id: 'p12-s1',
        instruction: 'Crea una función que genere un reporte de análisis completo.',
        codeTemplate: `import pandas as pd
import numpy as np
from datetime import datetime

def generar_reporte(datos):
    """Genera un reporte de análisis automático."""
    reporte = []
    reporte.append("=" * 50)
    reporte.append("REPORTE DE ANÁLISIS AUTOMÁTICO")
    reporte.append(f"Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    reporte.append("=" * 50)

    reporte.append(f"1. ESTRUCTURA DEL DATASET")
    reporte.append(f"   Filas: {datos.shape[0]}")
    reporte.append(f"   Columnas: {datos.shape[1]}")

    reporte.append(f"2. VALORES FALTANTES")
    nulos = datos.isnull().sum()
    if nulos.sum() == 0:
        reporte.append("   No hay valores faltantes")
    else:
        for col, n in nulos[nulos > 0].items():
            reporte.append(f"   {col}: {n} ({n/datos.shape[0]*100:.1f}%)")

    reporte.append(f"3. VARIABLES NUMÉRICAS")
    num = datos.select_dtypes(include=[np.number])
    for col in num.columns:
        reporte.append(f"   {col}: media={num[col].mean():.2f}, std={num[col].std():.2f}")

    newline = chr(10)
    return newline.join(reporte)

# Generar datos de prueba
np.random.seed(42)
df = pd.DataFrame({
    'ventas': np.random.randint(100, 1000, 50),
    'ingreso': np.random.lognormal(8, 0.5, 50).astype(int),
    'region': np.random.choice(['Norte', 'Sur', 'Este', 'Oeste'], 50)
})

print(generar_reporte(df))`,
        explanation: 'Los reportes automatizados garantizan consistencia y ahorran tiempo. Pueden programarse para ejecutarse diariamente o semanalmente.',
        hints: ['Las funciones encapsulan lógica reutilizable', 'datetime.now() obtiene la fecha actual']
      }
    ]
  },
  {
    id: 'p13',
    title: 'Integración de múltiples fuentes de datos',
    objective: 'Combinar datos de diferentes orígenes en un solo dataset unificado.',
    language: 'python',
    dataset: 'heights',
    steps: [
      {
        id: 'p13-s1',
        instruction: 'Simula dos fuentes de datos y combínalas con merge y concat.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)

# Fuente 1: Datos de estudiantes
estudiantes = pd.DataFrame({
    'id': range(1, 11),
    'nombre': [f'Estudiante_{i}' for i in range(1, 11)],
    'edad': np.random.randint(18, 25, 10)
})

# Fuente 2: Calificaciones (algunos IDs no existen)
calificaciones = pd.DataFrame({
    'id': [1, 2, 3, 4, 5, 6, 7, 8, 15, 20],
    'nota_final': np.round(np.random.normal(75, 10, 10), 1)
})

# Merge (INNER JOIN)
merged = pd.merge(estudiantes, calificaciones, on='id', how='inner')
print("=== Merge (INNER JOIN) ===")
print(merged)

# Merge (LEFT JOIN)
left_merged = pd.merge(estudiantes, calificaciones, on='id', how='left')
print("=== Merge (LEFT JOIN) ===")
print(left_merged)

# Concatenar verticalmente
df2 = pd.DataFrame({
    'id': [11, 12, 13],
    'nombre': ['Extra_1', 'Extra_2', 'Extra_3'],
    'edad': [20, 21, 22]
})
concatenado = pd.concat([estudiantes, df2], ignore_index=True)
print(f"=== Concat (Original: {len(estudiantes)}, Nuevo: {len(concatenado)}) ===")
print(concatenado.tail(5))`,
        explanation: 'merge() combina tablas por una columna clave (similar a JOIN en SQL). concat() apila tablas vertical u horizontalmente.',
        hints: ['how="inner" solo conserva coincidencias', 'how="left" conserva todas las filas de la tabla izquierda']
      }
    ]
  },
  {
    id: 'p14',
    title: 'Regresión lineal y logística',
    objective: 'Construir modelos de regresión para predecir valores numéricos y categóricos.',
    language: 'python',
    steps: [
      {
        id: 'p14-s1',
        instruction: 'Crea un modelo de regresión lineal para predecir un valor continuo.',
        codeTemplate: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

np.random.seed(42)
n = 200

# Generar datos: ingreso vs experiencia
experiencia = np.random.randint(0, 30, n)
ruido = np.random.normal(0, 5000, n)
ingreso = 25000 + experiencia * 3000 + ruido

X = experiencia.reshape(-1, 1)
y = ingreso

# Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar modelo
modelo = LinearRegression()
modelo.fit(X_train, y_train)

# Predicciones
y_pred = modelo.predict(X_test)

print("=== Regresión Lineal ===")
print("Intercepto: $" + f"{modelo.intercept_:,.0f}")
print("Pendiente: $" + f"{modelo.coef_[0]:,.0f}" + " por año de experiencia")
print(f"R² (entrenamiento): {modelo.score(X_train, y_train):.4f}")
print(f"R² (prueba): {r2_score(y_test, y_pred):.4f}")
print("RMSE: $" + f"{np.sqrt(mean_squared_error(y_test, y_pred)):,.0f}")`,
        explanation: 'La regresión lineal modela la relación y = β₀ + β₁x. R² indica qué porcentaje de la varianza explica el modelo.',
        hints: ['train_test_split() divide los datos', 'model.fit() entrena el modelo']
      },
      {
        id: 'p14-s2',
        instruction: 'Implementa una regresión logística para clasificación binaria.',
        codeTemplate: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

np.random.seed(42)
n = 200

# Datos: predecir si un estudiante aprueba (1) o no (0)
estudio_horas = np.random.uniform(0, 10, n)
aprobado = (estudio_horas > 5).astype(int) + np.random.binomial(0, 0.1, n)
aprobado = np.clip(aprobado, 0, 1)

X = estudio_horas.reshape(-1, 1)
y = aprobado

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modelo de regresión logística
modelo = LogisticRegression()
modelo.fit(X_train, y_train)

y_pred = modelo.predict(X_test)
y_prob = modelo.predict_proba(X_test)[:, 1]

print("=== Regresión Logística ===")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"Reporte de clasificación:")
print(classification_report(y_test, y_pred, target_names=['No aprueba', 'Aprueba']))

# Predecir para un nuevo estudiante
nuevo = np.array([[7]])
prob = modelo.predict_proba(nuevo)[0][1]
print(f"Prob. de aprobar con 7h de estudio: {prob:.1%}")`,
        explanation: 'La regresión logística estima la probabilidad de pertenecer a una clase. Es el modelo base para clasificación binaria.',
        hints: ['predict_proba() devuelve probabilidades', 'accuracy_score() calcula la precisión']
      }
    ]
  },
  {
    id: 'p15',
    title: 'Clasificación: Árboles, Random Forest, SVM',
    objective: 'Comparar diferentes algoritmos de clasificación y evaluar su rendimiento.',
    language: 'python',
    dataset: 'iris',
    steps: [
      {
        id: 'p15-s1',
        instruction: 'Compara árbol de decisión, Random Forest y SVM en el dataset Iris.',
        codeTemplate: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Cargar Iris
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

modelos = {
    'Árbol de Decisión': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM (RBF)': SVC(kernel='rbf', random_state=42)
}

print("=== Comparación de Modelos ===")
print(f"Datos: {X_train.shape[0]} entrenamiento, {X_test.shape[0]} prueba")

for nombre, modelo in modelos.items():
    modelo.fit(X_train, y_train)
    train_acc = modelo.score(X_train, y_train)
    test_acc = modelo.score(X_test, y_test)
    print(f"{nombre}:")
    print(f"  Train accuracy: {train_acc:.4f}")
    print(f"  Test accuracy:  {test_acc:.4f}")
    print(f"  Diferencia:     {train_acc - test_acc:.4f} {'⚠️ Overfitting' if train_acc - test_acc > 0.1 else '✓ OK'}")`,
        explanation: 'Random Forest combina múltiples árboles para mejorar la precisión. SVM busca el hiperplano que mejor separa las clases.',
        hints: ['RandomForestClassifier crea un bosque de árboles', 'La diferencia train-test indica overfitting']
      }
    ]
  },
  {
    id: 'p16',
    title: 'Red neuronal para imágenes',
    objective: 'Construir una red neuronal simple para clasificación de imágenes.',
    language: 'python',
    steps: [
      {
        id: 'p16-s1',
        instruction: 'Crea una red neuronal con sklearn para clasificar dígitos.',
        codeTemplate: `import numpy as np
from sklearn.datasets import load_digits
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Cargar dataset de dígitos (8x8 píxeles)
digits = load_digits()
X = digits.data  # 64 features (8x8 pixels)
y = digits.target  # 0-9

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Dimensiones: {X_train.shape[0]} train, {X_test.shape[0]} test")
print(f"Clases: {np.unique(y)}")
print(f"Features por imagen: {X.shape[1]} (8x8 píxeles)")

# Red neuronal multicapa
mlp = MLPClassifier(
    hidden_layer_sizes=(128, 64),
    activation='relu',
    max_iter=500,
    random_state=42
)

mlp.fit(X_train, y_train)

y_pred = mlp.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"Ejemplo de predicción:")
for i in range(5):
    print(f"  Real: {y_test[i]}, Predicho: {y_pred[i]} {'✓' if y_test[i] == y_pred[i] else '✗'}")`,
        explanation: 'Una red neuronal multicapa (MLP) procesa datos a través de capas ocultas. Cada neurona aplica pesos y funciones de activación.',
        hints: ['hidden_layer_sizes define las capas ocultas', 'activation="relu" usa la función ReLU']
      }
    ]
  },
  {
    id: 'p17',
    title: 'Series temporales',
    objective: 'Analizar y predecir datos que varían en el tiempo.',
    language: 'python',
    dataset: 'sales-monthly',
    steps: [
      {
        id: 'p17-s1',
        instruction: 'Crea una serie temporal de ventas y calcula tendencia y estacionalidad.',
        codeTemplate: `import pandas as pd
import numpy as np

np.random.seed(42)

# Crear serie temporal de ventas
fechas = pd.date_range('2021-01', periods=36, freq='M')
tendencia = np.linspace(1000, 1800, 36)
estacional = 100 * np.sin(np.linspace(0, 6 * np.pi, 36))
ruido = np.random.normal(0, 50, 36)
ventas = tendencia + estacional + ruido

ts = pd.Series(ventas, index=fechas)

print("=== Análisis de Serie Temporal ===")
print(f"Período: {ts.index[0].strftime('%Y-%m')} a {ts.index[-1].strftime('%Y-%m')}")
print(f"Observaciones: {len(ts)}")
print(f"Media: {ts.mean():.1f}")
print(f"Desviación: {ts.std():.1f}")

# Media móvil (tendencia)
ts_ma = ts.rolling(window=6).mean()
print(f"Media móvil (6 meses):")
print(f"  Inicio: {ts_ma.iloc[5]:.1f}")
print(f"  Final: {ts_ma.iloc[-1]:.1f}")

# Crecimiento mensual
crecimiento = ts.pct_change().dropna()
print(f"Crecimiento mensual:")
print(f"  Promedio: {crecimiento.mean():.2%}")
print(f"  Máximo: {crecimiento.max():.2%}")
print(f"  Mínimo: {crecimiento.min():.2%}")`,
        explanation: 'Las series temporales tienen tres componentes: tendencia (dirección general), estacionalidad (patrón repetitivo) y ruido.',
        hints: ['rolling() calcula estadísticas móviles', 'pct_change() calcula el cambio porcentual']
      }
    ]
  },
  {
    id: 'p18',
    title: 'Pipeline completo de Machine Learning',
    objective: 'Construir un pipeline end-to-end: carga, preprocesamiento, entrenamiento y evaluación.',
    language: 'python',
    dataset: 'iris',
    steps: [
      {
        id: 'p18-s1',
        instruction: 'Construye un pipeline de ML completo con sklearn.',
        codeTemplate: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# 1. Cargar datos
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

# 2. Crear pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# 3. Validación cruzada
cv_scores = cross_val_score(pipeline, X_train, y_train, cv=5, scoring='accuracy')
print(f"=== Pipeline de ML ===")
print(f"Accuracy CV (5 folds): {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# 4. Entrenar y evaluar
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)

print(f"Accuracy test: {pipeline.score(X_test, y_test):.4f}")
print(f"Matriz de confusión:")
print(confusion_matrix(y_test, y_pred))
print(f"Reporte:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))`,
        explanation: 'Un pipeline encadena pasos de preprocesamiento y modelado. La validación cruzada estima el rendimiento real del modelo.',
        hints: ['Pipeline() encadena pasos', 'cross_val_score() valida cruzadamente']
      }
    ]
  },
  {
    id: 'p19',
    title: 'Bagging y Boosting',
    objective: 'Implementar y comparar técnicas de ensemble para mejorar modelos de ML.',
    language: 'python',
    steps: [
      {
        id: 'p19-s1',
        instruction: 'Compara Bagging (Random Forest) con Boosting (Gradient Boosting).',
        codeTemplate: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

modelos = {
    'Árbol Simple': DecisionTreeClassifier(random_state=42),
    'Random Forest (Bagging)': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42)
}

print("=== Comparación de Ensemble Methods ===")
for nombre, modelo in modelos.items():
    modelo.fit(X_train, y_train)
    train = modelo.score(X_train, y_train)
    test = modelo.score(X_test, y_test)
    print(f"{nombre}:")
    print(f"  Train: {train:.4f} | Test: {test:.4f} | Gap: {train-test:.4f}")`,
        explanation: 'Bagging entrena modelos en paralelo con submuestras. Boosting entrena secuencialmente, enfocándose en los errores anteriores.',
        hints: ['Random Forest usa Bagging por defecto', 'GradientBoostingClassifier implementa Boosting']
      }
    ]
  },
  {
    id: 'p20',
    title: 'Proyecto sectorial: Salud',
    objective: 'Aplicar Ciencia de Datos a un caso real del sector salud.',
    language: 'python',
    steps: [
      {
        id: 'p20-s1',
        instruction: 'Analiza un dataset simulado de pacientes y predice diabetes.',
        codeTemplate: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

np.random.seed(42)
n = 500

# Simular dataset de pacientes
glucosa = np.random.normal(120, 30, n).clip(70, 250)
imc = np.random.normal(27, 5, n).clip(15, 50)
edad = np.random.randint(20, 80, n)
presion = np.random.normal(130, 20, n).clip(90, 200)

# Variable objetivo (diabetes)
prob = 1 / (1 + np.exp(-(0.02*(glucosa-100) + 0.05*(imc-25) + 0.01*(edad-40) - 3)))
diabetes = np.random.binomial(1, prob)

df = pd.DataFrame({
    'glucosa': np.round(glucosa, 1),
    'imc': np.round(imc, 1),
    'edad': edad,
    'presion': np.round(presion, 1),
    'diabetes': diabetes
})

print("=== Dataset de Pacientes ===")
print(df.describe().round(1))
print(f"Diabéticos: {df['diabetes'].sum()} ({df['diabetes'].mean()*100:.1f}%)")

X = df[['glucosa', 'imc', 'edad', 'presion']]
y = df['diabetes']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = RandomForestClassifier(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

print(f"Accuracy: {modelo.score(X_test, y_test):.4f}")
print("Importancia de variables:")
for feat, imp in zip(X.columns, modelo.feature_importances_):
    print(f"  {feat}: {imp:.3f}")`,
        explanation: 'En salud, la Ciencia de Datos ayuda a predecir enfermedades, optimizar tratamientos y reducir costos hospitalarios.',
        hints: ['La importancia de variables indica cuáles son más relevantes']
      }
    ]
  },
  {
    id: 'p21',
    title: 'Caso de uso generativo: Análisis de texto',
    objective: 'Explorar técnicas de procesamiento de lenguaje natural para análisis de sentimiento.',
    language: 'python',
    steps: [
      {
        id: 'p21-s1',
        instruction: 'Implementa un análisis de sentimiento simple basado en léxico.',
        codeTemplate: `import pandas as pd
import numpy as np

# Léxico de sentimiento simple
positivas = {'bueno', 'excelente', 'genial', 'increíble', 'feliz', 'encanta',
             'perfecto', 'mejor', 'fantástico', 'maravilloso', 'super', 'bien'}
negativas = {'malo', 'terrible', 'horrible', 'odio', 'peor', 'triste',
             'fatal', 'pésimo', 'desastre', 'deficiente', 'nunca', 'problema'}

def analizar_sentimiento(texto):
    palabras = set(texto.lower().split())
    pos = len(palabras & positivas)
    neg = len(palabras & negativas)
    score = (pos - neg) / max(pos + neg, 1)
    if score > 0.2: return 'Positivo', score
    elif score < -0.2: return 'Negativo', score
    return 'Neutral', score

# Reseñas de ejemplo
reviews = [
    "El producto es excelente y me encanta, muy bueno",
    "Servicio terrible y pésimo, nunca más compraré",
    "El producto está bien, no es malo ni genial",
    "Increíble experiencia, el mejor que he probado",
    "Deficiente servicio al cliente, un desastre total"
]

print("=== Análisis de Sentimiento ===")
for review in reviews:
    sentimiento, score = analizar_sentimiento(review)
    print(f"Texto: \"{review}\"")
    print(f"→ {sentimiento} (score: {score:.2f})")`,
        explanation: 'El análisis de sentimiento clasifica texto como positivo, negativo o neutral. El enfoque basado en léxico es simple pero efectivo para análisis básico.',
        hints: ['Intersección de conjuntos identifica palabras coincidentes']
      }
    ]
  },
  {
    id: 'p22',
    title: 'Evaluación de sesgos en modelos',
    objective: 'Detectar y mitigar sesgos algorítmicos en modelos de machine learning.',
    language: 'python',
    steps: [
      {
        id: 'p22-s1',
        instruction: 'Detecta sesgos de género en un dataset de empleo simulado.',
        codeTemplate: `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

np.random.seed(42)
n = 1000

# Simular dataset con sesgo de género
genero = np.random.choice(['M', 'F'], n, p=[0.6, 0.4])
experiencia = np.random.randint(0, 20, n)
educacion = np.random.choice(['Lic', 'Maestría', 'Doctorado'], n)

# Sesgo: mujeres tienen menor probabilidad de contratación
prob_base = 0.3 + experiencia * 0.03
prob = np.where(genero == 'M', prob_base + 0.1, prob_base - 0.1)
contratado = np.random.binomial(1, prob)

df = pd.DataFrame({
    'genero': genero,
    'experiencia': experiencia,
    'educacion': educacion,
    'contratado': contratado
})

print("=== Análisis de Sesgo de Género ===")
print(f"Tasa de contratación por género:")
print(df.groupby('genero')['contratado'].mean().round(3))

# Codificar variables
df['genero_num'] = (df['genero'] == 'M').astype(int)
df['edu_num'] = df['educacion'].map({'Lic': 0, 'Maestría': 1, 'Doctorado': 2})

X = df[['genero_num', 'experiencia', 'edu_num']]
y = df['contratado']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

modelo = LogisticRegression()
modelo.fit(X_train, y_train)

print(f"Accuracy: {modelo.score(X_test, y_test):.4f}")
print(f"Coeficientes:")
print(f"  Género (M=1): {modelo.coef_[0][0]:.4f}")
print(f"  Experiencia: {modelo.coef_[0][1]:.4f}")
print(f"  Educación: {modelo.coef_[0][2]:.4f}")`,
        explanation: 'Los sesgos en datos de entrenamiento se perpetúan en los modelos. Detectarlos es el primer paso para crear sistemas justos.',
        hints: ['Compara métricas entre grupos para detectar sesgos']
      }
    ]
  },
  {
    id: 'p23',
    title: 'Anonimización y privacidad de datos',
    objective: 'Aplicar técnicas de anonimización para proteger la información personal.',
    language: 'python',
    steps: [
      {
        id: 'p23-s1',
        instruction: 'Implementa técnicas de anonimización: enmascaramiento, generalización y ruido.',
        codeTemplate: `import pandas as pd
import numpy as np
from hashlib import sha256

np.random.seed(42)

# Dataset original con datos sensibles
df = pd.DataFrame({
    'nombre': ['Ana García', 'Pedro López', 'María Ruiz', 'Carlos Díaz', 'Laura Martín'],
    'email': ['ana@mail.com', 'pedro@mail.com', 'maria@mail.com', 'carlos@mail.com', 'laura@mail.com'],
    'edad': [22, 35, 28, 45, 31],
    'salario': [35000, 55000, 42000, 78000, 48000],
    'colonia': ['Centro', 'Roma', 'Condesa', 'Polanco', 'Centro']
})

print("=== Datos Originales ===")
print(df)

# 1. Enmascaramiento (hash)
df_anon = df.copy()
df_anon['nombre_hash'] = df['nombre'].apply(lambda x: sha256(x.encode()).hexdigest()[:12])
df_anon = df_anon.drop(columns=['nombre', 'email'])

# 2. Generalización de edad
df_anon['rango_edad'] = pd.cut(df['edad'], bins=[0, 25, 35, 50, 100],
                                labels=['18-25', '26-35', '36-50', '50+'])
df_anon = df_anon.drop(columns=['edad'])

# 3. Agregar ruido al salario
ruido = np.random.normal(0, 2000, len(df))
df_anon['salario_ruido'] = (df['salario'] + ruido).astype(int)

# 4. Generalizar colonia
df_anon['zona'] = df_anon['colonia'].map({
    'Centro': 'Centro', 'Roma': 'Centro', 'Condesa': 'Centro',
    'Polanco': 'Norte'
})
df_anon = df_anon.drop(columns=['colonia'])

print("=== Datos Anonimizados ===")
print(df_anon)`,
        explanation: 'La anonimización protege datos personales aplicando técnicas como hash, generalización y ruido. Es requisito legal (GDPR, LFPDPPP).',
        hints: ['sha256() crea hash unidireccional', 'pd.cut() generaliza valores numéricos en rangos']
      }
    ]
  },
];

export function getPractice(id: string): Practice | undefined {
  return PRACTICES_DATA.find((p) => p.id === id);
}

export function getPracticesByUnit(unit: number): Practice[] {
  const unitPracticeIds: Record<number, string[]> = {
    1: ['p1', 'p2', 'p3', 'p4'],
    2: ['p5', 'p6', 'p7', 'p8'],
    3: ['p9', 'p10', 'p11', 'p12', 'p13'],
    4: ['p14', 'p15', 'p16', 'p17', 'p18', 'p19'],
    5: ['p20', 'p21', 'p22', 'p23'],
  };
  const ids = unitPracticeIds[unit] || [];
  return PRACTICES_DATA.filter((p) => ids.includes(p.id));
}
