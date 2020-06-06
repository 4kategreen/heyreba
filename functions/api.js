const api = {
  get: (event, context) => {
    return {
      statusCode: 200,
      body: `reba says something for ${event.id}`
    }
  },
  post: (event, context) => {
    return {
      statusCode: 200,
      body: `reba wrote something`
    }
  },
  patch: (event, context) => {
    return {
      statusCode: 200,
      body: `reba updated something for ${event.id}`
    }
  }
}

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  switch (event.httpMethod) {
    case 'GET':
      // GET /.netlify/functions/api
      if (segments.length === 0) {
        return {
          statusCode: 500,
          body: 'missing userid'
        }
      }
      // GET /.netlify/functions/api/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return api.get(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'too many segments in GET request'
        }
      }
    // POST /.netlify/functions/api
    case 'POST':
      return api.post(event, context)
    // PUT /.netlify/functions/api/123456 
    case 'PATCH':
      if (segments.length === 1) {
        event.id = segments[0]
        return api.patch(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in POST request, must be /.netlify/functions/api/123456'
        }
      }
    // Fallthrough case
    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PATCH'
      }
  }
}