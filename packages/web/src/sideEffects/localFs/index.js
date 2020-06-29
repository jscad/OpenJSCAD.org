const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

const { walkFileTree } = require('./walkFileTree')
const { changedFiles, flattenFiles } = require('./utils')

const makeLocalFsSideEffect = async (params) => {
  const commandResponses = callBackToStream()

  const sink = (commands$) => {
    let currentFileTree
    let rawData
    let watcher
    const watcherDelay = 5000 // milliseconds

    // every time a new command is recieved (observable)
    commands$.forEach((command) => {
      // console.log('command', command)
      const { type, id, data, options, path } = command

      // command handlers/ response
      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`LocalFs: no handler found for command ${type}`) })
      }

      const read = async () => {
        rawData = data
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
          watcher = setInterval(() => {
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
              })
          }, watcherDelay)
        } else {
          if (watcher) {
            // disable watcher
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
