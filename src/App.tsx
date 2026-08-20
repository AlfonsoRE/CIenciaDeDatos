import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/app/layouts/RootLayout';
import { LessonLayout } from '@/app/layouts/LessonLayout';
import { Dashboard } from '@/features/dashboard/CourseDashboard';
import { CourseMap } from '@/features/course/CourseMap';
import { UnitView } from '@/features/course/UnitView';
import { LessonPlayer } from '@/features/lessons/LessonPlayer';
import { PracticeLab } from '@/features/practices/PracticeLab';
import { ProgressView } from '@/features/progress/ProgressView';
import { EvidencePortfolio } from '@/features/portfolio/EvidencePortfolio';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { NotFoundPage } from '@/app/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="curso" element={<CourseMap />} />
          <Route path="curso/unidad/:unitNumber" element={<UnitView />} />
          <Route path="laboratorio" element={<PracticeLab />} />
          <Route path="progreso" element={<ProgressView />} />
          <Route path="portafolio" element={<EvidencePortfolio />} />
          <Route path="configuracion" element={<SettingsPage />} />
          <Route path="mas" element={<SettingsPage />} />

          <Route path="curso/leccion/:lessonId" element={<LessonLayout />}>
            <Route index element={<LessonPlayer />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
