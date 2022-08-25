/**
 * Trucks routes.
 *
 * @author Martin Henriksson
 */

import express from 'express'
import { authenticateJWT } from '../helpers/auth-provider.js'
import { isAdminMiddleware } from '../helpers/isAdmin-provider.js'
import { TrucksController } from '../controllers/trucks-controller.js'

export const router = express.Router()

const controller = new TrucksController()

// --------------------------------------------
// Routes
// --------------------------------------------
router.all('*', authenticateJWT, isAdminMiddleware)
router.get('/', (req, res, next) => controller.trucksGet(req, res, next))
router.post('/', (req, res, next) => controller.truckPost(req, res, next))
router.get('/fuel', (req, res, next) => controller.truckFuelGet(req, res, next))
router.post('/fuel', (req, res, next) => controller.truckNewFuelPost(req, res, next))
router.post('/fuel/add', (req, res, next) => controller.truckAddFuelPost(req, res, next))
router.get('/:id', (req, res, next) => controller.truckGet(req, res, next))
router.patch('/:id', (req, res, next) => controller.truckPatch(req, res, next))
router.delete('/:id', (req, res, next) => controller.truckDelete(req, res, next))
