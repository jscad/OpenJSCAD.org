const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeFakeFs = require('./makeFakeFs')
const {walkFileTree} = require('./walkFileTree')
const {changedFiles} = require('./utils')

function watchTree (rootPath, callback) {
}

const makeMemFsSideEffect = () => {
  const commandResponses = callBackToStream()
  const readFileToCB = callBackToStream()
  // for watchers
  const scriptDataFromCB = callBackToStream()
  // general data
  let rawData
  let filesAndFolders = []
  let fs

  const sink = (out$) => {
    out$.forEach(function (command) {
      const {path, type, id, data, options} = command
      const defaults = {
        isRawData: false
      }
      const {isRawData} = Object.assign({}, defaults, options)
      // console.log(`memfs: operation: ${type} ${path} ${id} ${data} ${options}`)
      if (type === 'read') {
        console.log('reading in memfs', data, path, options)
        if (fs.statSync(path).isFile()) {
          fs.readFile(path, 'utf8', function (error, data) {
            if (error) {
              readFileToCB.callback({path, type, error, id})
            } else {
              // FIXME: injection of fs & filesAndFolders is a huge hack
              readFileToCB.callback({path, type, data, id, fs, filesAndFolders})
            }
          })
        } else {
          fs.readDir(path, function (error, data) {
            if (error) {
              readFileToCB.callback({path, type, error, id})
            } else {
              // FIXME: injection of fs & filesAndFolders is a huge hack
              readFileToCB.callback({path, type, data, id, fs, filesAndFolders})
            }
          })
        }
      } else if (type === 'add') {
        // we only inject raw data ie without file objects etc, typicall as a result of http requests
        if (isRawData) {
          filesAndFolders = [{name: require('path').basename(path), source: data, fullPath: path}]
          fs = makeFakeFs(filesAndFolders)
          commandResponses.callback({type, id, data: filesAndFolders})
        } else {
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
        return
        console.log('watching', path, options, filesAndFolders)
        let watchers = []
        let watchedFilePath
        const {enabled} = options
        const rootPath = path

        let autoReloadTimer = setInterval(function () {
          const files = walkFileTree(rawData)
          files.catch(function (error) {
            console.error('failed to read files', error)
          })
          files.then(function (files) {
            const whatChanged = changedFiles(filesAndFolders, files)
            // console.log('processed files & folders', files, 'changed', whatChanged)
            if (whatChanged.length > 0) {
              console.log('changed stuff', whatChanged)
              scriptDataFromCB.callback({path, data: whatChanged[0].source, type, id})
              filesAndFolders = files
            }
          })
        }, 2000)

        if (enabled === false) {
          if (watchers.length > 0 && watchers[0] !== undefined) {
            // console.log('stopping to watch', filePath, enabled)
            // removeWatchers(watchers)
          }
        } else {
          if (watchedFilePath !== rootPath) {
            if (watchers.length > 0 && watchers[0] !== undefined) {
              // console.log('stopping to watch', filePath, enabled)
              // removeWatchers(watchers)
            }
          }
          if (watchedFilePath !== rootPath || watchers[0] === undefined) {
            watchedFilePath = rootPath

            function stuffCallback (data) {
              // requireUncached(rootPath)
              // force reload the main file
              const contents = fs.readFileSync(rootPath, 'utf8')
              // console.log('FOOOOO', path, contents, type, id)
              scriptDataFromCB.callback({path, data: contents, type, id})
            }

            watchers = watchTree(rootPath, stuffCallback)
          }
        }
      }
    })
  }

  const source = () => {
    const fs$ = readFileToCB.stream.multicast()
    const watch$ = scriptDataFromCB.stream
      .debounce(400)
      .skipRepeats()
      .multicast()

    return most.mergeArray([
      commandResponses.stream.multicast(),
      fs$,
      watch$
    ])
  }
  return {source, sink}
}

module.exports = makeMemFsSideEffect
