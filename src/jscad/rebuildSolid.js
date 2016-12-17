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
        return findIncludes(includedScript, relpath).then(function (substring) {
          let currentItem = foundIncludesFull[index]
          scriptWithIncludes = scriptWithIncludes.replace(currentItem, substring)
          return scriptWithIncludes
        })
      })
    })
    Promise.all(tmpPromises).then(x => resolve(scriptWithIncludes))
  })
}

export function rebuildSolidSync (script, fullurl, parameters, globals, callback) {
  let relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }

  replaceIncludes(script, relpath).then(function (fullScript) {
    console.log('WE HAVE RESULT !!', fullScript)
    var func = createJscadFunction(fullurl, fullScript, globals)

    const include = (x) => x
    func(parameters, include, Promise.all([]), globals)
      .then(function (objects) {
        callback(undefined, objects)
      })
      .catch(function (err) {
        callback(err, undefined)
      })
  })
}

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

/*
this.state = 1 // processing

function (err, objs) {
  that.worker = null
  if (err) {
    if (err.stack) {
      errtxt += '\nStack trace:\n' + err.stack
      //    var errtxt = err.toString()
    }
    that.setError(err)
    that.setStatus('Error.')
    that.state = 3 // incomplete
  } else {
    that.setCurrentObjects(objs)
    that.setStatus('Ready.')
    that.state = 2 // complete
  }
  that.enableItems()
}
*/
/*  //var objects =
  that.setCurrentObjects(objects)
  that.setStatus('Ready.')
  that.state = 2 // complete*/
