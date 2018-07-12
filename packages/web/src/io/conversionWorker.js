// conversion worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Implementation of Conversion Worker Thread
//
// History:
//   2016/10/15: 0.5.2: added conversion of JSON by Z3 Dev
//   2016/06/27: 0.5.1: refactored AMF import and export by Z3 Dev
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Handle the onmessage event which starts the thread
// The "event" (message) is expected to have:
//   data - an anonymous object for passing data
//   data.url      - url of the page
//   data.filename - name of the source file
//   data.source   - contents of the source file
//
// A message is posted back to the main thread with:
//   source    - source code for the editor (See logic below)
//   converted - converted code for the processor (See logic below)
// Depending on what's being converted, the two are different or the same.
//
// NOTE: Additional scripts (libraries) are imported only if necessary

module.exports = function (self) {
  self.onmessage = function (e) {
    var r = { source: '', converted: '', filename: '', baseurl: '', cache: false }
    if (e.data instanceof Object) {
      var data = e.data
      if ('cache' in data) {
        r.cache = data.cache // forward cache (gMemFS) controls
      }
      if ('baseurl' in data) {
        r.baseurl = data.baseurl
      }
      if ('filename' in data) {
        r.filename = data.filename
        if ('source' in data) {
          var e = data.filename.toLowerCase().match(/\.(\w+)$/i)
          e = RegExp.$1
          const options = {version: data.version}
          switch (e) {
            case 'amf':
              const deserializeAmf = require('@jscad/io').amfDeSerializer.deserialize
              r.source = r.converted = deserializeAmf(data.source, data.filename, options)
              break
            case 'gcode':
              const deserializeGcode = require('@jscad/io').gcodeDeSerializer.deserialize
              r.source = r.converted = deserializeGcode(data.source, data.filename, options)
              break
            case 'obj':
              const deserializeObj = require('@jscad/io').objDeSerializer.deserialize
              r.source = r.converted = deserializeObj(data.source, data.filename, options)
              break
            case 'scad':
              // importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/openscad.js', r.baseurl + 'js/lib/underscore.js', r.baseurl + 'js/lib/openscad-openjscad-translator.js')
              r.source = data.source
              if (!r.source.match(/^\/\/!OpenSCAD/i)) {
                r.source = '//!OpenSCAD\n' + data.source
              }
              const openscadOpenJscadParser = require('@jscad/openscad-openjscad-translator')
              r.converted = openscadOpenJscadParser.parse(r.source)
              break
            case 'stl':
              const deserializeStl = require('@jscad/io').stlDeSerializer.deserialize
              r.source = r.converted = deserializeStl(data.source, data.filename, options)
              break
            case 'js':
              r.source = r.converted = data.source
              break
            case 'jscad':
              r.source = r.converted = data.source
              break
            case 'svg':
              const deserializeSvg = require('@jscad/io').svgDeSerializer.deserialize
              r.source = r.converted = deserializeSvg(data.source, data.filename, options)
              break
            case 'json':
              const deserializeJson = require('@jscad/io').jsonDeSerializer.deserialize
              r.source = r.converted = deserializeJson(data.source, data.filename, options)
              break
            case 'dxf':
              const deserializeDXF = require('@jscad/io').dxfDeSerializer.deserialize
              r.source = r.converted = deserializeDXF(data.source, data.filename, options)
              break
            default:
              r.source = r.converted = '// Invalid file type in conversion (' + e + ')'
              break
          }
        }
      }
    }
    postMessage(r)
  }
}
