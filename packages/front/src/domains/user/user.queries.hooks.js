import { useQuery } from '@tanstack/react-query';
import { lessonsKeys } from '@/domains/shared/index.js';
import { apiService } from '@/api/api.service.js';

export const useGetUserData = () =>
  useQuery({
    queryKey: lessonsKeys.list,
    queryFn: () => apiService.get('/lessons'),
  });
