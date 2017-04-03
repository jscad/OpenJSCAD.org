export function readFileAsync (file) {
  const isBinaryFile = file.name.match(/\.(stl|gcode)$/) // FIXME how to determine?
  const reader$ = isBinaryFile ? readAsBinaryString(file, 'UTF-8') : readAsText(file, 'UTF-8')

  return reader$
    .map(x => x.target.result)
    .flatMapError(x => of('Failed to read file'))
}

function doStuffOnceFilesAreRead (file$, memFs) {
  const allMyFiles$ = of([])

  allMyFiles$
    .map(function (data) {
      memFsCount++
      // note: assigning f.source = source too make memFs[].source the same, therefore as next
      if (!memFs[file.name] || memFs[file.name].source !== source) {
        memFsChanged++
      }
      saveScript(memFs, file.name, source)

      if (memFsCount === memFsTotal) { // -- are we done reading all?
        // console.log("readFileAsync: "+memFsTotal+" files read")
        const gMainFile = findMainFile(memFsTotal, memFs, file)
        if (memFsChanged > 0 && gMainFile) {
          return gMainFile
        }
        throw new Error('No main.jscad found')
      }
    })
}

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicate.
function readFileAsync (f) {
  // console.log("readFileAsync: "+f.name)

  var reader = new FileReader()
  reader.onloadend = function (evt) {
    if (evt.target.readyState == FileReader.DONE) {
      var source = evt.target.result

      // console.log("done reading: "+f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
      memFsCount++

      // note: assigning f.source = source too make memFs[].source the same, therefore as next
      if (!memFs[f.name] || memFs[f.name].source != source) {
        memFsChanged++
      }

      // FIXME : THIRD time the SAME data is cached
      saveScript(memFs, f.name, source)

      if (memFsCount == memFsTotal) { // -- are we done reading all?
        // console.log("readFileAsync: "+memFsTotal+" files read")

        if (memFsTotal > 1) {
          for (var fn in memFs) {
            if (memFs[fn].name.match(/main.(jscad|js)$/)) {
              gMainFile = memFs[fn]
              break
            }
          }
          if (!gMainFile) {
            // try again but search for the function declaration of main()
            for (var fn in memFs) {
              if (memFs[fn].source.search(/function\s+main\s*\(/) >= 0) {
                gMainFile = memFs[fn]
                break
              }
            }
          }
        } else {
          gMainFile = memFs[f.name]
        }
        if (memFsChanged > 0) {
          if (!gMainFile) throw ('No main.jscad found')
          // console.log("update & redraw "+gMainFile.name)
          setCurrentFile(gMainFile)
        }
      }
    } else {
      throw new Error('Failed to read file')
      if (gProcessor) gProcessor.clearViewer()
      previousScript = null
    }
  }

  if (f.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
    reader.readAsBinaryString(f, 'UTF-8')
  } else {
    reader.readAsText(f, 'UTF-8')
  }
}
