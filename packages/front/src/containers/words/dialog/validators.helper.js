export const russianOnly = (message = 'Разрешена только кириллица') => (value) =>
  value && !/^[а-яёА-ЯЁ\s]+$/.test(value) ? message : undefined;

export const englishOnly = (message = 'Разрешена только латиница') => (value) =>
  value && !/^[a-zA-Z\s]+$/.test(value) ? message : undefined;