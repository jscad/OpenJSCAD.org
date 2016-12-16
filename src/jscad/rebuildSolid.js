import createJscadWorker from './jscad-worker'
import createJscadFunction from './jscad-function'

export function rebuildSolidSync (script, fullurl, parameters, globals, callback) {
  var func = createJscadFunction(fullurl, script, globals)
  function _require (moduleName) {
    console.log('require', moduleName)
  }
  let relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }

  let includeCount = 0
  let includes = []
  const include = function (uri) {
    includeCount++
    let currentInclude = includeJscadSync(relpath, uri)
    includes.push(currentInclude)
    currentInclude.then(x => includeCount -= 1)
  // Promise.all(includes).then(x=>console.log('all done'))
  }
  func(parameters, include, Promise.all(includes), globals)
    .then(function (objects) {
      callback(undefined, objects)
    })
    .catch(function (err) {
      callback(err, undefined)
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
