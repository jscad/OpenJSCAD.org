const most = require('most')
/* const url = require('url')

const fetchUriParams = (uri, paramName) => {
  let params = url.parse(uri, true)
  let result = params.query
  // TODO: always return query
  if (paramName in result) return [].concat(result[paramName])
  return []
}

const getUriQuery = (uri) => {
  let uriData = url.parse(uri)
  let query = uriData.query
  return query
} */

const makeTitleBarSideEffect = () => {
  const sink = (outToTitle$) => {
    outToTitle$.forEach((title) => {
      document.title = title
    })
  }

  const source = () => {
    const _url = window.location.href
    return most.just(_url)
      .filter((x) => x !== undefined)
      .multicast()
      .skipRepeats()
  }
  return { sink, source }
}

module.exports = makeTitleBarSideEffect
