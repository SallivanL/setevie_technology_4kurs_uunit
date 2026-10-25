import { useQuery } from '@tanstack/react-query';
import { wordsKeys } from 'packages/front/src/domains/shared/index.js';
import { words } from './words.mock-data.helper.js';

export const useGetWords = () =>
  useQuery({
    queryKey: wordsKeys.words,
    // queryFn: () => apiService.get('/integration').then((response) => response?.data),
    queryFn: () => Promise.resolve(words),
  });
