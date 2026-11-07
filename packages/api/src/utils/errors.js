class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

exports.HttpError = HttpError;
exports.badRequest = (message = 'Некорректный запрос') => new HttpError(400, message);
exports.unauthorized = (message = 'Требуется авторизация') => new HttpError(401, message);
exports.forbidden = (message = 'Недостаточно прав') => new HttpError(403, message);
exports.notFound = (message = 'Не найдено') => new HttpError(404, message);
exports.conflict = (message = 'Конфликт данных') => new HttpError(409, message);

exports.errorMiddleware = (error, _request, response, _next) => {
  if (error.code === '23505') {
    return response.status(409).json({ error: 'Запись с такими данными уже существует' });
  }
  if (error.code === '23503') {
    return response.status(400).json({ error: 'Связанная запись не найдена' });
  }
  if (error instanceof HttpError) {
    return response.status(error.status).json({ error: error.message, ...(error.details ? { details: error.details } : {}) });
  }
  console.error(error);
  return response.status(500).json({ error: 'Внутренняя ошибка сервера' });
};
