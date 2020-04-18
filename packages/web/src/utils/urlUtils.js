const url = require('url')

const fetchUriParams = (uri, paramName, defaultValue = undefined) => {
  let params = url.parse(uri, true)
  let result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}

const getAllUriParams = uri => {
  return url.parse(uri, true).query
}

module.exports = {fetchUriParams, getAllUriParams}
