// jscad-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License

import { CAG, CSG } from '@jscad/csg'
import oscad from '@jscad/scad-api'

import createJscadFunction from './jscad-function'
import { toArray } from '../utils/misc'

/**
 * Create an worker (thread) for processing the JSCAD script into CSG/CAG objects
 */
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
