const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const { head } = require('@jscad/core/utils/arrays')
const makeFakeFs = require('./makeFakeFs')
const { walkFileTree } = require('./walkFileTree')
const { changedFiles, flattenFiles } = require('./utils')
const getFileExtensionFromString = require('@jscad/core/utils/getFileExtensionFromString')
const makeLogger = require('../../utils/logger')

const makeMemFsSideEffect = (params) => {
  const defaults = {
    logging: true
  }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })

  const commandResponses = callBackToStream()

  // general data
  let rawData
  let filesAndFolders = []
  let fs
  let watcher

  const sink = (commands$) => {
    commands$.forEach(function (command) {
      const { path, type, id, data, options } = command
      const defaults = {
        isRawData: false
      }
      const { isRawData, isFs, isPreFetched } = Object.assign({}, defaults, options)
      log.info(`memfs: operation: ${type} ${path} ${id} ${options}`)

      // command handlers/ response
      const read = () => {
        log.info('reading in memfs', data, path, options)
        if (fs.statSync(path).isFile()) {
          fs.readFile(path, 'utf8', function (error, data) {
            if (error) {
              commandResponses.callback({ path, type, error, id })
            } else {
              commandResponses.callback({ path, type, data, id, filesAndFolders })
            }
          })
        } else {
          fs.readDir(path, function (error, data) {
            if (error) {
              commandResponses.callback({ path, type, error, id })
            } else {
              commandResponses.callback({ path, type, data, id, filesAndFolders })
            }
          })
        }
      }

      const add = async () => {
        // we only inject raw data ie without file objects etc, typicall as a result of http requests
        if (isRawData) {
          const name = require('path').basename(path)
          const ext = getFileExtensionFromString(path)
          filesAndFolders = [{ name, ext, source: data, fullPath: path }] // do this to add more  filesAndFolders = filesAndFolders.concat([
          commandResponses.callback({ type, id, data: filesAndFolders })
        } else if (isFs) {
          // this from inputs typically like drag & drop data
          filesAndFolders = await walkFileTree(data)
          commandResponses.callback({ type, id, data: filesAndFolders })      
        } else if (isPreFetched) {
          filesAndFolders = data
          commandResponses.callback({ type, id, data: filesAndFolders })
        }
      }

      const write = () => {
        log.info('write', command, filesAndFolders, path)
        // check if we already have a matching entry with the same full (absolute) path
        const foundEntry = head(filesAndFolders.filter(entry => entry.fullPath === path))
        if (!foundEntry) {
          const name = require('path').basename(path)
          const ext = getFileExtensionFromString(path)

          filesAndFolders = filesAndFolders.concat([
            { name, ext, source: data, fullPath: path }
          ])
        } else {
          // update the source with the new data
          foundEntry.source = command.data
        }
      }

      const watch = () => {
        // if rawData is undefined, it means we cannot watch the target data
        // ie data loaded from http etc
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
        read,
        add,
        write,
        watch
      }
      const commandHandler = commandHandlers[type] || commandHandlers['error']
      commandHandler()
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }
  return { source, sink }
}

module.exports = makeMemFsSideEffect
