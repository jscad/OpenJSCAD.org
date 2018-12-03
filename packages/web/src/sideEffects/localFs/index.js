const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')
const { walkFileTree } = require('./walkFileTree')
const { changedFiles, flattenFiles } = require('./utils')

const makeLocalFsSideEffect = async (params) => {
  const commandResponses = callBackToStream()
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })
  let enabled = true

  const sink = (commands$) => {
    if (!enabled) { // bail out if not available
      return
    }

    let filesAndFolders
    let rawData
    let watcher

    // every time a new command is recieved (observable)
    commands$.forEach(command => {
      const { type, id, data, options, path } = command
      // console.log('command', command)

      // command handlers/ response
      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`no handler found for command ${type}`) })
      }

      const read = async () => {
        rawData = data
        filesAndFolders = await walkFileTree(data)
        commandResponses.callback({ type, id, data: filesAndFolders })
      }

      const watch = () => {
        // if rawData is undefined, it means we cannot watch the target data
        if (rawData === undefined) {
          return
        }
        const { enabled } = options
        if (watcher && !enabled) {
          clearInterval(watcher)
        }
        if (enabled) {
          watcher = setInterval(function () {
            const files = walkFileTree(rawData)
            files.catch(function (error) {
              log.error('failed to read files', error)
            })
            files.then(function (files) {
              const flatCurrent = flattenFiles(filesAndFolders)
              const flatNew = flattenFiles(files)
              const whatChanged = changedFiles(flatCurrent, flatNew)
              if (whatChanged.length > 0) {
                filesAndFolders = files
                commandResponses.callback({ path, type: 'watch', data, id: 'watchFiles', filesAndFolders, changed: whatChanged })
              }
            })
          }, 2000)
        }
      }

      const commandHandlers = {
        unhandled,
        read,
        watch
      }
      const commandHandler = commandHandlers[type] || commandHandlers['unhandled']
      commandHandler()
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }

  return { source, sink }
}

module.exports = makeLocalFsSideEffect
