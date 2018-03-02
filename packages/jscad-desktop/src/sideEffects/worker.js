const callBackToStream = require('../utils/observable-utils/callbackToObservable')

const makeWorkerEffect = (workerPath) => {
  let _worker = new Worker(workerPath)
  _worker.onerror = error => workerEventsCb.callback({error})
  _worker.onmessage = message => workerEventsCb.callback(message)
  const workerEventsCb = callBackToStream()

  const workerSink = function (outToWorker$) {
    outToWorker$.forEach(message => {
      _worker.terminate()// FIXME: sub optimal ! worker recreation is SLOW and should not be systematic
      _worker = new Worker(workerPath)
      _worker.onerror = error => workerEventsCb.callback({error})
      _worker.onmessage = message => workerEventsCb.callback(message)

      _worker.postMessage(message)
    })
  }

  const workerSource = function () {
    return workerEventsCb.stream.multicast()
  }
  return {
    sink: workerSink,
    source: workerSource
  }
}

module.exports = makeWorkerEffect
