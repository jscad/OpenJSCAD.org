const https = require('https')
const compareVersion = require('compare-version')
const callBackToStream = require('../utils/observable-utils/callbackToObservable')
const updatesFromCB = callBackToStream()

const releasesUrl = 'https://github.com/jscad/OpenJSCAD.org/releases/'

const appUpdateSource = (packageInfo) => {
  https.get({
    host: 'api.github.com',
    path: '/repos/jscad/OpenJSCAD.org/releases/latest',
    headers: {
      'user-agent': `jscad v${packageInfo.version}`
    }
  }, function (res) {
    if (res.statusCode === 200) {
      let result = ''
      res.on('data', (x) => {
        result += x
      }).on('end', () => {
        const info = JSON.parse(result)
        // we are only interested in @jscad/desktop releases
        if (info.tag_name && info.tag_name.includes('@jscad/desktop')) {
          const remoteVersion = info.tag_name.split('@')[2]
          const localVersion = packageInfo.version
          const updateAvailable = (compareVersion(remoteVersion, localVersion) > 0)
          if (updateAvailable) {
            updatesFromCB.callback({ available: updateAvailable, version: remoteVersion, releasesUrl })
          }
        }
      })
    }
  }
  )
  return updatesFromCB.stream
}

const makeAppUpdateSideEffect = (packageInfo) => {
  return { source: appUpdateSource.bind(null, packageInfo) }
}

module.exports = makeAppUpdateSideEffect
