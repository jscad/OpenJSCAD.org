const url = require('url')

// FIXME url.parse deprecated
const fetchUriParams = (uri, paramName, defaultValue = undefined) => {
  const params = url.parse(uri, true)
  const result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}

const getAllUriParams = (uri) => url.parse(uri, true).query

module.exports = { fetchUriParams, getAllUriParams }
