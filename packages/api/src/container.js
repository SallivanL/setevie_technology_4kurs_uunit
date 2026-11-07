const TYPES = require('./types');
const { UserService } = require('./domains/user/user.service');
const { TariffService } = require('./domains/tariff/tariff.service');
const { LessonService } = require('./domains/lesson/lesson.service');
const { WordsService } = require('./domains/words/words.service');
const { AuthService } = require('./domains/auth/auth.service');

const services = new Map([
  [TYPES.UserService, new UserService()],
  [TYPES.TariffService, new TariffService()],
  [TYPES.LessonService, new LessonService()],
  [TYPES.WordsService, new WordsService()],
  [TYPES.AuthService, new AuthService()],
]);

exports.get = (type) => {
  const service = services.get(type);
  if (!service) throw new Error(`Unknown service type: ${String(type)}`);
  return service;
};
