// jscad-function.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an function for processing the JSCAD script into CSG/CAG objects
//
// fullurl  - URL to original script
// script   - FULL script with all possible support routines, etc
// callback - function to call, returning results or errors
//
// This function creates an anonymous Function, which is invoked to execute the thread.
// The function executes in the GLOBAL context, so all necessary parameters are provided.
//
export default function createJscadFunction (fullurl, fullscript, implicitGlobals, callback) {
  // console.log("createJscadFunction()")

  // determine the relative base path for include(<relativepath>)
  var relpath = fullurl
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1)
  }

  // not a fan of this, we have way too many explicit api elements
  let globalsList = ''
  // each top key is a library ie : openscad helpers etc
  // one level below that is the list of libs
  Object.keys(implicitGlobals).forEach(function (libKey) {
    const lib = implicitGlobals[libKey]
    // console.log(`lib:${libKey}: ${lib}`)
    Object.keys(lib).forEach(function (libItemKey) {
      const libItems = lib[libItemKey]
      // console.log('libItems', libItems)
      Object.keys(libItems).forEach(function (toExposeKey) {
        const toExpose = libItems[toExposeKey]
        // console.log('toExpose',toExpose )
        const text = `const ${toExposeKey} = implicitGlobals['${libKey}']['${libItemKey}']['${toExposeKey}']\n`
        globalsList += text
      })
    })
  })
//
//
//  ${includeJscadSync.toString()}
  const source = `// SYNC WORKER
    var relpath = '${relpath}'
    //var include = includeJscadSync

    ${globalsList}

    //user defined script(s)
    ${fullscript}

    return resolver.then(function(includes){
      console.log('includes', includes)
      return main(params)
    })

  `

  //console.log("SOURCE: "+source)
  var f = new Function('params', 'include', 'resolver','implicitGlobals', source)
  //console.log('function', f)
  return f
}


function includeJscadSync (fn) {
  //console.log('include', relpath, fn)
  // include the requested script via MemFs if possible
  if (typeof (gMemFs) === 'object') {
    for (var fs in gMemFs) {
      if (gMemFs[fs].name === fn) {
        eval(gMemFs[fs].source)
        return
      }
    }
  }
  // include the requested script via webserver access
  var xhr = new XMLHttpRequest()
  var url = relpath + fn
  if (fn.match(/^(https:|http:)/i)) {
    url = fn
  }
  xhr.open('GET', url, false)
  xhr.onload = function () {
    var src = this.responseText
    eval(src)
  }
  xhr.onerror = function () {}
  xhr.send()
}
