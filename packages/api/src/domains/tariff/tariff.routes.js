const express = require('express');
const asyncRoute = require('../../utils/async-route');
const { requireAuth, requireRole, roles } = require('../../utils/auth');
const { get } = require('../../container');
const TYPES = require('../../types');

const router = express.Router();
router.use(requireAuth);
router.get('/', asyncRoute(async (_request, response) => response.json(await get(TYPES.TariffService).list())));
router.post('/', requireRole(roles.admin), asyncRoute(async (request, response) => response.status(201).json(await get(TYPES.TariffService).create(request.body || {}))));
router.put('/:id', requireRole(roles.admin), asyncRoute(async (request, response) => response.json(await get(TYPES.TariffService).update(request.params.id, request.body || {}))));
router.delete('/:id', requireRole(roles.admin), asyncRoute(async (request, response) => response.json(await get(TYPES.TariffService).remove(request.params.id))));
module.exports = router;
