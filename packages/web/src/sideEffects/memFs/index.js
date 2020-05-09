const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const { head } = require('@jscad/core/utils/arrays')
const { walkFileTree } = require('../localFs/walkFileTree')
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
  let filesAndFolders = []

  const sink = (commands$) => {
    commands$.forEach(function (command) {
      const { path, type, id, data, options } = command
      const { isFs } = options
      log.info(`memfs: operation: ${type} ${path} ${id} ${options}`)

      // command handlers/ response
      // const read = () => {
      //   log.info('reading in memfs', data, path, options)
      //   if (fs.statSync(path).isFile()) {
      //     fs.readFile(path, 'utf8', function (error, data) {
      //       if (error) {
      //         commandResponses.callback({ path, type, error, id })
      //       } else {
      //         commandResponses.callback({ path, type, data, id, filesAndFolders })
      //       }
      //     })
      //   } else {
      //     fs.readDir(path, function (error, data) {
      //       if (error) {
      //         commandResponses.callback({ path, type, error, id })
      //       } else {
      //         commandResponses.callback({ path, type, data, id, filesAndFolders })
      //       }
      //     })
      //   }
      // }

      const add = async () => {
        if (isFs) {
          // this from inputs typically like drag & drop data
          filesAndFolders = await walkFileTree(data)
          commandResponses.callback({ type, id, data: filesAndFolders })
        } else {
          console.log('data', data)
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

      const commandHandlers = {
        // read,
        add,
        write
      }
      const commandHandler = commandHandlers[type] || commandHandlers.error
      commandHandler()
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }
  return { source, sink }
}

module.exports = makeMemFsSideEffect
