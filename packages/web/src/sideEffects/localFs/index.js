const { walkFileTree } = require('@jscad/core').web
const { callbackToObservable } = require('@jscad/core').observableUtils

const { changedFiles, flattenFiles } = require('./utils')

const localFsOptions = require('../../../data/localFsOptions.json')

const makeLocalFsSideEffect = async (params) => {
  console.log('params', JSON.parse(JSON.stringify(params)))
  const commandResponses = callbackToObservable()

  let webSocket = null
  let webSocketOpen = false
  let lastCheck = 0

  const sendWs = (m) => webSocket.send(JSON.stringify(m))

  const startWebSocket = () => {
    webSocket = new WebSocket(localFsOptions.livereloadUrl)

    webSocket.onopen = function (event) {
      console.log('websocket open', event)
      sendWs({ command: 'hello', protocols: ['http://livereload.com/protocols/official-6', 'http://livereload.com/protocols/official-7'], ver: '2.0.8', ext: 'Chrome', extver: '2.1.0' })
      webSocketOpen = true
    }

    webSocket.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.command === 'hello') sendWs({ command: 'info', plugins: { less: { disable: false, version: '1.0' } }, url: document.location })
      if (data.command === 'reload') lastCheck = 0
    }

    webSocket.onerror = function (event) {
      console.log('websocket error', event)
    }

    webSocket.onclose = function (event) {
      console.log('websocket closed', event)
      webSocketOpen = false
    }
  }

  const sink = (commands$) => {
    let currentFileTree
    let rawData
    let watcher
    let watcherDelay = 5000 // milliseconds

    // every time a new command is recieved (observable)
    commands$.forEach((command) => {
      // console.log('command', command)
      const { type, id, data, options, path } = command

      // command handlers/ response
      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`LocalFs: no handler found for command ${type}`) })
      }

      const read = async () => {
        // reset state
        currentFileTree = undefined
        rawData = undefined
        if (watcher) {
          clearInterval(watcher)
          watcher = 0
          if (webSocketOpen) {
            webSocket.close()
          }
        }
        if (!(data.length && (data[0] instanceof File))) rawData = data // only watch live FileSystem data

        currentFileTree = await walkFileTree(data)
        commandResponses.callback({ type, id, data: currentFileTree })
      }

      const watch = () => {
        // if rawData is undefined, it means we cannot watch the target data
        if (rawData === undefined) {
          return
        }

        const { enabled } = options
        if (enabled) {
          if (!webSocketOpen) startWebSocket()

          watcher = setInterval(() => {
            const now = Date.now()
            if (!rawData || (webSocketOpen && lastCheck) || (Date.now() - lastCheck) < watcherDelay) return
            lastCheck = now

            const startMs = Date.now()
            walkFileTree(rawData)
              .catch((error) => {
                console.error('failed to read files', error)
              })
              .then((newFileTree) => {
                const flatCurrent = flattenFiles(currentFileTree)
                const flatNew = flattenFiles(newFileTree)
                const whatChanged = changedFiles(flatCurrent, flatNew)
                if (whatChanged.length > 0) {
                  currentFileTree = newFileTree
                  commandResponses.callback({ type: 'read', id: 'loadRemote', data: currentFileTree, path, changed: whatChanged })
                }

                const endMs = Date.now()
                watcherDelay = Math.max((endMs - startMs) * 2, 1000)
              })
          }, 50)
        } else {
          if (watcher) {
            clearInterval(watcher)
            watcher = 0
          }
        }
      }

      const write = () => {
        // console.error('writing to local file system is not implemented yet')
      }

      const commandHandlers = {
        unhandled,
        read,
        watch,
        write
      }
      const commandHandler = commandHandlers[type] || commandHandlers.unhandled
      commandHandler()
    })
  }

  const source = () => commandResponses.stream.multicast()

  return { source, sink }
}

module.exports = makeLocalFsSideEffect
