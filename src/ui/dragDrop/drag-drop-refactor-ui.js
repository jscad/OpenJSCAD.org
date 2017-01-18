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
  memFsCount: 0, // async reading: count of already read files
  memFsTotal: 0, // async reading: total files to read (Count==Total => all files read)
  memFsChanged: 0, // how many files have changed
  rootFs: [], // root(s) of folders
  gMainFile: null // file entry containing main()
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
export function superviseAllFiles (params, {me, memFsCount, memFsTotal, memFsChanged, rootFs, currentFiles}) {
  // console.log("superviseAllFiles()")
  memFsCount = memFsTotal = 0
  memFsChanged = 0

  if (params && params.forceReload) {
    memFsChanged++
  }

  if (!rootFs || rootFs.length === 0 || me === 'web-offline') { // walkFileTree won't work with file:// (regardless of chrome|firefox)
    for (let i = 0; i < currentFiles.length; i++) {
      // console.log("[offline] checking "+currentFiles[i].name)
      memFsTotal++
      readFileAsync(currentFiles[i])
    }
  } else {
    for (let i = 0; i < rootFs.length; i++) {
      walkFileTree(rootFs[i])
    }
  }
}

function reloadAllFiles () {
  // console.log("reloadAllFiles()")
  superviseAllFiles({forceReload: true})
}

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicated.
function readFileAsync (file, {memFs, memFsCount, memFsTotal, memFsChanged}, onError, onSuccess) {
  // console.log("readFileAsync: "+f.name)
  const reader = new FileReader()
  return new Promise(function (resolve, reject) {
    if (file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
      reader.readAsBinaryString(file, 'UTF-8')
    } else {
      reader.readAsText(file, 'UTF-8')
    }

    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        var source = evt.target.result
        // console.log("done reading: "+f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
        memFsCount++
        // note: assigning f.source = source too make memFs[].source the same, therefore as next
        if (!memFs[file.name] || memFs[file.name].source !== source)
          memFsChanged++

        saveScript(memFs, file.name, source)

        if (memFsCount === memFsTotal) { // -- are we done reading all?
          // console.log("readFileAsync: "+memFsTotal+" files read")
          const gMainFile = findMainFile(memFsTotal, memFs, file)

          if (memFsChanged > 0) {
            if (!gMainFile) {
              reject('No main.jscad found')
            } else {
              resolve(gMainFile)
            // console.log("update & redraw "+gMainFile.name)
            }
          }
        }
      } else {
        reject('Failed to read file')
      }
    }
  })
}





function errorHandler (e) {
  console.log('File Error: [' + e.name + '] Please check permissions')
}

// set one file (the one dragged) or main.jscad & call the main parser
function setCurrentFile (file, memFsTotal) {
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
