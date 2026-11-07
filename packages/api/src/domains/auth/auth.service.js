const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../../../knexfile').getKnex();
const UserModel = require('../../models/user.model');
const RefreshSessionModel = require('../../models/refresh-session.model');
const { signAccessToken, signRefreshToken, verifyToken } = require('../../utils/auth');
const { unauthorized, notFound } = require('../../utils/errors');
const { normalizeEmail, validatePassword, publicUser } = require('../user/user.service');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
class AuthService {
  async login(emailInput, password, userAgent = null) {
    const email = normalizeEmail(emailInput);
    validatePassword(password);
    const user = await UserModel.query().findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) throw unauthorized('Неверный email или пароль');
    return this.createSession(user, userAgent);
  }

  async createSession(user, userAgent = null) {
    const sessionId = crypto.randomUUID();
    const refreshToken = signRefreshToken(user, sessionId);
    const expiresAt = new Date(jwt.decode(refreshToken).exp * 1000);
    await RefreshSessionModel.query().insert({ id: sessionId, user_id: user.id, token_hash: hashToken(refreshToken), expires_at: expiresAt, user_agent: userAgent });
    return { user: publicUser(user), accessToken: signAccessToken(user), refreshToken };
  }

  async refresh(token, userAgent = null) {
    if (!token) throw unauthorized('Refresh cookie отсутствует');
    const payload = verifyToken(token, 'refresh');
    const session = await RefreshSessionModel.query().findById(payload.sid);
    if (!session || session.user_id !== Number(payload.sub) || session.revoked_at || new Date(session.expires_at) <= new Date() || session.token_hash !== hashToken(token)) {
      throw unauthorized('Refresh-сессия недействительна');
    }
    const user = await UserModel.query().findById(session.user_id);
    if (!user) throw unauthorized();
    return knex.transaction(async (trx) => {
      const revoked = await RefreshSessionModel.query(trx)
        .patch({ revoked_at: new Date() })
        .where({ id: session.id, revoked_at: null })
        .returning('id');
      if (!revoked.length) throw unauthorized('Refresh-сессия уже использована');
      const nextSessionId = crypto.randomUUID();
      const nextRefreshToken = signRefreshToken(user, nextSessionId);
      await RefreshSessionModel.query(trx).insert({
        id: nextSessionId,
        user_id: user.id,
        token_hash: hashToken(nextRefreshToken),
        expires_at: new Date(jwt.decode(nextRefreshToken).exp * 1000),
        user_agent: userAgent,
      });
      return { user: publicUser(user), accessToken: signAccessToken(user), refreshToken: nextRefreshToken };
    });
  }

  async logout(token) {
    if (!token) return { loggedOut: true };
    try {
      const payload = verifyToken(token, 'refresh');
      const session = await RefreshSessionModel.query().findById(payload.sid);
      if (session && session.token_hash === hashToken(token) && !session.revoked_at) {
        await RefreshSessionModel.query().patch({ revoked_at: new Date() }).where({ id: session.id });
      }
    } catch (_error) {
      // Logout is idempotent, including for expired or malformed refresh cookies.
    }
    return { loggedOut: true };
  }

  async me(userId) {
    const user = await UserModel.query().findById(userId);
    if (!user) throw notFound('Пользователь не найден');
    return publicUser(user);
  }
}

exports.AuthService = AuthService;
