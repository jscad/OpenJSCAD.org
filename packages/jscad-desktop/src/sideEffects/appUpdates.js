const https = require('https')
const packageInfo = require('../../package.json')
const compareVersion = require('compare-version')
const callBackToStream = require('../utils/observable-utils/callbackToObservable')
const updatesFromCB = callBackToStream()

function appUpdateSource () {
  https.get({
    host: 'api.github.com',
    path: '/repos/jscad/jscad-desktop/releases/latest',
    headers: {
      'user-agent': `jscad v${packageInfo.localVersion}`
    }
  }, function (res) {
    if (res.statusCode === 200) {
      let result = ''
      res.on('data', (x) => {
        result += x
      }).on('end', () => {
        const info = JSON.parse(result)
        const remoteVersion = info.tag_name.slice(1)
        const localVersion = packageInfo.version
        const updateAvailable = (compareVersion(remoteVersion, localVersion) > 0)
        if (updateAvailable) {
          updatesFromCB.callback({available: updateAvailable, version: remoteVersion})
        }
      })
    }
  }
  )
  return updatesFromCB.stream
}

module.exports = {appUpdateSource}
