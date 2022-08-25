import { router } from '../routes/router'
import express from 'express'
import request from 'supertest'

// Configure express app and router
const app = express()
app.use(router)

describe(('Verify JWT'), () => {
  // Root should not require a JWT.
  test('GET /', async () => {
    const data = await request(app)
      .get('/')

    expect(data.statusCode).toBe(200)
  })

  // - /users should not be found
  test('GET /', async () => {
    const data = await request(app)
      .get('/users')

    expect(data.statusCode).toBe(404)
  })

  /**
   * Test user route
   */
  describe(('at /user'), () => {
    test('GET /user', async () => {
      const data = await request(app)
        .get('/user')

      expect(data.statusCode).toBe(401)
    })

    test('POST /user', async () => {
      const data = await request(app)
        .post('/user')

      expect(data.statusCode).toBe(401)
    })

    test('GET /user/isAdmin', async () => {
      const data = await request(app)
        .get('/user/isAdmin')

      expect(data.statusCode).toBe(401)
    })

    test('GET /user/salary', async () => {
      const data = await request(app)
        .get('/user/salary')

      expect(data.statusCode).toBe(401)
    })

    test('POST /user/salary', async () => {
      const data = await request(app)
        .post('/user/salary')

      expect(data.statusCode).toBe(401)
    })
  })

  /**
   * Test trucks route
   */
  describe(('at /trucks'), () => {
    test('GET /trucks', async () => {
      const data = await request(app)
        .get('/trucks')

      expect(data.statusCode).toBe(401)
    })

    test('POST /trucks', async () => {
      const data = await request(app)
        .post('/trucks')

      expect(data.statusCode).toBe(401)
    })

    test('GET /trucks/salary', async () => {
      const data = await request(app)
        .get('/trucks/fuel')

      expect(data.statusCode).toBe(401)
    })

    test('POST /trucks/salary', async () => {
      const data = await request(app)
        .post('/trucks/fuel')

      expect(data.statusCode).toBe(401)
    })
  })

  /**
   * Test news route
   */
  describe(('at /news'), () => {
    test('GET /news', async () => {
      const data = await request(app)
        .get('/news')

      expect(data.statusCode).toBe(401)
    })

    test('POST /news', async () => {
      const data = await request(app)
        .post('/news')

      expect(data.statusCode).toBe(401)
    })
  })

  /**
   * Test chat route
   */
  describe(('at /chat'), () => {
    test('GET /chat', async () => {
      const data = await request(app)
        .get('/chat')

      expect(data.statusCode).toBe(401)
    })

    test('POST /chat', async () => {
      const data = await request(app)
        .post('/chat')

      expect(data.statusCode).toBe(401)
    })
  })
})
