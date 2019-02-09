// this is a bit of a hack; doesn't properly supports urls that start with '/'
// but does handle relative urls containing ../
function makeAbsoluteUrl (url, baseurl) {
  if (!url.match(/^[a-z]+\:/i)) {
    var basecomps = baseurl.split('/')
    if (basecomps.length > 0) {
      basecomps.splice(basecomps.length - 1, 1)
    }
    var urlcomps = url.split('/')
    var comps = basecomps.concat(urlcomps)
    var comps2 = []
    comps.map(function (c) {
      if (c == '..') {
        if (comps2.length > 0) {
          comps2.splice(comps2.length - 1, 1)
        }
      } else {
        comps2.push(c)
      }
    })
    url = ''
    for (var i = 0; i < comps2.length; i++) {
      if (i > 0) url += '/'
      url += comps2[i]
    }
  }
  return url
}

function textToBlobUrl (txt) {
  var windowURL = getWindowURL()
  var blob = new Blob([txt], { type: 'application/javascript' })
  var blobURL = windowURL.createObjectURL(blob)
  if (!blobURL) throw new Error('createObjectURL() failed')
  return blobURL
}

function getUrlParams (url) {
  let match
  let params = {}
  let docTitle
  let showEditor
  let fetchUrl

  const paramsCandidates = url.split('&')
  paramsCandidates.map(function (param) {
    if (match = param.match(/^.*#?param\[([^\]]+)\]=(.*)$/i)) {
      // console.log("matched parameter: key="+decodeURIComponent(match[1])+", val="+decodeURIComponent(match[2])+"")
      params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
    }
    else if (match = param.match(/^.*#?showEditor=false$/i)) {
      showEditor = false
    }
    else if (match = param.match(/^.*#?fetchUrl=(.*)$/i)) {
      // console.log("matched fetchUrl="+match[1])
      const urlParts = url.match(/^([^#]+)#/)
      // derive an old-style URL for compatibility's sake
      fetchUrl = urlParts[1] + '#' + decodeURIComponent(match[1])
    }
    else if (match = param.match(/^.*#?title=(.*)$/i)) {
      // console.log("matched title="+decodeURIComponent(match[1]))
      docTitle = decodeURIComponent(match[1])
    }
  })

  return {
    params,
    docTitle,
    showEditor,
    fetchUrl
  }
}

module.exports = {
  makeAbsoluteUrl,
  textToBlobUrl,
  getUrlParams
}
