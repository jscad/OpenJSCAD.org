const callBackToStream = require('../../observable-utils/callbackToObservable')
const WebWorkify = require('webworkify')

const makeWorkerEffect = (workerPath) => {
  let _worker = WebWorkify(workerPath)
  _worker.onerror = (error) => workerEventsCb.callback({ error })
  _worker.onmessage = (message) => workerEventsCb.callback(message)
  const workerEventsCb = callBackToStream()

  const workerSink = (outToWorker$) => {
    // cancel whatever is going on in the worker by terminating it
    outToWorker$.filter(({ cmd }) => cmd === 'cancel')
      .forEach((_) => _worker.terminate())
    // send other messages to the worker
    outToWorker$
      .filter(({ cmd }) => cmd !== 'cancel')
      .forEach((message) => {
        _worker.terminate()// FIXME: sub optimal ! worker recreation is SLOW and should not be systematic
        _worker = WebWorkify(workerPath)// new Worker(workerPath)
        _worker.onerror = (error) => workerEventsCb.callback({ error })
        _worker.onmessage = (message) => workerEventsCb.callback(message)
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
