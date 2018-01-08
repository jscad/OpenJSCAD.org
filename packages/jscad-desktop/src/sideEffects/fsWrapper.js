
const fs = require('fs')
const callBackToStream = require('../observable-utils/callbackToObservable')

const readFileToCB = callBackToStream()

function fsSink (out$) {
  out$.forEach(function ({operation, path}) {
    console.log('read/writing to', path, operation)
    if (operation === 'read') {
      fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
          readFileToCB.callback({error})
        } else {
          readFileToCB.callback({path, data, operation})
        }
      })
    }
  })
}

function fsSource () {
  return readFileToCB.stream.multicast()
}

module.exports = {
  fsSink,
  fsSource
}
