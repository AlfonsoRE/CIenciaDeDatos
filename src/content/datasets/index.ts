import type { Dataset } from '@/types/dataset';

export const DATASETS: Dataset[] = [
  {
    id: 'heights',
    name: 'Estaturas de estudiantes',
    description: 'Estaturas en cm de 100 estudiantes universitarios',
    source: 'Datos simulados (N(170, 8))',
    columns: [
      { name: 'id', type: 'number', nullable: false, description: 'Identificador' },
      { name: 'estatura_cm', type: 'number', nullable: false, description: 'Estatura en centímetros' },
      { name: 'genero', type: 'string', nullable: false, description: 'Género (M/F)' },
    ],
    rows: (() => {
      const rows: Record<string, unknown>[] = [];
      for (let i = 1; i <= 100; i++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const estatura = Math.round(170 + z * 8);
        rows.push({ id: i, estatura_cm: estatura, genero: Math.random() > 0.5 ? 'M' : 'F' });
      }
      return rows;
    })(),
    size: 100,
  },
  {
    id: 'exam-scores',
    name: 'Puntuaciones de examen',
    description: 'Notas de 200 alumnos en un examen estandarizado',
    source: 'Datos simulados (N(75, 12))',
    columns: [
      { name: 'alumno_id', type: 'number', nullable: false, description: 'ID del alumno' },
      { name: 'puntuacion', type: 'number', nullable: false, description: 'Nota (0-100)' },
      { name: 'materia', type: 'string', nullable: false, description: 'Materia evaluada' },
    ],
    rows: (() => {
      const rows: Record<string, unknown>[] = [];
      const materias = ['Matemáticas', 'Física', 'Estadística'];
      for (let i = 1; i <= 200; i++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const score = Math.max(0, Math.min(100, Math.round(75 + z * 12)));
        rows.push({
          alumno_id: i,
          puntuacion: score,
          materia: materias[Math.floor(Math.random() * materias.length)],
        });
      }
      return rows;
    })(),
    size: 200,
  },
  {
    id: 'iris',
    name: 'Iris Dataset',
    description: 'Muestra de 9 flores iris (3 especies, 3 por especie); el dataset completo de 150 se carga en el código con sklearn.datasets.load_iris()',
    source: 'UCI Machine Learning Repository',
    columns: [
      { name: 'sepal_length', type: 'number', nullable: false, description: 'Largo del sépalo (cm)' },
      { name: 'sepal_width', type: 'number', nullable: false, description: 'Ancho del sépalo (cm)' },
      { name: 'petal_length', type: 'number', nullable: false, description: 'Largo del pétalo (cm)' },
      { name: 'petal_width', type: 'number', nullable: false, description: 'Ancho del pétalo (cm)' },
      { name: 'species', type: 'string', nullable: false, description: 'Especie' },
    ],
    rows: [
      { sepal_length: 5.1, sepal_width: 3.5, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
      { sepal_length: 4.9, sepal_width: 3.0, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
      { sepal_length: 4.7, sepal_width: 3.2, petal_length: 1.3, petal_width: 0.2, species: 'setosa' },
      { sepal_length: 7.0, sepal_width: 3.2, petal_length: 4.7, petal_width: 1.4, species: 'versicolor' },
      { sepal_length: 6.4, sepal_width: 3.2, petal_length: 4.5, petal_width: 1.5, species: 'versicolor' },
      { sepal_length: 6.9, sepal_width: 3.1, petal_length: 4.9, petal_width: 1.5, species: 'versicolor' },
      { sepal_length: 6.3, sepal_width: 3.3, petal_length: 6.0, petal_width: 2.5, species: 'virginica' },
      { sepal_length: 5.8, sepal_width: 2.7, petal_length: 5.1, petal_width: 1.9, species: 'virginica' },
      { sepal_length: 7.1, sepal_width: 3.0, petal_length: 5.9, petal_width: 2.1, species: 'virginica' },
    ],
    size: 9,
  },
  {
    id: 'sales-monthly',
    name: 'Ventas mensuales',
    description: 'Ventas mensuales de una empresa durante 3 años',
    source: 'Datos simulados',
    columns: [
      { name: 'mes', type: 'string', nullable: false, description: 'Mes y año' },
      { name: 'ventas', type: 'number', nullable: false, description: 'Unidades vendidas' },
      { name: 'ingreso', type: 'number', nullable: false, description: 'Ingreso en MXN' },
      { name: 'canal', type: 'string', nullable: false, description: 'Canal de venta' },
    ],
    rows: (() => {
      const rows: Record<string, unknown>[] = [];
      const canales = ['Online', 'Tienda', 'Mayoreo'];
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      for (let y = 2021; y <= 2023; y++) {
        for (let m = 0; m < 12; m++) {
          const base = 1000 + m * 50 + (y - 2021) * 200;
          const ventas = Math.round(base + (Math.random() - 0.5) * 200);
          rows.push({
            mes: `${meses[m]} ${y}`,
            ventas,
            ingreso: ventas * Math.round(150 + Math.random() * 50),
            canal: canales[Math.floor(Math.random() * canales.length)],
          });
        }
      }
      return rows;
    })(),
    size: 36,
  },
];

export function getDataset(id: string): Dataset | undefined {
  return DATASETS.find((d) => d.id === id);
}

export function getDatasetPreview(id: string, rows = 5): string {
  const dataset = getDataset(id);
  if (!dataset) return 'Dataset no encontrado';
  const headers = dataset.columns.map((c) => c.name).join('\t');
  const preview = dataset.rows.slice(0, rows).map((r) =>
    dataset.columns.map((c) => String(r[c.name])).join('\t')
  ).join('\n');
  return `${headers}\n${preview}\n... (${dataset.size} filas totales)`;
}
