// check if there were changes: (re-)load all files and check if content was changed
export function superviseAllFiles (params, {me, gMemFsCount, gMemFsTotal, gMemFsChanged, gRootFs, gCurrentFiles}) {
  // console.log("superviseAllFiles()")
  gMemFsCount = gMemFsTotal = 0
  gMemFsChanged = 0

  if (params && params.forceReload)
  {
    gMemFsChanged++
  }

  if (!gRootFs || gRootFs.length === 0 || me === 'web-offline') { // walkFileTree won't work with file:// (regardless of chrome|firefox)
    for (var i = 0; i < gCurrentFiles.length; i++) {
      // console.log("[offline] checking "+gCurrentFiles[i].name)
      gMemFsTotal++
      readFileAsync(gCurrentFiles[i])
    }
  } else {
    for (var i = 0; i < gRootFs.length; i++) {
      walkFileTree(gRootFs[i])
    }
  }
}

// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) re-render if there was a change (via readFileAsync)
function walkFileTree (item, path, {gMemFsTotal, gCurrentFiles}) {
  // console.log("walkFileTree()")
  path = path || ''
  if (item.isFile) {
    // console.log("walkFileTree File: "+item.name)
    item.file(function (file) { // this is also asynchronous ... (making everything complicate)
      var e = file.name.toLowerCase().match(/\.(\w+)$/i)
      e = RegExp.$1
      if (conversionFormats.indexOf(e) >= 0) {
        gMemFsTotal++
        gCurrentFiles.push(file)
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
    const onError = (error) => { throw new Error(error)}
    readFileAsync(file)
  }
}

function reloadAllFiles () {
  // console.log("reloadAllFiles()")
  superviseAllFiles({forceReload: true})
}

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicate.
function readFileAsync (file, {gMemFs, gMemFsCount, gMemFsTotal, gMemFsChanged}, onError, onSuccess) {
  // console.log("readFileAsync: "+f.name)
  var reader = new FileReader()
  reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
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
      //if (gProcessor) gProcessor.clearViewer()
      //previousScript = null
    }
  }

  if (file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
    reader.readAsBinaryString(file, 'UTF-8')
  } else {
    reader.readAsText(file, 'UTF-8')
  }
}

function findMainFile (gMemFsTotal, gMemFs, file) {
  let mainFile
  if (gMemFsTotal > 1) {
    for (let filename in gMemFs) {
      if (gMemFs[filename].name.match(/main.(jscad|js)$/)) {
        mainFile = gMemFs[filename]
        break
      }
    }
    if (!mainFile) {
      // try again but search for the function declaration of main()
      for (let filename in gMemFs) {
        if (gMemFs[filename].source.search(/function\s+main\s*\(/) >= 0) {
          mainFile = gMemFs[filename]
          break
        }
      }
    }
  } else {
    mainFile = gMemFs[file.name]
  }
  return mainFile
}
