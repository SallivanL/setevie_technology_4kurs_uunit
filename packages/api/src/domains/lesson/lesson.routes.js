const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
router.use(requireAuth);
router.get('/', asyncRoute(async (request, response) => response.json(await get(TYPES.LessonService).list(request.auth))));
router.get('/:id', asyncRoute(async (request, response) => response.json(await get(TYPES.LessonService).get(request.auth, request.params.id))));
router.post('/', asyncRoute(async (request, response) => response.status(201).json(await get(TYPES.LessonService).create(request.auth, request.body || {}))));
router.put('/:id', asyncRoute(async (request, response) => response.json(await get(TYPES.LessonService).update(request.auth, request.params.id, request.body || {}))));
router.delete('/:id', asyncRoute(async (request, response) => response.json(await get(TYPES.LessonService).remove(request.auth, request.params.id))));
module.exports = router;
