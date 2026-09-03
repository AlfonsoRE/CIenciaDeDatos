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
├── index.css                   # Estilos globales, variables CSS, dark mode
├── styles/globals.css          # Tema Tailwind (@theme inline), variables dinámicas
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
│   ├── portfolio/              # EvidencePortfolio (auto-guardado en IndexedDB)
│   └── settings/               # SettingsPage (solo tema)
├── components/
│   ├── ui/                     # Card, Button, Badge, Tabs, ProgressBar, etc.
│   ├── code/                   # CodeLab (editor Python embebido + consola terminal)
│   ├── charts/                 # DistributionChart, BoxPlot, ScatterPlot, CorrelationMatrix
│   ├── activities/             ActivityEngine (multiple-choice, multiple-select, numeric, classification)
│   ├── tutor/                  # HintSystem (pistas en etapa de actividad)
│   ├── feedback/               # FeedbackPanel
│   └── learning/               # TheoryCard
├── engines/
│   ├── python/                 # python-runner.ts (Pyodide + warnings suppress), usePythonRunner.ts (hook)
│   └── mastery/                # MasteryEngine.ts
├── hooks/                      # useLesson.ts
├── stores/                     # progressStore.ts (Zustand+persist), settingsStore.ts (solo theme)
├── storage/                    # db.ts (IndexedDB con Dexie — portfolio, analytics, codeStates)
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
| `/portafolio` | EvidencePortfolio | Portafolio de evidencias (auto-guardado) |
| `/configuracion` | SettingsPage | Configuración (tema claro/oscuro/sistema) |

## Tipos de Datos Principales (types/course.ts)

- **Lesson**: teoría, ejemplos visuales con `items`, actividades, práctica guiada, reto con `hints`, evaluación, competencias
- **VisualExample**: `type`, `title`, `description`, `chartType?`, `interactive`, `items?: { label, detail, color }[]`
- **Practice**: título, objetivo, lenguaje, pasos (PracticeStep[])
- **PracticeStep**: instrucción, código template, salida esperada, explicación, pistas
- **Challenge**: título, descripción, código template, enfoque sugerido, criterios de evaluación, `hints?: string[]`
- **Activity**: preguntas de opción múltiple, matching, ordenamiento, **classification** (funciona como multiple-choice)
- **ActivityType**: `multiple-choice` | `multiple-select` | `numeric` | `classification` | `matching` | `ordering` | etc.

## Convenciones

- **Alias `@/`** apunta a `src/` (configurado en vite.config.ts y tsconfig)
- **Estados globales** en `stores/` usando Zustand con `persist` para localStorage
- **Datasets** en `content/datasets/` con datos simulados en runtime
- **Python** se ejecuta vía Pyodide, NO hay servidor backend
- **Componentes UI** en `components/ui/` son reutilizables (Card, Button, Badge, Tabs, etc.)
- **Íconos** de lucide-react, no agregar otras librerías de iconos
- **Estilos** con Tailwind CSS, clases utility directamente en JSX
- **Dark mode**: variables en `globals.css` con `@theme inline` para Tailwind v4, toggle via `RootLayout.tsx`
- **Portafolio**: auto-guarda evidencias al completar actividades, prácticas y evaluaciones
- **Hints de retos**: progresivos (conceptual → estratégico → código específico), en español
- **Consola de salida**: estilo terminal oscuro en CodeLab, warnings de Python suprimidos

## Archivos Clave para Modificar

- **Nuevas lecciones**: Crear `src/content/units/lesson-X-Y.ts` e importar en `src/content/units/index.ts`
  - Incluir `visualExamples` con `items` para contenido visual único
  - Incluir `challenge` con `hints` progresivos
- **Nuevas prácticas**: Agregar en `src/content/practices/index.ts` (array PRACTICES_DATA)
- **Nuevas rutas**: Editar `src/App.tsx`
- **Nuevos componentes UI**: Agregar en `src/components/ui/`
- **Nuevo dataset**: Agregar en `src/content/datasets/index.ts`
- **Progreso del estudiante**: `src/stores/progressStore.ts`
- **Configuración**: `src/stores/settingsStore.ts` (solo tema: light/dark/system)
- **Portafolio**: `src/storage/db.ts` función `savePortfolioEntry()`

---

## Historial de Cambios

### Sesión 2026-08-20

#### 1. Módulo de Laboratorios (PracticeLab → PracticePlayer)

**Problema original**: Los botones "Iniciar" en `/laboratorio` no hacían nada.

**Solución implementada**:
- Creado `src/content/practices/index.ts` con 23 prácticas (p1-p23), cada una con 1-3 pasos, código Python, explicaciones y pistas
- Creado `src/features/practices/PracticePlayer.tsx` — reproductor de prácticas con stepper, CodeLab embebido, navegación entre pasos
- Agregada ruta `/laboratorio/:practiceId` en `App.tsx`
- Actualizado `PracticeLab.tsx` con `useNavigate` y `onClick` en botón "Iniciar"
- `progressStore.ts` ya tenía `completePractice()` — no requirió cambios

#### 2. Pyodide — URL del CDN incorrecta

**Problema**: `Failed to fetch dynamically imported module: pyodide.asm.mjs`

**Causa**: URL hardcoded `v0.27.5` no existe en CDN.

**Solución**: Cambiar a `v314.0.5` en `src/engines/python/python-runner.ts:21`

#### 3. Pyodide — Salida vacía al ejecutar código

**Problema**: Ejecución mostraba "Completado" pero sin salida.

**Causa**: El runner original usaba dos llamadas separadas a `runPythonAsync` y los delimitadores se imprimían después de restaurar `sys.stdout`.

**Solución**: Reescritura completa de `python-runner.ts` con un solo `runPythonAsync` que hace setup + exec + captura.

#### 4. Pyodide — SyntaxError en f-strings

**Problema**: `SyntaxError: unterminated f-string literal` al ejecutar prácticas con `print(f"\n...")`.

**Causa**: El `\n` dentro de f-strings en TypeScript template literals (`\\n`) se convierte en salto de línea literal al pasar por Pyodide/Python 3.14, rompiendo el parser de f-strings.

**Solución**:
- Eliminados los 51 `\n` de los f-strings en `src/content/practices/index.ts`
- Runner mantiene codificación base64 como protección adicional
- Para `return "\\n".join(reporte)` se usó `newline = chr(10); return newline.join(reporte)`

#### 5. Paquetes Python no cargados

**Problema**: Prácticas que usaban `pandas`, `scipy` o `sklearn` fallaban silenciosamente.

**Solución**: Agregar carga individual de paquetes en `getPyodide()` con try/catch por cada uno:
```typescript
for (const pkg of ['numpy', 'matplotlib', 'pandas', 'scipy', 'scikit-learn']) {
  try { await pyodide.loadPackage(pkg); } catch (e) { console.warn(...); }
}
```

#### 6. Manejo de errores Python

**Problema**: Los errores de Python (traceback) no se mostraban al usuario.

**Solución**: Captura a nivel Python con `traceback.format_exc()` dentro del `try/except`, almacenado en variable global `_py_result_error` y leído desde JavaScript.

### Sesión 2026-08-26

#### 1. Tema oscuro funcional

**Problema**: El selector de tema en configuración no hacía nada — los valores se guardaban pero nada los aplicaba al DOM.

**Causa**: No existía código que toggear la clase `.dark` en `<html>` ni que sincronizaran los tokens de Tailwind.

**Solución**:
- `RootLayout.tsx`: `useEffect` que lee `theme` del store y ejecuta `document.documentElement.classList.add/remove('light','dark')`
- `globals.css`: Variables CSS en `:root` y `.dark` para todos los colores
- `index.css`: Movidas todas las variables aquí (solo estilos estructurales)
- `settingsStore.ts`: Simplificado a solo `theme` y `setTheme`
- `SettingsPage.tsx`: Simplificado a solo selector de tema

#### 2. Textos invisibles en dark mode

**Problema**: Los textos con clase `text-text`, `text-text-secondary` no cambiaban de color al activar dark mode.

**Causa**: Tailwind CSS v4 `@theme` resuelve valores en build time — `--color-text: #0F172A` se grababa estático.

**Solución**: Cambiar `@theme` a `@theme inline` para las variables dinámicas:
```css
@theme inline {
  --color-text: var(--text);
  --color-text-secondary: var(--text-secondary);
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-border: var(--border);
}
```

#### 3. Consolidación de variables CSS

**Problema**: Dos archivos (`globals.css` e `index.css`) definían las mismas variables con valores distintos.

**Solución**: Unificar todo en `globals.css` — `index.css` solo mantiene estilos de tipografía y headings.

#### 4. Actividades tipo classification

**Problema**: Las actividades de tipo `classification` en lessons 1.3 y 4.1 no renderizaban opciones para seleccionar.

**Causa**: `ActivityEngine` solo maneja `multiple-choice`, `multiple-select` y `numeric`.

**Solución**:
- `ActivityEngine.tsx`: Agregado `|| activity.type === 'classification'` en la condición de renderizado
- `lesson-4-1.ts`: Cambiado `correctAnswer` de formato complejo a `multiple-choice` estándar

#### 5. Ejemplos visuales únicos por lección

**Problema**: El renderer de `visualExamples` solo reconocía 4 `chartType` (`distribution`, `boxplot`, `scatter`, `correlation`). Las demás caían en placeholder genérico con "Fase 1-4" idéntico.

**Solución**:
- Tipo `VisualExample`: Nuevo campo `items?: { label, detail, color }[]`
- `LessonPlayer.tsx`: Renderer expandido — `histogram`/`binomial` → DistributionChart, `line` → ScatterPlot sinusoidal, `bar` → ScatterPlot categórico, `heatmap` → CorrelationMatrix, fallback → tarjeta con `items`
- 22 lecciones actualizadas con `items` únicos por tema
- Lessons 1.6 y 5.4: Agregado `visualExamples` (estaban vacíos)

#### 6. Portafolio activo con auto-guardado

**Problema**: `savePortfolioEntry()` existía en `db.ts` pero nunca se invocaba — el portafolio siempre estaba vacío.

**Solución**:
- `LessonPlayer.tsx`: `savePortfolioEntry()` al completar actividades (con puntuación) y evaluaciones (con resultado)
- `PracticePlayer.tsx`: `savePortfolioEntry()` al finalizar práctica (pasos completados)
- `EvidencePortfolio.tsx`: Badges de color por tipo, iconos ✓/✗, botón Exportar (descarga JSON)

#### 7. Eliminación de tutor muerto

**Problema**: `TutorPanel` siempre visible pero con valores hardcodeados (`errorHistory=[]`, `attempts=1`). `TutorEngine` e `HintGenerator` sin usar.

**Solución**: Eliminados `TutorPanel.tsx`, `TutorEngine.ts`, `HintGenerator.ts`. Se mantiene `HintSystem` (funcional en etapa de actividad).

#### 8. Retos con hints progresivos

**Problema**: Los retos usaban hints genéricos hardcodeados y no mostraban `expectedApproach`.

**Solución**:
- Tipo `Challenge`: Nuevo campo `hints?: string[]`
- `LessonPlayer.tsx`: Tarjeta de objetivo con enfoque sugerido + hints progresivos
- 22 lecciones: Cada reto tiene 5 hints específicos (conceptual → estratégico → código)

#### 9. Consola estilo terminal

**Problema**: La salida de ejecución tenía fondo gris y altura limitada.

**Solución** en `CodeLab.tsx`:
- Fondo oscuro `#1a1b26` estilo terminal
- 3 puntos de colores (rojo/amarillo/verde)
- Prompt `$ python output` con separador
- Altura aumentada de `max-h-60` a `max-h-[420px]`
- Errores con mismo estilo y traceback formateado

#### 10. Warnings de matplotlib suprimidos

**Problema**: Salidas mostraban `UserWarning: FigureCanvasAgg is non-interactive` y `MatplotlibDeprecationWarning`.

**Solución** en `python-runner.ts`: Agregado `warnings.filterwarnings('ignore')` antes de ejecutar código del usuario.

---

## Gotchas Importantes (para futuras sesiones)

1. **NUNCA usar `\n` dentro de f-strings en el código Python** que se ejecuta vía Pyodide. Python 3.14 rompe el parser. Usar `print()` adicional para saltos de línea.

2. **Pyodide CDN version**: La versión del paquete npm (`314.0.5`) NO coincide con la versión del CDN. Verificar con `fetch()` cuál existe en `cdn.jsdelivr.net/pyodide/vX.X.X/full/`.

3. **Template literals JS corrompen código Python**: Nunca interpolar `${code}` directamente en un template literal de Python. Usar `pyodide.globals.set()` + `exec()` o base64 encoding.

4. **Carga de paquetes Pyodide**: Cargar paquetes individualmente con try/catch. Si uno falla (ej. scikit-learn por tamaño), los demás siguen funcionando.

5. **El proyecto NO tiene backend**: Todo corre en el navegador. Python vía Pyodide/WASM, datos en localStorage/IndexedDB, datasets simulados en runtime.

6. **Tailwind CSS v4 `@theme inline`**: Para variables CSS dinámicas que cambian con dark mode, usar `@theme inline` en vez de `@theme`. El `@theme` normal resuelve valores en build time.

7. **Consola de warnings Python**: El runner suprime warnings con `warnings.filterwarnings('ignore')`. Si se necesitan mostrar warnings específicos, filtrar por módulo específico.

8. **Edición de lesson files**: Al agregar `items` a `visualExamples` o `hints` a `challenge`, verificar que no haya brackets duplicados — patrón `], }, ], }, ]` indica error de sintaxis.

9. **ActivityEngine tipos soportados**: `multiple-choice`, `multiple-select`, `numeric`, `classification`. Para nuevos tipos, agregar condición en el renderer.

10. **Portafolio auto-guarda**: Las evidencias se guardan automáticamente al completar actividades (LessonPlayer), prácticas (PracticePlayer) y evaluaciones (LessonPlayer). No se guarda en retos ni práctica guiada.
