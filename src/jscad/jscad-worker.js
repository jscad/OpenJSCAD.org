// jscad-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an worker (thread) for processing the JSCAD script into CSG/CAG objects

import createJscadFunction from './jscad-function'
import { CAG, CSG } from '../csg'
import { toArray } from '../utils/misc'

import oscad from '../modeling/index'

module.exports = function (self) {
  self.onmessage = function (e) {
    var r = {cmd: 'error', txt: 'try again'}
    if (e.data instanceof Object) {
      var data = e.data
      if (data.cmd === 'render') {
        const {script, parameters, options} = e.data

        const globals = options.implicitGlobals ? { oscad } : {}
        const func = createJscadFunction(script, globals)
        let objects = func(parameters, x => x, globals)
        objects = toArray(objects)
          .map(function (object) {
            if (object instanceof CAG || object instanceof CSG) {
              return object.toCompactBinary()
            }
          })

        if (objects.length === 0) {
          throw new Error('The JSCAD script must return one or more CSG or CAG solids.')
        }
        self.postMessage({cmd: 'rendered', objects})
      }
    }
  }
}
