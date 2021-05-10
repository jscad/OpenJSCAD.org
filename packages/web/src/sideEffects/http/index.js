const path = require('path')

const { getFileExtensionFromString } = require('@jscad/core').utils

const { formats } = require('@jscad/io/formats')

const callbackToObservable = require('../../most-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')

// const proxyUrl = './remote.php?url='
const proxyUrl = './remote.pl?url='

const binaryMimetypes = {
  stl: 'application/sla'
}

/**
 * Create the http side effect (sink)
 * NOTE: we could add 'adaptors' to specific API providers like github as input to this
 * function in order to be able to read remote files without the need to proxy with a server
 */
const makeHttpSideEffect = (params) => {
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)

  const commandResponses = callbackToObservable()
  const log = makeLogger({ enabled: logging })

  /*
   * sink of http events (requests for http download)
   * each command is processed asyncronously, loading the requested data, and generating a response with payload
   * @param {Array} out$ - list of of commands, http requests
   */
  const sink = (out$) => {
    out$.forEach((command) => {
      const { type, id, urls, origin, proxy } = command

      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`http: no handler found for command ${type}`) })
      }

      const read = () => {
        let filesAndFolders = []
        urls.forEach((url) => {
          const onError = (error) => {
            commandResponses.callback({ type, id, url, error })
            log.error(error)
          }
          const onSuccess = (fileEntry) => {
            filesAndFolders = filesAndFolders.concat(fileEntry)
            commandResponses.callback({ type, id, url, data: filesAndFolders })
          }
          const onProxy = (proxy) => {
            if (proxy.file) {
              // create a relative URL to the file
              const baseUrl = new URL(origin)
              const newUrl = new URL(proxy.file, baseUrl)
              readFile(newUrl.toString(), onError, onSuccess)
            }
          }
          if (proxy) {
            readProxy(url, onError, onProxy)
          } else {
            readFile(url, onError, onSuccess)
          }
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

const readFile = (url, onerror, onsucess) => {
  const ext = getFileExtensionFromString(url)
  const isBinary = (binaryMimetypes[ext] !== undefined)

  fetch(url)
    .then((response) => {
      if (response.ok) {
        if (isBinary) {
          return response.arrayBuffer()
        } else {
          return response.text()
        }
      } else {
        onerror(new Error(`fetch error: ${response.status} ${response.statusText}`))
      }
    })
    .then((data) => {
      // create a fake fileEntry for use internally
      const name = path.basename(url)
      const fullPath = `/${name}`
      const mimetype = formats[ext] ? formats[ext].mimetype : ''
      const fileEntry = { name, ext, mimetype, source: data, fullPath }
      onsucess(fileEntry)
    })
    .catch((error) => {
      onerror(error)
    })
}

const readProxy = (url, onerror, onsucess) => {
  const proxyurl = proxyUrl + url

  fetch(proxyurl)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        onerror(new Error(`fetch error: ${response.status} ${response.statusText}`))
      }
    })
    .then((data) => {
      onsucess(data)
    })
    .catch((error) => {
      onerror(error)
    })
}

module.exports = makeHttpSideEffect
