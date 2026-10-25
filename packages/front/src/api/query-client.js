import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Сколько раз пробовать если ошибка
      retryDelay: 5000,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false, // Не дергать заново при возврате в окно
    },
  },
});
