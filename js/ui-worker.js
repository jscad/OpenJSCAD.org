// ui-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an worker (thread) for converting various formats to JSCAD
//
// See worker-conversion.js for the conversion process
//
OpenJsCad.createConversionWorker = function() {
  var w = new Worker('js/worker-conversion.js');
// when the worker finishes
// - put the converted source into the editor
// - save the converted source into the cache (gMemFs)
// - set the converted source into the processor (viewer)
  w.onmessage = function(e) {
      if (e.data instanceof Object) {
        var data = e.data;
        if ('filename' in data && 'source' in data) {
          //console.log("editor"+data.source+']');
          putSourceInEditor(data.source,data.filename);
        }
        if ('filename' in data && 'converted' in data) {
          //console.log("processor: "+data.filename+" ["+data.converted+']');
          if ('cache' in data && data.cache == true) {
            saveScript(data.filename,data.converted);
          }
          gProcessor.setJsCad(data.converted,data.filename);
        }
      }
    };
  return w;
};

// Create a list of supported conversions
//
// See worker-conversion.js for the conversion process
//
OpenJsCad.conversionFormats = [
// 3D file formats
  'amf',
  'gcode',
  'js',
  'jscad',
  'obj',
  'scad',
  'stl',
// 2D file formats
  'svg',
];

