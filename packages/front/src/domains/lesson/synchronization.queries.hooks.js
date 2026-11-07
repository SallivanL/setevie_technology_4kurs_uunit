import { useQuery } from '@tanstack/react-query';
import { lessonsKeys } from '@/domains/shared/index.js';
import { apiService } from '@/api/api.service.js';

export const useGetLesson = (lessonId) =>
  useQuery({
    queryKey: lessonsKeys.lesson(lessonId),
    queryFn: () => apiService.get(`/lessons/${lessonId}`),
  });

export const useGetLessons = () =>
  useQuery({
    queryKey: lessonsKeys.list,
    queryFn: () => apiService.get('/lessons'),
  });
