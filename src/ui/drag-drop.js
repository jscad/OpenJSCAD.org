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

import { conversionFormats } from '../jscad/conversionFormats'
import createConversionWorker from '../io/createConversionWorker'

// --- Global Variables

// --- Public API

export function setupDragDrop () {
  // console.log("setupDragDrop()")

  var dropZone = document.getElementById('filedropzone')
  var fileInput = document.getElementById('files-input')

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList) {
    // All the File APIs are supported.
    if ('createTouch' in document) {
      // This device is TOUCH sensitive so assume MOBILE, i.e. no drag and drop
      document.getElementById('filedropzone_empty').style.display = 'none'
      document.getElementById('filedropzone_input').style.display = 'block'
    } else {
      document.getElementById('filedropzone_empty').style.display = 'block'
      document.getElementById('filedropzone_input').style.display = 'none'
    }
  } else {
    throw new Error('Error: Your browser does not support the HTML File API')
  }
  dropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation()
    evt.preventDefault()
    evt.dataTransfer.dropEffect = 'copy'
  }, false)
  dropZone.addEventListener('drop', handleFileSelect, false)
  fileInput.addEventListener('change', handleInputFiles, false)
}

function toggleAutoReload () {
  // console.log("toggleAutoReload()")
  if (document.getElementById('autoreload').checked) {
    autoReloadTimer = setInterval(function () {superviseAllFiles()}, 1000)
  } else {
    if (autoReloadTimer !== null) {
      clearInterval(autoReloadTimer)
      autoReloadTimer = null
    }
  }
}

// --- Private Variables
var autoReloadTimer = null

var gMemFsCount = 0 // async reading: count of already read files
var gMemFsTotal = 0 // async reading: total files to read (Count==Total => all files read)
var gMemFsChanged = 0 // how many files have changed
var gRootFs = [] // root(s) of folders
var gMainFile = null // file entry containing main()

// --- Private API

function handleInputFiles (evt) {
  // console.log("handleInputFiles()")
  if (evt.target.files && evt.target.files.length > 0) {
    gCurrentFiles = []
    for (var i = 0; i < evt.target.files.length; i++) {
      var file = evt.target.files[i]
      var e = file.name.toLowerCase().match(/\.(\w+)$/i)
      e = RegExp.$1
      if (conversionFormats.indexOf(e) >= 0) {
        gCurrentFiles.push(evt.target.files[i]); // -- need to transfer the single elements
      }
    }
    loadLocalFiles(gCurrentFiles)
    return
  }
  throw new Error('Please drop and drop one or more files')
}

function handleFileSelect (evt) {
  // console.log("handleFileSelect()")
  evt.stopPropagation()
  evt.preventDefault()

  if (!evt.dataTransfer) throw new Error('Event is not a datatransfer (1)')
  if (!evt.dataTransfer.files) throw new Error('Event is not a datatransfer (2)')

  gMemFs = []
  gMainFile = null

  if (evt.dataTransfer.items && evt.dataTransfer.items.length) { // full directories, let's try
    var items = evt.dataTransfer.items
    gCurrentFiles = []
    gMemFsCount = 0
    gMemFsTotal = 0
    gMemFsChanged = 0
    gRootFs = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      walkFileTree(items[i].webkitGetAsEntry())
      gRootFs.push(items[i].webkitGetAsEntry())
    }
  }
  // use the files list if not already processed above
  if (!evt.dataTransfer.items && evt.dataTransfer.files.length > 0) {
    gCurrentFiles = [] // -- be aware: gCurrentFiles = evt.dataTransfer.files won't work, as rewriting file will mess up the array
    for (var i = 0; i < evt.dataTransfer.files.length; i++) {
      gCurrentFiles.push(evt.dataTransfer.files[i]); // -- need to transfer the single elements
    }
    loadLocalFiles(gCurrentFiles)
  } else {
    throw new Error('Please drop and drop one or more files')
  }
}

function errorHandler (e) {
  console.log('File Error: [' + e.name + '] Please check permissions')
}

// set one file (the one dragged) or main.jscad
function setCurrentFile (file) {
  // console.log("setCurrentFile("+file.name+":"+file.source+")")
  var e = file.name.toLowerCase().match(/\.(\w+)$/i)
  e = RegExp.$1
  if (conversionFormats.indexOf(e) < 0) {
    throw new Error('Please drag and drop a compatible file')
  }
  if (file.size == 0) {
    throw new Error('You have dropped an empty file')
  }
  fileChanged(file, gMemFsTotal)
  parseFile(file, false)
}



// update the dropzone visual & call the main parser
function fileChanged (f, memFsTotal) {
  if (f) {
    var txt
    if (memFsTotal > 1) {
      txt = 'Current file: ' + f.name + ' (+ ' + (memFsTotal - 1) + ' more files)'
    } else {
      txt = 'Current file: ' + f.name
    }
    document.getElementById('currentfile').innerHTML = txt
    document.getElementById('filedropzone_filled').style.display = 'block'
    document.getElementById('filedropzone_empty').style.display = 'none'
    document.getElementById('filedropzone_input').style.display = 'none'
  } else {
    document.getElementById('filedropzone_filled').style.display = 'none'
    if ('createTouch' in document) {
      // This device is TOUCH sensitive so assume MOBILE, i.e. no drag and drop
      document.getElementById('filedropzone_empty').style.display = 'none'
      document.getElementById('filedropzone_input').style.display = 'block'
    } else {
      document.getElementById('filedropzone_empty').style.display = 'block'
      document.getElementById('filedropzone_input').style.display = 'none'
    }
  }
}
