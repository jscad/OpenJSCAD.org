const url = require('url')

const fetchUriParams = (uri, paramName, defaultValue = undefined) => {
  const params = new url.URL(uri)
  const result = params.searchParams.get(paramName)
  return result !== undefined ? result : defaultValue
}

const getAllUriParams = uri => {
  return Object.fromEntries(new url.URL(uri).searchParams.entries())
}

module.exports = { fetchUriParams, getAllUriParams }
