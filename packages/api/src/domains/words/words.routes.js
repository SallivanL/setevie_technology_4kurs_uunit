const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth, requireRole, roles } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
router.use(requireAuth);
router.get('/teachers', requireRole(roles.teacher, roles.student), asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).listTeachers(request.auth))));
router.get('/students', requireRole(roles.teacher), asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).listStudents(request.auth))));
router.get('/:studentId', requireRole(roles.teacher, roles.student), asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).list(request.auth, request.params.studentId))));
router.post('/', requireRole(roles.teacher, roles.student), asyncRoute(async (request, response) => response.status(201).json(await get(TYPES.WordsService).create(request.auth, request.body || {}))));
router.put('/:id', requireRole(roles.teacher, roles.student), asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).update(request.auth, request.params.id, request.body || {}))));
router.delete('/:id', requireRole(roles.teacher, roles.student), asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).remove(request.auth, request.params.id))));
module.exports = router;
