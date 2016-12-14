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

let state = {
  autoReloadTimer: null,
  gMemFsCount: 0, // async reading: count of already read files
  gMemFsTotal: 0, // async reading: total files to read (Count==Total => all files read)
  gMemFsChanged: 0, // how many files have changed
  gRootFs: [], // root(s) of folders
  gMainFile: null// file entry containing main()
}

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

export function toggleAutoReload (toggle) {
  // console.log("toggleAutoReload()")
  if (toggle) {
    state.autoReloadTimer = setInterval(function () {superviseAllFiles()}, 1000)
  } else {
    if (state.autoReloadTimer !== null) {
      clearInterval(state.autoReloadTimer)
      state.autoReloadTimer = null
    }
  }
}

// check if there were changes: (re-)load all files and check if content was changed
export function superviseAllFiles (params, {me, gMemFsCount, gMemFsTotal, gMemFsChanged, gRootFs, gCurrentFiles}) {
  // console.log("superviseAllFiles()")
  gMemFsCount = gMemFsTotal = 0
  gMemFsChanged = 0

  if (params && params.forceReload) {
    gMemFsChanged++
  }

  if (!gRootFs || gRootFs.length === 0 || me === 'web-offline') { // walkFileTree won't work with file:// (regardless of chrome|firefox)
    for (let i = 0; i < gCurrentFiles.length; i++) {
      // console.log("[offline] checking "+gCurrentFiles[i].name)
      gMemFsTotal++
      readFileAsync(gCurrentFiles[i])
    }
  } else {
    for (let i = 0; i < gRootFs.length; i++) {
      walkFileTree(gRootFs[i])
    }
  }
}

// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) re-render if there was a change (via readFileAsync)
function walkFileTree (item, path) {
  console.log("walkFileTree")
  path = path || ''
  if (item.isFile) {
    // console.log("walkFileTree File: "+item.name)
    item.file(function (file) { // this is also asynchronous ... (making everything complicate)
      var e = file.name.toLowerCase().match(/\.(\w+)$/i)
      e = RegExp.$1
      if (conversionFormats.indexOf(e) >= 0) {
        state.gMemFsTotal++
        state.gCurrentFiles.push(file)
        readFileAsync(file)
      }
    }, errorHandler)
  } else if (item.isDirectory) {
    // console.log("walkFileTree Directory: "+item.name)
    var dirReader = item.createReader()
    dirReader.readEntries(function (entries) {
      // console.log("===",entries,entries.length)
      for (var i = 0; i < entries.length; i++) {
        // console.log(i,entries[i])
        walkFileTree(entries[i], path + item.name + '/')
      }
    })
  }
}

// this is the linear drag'n'drop, a list of files to read (when folders aren't supported)
function loadLocalFiles (items, {gMemFs, gMemFsCount, gMemFsTotal, gMemFsChanged}) {
  // console.log("loadLocalFiles: ",gCurrentFiles.length)
  gMemFsCount = 0
  gMemFsTotal = items.length
  gMemFsChanged = 0

  for (var i = 0; i < items.length; i++) {
    const file = items[i]
    // console.log(file)
    const params = {gMemFs, gMemFsCount, gMemFsTotal, gMemFsChanged}
    const onSuccess = setCurrentFile
    const onError = (error) => {
      throw new Error(error)}
    readFileAsync(file)
  }
}

function reloadAllFiles () {
  // console.log("reloadAllFiles()")
  superviseAllFiles({forceReload: true})
}

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicated.
function readFileAsync (file, {gMemFs, gMemFsCount, gMemFsTotal, gMemFsChanged}, onError, onSuccess) {
  // console.log("readFileAsync: "+f.name)
  var reader = new FileReader()
  reader.onloadend = function (evt) {
    if (evt.target.readyState === FileReader.DONE) {
      var source = evt.target.result
      // console.log("done reading: "+f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
      gMemFsCount++
      // note: assigning f.source = source too make gMemFs[].source the same, therefore as next
      if (!gMemFs[file.name] || gMemFs[file.name].source !== source)
        gMemFsChanged++

      saveScript(gMemFs, file.name, source)

      if (gMemFsCount === gMemFsTotal) { // -- are we done reading all?
        // console.log("readFileAsync: "+gMemFsTotal+" files read")
        const gMainFile = findMainFile(gMemFsTotal, gMemFs, file)

        if (gMemFsChanged > 0) {
          if (!gMainFile) {
            onError('No main.jscad found')
          } else {
            onSuccess(gMainFile)
          // console.log("update & redraw "+gMainFile.name)
          }
        }
      }
    } else {
      onError('Failed to read file')
    }
  }

  if (file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
    reader.readAsBinaryString(file, 'UTF-8')
  } else {
    reader.readAsText(file, 'UTF-8')
  }
}

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
        gCurrentFiles.push(evt.target.files[i]) // -- need to transfer the single elements
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

  state.gMemFs = []
  state.gMainFile = null

  if (evt.dataTransfer.items && evt.dataTransfer.items.length) { // full directories, let's try
    var items = evt.dataTransfer.items
    state.gCurrentFiles = []
    state.gMemFsCount = 0
    state.gMemFsTotal = 0
    state.gMemFsChanged = 0
    state.gRootFs = []
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      walkFileTree(items[i].webkitGetAsEntry())
      state.gRootFs.push(items[i].webkitGetAsEntry())
    }
  }
  // use the files list if not already processed above
  if (!evt.dataTransfer.items)
  {
    if(evt.dataTransfer.files.length > 0)
    {
      state.gCurrentFiles = [] // -- be aware: gCurrentFiles = evt.dataTransfer.files won't work, as rewriting file will mess up the array
      for (var i = 0; i < evt.dataTransfer.files.length; i++) {
        state.gCurrentFiles.push(evt.dataTransfer.files[i]) // -- need to transfer the single elements
      }
      loadLocalFiles(state.gCurrentFiles)
    } else {
      throw new Error('Please drop and drop one or more files')
    }
  }
}

function errorHandler (e) {
  console.log('File Error: [' + e.name + '] Please check permissions')
}

// set one file (the one dragged) or main.jscad & call the main parser
function setCurrentFile (file) {
  // console.log("setCurrentFile("+file.name+":"+file.source+")")
  var e = file.name.toLowerCase().match(/\.(\w+)$/i)
  e = RegExp.$1
  if (conversionFormats.indexOf(e) < 0) {
    throw new Error('Please drag and drop a compatible file')
  }
  if (file.size === 0) {
    throw new Error('You have dropped an empty file')
  }
  updateDropZone(file, memFsTotal)
  parseFile(file, false)
}

// update the dropzone visual
function updateDropZone (file, memFsTotal) {
  if (file) {
    let txt = `Current file: ${file.name}`
    if (memFsTotal > 1) {
      txt += `(${memFsTotal - 1} more files)`
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
