# CDF-2501 — Ciencia de Datos

Plataforma educativa e-learning para el curso de **Ciencia de Datos**. Una aplicación web completa que funciona 100% en el navegador, sin necesidad de servidores backend.

## Qué es

Un entorno de aprendizaje interactivo donde los estudiantes pueden:

- **Estudiar 22 lecciones** organizadas en unidades temáticas, cada una con teoría, ejemplos visuales, actividades interactivas, práctica guiada y evaluación.
- **Ejecutar código Python directamente en el navegador** gracias a Pyodide (WebAssembly) — sin configurar nada en tu máquina.
- **Completar 23 prácticas de laboratorio** con editor de código embebido, retroalimentación en tiempo real y sistema de pistas.
- **Visualizar datos** con gráficas de distribución, box plots, dispersión y matrices de correlación generadas desde Python.
- **Rastrear su progreso** con un sistema de dominio que mide competencias por tema y muestra estadísticas de aprendizaje.
- **Construir un portafolio de evidencias** con las actividades y prácticas completadas.

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

Cada lección sigue un flujo de 7 etapas: introducción, teoría, ejemplos visuales, actividad, práctica guiada, reto y evaluación. El contenido se adapta al ritmo del estudiante.

### Laboratorio de Python

Editor de código integrado con Pyodide. Los estudiantes escriben y ejecutan Python real en el navegador — incluyendo pandas, numpy, matplotlib, scipy y scikit-learn.

### Evaluación por dominio

Un motor de evaluación calcula el nivel de dominio de cada estudiante por competencia, permitiendo identificar fortalezas y áreas de mejora.

### Progreso persistente

Todo el progreso se guarda en localStorage del navegador. No se requiere cuenta ni conexión a internet para continuar donde lo dejaste.

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
├── content/          # Lecciones, prácticas y datasets
├── features/         # Módulos: dashboard, curso, lecciones, prácticas, evaluación, progreso
├── components/       # UI reutilizable, gráficas, editor de código, tutor
├── engines/          # Motor de Python (Pyodide), evaluación de dominio, tutor IA
├── stores/           # Estado global con Zustand
├── types/            # Definiciones TypeScript
└── utils/            # Utilidades estadísticas y de formato
```

## Licencia

Proyecto educativo — Universidad Tecnológica (CDF-2501)
