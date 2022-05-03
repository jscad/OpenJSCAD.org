const WebWorkify = require('webworkify')

const callBackToStream = require('../../most-utils/callbackToObservable')

const makeWorkerEffect = (workerPath) => {
  const workerEventsCb = callBackToStream()

  let _worker = WebWorkify(workerPath)
  _worker.onerror = (error) => workerEventsCb.callback({ error })
  _worker.onmessage = (message) => workerEventsCb.callback(message)

  const workerSink = (outToWorker$) => {
    // cancel whatever is going on in the worker by terminating it
    outToWorker$.filter(({ cmd }) => cmd === 'cancel')
      .forEach((_) => _worker.terminate())

    // send other messages to the worker
    outToWorker$
      .filter(({ cmd }) => cmd !== 'cancel')
      .forEach((task) => {
        // FIXME: sub optimal ! worker recreation is SLOW and should not be systematic
        _worker.terminate()
        _worker = WebWorkify(workerPath)
        _worker.onerror = (error) => workerEventsCb.callback({ error })
        _worker.onmessage = (message) => workerEventsCb.callback(message)
        // do the task
        _worker.postMessage(task)
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
