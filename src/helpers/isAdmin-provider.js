/**
 * Authorize admin.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import fetch from 'node-fetch'

/**
 * Authenticates requests.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const isAdminMiddleware = async (req, res, next) => {
  try {
    const data = await fetch(`${process.env.USER_API_URL}?sub=${req.user.sub}`, {
      method: 'GET',
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': 'application/json'
      }
    })
    const json = await data.json()
    req.user = json[0]

    next()
  } catch (error) {
    console.log(error)
    const err = createError(400)
    err.message = error.message
    next(err)
  }
}
