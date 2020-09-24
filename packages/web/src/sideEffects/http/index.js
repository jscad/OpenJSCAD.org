const url = require('url')
const path = require('path')

const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')
const getFileExtensionFromString = require('@jscad/core/utils/getFileExtensionFromString')

const XMLHttpRequest = window.XMLHttpRequest

// const proxyUrl = './remote.php?url='
const proxyUrl = './remote.pl?url='

/**
 * Create the http side effect (sink)
 * NOTE: we could add 'adaptors' to specific API providers like github as input to this
 * function in order to be able to read remote files without the need to proxy with a server
 */
const makeHttpSideEffect = (params) => {
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)

  const commandResponses = callBackToStream()
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
              readFile(newUrl, onError, onSuccess)
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
  // console.log('readFile',url)

  const xhr = new XMLHttpRequest()
  xhr.onerror = () => {
    const error = new Error(`failed to load ${url} see console for more details`)
    onerror(error)
  }
  xhr.onload = (event) => {
    const source = event.currentTarget.responseText
    const status = event.target.status
    if (`${status}`.startsWith('4')) {
      const error = new Error(source)
      onerror(error)
    } else {
      const name = path.basename(url)
      const fullPath = `/${name}` // fake path for fake filesystem lookup
      const ext = getFileExtensionFromString(fullPath)
      const fileEntry = { name, ext, source, fullPath }
      onsucess(fileEntry)
    }
  }
  xhr.open('GET', url, true)
  xhr.withCredentials = true
  xhr.send()
}

const readProxy = (url, onerror, onsucess) => {
  const proxyurl = proxyUrl + url
  // console.log('readProxy',proxyurl)
  const xhr = new XMLHttpRequest()
  xhr.onerror = () => {
    const error = new Error(`failed to load ${url} see console for more details`)
    onerror(error)
  }
  xhr.onload = (event) => {
    const source = event.currentTarget.responseText
    const status = event.target.status
    if (`${status}`.startsWith('4')) {
      const error = new Error(source)
      onerror(error)
    } else {
      try {
        const fileentry = JSON.parse(source)
        onsucess(fileentry)
      } catch (e) {
        const error = new Error(`failed to cache ${url} to the proxy server`)
        onerror(error)
      }
    }
  }
  // send the request
  xhr.open('GET', proxyurl, true)
  xhr.send()
}

module.exports = makeHttpSideEffect
