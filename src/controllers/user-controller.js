/**
 * Class of type UserController.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import { fetchContent, fetchPostContent } from '../helpers/fetch-provider.js'

/**
 * Encapsulate the class.
 */
export class UserController {
  /**
   * Get all users.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userGet (req, res, next) {
    try {
      const { sub } = req.query
      const url = sub ? `${process.env.USER_API_URL}?sub=${sub}` : process.env.USER_API_URL
      const data = await fetchContent(
        req.headers.authorization,
        url
      )

      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(404))
    }
  }

  /**
   * Get one user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userGetOne (req, res, next) {
    try {
      const data = await fetchContent(
        req.headers.authorization,
        `${process.env.USER_API_URL}/${req.params.id}`
      )

      res
        .status(201)
        .json(data)
    } catch (error) {
      console.log(error)
      next(createError(400))
    }
  }

  /**
   * Create a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userPost (req, res, next) {
    try {
      const body = {
        sub: req.user.sub,
        username: req.body.username,
        salaryReportThisMonth: req.body.salaryReportThisMonth,
        trucks: req.body.trucks,
        isAdmin: req.body.isAdmin
      }

      console.log(body)

      // Create a new user
      const response = await fetchPostContent(
        req.headers.authorization,
        process.env.USER_API_URL,
        'POST',
        body
      )
      console.log(response)

      if (response === 204) {
        // Create a new salary collection for user
        const response2 = await fetchPostContent(
          req.headers.authorization,
          `${process.env.USER_API_URL}/salary`,
          'POST',
          { sub: req.user.sub }
        )
        console.log(response2)

        if (response2 !== 204) {
          throw new Error()
        }
      } else {
        throw new Error()
      }

      res
        .status(201)
        .end()
    } catch (error) {
      console.log(error)
      next(createError(400))
    }
  }

  /**
   * Edit user fields.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userPatch (req, res, next) {
    try {
      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.USER_API_URL}/${req.params.id}`,
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
      console.log(error)
      next(createError(400))
    }
  }

  /**
   * Delete user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userDelete (req, res, next) {
    try {
      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.USER_API_URL}/${req.params.id}`,
        'DELETE'
      )

      if (response !== 204) {
        throw new Error()
      }

      res
        .status(204)
        .end()
    } catch (error) {
      console.log(error)
      next(createError(400))
    }
  }

  /**
   * Get salary info for one user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userSalaryGet (req, res, next) {
    try {
      const { sub } = req.query

      const data = await fetchContent(
        req.headers.authorization,
        `${process.env.USER_API_URL}/salary?sub=${sub}`
      )

      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(404))
    }
  }

  /**
   * Get salary info for one user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userAddSalaryPost (req, res, next) {
    try {
      const { sub } = req.body
      if (!sub) {
        throw new Error()
      }
      const body = {
        salaryCollection: {
          month: req.body.salaryCollection.month,
          date: req.body.salaryCollection.date,
          minutesWorked: req.body.salaryCollection.minutesWorked
        }
      }
      console.log(body)

      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.USER_API_URL}/salary/add?sub=${sub}`,
        'POST',
        body
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
   * Get one user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async userisAdminGet (req, res, next) {
    try {
      res
        .status(201)
        .json(req.user)
    } catch (error) {
      console.log(error)
      next(createError(400))
    }
  }
}
