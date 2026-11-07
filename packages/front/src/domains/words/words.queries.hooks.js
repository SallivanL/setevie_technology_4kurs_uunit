import { useQuery } from '@tanstack/react-query';
import { wordsKeys } from '@/domains/shared/index.js';
import { apiService } from '@/api/api.service.js';
import { words } from '@/domains/words/words.mock-data.helper.js';

export const useGetWords = () =>
  useQuery({
    queryKey: wordsKeys.words,
    // queryFn: () => apiService.get('/words'),
    queryFn: () => Promise.resolve(words),
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
