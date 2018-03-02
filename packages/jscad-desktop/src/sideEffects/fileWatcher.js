const fs = require('fs')
const requireUncached = require('../core/code-loading/requireUncached')
const resolveDependencies = require('../core/code-loading/resolveDependencies')
const callBackToStream = require('../utils/observable-utils/callbackToObservable')

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

let watchedFilePath
const scriptDataFromCB = callBackToStream()

function watchMultiplePaths (paths, callback) {
  let prevContents = {}
  const watchers = paths.map(function (filePath, index) {
    prevContents[filePath] = ''
    const watcher = fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
      requireUncached(filePath)
      const contents = fs.readFileSync(filePath, 'utf8')

      if (prevContents[filePath] !== contents) {
        callback({filePath, contents})
        prevContents[filePath] = contents
      }
    })
    return watcher
  })
  return watchers
}

const removeWatchers = watchers => {
  watchers.map(watcher => {
    watcher.close()
    return undefined
  })
}

function watchTree (rootPath, callback) {
  // console.log('watchTree')
  let prevContents = {}
  let watchers = []
  let allDependencyPaths = Array.from(new Set(flatten(resolveDependencies(undefined, rootPath))))
    .sort()

  const createWatchers = dependencyPaths =>
    allDependencyPaths.map(function (filePath, index) {
      prevContents[filePath] = ''
      const watcher = fs.watch(filePath, { encoding: 'utf8' }, handleWatch.bind(null, filePath))
      return watcher
    })

  const handleWatch = (filePath, eventType, filename) => {
    requireUncached(filePath)
    const contents = fs.readFileSync(filePath, 'utf8')

    if (prevContents[filePath] !== contents) {
      callback({filePath, contents})
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

function watcherSink (toWatch$) {
  if (!toWatch$) {
    throw new Error('no input specified in watcher sink')
  }
  let watchers = []
  toWatch$.forEach(function ({filePath, enabled}) {
    const rootPath = filePath
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

        function stuffCallback (data) {
          requireUncached(rootPath)
          // force reload the main file
          const contents = fs.readFileSync(rootPath, 'utf8')
          scriptDataFromCB.callback({filePath, contents})
        }

        watchers = watchTree(rootPath, stuffCallback)
      }
    }
  })
}

function watcherSource () {
  return scriptDataFromCB.stream
    .debounce(400)
    .skipRepeats()
    .multicast()
}

module.exports = {watcherSink, watcherSource}
