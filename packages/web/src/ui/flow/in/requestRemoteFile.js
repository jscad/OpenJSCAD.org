const most = require('most')
const url = require('url')

function fetchUriParams (uri, paramName, defaultValue = undefined) {
  let params = url.parse(uri, true)
  let result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}
// helper function to retrieve the nth element of an array
function nth (index, data) {
  if (!data) {
    return undefined
  }
  if (data.length < index) {
    return undefined
  }
  return data[index]
}

const actions = ({sources}) => {
  const requestRemoteFile$ = most.mergeArray([
    // examples
    sources.dom.select('.example').events('click')
      .map(event => event.target.dataset.path),
    // remote, via proxy
    sources.titleBar.map(url => {
      // console.log('titlebar', url)
      const params = {}
      const useProxy = params.proxyUrl !== undefined || url.match(/#(https?:\/\/\S+)$/) !== null
      const documentUri = fetchUriParams(url, 'uri', undefined) || nth(1, url.match(/#(https?:\/\/\S+)$/)) || nth(1, document.URL.match(/#(examples\/\S+)$/))
      const baseUri = location.protocol + '//' + location.host + location.pathname
      // console.log('useProxy', useProxy, documentUri, baseUri)
      const documentUris = [documentUri]
      return documentUri // {type: 'loadRemote', data: {documentUris}}
    })
  ])
    .filter(x => x !== undefined)
    .map(data => ({type: 'read', id: 'loadRemote', url: data, sink: 'http'}))
    .multicast()

  return {requestRemoteFile$}
}

module.exports = actions
