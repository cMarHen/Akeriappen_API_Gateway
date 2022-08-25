/**
 * Class of type ChatController.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import { fetchContent, fetchPostContent } from '../helpers/fetch-provider.js'

/**
 * Encapsulate the class.
 */
export class ChatController {
  /**
   * Get all chat messages.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async chatGet (req, res, next) {
    try {
      console.log('hej')
      const response = await fetchContent(
        req.headers.authorization,
        process.env.CHAT_API_URL
      )

      res
        .status(201)
        .json(response)
    } catch (error) {
      next(createError(401))
    }
  }

  /**
   * Post a new chat message.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async chatPost (req, res, next) {
    try {
      const response = await fetchPostContent(
        req.headers.authorization,
        process.env.CHAT_API_URL,
        'POST',
        {
          username: req.body.username,
          content: req.body.content
        }
      )

      if (response !== 204) {
        throw new Error()
      }

      res
        .status(204)
        .end()
    } catch (error) {
      next(createError(401))
    }
  }

  /**
   * Delete a chat message.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async chatDelete (req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new Error()
      }

      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.CHAT_API_URL}/${req.params.id}`,
        'DELETE'
      )

      if (response !== 204) {
        throw new Error()
      }

      res
        .status(204)
        .end()
    } catch (error) {
      next(createError(401))
    }
  }
}
