import { queryClient } from 'packages/front/src/api/query-client.js';
import { wordsKeys } from 'packages/front/src/domains/shared/index.js';
import { useCreateWords, useDeleteWords, useEditWords } from 'packages/front/src/domains/words/words.mutations.hook.js';

export const useCreateWordsWithCache = () => {
  const { mutateAsync, isLoading } = useCreateWords({
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
    isLoading,
  };
};

export const useUpdateWordsWithCache = (wordId) => {
  const { mutateAsync, isLoading } = useEditWords(wordId, {
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
    isLoading,
  };
};

export const useDeleteWordsWithCache = () => {
  const { mutateAsync, isLoading } = useDeleteWords({
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
      if (context?.previousWordss) {
        queryClient.setQueryData(wordsKeys.words, context.previousWordss);
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
    isLoading,
  };
};