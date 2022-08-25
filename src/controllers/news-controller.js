/**
 * Class of type NewsController.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import { fetchContent, fetchPostContent } from '../helpers/fetch-provider.js'

/**
 * Encapsulate the class.
 */
export class NewsController {
  /**
   * Get all news.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async newsGet (req, res, next) {
    try {
      const limit = req.query.limit ? `?limit=${req.query.limit}` : ''
      const sort = req.query.sort ? `?sort=${req.query.sort}` : ''

      const url = `${process.env.NEWS_API_URL}${limit || sort}`

      const data = await fetchContent(req.headers.authorization, url)

      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(401))
    }
  }

  /**
   * Get all news.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async newsPost (req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new Error()
      }
      const response = await fetchPostContent(
        req.headers.authorization,
        process.env.NEWS_API_URL,
        'POST',
        {
          title: req.body.title,
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
      next(createError(400))
    }
  }

  /**
   * Edit a news.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async newsPatch (req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new Error()
      }

      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.NEWS_API_URL}/${req.params.id}`,
        'PATCH',
        req.body
      )

      if (response !== 204) {
        throw new Error()
      }
      res
        .status(204)
        .end()
    } catch (error) {
      next(createError(404))
    }
  }

  /**
   * Get all news.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async newsDelete (req, res, next) {
    try {
      if (!req.user.isAdmin) {
        throw new Error()
      }

      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.NEWS_API_URL}/${req.params.id}`,
        'DELETE'
      )

      if (response !== 204) {
        throw new Error()
      }
      res
        .status(204)
        .end()
    } catch (error) {
      next(createError(404))
    }
  }
}
