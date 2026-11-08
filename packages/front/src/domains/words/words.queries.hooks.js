import { useQuery } from '@tanstack/react-query';
import { wordsKeys } from '@/domains/shared/index.js';
import { apiService } from '@/api/api.service.js';

export const useGetWords = (studentId) =>
  useQuery({
    queryKey: wordsKeys.words(studentId),
    queryFn: () => apiService.get(`/words/${studentId}`),
    enabled: studentId != null,
  });

export const useGetWordTeachers = () =>
  useQuery({
    queryKey: wordsKeys.teachers,
    queryFn: () => apiService.get('/words/teachers'),
  });

export const useGetWordStudents = () =>
  useQuery({
    queryKey: wordsKeys.students,
    queryFn: () => apiService.get('/words/students'),
  });
