import WebWorkify from 'webworkify'
import { CAG, CSG } from '@jscad/csg'
import oscad from '@jscad/scad-api'
import createJscadFunction from './jscad-function'
import { replaceIncludes } from './replaceIncludes'
import { resolveIncludes } from './resolveIncludes'
import { toArray } from '../utils/misc'

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * @param {String} text the original script (with include statements)
 * @param {String} relpath relative path, for xhr resolution
 * @param {String} memFs memFs cache object
 * @returns {String} the full script, with inlined
 */
function replaceIncludes (text, relpath, memFs, prefixes=[]) {
  return new Promise(function (resolve, reject) {
    if (prefixes.length == 0) {
      const globalsPrefix = `
globals['includedFiles'] || (globals['includedFiles'] = {})
globals['includesSource'] || (globals['includesSource'] = {})
if (!globals['originalIncludeFunction']) {
  globals['originalIncludeFunction'] = include
  include = function(file) {
    if (!globals['includedFiles'][file]) {
      globals['includesSource'][file]()
      globals['includedFiles'][file] = true
    }
  }
}
`
      prefixes = [globalsPrefix]
    }

    const includesPattern = /(?:include)\s?\("([\w\/.\s]*)"\);?/gm

    let foundIncludes = []
    let foundIncludesFull = []
    let match
    while(match = includesPattern.exec(text)) {
      foundIncludes.push(match[1])
      foundIncludesFull.push(match[0])
    }

    let tmpPromises = foundIncludes.map(function (uri, index) {
      const promise = includeJscadSync(relpath, uri, memFs)
      return promise.then(function (includedScript) {
        return replaceIncludes(includedScript, relpath, memFs, prefixes).then(function (substring) {
          const includedScriptPrefix = `
globals['includesSource']['${uri}'] = function() {
${includedScript}
}
`
          prefixes.push(includedScriptPrefix)
        })
      })
    })
    Promise.all(tmpPromises).then(x => resolve(prefixes.join("\n") + text))
  })
}

/**
 * evaluate script & rebuild solids, in main thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 * @param {Object} options the settings to use when rebuilding the solid
 */
export function rebuildSolid (script, fullurl, parameters, callback, options) {
  let relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }
  const defaults = {
    implicitGlobals: true,
    memFs: undefined,
    includeResolver: resolveIncludes // default function to retrieve 'includes'
  }
  options = Object.assign({}, defaults, options)

  replaceIncludes(script, relpath, options.memFs, options.includeResolver).then(function (fullScript) {
    const globals = options.implicitGlobals ? (options.globals ? options.globals : {oscad}) : {}
    const func = createJscadFunction(fullScript, globals)
    // stand-in for the include function(no-op)
    const include = (x) => x
    try {
      let objects = func(parameters, include, globals)
      objects = toArray(objects)
      if (objects.length === 0) {
        throw new Error('The JSCAD script must return one or more CSG or CAG solids.')
      }
      callback(undefined, objects)
    } catch(error) {
      callback(error, undefined)
    }
  }).catch(error => callback(error, undefined))

  // have we been asked to stop our work?
  return {
    cancel: () => {
      console.log('cannot stop work in main thread, sorry')
    }
  }
}

/**
 * evaluate script & rebuild solids, in seperate thread/webworker
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 * @param {Object} options the settings to use when rebuilding the solid
 */
export function rebuildSolidInWorker (script, fullurl, parameters, callback, options) {
  if (!parameters) { throw new Error("JSCAD: missing 'parameters'") }
  if (!window.Worker) throw new Error('Worker threads are unsupported.')
  const defaults = {
    implicitGlobals: true,
    memFs: undefined,
    includeResolver: resolveIncludes // default function to retrieve 'includes'
  }
  options = Object.assign({}, defaults, options)

  let relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }

  let worker
  replaceIncludes(script, relpath, options.memFs, options.includeResolver).then(function (script) {
    worker = WebWorkify(require('./jscad-worker.js'))
    worker.onmessage = function (e) {
      if (e.data instanceof Object) {
        const data = e.data.objects.map(function (object) {
          if (object['class'] === 'CSG') { return CSG.fromCompactBinary(object) }
          if (object['class'] === 'CAG') { return CAG.fromCompactBinary(object) }
        })
        callback(undefined, data)
      }
    }
    worker.onerror = function (e) {
      callback(`Error in line ${e.lineno} : ${e.message}`, undefined)
    }
    worker.postMessage({cmd: 'render', fullurl, script, parameters, options})
  }).catch(error => callback(error, undefined))

  // have we been asked to stop our work?
  return {
    cancel: () => {
      if(worker) worker.terminate()
    }
  }
}
