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
import { conversionFormats } from '../../jscad/conversionFormats'
import createConversionWorker from '../../io/createConversionWorker'
import { putSourceInEditor } from '../editor' // FIXME : eeek! dependency on ui

import {walkFileTree as walkFileTree2, pseudoArraytoArray, isSupportedFormat} from './walkFileTree'
import {findMainFile, changedFiles} from './helpers'

// --- Global Variables
var currentFiles = [] // linear array, contains files (to read)
var memFs = [] // associated array, contains file content in source memFs[i].{name,source}
var autoReloadTimer = null

export function setupDragDrop (me, {gProcessor, gEditor}) {
  console.log('setupDragDrop')

  var memFsCount = 0 // async reading: count of already read files
  var memFsTotal = 0 // async reading: total files to read (Count==Total => all files read)
  var memFsChanged = 0 // how many files have changed
  var rootFs = [] // root(s) of folders
  var previousScript = null

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

  // ---------
  function reloadAllFiles () {
    console.log('reloadAllFiles()')
    superviseAllFiles({forceReload: true})
  }

  function afterFilesRead ({memFs, memFsCount, memFsTotal, memFsChanged}, files) {
    memFsCount = files.length
    memFsTotal = files.length

    // console.log('afterFilesRead', memFs, memFsTotal, files, 'changed',)
    // NOTE: order is important, if you cache new data first, it will fail
    const changedFilesCount = changedFiles(memFs, files).length
    // FIXME : THIRD time the SAME data is cached
    files.forEach(file => saveScript(memFs, file.name, file.source))
    const mainFile = findMainFile({memFs, memFsTotal}, files)

    if (changedFilesCount > 0) {
      if (!mainFile) throw new Error('No main.jscad found')
      setCurrentFile(mainFile)
    }
  }

  // this handles all type of data from drag'n'drop, a list of files to read files, folders, etc
  function handleFilesAndFolders (items) {
    const files = walkFileTree2(items)
    files.catch(function (error) {
      console.log('failed to fetch files')
    })
    files.then(function (files) {
      console.log('results yeah', files)
      afterFilesRead({memFs, memFsCount, memFsTotal, memFsChanged}, files)
    })
  }

  function handleInputFiles (evt) {
    console.log('handleInputFiles()')
    if (evt.target.files && evt.target.files.length > 0) {
      handleFilesAndFolders(evt.target.files)
    }
    throw new Error('Please drop and drop one or more files')
  }

  function handleFileSelect (evt) {
    console.log('handleFileSelect')
    evt.stopPropagation()
    evt.preventDefault()

    if (!evt.dataTransfer) throw new Error('Event is not a datatransfer (1)')
    if (!evt.dataTransfer.files) throw new Error('Event is not a datatransfer (2)')

    memFs = []

    if (evt.dataTransfer.items && evt.dataTransfer.items.length) { // full directories, let's try
      const items = pseudoArraytoArray(evt.dataTransfer.items)
      currentFiles = []
      rootFs = []
      memFsCount = 0
      memFsTotal = 0
      memFsChanged = 0

      rootFs = items
      currentFiles = items

      handleFilesAndFolders(items)
    }
    // use the files list if not already processed above
    if (!evt.dataTransfer.items) {
      if (evt.dataTransfer.files.length > 0) {
        handleFilesAndFolders(evt.dataTransfer.files)
      } else {
        throw new Error('Please drop and drop one or more files')
      }
    }
  }

  // set one file (the one dragged) or main.jscad
  function setCurrentFile (file) {
    // console.log(`setCurrentFile: ${file.name}: ${file.source}`)
    if (!isSupportedFormat(file)) {
      throw new Error('Please drag and drop a compatible file')
    }
    if (file.size === 0) {
      throw new Error('You have dropped an empty file')
    }
    updateDropZoneVisual(file, memFsTotal)
    parseFile(file)
  }

  // update the dropzone visual
  function updateDropZoneVisual (file, memFsTotal) {
    console.log('fileChanged()')
    if (file) {
      const text = memFsTotal > 1 ? `Current file: ${file.name} (${memFsTotal - 1} more files)` : `Current file: ${file.name}`

      document.getElementById('currentfile').innerHTML = text
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

  // check if there were changes: (re-)load all files and check if content was changed
  function superviseAllFiles (p) {
    //console.log('superviseAllFiles', p)
    memFsCount = memFsTotal = 0
    memFsChanged = 0

    if (p && p.forceReload) {
      memFsChanged++
    }

    // walkFileTree won't work the same way with file:// (regardless of chrome|firefox) , use alternative
    const rawData = (!rootFs || rootFs.length === 0 || me === 'web-offline') ? currentFiles : rootFs
    handleFilesAndFolders(rawData)
  }

  function saveScript (memFs, filename, source) {
    var f = {name: filename, source: source}
    memFs[filename] = f
  }

  function onConversionDone (data) {
    if ('filename' in data && 'source' in data) {
      // console.log("editor"+data.source+']')
      putSourceInEditor(gEditor, data.source, data.filename)
    }
    if ('filename' in data && 'converted' in data) {
      // console.log("processor: "+data.filename+" ["+data.converted+']')
      if ('cache' in data && data.cache === true) {
        saveScript(memFs, data.filename, data.converted)
      }
      // set the processor's active memFs
      gProcessor.setMemfs(memFs)
      gProcessor.setJsCad(data.converted, data.filename)
    }
  }

  // parse the file (and convert) to a renderable source (jscad)
  function parseFile (file) {
    const {source, name} = file
    if (source === '') {
      if (document.location.toString().match(/^file\:\//i)) {
        throw new Error('Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.')
      }
      throw new Error('Could not read file.')
    }
    if (previousScript === source) return

    if (gProcessor) {
      // FIXME: why do we cache data if it is overwritten in 'onConversionDone'
      saveScript(memFs, name, source)
      // FIXME: refactor : same code as ui/examples
      gProcessor.setStatus('Converting ' + name + " <img id=busy src='imgs/busy.gif'>")
      const worker = createConversionWorker(onConversionDone)
      const baseurl = gProcessor.baseurl
      // NOTE: cache: true is very important to control the evaluation of all cached files (code)
      worker.postMessage({baseurl, source, filename: name, cache: true})
    }
  }

  // FIXME: horrid hack
  function toggleAutoReload (toggled) {
    // console.log("toggleAutoReload()")
    if (toggled) {
      autoReloadTimer = setInterval(function () { superviseAllFiles() }, 1000)
    } else {
      if (autoReloadTimer !== null) {
        clearInterval(autoReloadTimer)
        autoReloadTimer = null
      }
    }
  }
  return {
    toggleAutoReload,
    reloadAllFiles
  }
}
