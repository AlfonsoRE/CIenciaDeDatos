# CDF-2501 — Ciencia de Datos

Plataforma educativa e-learning para el curso de **Ciencia de Datos**. Una aplicación web completa que funciona 100% en el navegador, sin necesidad de servidores backend.

## Qué es

Un entorno de aprendizaje interactivo donde los estudiantes pueden:

- **Estudiar 22 lecciones** organizadas en 5 unidades temáticas, cada una con un flujo de 7 etapas: teoría, ejemplo visual, actividad interactiva, práctica guiada, reto, evaluación y feedback con nivel de dominio.
- **Ejecutar código Python directamente en el navegador** gracias a Pyodide (WebAssembly) — sin configurar nada en tu máquina. R se usa solo como referencia conceptual en algunas prácticas comparativas; no hay motor de R.
- **Completar 23 prácticas de laboratorio** con editor de código embebido, retroalimentación en tiempo real y sistema de pistas progresivas.
- **Visualizar datos** con gráficas de distribución, box plots, dispersión y matrices de correlación generadas desde Python.
- **Rastrear su progreso** con un sistema de dominio ponderado (actividad, práctica, reto, evaluación) que mide competencias por tema, más racha diaria, tiempo activo e insignias por hitos.
- **Construir un portafolio de evidencias** con las actividades, prácticas y evaluaciones completadas, exportable a JSON.

## Stack

| Tecnología | Uso |
|---|---|
| React 19 | Interfaz de usuario |
| TypeScript 6 | Tipado estático |
| Vite 8 | Bundler y servidor de desarrollo |
| Tailwind CSS 4 | Estilos |
| Pyodide 314 | Ejecución de Python en WebAssembly |
| Zustand 5 | Estado global con persistencia |
| Dexie 4 | IndexedDB para almacenamiento local |
| CodeMirror 6 | Editor de código Python |
| Recharts 3 | Gráficas interactivas |
| React Router 7 | Enrutamiento SPA |

## Características principales

### Lecciones interactivas

Cada lección sigue un flujo de 7 etapas — teoría, ejemplo visual, actividad, práctica guiada, reto, evaluación y feedback — con navegación bloqueada progresivamente: no se puede saltar a "Evaluación" sin pasar antes por "Actividad". El feedback final refleja el desempeño real en cada etapa, no un valor fijo.

### Laboratorio de Python

Editor de código integrado con Pyodide (CodeMirror + consola estilo terminal). Los estudiantes escriben y ejecutan Python real en el navegador — incluyendo pandas, numpy, matplotlib, scipy y scikit-learn — con manejo de errores, timeout de ejecución y sistema de pistas progresivas (conceptual → estratégico → código).

### Evaluación por dominio

Un motor de evaluación (`MasteryEngine`) calcula el nivel de dominio de cada lección ponderando actividad, práctica guiada, reto y evaluación, con penalización leve por pistas usadas y bonificación por pocos intentos. Identifica conceptos débiles y da recomendaciones concretas.

### Gamificación

Racha de días consecutivos de uso, tiempo activo acumulado, e insignias por hitos reales: primera lección completada, dominio perfecto, unidad terminada, progreso en el laboratorio de prácticas.

### Progreso persistente

Todo el progreso se guarda en localStorage/IndexedDB del navegador (Zustand + Dexie). No se requiere cuenta ni conexión a internet para continuar donde lo dejaste.

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Estructura del proyecto

```
src/
├── content/          # Lecciones (22), prácticas (23) y datasets
├── features/         # Módulos: dashboard, curso, lecciones, prácticas, evaluación, progreso, portafolio
├── components/       # UI reutilizable, gráficas, editor de código, sistema de pistas
├── engines/          # Motor de Python (Pyodide) y evaluación de dominio (MasteryEngine)
├── stores/           # Estado global con Zustand (progreso, configuración)
├── storage/          # IndexedDB con Dexie (portafolio, analítica)
├── types/            # Definiciones TypeScript
└── utils/            # Utilidades estadísticas y de formato
```

## Licencia

Proyecto educativo — Universidad Tecnológica (CDF-2501)
