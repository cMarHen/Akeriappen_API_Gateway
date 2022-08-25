/**
 * Class of type TrucksController.
 *
 * @author Martin Henriksson
 */

import createError from 'http-errors'
import { fetchContent, fetchPostContent } from '../helpers/fetch-provider.js'

/**
 * Encapsulate the class.
 */
export class TrucksController {
  /**
   * Get all trucks.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async trucksGet (req, res, next) {
    try {
      const { regNumber, drivers } = req.query

      console.log(regNumber)
      let data
      // If query with regNumber
      if (regNumber) {
        let query = ''

        // If multiple regNumber
        if (Array.isArray(req.query.regNumber)) {
          const queryParts = req.query.regNumber.map((q) => `&regNumber=${q}`)
          query = queryParts.join('')
        } else {
          query = `regNumber=${req.query.regNumber}`
        }

        data = await fetchContent(
          req.headers.authorization,
          `${process.env.TRUCK_API_URL}?${query}`
        )

        // Query on drivers
      } else if (drivers) {
        data = await fetchContent(
          req.headers.authorization,
          `${process.env.TRUCK_API_URL}?drivers=${drivers}`
        )
      } else {
        data = await fetchContent(
          req.headers.authorization,
          process.env.TRUCK_API_URL
        )
      }
      console.log(data)
      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(401))
    }
  }

  /**
   * Get one truck.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckGet (req, res, next) {
    try {
      const data = await fetchContent(
        req.headers.authorization,
        `${process.env.TRUCK_API_URL}/${req.params.id}`
      )

      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(404))
    }
  }

  /**
   * Create new truck.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckPost (req, res, next) {
    try {
      const bodyObj = {
        mileage: req.body.mileage,
        regNumber: req.body.regNumber,
        year: req.body.year,
        type: req.body.type,
        drivers: [...req.body.drivers]
      }

      // Create a new Truck
      const response = await fetchPostContent(
        req.headers.authorization,
        process.env.TRUCK_API_URL,
        'POST',
        bodyObj
      )

      console.log(response)

      if (response === 204) {
      // To create a fuel collection for the new Truck
        const response2 = await fetchPostContent(
          req.headers.authorization,
          `${process.env.TRUCK_API_URL}/fuel`,
          'POST',
          { regNumber: bodyObj.regNumber }
        )
        console.log(response2)
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
   * Edit truck fields.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckPatch (req, res, next) {
    try {
      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.TRUCK_API_URL}/${req.params.id}`,
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
   * Edit truck fields.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckDelete (req, res, next) {
    try {
      const response = await fetchPostContent(
        req.headers.authorization,
        `${process.env.TRUCK_API_URL}/${req.params.id}`,
        'DELETE'
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
   * Get fuel data.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckFuelGet (req, res, next) {
    try {
      const { regNumber } = req.query

      const data = await fetchContent(
        req.headers.authorization,
        `${process.env.TRUCK_API_URL}/fuel?regNumber=${regNumber}`
      )

      res
        .status(201)
        .json(data)
    } catch (error) {
      next(createError(404))
    }
  }

  /**
   * Post fuel data.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async truckAddFuelPost (req, res, next) {
    try {
      const { regNumber } = req.query

      if (regNumber) {
        const response = await fetchPostContent(
          req.headers.authorization,
          `${process.env.TRUCK_API_URL}/fuel/addFuel?regNumber=${regNumber}`,
          'POST',
          {
            mileage: req.body.mileage,
            fuelLiters: req.body.fuelLiters
          }
        )

        if (response !== 204) {
          throw new Error()
        }
      } else {
        throw new Error()
      }

      res
        .status(204)
        .end()
    } catch (error) {
      next(createError(400))
    }
  }
}
