const jwt = require('jsonwebtoken');
const { unauthorized, forbidden } = require('./errors');

const roles = Object.freeze({ teacher: 1, student: 2, admin: 3 });
const accessSecret = process.env.JWT_ACCESS_SECRET || (process.env.NODE_ENV === 'production' ? null : 'dev-access-secret-change-me');
const refreshSecret = process.env.JWT_REFRESH_SECRET || (process.env.NODE_ENV === 'production' ? null : 'dev-refresh-secret-change-me');

function tokenSecret(kind) {
  const secret = kind === 'refresh' ? refreshSecret : accessSecret;
  if (!secret) throw new Error(`JWT_${kind.toUpperCase()}_SECRET must be configured in production`);
  return secret;
}

function signAccessToken(user) {
  return jwt.sign({ type: 'access', role: user.type }, tokenSecret('access'), {
    subject: String(user.id), expiresIn: process.env.ACCESS_TOKEN_TTL || '15m', algorithm: 'HS256',
  });
}

function signRefreshToken(user, sessionId) {
  return jwt.sign({ type: 'refresh', sid: sessionId }, tokenSecret('refresh'), {
    subject: String(user.id), expiresIn: process.env.REFRESH_TOKEN_TTL || '30d', algorithm: 'HS256',
  });
}

function verifyToken(token, kind) {
  const secret = tokenSecret(kind);
  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
    if (payload.type !== kind) throw new Error('Wrong token type');
    return payload;
  } catch (_error) {
    throw unauthorized('Недействительный или просроченный токен');
  }
}

function requireAuth(request, _response, next) {
  const header = request.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return next(unauthorized());
  try {
    const payload = verifyToken(header.slice(7), 'access');
    request.auth = { userId: Number(payload.sub), type: Number(payload.role) };
    return next();
  } catch (error) {
    return next(error);
  }
}

function requireRole(...allowedRoles) {
  return (request, _response, next) => {
    if (!request.auth) return next(unauthorized());
    if (!allowedRoles.includes(request.auth.type)) return next(forbidden());
    return next();
  };
}

exports.roles = roles;
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyToken = verifyToken;
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
