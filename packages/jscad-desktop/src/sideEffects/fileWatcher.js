const fs = require('fs')
const {requireUncached} = require('../core/scripLoading')
const callBackToStream = require('../observable-utils/callbackToObservable')

let watched
const scriptDataFromCB = callBackToStream()

function watcherSink (toWatch$) {
  if (!toWatch$) {
    throw new Error('no input specified in watcher sink')
  }
  toWatch$.forEach(function (filePath) {
    console.log('starting to watch', filePath)
    fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
      if (filename) {
        watched = filename
        requireUncached(filePath)
        console.log('firing event')
        scriptDataFromCB.callback(filePath)
      }
    })
  })
}

function watcherSource () {
  return scriptDataFromCB.stream.multicast()
}

module.exports = {watcherSink, watcherSource}
