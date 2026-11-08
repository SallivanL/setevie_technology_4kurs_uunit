import { Navigate, Route, Routes } from 'react-router-dom';
import { EmptyLayout, ErrorLayout, TableLayout } from '@/containers/layout/index.js';
import { AccessDeniedPage, SourceLessonViewPage } from '@/pages/index.js';
import { Login } from '@/containers/login/index.js';
import { Admin } from '@/containers/admin/index.js';
import { ListLessons } from '@/containers/list-lessons/index.js';
import { Words } from '@/containers/words/index.js';
import { LessonCreate } from '@/containers/lesson-create/index.js';
import { SelectStudent } from '@/containers/select-student/index.js';
import { RequireRole } from './require-role.helper.jsx';
import { userTypes } from '@/domains/user/user.types.js';

const allUserTypes = Object.values(userTypes);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<EmptyLayout />}>
        <Route
          path="admin-page"
          element={
            <RequireRole roles={[userTypes.admin]}>
              <Admin />
            </RequireRole>
          }
        />
        <Route path="login" element={<Login />} />
        <Route
          path="select-student"
          element={
            <RequireRole roles={[userTypes.teacher]}>
              <SelectStudent />
            </RequireRole>
          }
        />
      </Route>
      <Route element={<TableLayout />}>
        <Route
          path="view-lesson/:lessonId"
          element={
            <RequireRole roles={allUserTypes}>
              <SourceLessonViewPage />
            </RequireRole>
          }
        />
        <Route
          path="create-lesson"
          element={
            <RequireRole roles={[userTypes.teacher, userTypes.admin]}>
              <LessonCreate />
            </RequireRole>
          }
        />
        <Route
          path="list-lesson"
          element={
            <RequireRole roles={allUserTypes}>
              <ListLessons />
            </RequireRole>
          }
        />
        <Route
          path="words"
          element={
            <RequireRole roles={[userTypes.teacher, userTypes.student]}>
              <Words />
            </RequireRole>
          }
        />
      </Route>

      <Route element={<ErrorLayout />}>
        <Route path="access-denied" element={<AccessDeniedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
export default AppRouter;
