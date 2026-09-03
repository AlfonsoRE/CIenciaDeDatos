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

### Sesión 2026-09-03

Revisión profesional completa del contenido, la pedagogía y el código (a petición del usuario, "como un maestro de ciencia de datos"), seguida de corrección iterativa de todo lo encontrado. Todos los cambios se verificaron manualmente en navegador (no solo `tsc`/`lint`) antes de cada commit. 9 commits en esta sesión.

#### 1. Sistema de "Dominio" (Feedback) topaba en ~55-61% sin importar el desempeño

**Problema**: En la etapa final de cada lección (Feedback), el score de "Dominio" nunca superaba ~55-61%, incluso con desempeño perfecto.

**Causa**: En `LessonPlayer.tsx`, `computeMastery()` se llamaba con `practiceScore: 0` y `challengeScore: 0` **hardcodeados** (45% del peso de la fórmula en `types/mastery.ts`), sin importar si el código de práctica guiada/reto corría bien.

**Solución**:
- `LessonPlayer.tsx`: estados `practiceSuccess`/`challengeSuccess` actualizados por el `onStepComplete` real de cada `CodeLab`; alimentan tanto el cálculo local (`computeMastery`) como el persistido (`updateLessonProgress`)
- `progressStore.ts`: `completeStage` ya no sobrescribe con `100` los puntajes reales guardados por `updateLessonProgress`

#### 2. Pistas del editor de código nunca se contaban (y ejecutar código sí, por error)

**Problema**: Pedir una pista real en `CodeLab` no hacía nada; en cambio, cada ejecución exitosa de código sumaba al contador de "pistas usadas", que **penaliza** el dominio (-3 pts c/u).

**Causa**: `CodeLab.tsx` pasaba `onHintUsed={() => {}}` (no-op) a su `HintSystem` interno; mientras que `LessonPlayer.tsx` conectaba el callback real de pistas (`handleHintUsed`) al `onStepComplete` de práctica/reto.

**Solución**: `CodeLab.tsx` ahora acepta un prop `onHintUsed` real; `LessonPlayer.tsx` lo conecta a `handleHintUsed`, y separa `onStepComplete` para alimentar `practiceSuccess`/`challengeSuccess` en vez de las pistas.

#### 3. "Competencias evaluadas" hardcodeadas en todas las lecciones

**Problema**: El panel de Feedback mostraba siempre `['Distribución normal', 'Probabilidad', 'Cálculo de Z-scores']` (las competencias de la lección 2.3), sin importar la lección.

**Solución**: `FeedbackPanel.tsx` recibe un prop `competencies: string[]`; `LessonPlayer.tsx` pasa `lesson.competencies`.

#### 4. `npm run build` estaba roto (2 errores de TS preexistentes)

**Problema**: `result.correct` y `result.total` no existen en la interfaz `AssessmentResult` (son `correctAnswers`/`totalQuestions`); `tsc -b` fallaba.

**Solución**: Corregidas las referencias en `LessonPlayer.tsx` (uso en `savePortfolioEntry` del paso de evaluación).

#### 5. Timeout de ejecución de Python nunca se usaba

**Problema**: `runPythonCode(code, timeoutMs = 30000)` declaraba el parámetro `timeoutMs` pero nunca lo aplicaba — sin protección real ante código lento.

**Solución** en `python-runner.ts`: `Promise.race` entre la ejecución y un timeout. **Limitación conocida**: Pyodide ejecuta síncronamente en el hilo principal, así que esto solo protege casos con I/O/awaits — un `while True: pass` puro sigue congelando la pestaña (requeriría Web Worker + interrupt buffer para timeout real).

#### 6. Gamificación completamente muerta (racha, tiempo, insignias)

**Problema**: El dashboard mostraba siempre "Tiempo: 0h", "Racha: 0d", y la sección "Insignias recientes" nunca aparecía.

**Causa**: `progressStore.ts` declaraba `addBadge`, `incrementStreak`, `resetStreak`, `addTimeSpent`, pero **ningún componente los invocaba**.

**Solución**:
- `progressStore.ts`: `checkDailyStreak()` (racha por día consecutivo, con manejo correcto del primer día) + badges reales por hitos: `first-lesson`, `perfect-lesson`, `unit-{id}` (en `completeLesson`), `practice-5`/`practice-all` (en `completePractice`), `streak-3`/`streak-7`/`streak-30` (en `checkDailyStreak`)
- `RootLayout.tsx`: dispara `checkDailyStreak()` al montar + heartbeat de 60s que llama `addTimeSpent(1)` mientras `document.visibilityState === 'visible'`
- `completeLesson` cambió de firma: ahora recibe `(lessonId, masteryScore)` para poder otorgar el badge `perfect-lesson`

#### 7. 6 lecciones con solo 1 pregunta de evaluación (aprobado binario)

**Problema**: Lecciones 1.4, 1.5, 1.6, 3.4, 5.1, 5.4 tenían 1 sola pregunta con `passingScore: 70` — imposible sacar exactamente 70%, solo 0% o 100%. Otras 9 lecciones tenían 2.

**Solución**: 21 preguntas nuevas (multiple-choice/interpretation) ancladas en la teoría de cada lección, para que las 22 lecciones tengan entre 3 y 5 preguntas.

#### 8. Bug crítico: preguntas numéricas de evaluación imposibles de acertar

**Problema**: En `AssessmentEngine.tsx`, la respuesta numérica del alumno se guardaba como `number` (`parseFloat`), pero varias lecciones definen `correctAnswer` como **string** (`'30'`, `'7.07'`, `'2'`, `'-1'`, etc.). `numero === "numero"` es **siempre `false`** en JS — esas preguntas nunca podían marcarse correctas, sin importar la respuesta. Afectaba lecciones 2.2, 2.3, 2.5, 3.1, 3.2, 4.2.

**Solución**: Helper `isAnswerCorrect(question, answer)` en `AssessmentEngine.tsx` que, para `type: 'numeric'`, parsea ambos lados y compara con tolerancia `±0.01` (igual que `ActivityEngine`). Reemplazadas las 5 comparaciones `===` directas. También corregido que borrar el input numérico lo guardaba silenciosamente como `0`.

#### 9. Encabezado de lección duplicado (dos steppers de progreso)

**Problema**: `LessonLayout.tsx` (envuelve la ruta) renderizaba su propio `LearningPathStepper` leyendo progreso *persistido*; `LessonPlayer.tsx` renderizaba otro stepper completo con estado *local* de sesión. Dos indicadores de progreso simultáneos y a veces contradictorios.

**Solución**: `LessonLayout.tsx` simplificado a solo breadcrumb + botón volver. `LearningPathStepper.tsx` eliminado (sin más usos). `useLesson.ts` simplificado a solo resolver `unitTitle`/`lessonTitle`.

#### 10. Errores de contenido encontrados en auditoría

- Caracteres chinos insertados por error en texto en español: `lesson-4-3.ts` ("por特征" → "por variable"), `lesson-3-1.ts` ("valores前后" → "valores anteriores/posteriores"), `AGENTS.md` ("warnings特定" → "warnings específicos")
- Typos: "conclusionses" (lesson-1-1.ts, ¡aparecía en la salida de un `print()` real!), "reposatorios" (lesson-1-6.ts), "Redución" (lesson-4-1.ts)
- `lesson-2-2.ts` q5: el desarrollo matemático mostrado no cuadraba con la respuesta correcta (`√10 ≈ 3.16` escrito junto a la respuesta `7.07`) — corregido a `√50 ≈ 7.07`
- Dataset `iris` declaraba `size: 150` con solo 9 filas cargadas — corregido a `size: 9` con nota de que el dataset completo se carga vía `sklearn.load_iris()` en el código Python

#### 11. Confusión Python/R en el laboratorio

**Problema**: Badge "Python/R" en prácticas P1/P4 sugería que ambos lenguajes se ejecutan, pero la plataforma solo tiene Pyodide (Python). P8 (Python vs SPSS/Excel) estaba mal etiquetada `language: 'both'` sin mencionar R en ningún momento.

**Solución**: Badge cambiado a "Python + R (teoría)" con tooltip aclaratorio (`Badge.tsx` ahora soporta `title`); P8 corregida a `language: 'python'`; objetivos de P1/P4 aclaran que solo Python se ejecuta ahí.

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

11. **Comparar respuestas de usuario con `===` es peligroso si los tipos pueden no coincidir**: JS nunca coacciona tipos en `===` (`30 === "30"` es `false`). Antes de comparar una respuesta contra `correctAnswer`, verificar que ambos sean del mismo tipo (ver `isAnswerCorrect` en `AssessmentEngine.tsx`). Esto causó que preguntas numéricas fueran imposibles de acertar (sesión 2026-09-03, #8).

12. **Pyodide bloquea el hilo principal**: la ejecución es síncrona en JS. Un timeout con `Promise.race` (en `python-runner.ts`) solo protege operaciones que ceden el control (I/O, awaits); un bucle infinito síncrono (`while True: pass`) sigue congelando la pestaña sin que el timeout dispare. Timeout real requeriría Web Worker + `pyodide.setInterruptBuffer` (no implementado).

13. **No hay motor de R** en la plataforma, solo Pyodide/Python. Cualquier contenido nuevo que mencione R (comparaciones, ejercicios) debe aclarar explícitamente que es solo referencia conceptual — el editor de código (`CodeLab`) solo ejecuta Python sin importar el prop `language` que reciba.

14. **Nuevas preguntas de `assessment.questions`**: mantener mínimo 3 por lección (con `passingScore: 70`, 1-2 preguntas hace el aprobado binario 0%/100%).

15. **Revisar visualmente el contenido nuevo generado**: en esta sesión aparecieron caracteres CJK (特征, 前后) insertados por error en medio de texto en español — probable artefacto de generación. Si se genera contenido nuevo con un LLM, verificar que no haya caracteres de otros alfabetos con `grep -P "[\x{4E00}-\x{9FFF}]"` o similar.

16. **Al escribir explicaciones con desarrollo matemático** (ej. `explanation` de preguntas `numeric`), verificar que el cálculo mostrado realmente llegue al `correctAnswer` — se encontró un caso (lesson-2-2 q5) donde el resultado final era correcto pero el desarrollo intermedio no cuadraba.

## Pendientes para la próxima sesión

Identificados en la revisión del 2026-09-03 pero no abordados aún (el usuario pausó aquí):

1. **Auditoría de accesibilidad**: contraste de color, `aria-label`s faltantes, navegación por teclado. No se hizo una pasada dedicada.
2. **Responsive / mobile**: no se probó la app en viewport angosto (el layout usa Tailwind con breakpoints `sm:`/`md:`, pero no se verificó visualmente en pantallas pequeñas).
3. **Proofreading del resto del contenido**: se auditaron a fondo las preguntas numéricas (14/14 verificadas matemáticamente) y se escaneó todo el contenido por mojibake/typos comunes, pero no se leyó línea por línea el detalle pedagógico de las 23 prácticas ni de las lecciones de unidades 4-5 con el mismo nivel que unidades 1-3.
4. **`useLesson.ts`/`LessonLayout.tsx`**: quedaron simplificados tras eliminar el stepper duplicado; si se re-agrega navegación por etapas al header, hacerlo leyendo el estado real de `LessonPlayer` (no el persistido, que no cubre `theory`/`visual`).
5. Cosas mencionadas pero descartadas por bajo impacto: `useLesson.ts` ya no expone `mastery`/`completedStages` (si algún componente futuro los necesita, hay que re-derivarlos correctamente, no restaurar el código viejo que estaba roto).
