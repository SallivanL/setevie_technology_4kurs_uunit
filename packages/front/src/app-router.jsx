import { Navigate, Route, Routes } from 'react-router-dom';
import { EmptyLayout, ErrorLayout, TableLayout } from '@/containers/layout/index.js';
import { AccessDeniedPage, SourceLessonViewPage } from '@/pages/index.js';
import { Login } from '@/containers/login/index.js';
import { Admin } from '@/containers/admin/index.js';
import { ListLessons } from '@/containers/list-lessons/index.js';
import { Words } from '@/containers/words/index.js';
import { LessonCreate } from '@/containers/lesson-create/index.js';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<EmptyLayout />}>
        <Route path="admin-page" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<TableLayout />}>
        <Route path="view-lesson/:lessonId" element={<SourceLessonViewPage />} />
        <Route path="create-lesson" element={<LessonCreate />} />
        <Route path="list-lesson" element={<ListLessons />} />
        <Route path="words" element={<Words />} />
      </Route>

      <Route element={<ErrorLayout />}>
        <Route path="access-denied" element={<AccessDeniedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
export default AppRouter;
