const url = require('url')

const fetchUriParams = (uri, paramName, defaultValue = undefined) => {
  const parts = new URL(uri) // parse URL and QUERY
  if (parts.searchParams.get(paramName)) return parts.searchParams.get(paramName)
  return defaultValue
}

const getAllUriParams = (uri) => url.parse(uri, true).query

module.exports = {
  fetchUriParams,
  getAllUriParams
}
