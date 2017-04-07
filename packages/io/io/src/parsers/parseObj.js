import { vt2jscad } from '../utils/vt2jscad'

export function parseOBJ (obj, fn, options) {   // http://en.wikipedia.org/wiki/Wavefront_.obj_file
  const defaults = {version: '0.0.0'}
  options = Object.assign({}, defaults, options)
  const {version} = options
  
  var l = obj.split(/\n/)
  var v = [], f = []

  for (var i = 0; i < l.length; i++) {
    var s = l[i]
    var a = s.split(/\s+/)

    if (a[0] == 'v') {
      v.push([a[1], a[2], a[3]])
    } else if (a[0] == 'f') {
      var fc = []
      var skip = 0

      for (var j = 1; j < a.length; j++) {
        var c = a[j]
        c = c.replace(/\/.*$/, '')     // -- if coord# is '840/840' -> 840
        c--                       // -- starts with 1, but we start with 0
        if (c >= v.length) {
          skip++
        }
        if (skip == 0) {
          fc.push(c)
        }
      }
         // fc.reverse();
      if (skip == 0) {
        f.push(fc)
      }
    } else {
      ;     // vn vt and all others disregarded
    }
  }
  var src = ''
  src += '// producer: OpenJSCAD Compatibility (' + version + ') Wavefront OBJ Importer\n'
  src += '// date: ' + (new Date()) + '\n'
  src += '// source: ' + fn + '\n'
  src += '\n'
   // if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
  src += '// objects: 1\n// object #1: polygons: ' + f.length + '\n\n'
  src += 'function main() { return '
  src += vt2jscad(v, f)
  src += '; }'
  return src
}
