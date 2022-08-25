/**
 * Roles routes.
 *
 * @author Martin Henriksson
 */

import express from 'express'
import { authenticateJWT } from '../helpers/auth-provider.js'
import { isAdminMiddleware } from '../helpers/isAdmin-provider.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

// --------------------------------------------
// Routes
// --------------------------------------------
router.all('*', authenticateJWT)
router.get('/', (req, res, next) => controller.userGet(req, res, next))
router.post('/', (req, res, next) => controller.userPost(req, res, next))
router.get('/isAdmin', isAdminMiddleware, (req, res, next) => controller.userisAdminGet(req, res, next))
router.get('/salary', isAdminMiddleware, (req, res, next) => controller.userSalaryGet(req, res, next))
router.post('/salary/add', isAdminMiddleware, (req, res, next) => controller.userAddSalaryPost(req, res, next))
router.get('/:id', isAdminMiddleware, (req, res, next) => controller.userGetOne(req, res, next))
router.patch('/:id', isAdminMiddleware, (req, res, next) => controller.userPatch(req, res, next))
router.delete('/:id', isAdminMiddleware, (req, res, next) => controller.userDelete(req, res, next))
