const fs = require('fs')
const {requireUncached} = require('../core/scripLoading')
const callBackToStream = require('../observable-utils/callbackToObservable')

let watched
let watchedFilePath
let watcher
const scriptDataFromCB = callBackToStream()

function watcherSink (toWatch$) {
  if (!toWatch$) {
    throw new Error('no input specified in watcher sink')
  }
  toWatch$.forEach(function ({filePath, enabled}) {
    if (enabled === false) {
      if (watcher !== undefined) {
        // console.log('stopping to watch', filePath, enabled)
        watcher.close()
        watcher = undefined
      }
    } else {
      if (watchedFilePath !== filePath) {
        if (watcher !== undefined) {
          // console.log('stopping to watch', filePath, enabled)
          watcher.close()
          watcher = undefined
        }
      }
      if (watchedFilePath !== filePath || watcher === undefined) {
        watchedFilePath = filePath
        // console.log('starting to watch', filePath, enabled)
        watcher = fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
          if (filename) {
            // console.log('firing!', eventType)
            watched = filename
            // clear require() cache to force reload the file , otherwise it keeps reloading the cached version
            requireUncached(filePath)
            scriptDataFromCB.callback(filePath)
          }
        })
      }
    }
  })
}

function watcherSource () {
  return scriptDataFromCB.stream.multicast().debounce(1000)// debounce is very important as fs.Watch is unstable
}

module.exports = {watcherSink, watcherSource}
