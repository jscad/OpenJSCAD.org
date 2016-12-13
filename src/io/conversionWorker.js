module.exports = function (self) {
  self.onmessage = function (e) {
    var r = { source: '', converted: '', filename: '', baseurl: '', cache: false }
    if (e.data instanceof Object) {
      var data = e.data
      if ('cache' in data) {
        r.cache = data.cache; // forward cache (gMemFS) controls
      }
      if ('baseurl' in data) {
        r.baseurl = data.baseurl
      }
      if ('filename' in data) {
        r.filename = data.filename
        if ('source' in data) {
          var e = data.filename.toLowerCase().match(/\.(\w+)$/i)
          e = RegExp.$1
          switch (e) {
            case 'amf':
              //require('')
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/lib/sax-js-1.1.5/lib/sax.js', r.baseurl + 'js/jscad-parseAMF.js')
              r.source = r.converted = OpenJsCad.parseAMF(data.source, data.filename)
              break
            case 'gcode':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/openscad.js')
              r.source = r.converted = parseGCode(data.source, data.filename)
              break
            case 'obj':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/openscad.js')
              r.source = r.converted = parseOBJ(data.source, data.filename)
              break
            case 'scad':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/openscad.js', r.baseurl + 'js/lib/underscore.js', r.baseurl + 'js/lib/openscad-openjscad-translator.js')
              r.source = data.source
              if (!r.source.match(/^\/\/!OpenSCAD/i)) {
                r.source = '//!OpenSCAD\n' + data.source
              }
              r.converted = openscadOpenJscadParser.parse(r.source)
              break
            case 'stl':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/openscad.js')
              r.source = r.converted = parseSTL(data.source, data.filename)
              break
            case 'js':
              r.source = r.converted = data.source
              break
            case 'jscad':
              r.source = r.converted = data.source
              break
            case 'svg':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/lib/sax-js-1.1.5/lib/sax.js', r.baseurl + 'js/jscad-parseSVG.js')
              r.source = r.converted = OpenJsCad.parseSVG(data.source, data.filename)
              break
            case 'json':
              importScripts(r.baseurl + 'js/lib/csg.js', r.baseurl + 'js/openjscad.js', r.baseurl + 'js/jscad-parseJSON.js')
              r.source = r.converted = OpenJsCad.parseJSON(data.source, data.filename)
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
