// ui-drag-drop.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//    from old OpenJsCad processfile.html by Joost Nieuwenhuijse,
//    with changes by Rene K. Mueller
//
// Drag'n'Drop Functionality
//
// History:
//   2016/06/27: 0.5.1: refactored AMF const and export by Z3 Dev
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
const { createConversionWorker } = require('../../io/createConversionWorker')
const { putSourceInEditor } = require('../editor') // FIXME : eeek! dependency on ui

const {walkFileTree, pseudoArraytoArray, isSupportedFormat} = require('./walkFileTree')
const {findMainFile, changedFiles, isLocalMode} = require('./helpers')

const version = require('../../../package.json').version

// --- Global Variables
var currentFiles = [] // linear array, contains files (to read)
var autoReloadTimer = null

function setupDragDrop (me, {memFs, gProcessor, gEditor}) {
  //memFs : // associated array, contains file content in source memFs[i].{name,source, fullpath}
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
    superviseAllFiles({forceReload: true})
  }

  // function is called once ALL files have been read (not evaluated/compiled)
  function afterFilesRead ({memFs, memFsCount, memFsTotal, memFsChanged}, files) {
    memFsCount = files.length
    memFsTotal = files.length

    // console.log('afterFilesRead', memFs, memFsTotal, files, 'changed',)
    // NOTE: order is important, if you cache new data first, it will fail
    const changedFilesCount = changedFiles(memFs, files).length
    // FIXME : THIRD time the SAME data is cached
    files.forEach(file => saveScript(memFs, file.name, file.source, file.fullpath))
    const mainFile = findMainFile({memFs, memFsTotal}, files)

    if (changedFilesCount > 0) {
      if (!mainFile) throw new Error('No main.jscad found')
      setCurrentFile(mainFile, memFsTotal)
    }
  }

  // this handles all type of data from drag'n'drop, a list of files to read files, folders, etc
  function handleFilesAndFolders (items) {
    const files = walkFileTree(items)
    files.catch(function (error) {
      console.error('failed to read files', error)
      if (gProcessor) gProcessor.clearViewer()
      previousScript = null
    })
    files.then(function (files) {
      //console.log('processed files & folders', files)
      afterFilesRead({memFs, memFsCount, memFsTotal, memFsChanged}, files)
    })
  }

  function handleInputFiles (evt) {
    console.log('handleInputFiles')
    if (evt.target.files && evt.target.files.length > 0) {
      const items = pseudoArraytoArray(evt.target.files)
      memFsCount = 0
      memFsTotal = 0
      memFsChanged = 0

      rootFs = items
      currentFiles = items
      handleFilesAndFolders(items)
    } else {
      throw new Error('Please drop and drop one or more files')
    }
  }

  function handleFileSelect (evt) {
    //console.log('handleFileSelect')
    // FIXME: imperative, ugly, temporary
    document.getElementById('reloadAllFiles').disabled = false
    document.getElementById('autoreload').disabled = false

    evt.stopPropagation()
    evt.preventDefault()

    if (!evt.dataTransfer) throw new Error('Event is not a datatransfer (1)')
    if (!evt.dataTransfer.files) throw new Error('Event is not a datatransfer (2)')

    memFs = []

    if (evt.dataTransfer.items && evt.dataTransfer.items.length) { // full directories, let's try
      const items = pseudoArraytoArray(evt.dataTransfer.items)
      memFsCount = 0
      memFsTotal = 0
      memFsChanged = 0

      rootFs = items
      currentFiles = items
      handleFilesAndFolders(items)
    }
    // use the files list if not already processed above, this means you CANNOT use reload/autoreload
    // TODO: reuse this to set UI , ideally using observables
    if (!evt.dataTransfer.items) {
      if (evt.dataTransfer.files.length > 0) {
        const items = pseudoArraytoArray(evt.dataTransfer.files)
        memFsCount = 0
        memFsTotal = 0
        memFsChanged = 0

        rootFs = items
        currentFiles = items
        handleFilesAndFolders(items)

        // FIXME: imperative, ugly, temporary
        document.getElementById('reloadAllFiles').disabled = true
        document.getElementById('autoreload').disabled = true
      } else {
        throw new Error('Please drop and drop one or more files')
      }
    }
  }

  // set one file (the one dragged) or main.jscad
  function setCurrentFile (file, memFsTotal) {
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
    // console.log('superviseAllFiles', p)
    memFsCount = memFsTotal = 0
    memFsChanged = 0

    if (p && p.forceReload) {
      memFsChanged++
    }
    // walkFileTree won't work the same way with file:// (regardless of chrome|firefox) , use alternative
    const rawData = (!rootFs || rootFs.length === 0 || me === 'web-offline') ? currentFiles : rootFs
    handleFilesAndFolders(rawData)
  }

  function saveScript (memFs, name, source, fullpath = '') {
    memFs[name] = {name, source, fullpath}
  }

  function onConversionDone (data) {
    if ('filename' in data && 'source' in data) {
      // console.log("editor"+data.source+']')
      putSourceInEditor(gEditor, data.source, data.filename)
    }
    if ('filename' in data && 'converted' in data) {
      // console.log("gProcessor: "+data.filename+" ["+data.converted+']')
      if ('cache' in data && data.cache === true) {
        saveScript(memFs, data.filename, data.converted)
      }
      // set the gProcessor's active memFs
      gProcessor.setMemfs(memFs)
      gProcessor.setJsCad(data.converted, data.filename)
    }
  }

  // parse the file (and convert) to a renderable source (jscad)
  function parseFile (file) {
    const {source, name} = file
    if (source === '') {
      if (isLocalMode()) {
        throw new Error('Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.')
      }
      throw new Error('Could not read file.')
    }
    if (previousScript === source) return

    if (gProcessor) {
      // FIXME: refactor : same code as ui/examples
      //TODO: don't set these status manually, use something like
      gProcessor.setStatus('converting', name)
      const worker = createConversionWorker(onConversionDone)
      const baseurl = gProcessor.baseurl
      // NOTE: cache: true is very important to control the evaluation of all cached files (code)
      worker.postMessage({version, baseurl, source, filename: name, cache: true})
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

module.exports = {
  setupDragDrop
}
