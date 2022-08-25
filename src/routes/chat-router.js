/**
 * Chat routes.
 *
 * @author Martin Henriksson
 */

import express from 'express'
import { authenticateJWT } from '../helpers/auth-provider.js'
import { isAdminMiddleware } from '../helpers/isAdmin-provider.js'
import { ChatController } from '../controllers/chat-controller.js'

export const router = express.Router()

const controller = new ChatController()

// --------------------------------------------
// Routes
// --------------------------------------------
router.all('*', authenticateJWT)
router.get('/', (req, res, next) => controller.chatGet(req, res, next))
router.post('/', (req, res, next) => controller.chatPost(req, res, next))
router.get('/:id', (req, res, next) => controller.chatGet(req, res, next))
router.delete('/:id', isAdminMiddleware, (req, res, next) => controller.chatDelete(req, res, next))
