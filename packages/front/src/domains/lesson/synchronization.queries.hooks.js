import { useQuery } from '@tanstack/react-query';
import { lessonsKeys } from 'packages/front/src/domains/shared/index.js';
import { lesson, lessons } from './lesson.mock-data.helper.js';

export const useGetLesson = (lessonId) =>
  useQuery({
    queryKey: lessonsKeys.lesson(lessonId),
    // queryFn: () => apiService.get('/integration').then((response) => response?.data),
    queryFn: () => Promise.resolve(lesson),
  });

export const useGetLessons = () =>
  useQuery({
    queryKey: lessonsKeys.list,
    // queryFn: () => apiService.get('/integration').then((response) => response?.data),
    queryFn: () => Promise.resolve(lessons),
  });
