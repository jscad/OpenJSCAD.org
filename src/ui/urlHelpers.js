// this is a bit of a hack; doesn't properly supports urls that start with '/'
// but does handle relative urls containing ../
export function makeAbsoluteUrl (url, baseurl) {
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

export function getWindowURL () {
  if (window.URL) return window.URL
  else if (window.webkitURL) return window.webkitURL
  else throw new Error("Your browser doesn't support window.URL")
}

export function textToBlobUrl (txt) {
  var windowURL = getWindowURL()
  var blob = new Blob([txt], { type: 'application/javascript' })
  var blobURL = windowURL.createObjectURL(blob)
  if (!blobURL) throw new Error('createObjectURL() failed')
  return blobURL
}
