const WebWorkify = require('webworkify')
const { CAG, CSG } = require('@jscad/csg')
const oscad = require('@jscad/scad-api')
const createJscadFunction = require('./jscad-function')
const { replaceIncludes } = require('./replaceIncludes')
const { resolveIncludes } = require('./resolveIncludes')
const { toArray } = require('../utils/misc')

/**
 * evaluate script & rebuild solids, in main thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 * @param {Object} options the settings to use when rebuilding the solid
 */
function rebuildSolid (script, fullurl, parameters, callback, options) {
  let basePath = fullurl
  if (basePath.lastIndexOf('/') >= 0) {
    basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1)
  }
  const defaults = {
    implicitGlobals: true,
    memFs: undefined,
    includeResolver: resolveIncludes // default function to retrieve 'includes'
  }
  options = Object.assign({}, defaults, options)

  replaceIncludes(script, basePath, '', {includeResolver: options.includeResolver, memFs: options.memFs})
    .then(function ({source}) {
      const globals = options.implicitGlobals ? (options.globals ? options.globals : {oscad}) : {}
      const func = createJscadFunction(source, globals)
    // stand-in for the include function(no-op)
      const include = x => x
      try {
        let objects = func(parameters, include, globals)
        objects = toArray(objects)
        if (objects.length === 0) {
          throw new Error('The JSCAD script must return one or more CSG or CAG solids.')
        }
        callback(undefined, objects)
      } catch (error) {
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
function rebuildSolidInWorker (script, fullurl, parameters, callback, options) {
  if (!parameters) { throw new Error("JSCAD: missing 'parameters'") }
  if (!window.Worker) throw new Error('Worker threads are unsupported.')
  const defaults = {
    implicitGlobals: true,
    memFs: undefined,
    includeResolver: resolveIncludes // default function to retrieve 'includes'
  }
  options = Object.assign({}, defaults, options)

  let basePath = fullurl
  if (basePath.lastIndexOf('/') >= 0) {
    basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1)
  }

  let worker
  replaceIncludes(script, basePath, '', {includeResolver: options.includeResolver, memFs: options.memFs})
    .then(function ({source}) {
      worker = WebWorkify(require('./jscad-worker.js'))
    // we need to create special options as you cannot send functions to webworkers
      const workerOptions = {implicitGlobals: options.implicitGlobals}
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
      worker.postMessage({cmd: 'render', fullurl, source, parameters, options: workerOptions})
    }).catch(error => callback(error, undefined))

  // have we been asked to stop our work?
  return {
    cancel: () => {
      if (worker) worker.terminate()
    }
  }
}

module.exports = {
  rebuildSolid,
  rebuildSolidInWorker
}
