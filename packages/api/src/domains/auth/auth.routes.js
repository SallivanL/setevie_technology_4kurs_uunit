const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
const cookieName = process.env.REFRESH_COOKIE_NAME || 'refresh_token';
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.REFRESH_COOKIE_SAME_SITE || 'lax',
  path: '/auth',
  maxAge: 30 * 24 * 60 * 60 * 1000,
});

router.post('/login', asyncRoute(async (request, response) => {
  const result = await get(TYPES.AuthService).login(request.body?.email_address ?? request.body?.email, request.body?.password, request.get('user-agent'));
  response.cookie(cookieName, result.refreshToken, cookieOptions());
  response.json({ user: result.user, access_token: result.accessToken });
}));

router.post('/refresh', asyncRoute(async (request, response) => {
  const result = await get(TYPES.AuthService).refresh(request.cookies?.[cookieName], request.get('user-agent'));
  response.cookie(cookieName, result.refreshToken, cookieOptions());
  // api.service.js reads data.access_token from the refresh response body.
  response.json({ data: { access_token: result.accessToken } });
}));

router.post('/logout', asyncRoute(async (request, response) => {
  await get(TYPES.AuthService).logout(request.cookies?.[cookieName]);
  response.clearCookie(cookieName, { ...cookieOptions(), maxAge: undefined });
  response.json({ loggedOut: true });
}));

router.get('/me', requireAuth, asyncRoute(async (request, response) => {
  response.json(await get(TYPES.AuthService).me(request.auth.userId));
}));

module.exports = router;
