class ApiError extends Error {
    constructor(message, details) {
      super(message)
      this.name = 'API' + this.name
      this.details = details
    }
}

const headers = ({
    'Content-Type': 'application/json'
})

const request = async (method, url, body=null) => {

    const options = body ? { method, headers, body: JSON.stringify(body) } : { method, headers }
  
    let response

    try {
      response = await fetch(url, options)
    }
    catch(e) {
      throw new ApiError('API cannot be reached', e.message)
    }
  
    const data = await response.json()

    if (response.ok) {
      return data
    }
    else {
      if (data.error)
        throw new ApiError(data.error.message, data.error.details)
    }
}

export {
    ApiError,
    request
}