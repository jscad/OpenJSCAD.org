// ui-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an worker (thread) for converting various formats to JSCAD
//
// See conversion-worker.js for the conversion process
//
import WebWorkify from 'webWorkify'

export default function createConversionWorker (onDone) {
  // const worker = new Worker('./stlStreamWorker.src.js')
  const worker = WebWorkify(require('./conversionWorker.js'))

  // var w = new Worker('src/io/conversion-worker.js') // FIXME: update this to WebWorkify
  // when the worker finishes
  // - put the converted source into the editor
  // - save the converted source into the cache (gMemFs)
  // - set the converted source into the processor (viewer)
  worker.onmessage = function (e) {
    console.log('got response from conversionWorker', e)
    if (e.data instanceof Object) {
      var data = e.data
      onDone(data)
    }
  }
  return worker
}
