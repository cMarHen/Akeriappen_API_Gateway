/**
 * The routes.
 *
 * @author Martin Henriksson
 */

import express from 'express'
import createError from 'http-errors'
import { router as userRouter } from './user-router.js'
import { router as chatRouter } from './chat-router.js'
import { router as newsRouter } from './news-router.js'
import { router as trucksRouter } from './trucks-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Resource gateway start.' }))
router.use('/user', userRouter)
router.use('/chat', chatRouter)
router.use('/news', newsRouter)
router.use('/trucks', trucksRouter)

router.use('*', (req, res, next) => next(createError(404)))
