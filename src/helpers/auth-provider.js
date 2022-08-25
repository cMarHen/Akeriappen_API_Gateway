/**
 * Auth routes.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import firebase from 'firebase-admin'
import fbConfig from '../config/firebase-admin-config.js'
export default firebase

/**
 * Authenticates requests.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateJWT = async (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme.')
    }

    if (!firebase.apps.length) {
      fbConfig()
    } else {
      firebase.app()
    }

    // Verify token.
    const decodedToken = await firebase.auth().verifyIdToken(token)
    req.user = {
      sub: decodedToken.sub
    }

    next()
  } catch (error) {
    console.log(error)
    const err = createError(401)
    err.message = error.message
    next(err)
  }
}
