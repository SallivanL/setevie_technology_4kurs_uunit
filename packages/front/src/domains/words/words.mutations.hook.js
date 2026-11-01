import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/api/api.service.js';

export const useCreateWords = (options = {}) =>
  useMutation({
    mutationFn: async (data) => {
      // return apiService.post('/words', data);
      return Promise.resolve({ id: 12, ...data });
    },
    ...options,
  });

export const useEditWords = (WordsId, options = {}) =>
  useMutation({
    mutationFn: async (data) => {
      return apiService.put(`/words/${WordsId}`, data);
    },
    ...options,
  });

export const useDeleteWords = (options = {}) =>
  useMutation({
    mutationFn: async (WordsId) => {
      return apiService.delete(`/words/${WordsId}`);
    },
    ...options,
  });
