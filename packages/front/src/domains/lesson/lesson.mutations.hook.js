import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/api/api.service.js';
import { queryClient } from '@/api/query-client.js';
import { lessonsKeys } from '@/domains/shared/index.js';

export const useCreateLesson = (options = {}) =>
  useMutation({
    mutationFn: (data) => apiService.post('/lessons', data),
    onSuccess: (createdLesson) => {
      queryClient.setQueryData(lessonsKeys.list, (old = []) => [...old, { id: createdLesson.id, name: createdLesson.name }]);
    },
    ...options,
  });
