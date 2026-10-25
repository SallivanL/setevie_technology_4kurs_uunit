import { useCallback } from 'react';
import { useDialogs } from 'react-dialogs-container';
import { ErrorDialog, TariffDialog } from '../dialogs/index.js';

const resolveMessage = (message, fallback = 'Произошла ошибка') => {
  if (typeof message === 'string') return message;
  // Массив или объект — не выводим мусор пользователю
  return fallback;
};

const DIALOG_CONFIGS = {
  402: (data) => ({
    Component: TariffDialog,
    props: {
      title: 'К сожалению',
      subtitle: data?.message?.common || 'Интеграция "Приём обращений по почте" недоступна на вашем тарифе',
      href: data?.details?.tus_tariff_page,
    },
  }),
  500: () => ({
    Component: ErrorDialog,
    props: {
      title: 'Ошибка',
      subtitle: 'Произошла ошибка на сервере',
    },
  }),
  400: (data) => ({
    Component: ErrorDialog,
    props: {
      title: 'Ошибка',
      subtitle: resolveMessage(data?.message, 'Произошла ошибка'),
    },
  }),
  default: (data) => ({
    Component: ErrorDialog,
    props: {
      title: 'Ошибка',
      subtitle: resolveMessage(data?.message, 'Произошла непредвиденная ошибка'),
    },
  }),
};

const getDialogConfig = (code, data) => {
  if (code === 402) return DIALOG_CONFIGS[402](data);
  if (code >= 500) return DIALOG_CONFIGS[500](data);
  if (code > 400 && code < 500) return DIALOG_CONFIGS[400](data);
  return DIALOG_CONFIGS.default(data);
};

export const useErrorDialog = () => {
  const { pushDialog } = useDialogs();

  const showErrorDialog = useCallback(
    (code, data) => {
      const { Component, props } = getDialogConfig(code, data);
      pushDialog(Component, props);
    },
    [pushDialog]
  );

  return { showErrorDialog };
};
