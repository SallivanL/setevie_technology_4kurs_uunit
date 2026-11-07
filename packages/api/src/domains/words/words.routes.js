const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
router.use(requireAuth);
router.get('/', asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).list(request.auth))));
router.get('/teachers', asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).listTeachers(request.auth))));
router.get('/students', asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).listStudents(request.auth))));
router.post('/', asyncRoute(async (request, response) => response.status(201).json(await get(TYPES.WordsService).create(request.auth, request.body || {}))));
router.put('/:id', asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).update(request.auth, request.params.id, request.body || {}))));
router.delete('/:id', asyncRoute(async (request, response) => response.json(await get(TYPES.WordsService).remove(request.auth, request.params.id))));
module.exports = router;
