const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

const pollingWatcher = () => {
  let autoReloadTimer = setInterval(function () { superviseAllFiles() }, 1000)

  clearInterval(autoReloadTimer)
}

function watchTree (rootPath, callback) {
}

/**
 * returns list of files whose source has changed compared to the file with the same
 * name in memFs
 * @param {Object} reference - The reference hash of files, organized by name.
 * @param {Array} files - The list of files : need to have a source & name field.
 * @return array of files that changed
 */
function changedFiles (reference, files) {
  return files.filter(file => {
    const matches = reference.filter(ref => ref.fullPath === file.fullPath && ref.source !== file.source)
    return matches.length > 0
  })
}

// this handles all type of data from drag'n'drop, a list of files to read files, folders, etc
function handleFilesAndFolders (items) {
  const files = walkFileTree(items)
  files.catch(function (error) {
    console.error('failed to read files', error)
    if (gProcessor) gProcessor.clearViewer()
    previousScript = null
  })
  files.then(function (files) {
    // console.log('processed files & folders', files)
    afterFilesRead({memFs, memFsCount, memFsTotal, memFsChanged}, files)
  })
}

const makeFakeFs = (filesAndFolders) => {
  const findMatch = (path, inputs = filesAndFolders) => {
    let result
    for (let i = 0; i < inputs.length; i++) {
      const entry = inputs[i]
      if (path === entry.fullPath || ('/' + path) === entry.fullPath) {
        return entry
      }
      if (entry.children) {
        const res = findMatch(path, entry.children)
        if (res !== undefined) {
          return res
        }
      }
    }
    return undefined
    // return filesAndFolders
  }

  const statSync = path => {
    const entry = findMatch(path)
    return {
      isFile: _ => {
        return entry && ('source' in entry && !('children' in entry))
      },
      isDirectory: _ => {
        return entry && (!('source' in entry) && ('children' in entry))
      }
    }
  }
  const fakeFs = {
    statSync,
    existsSync: (path) => {
      const entry = findMatch(path)
      console.log('does ', path, 'exist ?', entry !== undefined)
      return entry !== undefined
    },
    readdirSync: (path) => {
      const entry = findMatch(path)
      return entry.children.map(x => x.name)
       // filesAndFolders
    },
    readFile: (path, encoding, callback) => {
      const entry = findMatch(path)
      if (!statSync(path).isFile()) {
        callback(new Error(`${entry} is not a file, cannot read`))
      } else {
        console.log('readFile', path, entry)
        callback(null, entry.source)
      }
    }
  }
  return fakeFs
}

const makeMemFsSideEffect = () => {
  const readFileToCB = callBackToStream()
  // for watchers
  const scriptDataFromCB = callBackToStream()
  let rawData
  let filesAndFolders = []
  let fs
  const sink = (out$) => {
    out$.forEach(function ({path, operation, id, data, options}) {
      console.log('read/writing to', path, operation, id, data, options)
      if (operation === 'read') {
        fs.readFile(path, 'utf8', function (error, data) {
          if (error) {
            readFileToCB.callback({path, operation, error, id})
          } else {
            readFileToCB.callback({path, operation, data, id, fs})
          }
        })
      } else if (operation === 'add') {
        console.log('data to add', data)
        const {walkFileTree} = require('../exp/walkFileTree')
        require('most').fromPromise(walkFileTree(data)).forEach(function (stuff) {
          console.log('done', stuff)
          rawData = data
          filesAndFolders = stuff
          fs = makeFakeFs(filesAndFolders)
          console.log('filesAndFolders', filesAndFolders)
        })

        /* const fakeRequire = makeFakeRequire({}, filesAndFolders)
        const fakeRequire = makeFakeRequire({}, filesAndFolders)

        const entryPoint = getDesignEntryPoint(fakeFs, fakeRequire._require, paths)
        console.log('design entry point', entryPoint)

        const rootModule = fakeRequire._require(entryPoint)
        console.log('rootModule', rootModule) */
      } else if (operation === 'watch') {
        console.log('watching', path, options, filesAndFolders)
        let watchers = []
        let watchedFilePath
        const {enabled} = options
        const rootPath = path

        let autoReloadTimer = setInterval(function () {
          const {walkFileTree} = require('../exp/walkFileTree')
          const files = walkFileTree(rawData)
          files.catch(function (error) {
            console.error('failed to read files', error)
          })
          files.then(function (files) {
            const whatChanged = changedFiles(filesAndFolders, files)
            // console.log('processed files & folders', files, 'changed', whatChanged)
            if (whatChanged.length > 0) {
              console.log('changed stuff', whatChanged)
              scriptDataFromCB.callback({path, data: whatChanged[0].source, operation, id})
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
              // console.log('FOOOOO', path, contents, operation, id)
              scriptDataFromCB.callback({path, data: contents, operation, id})
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
      fs$,
      watch$
    ])
  }
  // console.log('dropped', filesAndFolders)
  // const paths = filesAndFolders.map(x => x.name)
  // const fakeFs = makeFakeFs(filesAndFolders)

  return {source, sink}
}

module.exports = makeMemFsSideEffect
