const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeFakeFs = require('./makeFakeFs')
const {walkFileTree} = require('./walkFileTree')
const {changedFiles, flattenFiles} = require('./utils')
const getFileExtensionFromString = require('../../utils/getFileExtensionFromString')

const makeMemFsSideEffect = () => {
  const commandResponses = callBackToStream()

  // general data
  let rawData
  let filesAndFolders = []
  let fs
  let watcher

  const sink = (out$) => {
    out$.forEach(function (command) {
      const {path, type, id, data, options} = command
      const defaults = {
        isRawData: false
      }
      const {isRawData} = Object.assign({}, defaults, options)
      console.log(`memfs: operation: ${type} ${path} ${id} ${options}`)
      if (type === 'read') {
        console.log('reading in memfs', data, path, options)
        if (fs.statSync(path).isFile()) {
          fs.readFile(path, 'utf8', function (error, data) {
            if (error) {
              commandResponses.callback({path, type, error, id})
            } else {
              // FIXME: injection of fs & filesAndFolders is a huge hack
              commandResponses.callback({path, type, data, id, fs, filesAndFolders})
            }
          })
        } else {
          fs.readDir(path, function (error, data) {
            if (error) {
              commandResponses.callback({path, type, error, id})
            } else {
              // FIXME: injection of fs & filesAndFolders is a huge hack
              commandResponses.callback({path, type, data, id, fs, filesAndFolders})
            }
          })
        }
      } else if (type === 'add') {
        // we only inject raw data ie without file objects etc, typicall as a result of http requests
        if (isRawData) {
          const name = require('path').basename(path)
          const ext = getFileExtensionFromString(path)

          filesAndFolders = [
            {name, ext, source: data, fullPath: path}
          ]
          fs = makeFakeFs(filesAndFolders)
          commandResponses.callback({type, id, data: filesAndFolders})
        } else {
          // this from inputs typically like drag & drop data
          most.fromPromise(walkFileTree(data))
          .forEach(function (readFilesAndFolders) {
            rawData = data
            filesAndFolders = readFilesAndFolders
            fs = makeFakeFs(filesAndFolders)
            commandResponses.callback({type, id, data: filesAndFolders})
          })
        }

        /* const fakeRequire = makeFakeRequire({}, filesAndFolders)
        const fakeRequire = makeFakeRequire({}, filesAndFolders)

        const entryPoint = getDesignEntryPoint(fakeFs, fakeRequire._require, paths)
        console.log('design entry point', entryPoint)

        const rootModule = fakeRequire._require(entryPoint)
        console.log('rootModule', rootModule) */
      } else if (type === 'watch') {
        // if rawData is undefined, it means we cannot watch the target data
        // ie data loaded from http etc
        if (rawData === undefined) {
          return
        }
        const {enabled} = options
        if (watcher && !enabled) {
          clearInterval(watcher)
        }
        if (enabled) {
          watcher = setInterval(function () {
            const files = walkFileTree(rawData)
            files.catch(function (error) {
              console.error('failed to read files', error)
            })
            files.then(function (files) {
              const flatCurrent = flattenFiles(filesAndFolders)
              const flatNew = flattenFiles(files)
              const whatChanged = changedFiles(flatCurrent, flatNew)
              if (whatChanged.length > 0) {
                filesAndFolders = files
                commandResponses.callback({path, type: 'read', data, id: 'loadDesign', fs, filesAndFolders})
              }
            })
          }, 2000)
        }
      }
    })
  }

  const source = () => {
    const commandResponses$ = commandResponses.stream.tap(x => console.log('gnagna', x)).multicast()

    /* const watch$ = scriptDataFromCB.stream
      .debounce(400)
      .skipRepeats()
      .multicast() */

    return commandResponses$
  }
  return {source, sink}
}

module.exports = makeMemFsSideEffect
