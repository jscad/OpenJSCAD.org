// jscad-worker.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// Create an worker (thread) for processing the JSCAD script into CSG/CAG objects
//
// fullurl  - URL to original script
// script   - FULL script with all possible support routines, etc
// callback - function to call, returning results or errors
//
// This function builds the Worker thread, which is started by a message
// The Worker thread (below) executes, and returns the results via another message.
//   (KIND OF LAME but that keeps the scope of variables and functions clean)
// Upon receiving the message, the callback routine is called with the results
//
OpenJsCad.createJscadWorker = function(fullurl, script, callback) {
  var source = buildJscadWorkerScript(fullurl, script);
  var blobURL = OpenJsCad.textToBlobUrl(source);
  var w = new Worker(blobURL);

  //console.log("createJscadWorker: "+source);

// when the worker finishes
// - call back the provided function with the results
  w.onmessage = function(e) {
    if (e.data instanceof Object) {
      var data = e.data;
      if(data.cmd == 'rendered') {
        if (data.objects && data.objects.length) {
        // convert the compact formats back to CSG/CAG form
          var objects = [];
          for(var i=0; i<data.objects.length; i++) {
            var o = data.objects[i];
            if (o['class'] == 'CSG') { objects.push(CSG.fromCompactBinary(o)); }
            if (o['class'] == 'CAG') { objects.push(CAG.fromCompactBinary(o)); }
          }
          callback(null, objects);
        } else {
          throw new Error("JSCAD Worker: missing 'objects'");
        }
      } else if(data.cmd == "error") {
        callback(data.err, null);
      } else if(data.cmd == "log") {
        callback(data.txt, null);
      }
    }
  };
// when there is an error
// - call back the provided function with the error
  w.onerror = function(e) {
    var errtxt = "Error in line "+e.lineno+": "+e.message;
    callback(errtxt, null);
  };

  return w;
};

// Build the Worker script from the parts
//   fullpath   - URL to the original file
//   fullscript - full JSCAD script
// Note: The full script must be define all data and functions required
function buildJscadWorkerScript(fullpath, fullscript) {
// determine the relative base path for include(<relativepath>)
  var relpath = fullpath;
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0,relpath.lastIndexOf('/')+1);
  }
  var source = "";
  source += 'onmessage = function(e) {\n';
  source += '  include = includeJscad;\n';
  source += '  self.relpath = "'+relpath+'";\n';
  source += '\n';
  source += fullscript+'\n';
  source += includeJscad.toString()+'\n';
  source += runJscadWorker.toString()+'\n';
  source += '  runJscadWorker(e);\n';
  source += '};';
  return source;
}

//
// THESE FUNCTIONS ARE SERIALIZED FOR INCLUSION IN THE FULL SCRIPT
//
// TODO It might be possible to cache the serialized versions
//

// Implement include() generally for all scripts
//
// (Note: This function is appended together with the JSCAD script)
//
function includeJscad(fn) {
// include the requested script via MemFs if possible
  if (typeof(gMemFs) == 'object') {
    for (var i = 0; i < gMemFs.length; i++) {
      if (gMemFs[i].name == fn) {
        eval(gMemFs[i].source);
        return;
      }
    }
  }
// include the requested script via importScripts
  var url = self.relpath+fn;
  if (fn.match(/^(https:|http:)/i)) {
    url = fn;
  }
  importScripts(url);
  return true;
};

// Run the JSCAD script via main()
//
// The message (event) must contain:
//   data.cmd        - 'render'
//   data.parameters - the parameter values to pass to main()
// The message (event) can also supply:
//   data.libraries  - the libraries (full URLs) to import
//
// (Note: This function is appended together with the JSCAD script)
//
function runJscadWorker(e) {
  var r = {cmd: "error", txt: "try again"};
  if (e.data instanceof Object) {
    var data = e.data;
    if(data.cmd == 'render') {
    // verify the command contents
      if(!data.parameters) { throw new Error("JSCAD Processor: missing 'parameters'"); }
    // setup the environment
      if(data.libraries && data.libraries.length) {
        data.libraries.map( function(l) { importScripts(l); } );
      }
    // setup the script
      if (typeof(main) == 'function') {
        var results = main( data.parameters );
        if (!results.length) { results = [results]; }
      // convert the results to a compact format for transfer back
        var objects = [];
        for(var i=0; i<results.length; i++) {
          var o = results[i];
          if (o instanceof CAG || o instanceof CSG) {
            objects.push(o.toCompactBinary());
          }
        }
      // return the results
        if (objects.length > 0) {
          r.cmd = "rendered";
          r.objects = objects;
        } else {
          r.err = 'The JSCAD script must return one or more CSG or CAG solids.';
        }
      } else {
        r.err = 'The JSCAD script must contain a function main() which returns one or more CSG or CAG solids.';
      }
    } else {
      throw new Error('JSCAD Processor: invalid worker command: '+data.cmd);
    }
  }
  postMessage(r);
};

