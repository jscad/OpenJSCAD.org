const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

const makeHttpSideEffect = () => {
  const commandResponses = callBackToStream()

  /* var xhr = new XMLHttpRequest()
  xhr.open('GET', url || filename, true)
  if (filename.match(/\.(stl|gcode)$/i)) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined') // our pseudo binary retrieval (works with Chrome)
    }
  xhr.onload = function () {
      const source = this.responseText
      const baseurl = url ? url.replace(/\/[^\/]+$/, '/') : gProcessor.baseurl
      filename = url ? url.replace(/^.+\//, '') : filename

      // FIXME: refactor : same code as ui/drag-drop
      gProcessor.setStatus('converting', filename)
      const worker = createConversionWorker(onConversionDone)
      // NOTE: cache: false is set to allow evaluation of 'include' statements
      worker.postMessage({version, baseurl, source, filename, cache: false})
    }
  xhr.send() */

  const sink = (out$) => {
    out$.forEach(command => {
      const {type, id, data, url, options} = command
      // console.log('output', command)
      const xhr = new XMLHttpRequest()
      if (['read', 'get'].includes(type.toLowerCase())) {
        xhr.onload = function (event) {
          const result = this.responseText
          // console.log('result from request', result)
          const status = event.target.status
          if (`${status}`.startsWith('4')) {
            commandResponses.callback({type, id, url, error: result})
          }
          commandResponses.callback({type, id, url, data: result})
        }
        xhr.onerror = function (error) {
          // console.log('error', error)
          commandResponses.callback({type, id, url, error})
        }
        xhr.open('GET', url, true)
        xhr.send()
      }
    })
  }
  const source = () => {
    return commandResponses.stream.multicast()
  }

  return {source, sink}
}

module.exports = makeHttpSideEffect
