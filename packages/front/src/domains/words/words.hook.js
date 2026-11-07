import { queryClient } from '@/api/query-client.js';
import { wordsKeys } from '@/domains/shared/index.js';
import { useCreateWords, useDeleteWords, useEditWords } from '@/domains/words/words.mutations.hook.js';

export const useCreateWordsWithCache = () => {
  const { mutateAsync, isPending } = useCreateWords({
    onSuccess: (response) => {
      const createdWord = response;

      // 1. Обновляем список
      queryClient.setQueryData(wordsKeys.words, (old = []) => {
        return [...old, createdWord];
      });

      // // 2. Кладём детальную сущность
      // queryClient.setQueryData(wordsKeys.detail(createdWords.id), createdWords);
    },
  });

  return {
    createWordAsync: mutateAsync,
    isLoading: isPending,
  };
};

export const useUpdateWordsWithCache = (wordId) => {
  const { mutateAsync, isPending } = useEditWords(wordId, {
    onSuccess: (response) => {
      const updatedWords = response;

      // 1. Обновляем список
      queryClient.setQueryData(wordsKeys.words, (old) => {
        if (!old) return old;

        return old.map((item) => (item.id === wordId ? updatedWords : item));
      });

      // // 2. Обновляем деталь
      // queryClient.setQueryData(wordsKeys.detail(wordId), updatedWords);
    },
  });

  return {
    updateWordsAsync: mutateAsync,
    isLoading: isPending,
  };
};

export const useDeleteWordsWithCache = () => {
  const { mutateAsync, isPending } = useDeleteWords({
    onMutate: async (wordId) => {
      await queryClient.cancelQueries({
        queryKey: wordsKeys.words,
      });

      // Оптимистично удаляем
      const previousWords = queryClient.getQueryData(wordsKeys.words);

      queryClient.setQueryData(wordsKeys.words, (old) => {
        if (!old) return old;

        return old.filter((item) => item.id !== wordId);
      });

      return { previousWords };
    },

    onError: (_, __, context) => {
      if (context?.previousWords) {
        queryClient.setQueryData(wordsKeys.words, context.previousWords);
      }
    },

    onSuccess: (_, wordId) => {
      queryClient.removeQueries({
        queryKey: wordsKeys.word(wordId),
      });
    },
  });

  return {
    deleteWordsAsync: mutateAsync,
    isLoading: isPending,
  };
};
