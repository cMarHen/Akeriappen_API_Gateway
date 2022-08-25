import fetch from 'node-fetch'

/**
 * Fetch data from given url.
 *
 * @param {string} auth - Auth token.
 * @param {string} url - The url to fetch.
 * @returns {Promise<object[]>} - Json data.
 */
export async function fetchContent (auth, url) {
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: auth
      }
    })
    const json = await data.json()

    return json
  } catch (error) {
    return null
  }
}

/**
 * HTTP-request to a given url.
 *
 * @param {string} auth - Auth token.
 * @param {string} url - The url to fetch.
 * @param {string} method - The HTTP-verb to use.
 * @param {object} bodyToUse - The body to use.
 * @returns {Promise<number>} - Status code from request.
 */
export async function fetchPostContent (auth, url, method, bodyToUse) {
  try {
    const body = bodyToUse ? JSON.stringify(bodyToUse) : null
    const data = await fetch(url, {
      method: method,
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      body: body
    })

    return data.status
  } catch (error) {
    return null
  }
}
