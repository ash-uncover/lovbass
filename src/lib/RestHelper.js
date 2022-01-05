export const request = async (url, method) => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')

  const params = {
    method,
    headers
  }

  try {
    const response = await fetch(url, params)
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      const error = await response.json()
      throw new Error(error.error)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const get = (url) => {
  return request(url, 'GET')
}
