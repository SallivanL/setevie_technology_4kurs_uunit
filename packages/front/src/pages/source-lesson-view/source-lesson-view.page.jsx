import { Navigate, useParams } from 'react-router-dom';
import { LessonView } from '@/containers/lesson-view/index.js';
import { useGetLesson } from '@/domains/lesson/index.js';

export const SourceLessonViewPage = () => {
  const { lessonId } = useParams();
  const { data: lesson, isError, isFetching } = useGetLesson(lessonId);
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  const lessonData = lesson?.data ?? [];
  const lessonName = lesson?.name ?? [];

  return <>{!isFetching && <LessonView lessonName={lessonName} lesson={lessonData} />}</>;
};
