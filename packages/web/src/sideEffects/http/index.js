// const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')
const getFileExtensionFromString = require('@jscad/core/utils/getFileExtensionFromString')

const XMLHttpRequest = window.XMLHttpRequest

/** function to create the http side effect
 * sink: input of commands that generate http requests
 * source: output of response from http requests
 * NOTE: we could add 'adaptors' to specific API providers like github as input to this
 * function in order to be able to read remote files without the need to proxy with a server
 */
const makeHttpSideEffect = (params) => {
  const commandResponses = callBackToStream()
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })
  /* var xhr = new XMLHttpRequest()
  xhr.open('GET', url || filename, true)
  if (filename.match(/\.(stl)$/i)) {
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
    out$.forEach((command) => {
      const { type, id, urls } = command // { options, id, type, urls }
      log.debug('output from http', urls)

      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`http: no handler found for command ${type}`) })
      }

      const read = () => {
        let filesAndFolders = []
        urls.forEach((url) => {
          const xhr = new XMLHttpRequest()
          xhr.onerror = (error) => {
            const rError = new Error(`failed to load ${url} see console for more details`)
            commandResponses.callback({ type, id, url, error: rError })
            log.error(error)
          }
          xhr.onload = (event) => {
            const result = event.currentTarget.responseText
            const status = event.target.status
            if (`${status}`.startsWith('4')) {
              commandResponses.callback({ type, id, url, error: new Error(result) })
            } else {
              const name = require('path').basename(url)
              const path = `/${name}` // fake path for fake filesystem lookup
              const ext = getFileExtensionFromString(path)
              filesAndFolders = filesAndFolders.concat({ name, ext, source: result, fullPath: path })
              commandResponses.callback({ type, id, url, data: filesAndFolders })
            }
          }
          xhr.open('GET', url, true)
          xhr.send()
        })
      }

      const write = () => {
        // TODO: ??
        log.warning('writing to http is not implemented yet')
      }

      const watch = () => {
        // TODO: ??
        log.warning('watching http is not implemented yet')
      }

      const commandHandlers = {
        read,
        write,
        watch,
        unhandled
      }
      const commandHandler = commandHandlers[type] || commandHandlers.unhandled
      commandHandler()
    })
  }
  const source = () => commandResponses.stream.multicast()

  return { source, sink }
}

module.exports = makeHttpSideEffect
