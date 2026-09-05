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

### Sesión 2026-09-05 (continuación) — revisión general de lógica y correctitud

Revisión de lógica/negocio en áreas no auditadas hasta ahora (mastery, progressStore, python-runner, db.ts, ActivityEngine/AssessmentEngine, useLesson) — no repite typos/accesibilidad/responsive, ya cubiertos arriba.

**Encontrado y corregido:**
- **Bug real en `ActivityEngine.tsx`**: el `isCorrect` usado para pintar el badge "Correcto/Incorrecto" y el panel de feedback (línea ~90) comparaba `currentAnswer === activity.correctAnswer` directo, distinto de la lógica real de calificación en `handleSubmit` (que sí trata `multiple-select` como array y `numeric` con tolerancia). Para **cualquier actividad `multiple-select`** (hay 3 reales: lecciones 2.2, 2.3, 3.1), `array === array` es siempre `false` → el estudiante veía "Incorrecto" y el botón "Intentar de nuevo" aunque hubiera respondido bien; si reintentaba, `handleSubmit` empujaba una segunda entrada a `scores` sin quitar la primera, descuadrando `scores.length` contra `activities.length` y el promedio final. Corregido extrayendo la comparación a una función compartida `isActivityAnswerCorrect()` usada tanto en `handleSubmit` como en el render.
- **Bug real en `python-runner.ts`**: `plt.close('all')` solo se llamaba dentro de la rama de éxito (`if plt.get_fignums():`). Si el código del usuario generaba una figura y LUEGO lanzaba una excepción, la figura quedaba viva en el intérprete Pyodide persistente (`pyodideInstance` es un singleton de módulo) y aparecía en la salida SVG de la **siguiente** ejecución — incluso de una práctica distinta. Corregido moviendo el cierre de figuras a un `finally` que se ejecuta siempre.
- **Código frágil en `LessonPlayer.tsx`**: `border-l-${item.color}` (clase Tailwind construida dinámicamente) solo funcionaba porque las 4 clases posibles (`border-l-primary/success/warning/danger`) ya aparecían literalmente en otros archivos, permitiendo que el escáner JIT de Tailwind las generara "por casualidad". Reemplazado por un mapa `ITEM_BORDER_COLOR` explícito — mismo resultado, ya no depende de que otro archivo use la misma clase.

**Reportado sin corregir (requiere decisión de diseño, cambia comportamiento visible):**
- `LessonPlayer.tsx:118` pasa `attempts: 1` **hardcodeado** a `computeMastery()`, ignorando por completo el contador real `lessons[lessonId].attempts` que sí se persiste en `progressStore.ts` (se incrementa en cada llamada a `updateLessonProgress`, ~4 veces por lección completa). Esto hace que el bono `attemptBonus` de `MASTERY_CONFIG` (hasta +6 puntos por "pocos intentos") se aplique siempre al máximo, para todo mundo, sin medir intentos reales — la mecánica de "menos intentos = mejor puntaje" existe en la fórmula pero está desconectada de cualquier dato real. Conectar el valor real cambiaría los puntajes de dominio mostrados a los estudiantes, por eso no se tocó.
- El intérprete de Pyodide es un **singleton a nivel de módulo** (`pyodideInstance`) compartido por TODA la sesión de la app, no por lección/práctica. `exec(_decoded)` corre en el namespace global persistente, así que variables definidas en una lección/práctica **sobreviven y contaminan** ejecuciones posteriores en lecciones/prácticas completamente distintas (el botón "Reiniciar" de `CodeLab` solo restaura el texto del editor, no el estado de Python). Es probable que esto sea intencional *dentro* de una misma práctica multi-paso (para que el paso 2 reutilice variables del paso 1), pero no entre lecciones/prácticas distintas — arreglarlo bien requiere namespaces aislados por práctica/lección (cambio de arquitectura, no un fix de una línea), así que se deja para que el usuario decida el alcance.
- `src/storage/db.ts`: `saveCodeState`/`getCodeState` (y el tipo `CodeState` + tabla Dexie `codeStates`) están completamente implementados pero **nunca se invocan desde ningún componente** — funcionalidad huérfana (mismo patrón que el "tutor muerto" de la sesión 2026-08-26). No se eliminó por si es una feature planeada a medio construir (guardar el código del editor entre visitas); confirmar con el usuario antes de borrar o de terminar de conectarla.

`npm run build` y `npm run lint` pasan sin errores ni warnings nuevos.

### Sesión 2026-09-05 (continuación 3) — auditoría de seguridad previa a subir el repo al Tec

El usuario va a subir este proyecto (frontend puro, sin backend) al repositorio del Tecnológico y quería asegurarse de que no pudiera usarse como vector de ataque contra el sitio institucional. Revisión enfocada en XSS, supply chain, secretos y configuración de despliegue — no repite lógica de negocio (ver sección anterior) ni contenido/accesibilidad/responsive (ver secciones previas).

**Encontrado y corregido:**
- **XSS potencial en `CodeLab.tsx`**: la gráfica generada por `matplotlib` (vía Pyodide) se inyectaba con `dangerouslySetInnerHTML={{ __html: output.svgOutput }}`. El SVG lo produce `matplotlib.pyplot.savefig(format='svg')` a partir del código Python que el propio estudiante escribe y ejecuta — normalmente matplotlib escapa el texto correctamente, pero confiar en que una librería externa nunca tenga un bug de escapado (o en que un `title`/label con contenido especial no rompa el escapado) es frágil, y un `<svg onload=...>` inyectado así SÍ se ejecuta en el origen del sitio (los navegadores no ejecutan `<script>` inyectado vía `innerHTML`, pero sí atributos de evento como `onload`/`onerror`). Como el intérprete Pyodide es un singleton de toda la sesión (ver hallazgo de la revisión anterior), y como este es exactamente el tipo de vector que preocupa si el proyecto queda bajo el dominio del Tec (self-XSS que podría escalar si alguien comparte/pega código de otra persona). **Solución**: reemplazado por `<img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}">` — un SVG cargado como recurso de imagen nunca ejecuta scripts ni atributos de evento, sin importar su contenido (garantía de la especificación, no del escapado de matplotlib). Verificado visualmente que las gráficas se siguen viendo igual.
- **Vulnerabilidad conocida en dependencia de desarrollo**: `npm audit` reportó `fast-uri` (transitiva, alta severidad, SSRF/host-confusion) — solo se usa en el toolchain de build, nunca se envía al navegador, pero se corrigió igual con `npm audit fix` (sin cambios de versión mayor). `npm audit` queda en 0 vulnerabilidades.

**Verificado sin problemas:**
- Sin `eval`, `new Function`, `document.write` ni otros `innerHTML =` en todo `src/`.
- Sin `postMessage`, `window.open` ni llamadas `fetch`/`XMLHttpRequest` a servicios externos (la app no llama a ningún backend propio ni de terceros en runtime, aparte de la descarga de Pyodide).
- Sin secretos, API keys, tokens ni archivos `.env` en el repo (`git ls-files` + grep de patrones comunes).
- Sin workflows de CI/CD (`.github/workflows`) que pudieran exponer secretos o ejecutarse con permisos amplios.
- `index.html` sin scripts inline ni referencias a hosts externos.

**Riesgo aceptado y documentado (no es un bug, es una decisión de arquitectura del proyecto)**:
- Pyodide se carga en runtime desde `cdn.jsdelivr.net` (`python-runner.ts`, versión fijada `v314.0.5`) sin Subresource Integrity — no aplica SRI clásico porque se carga vía `import()` dinámico de un `.mjs`, no un `<script src>` con atributo `integrity`. El riesgo real es bajo (versión fijada e inmutable en jsdelivr, no `latest`), pero si se quiere eliminar la dependencia de un tercero en runtime por completo, la alternativa es auto-hospedar los assets de Pyodide en `public/` y servirlos desde el mismo origen.

**Pendiente de una decisión del usuario (no se pudo resolver sin esa información):**
- El plugin PWA (`vite-plugin-pwa`) registra un service worker con scope por defecto `/` (no hay `base` configurado en `vite.config.ts`). Si el proyecto se despliega en la **raíz** de un dominio/subdominio propio, esto es correcto y no hay riesgo. Pero si se despliega bajo una **subruta de un dominio institucional compartido** (ej. `tec.mx/alumnos/cienciadatos/`) sin ajustar `base`, el build generaría rutas de assets rotas y, más importante, el service worker generado podría intentar registrarse con un scope más amplio del que le corresponde — hay que preguntarle al usuario dónde exactamente se va a desplegar (raíz propia vs. subruta de un sitio compartido) antes de que sea un problema real, y si es subruta, configurar `base: '/subruta/'` en `vite.config.ts` (esto ajusta automáticamente `start_url`/scope del manifest y del SW vía `vite-plugin-pwa`).

`npm run build` y `npm run lint` pasan sin errores tras los cambios.

#### 1. Proofreading de unidades 4-5 y las 23 prácticas (pendiente #3 de la sesión anterior)

**Revisado**: lecciones 4.1-5.4 línea por línea (teoría, actividades, hints, evaluación) y `practices/index.ts` completo (1306 líneas).

**Encontrado y corregido**:
- Faltas de acentuación en `title`/`description` de varios `visualExamples` (ej. "Arbol de decision", "Comparacion de metricas", "Tecnicas de anonimizacion").
- Anglicismo "while manteniendo" en lesson-5-2 (formula de privacidad diferencial) y "tailora" en lesson-5-3 (explicación de medicina de precisión).
- Voseo argentino ("conocé", "usá", "documentá") en lesson-5-4, inconsistente con el tuteo neutro usado en el resto del curso.
- Typo "réalizalo EDA completo" en el challenge de lesson-5-4.
- **Bug real** en `practices/index.ts` p9-s1: `df_imputed['sepal_length'].fillna(..., inplace=True)` es una asignación encadenada que no persiste con Copy-on-Write en pandas moderno — corregido a asignación directa.
- **Bug real** en p14-s2: `np.random.binomial(0, 0.1, n)` es código muerto (0 ensayos siempre da 0, el "ruido" nunca se aplicaba) — corregido a `binomial(1, 0.1, n)`.
- **Bug de sintaxis Python** en p21-s1: `print(f"Texto: \"{review}\"")` — el `\"` dentro de un template literal de JS se evalúa como `"` (el backslash se descarta), dejando en runtime `f"Texto: "{review}""`, que es `SyntaxError` en Python. Corregido usando comillas simples en el f-string (`f'Texto: "{review}"'`) para evitar el escapado anidado.

Matemática de preguntas `numeric` (4.2-a1, 4.2-q1) verificada manualmente — correcta. `npm run build` y `npm run lint` pasan sin errores tras los cambios.

**Nota para futuras sesiones**: el patrón `\"` dentro de template literals de JS que envuelven código Python es una fuente de bugs silenciosos — no se detecta en build/lint porque es sintácticamente válido TypeScript, solo falla en tiempo de ejecución dentro de Pyodide. Si se agrega código Python con comillas dobles literales, preferir comillas simples en el f-string de Python antes que escapar comillas dobles.

#### 2. Auditoría de accesibilidad (pendiente #1 de la sesión anterior)

**Revisado**: todos los componentes de `src/components/` y `src/features/` (botones, inputs, navegación), `globals.css` (contraste de color de los tokens de tema), y ausencia de modales/diálogos en la app.

**Encontrado y corregido**:
- `LessonPlayer.tsx` y `PracticePlayer.tsx`: los botones de navegación de etapas/pasos ocultan su texto (`hidden sm:inline`) por debajo del breakpoint `sm`, quedando solo con un ícono y **sin `aria-label`** — un lector de pantalla en móvil no anunciaba nada útil. Agregado `aria-label` (con el nombre de la etapa / "Paso N") y `aria-current="step"` en el ítem activo.
- `CodeLab.tsx`: el botón de alternar tema del editor solo mostraba un emoji (☀️/🌙) sin texto ni `aria-label`. Agregado `aria-label` descriptivo.
- `ActivityEngine.tsx`: los botones de opción (multiple-choice/select) no exponían el estado de selección a tecnología asistiva → agregado `aria-pressed`. El input de respuesta numérica tenía un `<label>` visual sin asociar (`htmlFor`/`id` faltantes) → asociados.
- `AssessmentEngine.tsx`: mismo fix de `aria-pressed` en opciones; el input numérico de evaluación no tenía `<label>` ni `aria-label`, solo un `placeholder` (que desaparece al escribir y no es un sustituto válido de etiqueta) → agregado `aria-label`.
- `HintSystem.tsx`: el botón que expande/colapsa el panel de pistas (patrón disclosure) no exponía `aria-expanded` → agregado.

**Verificado, sin cambios necesarios**: no hay elementos `<div>`/`<span>` con `onClick` sin rol/teclado (todo interactivo usa `<button>`/`<a>` nativos); no hay `<img>` sin `alt`; `:focus-visible` global ya definido en `globals.css` con anillo visible; `ProgressBar` ya usa `role="progressbar"` + `aria-valuenow/min/max`; no existen modales/diálogos en la app (nada que gestionar con foco atrapado/Escape).

**Hallazgo NO corregido (requiere decisión de diseño)**: los colores semánticos `--color-success` (#16A34A) y `--color-warning` (#F59E0B) — usados como `text-success`/`text-warning` en `Badge`, estados de dominio, checkmarks, etc. — no cumplen contraste WCAG AA (4.5:1) como texto sobre fondos claros en modo claro: `success` da ~3.29:1 y `warning` ~2.15:1 contra blanco (en modo oscuro sí cumplen, ≥6.8:1, porque el fondo es oscuro). Corregirlo requeriría oscurecer estos dos tokens específicamente para su uso como texto en modo claro (o separar variantes `-text` de las variantes `-bg`), lo cual cambia la paleta de marca visible en toda la app — se deja pendiente para que el usuario decida el tono exacto.

`npm run build` y `npm run lint` pasan sin errores nuevos tras los cambios (los warnings preexistentes de `AssessmentEngine.tsx`/`LessonPlayer.tsx` sobre `Math.random`/memoización no están relacionados).

#### 3. Responsive / mobile (pendiente #2 de la sesión anterior)

**Revisado**: `RootLayout.tsx`/`DesktopSidebar.tsx`/`MobileNavigation.tsx`, `CodeLab.tsx`, gráficas de `components/charts/`, grids de `CourseDashboard.tsx`/`ProgressView.tsx`/`CourseMap.tsx`/`PracticeLab.tsx`/`UnitView.tsx`/`EvidencePortfolio.tsx`. Las herramientas de navegador (`resize_window`) no lograron cambiar el viewport real de la pestaña (la captura seguía reportando ~1568px de ancho tras 3 intentos), así que la revisión fue estática (lectura de código + cálculo de anchos), no visual en el navegador.

**Encontrado y corregido**:
- **Bug real de navegación**: `MobileNavigation.tsx` tenía un tab "Más" que enlazaba a `/mas`, ruta mapeada en `App.tsx` directo a `SettingsPage` — esto dejaba `/portafolio` **completamente inalcanzable en móvil** (en desktop sí está en `DesktopSidebar`). Corregido: "Más" ahora abre un menú desplegable con accesos a Portafolio y Configuración; eliminada la ruta `mas` huérfana de `App.tsx`.
- `CodeLab.tsx`: la barra de herramientas del editor (Ejecutar/Reiniciar/Copiar/tema) no tenía `overflow-x-auto` ni `shrink-0` en los botones — en viewports angostos (~375px) el botón de tema podía quedar clippeado por el `overflow-hidden` del `Card` contenedor. Agregado `overflow-x-auto` + `shrink-0` para que la barra scrollee horizontalmente en vez de recortar contenido.

**Verificado sin cambios necesarios**: gráficas de Recharts usan `ResponsiveContainer width="100%"`; `CorrelationMatrix` (SVG) escala con `viewBox` + `w-full` dentro de un `Card` con `overflow-x-auto`; stepper de `LessonPlayer`/`PracticePlayer` ya usa `overflow-x-auto` + `whitespace-nowrap`; grids de stats (`CourseDashboard`, `ProgressView`) ya usan `grid-cols-2 sm:grid-cols-4`; listas con texto largo usan el patrón `flex-1 min-w-0` + `truncate` de forma consistente.

`npm run build` y `npm run lint` pasan sin warnings nuevos (los preexistentes de `Math.random`/memoización en `AssessmentEngine.tsx`/`LessonPlayer.tsx` no están relacionados).

**Nota para futuras sesiones**: la herramienta de automatización de navegador no pudo redimensionar el viewport en este entorno (Windows, ventana gestionada por el SO) — si se necesita verificación visual real en mobile, probar con las DevTools de Chrome abiertas manualmente en modo dispositivo, o revisar en un dispositivo/emulador real.

#### 4. Contraste insuficiente de `text-success`/`text-warning` en modo claro (pendiente #1 de la sesión anterior)

**Problema**: `--color-success` (`#16A34A`) y `--color-warning` (`#F59E0B`) estaban definidos en el bloque `@theme` (estático, mismo valor en ambos modos). Como texto sobre fondos claros (`--bg`/`--surface`/`--surface-alt`) daban ~3.30:1 y ~2.15:1 — ambos por debajo del mínimo WCAG AA de 4.5:1 para texto normal. En modo oscuro sí pasaban (≥4.44:1).

**Solución**: Movidos `--color-success`/`--color-warning` de `@theme` a `@theme inline`, referenciando nuevas variables `--success`/`--warning` definidas por modo (mismo patrón que `--color-text` — gotcha #6):
- `:root` (modo claro): `--success: #15803D` (green-700), `--warning: #B45309` (amber-700) — ambos ≥4.58:1 contra `bg`/`surface`/`surface-alt`.
- `.dark` (modo oscuro): `--success: #4ADE80` (green-400), `--warning: #FBBF24` (amber-400) — ambos ≥5.94:1 contra `bg`/`surface`/`surface-alt` oscuros (más margen que los valores anteriores).

Contrastes verificados con la fórmula de luminancia relativa WCAG (script Node ad-hoc), no solo visualmente. `npm run build`/`lint` sin warnings nuevos.

#### 5. Verificación visual real de responsive (cierre del pendiente #2)

**Cómo se logró**: `resize_window` no funciona en este entorno — reporta éxito pero `window.innerWidth` sigue reportando el tamaño real de pantalla (confirmado con `javascript_tool`). Solución alternativa: inyectar un `<iframe>` con `width`/`height` fijos (390×844, tamaño móvil) apuntando a `localhost`, ya que un iframe sí tiene su propio viewport real para media queries CSS — a diferencia de la ventana del navegador, esto sí dispara los breakpoints `sm:`/`md:` de Tailwind de verdad.

**Verificado sin problemas** (navegando dentro del iframe): Dashboard, menú "Más" (Portafolio/Configuración — confirma el fix de la sesión anterior), CourseMap, LessonPlayer (stepper de etapas), CodeLab (tabs Instrucciones/Código/Resultado se apilan, sin overlap), ProgressView.

**Encontrado y corregido**: `PracticeLab.tsx` — la fila de cada práctica (ícono + `P{n}` + título + badge de lenguaje + botón "Iniciar") no tenía breakpoint responsive; a 390px de ancho el título quedaba truncado a 3-4 caracteres ("In...", "C...") por falta de espacio, prácticamente ilegible. Solución: `flex-col` en móvil (ícono+título en su fila, badge+botón debajo) y `sm:flex-row` para el layout original en pantallas ≥640px.

**Bonus — bug de accesibilidad no detectado por la auditoría anterior**: el mismo `Card` en `PracticeLab.tsx` tenía `onClick` de navegación en un `<div>` (vía el componente `Card`, que solo renderiza un `<div>` sin agregar `role`/`tabIndex`/manejo de teclado) — inaccesible por teclado. El grep de la auditoría anterior solo buscaba el patrón literal `<div onClick=` y no detectó este caso porque `onClick` se pasaba como prop a un componente (`<Card onClick={...}>`). Es el único caso de este patrón en todo el código (verificado con grep). Solución: eliminado el `onClick`/`cursor-pointer` del `Card` (redundante, ya existe el botón "Iniciar" accesible dentro) en vez de agregar `role="button"` — evita anidar un elemento interactivo falso alrededor de un `<button>` real.

**Nota para futuras sesiones**: si se agrega alguna otra tarjeta clickeable completa (patrón `<Card onClick={...}>`), usar un `<button>`/`<a>` real como contenedor en vez de un `<div>`, o agregar `role="button" tabIndex={0}` + `onKeyDown` — el componente `Card` no lo hace automáticamente.

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

17. **El componente `Card` (`components/ui/Card.tsx`) es un `<div>` plano** — pasarle `onClick` (patrón `<Card onClick={...}>`) lo hace clickeable con mouse pero NO accesible por teclado (sin `role`, `tabIndex` ni `onKeyDown`). Si ya existe un botón/enlace real dentro del `Card` para la misma acción (patrón común: card + botón "Iniciar"/"Ver más"), lo correcto es quitar el `onClick` del `Card` en vez de agregarle `role="button"` (evita anidar un elemento interactivo falso alrededor de uno real). Si se necesita que toda la tarjeta sea clickeable sin un botón interno, usar un `<button>`/`<a>` real como contenedor. Este patrón se coló sin detectar en la auditoría de accesibilidad de la sesión 2026-09-05 porque el grep de esa auditoría solo buscaba `<div onClick=` literal, no `<Card onClick={...}>` — si se repite una auditoría, buscar también componentes de layout (`Card`, etc.) usados con `onClick`.

18. **`resize_window` (herramienta de automatización de navegador) no funciona en este entorno de desarrollo**: reporta éxito pero `window.innerWidth` sigue devolviendo el tamaño real de pantalla (confirmado con `javascript_tool`), por lo que el layout nunca cambia a la vista móvil. Para probar responsive de verdad sin acceso a DevTools manual, inyectar un `<iframe>` con `width`/`height` fijos (ej. 390×844) apuntando a la misma URL vía `javascript_tool` — un iframe sí tiene su propio viewport real y dispara los media queries CSS correctamente. Tomar el screenshot con el tab normal (no `zoom`, que usa un sistema de coordenadas distinto al de la ventana real).

## Pendientes para la próxima sesión

Los 3 pendientes identificados en la revisión del 2026-09-03 (auditoría de accesibilidad, responsive/mobile, proofreading de unidades 4-5 y las 23 prácticas) se completaron en la sesión 2026-09-05 — ver el historial de esa sesión arriba para el detalle de cada fix. No quedan pendientes activos de esa revisión.

Decisiones de diseño abiertas de la revisión general de lógica (sesión 2026-09-05), sin corregir a propósito por cambiar comportamiento visible o requerir más alcance del que un fix acotado permite — ver el historial de esa sesión arriba para el detalle completo:

1. **`attempts: 1` hardcodeado en `LessonPlayer.tsx:118`** anula el bono por pocos intentos de `computeMastery()` — decidir si conectar el contador real de `progressStore` (cambiaría los puntajes de dominio mostrados) o eliminar el mecanismo de bono si no se quiere esa presión.
2. **El intérprete de Pyodide es un singleton global de toda la sesión de la app** (no por lección/práctica) — variables de una lección contaminan ejecuciones posteriores de lecciones/prácticas distintas. Arreglarlo requiere namespaces aislados por práctica (cambio de arquitectura).
3. **`saveCodeState`/`getCodeState` en `db.ts` no se usan en ningún lado** — decidir si es una feature a medio construir que vale la pena terminar (persistir el código del editor entre visitas) o código muerto a eliminar.

Notas abiertas de bajo impacto, sin trabajo pendiente concreto (solo si se toca el área relacionada):

4. **`useLesson.ts`/`LessonLayout.tsx`**: quedaron simplificados tras eliminar el stepper duplicado (sesión 2026-09-03 #9); si se re-agrega navegación por etapas al header, hacerlo leyendo el estado real de `LessonPlayer` (no el persistido, que no cubre `theory`/`visual`).
5. `useLesson.ts` ya no expone `mastery`/`completedStages`; si algún componente futuro los necesita, re-derivarlos correctamente en vez de restaurar el código viejo que estaba roto.
