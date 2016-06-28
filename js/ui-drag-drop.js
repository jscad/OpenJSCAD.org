// ui-drag-drop.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//    from old OpenJsCad processfile.html by Joost Nieuwenhuijse,
//    with changes by Rene K. Mueller
//
// Drag'n'Drop Functionality
//
// History:
//   2016/06/27: 0.5.1: refactored AMF import and export by Z3 Dev
//   2016/05/01: 0.5.0: Enhanced drag and drop for “mobile” devices, adding a File selection button if necessary
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev
//   2013/04/02: massively upgraded to support multiple-files (chrome & firefox) and entire directory drag'n'drop (chrome only)

// --- Dependencies
// * gProcessor var
// * putSourceInEditor function
// * #conversionWorker element with the worker code
// * #filedropzone element
// * #filedropzone_filled element
// * #filedropzone_empty element
// * #currentfile element

// --- Global Variables
var gCurrentFiles = [];       // linear array, contains files (to read)
var gMemFs = [];              // associated array, contains file content in source gMemFs[i].{name,source}

// --- Public API

function setupDragDrop() {
  //console.log("setupDragDrop()");

  var dropZone = document.getElementById('filedropzone');
  var fileInput = document.getElementById('files-input');

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList) {
    // All the File APIs are supported.
    if ('createTouch' in document) {
      // This device is TOUCH sensitive so assume MOBILE, i.e. no drag and drop
      document.getElementById("filedropzone_empty").style.display = "none";
      document.getElementById("filedropzone_input").style.display = "block";
    } else {
      document.getElementById("filedropzone_empty").style.display = "block";
      document.getElementById("filedropzone_input").style.display = "none";
    }
  } else {
    throw new Error("Error: Your browser does not support the HTML File API");
  }
  dropZone.addEventListener('dragover', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  fileInput.addEventListener('change', handleInputFiles, false);
};

function reloadAllFiles() {
  //console.log("reloadAllFiles()");
  superviseAllFiles({forceReload:true});
};

function toggleAutoReload() {
  //console.log("toggleAutoReload()");
  if (document.getElementById("autoreload").checked) {
    autoReloadTimer = setInterval(function(){superviseAllFiles();}, 1000);
  } else {
    if (autoReloadTimer !== null) {
      clearInterval(autoReloadTimer);
      autoReloadTimer = null;
    }
  }
};

// --- Private Variables
var autoReloadTimer = null;

var gMemFsCount = 0;          // async reading: count of already read files
var gMemFsTotal = 0;          // async reading: total files to read (Count==Total => all files read)
var gMemFsChanged = 0;        // how many files have changed
var gRootFs = [];             // root(s) of folders
var gMailFile = null;         // file entry containing main()

// --- Private API

function handleInputFiles(evt) {
  //console.log("handleInputFiles()");
  if (evt.target.files) {
    if(evt.target.files.length > 0) {
      gCurrentFiles = [];
      for(var i=0; i<evt.target.files.length; i++) {
        var file = evt.target.files[i];
        var e = file.name.toLowerCase().match(/\.(\w+)$/i);
        e = RegExp.$1;
        if(OpenJsCad.conversionFormats.indexOf(e) >= 0) {
          gCurrentFiles.push(evt.target.files[i]);  // -- need to transfer the single elements
        }
      }
      loadLocalFiles();
      return;
    }
  }
  throw new Error("Please drop and drop one or more files");
}

function handleFileSelect(evt) {
  //console.log("handleFileSelect()");
  evt.stopPropagation();
  evt.preventDefault();

  if(!evt.dataTransfer) throw new Error("Event is not a datatransfer (1)");
  if(!evt.dataTransfer.files) throw new Error("Event is not a datatransfer (2)");

  gMemFs = [];
  gMainFile = null;

  if(evt.dataTransfer.items && evt.dataTransfer.items.length) {     // full directories, let's try
    var items = evt.dataTransfer.items;
    gCurrentFiles = [];
    gMemFsCount = 0;
    gMemFsTotal = 0;
    gMemFsChanged = 0;
    gRootFs = [];
    for(var i=0; i<items.length; i++) {
       var item = items[i];
       walkFileTree(items[i].webkitGetAsEntry());
       gRootFs.push(items[i].webkitGetAsEntry());
    }
  }
// use the files list if not already processed above
  if(!evt.dataTransfer.items) {
    if(evt.dataTransfer.files.length>0) {
      gCurrentFiles = [];                              // -- be aware: gCurrentFiles = evt.dataTransfer.files won't work, as rewriting file will mess up the array
      for(var i=0; i<evt.dataTransfer.files.length; i++) {
        gCurrentFiles.push(evt.dataTransfer.files[i]);  // -- need to transfer the single elements
      }
      loadLocalFiles();
    } else {
      throw new Error("Please drop and drop one or more files");
    }
  }
};

function errorHandler(e) {
  console.log('File Error: ['+e.name+'] Please check permissions');
};

// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) re-render if there was a change (via readFileAsync)
function walkFileTree(item,path) {
  //console.log("walkFileTree()");
  path = path||"";
  if(item.isFile) {
    //console.log("walkFileTree File: "+item.name);
    item.file(function(file) {                // this is also asynchronous ... (making everything complicate)
      var e = file.name.toLowerCase().match(/\.(\w+)$/i);
      e = RegExp.$1;
      if(OpenJsCad.conversionFormats.indexOf(e) >= 0) {
        gMemFsTotal++;
        gCurrentFiles.push(file);
        readFileAsync(file);
      }
    }, errorHandler);
  } else if(item.isDirectory) {
    //console.log("walkFileTree Directory: "+item.name);
    var dirReader = item.createReader();
    dirReader.readEntries(function(entries) {
      //console.log("===",entries,entries.length);
      for(var i=0; i<entries.length; i++) {
        //console.log(i,entries[i]);
        walkFileTree(entries[i],path+item.name+"/");
      }
    });
  }
};

// this is the linear drag'n'drop, a list of files to read (when folders aren't supported)
function loadLocalFiles() {
  //console.log("loadLocalFiles: ",gCurrentFiles.length);
  var items = gCurrentFiles;
  gMemFsCount = 0;
  gMemFsTotal = items.length;
  gMemFsChanged = 0;

  for(var i=0; i<items.length; i++) {
    var f = items[i];
    //console.log(f);
    readFileAsync(f);
  }
};

// set one file (the one dragged) or main.jscad
function setCurrentFile(file) {
  //console.log("setCurrentFile("+file.name+":"+file.source+")");
  var e = file.name.toLowerCase().match(/\.(\w+)$/i);
  e = RegExp.$1;
  if(OpenJsCad.conversionFormats.indexOf(e) < 0) {
    throw new Error("Please drag and drop a compatible file");
  }
  if(file.size == 0) {
    throw new Error("You have dropped an empty file");
  }
  fileChanged(file);
};

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicate.
function readFileAsync(f) {
  //console.log("readFileAsync: "+f.name);

  var reader = new FileReader();
  reader.onloadend = function(evt) {
    if(evt.target.readyState == FileReader.DONE) {
      var source = evt.target.result;

      //console.log("done reading: "+f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
      gMemFsCount++;

     // note: assigning f.source = source too make gMemFs[].source the same, therefore as next
      if(!gMemFs[f.name]||gMemFs[f.name].source!=source)
        gMemFsChanged++;

      saveScript(f.name,source);

      if(gMemFsCount==gMemFsTotal) {                // -- are we done reading all?
        //console.log("readFileAsync: "+gMemFsTotal+" files read");

        if(gMemFsTotal>1) {
          for(var fn in gMemFs) {
            if(gMemFs[fn].name.match(/main.(jscad|js)$/)) {
              gMainFile = gMemFs[fn];
              break;
            }
          }
          if (!gMailFile) {
          // try again but search for the function declaration of main()
            for(var fn in gMemFs) {
              if(gMemFs[fn].source.search(/function\s+main\s*\(/) >= 0) {
                gMainFile = gMemFs[fn];
                break;
              }
            }
          }
        } else {
          gMainFile = gMemFs[f.name];
        }
        if(gMemFsChanged>0) {
          if(!gMainFile) throw("No main.jscad found");
          //console.log("update & redraw "+gMainFile.name);
          setCurrentFile(gMainFile);
        }
      }
    } else {
      throw new Error("Failed to read file");
      if(gProcessor) gProcessor.clearViewer();
        previousScript = null;
    }
  };

  if(f.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
    reader.readAsBinaryString(f,"UTF-8");
  } else {
    reader.readAsText(f,"UTF-8");
  }
};

// update the dropzone visual & call the main parser
function fileChanged(f) {
  //console.log("fileChanged()");
  if(f) {
    var txt;
    if(gMemFsTotal>1) {
      txt = "Current file: "+f.name+" (+ "+(gMemFsTotal-1)+" more files)";
    } else {
      txt = "Current file: "+f.name;
    }
    document.getElementById("currentfile").innerHTML = txt;
    document.getElementById("filedropzone_filled").style.display = "block";
    document.getElementById("filedropzone_empty").style.display = "none";
    document.getElementById("filedropzone_input").style.display = "none";
  } else {
    document.getElementById("filedropzone_filled").style.display = "none";
    if ('createTouch' in document) {
      // This device is TOUCH sensitive so assume MOBILE, i.e. no drag and drop
      document.getElementById("filedropzone_empty").style.display = "none";
      document.getElementById("filedropzone_input").style.display = "block";
    } else {
      document.getElementById("filedropzone_empty").style.display = "block";
      document.getElementById("filedropzone_input").style.display = "none";
    }
  }
  parseFile(f,false);
};

// check if there were changes: (re-)load all files and check if content was changed
function superviseAllFiles(p) {
  //console.log("superviseAllFiles()");

  gMemFsCount = gMemFsTotal = 0;
  gMemFsChanged = 0;

  if(p&&p.forceReload)
    gMemFsChanged++;

  if(!gRootFs||gRootFs.length==0||me=='web-offline') {              // walkFileTree won't work with file:// (regardless of chrome|firefox)
    for(var i=0; i<gCurrentFiles.length; i++) {
      //console.log("[offline] checking "+gCurrentFiles[i].name);
      gMemFsTotal++;
      readFileAsync(gCurrentFiles[i]);
    }
  } else {
    for(var i=0; i<gRootFs.length; i++) {
      walkFileTree(gRootFs[i]);
    }
  }
};

var previousScript = null;

function saveScript(filename,source) {
  //console.log("saveScript("+filename+","+source+")");
  var f = {name: filename, source: source};
  gMemFs[filename] = f;
}

// parse the file (and convert) to a renderable source (jscad)
function parseFile(f, onlyifchanged) {
  //console.log("parseFile("+f.name+")");
  var source = f.source;
  var editorSource = source;

  if(source == "") {
    if(document.location.toString().match(/^file\:\//i)) {
      throw new Error("Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.");
    }
    throw new Error("Could not read file.");
  }

  if(previousScript == source) return;

  if(gProcessor && (!onlyifchanged)) {
    var fn = f.name;

    saveScript(fn,source);

    gProcessor.setStatus("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
    var worker = OpenJsCad.createConversionWorker();
    var u = gProcessor.baseurl;
  // NOTE: cache: true is very important to control the evaluation of all cached files (code)
    worker.postMessage({baseurl: u, source: source, filename: fn, cache: true});
  }
};

