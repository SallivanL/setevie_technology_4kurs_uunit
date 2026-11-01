import './list-lessons.scss';
import { ListLessonItemAtom, ListLessonsAtom, ListLessonsPaperAtom } from './list-lessons.atoms.jsx';
import { useNavigate } from 'react-router-dom';
import { useGetLessons } from '@/domains/lesson/index.js';

export const ListLessons = () => {
  const { data: lessons = [] } = useGetLessons();
  const navigate = useNavigate();
  const handleClickLesson = (lessonId) => {
    navigate(`/view-lesson/${lessonId}`);
  };

  return (
    <ListLessonsAtom>
      <ListLessonsPaperAtom>
        {lessons.map((lesson) => (
          <ListLessonItemAtom key={lesson.id} onClick={() => handleClickLesson(lesson.id)}>{lesson.name}</ListLessonItemAtom>
        ))}
      </ListLessonsPaperAtom>
    </ListLessonsAtom>
  );
};
