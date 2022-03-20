
const fs = require('fs')
const most = require('most')
const callBackToStream = require('../utils/observable-utils/callbackToObservable')

const requireUncached = require('../core/code-loading/requireUncached')
const resolveDependencies = require('../core/code-loading/resolveDependencies')
const { flatten } = require('@jscad/array-utils')

// FIXME: not used anymore? remove?
const watchMultiplePaths = (paths, changed) => {
  const prevContents = {}
  const watchers = paths.map((filePath, index) => {
    prevContents[filePath] = ''
    const watcher = fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
      requireUncached(filePath)
      const contents = fs.readFileSync(filePath, 'utf8')

      if (prevContents[filePath] !== contents) {
        changed({ filePath, contents })
        prevContents[filePath] = contents
      }
    })
    return watcher
  })
  return watchers
}

const removeWatchers = (watchers) => {
  watchers.map((watcher) => {
    watcher.close()
    return undefined
  })
}

const watchTree = (rootPath, changed) => {
  const prevContents = {}
  let watchers = []
  let allDependencyPaths = Array.from(new Set(flatten(resolveDependencies(undefined, rootPath))))
    .sort()

  const createWatchers = (dependencyPaths) =>
    allDependencyPaths.map((filePath, index) => {
      prevContents[filePath] = ''
      const watcher = fs.watch(filePath, { encoding: 'utf8' }, handleWatch.bind(null, filePath))
      return watcher
    })

  const handleWatch = (filePath, eventType, filename) => {
    requireUncached(filePath)
    const contents = fs.readFileSync(filePath, 'utf8')

    if (prevContents[filePath] !== contents) {
      changed({ filePath, contents })
      prevContents[filePath] = contents

      // now clear all watchers if needed
      const updatedDepencyPaths = Array.from(new Set(flatten(resolveDependencies(undefined, rootPath))))
      const depsChange = JSON.stringify(updatedDepencyPaths.sort()) !== JSON.stringify(allDependencyPaths)
      // console.log('depsChange', depsChange, updatedDepencyPaths, allDependencyPaths)
      if (depsChange) {
        removeWatchers(watchers)
        allDependencyPaths = updatedDepencyPaths
        watchers = createWatchers(updatedDepencyPaths)
      }
    }
  }

  watchers = createWatchers(allDependencyPaths)
  return watchers
}

module.exports = function makeFsSideEffects () {
  const readFileToCB = callBackToStream()
  // for watchers
  const scriptDataFromCB = callBackToStream()

  const fsSink = (out$) => {
    out$.forEach(({ path, operation, id, data, options }) => {
    // console.log('read/writing to', path, operation)
      if (operation === 'read') {
        fs.readFile(path, 'utf8', (error, data) => {
          if (error) {
            readFileToCB.callback({ path, operation, error, id })
          } else {
            readFileToCB.callback({ path, operation, data, id })
          }
        })
      } else if (operation === 'write') {
        fs.writeFileSync(path, data, options)
      } else if (operation === 'watch') {
        let watchers = []
        let watchedFilePath
        const { enabled } = options
        const rootPath = path
        if (enabled === false) {
          if (watchers.length > 0 && watchers[0] !== undefined) {
            // console.log('stopping to watch', filePath, enabled)
            removeWatchers(watchers)
          }
        } else {
          if (watchedFilePath !== rootPath) {
            if (watchers.length > 0 && watchers[0] !== undefined) {
              // console.log('stopping to watch', filePath, enabled)
              removeWatchers(watchers)
            }
          }
          if (watchedFilePath !== rootPath || watchers[0] === undefined) {
            watchedFilePath = rootPath

            watchers = watchTree(rootPath, (data) => {
              requireUncached(rootPath)
              // force reload the main file
              const contents = fs.readFileSync(rootPath, 'utf8')
              // console.log('FOOOOO', path, contents, operation, id)
              scriptDataFromCB.callback({ path, data: contents, operation, id })
            })
          }
        }
      }
    })
  }

  const fsSource = () => {
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
  return { sink: fsSink, source: fsSource }
}
