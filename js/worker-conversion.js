// -----------------------------------------------------------------------------------------------------------
// Implementation of Conversion Worker Thread
//
// See ui-workers.js for helper functions
// See index.js for how to create and start this thread

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
onmessage = function (e) {
  var r = { source: "", converted: "", filename: "", url: "", cache: false };
  if (e.data instanceof Object) {
    var data = e.data;
    var baseurl = '';
    if ('cache' in data) {
      r.cache = data.cache; // forward cache (gMemFS) controls
    }
    if ('url' in data) {
      r.url = data.url;
      baseurl = data.url;
      baseurl = baseurl.replace(/#.*$/,'');    // -- just to be sure ...
      baseurl = baseurl.replace(/\?.*$/,'');
      var index = baseurl.indexOf('index.html');
      if(index >= 0) {
         baseurl = baseurl.substring(0,index);
      }
    }
    if ('filename' in data) {
      r.filename = data.filename;
      if ('source' in data) {
        r.source = data.source;
      // FIXME this list should come from a global list
        var e = data.filename.toLowerCase().match(/\.(jscad|js|scad|stl|obj|amf|gcode)$/i);
        e = RegExp.$1;
        switch (e) {
          case 'amf':
          // FIXME correct the importScripts once JQUERY is not required
            importScripts(baseurl+'csg.js',baseurl+'openjscad.js',baseurl+'openscad.js');
            r.source = r.converted = parseAMF(data.source,data.filename);
            break;
          case 'gcode':
            importScripts(baseurl+'csg.js',baseurl+'openjscad.js',baseurl+'openscad.js');
            r.source = r.converted = parseGCode(data.source,data.filename);
            break;
          case 'obj':
            importScripts(baseurl+'csg.js',baseurl+'openjscad.js',baseurl+'openscad.js');
            r.source = r.converted = parseOBJ(data.source,data.filename);
            break;
          case 'scad':
            importScripts(baseurl+'csg.js',baseurl+'openjscad.js',baseurl+'openscad.js',baseurl+'underscore.js',baseurl+'openscad-openjscad-translator.js');
            r.source = data.source;
            if(!r.source.match(/^\/\/!OpenSCAD/i)) {
               r.source = "//!OpenSCAD\n"+data.source;
            }
            r.converted = openscadOpenJscadParser.parse(r.source);
            break;
          case 'stl':
            importScripts(baseurl+'csg.js',baseurl+'openjscad.js',baseurl+'openscad.js');
            r.source = r.converted = parseSTL(data.source,data.filename);
            break;
          case 'js':
            r.source = r.converted = data.source;
            break;
          case 'jscad':
            r.source = r.converted = data.source;
            break;
          default:
            break;
        }
      }
    }
  }
  postMessage(r);
};
