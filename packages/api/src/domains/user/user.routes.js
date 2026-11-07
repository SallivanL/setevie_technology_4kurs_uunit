const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth, requireRole, roles } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
router.use(requireAuth);
router.get('/', requireRole(roles.admin), asyncRoute(async (_request, response) => response.json(await get(TYPES.UserService).list())));
router.post('/', requireRole(roles.admin), asyncRoute(async (request, response) => response.status(201).json(await get(TYPES.UserService).create(request.body || {}))));
router.post('/:teacherId/students/:studentId', requireRole(roles.teacher, roles.admin), asyncRoute(async (request, response) => {
  response.status(201).json(await get(TYPES.UserService).assignStudent({ actor: request.auth, teacherId: request.params.teacherId, studentId: request.params.studentId }));
}));
router.delete('/:teacherId/students/:studentId', requireRole(roles.teacher, roles.admin), asyncRoute(async (request, response) => {
  response.json(await get(TYPES.UserService).removeStudent({ actor: request.auth, teacherId: request.params.teacherId, studentId: request.params.studentId }));
}));
router.get('/:id', requireRole(roles.admin), asyncRoute(async (request, response) => response.json(await get(TYPES.UserService).findById(request.params.id))));
module.exports = router;
