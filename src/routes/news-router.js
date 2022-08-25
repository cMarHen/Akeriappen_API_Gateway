/**
 * News routes.
 *
 * @author Martin Henriksson
 */

import express from 'express'
import { authenticateJWT } from '../helpers/auth-provider.js'
import { isAdminMiddleware } from '../helpers/isAdmin-provider.js'
import { NewsController } from '../controllers/news-controller.js'

export const router = express.Router()

const controller = new NewsController()

// --------------------------------------------
// Routes
// --------------------------------------------
router.all('*', authenticateJWT)
router.get('/', (req, res, next) => controller.newsGet(req, res, next))
router.post('/', isAdminMiddleware, (req, res, next) => controller.newsPost(req, res, next))
router.get('/:id', (req, res, next) => controller.newsGet(req, res, next))
router.patch('/:id', isAdminMiddleware, (req, res, next) => controller.newsPatch(req, res, next))
router.delete('/:id', isAdminMiddleware, (req, res, next) => controller.newsDelete(req, res, next))
