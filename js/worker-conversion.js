// worker-conversion.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Implementation of Conversion Worker Thread
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

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
  var r = { source: "", converted: "", filename: "", baseurl: "", cache: false };
  if (e.data instanceof Object) {
    var data = e.data;
    if ('cache' in data) {
      r.cache = data.cache; // forward cache (gMemFS) controls
    }
    if ('baseurl' in data) {
      r.baseurl = data.baseurl;
    }
    if ('filename' in data) {
      r.filename = data.filename;
      if ('source' in data) {
        var e = data.filename.toLowerCase().match(/\.(\w+)$/i);
        e = RegExp.$1;
        switch (e) {
          case 'amf':
          // FIXME correct the importScripts once JQUERY is not required
            importScripts(r.baseurl+'csg.js',r.baseurl+'openjscad.js',r.baseurl+'openscad.js');
            r.source = r.converted = parseAMF(data.source,data.filename);
            break;
          case 'gcode':
            importScripts(r.baseurl+'csg.js',r.baseurl+'openjscad.js',r.baseurl+'openscad.js');
            r.source = r.converted = parseGCode(data.source,data.filename);
            break;
          case 'obj':
            importScripts(r.baseurl+'csg.js',r.baseurl+'openjscad.js',r.baseurl+'openscad.js');
            r.source = r.converted = parseOBJ(data.source,data.filename);
            break;
          case 'scad':
            importScripts(r.baseurl+'csg.js',r.baseurl+'openjscad.js',r.baseurl+'openscad.js',r.baseurl+'underscore.js',r.baseurl+'openscad-openjscad-translator.js');
            r.source = data.source;
            if(!r.source.match(/^\/\/!OpenSCAD/i)) {
               r.source = "//!OpenSCAD\n"+data.source;
            }
            r.converted = openscadOpenJscadParser.parse(r.source);
            break;
          case 'stl':
            importScripts(r.baseurl+'csg.js',r.baseurl+'openjscad.js',r.baseurl+'openscad.js');
            r.source = r.converted = parseSTL(data.source,data.filename);
            break;
          case 'js':
            r.source = r.converted = data.source;
            break;
          case 'jscad':
            r.source = r.converted = data.source;
            break;
          default:
            console.log("WARNING: Invalid file type in conversion ("+e+")");
            break;
        }
      }
    }
  }
  postMessage(r);
};
