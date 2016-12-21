import createJscadWorker from './jscad-worker'
import createJscadFunction from './jscad-function'
import includeJscadSync from './includeJscadSync'

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * @param {String} text the original script (with include statements)
 * @param {String} relpath relative path, for xhr resolution
 * @returns {String} the full script, with inlined
 */
function replaceIncludes (text, relpath) {
  return new Promise(function (resolve, reject) {
    let scriptWithIncludes = text
    const includesPattern = /(?:include)\s?\("([\w\/.\s]*)"\);?/gm

    let foundIncludes = []
    let foundIncludesFull = []
    let match
    while(match = includesPattern.exec(text)) {
      foundIncludes.push(match[1])
      foundIncludesFull.push(match[0])
    }

    let tmpPromises = foundIncludes.map(function (uri, index) {
      const promise = includeJscadSync(relpath, uri)
      return promise.then(function (includedScript) {
        return replaceIncludes(includedScript, relpath).then(function (substring) {
          let currentItem = foundIncludesFull[index]
          scriptWithIncludes = scriptWithIncludes.replace(currentItem, substring)
          return scriptWithIncludes
        })
      })
    })
    Promise.all(tmpPromises).then(x => resolve(scriptWithIncludes))
  })
}

/**
 * evaluate script & rebuild solids, in main thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */
export function rebuildSolidSync (script, fullurl, parameters, globals, callback) {
  let relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }

  replaceIncludes(script, relpath).then(function (fullScript) {
    var func = createJscadFunction(fullurl, fullScript, globals)
    // stand-in for the include function(no-op)
    const include = (x) => x
    try {
      const objects = func(parameters, include, globals)
      callback(undefined, objects)
    }catch(error) {
      callback(error, undefined)
    }
  }).catch(error => callback(error, undefined))
}

/**
 * evaluate script & rebuild solids, in seperate thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */
export function rebuildSolidAsync (script, fullurl, parameters, globals, callback) {
  if (!window.Worker) throw new Error('Worker threads are unsupported.')

  // create the worker
  var that = this
  that.worker = createJscadWorker(this.baseurl + this.filename, [], script,
    // handle the results
    callback
  )
  // pass the libraries to the worker for import
  var libraries = this.opts.libraries.map(function (l) {
    return this.baseurl + this.opts.openJsCadPath + l
  }, this)
  // start the worker
  that.worker.postMessage({cmd: 'render', parameters, libraries})
}
