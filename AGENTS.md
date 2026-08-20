# AGENTS.md — Guía del Proyecto

## Descripción General

Plataforma educativa e-learning de **Ciencia de Datos (CDF-2501)**. Corre 100% en el navegador (SPA) sin backend. El código Python se ejecuta localmente vía Pyodide (WebAssembly).

## Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.x | Framework UI |
| TypeScript | 6.x | Tipado estático |
| Vite | 8.x | Bundler / dev server |
| Tailwind CSS | 4.x | Estilos |
| Pyodide | 314.x | Ejecución de Python en WASM |
| Zustand | 5.x | Estado global |
| Dexie | 4.x | IndexedDB |
| CodeMirror | 6.x | Editor de código |
| Recharts | 3.x | Gráficas |
| React Router | 7.x | Enrutamiento SPA |
| lucide-react | 1.x | Iconos |

## Comandos

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción (tsc + vite build)
npm run lint       # Linter con oxlint
npm run preview    # Preview del build
```

## Estructura de Carpetas

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Rutas (React Router)
├── app/layouts/                # Layouts (RootLayout, LessonLayout)
├── content/
│   ├── units/                  # 22 lecciones (lesson-X-Y.ts) + index.ts (UNITS_DATA)
│   ├── practices/              # 23 prácticas (index.ts con PRACTICES_DATA)
│   └── datasets/               # 4 datasets simulados (heights, exam-scores, iris, sales-monthly)
├── features/
│   ├── dashboard/              # CourseDashboard (inicio)
│   ├── course/                 # CourseMap, UnitView
│   ├── lessons/                # LessonPlayer (7 etapas por lección)
│   ├── practices/              # PracticeLab (listado), PracticePlayer (ejecución)
│   ├── assessment/             # AssessmentEngine
│   ├── progress/               # ProgressView
│   ├── portfolio/              # EvidencePortfolio
│   └── settings/               # SettingsPage
├── components/
│   ├── ui/                     # Card, Button, Badge, Tabs, ProgressBar, etc.
│   ├── code/                   # CodeLab (editor Python embebido)
│   ├── charts/                 # DistributionChart, BoxPlot, ScatterPlot, CorrelationMatrix
│   ├── activities/             # ActivityEngine
│   ├── tutor/                  # TutorPanel, HintSystem
│   ├── feedback/               # FeedbackPanel
│   └── learning/               # TheoryCard
├── engines/
│   ├── python/                 # python-runner.ts (Pyodide), usePythonRunner.ts (hook)
│   ├── mastery/                # MasteryEngine.ts
│   └── tutor/                  # TutorEngine.ts, HintGenerator.ts
├── hooks/                      # useLesson.ts
├── stores/                     # progressStore.ts (Zustand+persist), settingsStore.ts
├── storage/                    # db.ts (IndexedDB con Dexie)
├── types/                      # course.ts, learning.ts, progress.ts, mastery.ts, dataset.ts
└── utils/                      # cn.ts, formatters.ts, statistics.ts, analytics.ts
```

## Rutas Principales

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | Dashboard | Inicio con stats |
| `/curso` | CourseMap | Lista de unidades |
| `/curso/unidad/:unitNumber` | UnitView | Detalle de unidad |
| `/curso/leccion/:lessonId` | LessonPlayer (dentro de LessonLayout) | Lección con 7 etapas |
| `/laboratorio` | PracticeLab | Listado de 23 prácticas |
| `/laboratorio/:practiceId` | PracticePlayer | Práctica individual con editor Python |
| `/progreso` | ProgressView | Progreso del estudiante |
| `/portafolio` | EvidencePortfolio | Portafolio de evidencias |
| `/configuracion` | SettingsPage | Configuración |

## Tipos de Datos Principales (types/course.ts)

- **Lesson**: teoría, ejemplos visuales, actividades, práctica guiada, reto, evaluación, competencias
- **Practice**: título, objetivo, lenguaje, pasos (PracticeStep[])
- **PracticeStep**: instrucción, código template, salida esperada, explicación, pistas
- **Challenge**: título, descripción, código template, criterios de evaluación
- **Activity**: preguntas de opción múltiple, matching, ordenamiento, etc.

## Convenciones

- **Alias `@/`** apunta a `src/` (configurado en vite.config.ts y tsconfig)
- **Estados globales** en `stores/` usando Zustand con `persist` para localStorage
- **Datasets** en `content/datasets/` con datos simulados en runtime
- **Python** se ejecuta vía Pyodide, NO hay servidor backend
- **Componentes UI** en `components/ui/` son reutilizables (Card, Button, Badge, Tabs, etc.)
- **Íconos** de lucide-react, no agregar otras librerías de iconos
- **Estilos** con Tailwind CSS, clases utility directamente en JSX

## Archivos Clave para Modificar

- **Nuevas lecciones**: Crear `src/content/units/lesson-X-Y.ts` e importar en `src/content/units/index.ts`
- **Nuevas prácticas**: Agregar en `src/content/practices/index.ts` (array PRACTICES_DATA)
- **Nuevas rutas**: Editar `src/App.tsx`
- **Nuevos componentes UI**: Agregar en `src/components/ui/`
- **Nuevo dataset**: Agregar en `src/content/datasets/index.ts`
- **Progreso del estudiante**: `src/stores/progressStore.ts`

---

## Historial de Cambios (Sesión 2026-08-20)

### 1. Módulo de Laboratorios (PracticeLab → PracticePlayer)

**Problema original**: Los botones "Iniciar" en `/laboratorio` no hacían nada.

**Solución implementada**:
- Creado `src/content/practices/index.ts` con 23 prácticas (p1-p23), cada una con 1-3 pasos, código Python, explicaciones y pistas
- Creado `src/features/practices/PracticePlayer.tsx` — reproductor de prácticas con stepper, CodeLab embebido, navegación entre pasos
- Agregada ruta `/laboratorio/:practiceId` en `App.tsx`
- Actualizado `PracticeLab.tsx` con `useNavigate` y `onClick` en botón "Iniciar"
- `progressStore.ts` ya tenía `completePractice()` — no requirió cambios

### 2. Pyodide — URL del CDN incorrecta

**Problema**: `Failed to fetch dynamically imported module: pyodide.asm.mjs`

**Causa**: URL hardcoded `v0.27.5` no existe en CDN.

**Solución**: Cambiar a `v314.0.5` en `src/engines/python/python-runner.ts:21`

### 3. Pyodide — Salida vacía al ejecutar código

**Problema**: Ejecución mostraba "Completado" pero sin salida.

**Causa**: El runner original usaba dos llamadas separadas a `runPythonAsync` y los delimitadores se imprimían después de restaurar `sys.stdout`.

**Solución**: Reescritura completa de `python-runner.ts` con un solo `runPythonAsync` que hace setup + exec + captura.

### 4. Pyodide — SyntaxError en f-strings

**Problema**: `SyntaxError: unterminated f-string literal` al ejecutar prácticas con `print(f"\n...")`.

**Causa**: El `\n` dentro de f-strings en TypeScript template literals (`\\n`) se convierte en salto de línea literal al pasar por Pyodide/Python 3.14, rompiendo el parser de f-strings.

**Solución**:
- Eliminados los 51 `\n` de los f-strings en `src/content/practices/index.ts`
- Runner mantiene codificación base64 como protección adicional
- Para `return "\\n".join(reporte)` se usó `newline = chr(10); return newline.join(reporte)`

### 5. Paquetes Python no cargados

**Problema**: Prácticas que usaban `pandas`, `scipy` o `sklearn` fallaban silenciosamente.

**Solución**: Agregar carga individual de paquetes en `getPyodide()` con try/catch por cada uno:
```typescript
for (const pkg of ['numpy', 'matplotlib', 'pandas', 'scipy', 'scikit-learn']) {
  try { await pyodide.loadPackage(pkg); } catch (e) { console.warn(...); }
}
```

### 6. Manejo de errores Python

**Problema**: Los errores de Python (traceback) no se mostraban al usuario.

**Solución**: Captura a nivel Python con `traceback.format_exc()` dentro del `try/except`, almacenado en variable global `_py_result_error` y leído desde JavaScript.

---

## Gotchas Importantes (para futuras sesiones)

1. **NUNCA usar `\n` dentro de f-strings en el código Python** que se ejecuta vía Pyodide. Python 3.14 rompe el parser. Usar `print()` adicional para saltos de línea.

2. **Pyodide CDN version**: La versión del paquete npm (`314.0.5`) NO coincide con la versión del CDN. Verificar con `fetch()` cuál existe en `cdn.jsdelivr.net/pyodide/vX.X.X/full/`.

3. **Template literals JS corrompen código Python**: Nunca interpolar `${code}` directamente en un template literal de Python. Usar `pyodide.globals.set()` + `exec()` o base64 encoding.

4. **Carga de paquetes Pyodide**: Cargar paquetes individualmente con try/catch. Si uno falla (ej. scikit-learn por tamaño), los demás siguen funcionando.

5. **El proyecto NO tiene backend**: Todo corre en el navegador. Python vía Pyodide/WASM, datos en localStorage/IndexedDB, datasets simulados en runtime.
